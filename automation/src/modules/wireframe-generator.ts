// ============================================================
// Module 7B: Wireframe Generator (Replaces Figma Make)
// Generates professional HTML/CSS wireframes using LLM
// No more pixel coordinates — uses semantic HTML + flexbox/grid
// ============================================================
import { UIBehaviorSpec, LeanPRD, FigmaMockup, ScreenSpec } from "../pipeline/types.js";
import { callLLM } from "../integrations/ai.js";
import { getDesignSystemSummary } from "./knowledge-retrieval.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../../output");

// ── Chronicle Design Tokens as CSS Variables ─────────────────
const DESIGN_TOKENS_CSS = `
:root {
  /* Chronicle Color Palette */
  --color-primary: #2563EB;
  --color-primary-light: #3B82F6;
  --color-primary-dark: #1D4ED8;
  --color-secondary: #64748B;
  --color-secondary-light: #94A3B8;
  
  --color-success: #22C55E;
  --color-success-bg: #F0FDF4;
  --color-warning: #F59E0B;
  --color-warning-bg: #FFFBEB;
  --color-error: #EF4444;
  --color-error-bg: #FEF2F2;
  --color-info: #3B82F6;
  --color-info-bg: #EFF6FF;
  
  /* Background & Surface */
  --bg-page: #F8FAFC;
  --bg-card: #FFFFFF;
  --bg-sidebar: #1E293B;
  --bg-topbar: #FFFFFF;
  --bg-hover: #F1F5F9;
  --bg-active: #EFF6FF;
  
  /* Text */
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --text-inverse: #FFFFFF;
  --text-link: #2563EB;
  
  /* Borders */
  --border-default: #E2E8F0;
  --border-strong: #CBD5E1;
  --border-focus: #2563EB;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-lg: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-xl: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
  
  /* Layout */
  --sidebar-width: 240px;
  --topbar-height: 64px;
  --content-max-width: 1200px;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-xs: 11px;
  --font-sm: 13px;
  --font-base: 14px;
  --font-md: 16px;
  --font-lg: 18px;
  --font-xl: 20px;
  --font-2xl: 24px;
  --font-3xl: 30px;

  /* Status Colors (Chronicle-specific) */
  --status-vacant: #22C55E;
  --status-vacant-bg: #F0FDF4;
  --status-reserved: #F59E0B;
  --status-reserved-bg: #FFFBEB;
  --status-occupied: #EF4444;
  --status-occupied-bg: #FEF2F2;
  --status-maintenance: #3B82F6;
  --status-maintenance-bg: #EFF6FF;
}`;

