# Chronicle AI Automation Pipeline

> Dari percakapan → otomatis jadi UI mockup yang tetap konsisten dengan produk.

## 🎯 Overview

Sistem AI automation yang mengubah percakapan user menjadi:
1. **PRD (Product Requirements Document)** - Lean PRD otomatis
2. **UI Behavior Spec** - Screen list, states, interaction rules
3. **Figma Mockup** - Wireframe yang konsisten dengan design system
4. **Notion Tickets** - Epic, Tasks, dan Feedback records

## 🔄 Pipeline Flow

```
User Chat
  → Conversation Memory (jaga konteks tetap nyambung)
  → Intent Detection (bug / feature / improvement)
  → Knowledge Retrieval (ambil aturan produk & design system)
  → Context Enrichment (gabungkan percakapan + knowledge base)
  → Product Reasoning (AI sebagai Product Owner → Lean PRD)
  → UI Behavior Spec (flow, screen list, state, interaction rule)
  → Figma Structure (generate mockup sesuai design system)
  → Notion Tickets (Epic + Tasks + Feedback + Design link)
```

## 📁 Project Structure

```
automation/
├── .env                          # Credentials & config
├── package.json
├── tsconfig.json
├── output/                       # Generated artifacts (PRD, specs, wireframes)
├── sessions/                     # Conversation session storage
└── src/
    ├── index.ts                  # Main entry point (CLI)
    ├── chat.ts                   # Interactive chat interface
    ├── test-pipeline.ts          # Test with sample data
    ├── config.ts                 # Environment configuration
    ├── pipeline/
    │   ├── types.ts              # Shared TypeScript types
    │   └── orchestrator.ts       # Pipeline runner (7 steps)
    ├── modules/
    │   ├── conversation-memory.ts   # Session persistence & management
    │   ├── intent-detection.ts      # Bug/Feature/Improvement classifier
    │   ├── knowledge-retrieval.ts   # Chronicle KB loader + relevance scoring
    │   ├── context-enrichment.ts    # Merge conversation + knowledge
    │   ├── product-reasoning.ts     # AI Product Owner → Lean PRD
    │   ├── ui-behavior-spec.ts      # Screen specs, flows, interactions
    │   └── figma-structure.ts       # Figma-ready mockup structure + HTML
    └── integrations/
        ├── ai.ts                 # LLM client (OpenAI-compatible, ZAI GLM)
        ├── figma.ts              # Figma browser automation (Playwright)
        └── notion.ts             # Notion API (Epic, Task, Feedback)
```

## 🚀 Quick Start

```bash
cd automation

# Install dependencies
npm install

# Install Playwright browsers (for Figma automation)
npx playwright install chromium

# Start interactive chat
npm run dev

# Or run with options
npm run chat                          # Interactive chat
npm run chat -- --skip-figma          # Skip Figma upload
npm run chat -- --skip-notion         # Skip Notion creation
npm run chat -- --skip-figma --skip-notion  # Local only (untuk development)

# Run test pipeline
npm run test

# Process existing session
npx tsx src/index.ts pipeline <session-id>

# List sessions
npx tsx src/index.ts sessions
```

## 🔧 Configuration

Semua credentials di `.env`:

| Variable | Description |
|----------|------------|
| `AI_BASE_URL` | LLM API endpoint (default: ZAI) |
| `AI_MODEL` | Model to use (default: glm-4.7) |
| `NOTION_API_KEY` | Notion integration token |
| `NOTION_DB_FEEDBACK` | Notion DB ID untuk Feedback |
| `NOTION_DB_EPIC` | Notion DB ID untuk Epic/PRD |
| `NOTION_DB_TASK` | Notion DB ID untuk Tasks |
| `FIGMA_EMAIL` | Figma login email |
| `FIGMA_PASSWORD` | Figma login password |

## 📊 Output Artifacts

Setiap pipeline run menghasilkan file di `output/`:

| File | Description |
|------|------------|
| `*-01-intent.json` | Detected intent (type, summary, priority) |
| `*-02-enriched.md` | Merged context analysis |
| `*-03-prd.json` | Lean PRD with user stories |
| `*-04-ui-spec.json` | Screen specs, flows, interaction rules |
| `*-05-figma-structure.json` | Figma mockup structure |
| `*-wireframe.html` | HTML wireframe preview |
| `*-00-full-result.json` | Complete pipeline summary |

## 🗺️ Module Details

### 1. Conversation Memory
- Stores messages with timestamps
- Session persistence (JSON files)
- Context window management (last N messages)

### 2. Intent Detection
- Classifies: **bug** / **feature** / **improvement**
- Detects priority, affected areas, confidence
- Uses Chronicle-specific area taxonomy

### 3. Knowledge Retrieval
- Loads Chronicle knowledge base (flow.md, features.md, faq.md, roles/)
- Keyword-based relevance scoring
- Chronicle Design System reference (layouts, components, colors)

### 4. Context Enrichment
- Merges conversation + knowledge into unified analysis
- Gap analysis (current vs desired state)
- Design constraints identification

### 5. Product Reasoning
- AI acts as Senior Product Owner
- Generates Lean PRD with:
  - Problem statement, proposed solution
  - User stories (As a..., I want..., So that...)
  - Acceptance criteria
  - Complexity estimation

### 6. UI Behavior Spec
- Screen list with layouts and components
- Navigation flow graph
- Component states and transitions
- Interaction rules (event → behavior)

### 7. Figma Structure + Notion
- Figma mockup elements with coordinates and design tokens
- HTML wireframe fallback
- Browser automation for Figma upload
- Notion: Epic → Tasks → Feedback with design links

## 📋 Notion Database Schema

### DB_FEEDBACK
- Name (title), Status, Priority, Type

### DB_EPIC
- Name (title), Status, Priority, Type, Complexity

### DB_TASK
- Name (title), Status, Priority, Type
- Linked to Epic via content

## 🎨 Chronicle Design System (Built-in)

The pipeline knows Chronicle's design system:
- **Layouts**: Dual-pane, Data grid, Form, Map view
- **Navigation**: Sidebar + Top bar + Context toolbar
- **Components**: Statistics cards, Maps, Tables, Calendars, Modals, etc.
- **Colors**: Status-based (vacant=green, occupied=red, etc.)
- **Roles**: Owner (full), Admin (operational), Manager (limited)
