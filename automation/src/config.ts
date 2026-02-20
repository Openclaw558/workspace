import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

export const CONFIG = {
  ai: {
    baseUrl: process.env.AI_BASE_URL || "https://api.z.ai/api/coding/paas/v4",
    model: process.env.AI_MODEL || "glm-4.7",
    apiKey: process.env.AI_API_KEY || "",
  },
  notion: {
    apiKey: process.env.NOTION_API_KEY || "",
    dbFeedback: process.env.NOTION_DB_FEEDBACK || "",
    dbEpic: process.env.NOTION_DB_EPIC || "",
    dbTask: process.env.NOTION_DB_TASK || "",
  },
  figma: {
    apiToken: process.env.FIGMA_API_TOKEN || "",
    email: process.env.FIGMA_EMAIL || "",
    password: process.env.FIGMA_PASSWORD || "",
    designLibrary: process.env.FIGMA_DESIGN_LIBRARY || "Design System Library",
  },
  knowledgeBasePath: resolve(
    __dirname,
    process.env.KNOWLEDGE_BASE_PATH || "../docs/knowledge-base/chronicle"
  ),
  sessionStoragePath: resolve(
    __dirname,
    process.env.SESSION_STORAGE_PATH || "../sessions"
  ),
};
