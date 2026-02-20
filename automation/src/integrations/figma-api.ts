// ============================================================
// Figma REST API Client (MCP Mode)
// Direct API access — no browser needed.
// Covers: read files, export images, styles, components,
//         comments, variables (design tokens v2).
// ============================================================
import { CONFIG } from "../config.js";

interface FigmaRequestOptions {
  method?: "GET" | "POST" | "DELETE";
  body?: unknown;
}

/**
 * Lightweight Figma REST API v1 client.
 * Uses the Personal Access Token from `FIGMA_API_TOKEN`.
 */
export class FigmaAPI {
  private baseUrl = "https://api.figma.com/v1";
  private token: string;

  constructor(token?: string) {
    this.token = token ?? CONFIG.figma.apiToken;
    if (!this.token) {
      throw new Error("FIGMA_API_TOKEN is required for FigmaAPI");
    }
  }

  // ── HTTP helpers ────────────────────────────────────────────

  private async request<T = any>(
    path: string,
    opts: FigmaRequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: opts.method ?? "GET",
      headers: {
        "X-Figma-Token": this.token,
        ...(opts.body ? { "Content-Type": "application/json" } : {}),
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Figma API ${res.status}: ${res.statusText} — ${text}`);
    }

    return res.json() as Promise<T>;
  }

  // ── File operations ─────────────────────────────────────────

  /** Get full file tree (can be large) */
  async getFile(fileKey: string, opts?: { depth?: number }) {
    const qs = opts?.depth ? `?depth=${opts.depth}` : "";
    return this.request(`/files/${fileKey}${qs}`);
  }

  /** Get specific node(s) by ID */
  async getNodes(fileKey: string, nodeIds: string[]) {
    const ids = nodeIds.map(encodeURIComponent).join(",");
    return this.request(`/files/${fileKey}/nodes?ids=${ids}`);
  }

  /** Get file component set */
  async getComponents(fileKey: string) {
    const data = await this.request(`/files/${fileKey}/components`);
    return data.meta?.components ?? [];
  }

  /** Get file styles (colors, text, effects) */
  async getStyles(fileKey: string) {
    const data = await this.request(`/files/${fileKey}/styles`);
    return data.meta?.styles ?? [];
  }

  /** Get local variables (design tokens v2) — requires file-level scope */
  async getVariables(fileKey: string) {
    return this.request(`/files/${fileKey}/variables/local`);
  }

  // ── Export / Images ─────────────────────────────────────────

  /**
   * Export specific nodes as PNG, SVG, or PDF.
   * Returns a map { nodeId → imageUrl }.
   */
  async exportImages(
    fileKey: string,
    nodeIds: string[],
    format: "png" | "svg" | "pdf" = "png",
    scale: number = 2
  ): Promise<Record<string, string>> {
    const ids = nodeIds.map(encodeURIComponent).join(",");
    const data = await this.request(
      `/images/${fileKey}?ids=${ids}&format=${format}&scale=${scale}`
    );
    return data.images ?? {};
  }

  /** Get rendered image of the full file thumbnail */
  async getFileThumbnail(fileKey: string): Promise<string> {
    const file = await this.getFile(fileKey, { depth: 1 });
    return file.thumbnailUrl ?? "";
  }

  // ── Comments ────────────────────────────────────────────────

  /** List comments on a file */
  async getComments(fileKey: string) {
    const data = await this.request(`/files/${fileKey}/comments`);
    return data.comments ?? [];
  }

  /** Post a comment on a file */
  async postComment(
    fileKey: string,
    message: string,
    position?: { x: number; y: number; node_id?: string }
  ) {
    const body: Record<string, unknown> = { message };
    if (position) {
      body.client_meta = position;
    }
    return this.request(`/files/${fileKey}/comments`, {
      method: "POST",
      body,
    });
  }

  // ── Team / Project helpers ──────────────────────────────────

  /** List projects in a team */
  async getTeamProjects(teamId: string) {
    const data = await this.request(`/teams/${teamId}/projects`);
    return data.projects ?? [];
  }

  /** List files in a project */
  async getProjectFiles(projectId: string) {
    const data = await this.request(`/projects/${projectId}/files`);
    return data.files ?? [];
  }

  // ── Utility ─────────────────────────────────────────────────

  /** Validate token by fetching /me */
  async validateToken(): Promise<{ id: string; handle: string; email: string }> {
    return this.request("/me");
  }

  /**
   * Extract a Figma file key from a URL.
   * e.g. https://www.figma.com/design/ABC123/My-File → "ABC123"
   */
  static extractFileKey(url: string): string | null {
    const m = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
    return m?.[1] ?? null;
  }
}
