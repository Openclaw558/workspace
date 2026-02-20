// ============================================================
// Module 6: UI Behavior Spec
// Generates screen list, flow, states, interaction rules
// ============================================================
import { EnrichedContext, LeanPRD, UIBehaviorSpec } from "../pipeline/types.js";
import { callLLMJson } from "../integrations/ai.js";
import { getDesignSystemSummary } from "./knowledge-retrieval.js";

const UI_SPEC_SYSTEM_PROMPT = `You are a Senior UX Architect for Chronicle, a cemetery management platform.

Given a Lean PRD and enriched context, generate a UI Behavior Specification that describes
WHAT the user sees and does — NOT how to implement it in code.

IMPORTANT RULES:
- Component "props" should describe FUNCTIONAL properties in plain language (e.g. "placeholder": "Search plots...", "columns": "Name, Status, Date").
- DO NOT include CSS properties like backgroundColor, borderStyle, maxWidth, padding, fontSize, borderRadius, opacity, etc.
- DO NOT include implementation details like fontFamily, textAlign, overlayTexture etc.
- Keep descriptions readable by non-technical stakeholders (Product Owners, Designers).
- Focus on WHAT the component does and shows, not HOW it looks at CSS level.
- The design system handles visual styling — you only describe behavior and content.

Chronicle's existing design patterns:
- Dual-Pane Layout: Left statistics + Right map/visualization
- Data Grid: Searchable tables with filters, sorting, pagination
- Form Layout: Multi-field forms with validation
- Map View: Satellite base + vector overlays + clickable markers
- Modal Dialogs: For create/edit/confirm actions
- Tab Navigation: Map / Tables / Calendar
- Sidebar Navigation: Dashboard, Requests, Sales, Reports, Organization, Profile

Standard components:
- Statistics Cards, Interactive Maps, Data Tables, Calendars
- Status Badges (Vacant/Reserved/Occupied/Maintenance)
- Payment Status Tags (Paid/Unpaid/Partial/Overdue)
- Toast Notifications, Breadcrumbs, Tab Bars
- Forms with validation, Modals, Dropdowns

Return ONLY valid JSON matching this schema:
{
  "screenList": [
    {
      "id": "string - unique screen id (e.g. 'dashboard-map', 'request-detail')",
      "name": "string - human-readable name",
      "description": "string - 1-2 sentences explaining what this screen does for the user",
      "layout": "dual-pane|full-width|form|modal|map-view",
      "components": [
        {
          "type": "string - component type (e.g. DataTable, StatCard, Form, Map, Modal)",
          "name": "string - descriptive component name",
          "props": { "FUNCTIONAL props only - e.g. placeholder, columns, label, options. NO CSS." },
          "interactions": ["string - what the user can do, in plain language"]
        }
      ],
      "states": [
        {
          "name": "string",
          "description": "string - what this state means for the user",
          "defaultValue": null,
          "transitions": [{"to": "string", "trigger": "string"}]
        }
      ],
      "dataEntities": ["string - data entities used"]
    }
  ],
  "navigationFlow": [
    {
      "from": "string - screen id",
      "to": "string - screen id",
      "trigger": "string - what triggers navigation",
      "condition": "string - optional condition"
    }
  ],
  "globalStates": [
    {
      "name": "string",
      "description": "string",
      "defaultValue": null,
      "transitions": [{"to": "string", "trigger": "string"}]
    }
  ],
  "interactionRules": [
    {
      "screen": "string - screen id",
      "component": "string - component name",
      "event": "string - click/hover/submit/etc",
      "behavior": "string - what happens from the user's perspective",
      "validation": "string - optional validation rule"
    }
  ]
}`;

export async function generateUISpec(
  prd: LeanPRD,
  enrichedContext: EnrichedContext
): Promise<UIBehaviorSpec> {
  const designSystem = getDesignSystemSummary();

  const prompt = `## Lean PRD
- Title: ${prd.title}
- Problem: ${prd.problemStatement}
- Solution: ${prd.proposedSolution}
- Affected Roles: ${prd.affectedRoles.join(", ")}
- Related Features: ${prd.relatedFeatures.join(", ")}
- Complexity: ${prd.estimatedComplexity}

### User Stories
${prd.userStories.map((s) => `- As a ${s.asA}, I want ${s.iWant}, so that ${s.soThat}`).join("\n")}

### Acceptance Criteria
${prd.acceptanceCriteria.map((c) => `- ${c}`).join("\n")}

## Design System
${designSystem}

## Context Summary
${enrichedContext.mergedSummary}

---

Generate a comprehensive UI Behavior Spec that:
1. Lists all screens needed (new and modified existing screens)
2. Defines the navigation flow between screens
3. Specifies component states and transitions
4. Defines interaction rules for every interactive element
5. Follows Chronicle's existing design patterns strictly
6. Considers all affected roles and their permissions`;

  const uiSpec = await callLLMJson<UIBehaviorSpec>(
    UI_SPEC_SYSTEM_PROMPT,
    [{ role: "user", content: prompt }],
    { temperature: 0.3, maxTokens: 8192 }
  );

  return uiSpec;
}
