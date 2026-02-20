// ============================================================
// Pipeline Orchestrator
// Runs the full automation pipeline end-to-end
//
// Flow (correct order):
//   Conversation → Intent → Knowledge → Enrichment → PRD →
//   UI Spec → Notion (create Epic+Tasks) → Figma Make →
//   Update Notion (attach Figma URL so team can review)
// ============================================================
import { ConversationSession, PipelineResult } from "./types.js";
import { getConversationText } from "../modules/conversation-memory.js";
import { detectIntent } from "../modules/intent-detection.js";
import { retrieveKnowledge } from "../modules/knowledge-retrieval.js";
import { enrichContext } from "../modules/context-enrichment.js";
import { generatePRD } from "../modules/product-reasoning.js";
import { generateUISpec } from "../modules/ui-behavior-spec.js";
import { generateFigmaStructure } from "../modules/figma-structure.js";
import {
  craftFigmaMakePrompts,
  runFigmaMakeFlow,
  generateMcpInstructions,
  FigmaMakeResult,
} from "../integrations/figma-make-mcp.js";
import {
  createEpic,
  createTasks,
  createFeedback,
  updateTicketWithDesign,
  notionPageUrl,
} from "../integrations/notion.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../../output");

function ensureOutputDir() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Run the full pipeline:
 * Conversation → Intent → Knowledge → Enrichment → PRD →
 * UI Spec → Notion (first) → Figma Make → Update Notion with URL
 */