// ── Base CSS Reset + Utility Classes ─────────────────────────
const BASE_CSS = `
${DESIGN_TOKENS_CSS}

/* Reset */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 14px; -webkit-font-smoothing: antialiased; }
body { font-family: var(--font-family); color: var(--text-primary); background: var(--bg-page); line-height: 1.5; }

/* App Layout */
.app-layout { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  color: var(--text-inverse);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  overflow-y: auto;
}
.sidebar-logo {
  padding: var(--space-6);
  font-size: var(--font-xl);
  font-weight: 700;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.sidebar-logo .logo-icon {
  width: 32px; height: 32px;
  background: var(--color-primary);
  border-radius: var(--radius-lg);
  display: flex; align-items: center; justify-content: center;
  font-size: var(--font-md);
}
.sidebar-nav { padding: var(--space-3) 0; flex: 1; }
.sidebar-section { padding: var(--space-2) var(--space-4); margin-top: var(--space-4); }
.sidebar-section-label {
  font-size: var(--font-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
}
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  margin: 1px var(--space-2);
  border-radius: var(--radius-md);
  color: var(--text-tertiary);
  font-size: var(--font-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
}
.nav-item:hover { background: rgba(255,255,255,0.08); color: var(--text-inverse); }
.nav-item.active { background: rgba(37, 99, 235, 0.3); color: var(--text-inverse); font-weight: 500; }
.nav-item .nav-icon { width: 18px; text-align: center; opacity: 0.7; }
.nav-item .nav-badge {
  margin-left: auto;
  background: var(--color-error);
  color: white;
  font-size: var(--font-xs);
  padding: 1px 6px;
  border-radius: var(--radius-full);
  font-weight: 600;
}

/* Main Content Area */
.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Top Bar */
.topbar {
  height: var(--topbar-height);
  background: var(--bg-topbar);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  padding: 0 var(--space-6);
  gap: var(--space-4);
  position: sticky;
  top: 0;
  z-index: 40;
}
.topbar-title { font-size: var(--font-lg); font-weight: 600; }
.topbar-breadcrumb {
  display: flex; align-items: center; gap: var(--space-2);
  font-size: var(--font-sm); color: var(--text-secondary);
}
.topbar-breadcrumb .separator { color: var(--border-strong); }
.topbar-search {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--bg-page);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-sm);
  color: var(--text-tertiary);
  min-width: 240px;
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.topbar-icon-btn {
  width: 36px; height: 36px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  position: relative;
}
.topbar-icon-btn:hover { background: var(--bg-hover); }
.topbar-icon-btn .dot {
  position: absolute; top: 6px; right: 6px;
  width: 8px; height: 8px;
  background: var(--color-error);
  border-radius: 50%;
  border: 2px solid white;
}
.topbar-avatar {
  width: 32px; height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: var(--font-sm); font-weight: 600;
  cursor: pointer;
}

/* Page Content */
.page-content { padding: var(--space-6); flex: 1; }

/* Context Toolbar */
.context-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}
.context-toolbar .toolbar-title {
  font-size: var(--font-2xl);
  font-weight: 700;
  margin-right: auto;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-primary-dark); }
.btn-secondary { background: var(--bg-card); color: var(--text-primary); border-color: var(--border-default); }
.btn-secondary:hover { background: var(--bg-hover); }
.btn-ghost { background: transparent; color: var(--text-secondary); }
.btn-ghost:hover { background: var(--bg-hover); color: var(--text-primary); }
.btn-danger { background: var(--color-error); color: white; }
.btn-sm { padding: var(--space-1) var(--space-3); font-size: var(--font-xs); }
.btn-lg { padding: var(--space-3) var(--space-6); font-size: var(--font-md); }

/* Cards */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.card-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.card-header h3 { font-size: var(--font-md); font-weight: 600; }
.card-body { padding: var(--space-5); }
.card-footer {
  padding: var(--space-3) var(--space-5);
  border-top: 1px solid var(--border-default);
  background: var(--bg-page);
}

/* Statistics Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.stat-card .stat-label { font-size: var(--font-sm); color: var(--text-secondary); }
.stat-card .stat-value { font-size: var(--font-3xl); font-weight: 700; }
.stat-card .stat-change {
  font-size: var(--font-xs);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.stat-card .stat-change.positive { color: var(--color-success); }
.stat-card .stat-change.negative { color: var(--color-error); }
.stat-card.accent-green { border-left: 3px solid var(--color-success); }
.stat-card.accent-blue { border-left: 3px solid var(--color-primary); }
.stat-card.accent-yellow { border-left: 3px solid var(--color-warning); }
.stat-card.accent-red { border-left: 3px solid var(--color-error); }

/* Tables */
.data-table-wrapper {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.table-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-default);
}
.table-toolbar .search-input {
  flex: 1;
  max-width: 300px;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: var(--bg-page);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-sm);
}
th {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-page);
  font-weight: 600;
  font-size: var(--font-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-default);
  white-space: nowrap;
}
td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-default);
}
tr:hover td { background: var(--bg-hover); }
.table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-sm);
  color: var(--text-secondary);
}

/* Status Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-xs);
  font-weight: 500;
  gap: 4px;
}
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

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-default);
  margin-bottom: var(--space-6);
}
.tab {
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease;
}
.tab:hover { color: var(--text-primary); }
.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

/* Forms */
.form-group { margin-bottom: var(--space-5); }
.form-label {
  display: block;
  font-size: var(--font-sm);
  font-weight: 500;
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}
.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-family: inherit;
  color: var(--text-primary);
  background: var(--bg-card);
  transition: border-color 0.15s ease;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.form-textarea { resize: vertical; min-height: 80px; }
.form-hint { font-size: var(--font-xs); color: var(--text-tertiary); margin-top: var(--space-1); }
.form-error { font-size: var(--font-xs); color: var(--color-error); margin-top: var(--space-1); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--border-default);
}
.modal-header h2 { font-size: var(--font-lg); font-weight: 600; }
.modal-close {
  width: 32px; height: 32px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  font-size: var(--font-lg);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary);
}
.modal-close:hover { background: var(--bg-hover); }
.modal-body { padding: var(--space-6); overflow-y: auto; flex: 1; }
.modal-footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border-default);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  background: var(--bg-page);
}

/* Map Placeholder */
.map-container {
  background: #E8F4E8;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  min-height: 400px;
}
.map-overlay {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.map-controls {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.map-control-btn {
  width: 32px; height: 32px;
  background: white;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: var(--font-md);
  box-shadow: var(--shadow-sm);
}
.map-marker {
  position: absolute;
  width: 24px; height: 24px;
  border-radius: var(--radius-sm);
  border: 2px solid white;
  box-shadow: var(--shadow-md);
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.map-grid-label {
  position: absolute;
  font-size: var(--font-xs);
  font-weight: 600;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
}

/* Dual Pane Layout */
.dual-pane {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  height: calc(100vh - var(--topbar-height) - 48px);
}
.dual-pane-left { overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-4); }
.dual-pane-right { overflow: hidden; border-radius: var(--radius-lg); }

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  text-align: center;
  color: var(--text-secondary);
}
.empty-state .empty-icon { font-size: 48px; margin-bottom: var(--space-4); opacity: 0.5; }
.empty-state h3 { font-size: var(--font-lg); color: var(--text-primary); margin-bottom: var(--space-2); }
.empty-state p { max-width: 400px; margin-bottom: var(--space-6); }

/* Loading Skeleton */
.skeleton {
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Toast */
.toast {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  background: var(--bg-sidebar);
  color: white;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  font-size: var(--font-sm);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  z-index: 200;
}

/* Filter / Chip */
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  background: var(--bg-page);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  font-size: var(--font-xs);
  color: var(--text-secondary);
  cursor: pointer;
}
.filter-chip.active { background: var(--color-info-bg); border-color: var(--color-primary); color: var(--color-primary); }

/* Calendar */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border-default);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.calendar-header-cell {
  padding: var(--space-2);
  background: var(--bg-page);
  font-size: var(--font-xs);
  font-weight: 600;
  text-align: center;
  color: var(--text-secondary);
}
.calendar-cell {
  padding: var(--space-2);
  background: var(--bg-card);
  min-height: 80px;
  font-size: var(--font-xs);
}
.calendar-cell .date-num { font-weight: 500; margin-bottom: var(--space-1); }
.calendar-event {
  padding: 2px 4px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Screen separator for multi-page wireframes */
.screen-separator {
  padding: var(--space-8) var(--space-6);
  text-align: center;
  position: relative;
}
.screen-separator::before {
  content: '';
  position: absolute;
  left: var(--space-6);
  right: var(--space-6);
  top: 50%;
  height: 1px;
  background: var(--border-strong);
}
.screen-separator .label {
  position: relative;
  background: var(--bg-page);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
`;

