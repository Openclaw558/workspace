// ============================================================
// Main Entry Point
// Can run in different modes: chat, pipeline, test
// ============================================================
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "chat";

  console.log("╔═══════════════════════════════════════════════════════╗");
  console.log("║  Chronicle AI Automation Pipeline                    ║");
  console.log("║  Conversation → PRD → UI Spec → Figma → Notion      ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");

  switch (command) {
    case "chat":
      // Import and run chat interface
      await import("./chat.js");
      break;

    case "pipeline": {
      // Run pipeline on an existing session
      const sessionId = args[1];
      if (!sessionId) {
        console.error("Usage: pipeline <session-id> [--skip-figma] [--skip-notion]");
        process.exit(1);
      }
      const { loadSession } = await import("./modules/conversation-memory.js");
      const { runPipeline } = await import("./pipeline/orchestrator.js");
      const session = loadSession(sessionId);
      if (!session) {
        console.error(`Session not found: ${sessionId}`);
        process.exit(1);
      }
      await runPipeline(session, {
        skipFigma: args.includes("--skip-figma"),
        skipNotion: args.includes("--skip-notion"),
      });
      break;
    }

    case "test":
      // Run test pipeline
      await import("./test-pipeline.js");
      break;

    case "sessions": {
      // List all sessions
      const { listSessions, loadSession } = await import(
        "./modules/conversation-memory.js"
      );
      const sessions = listSessions();
      console.log(`Found ${sessions.length} session(s):\n`);
      for (const id of sessions) {
        const s = loadSession(id);
        if (s) {
          console.log(`  ${id}`);
          console.log(`    Messages: ${s.messages.length}`);
          console.log(`    Started: ${s.startedAt}`);
          console.log(`    Ended: ${s.endedAt || "active"}`);
          console.log();
        }
      }
      break;
    }

    case "help":
    default:
      console.log("Usage: tsx src/index.ts <command> [options]\n");
      console.log("Commands:");
      console.log("  chat                    Start interactive chat (default)");
      console.log("  pipeline <session-id>   Run pipeline on existing session");
      console.log("  test                    Run test pipeline with sample data");
      console.log("  sessions                List all saved sessions");
      console.log("  help                    Show this help\n");
      console.log("Options:");
      console.log("  --skip-figma            Skip Figma browser automation");
      console.log("  --skip-notion           Skip Notion ticket creation");
      break;
  }
}

main().catch(console.error);
