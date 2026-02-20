// ============================================================
// Module 3: Knowledge Retrieval
// Loads relevant Chronicle product knowledge & design system
// ============================================================
import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, relative } from "path";
import { CONFIG } from "../config.js";
import { KnowledgeContext, KnowledgeChunk, DesignSystem, DetectedIntent } from "../pipeline/types.js";
import { callLLMJson } from "../integrations/ai.js";

/** Chronicle's design system reference (extracted from knowledge base) */
const CHRONICLE_DESIGN_SYSTEM: DesignSystem = {
  navigation: {
    topBar: [
      "Organization Switcher",
      "Global Search",
      "Notifications Bell",
      "User Profile Menu",
    ],
    sidebar: [
      "Dashboard (Map / Tables / Calendar)",
      "Requests",
      "Sales",
      "Reports",
      "Organization (Owner/Admin only)",
      "My Profile",
      "Help",
      "About",
      "Logout",
    ],
    contextToolbar: [
      "Quick Actions",
      "Filters",
      "Sorting",
      "Export Options",
      "Bulk Operations",
    ],
  },
  layouts: {
    dualPane: "Left pane (statistics/data) + Right pane (map/visualization)",
    dataGrid: "Searchable table with filters, sorting, pagination, export",
    formBased: "Multi-field form with validation, sections, submit/cancel",
    mapView: "Satellite base map + vector overlays + clickable markers",
  },
  components: [
    "Statistics Cards (Total Plots, Occupied, Vacant, Interments)",
    "Interactive Satellite Map with LOT overlays",
    "Data Table with Column Sorting & Filtering",
    "Calendar Grid (Month/Week/Day views)",
    "Request Queue List",
    "Sales Invoice Table",
    "Report Builder (Category → Area → Format → Attributes)",
    "Custom Field Builder",
    "Form Builder (drag-and-drop)",
    "Certificate Template Editor",
    "User Invitation Dialog",
    "Profile Settings Panel",
    "Modal Dialogs (Confirm, Edit, Create)",
    "Toast Notifications",
    "Breadcrumb Navigation",
    "Tab Navigation (Map/Tables/Calendar)",
    "Status Badges (Vacant/Reserved/Occupied/Maintenance)",
    "Payment Status Tags (Paid/Unpaid/Partial/Overdue)",
    "ROI Markers on Map",
    "Priority Filters (Pre-need/At-need)",
  ],
  roles: ["Owner", "Admin", "Manager"],
  colorCoding: {
    vacant: "green",
    reserved: "yellow/orange",
    occupied: "red/gray",
    maintenance: "blue",
    paid: "green",
    unpaid: "red",
    partiallyPaid: "orange",
    overdue: "dark red",
  },
};

/** Load all markdown files from knowledge base */
function loadAllKnowledgeFiles(): { path: string; content: string }[] {
  const basePath = CONFIG.knowledgeBasePath;
  const files: { path: string; content: string }[] = [];

  function walk(dir: string) {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".md")) {
        files.push({
          path: relative(basePath, fullPath),
          content: readFileSync(fullPath, "utf-8"),
        });
      }
    }
  }

  walk(basePath);
  return files;
}

/** Escape special regex characters in a string */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Simple keyword-based relevance scoring */
function scoreRelevance(content: string, keywords: string[]): number {
  const lower = content.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    const escaped = escapeRegex(kw.toLowerCase().trim());
    if (!escaped) continue;
    try {
      const regex = new RegExp(escaped, "g");
      const matches = lower.match(regex);
      if (matches) score += matches.length;
    } catch {
      // Skip invalid patterns
      if (lower.includes(kw.toLowerCase().trim())) score += 1;
    }
  }
  return score;
}

/** Extract sections from a markdown file */
function extractSections(
  filePath: string,
  content: string
): { source: string; section: string; content: string }[] {
  const sections: { source: string; section: string; content: string }[] = [];
  const lines = content.split("\n");
  let currentSection = "Introduction";
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headingMatch) {
      if (currentContent.length > 0) {
        sections.push({
          source: filePath,
          section: currentSection,
          content: currentContent.join("\n").trim(),
        });
      }
      currentSection = headingMatch[1];
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    sections.push({
      source: filePath,
      section: currentSection,
      content: currentContent.join("\n").trim(),
    });
  }

  return sections;
}

