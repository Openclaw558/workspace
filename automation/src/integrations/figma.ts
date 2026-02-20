// ============================================================
// Figma Integration - Browser Automation via Playwright
// Login to Figma and create design files using Figma Make (AI)
// ============================================================
import { chromium, Browser, Page } from "playwright";
import { CONFIG } from "../config.js";
import { FigmaMockup, FigmaPage, FigmaFrame } from "../pipeline/types.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIGMA_STATE_DIR = resolve(__dirname, "../../.figma-state");

// Max time to wait for Figma Make to generate a design (3 minutes)
const FIGMA_MAKE_GENERATION_TIMEOUT = 180_000;

/**
 * FigmaAutomation - Browser-based Figma interaction via Figma Make.
 *
 * Instead of manipulating the WebGL canvas directly (which is unreliable),
 * we use Figma Make (https://www.figma.com/make) — Figma's AI-powered
 * design tool — to generate designs from a text prompt.
 */
export class FigmaAutomation {
  private browser: Browser | null = null;
  private page: Page | null = null;

  /** Launch browser and login to Figma */
  async login(): Promise<void> {
    console.log("🎨 Launching Figma browser session...");

    if (!existsSync(FIGMA_STATE_DIR)) {
      mkdirSync(FIGMA_STATE_DIR, { recursive: true });
    }

    this.browser = await chromium.launch({
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      storageState: existsSync(resolve(FIGMA_STATE_DIR, "state.json"))
        ? resolve(FIGMA_STATE_DIR, "state.json")
        : undefined,
    });

    this.page = await context.newPage();

    // Navigate to Figma Make — it will redirect to login if needed
    await this.page.goto("https://www.figma.com/files/recents-and-sharing", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Check if we need to login
    const isLoggedIn = await this.page
      .locator('[data-testid="user-menu-button"], [class*="avatar"]')
      .isVisible()
      .catch(() => false);

    if (!isLoggedIn) {
      console.log("🔐 Not logged in. Performing Figma login...");
      await this.performLogin();
    } else {
      console.log("✅ Already logged into Figma");
    }

    // Save auth state for future sessions
    await context.storageState({ path: resolve(FIGMA_STATE_DIR, "state.json") });
  }

  /** Perform the actual login flow */
  private async performLogin(): Promise<void> {
    if (!this.page) throw new Error("Page not initialized");

    await this.page.goto("https://www.figma.com/login", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await this.page.waitForSelector('input[name="email"], input[type="email"]', {
      timeout: 15000,
    });

    await this.page.fill(
      'input[name="email"], input[type="email"]',
      CONFIG.figma.email
    );

    await this.page.fill(
      'input[name="password"], input[type="password"]',
      CONFIG.figma.password
    );

    await this.page.click('button[type="submit"]');

    await this.page.waitForURL("**/files/**", { timeout: 30000 }).catch(() => {
      // May redirect elsewhere
    });

    await this.page.waitForTimeout(3000);
    console.log("✅ Figma login successful");
  }

  // ─── Design prompt builder ─────────────────────────────────

  /**
   * Build a rich Figma Make prompt from the mockup structure.
   * Converts the structured data into a natural-language design brief.
   */
  buildDesignPrompt(mockup: FigmaMockup): string {
    const screenDescriptions = mockup.pages
      .flatMap((p) =>
        p.frames.map((f) => {
          const componentList = f.elements
            .map((el) => {
              const label = el.properties?.text || el.name;
              return `  - ${el.type}: "${label}" (${el.width}x${el.height})`;
            })
            .join("\n");
          return `Screen "${f.name}" (${f.width}x${f.height}):\n${componentList}`;
        })
      )
      .join("\n\n");

    const tokens = mockup.designTokens;
    const colorPalette = Object.entries(tokens)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    const prompt = [
      `Design a complete UI for "${mockup.projectName}".`,
      ``,
      `Screens to include:`,
      screenDescriptions,
      ``,
      `Design tokens: ${colorPalette}`,
      `Font: Inter / System. Border radius: 8px cards, 6px inputs.`,
      `Desktop layout at 1440x900. Include sidebar (240px), top bar (64px).`,
      `Use a clean, professional style with proper spacing and hierarchy.`,
    ].join("\n");

    // Figma Make has a prompt length limit — truncate if too long
    return prompt.length > 2000 ? prompt.slice(0, 1997) + "..." : prompt;
  }

  // ─── Figma Make workflow ───────────────────────────────────

  /**
   * Create a design file using Figma Make (AI-powered).
   * 1. Navigate to figma.com/make
   * 2. Submit a design prompt
   * 3. Wait for Figma Make to generate the design
   * 4. Return the URL of the created Figma file
   */
  async createDesignFile(mockup: FigmaMockup): Promise<string> {
    if (!this.page) throw new Error("Not logged in. Call login() first.");

    const prompt = this.buildDesignPrompt(mockup);
    console.log(`🤖 Figma Make prompt (${prompt.length} chars):`);
    console.log(`   "${prompt.slice(0, 120)}..."`);

    // Navigate to Figma Make
    console.log("🌐 Navigating to Figma Make...");
    await this.page.goto("https://www.figma.com/make", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Wait for the prompt input to appear
    const promptInput = this.page.locator(
      'textarea, input[placeholder*="make"], input[placeholder*="want"], [aria-label*="prompt"], [class*="prompt"] input, [class*="prompt"] textarea'
    );
    await promptInput.first().waitFor({ state: "visible", timeout: 15000 });
    console.log("📝 Filling design prompt...");

    // Fill the prompt
    await promptInput.first().click();
    await promptInput.first().fill(prompt);
    await this.page.waitForTimeout(500);

    // Submit the prompt — press Enter or click Submit button
    const submitBtn = this.page.locator(
      'button:has-text("Submit"), button[type="submit"], button[aria-label*="submit"], button[aria-label*="Submit"]'
    );
    const hasSubmit = await submitBtn.isVisible().catch(() => false);

    if (hasSubmit) {
      await submitBtn.first().click();
    } else {
      await this.page.keyboard.press("Enter");
    }

    console.log("⏳ Waiting for Figma Make to generate design...");

    // Wait for navigation to the generated file
    // Figma Make typically redirects to a URL like:
    //   https://www.figma.com/make/new?...  →  https://www.figma.com/design/<key>/...
    //   or stays at /make/<id>
    try {
      await this.page.waitForURL(
        (url) => {
          const href = url.href;
          return (
            href.includes("/design/") ||
            href.includes("/file/") ||
            href.includes("/make/") && !href.endsWith("/make/") && !href.endsWith("/make")
          );
        },
        { timeout: FIGMA_MAKE_GENERATION_TIMEOUT }
      );
    } catch {
      // If URL didn't change, wait for visual indicators of completion
      console.log("⏳ Waiting for generation to complete on page...");
      await this.page.waitForTimeout(30000);
    }

    // Give extra time for the design to fully render
    await this.page.waitForTimeout(5000);

    const finalUrl = this.page.url();
    console.log(`✅ Figma Make design created: ${finalUrl}`);

    return finalUrl;
  }

  /**
   * Generate an HTML wireframe and save locally as fallback.
   * This is always generated regardless of Figma success.
   */
  async saveLocalWireframe(htmlContent: string, projectName: string): Promise<string> {
    const outputDir = resolve(__dirname, "../../output");
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `${projectName.replace(/\s+/g, "-").toLowerCase()}-wireframe.html`;
    const filePath = resolve(outputDir, fileName);
    writeFileSync(filePath, htmlContent);
    console.log(`💾 Local wireframe saved: ${filePath}`);
    return filePath;
  }

  /** Close the browser */
  async close(): Promise<void> {
    if (this.browser) {
      if (this.page) {
        const context = this.page.context();
        await context
          .storageState({ path: resolve(FIGMA_STATE_DIR, "state.json") })
          .catch(() => {});
      }
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}
