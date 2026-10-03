// Runs the hero case end to end without the browser: tune → (auto-approve) → mark. Prints one line per event.
// Mock: (cd web && CREW_MOCK=1 npx tsx scripts/run.mts --break) · Real: npx tsx --env-file=.env.local scripts/run.mts --break
// --out <file> also writes the raw events (with _t = ms since start) for the replay.
import { writeFileSync } from "node:fs";
import { runEngine } from "../lib/engine";
import { heroRequest } from "../lib/demo/sample";
import type { RunEvent } from "../lib/types";

const breakIt = process.argv.includes("--break");
const outIdx = process.argv.indexOf("--out");
const out = outIdx > 0 ? process.argv[outIdx + 1] : null;
const t0 = Date.now();
const lines: string[] = [];

function show(e: RunEvent) {
  lines.push(JSON.stringify({ ...e, _t: Date.now() - t0 }));
  const s = ((Date.now() - t0) / 1000).toFixed(1).padStart(5);
  if (e.type === "mark") console.log(`${s} mark  ${e.phase}${e.round !== undefined ? ` r${e.round}` : ""} ${e.mark.answerId} total ${e.mark.total} try ${e.mark.attempt} · ${e.mark.criteria.map((c) => `${c.criterionId}=${c.awarded} "${c.quote.slice(0, 40)}"`).join(" ")}`);
  else console.log(`${s} ${e.type.padEnd(5)} ${JSON.stringify({ ...e, type: undefined }).slice(0, 260)}`);
}

let notes: string[] = [];
await runEngine(heroRequest({ stage: "tune", breakIt }), (e) => {
  show(e);
  if (e.type === "scheme") notes = e.notes;
});
console.log("── teacher approves the notes ──");
await runEngine(heroRequest({ stage: "mark", breakIt, notes }), show);
if (out) writeFileSync(out, lines.join("\n") + "\n");
console.log(`total ${((Date.now() - t0) / 1000).toFixed(1)} s`);
