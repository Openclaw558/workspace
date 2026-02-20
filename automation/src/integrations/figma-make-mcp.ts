// ============================================================
// Figma Make + MCP Playwright Integration
//
// Crafts optimal prompts from PRD + UI Spec for Figma Make,
// and provides Playwright automation using ARIA/accessibility
// selectors (stable, not brittle CSS selectors).
//
// Flow:
//   1. Pipeline generates PRD + UI Spec
//   2. Notion tickets created (Epic, Tasks)
//   3. This module crafts Figma Make prompts per screen
//   4. Automates Figma Make via Playwright (ARIA selectors)
//   5. Returns Figma Make URL → updates Notion
// ============================================================
import { chromium, Browser, BrowserContext, Page } from "playwright";
import { LeanPRD, UIBehaviorSpec, ScreenSpec } from "../pipeline/types.js";
import { CONFIG } from "../config.js";
import { getDesignSystemSummary } from "../modules/knowledge-retrieval.js";
import { existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIGMA_STATE_DIR = resolve(__dirname, "../../.figma-state");
const OUTPUT_DIR = resolve(__dirname, "../../output");

/** How long to wait for Figma Make to generate each version */
const GENERATION_TIMEOUT_MS = 120_000; // 2 minutes
const GENERATION_POLL_MS = 5_000; // Check every 5 seconds

// ─── Types ───────────────────────────────────────────────────

export interface FigmaMakePrompt {
  screenId: string;
  screenName: string;
  prompt: string;
  isFirstScreen: boolean;
}

export interface FigmaMakeResult {
  url: string;
  title: string;
  screensGenerated: string[];
  screenshotPaths: string[];
}

// ─── Prompt Crafting ─────────────────────────────────────────

/**
 * Build the initial Figma Make prompt from the first screen.
 * Focuses on user needs & product context — NOT technical CSS/props.
 * Grounded in Chronicle knowledge base design system.
 */
function buildInitialPrompt(prd: LeanPRD, uiSpec: UIBehaviorSpec, screen: ScreenSpec): string {
  const designSystem = getDesignSystemSummary();

  // Human-readable component list (names only, no technical props)
  const componentList = screen.components
    .map((c) => `- ${c.name}`)
    .join("\n");

  // Summarize what users can do on this screen
  const userActions = screen.components
    .flatMap((c) => c.interactions.map((i) => `- ${i}`))
    .filter(Boolean)
    .join("\n");

  // Screen states in plain language
  const statesSummary = screen.states
    .map((s) => `- ${s.name}: ${s.description}`)
    .join("\n");

  // Navigation context
  const relatedFlows = uiSpec.navigationFlow
    .filter((f) => f.from === screen.id || f.to === screen.id)
    .map((f) => `${f.from} → ${f.to} (${f.trigger})`)
    .join(", ");

  return `# Design Brief: ${screen.name}

## Product Context
${prd.title} — ${prd.problemStatement}
Solution: ${prd.proposedSolution}

## What This Screen Does
${screen.description}

## Layout Style
${screen.layout} layout, desktop 1440x900.

## Elements to Include
${componentList}

## What Users Can Do Here
${userActions || "View information and navigate."}

## Screen States
${statesSummary || "Default state only."}

## Data Shown
${screen.dataEntities.join(", ") || "N/A"}

${relatedFlows ? `## Navigation\n${relatedFlows}\n` : ""}
## Design Guidelines
${designSystem}

## Style Direction
- Professional and clean, suitable for an enterprise SaaS platform
- Follow the design system colors, spacing, and typography above
- Make it production-ready and visually polished
- Keep it consistent with the Chronicle platform aesthetic`.trim();
}

/**
 * Build a continuation prompt for adding subsequent screens.
 * Figma Make supports iterative conversation.
 * Keeps it user-centric and grounded in product context.
 */
function buildContinuationPrompt(screen: ScreenSpec, prd: LeanPRD): string {
  // Human-readable component list
  const componentList = screen.components
    .map((c) => `- ${c.name}`)
    .join("\n");

  const userActions = screen.components
    .flatMap((c) => c.interactions.map((i) => `- ${i}`))
    .filter(Boolean)
    .join("\n");

  return `Now add a new page: "${screen.name}"

## What This Screen Does
${screen.description}

## Layout
${screen.layout} layout.

## Elements to Include
${componentList}

## What Users Can Do
${userActions || "View information."}

## Data Shown
${screen.dataEntities.join(", ") || "N/A"}

Keep the same theme, style, and design system as previous screens.
Add route /${screen.id}.`.trim();
}

/**
 * Craft all Figma Make prompts from PRD + UI Spec.
 * Returns ordered list: first screen sets the theme, rest are continuations.
 */
export function craftFigmaMakePrompts(prd: LeanPRD, uiSpec: UIBehaviorSpec): FigmaMakePrompt[] {
  const screens = uiSpec.screenList;
  if (screens.length === 0) return [];

  return screens.map((screen, index) => ({
    screenId: screen.id,
    screenName: screen.name,
    prompt: index === 0
      ? buildInitialPrompt(prd, uiSpec, screen)
      : buildContinuationPrompt(screen, prd),
    isFirstScreen: index === 0,
  }));
}

// ─── Playwright Automation (ARIA selectors) ──────────────────

/**
 * FigmaMakeAutomation - Automates Figma Make using ARIA/role selectors.
 *
 * Uses accessibility tree queries (getByRole, getByLabel, getByText)
 * which are far more stable than CSS selectors for Figma's dynamic UI.
 */
export class FigmaMakeAutomation {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private log: (msg: string) => void;

  constructor(opts?: { verbose?: boolean }) {
    this.log = opts?.verbose !== false
      ? (msg: string) => console.log(msg)
      : () => {};
  }

  /** Launch browser and ensure logged into Figma */
  async init(): Promise<void> {
    this.log("🎨 Launching Figma Make browser session...");

    if (!existsSync(FIGMA_STATE_DIR)) {
      mkdirSync(FIGMA_STATE_DIR, { recursive: true });
    }

    this.browser = await chromium.launch({
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const statePath = resolve(FIGMA_STATE_DIR, "state.json");
    this.context = await this.browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      storageState: existsSync(statePath) ? statePath : undefined,
    });

    this.page = await this.context.newPage();

    // Navigate to Figma Make /new — this is the URL that shows the library picker
    // /make alone is the public landing page and won't show library options
    await this.page.goto("https://www.figma.com/make/new", {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await this.page.waitForTimeout(3_000);

    // Check login status using ARIA selectors
    // On /make/new when logged in: "Main menu" button or prompt textbox appears
    // When not logged in: redirects to /login or shows public landing page
    const isLoggedIn = await this.page
      .getByRole("button", { name: /main menu/i })
      .or(this.page.getByRole("textbox", { name: /describe|prompt|make/i }))
      .first()
      .isVisible({ timeout: 10_000 })
      .catch(() => false);

    if (!isLoggedIn) {
      this.log("🔐 Not logged in — performing login...");
      await this.performLogin();
    } else {
      this.log("✅ Already logged into Figma");
    }

    // Save auth state
    await this.context.storageState({ path: statePath }).catch(() => {});
  }

  /** Login using email/password */
  private async performLogin(): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");

    await this.page.goto("https://www.figma.com/login", {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });

    // Use ARIA selectors for login form
    const emailInput = this.page.getByRole("textbox", { name: /email/i });
    await emailInput.waitFor({ state: "visible", timeout: 15_000 });
    await emailInput.fill(CONFIG.figma.email);

    const passwordInput = this.page.getByLabel(/password/i);
    await passwordInput.fill(CONFIG.figma.password);

    await this.page.getByRole("button", { name: /log in|sign in|submit/i }).click();

    // Wait for redirect to dashboard or files
    await this.page.waitForURL("**/files/**", { timeout: 30_000 }).catch(() => {});
    await this.page.waitForTimeout(3_000);
    this.log("✅ Figma login successful");

    // Navigate to Make /new — the editor with library picker
    await this.page.goto("https://www.figma.com/make/new", {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await this.page.waitForTimeout(3_000);
  }

  /**
   * Select the Chronicle Design System Library before prompting.
   * This ensures Figma Make uses Chronicle's design tokens and components.
   *
   * Verified flow (from real Figma Make accessibility tree):
   *   1. Click button "Select a library" (data-testid="figmake-empty-state-library-import-button")
   *   2. Dialog "Select a library" opens with library list
   *   3. Click the library item button (data-testid="library-list-item") matching the configured name
   *   4. Dialog closes, button changes to "Design System Library is selected" [active]
   */
  async selectDesignLibrary(): Promise<void> {
    if (!this.page) throw new Error("Not initialized");

    const libraryName = CONFIG.figma.designLibrary;
    this.log(`📚 Selecting design library: "${libraryName}"...`);

    // Check if library is already selected (button shows "is selected" state)
    const alreadySelected = this.page.getByRole("button", { name: /is selected/i });
    const isAlready = await alreadySelected.isVisible({ timeout: 2_000 }).catch(() => false);
    if (isAlready) {
      this.log("   ✅ Design library already selected");
      return;
    }

    // Step 1: Click "Select a library" button
    // Primary: use data-testid (most stable from real Figma Make)
    // Fallback: use aria role + name
    const selectLibBtn = this.page.locator('[data-testid="figmake-empty-state-library-import-button"]')
      .or(this.page.getByRole("button", { name: /select a library/i }));

    const hasSelectBtn = await selectLibBtn.first().isVisible({ timeout: 5_000 }).catch(() => false);
    if (!hasSelectBtn) {
      this.log("   ⚠️ 'Select a library' button not found — library selection skipped");
      return;
    }

    await selectLibBtn.first().click();
    this.log("   Opened library picker");
    await this.page.waitForTimeout(1_500);

    // Step 2: Wait for the dialog to appear
    const dialog = this.page.getByRole("dialog", { name: /select a library/i });
    const hasDialog = await dialog.isVisible({ timeout: 5_000 }).catch(() => false);
    if (!hasDialog) {
      this.log("   ⚠️ Library picker dialog did not open");
      await this.page.keyboard.press("Escape");
      return;
    }

    // Step 3: Click the library item matching configured name
    // Primary: button containing the library name text within the dialog
    // Fallback: data-testid="library-list-item" (if only one library)
    const libraryItemByName = dialog.getByRole("button", { name: new RegExp(libraryName, "i") });
    const libraryItem = dialog.locator('[data-testid="library-list-item"]');

    const hasNameMatch = await libraryItemByName.first().isVisible({ timeout: 3_000 }).catch(() => false);
    if (hasNameMatch) {
      await libraryItemByName.first().click();
      this.log(`   ✅ "${libraryName}" selected`);
    } else {
      const hasTestId = await libraryItem.first().isVisible({ timeout: 3_000 }).catch(() => false);
      if (hasTestId) {
        await libraryItem.first().click();
        this.log("   ✅ Library selected (via testid)");
      } else {
        this.log("   ⚠️ No matching library found in picker — closing dialog");
        const closeBtn = dialog.getByRole("button", { name: /close/i });
        const hasClose = await closeBtn.isVisible({ timeout: 1_000 }).catch(() => false);
        if (hasClose) {
          await closeBtn.click();
        } else {
          await this.page.keyboard.press("Escape");
        }
        return;
      }
    }

    await this.page.waitForTimeout(1_000);

    // Step 4: Verify selection
    const confirmed = this.page.getByRole("button", { name: /is selected/i });
    const isConfirmed = await confirmed.isVisible({ timeout: 3_000 }).catch(() => false);
    if (isConfirmed) {
      this.log("   ✅ Library selection confirmed");
    } else {
      this.log("   ℹ️ Library clicked but could not verify selection state");
    }
  }

  /**
   * Submit the initial prompt to Figma Make.
   * Returns the generated design URL.
   */
  async submitInitialPrompt(prompt: string): Promise<string> {
    if (!this.page) throw new Error("Not initialized. Call init() first.");

    this.log("📝 Submitting initial design prompt to Figma Make...");
    this.log(`   Prompt length: ${prompt.length} chars`);

    // Find the prompt textbox using ARIA
    const promptBox = this.page.getByRole("textbox").first();
    await promptBox.waitFor({ state: "visible", timeout: 15_000 });
    await promptBox.click();
    await promptBox.fill(prompt);
    await this.page.waitForTimeout(500);

    // Submit — click Send button or press Enter
    const sendBtn = this.page.getByRole("button", { name: /send|submit|generate/i });
    const hasSend = await sendBtn.isVisible({ timeout: 2_000 }).catch(() => false);

    if (hasSend) {
      await sendBtn.click();
    } else {
      await this.page.keyboard.press("Enter");
    }

    this.log("⏳ Waiting for Figma Make to generate design...");

    // Wait for generation to complete
    await this.waitForGeneration();

    const url = this.page.url();
    this.log(`✅ Design generated: ${url}`);
    return url;
  }

  /**
   * Submit a continuation prompt (add another screen).
   */
  async submitContinuationPrompt(prompt: string): Promise<void> {
    if (!this.page) throw new Error("Not initialized");

    this.log("📝 Submitting continuation prompt...");

    // The "Ask for changes" textbox for continuation
    const changeBox = this.page.getByRole("textbox", { name: /ask for changes|changes/i })
      .or(this.page.getByPlaceholder(/ask for changes|changes/i));

    await changeBox.waitFor({ state: "visible", timeout: 15_000 });
    await changeBox.click();
    await changeBox.fill(prompt);
    await this.page.waitForTimeout(500);

    // Submit
    const sendBtn = this.page.getByRole("button", { name: /send/i }).last();
    const hasSend = await sendBtn.isEnabled({ timeout: 3_000 }).catch(() => false);

    if (hasSend) {
      await sendBtn.click();
    } else {
      await this.page.keyboard.press("Enter");
    }

    this.log("⏳ Waiting for continuation generation...");
    await this.waitForGeneration();
    this.log("✅ Continuation generated");
  }

  /**
   * Wait for Figma Make generation to complete.
   * Polls the page for completion signals.
   */
  private async waitForGeneration(): Promise<void> {
    if (!this.page) return;

    const startTime = Date.now();

    while (Date.now() - startTime < GENERATION_TIMEOUT_MS) {
      await this.page.waitForTimeout(GENERATION_POLL_MS);

      // Check for completion indicators using accessibility tree:
      // - "Give thumbs up" button appears when generation is done
      // - "Ask for changes" textbox appears when ready for next prompt
      const isDone = await this.page
        .getByRole("button", { name: /thumbs up/i })
        .last()
        .isVisible({ timeout: 1_000 })
        .catch(() => false);

      if (isDone) {
        // Give extra time for render
        await this.page.waitForTimeout(3_000);
        return;
      }

      const elapsed = Math.round((Date.now() - startTime) / 1000);
      this.log(`   ⏳ Still generating... (${elapsed}s)`);
    }

    this.log("   ⚠️ Generation timeout reached, proceeding anyway");
  }

  /**
   * Take a screenshot of the current Figma Make preview.
   */
  async takeScreenshot(filename: string): Promise<string> {
    if (!this.page) throw new Error("Not initialized");

    if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
    const filepath = resolve(OUTPUT_DIR, filename);
    await this.page.screenshot({ path: filepath, type: "png" });
    this.log(`📸 Screenshot saved: ${filepath}`);
    return filepath;
  }

  /**
   * Switch the preview to a different route (e.g., /register).
   */
  async switchRoute(route: string): Promise<void> {
    if (!this.page) return;

    const routeCombobox = this.page.getByRole("combobox", { name: /path to page/i });
    const hasRouteSelector = await routeCombobox.isVisible({ timeout: 3_000 }).catch(() => false);

    if (hasRouteSelector) {
      await routeCombobox.click();
      // Wait for dropdown
      await this.page.waitForTimeout(500);

      const routeOption = this.page.getByRole("option", { name: new RegExp(route, "i") });
      const hasOption = await routeOption.isVisible({ timeout: 2_000 }).catch(() => false);

      if (hasOption) {
        await routeOption.click();
        await this.page.waitForTimeout(1_000);
        this.log(`🔀 Switched to route: /${route}`);
      }
    }
  }

  /** Get the current Figma Make design URL */
  getUrl(): string {
    return this.page?.url() || "";
  }

  /** Get the file title from the page */
  async getTitle(): Promise<string> {
    if (!this.page) return "";
    const titleBtn = this.page.getByRole("button", { name: /file name/i });
    return await titleBtn.textContent().catch(() => "") || "";
  }

  /** Close browser and save state */
  async close(): Promise<void> {
    if (this.context) {
      await this.context
        .storageState({ path: resolve(FIGMA_STATE_DIR, "state.json") })
        .catch(() => {});
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }
}

// ─── High-Level Pipeline Function ────────────────────────────

/**
 * Run the full Figma Make flow:
 *   1. Craft prompts from PRD + UI Spec
 *   2. Open Figma Make
 *   3. Submit initial prompt (first screen)
 *   4. Submit continuation prompts (remaining screens)
 *   5. Take screenshots
 *   6. Return URL
 *
 * @param prd - Lean PRD from pipeline
 * @param uiSpec - UI Behavior Spec from pipeline
 * @param opts - Options
 * @returns FigmaMakeResult with URL and screenshot paths
 */
export async function runFigmaMakeFlow(
  prd: LeanPRD,
  uiSpec: UIBehaviorSpec,
  opts?: {
    verbose?: boolean;
    maxScreens?: number;
    screenshotPrefix?: string;
  }
): Promise<FigmaMakeResult> {
  const automation = new FigmaMakeAutomation({ verbose: opts?.verbose });
  const prompts = craftFigmaMakePrompts(prd, uiSpec);
  const maxScreens = opts?.maxScreens ?? prompts.length;
  const prefix = opts?.screenshotPrefix ?? "figma-make";
  const screensGenerated: string[] = [];
  const screenshotPaths: string[] = [];

  try {
    await automation.init();

    // Select Chronicle Design System Library first
    await automation.selectDesignLibrary();

    // Submit initial prompt (first screen)
    if (prompts.length > 0) {
      const url = await automation.submitInitialPrompt(prompts[0].prompt);
      screensGenerated.push(prompts[0].screenName);

      // Screenshot the first screen
      const ssPath = await automation.takeScreenshot(`${prefix}-01-${prompts[0].screenId}.png`);
      screenshotPaths.push(ssPath);
    }

    // Submit continuation prompts (remaining screens)
    for (let i = 1; i < Math.min(prompts.length, maxScreens); i++) {
      await automation.submitContinuationPrompt(prompts[i].prompt);
      screensGenerated.push(prompts[i].screenName);

      // Switch route and screenshot
      await automation.switchRoute(prompts[i].screenId);
      const ssPath = await automation.takeScreenshot(
        `${prefix}-${String(i + 1).padStart(2, "0")}-${prompts[i].screenId}.png`
      );
      screenshotPaths.push(ssPath);
    }

    const url = automation.getUrl();
    const title = await automation.getTitle();

    return {
      url,
      title: title || prd.title,
      screensGenerated,
      screenshotPaths,
    };
  } finally {
    await automation.close();
  }
}

// ─── MCP Playwright Prompt Generator ─────────────────────────
// For agent-driven workflow (MCP Playwright tools)

/**
 * Generate step-by-step instructions for an AI agent
 * to drive Figma Make via MCP Playwright tools.
 * Useful when running from an AI assistant context.
 */
export function generateMcpInstructions(
  prd: LeanPRD,
  uiSpec: UIBehaviorSpec
): { steps: string[]; prompts: FigmaMakePrompt[] } {
  const prompts = craftFigmaMakePrompts(prd, uiSpec);
  const steps: string[] = [];

  steps.push("1. Navigate to https://www.figma.com/make/new using mcp_playwright_browser_navigate");
  steps.push("2. Take a snapshot to verify login status");
  steps.push("3. Click button 'Select a library' (data-testid='figmake-empty-state-library-import-button')");
  steps.push("4. In the 'Select a library' dialog, click the Chronicle library item (data-testid='library-list-item')");
  steps.push("5. Verify button shows 'Design System Library is selected' [active]");

  if (prompts.length > 0) {
    steps.push(`6. Find the prompt textbox and type the initial prompt for "${prompts[0].screenName}"`);
    steps.push("7. Click Send or press Enter to submit");
    steps.push("8. Wait 60-90 seconds for generation to complete");
    steps.push("9. Take screenshot to verify the design");
  }

  for (let i = 1; i < prompts.length; i++) {
    const step = 5 + (i * 3);
    steps.push(`${step}. Find "Ask for changes" textbox and type continuation prompt for "${prompts[i].screenName}"`);
    steps.push(`${step + 1}. Submit and wait 60-90 seconds`);
    steps.push(`${step + 2}. Switch route to /${prompts[i].screenId} and take screenshot`);
  }

  steps.push(`${steps.length + 1}. Copy the Figma Make URL from the browser address bar`);
  steps.push(`${steps.length + 1}. Update Notion Epic with the Figma Make URL`);

  return { steps, prompts };
}
