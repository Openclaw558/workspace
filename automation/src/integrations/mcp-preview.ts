// ============================================================
// MCP Preview - Wireframe Preview via Playwright (MCP or Direct)
// Opens wireframe HTML in browser, takes screenshots, enables
// interactive preview for design review.
// ============================================================
import { chromium, Browser, Page } from "playwright";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../../output");

export interface PreviewOptions {
  /** Browser viewport width (default: 1440) */
  width?: number;
  /** Browser viewport height (default: 900) */
  height?: number;
  /** Take full-page screenshot (default: true) */
  fullPage?: boolean;
  /** Keep browser open for interactive preview (default: false) */
  interactive?: boolean;
  /** Delay before screenshot in ms (default: 1000) */
  delay?: number;
  /** Screenshot format (default: png) */
  format?: "png" | "jpeg";
  /** Screenshot quality for jpeg (default: 90) */
  quality?: number;
  /** Device scale factor (default: 2 for retina) */
  deviceScaleFactor?: number;
  /** Capture individual screen sections (default: true) */
  captureScreens?: boolean;
}

export interface PreviewResult {
  /** Full page screenshot path */
  fullScreenshot?: string;
  /** Per-screen screenshots { screenId → path } */
  screenScreenshots: Record<string, string>;
  /** If interactive, the browser URL */
  browserUrl?: string;
  /** Screenshot dimensions */
  dimensions: { width: number; height: number };
}

/**
 * Preview wireframe HTML in a browser and capture screenshots.
 * Uses direct Playwright (same dependency already in the project).
 *
 * For MCP integration, the wireframe HTML file can be opened with
 * mcp_playwright_browser_navigate pointing to the file:// URL,
 * and screenshots taken via mcp_playwright_browser_take_screenshot.
 */
export async function previewWireframe(
  htmlFilePath: string,
  options: PreviewOptions = {}
): Promise<PreviewResult> {
  const {
    width = 1440,
    height = 900,
    fullPage = true,
    interactive = false,
    delay = 1500,
    format = "png",
    quality = 90,
    deviceScaleFactor = 2,
    captureScreens = true,
  } = options;

  if (!existsSync(htmlFilePath)) {
    throw new Error(`Wireframe file not found: ${htmlFilePath}`);
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`  🖥️  Opening wireframe in browser (${width}x${height})...`);

  const browser = await chromium.launch({
    headless: !interactive,
  });

  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
  });

  const page = await context.newPage();

  // Navigate to the wireframe file
  const fileUrl = `file://${htmlFilePath}`;
  await page.goto(fileUrl, { waitUntil: "networkidle" });

  // Wait for fonts to load
  await page.waitForTimeout(delay);

  const result: PreviewResult = {
    screenScreenshots: {},
    dimensions: { width, height },
  };

  // Take full page screenshot
  const baseName = htmlFilePath.replace(/\.html$/, "");

  if (fullPage) {
    const fullPath = `${baseName}-preview-full.${format}`;
    await page.screenshot({
      path: fullPath,
      fullPage: true,
      type: format,
      ...(format === "jpeg" ? { quality } : {}),
    });
    result.fullScreenshot = fullPath;
    console.log(`  📸 Full wireframe screenshot: ${fullPath}`);
  }

  // Capture individual screen sections
  if (captureScreens) {
    const screens = await page.$$eval(
      ".screen-section",
      (els) =>
        els.map((el) => ({
          id: el.getAttribute("data-screen") || "unknown",
          rect: el.getBoundingClientRect(),
        }))
    );

    for (const screen of screens) {
      const screenshotPath = `${baseName}-screen-${screen.id}.${format}`;

      // Scroll to the screen section first
      await page.evaluate(
        (id) => {
          const el = document.querySelector(`[data-screen="${id}"]`);
          if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
        },
        screen.id
      );

      await page.waitForTimeout(300);

      // Take a viewport-sized screenshot (simulates what the user would see)
      await page.screenshot({
        path: screenshotPath,
        type: format,
        ...(format === "jpeg" ? { quality } : {}),
        clip: {
          x: 0,
          y: screen.rect.y,
          width: Math.min(screen.rect.width, width),
          height: Math.min(screen.rect.height, height),
        },
      });

      result.screenScreenshots[screen.id] = screenshotPath;
      console.log(`  📸 Screen "${screen.id}": ${screenshotPath}`);
    }
  }

  if (interactive) {
    result.browserUrl = fileUrl;
    console.log(`  🌐 Browser is open for interactive preview.`);
    console.log(`     URL: ${fileUrl}`);
    console.log(`     Press Ctrl+C to close.`);

    // Wait indefinitely in interactive mode
    await new Promise(() => {}); // blocks until process is killed
  } else {
    await browser.close();
  }

  return result;
}

/**
 * Generate a summary image: a collage of all screen screenshots.
 * Useful for quick overview in Notion or Figma comments.
 */
export async function generateScreenCollage(
  screenshotPaths: string[],
  outputPath: string,
  options: { columns?: number; gap?: number } = {}
): Promise<string> {
  const { columns = 2, gap = 16 } = options;

  // We'll create an HTML page that shows all screenshots in a grid,
  // then screenshot that page
  const imagesHtml = screenshotPaths
    .map(
      (p) =>
        `<img src="file://${p}" style="width:100%;border:1px solid #e2e8f0;border-radius:8px;">`
    )
    .join("\n");

  const collageHtml = `<!DOCTYPE html>
<html>
<head>
<style>
body { margin: 0; padding: ${gap}px; background: #f8fafc; font-family: Inter, system-ui, sans-serif; }
.grid { display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: ${gap}px; }
img { display: block; }
</style>
</head>
<body><div class="grid">${imagesHtml}</div></body>
</html>`;

  const tempHtml = outputPath.replace(/\.\w+$/, "-collage-temp.html");
  writeFileSync(tempHtml, collageHtml);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 800 },
  });
  await page.goto(`file://${tempHtml}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: outputPath, fullPage: true, type: "png" });
  await browser.close();

  // Clean up temp file
  try {
    const { unlinkSync } = await import("fs");
    unlinkSync(tempHtml);
  } catch {}

  console.log(`  🖼️  Screen collage saved: ${outputPath}`);
  return outputPath;
}

/**
 * Get the file:// URL for use with MCP Playwright browser_navigate.
 * This allows the MCP tools to interact with the wireframe directly.
 */
export function getWireframeFileUrl(htmlFilePath: string): string {
  return `file://${resolve(htmlFilePath)}`;
}

/**
 * Generate MCP Playwright instructions for interacting with the wireframe.
 * Returns a set of instructions that can be used with MCP tools.
 */
export function getMcpPlaywrightInstructions(
  htmlFilePath: string
): { navigate: string; screenshot: string; snapshot: string } {
  const fileUrl = getWireframeFileUrl(htmlFilePath);
  return {
    navigate: `Use mcp_playwright_browser_navigate with url="${fileUrl}"`,
    screenshot: `Use mcp_playwright_browser_take_screenshot to capture the design`,
    snapshot: `Use mcp_playwright_browser_snapshot to get an accessibility tree of the wireframe`,
  };
}
