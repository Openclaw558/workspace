// ============================================================
// Figma Hybrid Adapter
// Strategy: API-first (fast, stable) → browser fallback (write ops)
// ============================================================
import { FigmaAPI } from "./figma-api.js";
import { FigmaAutomation } from "./figma.js";
import { CONFIG } from "../config.js";
import { FigmaMockup } from "../pipeline/types.js";

export type FigmaMode = "api" | "browser" | "unavailable";

/**
 * Unified Figma adapter that picks the best available method.
 *
 * Read / export / comments  →  API (fast, no browser)
 * Create / edit designs     →  Browser (Playwright, slower but can write)
 *
 * If `FIGMA_API_TOKEN` is set, API mode is available.
 * If `FIGMA_EMAIL`+`FIGMA_PASSWORD` are set, browser fallback is available.
 */
export class FigmaAdapter {
  private api: FigmaAPI | null = null;
  private browser: FigmaAutomation | null = null;
  private _mode: FigmaMode;

  constructor() {
    const hasToken = !!CONFIG.figma.apiToken;
    const hasCreds = !!CONFIG.figma.email && !!CONFIG.figma.password;

    if (hasToken) {
      try {
        this.api = new FigmaAPI(CONFIG.figma.apiToken);
        this._mode = "api";
      } catch {
        this._mode = hasCreds ? "browser" : "unavailable";
      }
    } else {
      this._mode = hasCreds ? "browser" : "unavailable";
    }

    const label: Record<FigmaMode, string> = {
      api: "✅ Figma API (MCP) mode active",
      browser: "⚠️  Figma browser-only mode (no API token)",
      unavailable: "❌ No Figma credentials configured",
    };
    console.log(label[this._mode]);
  }

  /** Current operating mode */
  get mode(): FigmaMode {
    return this._mode;
  }

  /** True when API calls are possible (read/export/comment) */
  get hasAPI(): boolean {
    return this.api !== null;
  }

  /** True when browser automation is possible (write/create) */
  get hasBrowser(): boolean {
    return !!CONFIG.figma.email && !!CONFIG.figma.password;
  }

  // ──────────────────────────────────────────────────────────
  //  Read operations (API-first → browser fallback)
  // ──────────────────────────────────────────────────────────

  /** Get file data via API */
  async getFile(fileKey: string) {
    const api = this.requireAPI("getFile");
    return api.getFile(fileKey);
  }

  /** Get specific nodes */
  async getNodes(fileKey: string, nodeIds: string[]) {
    const api = this.requireAPI("getNodes");
    return api.getNodes(fileKey, nodeIds);
  }

  /** Export frames/nodes as PNG/SVG */
  async exportImages(
    fileKey: string,
    nodeIds: string[],
    format: "png" | "svg" = "png",
    scale = 2
  ) {
    const api = this.requireAPI("exportImages");
    return api.exportImages(fileKey, nodeIds, format, scale);
  }

  /** Get design tokens: styles + variables */
  async getDesignTokens(fileKey: string) {
    const api = this.requireAPI("getDesignTokens");
    const [styles, variables] = await Promise.all([
      api.getStyles(fileKey),
      api.getVariables(fileKey).catch(() => null),
    ]);
    return { styles, variables };
  }

  /** Get components */
  async getComponents(fileKey: string) {
    const api = this.requireAPI("getComponents");
    return api.getComponents(fileKey);
  }

  /** Read comments */
  async getComments(fileKey: string) {
    const api = this.requireAPI("getComments");
    return api.getComments(fileKey);
  }

  /** Post a comment */
  async postComment(
    fileKey: string,
    message: string,
    position?: { x: number; y: number }
  ) {
    const api = this.requireAPI("postComment");
    return api.postComment(fileKey, message, position);
  }

  /** Validate current API token */
  async validateToken() {
    const api = this.requireAPI("validateToken");
    return api.validateToken();
  }

  // ──────────────────────────────────────────────────────────
  //  Write operations (browser only — API is read-only)
  // ──────────────────────────────────────────────────────────

  /**
   * Create a new design file in Figma.
   * This REQUIRES browser automation (Figma API is read-only for design ops).
   * Returns the new file URL.
   */
  async createDesignFile(mockup: FigmaMockup): Promise<string> {
    if (!this.hasBrowser) {
      throw new Error(
        "Creating Figma files requires browser credentials (FIGMA_EMAIL + FIGMA_PASSWORD)"
      );
    }

    console.log("🌐 Creating design file via browser automation...");
    const browser = this.ensureBrowser();

    try {
      await browser.login();
      const url = await browser.createDesignFile(mockup);
      return url;
    } finally {
      await browser.close();
    }
  }

  // ──────────────────────────────────────────────────────────
  //  Hybrid convenience methods
  // ──────────────────────────────────────────────────────────

  /**
   * Post a review comment on a design file with pipeline results.
   * Uses API if available; otherwise logs a warning.
   */
  async attachPipelineComment(
    fileKey: string,
    prdTitle: string,
    epicUrl?: string
  ): Promise<void> {
    if (!this.api) {
      console.log("ℹ️  Skipping Figma comment (no API token)");
      return;
    }

    const lines = [
      `🤖 Chronicle AI Pipeline`,
      `PRD: ${prdTitle}`,
      epicUrl ? `Notion Epic: ${epicUrl}` : "",
      `Generated at ${new Date().toISOString()}`,
    ].filter(Boolean);

    await this.api.postComment(fileKey, lines.join("\n"));
    console.log("💬 Pipeline comment posted to Figma file");
  }

  // ──────────────────────────────────────────────────────────
  //  Internals
  // ──────────────────────────────────────────────────────────

  private requireAPI(method: string): FigmaAPI {
    if (!this.api) {
      throw new Error(
        `${method}() requires FIGMA_API_TOKEN. Set it in .env to enable API mode.`
      );
    }
    return this.api;
  }

  private ensureBrowser(): FigmaAutomation {
    if (!this.browser) {
      this.browser = new FigmaAutomation();
    }
    return this.browser;
  }

  /** Clean up any open browser */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
