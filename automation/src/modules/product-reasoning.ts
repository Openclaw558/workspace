// ============================================================
// Module 5: Product Reasoning
// AI acts as Product Owner → generates Lean PRD
// ============================================================
import { EnrichedContext, LeanPRD } from "../pipeline/types.js";
import { callLLMJson } from "../integrations/ai.js";

const PRD_SYSTEM_PROMPT = `You are a Senior Product Owner for Chronicle, a cemetery management platform.

Given an enriched context (conversation analysis + product knowledge + design system), 
you must produce a Lean PRD (Product Requirements Document).

Chronicle is used by:
- Owners: Full access, org config, financial reports, user management
- Admins: Daily operations, requests, sales, reports, org config
- Managers: Request approval, monitoring, limited reports

Chronicle's main modules:
- Dashboard (Map View, Tables View, Calendar View)
- Requests (Burial request workflow)
- Sales (Revenue, invoices, payments)
- Reports (Inventory, Financial, Operational)
- Organization Config (General, Cemeteries, Access, Custom Fields, Sales, Events, etc.)
- Profile Management

You MUST return ONLY valid JSON matching this exact schema:
{
  "title": "string - concise PRD title",
  "epicSummary": "string - one paragraph epic summary",
  "problemStatement": "string - what problem does this solve",
  "proposedSolution": "string - high-level solution description",
  "userStories": [
    {
      "asA": "string - role (Owner/Admin/Manager/User)",
      "iWant": "string - desired action",
      "soThat": "string - expected benefit"
    }
  ],
  "acceptanceCriteria": ["string - measurable criteria"],
  "outOfScope": ["string - explicitly excluded items"],
  "affectedRoles": ["Owner", "Admin", "Manager"],
  "relatedFeatures": ["string - existing Chronicle features affected"],
  "priority": "critical|high|medium|low",
  "estimatedComplexity": "small|medium|large|epic"
}`;

export async function generatePRD(
  enrichedContext: EnrichedContext
): Promise<LeanPRD> {
  const prompt = `## Enriched Context Analysis

### Intent
- Type: ${enrichedContext.intent.type}
- Summary: ${enrichedContext.intent.summary}
- Priority: ${enrichedContext.intent.priority}
- Affected Areas: ${enrichedContext.intent.affectedAreas.join(", ")}

### Merged Analysis
${enrichedContext.mergedSummary}

---

Based on this analysis, generate a comprehensive Lean PRD for Chronicle.
Ensure user stories cover all affected roles.
Be specific about Chronicle screens and components.`;

  const prd = await callLLMJson<LeanPRD>(
    PRD_SYSTEM_PROMPT,
    [{ role: "user", content: prompt }],
    { temperature: 0.3, maxTokens: 4096 }
  );

  return prd;
}