export async function runPipeline(
  session: ConversationSession,
  options: {
    skipFigma?: boolean;
    skipNotion?: boolean;
    verbose?: boolean;
    /** Max screens to generate in Figma Make (default: all) */
    maxFigmaScreens?: number;
  } = {}
): Promise<PipelineResult> {
  const log = (msg: string) => {
    if (options.verbose !== false) console.log(msg);
  };

  ensureOutputDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

  // ── Step 1: Intent Detection ──
  log("\n═══════════════════════════════════════════");
  log("🔍 STEP 1/8: Intent Detection");
  log("═══════════════════════════════════════════");
  const intent = await detectIntent(session);
  log(`  Type: ${intent.type}`);
  log(`  Summary: ${intent.summary}`);
  log(`  Priority: ${intent.priority}`);
  log(`  Affected: ${intent.affectedAreas.join(", ")}`);
  log(`  Confidence: ${(intent.confidence * 100).toFixed(0)}%`);

  // Save intent
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-01-intent.json`),
    JSON.stringify(intent, null, 2)
  );

  // ── Step 2: Knowledge Retrieval ──
  log("\n═══════════════════════════════════════════");
  log("📚 STEP 2/8: Knowledge Retrieval");
  log("═══════════════════════════════════════════");
  const knowledge = await retrieveKnowledge(intent);
  log(`  Retrieved ${knowledge.chunks.length} relevant knowledge chunks`);
  knowledge.chunks.slice(0, 5).forEach((c) => {
    log(`    - [${c.source}] ${c.section} (score: ${c.relevanceScore})`);
  });

  // ── Step 3: Context Enrichment ──
  log("\n═══════════════════════════════════════════");
  log("🔗 STEP 3/8: Context Enrichment");
  log("═══════════════════════════════════════════");
  const enrichedContext = await enrichContext(session, intent, knowledge);
  log(`  Merged summary: ${enrichedContext.mergedSummary.length} chars`);

  // Save enriched context
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-02-enriched.md`),
    enrichedContext.mergedSummary
  );

  // ── Step 4: Product Reasoning (PRD) ──
  log("\n═══════════════════════════════════════════");
  log("📝 STEP 4/8: Product Reasoning → Lean PRD");
  log("═══════════════════════════════════════════");
  const prd = await generatePRD(enrichedContext);
  log(`  Title: ${prd.title}`);
  log(`  User Stories: ${prd.userStories.length}`);
  log(`  Acceptance Criteria: ${prd.acceptanceCriteria.length}`);
  log(`  Complexity: ${prd.estimatedComplexity}`);

  // Save PRD
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-03-prd.json`),
    JSON.stringify(prd, null, 2)
  );

  // ── Step 5: UI Behavior Spec ──
  log("\n═══════════════════════════════════════════");
  log("🖥️  STEP 5/8: UI Behavior Specification");
  log("═══════════════════════════════════════════");
  const uiSpec = await generateUISpec(prd, enrichedContext);
  log(`  Screens: ${uiSpec.screenList.length}`);
  log(`  Navigation flows: ${uiSpec.navigationFlow.length}`);
  log(`  Interaction rules: ${uiSpec.interactionRules.length}`);
  uiSpec.screenList.forEach((s) => {
    log(`    - ${s.name} (${s.layout}): ${s.components.length} components`);
  });

  // Save UI Spec
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-04-ui-spec.json`),
    JSON.stringify(uiSpec, null, 2)
  );

  // Also generate Figma structure metadata (useful for reference)
  const figmaMockup = await generateFigmaStructure(uiSpec, prd);
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-05-figma-structure.json`),
    JSON.stringify(figmaMockup, null, 2)
  );

  // ── Step 6: Notion Tickets (FIRST — so team can review plan) ──
  log("\n═══════════════════════════════════════════");
  log("📋 STEP 6/8: Create Notion Tickets");
  log("═══════════════════════════════════════════");

  let epicId = "";
  let taskIds: string[] = [];
  let feedbackId: string | undefined;

  if (!options.skipNotion) {
    try {
      // Create feedback entry
      feedbackId = await createFeedback(
        intent,
        getConversationText(session)
      );
      log(`  📝 Feedback: ${notionPageUrl(feedbackId)}`);

      // Create epic with PRD content
      epicId = await createEpic(prd, intent);
      log(`  📋 Epic: ${notionPageUrl(epicId)}`);

      // Create tasks for each screen + interaction rules
      taskIds = await createTasks(prd, uiSpec, epicId);
      log(`  ✅ ${taskIds.length} tasks created`);
      log(`  ℹ️ Team can now review PRD + Tasks in Notion while design generates`);
    } catch (e) {
      log(`  ⚠️ Notion integration error: ${e}`);
      log(`  ℹ️ Pipeline continues — Figma Make will still generate designs`);
    }
  } else {
    log("  ⏭️ Notion creation skipped (--skip-notion)");
  }

  // ── Step 7: Figma Make (Generate design from PRD + UI Spec) ──
  log("\n═══════════════════════════════════════════");
  log("🎨 STEP 7/8: Figma Make Design Generation");
  log("═══════════════════════════════════════════");

  let figmaDesignUrl = "";
  let figmaMakeResult: FigmaMakeResult | null = null;

  // Craft the prompts from PRD + UI Spec
  const figmaMakePrompts = craftFigmaMakePrompts(prd, uiSpec);
  log(`  📝 ${figmaMakePrompts.length} screen prompts crafted`);
  figmaMakePrompts.forEach((p) => {
    log(`    - ${p.screenName} (${p.isFirstScreen ? "initial" : "continuation"}): ${p.prompt.length} chars`);
  });

  // Save prompts for reference
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-06-figma-prompts.json`),
    JSON.stringify(figmaMakePrompts, null, 2)
  );

  if (!options.skipFigma) {
    try {
      log("\n  ── Launching Figma Make via Playwright ──");
      figmaMakeResult = await runFigmaMakeFlow(prd, uiSpec, {
        verbose: options.verbose,
        maxScreens: options.maxFigmaScreens,
        screenshotPrefix: timestamp,
      });

      figmaDesignUrl = figmaMakeResult.url;
      log(`\n  ✅ Figma Make design created!`);
      log(`  🔗 URL: ${figmaDesignUrl}`);
      log(`  📊 Screens generated: ${figmaMakeResult.screensGenerated.join(", ")}`);
      if (figmaMakeResult.screenshotPaths.length > 0) {
        log(`  📸 Screenshots: ${figmaMakeResult.screenshotPaths.length} captured`);
      }
    } catch (e) {
      log(`  ⚠️ Figma Make automation failed: ${e}`);
      log("  ℹ️ You can use the saved prompts manually at https://www.figma.com/make");

      // Print MCP instructions as fallback
      const mcpInstructions = generateMcpInstructions(prd, uiSpec);
      log("\n  ── Manual MCP Playwright Steps ──");
      mcpInstructions.steps.forEach((s) => log(`    ${s}`));
    }
  } else {
    log("  ⏭️ Figma Make skipped (--skip-figma)");
    log("  ℹ️ Prompts saved — you can use them manually at figma.com/make");
  }

  // ── Step 8: Update Notion with Figma Design URL ──
  log("\n═══════════════════════════════════════════");
  log("🔗 STEP 8/8: Update Notion with Design Link");
  log("═══════════════════════════════════════════");

  if (epicId && figmaDesignUrl) {
    try {
      await updateTicketWithDesign(epicId, figmaDesignUrl);
      log(`  ✅ Figma design URL attached to Epic`);
      log(`  🔗 ${figmaDesignUrl}`);
      log(`  📋 Team can now review the design directly from Notion`);
    } catch (e) {
      log(`  ⚠️ Failed to update Notion with design link: ${e}`);
      log(`  ℹ️ Manual link: ${figmaDesignUrl}`);
    }
  } else if (!epicId) {
    log("  ⏭️ No Notion Epic to update (Notion was skipped or failed)");
    if (figmaDesignUrl) {
      log(`  ℹ️ Figma design URL: ${figmaDesignUrl}`);
    }
  } else {
    log("  ⏭️ No Figma design URL to attach (Figma was skipped or failed)");
  }

  // ── Final summary ──
  const result: PipelineResult = {
    session,
    intent,
    knowledge,
    enrichedContext,
    prd,
    uiSpec,
    figmaMockup,
    notionTickets: {
      epicId,
      taskIds,
      feedbackId,
    },
    figmaDesignUrl,
  };

  // Save full result
  writeFileSync(
    resolve(OUTPUT_DIR, `${timestamp}-00-full-result.json`),
    JSON.stringify(
      {
        ...result,
        session: { id: session.id, messageCount: session.messages.length },
        knowledge: { chunksCount: knowledge.chunks.length },
      },
      null,
      2
    )
  );

  log("\n═══════════════════════════════════════════");
  log("✅ PIPELINE COMPLETE");
  log("═══════════════════════════════════════════");
  log(`  Session: ${session.id}`);
  log(`  Intent: ${intent.type} - ${intent.summary}`);
  log(`  PRD: ${prd.title}`);
  log(`  Screens: ${uiSpec.screenList.length}`);
  log(`  Figma: ${figmaDesignUrl || "N/A"}`);
  log(`  Notion Epic: ${epicId ? notionPageUrl(epicId) : "skipped"}`);
  log(`  Notion Tasks: ${taskIds.length}`);
  log(`  Output dir: ${OUTPUT_DIR}`);

  return result;
}
