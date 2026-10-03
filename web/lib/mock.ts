// Canned model outputs for building the screen without keys (CREW_MOCK=1, local only, never on Vercel).
// Deterministic: it quotes a clause that really is in the answer, so the hard checks pass unless Break it plants a fault.
import type { Answer, Criterion, MarkBatch, SchemeNotes } from "./types";

const EXTRA: string[][] = [
  ["memory", "space", "storage", "twice as much", "extra pointer"],
  ["insert", "delet", "remov", "complex", "difficult", "involved", "harder", "confusing"],
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function keywords(c: Criterion, i: number) {
  const own = c.text
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 4)
    .map((w) => w.slice(0, 6));
  return EXTRA[i] ?? own;
}

function clauseWith(text: string, kws: string[]) {
  const clauses = text.split(/[.,;:()!?]/).map((s) => s.trim()).filter(Boolean);
  const hit = clauses.find((cl) => kws.some((k) => cl.toLowerCase().includes(k)));
  return hit ? hit.split(/\s+/).slice(0, 20).join(" ") : "";
}

export async function mockMark(answers: Answer[], scheme: Criterion[], notes: string[]): Promise<MarkBatch> {
  await wait(500 + Math.random() * 700);
  return {
    marks: answers.map((a) => {
      const criteria = scheme.map((c, i) => {
        const quote = clauseWith(a.text, keywords(c, i));
        return { criterionId: c.id, awarded: quote ? c.points : 0, quote };
      });
      // With notes, the mock "learns" one rule: "more involved / more complex" earns 1 point of the first criterion.
      const extra = clauseWith(a.text, ["involved", "complex"]);
      if (notes.length && criteria[0] && criteria[0].awarded === 0 && extra) {
        criteria[0] = { criterionId: scheme[0].id, awarded: 1, quote: extra };
      }
      return { answerId: a.id, criteria };
    }),
  };
}

export async function mockNotes(scheme: Criterion[]): Promise<SchemeNotes> {
  await wait(700 + Math.random() * 500);
  const [a, b] = scheme;
  return {
    notes: [
      `Give 1 point of ${a?.id ?? "c1"} when the answer says the operations are more involved or complex, even without naming memory.`,
      ...(b ? [`An answer that only says inserting or deleting is harder gets ${b.id} and nothing else.`] : []),
    ],
    reason: "(mock) Your 4s were answers that call the operations more involved; I gave them 3.",
  };
}
