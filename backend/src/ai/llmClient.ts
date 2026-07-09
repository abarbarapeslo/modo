import Anthropic from "@anthropic-ai/sdk";
import { logTokenUsage, withinBudget } from "./tokenBudget.js";

export interface LlmResponse<T = unknown> {
  data: T;
  tokenEstimate: number;
  provider: "mock" | "openai" | "anthropic";
  cached: boolean;
}

const PLACEHOLDER_KEYS = new Set([
  "YOUR_OPENAI_API_KEY_HERE",
  "YOUR_ANTHROPIC_API_KEY_HERE",
  "",
]);

function isConfigured(key: string | undefined): boolean {
  return Boolean(key && !PLACEHOLDER_KEYS.has(key));
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  let raw = fenced?.[1]?.trim() ?? text.trim();

  // Strip anything before first { or [
  const start = raw.search(/[\[{]/);
  if (start > 0) raw = raw.slice(start);

  try {
    return JSON.parse(raw);
  } catch {
    // Attempt to salvage truncated JSON object
    const lastBrace = raw.lastIndexOf("}");
    if (lastBrace > 0) {
      return JSON.parse(raw.slice(0, lastBrace + 1));
    }
    throw new Error("Failed to parse LLM JSON response");
  }
}

/**
 * LLM client with RTK guardrails. Anthropic is preferred when configured.
 * API keys are read only from process.env — never hardcoded.
 */
export class LlmClient {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (isConfigured(process.env.ANTHROPIC_API_KEY)) {
      this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
  }

  get activeProvider(): "mock" | "anthropic" | "openai" {
    if (this.anthropic) return "anthropic";
    if (isConfigured(process.env.OPENAI_API_KEY)) return "openai";
    return "mock";
  }

  async complete<T>(opts: {
    task: string;
    prompt: string;
    system?: string;
    tokenEstimate: number;
    mock: () => T;
    parse?: (text: string) => T;
  }): Promise<LlmResponse<T>> {
    logTokenUsage(opts.task, opts.tokenEstimate, false);

    if (!withinBudget(opts.tokenEstimate, opts.task)) {
      console.warn(`[RTK] Token budget exceeded for ${opts.task} — using mock`);
      return { data: opts.mock(), tokenEstimate: 0, provider: "mock", cached: false };
    }

    if (!this.anthropic) {
      return { data: opts.mock(), tokenEstimate: 0, provider: "mock", cached: false };
    }

    try {
      const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";
      const response = await this.anthropic.messages.create({
        model,
        max_tokens: opts.task === "simulation" ? 4096 : 2048,
        system: opts.system ?? "You are MODO, a cognitive digital twin analyst for enterprises. Respond concisely.",
        messages: [{ role: "user", content: opts.prompt }],
      });

      const textBlock = response.content.find((b) => b.type === "text");
      const text = textBlock?.type === "text" ? textBlock.text : "";
      const tokens =
        (response.usage?.input_tokens ?? 0) + (response.usage?.output_tokens ?? 0);

      const parsed = opts.parse ? opts.parse(text) : (extractJson(text) as T);

      return {
        data: parsed,
        tokenEstimate: tokens,
        provider: "anthropic",
        cached: false,
      };
    } catch (err) {
      console.error("[LLM] Anthropic call failed — falling back to mock:", (err as Error).message);
      return { data: opts.mock(), tokenEstimate: 0, provider: "mock", cached: false };
    }
  }
}

export const llmClient = new LlmClient();
