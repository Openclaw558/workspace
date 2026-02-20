// ============================================================
// Module 4: Context Enrichment
// Merges conversation + knowledge base into enriched context
// ============================================================
import {
  ConversationSession,
  DetectedIntent,
  KnowledgeContext,
  EnrichedContext,
} from "../pipeline/types.js";
import { callLLM } from "../integrations/ai.js";
import { getConversationText } from "./conversation-memory.js";
import { getDesignSystemSummary } from "./knowledge-retrieval.js";

const ENRICHMENT_SYSTEM_PROMPT = `You are an expert Product Analyst for Chronicle (cemetery management platform).

Your job is to merge a user conversation with relevant product knowledge into a single, cohesive summary that captures:
1. What the user wants (from conversation)
2. How it relates to existing product features (from knowledge base)
3. What constraints exist (from design system & product rules)
4. What gaps exist between current product and user's request

Be specific, cite actual Chronicle features/screens when relevant.
Write in clear, structured format with sections.
Output should be comprehensive enough for a Product Owner to write a PRD from it.`;

export async function enrichContext(
  session: ConversationSession,
  intent: DetectedIntent,
  knowledge: KnowledgeContext
): Promise<EnrichedContext> {
  const conversationText = getConversationText(session);
  const designSystem = getDesignSystemSummary();

  // Compile knowledge chunks with a safety cap
  const MAX_KNOWLEDGE_CHARS = 60000; // ~15k tokens safety limit
  let knowledgeText = "";
  for (const c of knowledge.chunks) {
    const block = `### ${c.section} (from ${c.source})\n${c.content}\n\n---\n\n`;
    if (knowledgeText.length + block.length > MAX_KNOWLEDGE_CHARS) break;
    knowledgeText += block;
  }

  const enrichmentPrompt = `## Conversation
${conversationText}

## Detected Intent
- Type: ${intent.type}
- Summary: ${intent.summary}
- Details: ${intent.details}
- Affected Areas: ${intent.affectedAreas.join(", ")}
- Priority: ${intent.priority}

## Relevant Product Knowledge
${knowledgeText}

## Design System
${designSystem}

---

Please create a comprehensive MERGED SUMMARY that combines all the above into a single analysis document. Structure it as:

1. **User Request Summary** - What the user wants in clear terms
2. **Current Product State** - How Chronicle currently handles related features
3. **Gap Analysis** - What's missing or needs to change
4. **Design Constraints** - UI patterns, layouts, and components that must be followed
5. **Impact Assessment** - Which roles, screens, and features are affected
6. **Recommendations** - Suggested approach based on product knowledge`;

  const mergedSummary = await callLLM(
    ENRICHMENT_SYSTEM_PROMPT,
    [{ role: "user", content: enrichmentPrompt }],
    { temperature: 0.3, maxTokens: 4096 }
  );

  return {
    conversation: session,
    intent,
    knowledge,
    mergedSummary,
  };
}
