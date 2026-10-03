// Key test (06 §12): one structured call to the primary and one to the fallback. Prints no keys.
// Run: (cd web && npx tsx --env-file=.env.local scripts/keytest.mts)
import { z } from "zod";
import { askDirect, fallbackId, primaryId } from "../lib/models";

const Schema = z.object({ capital: z.string(), sum: z.number().int() });
const prompt = 'What is the capital of France, and what is 17 + 25? Answer as {"capital": string, "sum": integer}.';

for (const which of ["primary", "fallback"] as const) {
  const id = which === "primary" ? primaryId() : fallbackId();
  const t = Date.now();
  try {
    const r = await askDirect(which, Schema, prompt);
    console.log(`${which} ${id}: OK ${JSON.stringify(r.object)} · ${r.inputTokens}+${r.outputTokens} tokens · ${Date.now() - t} ms`);
  } catch (err) {
    console.log(`${which} ${id}: FAIL ${(err as Error).message?.slice(0, 300)}`);
  }
}
