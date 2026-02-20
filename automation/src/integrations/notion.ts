// ============================================================
// Notion Integration
// Creates tickets (Epic, Tasks, Feedback) in Notion databases
// With robust error handling and validation
// ============================================================
import { Client } from "@notionhq/client";
import { CONFIG } from "../config.js";
import { LeanPRD, UIBehaviorSpec, NotionTicket, DetectedIntent } from "../pipeline/types.js";

let notionClient: Client | null = null;

function getNotion(): Client {
  if (!notionClient) {
    if (!CONFIG.notion.apiKey) {
      throw new NotionConfigError("NOTION_API_KEY is not set in .env");
    }
    notionClient = new Client({ auth: CONFIG.notion.apiKey });
  }
  return notionClient;
}

/** Convert Notion page ID to a clickable URL */
export function notionPageUrl(pageId: string): string {
  return `https://notion.so/${pageId.replace(/-/g, "")}`;
}

/** Custom error for Notion config issues */
class NotionConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotionConfigError";
  }
}

/** Validate that all required Notion DB IDs are configured */
function validateNotionConfig(): void {
  const missing: string[] = [];
  if (!CONFIG.notion.apiKey) missing.push("NOTION_API_KEY");
  if (!CONFIG.notion.dbFeedback) missing.push("NOTION_DB_FEEDBACK");
  if (!CONFIG.notion.dbEpic) missing.push("NOTION_DB_EPIC");
  if (!CONFIG.notion.dbTask) missing.push("NOTION_DB_TASK");

  if (missing.length > 0) {
    throw new NotionConfigError(
      `Missing Notion configuration: ${missing.join(", ")}. Set them in .env file.`
    );
  }
}

/** Check if a Notion database exists and is accessible */
async function validateDatabase(dbId: string, label: string): Promise<boolean> {
  try {
    const notion = getNotion();
    await notion.databases.retrieve({ database_id: dbId });
    return true;
  } catch (e: any) {
    const status = e?.status || e?.code;
    if (status === 404) {
      console.warn(`  ⚠️ Notion DB "${label}" (${dbId}) not found. Check DB ID and integration access.`);
    } else if (status === 403 || status === "unauthorized") {
      console.warn(`  ⚠️ No access to Notion DB "${label}" (${dbId}). Share the DB with your integration.`);
    } else {
      console.warn(`  ⚠️ Cannot access Notion DB "${label}": ${e?.message || e}`);
    }
    return false;
  }
}

// ---- Create Epic in Notion ----

export async function createEpic(
  prd: LeanPRD,
  intent: DetectedIntent
): Promise<string> {
  validateNotionConfig();
  const isValid = await validateDatabase(CONFIG.notion.dbEpic, "Epic");
  if (!isValid) {
    throw new NotionConfigError(`Cannot access Epic database: ${CONFIG.notion.dbEpic}`);
  }

  const notion = getNotion();

  const userStoriesText = prd.userStories
    .map((s) => `• As a **${s.asA}**, I want **${s.iWant}**, so that **${s.soThat}**`)
    .join("\n");

  const acceptanceText = prd.acceptanceCriteria
    .map((c) => `☐ ${c}`)
    .join("\n");

  const description = `## Problem Statement
${prd.problemStatement}

## Proposed Solution
${prd.proposedSolution}

## User Stories
${userStoriesText}

## Acceptance Criteria
${acceptanceText}

## Out of Scope
${prd.outOfScope.map((o) => `• ${o}`).join("\n")}

## Affected Roles
${prd.affectedRoles.join(", ")}

## Related Features
${prd.relatedFeatures.join(", ")}

## Metadata
- Priority: ${prd.priority}
- Complexity: ${prd.estimatedComplexity}
- Intent Type: ${intent.type}`;

  const response = await notion.pages.create({
    parent: { database_id: CONFIG.notion.dbEpic },
    properties: {
      // Epic Development Tracker schema
      Epic: {
        title: [{ text: { content: `[${intent.type.toUpperCase()}] ${prd.title}` } }],
      },
      ...(await safeProperty("Status", "status", "Backlog")),
      ...(await safeProperty("Feature/Domain", "multi_select", intent.affectedAreas[0] || "Epic")),
    },
    children: markdownToBlocks(description),
  });

  const epicId = response.id;
  console.log(`📋 Epic created in Notion: ${notionPageUrl(epicId)}`);
  return epicId;
}

