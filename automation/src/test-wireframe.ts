// ============================================================
// Quick Design Test
// Generate 1 screen wireframe langsung — tanpa chat panjang-panjang
// Usage: npx tsx src/test-wireframe.ts
// ============================================================
import { callLLM } from "./integrations/ai.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../output");

// ── Same design system CSS from wireframe-generator.ts ───────
const DESIGN_CSS = `
:root {
  --color-primary: #2563EB;
  --color-primary-light: #3B82F6;
  --color-primary-dark: #1D4ED8;
  --color-secondary: #64748B;
  --color-success: #22C55E;
  --color-success-bg: #F0FDF4;
  --color-warning: #F59E0B;
  --color-warning-bg: #FFFBEB;
  --color-error: #EF4444;
  --color-error-bg: #FEF2F2;
  --color-info: #3B82F6;
  --color-info-bg: #EFF6FF;
  --bg-page: #F8FAFC;
  --bg-card: #FFFFFF;
  --bg-sidebar: #1E293B;
  --bg-topbar: #FFFFFF;
  --bg-hover: #F1F5F9;
  --bg-active: #EFF6FF;
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --text-inverse: #FFFFFF;
  --border-default: #E2E8F0;
  --border-strong: #CBD5E1;
  --border-focus: #2563EB;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-12: 48px;
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px; --radius-xl: 12px; --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-lg: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --sidebar-width: 240px;
  --topbar-height: 64px;
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-xs: 11px; --font-sm: 13px; --font-base: 14px; --font-md: 16px;
  --font-lg: 18px; --font-xl: 20px; --font-2xl: 24px; --font-3xl: 30px;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 14px; -webkit-font-smoothing: antialiased; }
body { font-family: var(--font-family); color: var(--text-primary); background: var(--bg-page); line-height: 1.5; }
.app-layout { display: flex; min-height: 100vh; }
.sidebar { width: var(--sidebar-width); background: var(--bg-sidebar); color: var(--text-inverse); display: flex; flex-direction: column; flex-shrink: 0; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; overflow-y: auto; }
.sidebar-logo { padding: var(--space-6); font-size: var(--font-xl); font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: var(--space-3); }
.sidebar-logo .logo-icon { width: 32px; height: 32px; background: var(--color-primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; font-size: var(--font-md); }
.sidebar-nav { padding: var(--space-3) 0; flex: 1; }
.sidebar-section { padding: var(--space-2) var(--space-4); margin-top: var(--space-4); }
.sidebar-section-label { font-size: var(--font-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-tertiary); margin-bottom: var(--space-2); }
.nav-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-4); margin: 1px var(--space-2); border-radius: var(--radius-md); color: var(--text-tertiary); font-size: var(--font-sm); cursor: pointer; transition: all 0.15s ease; text-decoration: none; }
.nav-item:hover { background: rgba(255,255,255,0.08); color: var(--text-inverse); }
.nav-item.active { background: rgba(37, 99, 235, 0.3); color: var(--text-inverse); font-weight: 500; }
.nav-item .nav-icon { width: 18px; text-align: center; opacity: 0.7; }
.nav-item .nav-badge { margin-left: auto; background: var(--color-error); color: white; font-size: var(--font-xs); padding: 1px 6px; border-radius: var(--radius-full); font-weight: 600; }
.main-content { flex: 1; margin-left: var(--sidebar-width); display: flex; flex-direction: column; min-height: 100vh; }
.topbar { height: var(--topbar-height); background: var(--bg-topbar); border-bottom: 1px solid var(--border-default); display: flex; align-items: center; padding: 0 var(--space-6); gap: var(--space-4); position: sticky; top: 0; z-index: 40; }
.topbar-title { font-size: var(--font-lg); font-weight: 600; }
.topbar-breadcrumb { display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-sm); color: var(--text-secondary); }
.topbar-breadcrumb .separator { color: var(--border-strong); }
.topbar-search { margin-left: auto; display: flex; align-items: center; gap: var(--space-2); background: var(--bg-page); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: var(--font-sm); color: var(--text-tertiary); min-width: 240px; }
.topbar-actions { display: flex; align-items: center; gap: var(--space-3); }
.topbar-icon-btn { width: 36px; height: 36px; border-radius: var(--radius-md); border: none; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-secondary); position: relative; }
.topbar-icon-btn:hover { background: var(--bg-hover); }
.topbar-icon-btn .dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: var(--color-error); border-radius: 50%; border: 2px solid white; }
.topbar-avatar { width: 32px; height: 32px; border-radius: var(--radius-full); background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: var(--font-sm); font-weight: 600; cursor: pointer; }
.page-content { padding: var(--space-6); flex: 1; }
.context-toolbar { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-6); flex-wrap: wrap; }
.context-toolbar .toolbar-title { font-size: var(--font-2xl); font-weight: 700; margin-right: auto; }
.btn { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-sm); font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; white-space: nowrap; }
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-primary-dark); }
.btn-secondary { background: var(--bg-card); color: var(--text-primary); border-color: var(--border-default); }
.btn-secondary:hover { background: var(--bg-hover); }
.btn-ghost { background: transparent; color: var(--text-secondary); }
.btn-ghost:hover { background: var(--bg-hover); color: var(--text-primary); }
.btn-danger { background: var(--color-error); color: white; }
.btn-sm { padding: var(--space-1) var(--space-3); font-size: var(--font-xs); }
.card { background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; }
.card-header { padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-default); display: flex; align-items: center; gap: var(--space-3); }
.card-header h3 { font-size: var(--font-md); font-weight: 600; }
.card-body { padding: var(--space-5); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); }
.stat-card { background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
.stat-card .stat-label { font-size: var(--font-sm); color: var(--text-secondary); }
.stat-card .stat-value { font-size: var(--font-3xl); font-weight: 700; }
.stat-card .stat-change { font-size: var(--font-xs); display: flex; align-items: center; gap: var(--space-1); }
.stat-card .stat-change.positive { color: var(--color-success); }
.stat-card .stat-change.negative { color: var(--color-error); }
.stat-card.accent-green { border-left: 3px solid var(--color-success); }
.stat-card.accent-blue { border-left: 3px solid var(--color-primary); }
.stat-card.accent-yellow { border-left: 3px solid var(--color-warning); }
.stat-card.accent-red { border-left: 3px solid var(--color-error); }
.data-table-wrapper { background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden; }
.table-toolbar { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--border-default); }
.table-toolbar .search-input { flex: 1; max-width: 300px; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-default); border-radius: var(--radius-md); font-size: var(--font-sm); background: var(--bg-page); }
table { width: 100%; border-collapse: collapse; font-size: var(--font-sm); }
th { text-align: left; padding: var(--space-3) var(--space-4); background: var(--bg-page); font-weight: 600; font-size: var(--font-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); border-bottom: 1px solid var(--border-default); white-space: nowrap; }
td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--border-default); }
tr:hover td { background: var(--bg-hover); }
.table-pagination { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); font-size: var(--font-sm); color: var(--text-secondary); }
.badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: var(--radius-full); font-size: var(--font-xs); font-weight: 500; gap: 4px; }
.badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; }
.badge-success { background: var(--color-success-bg); color: #166534; }
.badge-success::before { background: var(--color-success); }
.badge-warning { background: var(--color-warning-bg); color: #92400E; }
.badge-warning::before { background: var(--color-warning); }
.badge-error { background: var(--color-error-bg); color: #991B1B; }
.badge-error::before { background: var(--color-error); }
.badge-info { background: var(--color-info-bg); color: #1E40AF; }
.badge-info::before { background: var(--color-info); }
.badge-neutral { background: #F1F5F9; color: #475569; }
.badge-neutral::before { background: #94A3B8; }
.tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border-default); margin-bottom: var(--space-6); }
.tab { padding: var(--space-3) var(--space-5); font-size: var(--font-sm); font-weight: 500; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s ease; }
.tab:hover { color: var(--text-primary); }
.tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
.form-group { margin-bottom: var(--space-5); }
.form-label { display: block; font-size: var(--font-sm); font-weight: 500; margin-bottom: var(--space-2); color: var(--text-primary); }
.form-input, .form-select, .form-textarea { width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-default); border-radius: var(--radius-md); font-size: var(--font-sm); font-family: inherit; color: var(--text-primary); background: var(--bg-card); }
.form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal { background: var(--bg-card); border-radius: var(--radius-xl); box-shadow: 0 10px 15px rgba(0,0,0,0.1); width: 100%; max-width: 560px; max-height: 85vh; overflow: hidden; display: flex; flex-direction: column; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: var(--space-5) var(--space-6); border-bottom: 1px solid var(--border-default); }
.modal-header h2 { font-size: var(--font-lg); font-weight: 600; }
.modal-close { width: 32px; height: 32px; border-radius: var(--radius-md); border: none; background: transparent; font-size: var(--font-lg); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); }
.modal-body { padding: var(--space-6); overflow-y: auto; flex: 1; }
.modal-footer { padding: var(--space-4) var(--space-6); border-top: 1px solid var(--border-default); display: flex; justify-content: flex-end; gap: var(--space-3); background: var(--bg-page); }
.map-container { background: #E8F4E8; border: 1px solid var(--border-default); border-radius: var(--radius-lg); position: relative; overflow: hidden; min-height: 400px; }
.map-overlay { position: absolute; top: var(--space-3); left: var(--space-3); z-index: 10; display: flex; flex-direction: column; gap: var(--space-2); }
.map-controls { position: absolute; top: var(--space-3); right: var(--space-3); z-index: 10; display: flex; flex-direction: column; gap: var(--space-1); }
.map-control-btn { width: 32px; height: 32px; background: white; border: 1px solid var(--border-default); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: var(--font-md); box-shadow: var(--shadow-sm); }
.map-marker { position: absolute; width: 24px; height: 24px; border-radius: var(--radius-sm); border: 2px solid white; box-shadow: var(--shadow-md); transform: translate(-50%, -50%); cursor: pointer; }
.dual-pane { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); min-height: calc(100vh - var(--topbar-height) - 48px); }
.dual-pane-left { overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-4); }
.dual-pane-right { overflow: hidden; border-radius: var(--radius-lg); }
.filter-chip { display: inline-flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-3); background: var(--bg-page); border: 1px solid var(--border-default); border-radius: var(--radius-full); font-size: var(--font-xs); color: var(--text-secondary); cursor: pointer; }
.filter-chip.active { background: var(--color-info-bg); border-color: var(--color-primary); color: var(--color-primary); }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-12); text-align: center; color: var(--text-secondary); }
.empty-state .empty-icon { font-size: 48px; margin-bottom: var(--space-4); opacity: 0.5; }
.empty-state h3 { font-size: var(--font-lg); color: var(--text-primary); margin-bottom: var(--space-2); }
`;

