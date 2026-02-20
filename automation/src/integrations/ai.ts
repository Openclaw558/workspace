// ============================================================
// AI / LLM Client - OpenAI-compatible wrapper for ZAI GLM
// ============================================================
import OpenAI from "openai";
import { CONFIG } from "../config.js";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      baseURL: CONFIG.ai.baseUrl,
      apiKey: CONFIG.ai.apiKey || "unused", // ZAI may not need key
    });
  }
  return client;
}

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Call the LLM with a system prompt and messages.
 * Returns the assistant's text response.
 */
export async function callLLM(
  systemPrompt: string,
  messages: AIMessage[],
  options?: {
    temperature?: number;
    maxTokens?: number;
    jsonMode?: boolean;
  }
): Promise<string> {
  const ai = getClient();

  const allMessages: AIMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  const response = await ai.chat.completions.create({
    model: CONFIG.ai.model,
    messages: allMessages,
    temperature: options?.temperature ?? 0.3,
    max_tokens: options?.maxTokens ?? 8192,
    ...(options?.jsonMode ? { response_format: { type: "json_object" } } : {}),
  });

  return response.choices[0]?.message?.content?.trim() || "";
}

/**
 * Call LLM and parse JSON response
 */
export async function callLLMJson<T>(
  systemPrompt: string,
  messages: AIMessage[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<T> {
  const raw = await callLLM(systemPrompt, messages, {
    ...options,
    jsonMode: true,
  });

  // Try to extract JSON from response (handle markdown code blocks)
  let jsonStr = raw;
  const jsonMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  try {
    return JSON.parse(jsonStr) as T;
  } catch {
    // Fallback: try to find JSON object/array in response
    const objMatch = raw.match(/\{[\s\S]*\}/);
    const arrMatch = raw.match(/\[[\s\S]*\]/);
    const match = objMatch || arrMatch;
    if (match) {
      return JSON.parse(match[0]) as T;
    }
    throw new Error(`Failed to parse LLM JSON response:\n${raw.slice(0, 500)}`);
  }
}