// ---- Create Tasks linked to Epic ----

export async function createTasks(
  prd: LeanPRD,
  uiSpec: UIBehaviorSpec,
  epicId: string
): Promise<string[]> {
  validateNotionConfig();
  const isValid = await validateDatabase(CONFIG.notion.dbTask, "Task");
  if (!isValid) {
    console.warn("  ⚠️ Skipping task creation — Task DB not accessible");
    return [];
  }

  const notion = getNotion();
  const taskIds: string[] = [];

  // Create a task for each screen in the UI spec
  for (const screen of uiSpec.screenList) {
    // Functional-only component list (no CSS/technical props)
    const componentNames = screen.components
      .map((c) => `- ${c.name}`)
      .join("\n");

    // User-facing interaction summary
    const interactions = screen.components
      .flatMap((c) => c.interactions.map((i) => `- ${c.name}: ${i}`))
      .filter(Boolean)
      .join("\n");

    const description = `## ${screen.name}
${screen.description}

## Layout
${screen.layout}

## Key Components
${componentNames}

## User Interactions
${interactions || "No specific interactions defined."}

## Data Used
${screen.dataEntities.join(", ") || "N/A"}

## Linked Epic
${prd.title}`;

    const response = await notion.pages.create({
      parent: { database_id: CONFIG.notion.dbTask },
      properties: {
        // Dev Tickets Database schema
        "Task name": {
          title: [
            {
              text: {
                content: `[UI] ${screen.name} - ${prd.title}`,
              },
            },
          ],
        },
        ...(await safeProperty("Status", "status", "Not started")),
        // Link task to Epic via relation
        ...(epicId ? { Epic: { relation: [{ id: epicId }] } } : {}),
      },
      children: markdownToBlocks(description),
    });

    taskIds.push(response.id);
    console.log(`  ✅ Task created: ${screen.name} (${notionPageUrl(response.id)})`);
  }

  // Create interaction rule tasks
  const interactionGroups = groupBy(uiSpec.interactionRules, (r) => r.screen);
  for (const [screenId, rules] of Object.entries(interactionGroups)) {
    const rulesText = rules
      .map(
        (r: any) =>
          `- ${r.component}: ${r.behavior}${r.validation ? ` (validasi: ${r.validation})` : ""}`
      )
      .join("\n");

    const response = await notion.pages.create({
      parent: { database_id: CONFIG.notion.dbTask },
      properties: {
        // Dev Tickets Database schema
        "Task name": {
          title: [
            {
              text: {
                content: `[Interaction] ${screenId} Rules - ${prd.title}`,
              },
            },
          ],
        },
        ...(await safeProperty("Status", "status", "Not started")),
        // Link task to Epic via relation
        ...(epicId ? { Epic: { relation: [{ id: epicId }] } } : {}),
      },
      children: markdownToBlocks(`## Interaction Rules — ${screenId}\n\n${rulesText}`),
    });

    taskIds.push(response.id);
  }

  console.log(`📋 ${taskIds.length} tasks created in Notion`);
  return taskIds;
}

// ---- Create Feedback entry ----

export async function createFeedback(
  intent: DetectedIntent,
  conversationSummary: string
): Promise<string> {
  validateNotionConfig();
  const isValid = await validateDatabase(CONFIG.notion.dbFeedback, "Feedback");
  if (!isValid) {
    console.warn("  ⚠️ Skipping feedback creation — Feedback DB not accessible");
    return "";
  }

  const notion = getNotion();

  const response = await notion.pages.create({
    parent: { database_id: CONFIG.notion.dbFeedback },
    properties: {
      // Feedback and Ideas Submission schema
      "Request name": {
        title: [
          {
            text: {
              content: `[${intent.type.toUpperCase()}] ${intent.summary}`,
            },
          },
        ],
      },
    },
    children: markdownToBlocks(
      `## Feedback Summary\n${intent.details}\n\n## Conversation Summary\n${conversationSummary}\n\n## Affected Areas\n${intent.affectedAreas.map((a) => `- ${a}`).join("\n")}`
    ),
  });

  console.log(`📝 Feedback created in Notion: ${notionPageUrl(response.id)}`);
  return response.id;
}

