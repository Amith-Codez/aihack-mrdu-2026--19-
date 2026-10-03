// Try the PDF extraction from the command line: npx tsx --env-file=.env.local scripts/extract.mts public/samples/class-test-infix.pdf
import { readFileSync } from "node:fs";
import { extractClass } from "../lib/extract";

const t = Date.now();
const r = await extractClass(new Uint8Array(readFileSync(process.argv[2])));
console.log(`${r.how} · ${r.model}${r.usedFallback ? " (fallback)" : ""} · ${r.pages} pages · ${((Date.now() - t) / 1000).toFixed(1)} s`);
console.log(r.cls.title, "|", r.cls.question, "|", r.cls.maxMarks, "|", JSON.stringify(r.cls.scheme), r.cls.schemeFrom);
for (const a of r.cls.answers) console.log(a.inPdf ? "✓" : "✗ NOT IN PDF", a.label, "|", a.text.slice(0, 90));
