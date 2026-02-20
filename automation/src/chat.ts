// ============================================================
// Interactive Chat Interface
// Users chat here. On "end session" → triggers full pipeline.
// ============================================================
import * as readline from "readline";
import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve } from "path";
import {
  createSession,
  addMessage,
  endSession,
  getConversationText,
} from "./modules/conversation-memory.js";
import { callLLM } from "./integrations/ai.js";
import { runPipeline } from "./pipeline/orchestrator.js";
import { ConversationSession } from "./pipeline/types.js";
import { notionPageUrl } from "./integrations/notion.js";
import { CONFIG } from "./config.js";

/** Load a compact knowledge summary from the knowledge base for the chat AI */
function loadKnowledgeSummary(): string {
  const basePath = CONFIG.knowledgeBasePath;
  if (!existsSync(basePath)) return "";

  // Priority files to load (most useful for chat context)
  const priorityFiles = [
    "flow.md",
    "features.md",
    "chronicle-full.md",
  ];

  const MAX_CHARS = 25000; // ~6k tokens budget for knowledge context
  let result = "";

  for (const fileName of priorityFiles) {
    const filePath = resolve(basePath, fileName);
    if (!existsSync(filePath)) continue;
    const content = readFileSync(filePath, "utf-8");
    const truncated = content.length > 8000 ? content.slice(0, 8000) + "\n...[truncated]" : content;
    if (result.length + truncated.length > MAX_CHARS) break;
    result += `\n--- ${fileName} ---\n${truncated}\n`;
  }

  // Also try roles directory
  const rolesDir = resolve(basePath, "roles");
  if (existsSync(rolesDir)) {
    const roleFiles = readdirSync(rolesDir).filter((f) => f.endsWith(".md") && f !== "README.md");
    for (const rf of roleFiles) {
      const content = readFileSync(resolve(rolesDir, rf), "utf-8");
      const truncated = content.length > 3000 ? content.slice(0, 3000) + "\n...[truncated]" : content;
      if (result.length + truncated.length > MAX_CHARS) break;
      result += `\n--- roles/${rf} ---\n${truncated}\n`;
    }
  }

  return result;
}