// ---- Update ticket with Figma design URL ----

export async function updateTicketWithDesign(
  pageId: string,
  figmaUrl: string,
  localWireframePath?: string
): Promise<void> {
  if (!pageId) {
    console.warn("  ⚠️ No page ID provided — skipping design link attachment");
    return;
  }

  const notion = getNotion();

  // Append design link to the page
  await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "🎨 Design" } }],
        },
      },
      {
        type: "bookmark",
        bookmark: {
          url: figmaUrl,
          caption: [
            {
              type: "text",
              text: { content: "Figma Mockup" },
            },
          ],
        },
      },
      ...(localWireframePath
        ? [
            {
              type: "paragraph" as const,
              paragraph: {
                rich_text: [
                  {
                    type: "text" as const,
                    text: {
                      content: `Local wireframe: ${localWireframePath}`,
                    },
                  },
                ],
              },
            },
          ]
        : []),
    ],
  });

  console.log(`🔗 Design link added to Notion page: ${notionPageUrl(pageId)}`);
}

// ---- Helpers ----

/** Safe property builder that won't crash if the property doesn't exist in the DB */
async function safeProperty(
  name: string,
  type: "select" | "multi_select" | "rich_text" | "status",
  value: string
): Promise<Record<string, any>> {
  try {
    if (type === "status") {
      return { [name]: { status: { name: value } } };
    }
    if (type === "select") {
      return { [name]: { select: { name: value } } };
    }
    if (type === "multi_select") {
      return { [name]: { multi_select: [{ name: value }] } };
    }
    if (type === "rich_text") {
      return {
        [name]: { rich_text: [{ text: { content: value } }] },
      };
    }
  } catch {
    // Property might not exist in the database schema
  }
  return {};
}

/** Convert simple markdown to Notion blocks */
function markdownToBlocks(markdown: string): any[] {
  const blocks: any[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      blocks.push({
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: trimmed.slice(3) } }],
        },
      });
    } else if (trimmed.startsWith("### ")) {
      blocks.push({
        type: "heading_3",
        heading_3: {
          rich_text: [{ type: "text", text: { content: trimmed.slice(4) } }],
        },
      });
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("☐ ")) {
      const content = trimmed.replace(/^[-•☐]\s*/, "");
      blocks.push({
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: parseRichText(content),
        },
      });
    } else {
      blocks.push({
        type: "paragraph",
        paragraph: {
          rich_text: parseRichText(trimmed),
        },
      });
    }
  }

  // Notion API limit: max 100 children per request.
  // Truncate to 99 blocks + 1 warning block if needed.
  const NOTION_MAX_CHILDREN = 100;
  if (blocks.length > NOTION_MAX_CHILDREN) {
    const truncated = blocks.slice(0, NOTION_MAX_CHILDREN - 1);
    truncated.push({
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `⚠️ Content truncated (${blocks.length} blocks → ${NOTION_MAX_CHILDREN - 1}). See full output in the pipeline output directory.`,
            },
            annotations: { italic: true },
          },
        ],
      },
    });
    return truncated;
  }

  return blocks;
}

/** Parse markdown bold into Notion rich text */
function parseRichText(text: string): any[] {
  const parts: any[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        text: { content: text.slice(lastIndex, match.index) },
      });
    }
    parts.push({
      type: "text",
      text: { content: match[1] },
      annotations: { bold: true },
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      text: { content: text.slice(lastIndex) },
    });
  }

  return parts.length > 0 ? parts : [{ type: "text", text: { content: text } }];
}

/** Group array by key */
function groupBy<T>(arr: T[], fn: (item: T) => string): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const key = fn(item);
      (acc[key] = acc[key] || []).push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
