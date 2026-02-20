// ============================================================
// Module 1: Conversation Memory
// Manages conversation sessions with persistence
// ============================================================
import { ConversationSession, Message } from "../pipeline/types.js";
import { CONFIG } from "../config.js";
import { v4 as uuidv4 } from "uuid";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const sessionsDir = CONFIG.sessionStoragePath;

function ensureDir() {
  if (!existsSync(sessionsDir)) {
    mkdirSync(sessionsDir, { recursive: true });
  }
}

/** Create a new conversation session */
export function createSession(): ConversationSession {
  ensureDir();
  const session: ConversationSession = {
    id: uuidv4(),
    messages: [],
    startedAt: new Date().toISOString(),
  };
  saveSession(session);
  return session;
}

/** Add a message to the session */
export function addMessage(
  session: ConversationSession,
  role: Message["role"],
  content: string
): ConversationSession {
  session.messages.push({
    role,
    content,
    timestamp: new Date().toISOString(),
  });
  saveSession(session);
  return session;
}

/** End a session (mark as ended) */
export function endSession(
  session: ConversationSession
): ConversationSession {
  session.endedAt = new Date().toISOString();
  saveSession(session);
  return session;
}

/** Get the conversation as a formatted string for LLM context */
export function getConversationText(session: ConversationSession): string {
  return session.messages
    .map((m) => {
      const label = m.role === "user" ? "User" : m.role === "assistant" ? "Assistant" : "System";
      return `[${label}]: ${m.content}`;
    })
    .join("\n\n");
}

/** Get the last N messages for context window management */
export function getRecentMessages(
  session: ConversationSession,
  count: number = 20
): Message[] {
  return session.messages.slice(-count);
}

/** Save session to disk */
function saveSession(session: ConversationSession) {
  ensureDir();
  const filePath = resolve(sessionsDir, `${session.id}.json`);
  writeFileSync(filePath, JSON.stringify(session, null, 2));
}

/** Load session from disk */
export function loadSession(sessionId: string): ConversationSession | null {
  const filePath = resolve(sessionsDir, `${sessionId}.json`);
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

/** List all session IDs */
export function listSessions(): string[] {
  ensureDir();
  const { readdirSync } = require("fs");
  return readdirSync(sessionsDir)
    .filter((f: string) => f.endsWith(".json"))
    .map((f: string) => f.replace(".json", ""));
}
