// ============================================================
// Test Pipeline - Simulates a conversation and runs pipeline
// ============================================================
import {
  createSession,
  addMessage,
  endSession,
} from "./modules/conversation-memory.js";
import { runPipeline } from "./pipeline/orchestrator.js";

async function testPipeline() {
  console.log("🧪 Running test pipeline with sample conversation...\n");

  // Create a simulated conversation
  const session = createSession();

  // Simulate a user asking about a new feature
  addMessage(
    session,
    "user",
    "I want you to modify my login page to have a better vintage theme. Give me the best design."
  );

  addMessage(
    session,
    "assistant",
    "Understood. I'll create a vintage/heritage login page design for Chronicle with classic serif typography, muted gold accents, double-border card frame, and an antique white background."
  );

  addMessage(session, "user", "end session");

  endSession(session);

  console.log(`📋 Test session created: ${session.id}`);
  console.log(`   Messages: ${session.messages.length}\n`);

  // Run the pipeline
  const args = process.argv.slice(2);
  const result = await runPipeline(session, {
    skipFigma: !args.includes("--with-figma"),
    skipNotion: args.includes("--skip-notion"),
    verbose: true,
  });

  console.log("\n🧪 Test complete!");
}

testPipeline().catch(console.error);