const SYSTEM_PROMPT = `You are a Senior UI/UX Designer. Generate a COMPLETE, production-quality HTML wireframe.

CRITICAL RULES:
1. Use ONLY the pre-defined CSS classes — NO inline styles, NO new <style> blocks
2. Output ONLY the HTML body content — NO <html>, <head>, <style>, <script> tags
3. Use realistic mock data
4. The layout MUST include: .app-layout > .sidebar + .main-content > .topbar + .page-content

AVAILABLE CSS CLASSES:
Layout: .app-layout, .sidebar, .main-content, .page-content, .dual-pane, .dual-pane-left, .dual-pane-right
Sidebar: .sidebar-logo, .logo-icon, .sidebar-nav, .sidebar-section, .sidebar-section-label, .nav-item, .nav-item.active, .nav-icon, .nav-badge
Topbar: .topbar, .topbar-title, .topbar-search, .topbar-actions, .topbar-icon-btn, .dot, .topbar-avatar
Content: .context-toolbar, .toolbar-title, .tabs, .tab, .tab.active
Cards: .card, .card-header, .card-body, .stats-grid, .stat-card, .stat-label, .stat-value, .stat-change, .positive, .negative, .accent-green, .accent-blue, .accent-yellow, .accent-red
Tables: .data-table-wrapper, .table-toolbar, .search-input, table, th, td, .table-pagination
Badges: .badge, .badge-success, .badge-warning, .badge-error, .badge-info, .badge-neutral
Buttons: .btn, .btn-primary, .btn-secondary, .btn-ghost, .btn-danger, .btn-sm
Forms: .form-group, .form-label, .form-input, .form-select, .form-textarea, .form-row
Modal: .modal-overlay, .modal, .modal-header, .modal-close, .modal-body, .modal-footer
Map: .map-container, .map-overlay, .map-controls, .map-control-btn, .map-marker
Other: .empty-state, .filter-chip, .filter-chip.active

Sidebar nav items (always include): 📊 Dashboard, 📋 Requests, 💰 Sales, 📈 Reports, 🏢 Organization, 👤 My Profile
Mark the relevant .nav-item as .active.`;