function buildChatSystemPrompt(knowledgeContext: string): string {
  return `You are a product consultant for Chronicle, a digital cemetery management platform.
You have DEEP knowledge about Chronicle's actual product — its screens, UI, flows, and features.

## YOUR KNOWLEDGE (from Chronicle product documentation)

### Login Page (Current Design)
- Dual-pane layout: Left = cemetery-at-dusk background image, Right = login form
- Auth methods: Google SSO button, Microsoft SSO button, Chronicle Email/Password fields
- Elements: Email field, Password field, "Remember me" toggle, LOGIN button, "Forgot password?" link, "Sign up for free" link
- Post-login: routes to role-specific Dashboard (Owner/Admin/Manager) → Map view by default
- On failure: error message, stays on login page

### All Chronicle Screens
1. Login — auth gateway (dual-pane)
2. Dashboard — Map View (stats left pane + satellite map right pane)
3. Dashboard — Tables View (data grid, 188 records, filters, sorting)
4. Dashboard — Calendar View (month/week/day)
5. Dashboard — Requests (burial/purchase queue, At-need/Pre-need)
6. Dashboard — Sales (invoice ledger, payment tracking)
7. Reports (Inventory, Interments, Business, User Logs)
8. Organization Config — General, Cemeteries, Access, Custom Fields, Sales, Event Types, Business Types, Regional Settings, Certificates, Forms
9. My Profile (personal info, password, social login linking)

### Navigation
- Top Bar: Org switcher, Global search, Advanced search, Notifications bell, Profile dropdown
- Sidebar: Dashboard (Map|Tables|Calendar), Requests, Sales, Reports, Organization (Owner/Admin only), My Profile, Help, About, Logout
- Context Toolbar: Filters, Export, Add/Create, Bulk ops

### Roles & Access
- Owner: Full access to everything
- Admin: Full access to everything
- Manager: Dashboard (view), Requests, Reports (limited). NO access to Sales, Org Config, User Management

### Design System
- Status colors: Vacant=green, Reserved=yellow/orange, Occupied=red/gray, Maintenance=blue
- Payment: Paid=green, Unpaid=red, Partial=orange, Overdue=dark red
- Components: Statistics Cards, Interactive Map, Data Tables, Calendar Grid, Request Queue, Form Builder, Certificate Editor, Modal Dialogs, Toast Notifications, Breadcrumbs, Tab Navigation, Status Badges

${knowledgeContext ? `### Detailed Product Documentation\n${knowledgeContext}` : ""}

## Guidelines
- You KNOW Chronicle's product. Reference actual screens, flows, and components when answering.
- If the user asks about a specific screen (e.g., login page), describe what it CURRENTLY looks like based on your knowledge above.
- Ask clarifying questions to fully understand needs — but never say "I don't have access to your code/design."
- Be specific about which Chronicle features/screens are involved.
- Keep responses focused and concise.
- Mix Indonesian and English is fine.

When the user says "end session", "selesai", "done" → acknowledge and summarize.`;
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("🤖 Chronicle AI Automation - Chat Interface");
  console.log("═══════════════════════════════════════════════════════");
  console.log("Loading Chronicle knowledge base...");

  const knowledgeContext = loadKnowledgeSummary();
  const CHAT_SYSTEM_PROMPT = buildChatSystemPrompt(knowledgeContext);

  console.log(`  ✅ Knowledge loaded (${knowledgeContext.length} chars from docs)`);
  console.log("Chat with me about Chronicle features, bugs, or improvements.");
  console.log('Type "end session" or "selesai" to process the conversation.');
  console.log('Type "quit" to exit without processing.');
  console.log("═══════════════════════════════════════════════════════\n");

  const session = createSession();
  console.log(`📋 Session: ${session.id}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (query: string): Promise<string> =>
    new Promise((resolve) => rl.question(query, resolve));

  let running = true;

  while (running) {
    const userInput = await prompt("\n👤 You: ");
    const trimmed = userInput.trim().toLowerCase();

    if (trimmed === "quit" || trimmed === "exit") {
      console.log("\n👋 Goodbye! Session discarded.");
      rl.close();
      process.exit(0);
    }

    if (
      trimmed === "end session" ||
      trimmed === "selesai" ||
      trimmed === "done" ||
      trimmed === "end"
    ) {
      running = false;
      addMessage(session, "user", userInput);

      console.log("\n═══════════════════════════════════════════════════════");
      console.log("🔄 Session ended. Processing conversation...");
      console.log("═══════════════════════════════════════════════════════\n");

      endSession(session);
      await processPipeline(session);
      rl.close();
      return;
    }

    // Add user message
    addMessage(session, "user", userInput);

    // Get AI response
    try {
      const response = await callLLM(
        CHAT_SYSTEM_PROMPT,
        session.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { temperature: 0.5, maxTokens: 2048 }
      );

      addMessage(session, "assistant", response);
      console.log(`\n🤖 Assistant: ${response}`);
    } catch (e) {
      console.error(`\n❌ AI Error: ${e}`);
      console.log("   (Your message was saved. You can continue or end session)");
    }
  }
}

async function processPipeline(session: ConversationSession) {
  // Parse CLI args for skip flags
  const args = process.argv.slice(2);
  const skipFigma = args.includes("--skip-figma");
  const skipNotion = args.includes("--skip-notion");

  try {
    const result = await runPipeline(session, {
      skipFigma,
      skipNotion,
      verbose: true,
    });

    console.log("\n═══════════════════════════════════════════════════════");
    console.log("🎉 ALL DONE! Here's your output:");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`  📋 PRD: ${result.prd.title}`);
    console.log(`  🖥️  Screens: ${result.uiSpec.screenList.map((s) => s.name).join(", ")}`);
    console.log(`  🎨 Figma: ${result.figmaDesignUrl || "N/A"}`);
    console.log(`  📋 Notion Epic: ${result.notionTickets.epicId ? notionPageUrl(result.notionTickets.epicId) : "N/A"}`);
    console.log(`  📋 Notion Tasks: ${result.notionTickets.taskIds.length}`);
    if (result.figmaDesignUrl) {
      console.log(`\n  💡 Share this Figma link with your team for review:`);
      console.log(`     ${result.figmaDesignUrl}`);
    }
    console.log("═══════════════════════════════════════════════════════");
  } catch (e) {
    console.error("\n❌ Pipeline Error:", e);
    console.log("\nConversation was saved. You can review it at:");
    console.log(`  Session ID: ${session.id}`);
  }
}

main().catch(console.error);
