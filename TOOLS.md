# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:


## Test Automation
- Chronicle run automation can use the trigger is like word "running automation tag X" or "running X scenario" or "run x" or "execute x" or "run scenario x" or "execute scenario x" or "run tag x" or "execute tag x" or "run scenario x" or "execute scenario x".

```bash
cd /Users/ahmadfaris/work/automation_web && npm run test:headless -- --tags "@{tag}"
```
reference: automation_web "/Users/ahmadfaris/work/automation_web"
package.json (../../work/automation_web/package.json)
environment available is
- dev
- staging (default)
- prod (some user call it map)

**Important:** Do NOT ask clarifying questions when the user says "running automation tag X" — just execute the test immediately.
If there's a `cucumber-report.json` in `/Users/ahmadfaris/work/automation_web/`, parse it and include Summary table with passed/failed count.

---

## Chronicle Knowledge Base

**Locations:**
```
docs/knowledge-base/chronicle/
├── flow.md              → product flow & architecture
├── features.md          → fitur-fitur Chronicle
├── faq.md               → FAQ
├── role-owner.md        → Owner journey
├── role-admin.md        → Admin journey
├── role-manager.md      → Manager journey
├── user-journeys.md     → Combined journeys
├── chronicle-full.md    → Full extracted knowledge
└── knowledge-index.json → Screen/module index
```

**Retrieval Logic:**
- Dari `AFFECTED_MODULES` → cari screen/module relevan
- Dari `TARGET_ROLE` → load role-specific file
- Cross-role query → `user-journeys.md` atau `chronicle-full.md`

**Example:**
- "Dashboard Map error" → `role-owner.md` bagian Dashboard-Map
- "Manager tidak bisa approve" → `role-manager.md` bagian MANAGER REQUEST REVIEW

---

Add whatever helps you do your job. This is your cheat sheet.