// ── LLM Prompt for HTML Wireframe Generation ─────────────────
const WIREFRAME_SYSTEM_PROMPT = `You are a Senior UI/UX Designer building wireframes for Chronicle, a cemetery management platform.

You generate **production-quality HTML wireframes** using semantic HTML and CSS classes.

CRITICAL RULES:
1. Use ONLY the pre-defined CSS classes listed below — DO NOT write inline styles or new <style> blocks
2. Build screens using the component library (sidebar, topbar, cards, tables, badges, forms, etc.)
3. Every screen must have: .app-layout > .sidebar + .main-content > .topbar + .page-content
4. Use realistic mock data (names, dates, amounts, statuses)
5. Output ONLY the <body> content — no <html>, <head>, <style>, or <script> tags
6. Each screen is wrapped in a <section class="screen-section" data-screen="screen-id">
7. Between screens, add: <div class="screen-separator"><span class="label">Screen Name</span></div>

AVAILABLE CSS CLASSES (use these, DO NOT create new ones):

Layout:
  .app-layout, .sidebar, .main-content, .page-content
  .dual-pane, .dual-pane-left, .dual-pane-right

Sidebar:
  .sidebar-logo, .logo-icon, .sidebar-nav, .sidebar-section, .sidebar-section-label
  .nav-item, .nav-item.active, .nav-icon, .nav-badge

Top Bar:
  .topbar, .topbar-title, .topbar-breadcrumb, .separator
  .topbar-search, .topbar-actions, .topbar-icon-btn, .dot, .topbar-avatar

Content:
  .context-toolbar, .toolbar-title
  .tabs, .tab, .tab.active

Cards:
  .card, .card-header, .card-body, .card-footer
  .stats-grid, .stat-card, .stat-label, .stat-value, .stat-change, .positive, .negative
  .stat-card.accent-green, .accent-blue, .accent-yellow, .accent-red

Tables:
  .data-table-wrapper, .table-toolbar, .search-input
  table, th, td, .table-pagination

Badges:
  .badge, .badge-success, .badge-warning, .badge-error, .badge-info, .badge-neutral

Buttons:
  .btn, .btn-primary, .btn-secondary, .btn-ghost, .btn-danger
  .btn-sm, .btn-lg

Forms:
  .form-group, .form-label, .form-input, .form-select, .form-textarea
  .form-hint, .form-error, .form-row

Modal:
  .modal-overlay, .modal, .modal-header, .modal-close, .modal-body, .modal-footer

Map:
  .map-container, .map-overlay, .map-controls, .map-control-btn
  .map-marker, .map-grid-label

Other:
  .empty-state, .empty-icon, .skeleton, .toast, .filter-chip, .filter-chip.active
  .calendar-grid, .calendar-header-cell, .calendar-cell, .date-num, .calendar-event

Chronicle-specific statuses:
  Vacant=badge-success, Reserved=badge-warning, Occupied=badge-error, Maintenance=badge-info
  Paid=badge-success, Unpaid=badge-error, Partial=badge-warning, Overdue=badge-error

SIDEBAR NAVIGATION (always include):
  📊 Dashboard (with sub-tabs: Map / Tables / Calendar)
  📋 Requests
  💰 Sales
  📈 Reports
  🏢 Organization
  👤 My Profile
  ❓ Help
  Mark the relevant nav-item as .active based on the screen being designed.

DESIGN PRINCIPLES:
- Clean, professional, minimal
- Proper visual hierarchy (larger headings, muted secondary text)
- Consistent spacing using the design token gaps
- Use realistic but short placeholder data
- Tables should have 3-5 sample rows
- Show both normal and edge-case states where relevant
`;