async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("🧪 Quick Wireframe Test");
  console.log("═══════════════════════════════════════════");
  console.log("Generating Dashboard screen wireframe...\n");

  const startTime = Date.now();

  const prompt = `Design a Chronicle Dashboard screen with:
1. Sidebar with navigation (Dashboard is active)
2. Top bar with search and notifications
3. Stats grid: Total Plots (1,247), Occupied (834), Vacant (289), Maintenance (124)
4. Below stats: dual-pane layout
   - Left: Data table showing recent burial requests (columns: ID, Name, Status, Date, Type)
   - Right: Map container placeholder with some map markers
5. Use realistic cemetery management data
6. Include status badges (Vacant=badge-success, Occupied=badge-error, Pending=badge-warning)`;

  console.log("⏳ Calling LLM...");
  const html = await callLLM(SYSTEM_PROMPT, [{ role: "user", content: prompt }], {
    temperature: 0.2,
    maxTokens: 8192,
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`✅ LLM response received (${elapsed}s)\n`);

  // Clean up
  let cleanHtml = html;
  const htmlMatch = html.match(/```html\s*\n?([\s\S]*?)\n?```/);
  if (htmlMatch) cleanHtml = htmlMatch[1];
  else {
    const codeMatch = html.match(/```\s*\n?([\s\S]*?)\n?```/);
    if (codeMatch) cleanHtml = codeMatch[1];
  }
  cleanHtml = cleanHtml.replace(/<\/?html[^>]*>/gi, "");
  cleanHtml = cleanHtml.replace(/<head[\s\S]*?<\/head>/gi, "");
  cleanHtml = cleanHtml.replace(/<\/?body[^>]*>/gi, "");
  cleanHtml = cleanHtml.replace(/<style[\s\S]*?<\/style>/gi, "");
  cleanHtml = cleanHtml.replace(/<script[\s\S]*?<\/script>/gi, "");

  // Assemble
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chronicle Dashboard — Quick Test</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${DESIGN_CSS}</style>
</head>
<body>
${cleanHtml.trim()}
</body>
</html>`;

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = resolve(OUTPUT_DIR, "test-wireframe.html");
  writeFileSync(outPath, fullHtml);

  console.log(`📄 Output: ${outPath}`);
  console.log(`📏 HTML size: ${(fullHtml.length / 1024).toFixed(1)} KB`);
  console.log(`\n💡 Open it: open "${outPath}"`);
}

main().catch(console.error);
