# Chronicle AI Automation Pipeline

## Overview
Sistem AI automation yang mengolah percakapan user menjadi UI mockup, PRD, dan Notion tickets secara otomatis.

**Goal**: Dari percakapan → otomatis jadi UI mockup yang tetap konsisten dengan produk Chronicle.

## Pipeline Flow

```
User Chat
  → [1] Conversation Memory (jaga konteks percakapan tetap nyambung)
  → [2] Intent Detection (bug / feature / improvement)
  → [3] Knowledge Retrieval (ambil aturan produk & design system yang relevan)
  → [4] Context Enrichment (gabungkan percakapan + knowledge base)
  → [5] Product Reasoning (agent berpikir seperti Product Owner → Lean PRD)
  → [6] UI Behavior Spec (flow, screen list, state, interaction rules)
  → [7] Figma Structure (generate mockup sesuai design system)
  → [8] Notion Tickets (Epic + Tasks + Feedback + Design link)
```

## Project Location
`/workspace/automation/`

## Quick Start

```bash
cd workspace/automation

# Interactive chat → auto pipeline on "end session"
npm run chat

# Run pipeline on existing session
npm run pipeline -- <session-id>

# Test with sample conversation
npm run test -- --skip-figma

# List saved sessions
npx tsx src/index.ts sessions
```

## Architecture

```
automation/
├── src/
│   ├── index.ts                    # Entry point (chat/pipeline/test/sessions)
│   ├── chat.ts                     # Interactive chat interface
│   ├── config.ts                   # Environment config loader
│   ├── modules/
│   │   ├── conversation-memory.ts  # [1] Session persistence & context management
│   │   ├── intent-detection.ts     # [2] Classify: bug / feature / improvement
│   │   ├── knowledge-retrieval.ts  # [3] Load relevant KB chunks + design system
│   │   ├── context-enrichment.ts   # [4] Merge conversation + knowledge
│   │   ├── product-reasoning.ts    # [5] Generate Lean PRD
│   │   ├── ui-behavior-spec.ts     # [6] Screen list, flows, states, interactions
│   │   └── figma-structure.ts      # [7] Figma-ready mockup structure + HTML wireframe
│   ├── integrations/
│   │   ├── ai.ts                   # LLM client (ZAI GLM via OpenAI-compatible API)
│   │   ├── figma-api.ts            # Figma REST API client (read, export, comments)
│   │   ├── figma-adapter.ts        # Hybrid adapter: API-first → browser fallback
│   │   ├── figma.ts                # Playwright browser automation for Figma (write)
│   │   └── notion.ts               # Notion API: create Epic, Tasks, Feedback
│   └── pipeline/
│       ├── types.ts                # Shared TypeScript types
│       └── orchestrator.ts         # Main pipeline: runs all 7 steps in sequence
├── .env                            # Credentials (AI, Notion, Figma API + browser)
├── package.json
└── tsconfig.json
```

## Modules Detail

### 1. Conversation Memory
- Persistent sessions (JSON files)
- Add/end sessions, context window management
- Provides formatted conversation text for downstream modules

### 2. Intent Detection
- LLM classifies conversation as bug/feature/improvement
- Outputs: type, confidence, summary, affected Chronicle areas, priority

### 3. Knowledge Retrieval
- Loads Chronicle KB markdown files from `docs/knowledge-base/chronicle/`
- Keyword-based relevance scoring against intent
- Includes Chronicle Design System reference (navigation, layouts, components, color coding)

### 4. Context Enrichment
- Merges conversation + intent + knowledge into single analysis
- Produces: User Request Summary, Current Product State, Gap Analysis, Design Constraints, Impact Assessment

### 5. Product Reasoning
- AI acts as Product Owner
- Generates Lean PRD: problem statement, user stories, acceptance criteria, scope, complexity estimate

### 6. UI Behavior Spec
- Screen list with layout types (dual-pane, data-grid, form, map-view, modal)
- Component specs with interactions
- Navigation flow between screens
- State definitions and transitions
- Interaction rules per component

### 7. Figma Structure + Hybrid (API + Browser)
- Generates Figma-ready mockup structure (pages, frames, elements, design tokens)
- HTML wireframe as fallback/preview
- **Primary: Figma REST API** (read files, export images, styles, components, comments, variables)
- **Fallback: Playwright browser** automation for write/create operations (API is read-only for design)
- Adapter auto-detects available credentials and picks optimal mode

### 8. Notion Integration
- Creates Feedback entry in DB_FEEDBACK
- Creates Epic in DB_EPIC (with full PRD content)
- Creates Tasks in DB_TASK (one per screen + interaction rules)
- Attaches Figma design URL to Epic

## Notion Databases
- `DB_FEEDBACK`: 25fa04be2a354155805241ae6e620cf5
- `DB_EPIC`: d104cd1a15cd4184ad00b7f45615e6a6
- `DB_TASK`: 32e29af7d7dd4df69310270de8830d1a

## CLI Flags
- `--skip-figma`: Skip Figma browser automation (HTML wireframe still generated)
- `--skip-notion`: Skip Notion ticket creation

## Output
All pipeline artifacts are saved to `automation/output/`:
- `*-01-intent.json` — Detected intent
- `*-02-enriched.md` — Enriched context analysis
- `*-03-prd.json` — Lean PRD
- `*-04-ui-spec.json` — UI Behavior Specification
- `*-05-figma-structure.json` — Figma mockup structure
- `*-wireframe.html` — HTML wireframe preview
- `*-00-full-result.json` — Summary of full pipeline run