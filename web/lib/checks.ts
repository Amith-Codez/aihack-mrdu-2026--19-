// Hard checks (06 §8): fixed rules in code. The model cannot override them.
import type { AnswerMark, Criterion, CriterionMark } from "./types";

/** Lower case, punctuation to spaces, spaces collapsed: "Need more memory." ~ "need more  memory" */
export function normalise(s: string) {
  return s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^\p{L}\p{N}']+/gu, " ")
    .trim();
}

export type CheckResult = { quoteFound: boolean; sumsOk: boolean; reason: string; badQuote: string };

/**
 * Check 1: every awarded > 0 has a quote that is really in the answer (after normalising).
 * Check 2: each awarded is an integer in 0…points, every criterion is marked exactly once.
 */
export function checkMark(answerText: string, criteria: CriterionMark[], scheme: Criterion[]): CheckResult {
  const hay = ` ${normalise(answerText)} `;
  let quoteFound = true;
  let badQuote = "";
  const reasons: string[] = [];
  for (const c of criteria) {
    if (c.awarded <= 0) continue;
    const q = normalise(c.quote);
    if (!q || !hay.includes(` ${q} `)) {
      quoteFound = false;
      badQuote = c.quote;
      reasons.push(`the quote for ${c.criterionId} is not in the answer: "${c.quote.slice(0, 80)}"`);
    }
  }
  let sumsOk = criteria.length === scheme.length;
  if (!sumsOk) reasons.push(`expected ${scheme.length} criteria, got ${criteria.length}`);
  for (const k of scheme) {
    const got = criteria.filter((c) => c.criterionId === k.id);
    if (got.length !== 1) {
      sumsOk = false;
      if (criteria.length === scheme.length) reasons.push(`criterion ${k.id} is marked ${got.length} times`);
      continue;
    }
    const a = got[0].awarded;
    if (!Number.isInteger(a) || a < 0 || a > k.points) {
      sumsOk = false;
      reasons.push(`${k.id} awarded ${a}, allowed 0 to ${k.points}`);
    }
  }
  return { quoteFound, sumsOk, reason: reasons.join("; "), badQuote };
}

/** Total = min(maxMarks, sum of awarded). */
export function totalOf(criteria: CriterionMark[], maxMarks: number) {
  return Math.min(maxMarks, criteria.reduce((s, c) => s + c.awarded, 0));
}

/** Check 3: no scheme note shares 6 or more consecutive words with any of the six answers. */
export function copiesAnswer(note: string, answers: string[], run = 6) {
  const words = normalise(note).split(" ");
  for (let i = 0; i + run <= words.length; i++) {
    const gram = ` ${words.slice(i, i + run).join(" ")} `;
    if (answers.some((a) => ` ${normalise(a)} `.includes(gram))) return true;
  }
  return false;
}

/** Check 3b: a note may not award more than a criterion's points ("Give 4 points of c2" when c2 is worth 3). */
export function overAwards(note: string, scheme: Criterion[]) {
  for (const m of note.matchAll(/(\d+)\s*(?:points?|marks?)\s*(?:of|for|on|to|in)\s*(c\d+)/gi)) {
    const c = scheme.find((k) => k.id.toLowerCase() === m[2].toLowerCase());
    if (c && Number(m[1]) > c.points) return true;
  }
  return false;
}

/** Matches with the teacher: exact total, and the sum of |gap|. Rejected answers (no mark) never match. */
export function compare(marks: Map<string, AnswerMark | null>, teacher: { answerId: string; mark: number }[]) {
  let exact = 0;
  let withinOne = 0;
  let gap = 0;
  for (const t of teacher) {
    const m = marks.get(t.answerId);
    if (!m) {
      gap += t.mark;
      continue;
    }
    const d = Math.abs(m.total - t.mark);
    if (d === 0) exact++;
    if (d <= 1) withinOne++;
    gap += d;
  }
  return { exact, withinOne, gap, n: teacher.length };
}

/** Check 4: a round is kept only if exact matches rise; a tie is kept only with a smaller total gap. */
export function better(next: { exact: number; gap: number }, best: { exact: number; gap: number }) {
  return next.exact > best.exact || (next.exact === best.exact && next.gap < best.gap);
}