/**
 * Generate professional HTML wireframes for all screens in the UI spec.
 * Uses LLM to produce semantic HTML that uses the Chronicle Design System CSS classes.
 */
export async function generateWireframes(
  uiSpec: UIBehaviorSpec,
  prd: LeanPRD,
  options: {
    maxScreensPerBatch?: number;
    outputDir?: string;
  } = {}
): Promise<WireframeResult> {
  const outputDir = options.outputDir || OUTPUT_DIR;
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  const maxPerBatch = options.maxScreensPerBatch || 3;
  const allScreenHtml: string[] = [];
  const screenResults: ScreenWireframe[] = [];

  // Process screens in batches to avoid token limits
  const batches = chunkArray(uiSpec.screenList, maxPerBatch);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`  🎨 Generating wireframes batch ${i + 1}/${batches.length} (${batch.map(s => s.name).join(", ")})...`);

    const screenDescriptions = batch
      .map(
        (s) => `### Screen: "${s.name}" (ID: ${s.id})
Layout: ${s.layout}
Description: ${s.description}
Components:
${s.components.map((c) => `  - ${c.name} (${c.type}): interactions=[${c.interactions.join(", ")}]`).join("\n")}
States:
${s.states.map((st) => `  - ${st.name}: ${st.description}`).join("\n")}
Data entities: ${s.dataEntities.join(", ")}`
      )
      .join("\n\n");

    const flowsForScreens = uiSpec.navigationFlow
      .filter((f) => batch.some((s) => s.id === f.from || s.id === f.to))
      .map((f) => `${f.from} → ${f.to} [${f.trigger}]`)
      .join("\n");

    const rulesForScreens = uiSpec.interactionRules
      .filter((r) => batch.some((s) => s.id === r.screen))
      .map((r) => `${r.screen} / ${r.component}: on ${r.event} → ${r.behavior}`)
      .join("\n");

    const prompt = `## Product Context
Title: ${prd.title}
Problem: ${prd.problemStatement}
Solution: ${prd.proposedSolution}

## Screens to Design
${screenDescriptions}

## Navigation Flow
${flowsForScreens || "N/A"}

## Interaction Rules
${rulesForScreens || "N/A"}

---

Generate the HTML wireframe for the ${batch.length} screen(s) above.
Use the provided CSS classes only. Include realistic mock data.
Wrap each screen in <section class="screen-section" data-screen="SCREEN_ID">.
Add screen separators between screens.`;

    const html = await callLLM(WIREFRAME_SYSTEM_PROMPT, [{ role: "user", content: prompt }], {
      temperature: 0.2,
      maxTokens: 16384,
    });

    // Clean up LLM response — extract only HTML
    const cleanHtml = extractHtml(html);
    allScreenHtml.push(cleanHtml);

    for (const screen of batch) {
      screenResults.push({ screenId: screen.id, screenName: screen.name });
    }
  }

  // Assemble the full wireframe document
  const fullHtml = assembleWireframeDocument(prd.title, allScreenHtml.join("\n"));

  // Save the combined wireframe
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const wireframePath = resolve(outputDir, `${timestamp}-wireframe.html`);
  writeFileSync(wireframePath, fullHtml);

  console.log(`  💾 Wireframe saved: ${wireframePath}`);

  return {
    html: fullHtml,
    filePath: wireframePath,
    screens: screenResults,
    timestamp,
  };
}