/** Common stop words to filter out from keyword extraction */
const STOP_WORDS = new Set([
  "this", "that", "with", "from", "have", "been", "will", "would", "could",
  "should", "more", "most", "also", "just", "than", "then", "when", "what",
  "which", "where", "were", "there", "their", "they", "them", "some", "such",
  "into", "over", "only", "very", "each", "every", "about", "after", "before",
  "between", "through", "during", "without", "again", "does", "done", "want",
  "give", "make", "made", "like", "good", "best", "much", "well", "here",
  "your", "page", "better", "dont", "talk", "enough",
]);

/** Max characters per individual chunk */
const MAX_CHUNK_CHARS = 2000;
/** Max total characters across all chunks sent to LLM */
const MAX_TOTAL_CHARS = 50000;
/** Max number of chunks to return */
const MAX_CHUNKS = 10;

/**
 * Retrieve relevant knowledge chunks based on detected intent.
 * Uses keyword matching + LLM re-ranking.
 */
export async function retrieveKnowledge(
  intent: DetectedIntent
): Promise<KnowledgeContext> {
  const allFiles = loadAllKnowledgeFiles();

  // Build keywords from intent — filter out stop words and short words
  const rawWords = intent.details.split(/\s+/).filter((w) => w.length > 3);
  const meaningfulWords = rawWords.filter(
    (w) => !STOP_WORDS.has(w.toLowerCase())
  );
  const keywords = [
    ...intent.affectedAreas,
    ...intent.summary.split(/\s+/).filter((w) => w.length > 3 && !STOP_WORDS.has(w.toLowerCase())),
    ...meaningfulWords,
  ];

  // Extract all sections and score them
  const allSections: KnowledgeChunk[] = [];
  for (const file of allFiles) {
    const sections = extractSections(file.path, file.content);
    for (const section of sections) {
      const score = scoreRelevance(section.content, keywords);
      if (score > 0) {
        allSections.push({
          source: section.source,
          section: section.section,
          content: section.content,
          relevanceScore: score,
        });
      }
    }
  }

  // Sort by relevance, truncate individual chunks, enforce total budget
  allSections.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topChunks: KnowledgeChunk[] = [];
  let totalChars = 0;
  for (const chunk of allSections) {
    if (topChunks.length >= MAX_CHUNKS) break;
    // Truncate oversized chunks
    const truncated = chunk.content.length > MAX_CHUNK_CHARS
      ? chunk.content.slice(0, MAX_CHUNK_CHARS) + "\n... [truncated]"
      : chunk.content;
    if (totalChars + truncated.length > MAX_TOTAL_CHARS) break;
    topChunks.push({ ...chunk, content: truncated });
    totalChars += truncated.length;
  }

  // If no chunks found, include high-level docs
  if (topChunks.length === 0) {
    const flowFile = allFiles.find((f) => f.path.includes("flow.md"));
    const featuresFile = allFiles.find((f) => f.path.includes("features.md"));
    if (flowFile) {
      topChunks.push({
        source: flowFile.path,
        section: "Full Flow",
        content: flowFile.content.slice(0, 3000),
        relevanceScore: 1,
      });
    }
    if (featuresFile) {
      topChunks.push({
        source: featuresFile.path,
        section: "Full Features",
        content: featuresFile.content.slice(0, 3000),
        relevanceScore: 1,
      });
    }
  }

  return {
    chunks: topChunks,
    designSystem: CHRONICLE_DESIGN_SYSTEM,
  };
}

/** Get a compact summary of the design system for LLM prompts */
export function getDesignSystemSummary(): string {
  const ds = CHRONICLE_DESIGN_SYSTEM;
  return `# Chronicle Design System

## Navigation
- Top Bar: ${ds.navigation.topBar.join(", ")}
- Sidebar: ${ds.navigation.sidebar.join(", ")}
- Context Toolbar: ${ds.navigation.contextToolbar.join(", ")}

## Layouts
- Dual-Pane: ${ds.layouts.dualPane}
- Data Grid: ${ds.layouts.dataGrid}
- Form: ${ds.layouts.formBased}
- Map View: ${ds.layouts.mapView}

## UI Components
${ds.components.map((c) => `- ${c}`).join("\n")}

## Roles: ${ds.roles.join(", ")}

## Status Color Coding
${Object.entries(ds.colorCoding)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}`;
}
