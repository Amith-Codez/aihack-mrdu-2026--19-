// Model client (06 §13): one function that calls the primary model and, on a 429 / timeout / bad output,
// calls the fallback once. Primary = Gemini (free tier), fallback = Groq (free plan) through its OpenAI-compatible API.
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output, type LanguageModel } from "ai";
import type { z } from "zod";

export const CALL_TIMEOUT_MS = 25_000;

export type CallResult<T> = { object: T; model: string; usedFallback: boolean; inputTokens: number; outputTokens: number };

export function primaryId() {
  return process.env.MODEL_PRIMARY || "gemini-3.5-flash-lite";
}
export function fallbackId() {
  return process.env.MODEL_FALLBACK || "openai/gpt-oss-120b";
}

function primary(): LanguageModel {
  return createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY })(primaryId());
}
function fallback(): LanguageModel {
  const groq = createOpenAI({ baseURL: "https://api.groq.com/openai/v1", apiKey: process.env.GROQ_API_KEY, name: "groq" });
  return groq.chat(fallbackId());
}

async function once<T>(model: LanguageModel, schema: z.ZodType<T>, instructions: string, prompt: string, signal?: AbortSignal) {
  const timeout = AbortSignal.timeout(CALL_TIMEOUT_MS);
  const r = await generateText({
    model,
    instructions,
    prompt,
    output: Output.object({ schema }),
    maxRetries: 0,
    // Gemini 3.x thinks by default; low keeps a 5-answer batch well inside the 25 s timeout.
    providerOptions: { google: { thinkingConfig: { thinkingLevel: "low" } } },
    abortSignal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  return { object: r.output as T, inputTokens: r.usage.inputTokens ?? 0, outputTokens: r.usage.outputTokens ?? 0 };
}

/** One structured call: primary first, the fallback once on any failure (unless the caller aborted). */
export async function askObject<T>(
  schema: z.ZodType<T>,
  instructions: string,
  prompt: string,
  signal?: AbortSignal,
): Promise<CallResult<T>> {
  try {
    const r = await once(primary(), schema, instructions, prompt, signal);
    return { ...r, model: primaryId(), usedFallback: false };
  } catch (err) {
    if (signal?.aborted) throw err;
    console.warn(`[models] primary ${primaryId()} failed: ${(err as Error).message?.slice(0, 200)}`);
    const r = await once(fallback(), schema, instructions, prompt, signal);
    return { ...r, model: fallbackId(), usedFallback: true };
  }
}

/** Key test only: call one provider directly, no fallback. */
export async function askDirect<T>(which: "primary" | "fallback", schema: z.ZodType<T>, prompt: string) {
  return once(which === "primary" ? primary() : fallback(), schema, "Reply with JSON only.", prompt);
}
