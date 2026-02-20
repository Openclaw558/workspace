// ============================================================
// Module 7: Figma Structure
// Generates mockup structure for Figma creation
// ============================================================
import {
  UIBehaviorSpec,
  LeanPRD,
  FigmaMockup,
  FigmaPage,
  FigmaFrame,
  FigmaElement,
} from "../pipeline/types.js";
import { callLLMJson } from "../integrations/ai.js";
import { getDesignSystemSummary } from "./knowledge-retrieval.js";

const FIGMA_STRUCT_SYSTEM_PROMPT = `You are a Senior UI Designer for Chronicle, a cemetery management platform.

Given a UI Behavior Spec and PRD, generate a Figma-ready mockup structure.
Focus on describing the FUNCTIONAL layout and content of each screen.
The structure should clearly communicate what elements are on each screen and their relative positioning.

Chronicle's design direction:
- Professional, enterprise-grade SaaS aesthetic
- Clean layout with clear visual hierarchy
- Desktop-first: 1440x900
- Standard sidebar (240px) + top bar (64px) + content area
- Use Chronicle's color palette: Blue primary (#2563EB), light gray bg (#F8FAFC), proper status colors

Return ONLY valid JSON matching this schema:
{
  "projectName": "string",
  "pages": [
    {
      "name": "string - page name (e.g. 'Dashboard - Map View')",
      "frames": [
        {
          "name": "string - frame name",
          "screenId": "string - matches UI spec screen id",
          "width": 1440,
          "height": 900,
          "elements": [
            {
              "type": "rectangle|text|frame|component|group",
              "name": "string - descriptive name of what this element represents",
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "properties": {
                "fill": "#hex",
                "stroke": "#hex",
                "cornerRadius": 0,
                "fontSize": 0,
                "fontWeight": "string",
                "text": "string - actual label or content text",
                "opacity": 1
              },
              "children": []
            }
          ]
        }
      ]
    }
  ],
  "designTokens": {
    "primaryColor": "#2563EB",
    "backgroundColor": "#F8FAFC",
    "textColor": "#1E293B",
    "borderColor": "#E2E8F0",
    "successColor": "#22C55E",
    "warningColor": "#F59E0B",
    "errorColor": "#EF4444"
  }
}`;

export async function generateFigmaStructure(
  uiSpec: UIBehaviorSpec,
  prd: LeanPRD
): Promise<FigmaMockup> {
  const designSystem = getDesignSystemSummary();

  const screensDescription = uiSpec.screenList
    .map(
      (s) =>
        `### ${s.name} (${s.id})
Layout: ${s.layout}
Description: ${s.description}
Components: ${s.components.map((c) => c.name).join(", ")}
Data: ${s.dataEntities.join(", ")}`
    )
    .join("\n\n");

  const flowDescription = uiSpec.navigationFlow
    .map((f) => `${f.from} → ${f.to} [${f.trigger}]`)
    .join("\n");

  const prompt = `## PRD
Title: ${prd.title}
Solution: ${prd.proposedSolution}

## Screens to Design
${screensDescription}

## Navigation Flow
${flowDescription}

## Design System
${designSystem}

---

Generate a Figma mockup structure with:
1. One page per major screen
2. Each frame at 1440x900 (desktop)
3. Include sidebar, top bar, and content area
4. Every component from the UI spec should be represented as an element
5. Use proper positioning for a clean layout
6. Include meaningful text labels and content
7. Focus on what the user sees — not implementation details`;

  const mockup = await callLLMJson<FigmaMockup>(
    FIGMA_STRUCT_SYSTEM_PROMPT,
    [{ role: "user", content: prompt }],
    { temperature: 0.3, maxTokens: 8192 }
  );

  return mockup;
}

/**
 * Convert FigmaMockup to HTML wireframe for preview.
 * This is used as a fallback / preview before Figma upload.
 */
export function mockupToHTML(mockup: FigmaMockup): string {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${mockup.projectName} - Wireframe Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Inter, system-ui, sans-serif; background: #f1f5f9; color: #1e293b; }
  .page-title { padding: 24px; font-size: 24px; font-weight: 700; border-bottom: 1px solid #e2e8f0; background: white; }
  .frame-container { padding: 24px; }
  .frame { position: relative; background: white; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 32px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .frame-label { padding: 8px 16px; background: #2563eb; color: white; font-size: 12px; font-weight: 600; }
  .frame-content { position: relative; }
  .element { position: absolute; display: flex; align-items: center; justify-content: center; font-size: 11px; overflow: hidden; }
  .element-rect { border: 1px solid #e2e8f0; border-radius: 4px; }
  .element-text { font-weight: 500; }
  .nav-link { padding: 8px 12px; text-decoration: none; color: inherit; }
  .nav-link:hover { background: rgba(0,0,0,0.05); }
</style>
</head>
<body>`;

  for (const page of mockup.pages) {
    html += `\n<div class="page-title">${page.name}</div>\n<div class="frame-container">`;

    for (const frame of page.frames) {
      html += `\n<div class="frame">
  <div class="frame-label">${frame.name} (${frame.width}x${frame.height})</div>
  <div class="frame-content" style="width:${frame.width}px;height:${frame.height}px;">`;

      for (const el of frame.elements) {
        html += renderElement(el);
      }

      html += `\n  </div>\n</div>`;
    }

    html += `\n</div>`;
  }

  html += `\n</body></html>`;
  return html;
}

function renderElement(el: FigmaElement): string {
  const style = [
    `left:${el.x}px`,
    `top:${el.y}px`,
    `width:${el.width}px`,
    `height:${el.height}px`,
  ];

  const props = el.properties || {};
  if (props.fill) style.push(`background:${props.fill}`);
  if (props.stroke) style.push(`border:1px solid ${props.stroke}`);
  if (props.cornerRadius) style.push(`border-radius:${props.cornerRadius}px`);
  if (props.fontSize) style.push(`font-size:${props.fontSize}px`);
  if (props.fontWeight) style.push(`font-weight:${props.fontWeight}`);
  if (props.opacity !== undefined) style.push(`opacity:${props.opacity}`);

  const classes = ["element"];
  if (el.type === "rectangle" || el.type === "frame" || el.type === "component") {
    classes.push("element-rect");
  }
  if (el.type === "text") {
    classes.push("element-text");
  }

  const text = props.text || el.name;
  let childrenHtml = "";
  if (el.children) {
    childrenHtml = el.children.map(renderElement).join("");
  }

  return `\n    <div class="${classes.join(" ")}" style="${style.join(";")}" title="${el.name}">${text}${childrenHtml}</div>`;
}