// ── Assemble final HTML document ─────────────────────────────

function assembleWireframeDocument(projectName: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(projectName)} — Chronicle Wireframe</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${BASE_CSS}</style>
  <style>
    /* Screen navigation */
    .wireframe-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #1E293B;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 48px;
      gap: 16px;
      font-family: var(--font-family);
      font-size: 13px;
    }
    .wireframe-nav .wf-title {
      font-weight: 700;
      font-size: 14px;
      margin-right: 16px;
      padding-right: 16px;
      border-right: 1px solid rgba(255,255,255,0.2);
    }
    .wireframe-nav a {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      padding: 6px 12px;
      border-radius: 6px;
      transition: all 0.15s;
    }
    .wireframe-nav a:hover { background: rgba(255,255,255,0.1); color: white; }
    .wireframe-nav .wf-badge {
      margin-left: auto;
      font-size: 11px;
      color: rgba(255,255,255,0.5);
    }
    .screen-section { padding-top: 48px; } /* offset for fixed nav */
    body { padding-top: 48px; }
  </style>
</head>
<body>
  <nav class="wireframe-nav">
    <span class="wf-title">📐 ${escapeHtml(projectName)}</span>
    <span class="wf-badge">Chronicle AI Pipeline Wireframe</span>
  </nav>

${bodyContent}

  <script>
    // Populate screen nav links
    document.addEventListener('DOMContentLoaded', () => {
      const nav = document.querySelector('.wireframe-nav');
      const badge = nav.querySelector('.wf-badge');
      const sections = document.querySelectorAll('.screen-section');
      sections.forEach(s => {
        const id = s.dataset.screen || 'unknown';
        const name = s.querySelector('.topbar-title')?.textContent || id;
        const link = document.createElement('a');
        link.href = '#' + id;
        link.textContent = name;
        nav.insertBefore(link, badge);
      });
      // Smooth scroll
      nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          const target = document.querySelector(a.getAttribute('href'));
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      });
    });
  </script>
</body>
</html>`;
}

// ── Helpers ───────────────────────────────────────────────────

function extractHtml(llmResponse: string): string {
  // Remove markdown code fences if present
  let html = llmResponse;

  // Try to extract from ```html ... ``` block
  const htmlMatch = html.match(/```html\s*\n?([\s\S]*?)\n?```/);
  if (htmlMatch) {
    html = htmlMatch[1];
  } else {
    // Try generic code block
    const codeMatch = html.match(/```\s*\n?([\s\S]*?)\n?```/);
    if (codeMatch) {
      html = codeMatch[1];
    }
  }

  // Remove any <html>, <head>, <body>, <style>, <script> wrappers the LLM might have added
  html = html.replace(/<\/?html[^>]*>/gi, "");
  html = html.replace(/<head[\s\S]*?<\/head>/gi, "");
  html = html.replace(/<\/?body[^>]*>/gi, "");
  html = html.replace(/<style[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

  return html.trim();
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ── Types ────────────────────────────────────────────────────

export interface ScreenWireframe {
  screenId: string;
  screenName: string;
}

export interface WireframeResult {
  html: string;
  filePath: string;
  screens: ScreenWireframe[];
  timestamp: string;
}
