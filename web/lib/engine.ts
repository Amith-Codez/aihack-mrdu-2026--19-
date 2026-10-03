// The run engine (06 §7, §13): plain async code that orders the steps and streams one event per real thing that happens.
// Roles: CODE = plain functions here and in checks.ts · MODEL = one structured call · AGENT = the Match my marking loop
// (≤ 2 rounds, a round kept only if it matches the teacher more) · HUMAN = approvals, done in the browser between stages.
import { better, checkMark, compare, copiesAnswer, overAwards, totalOf } from "./checks";
import { askObject, primaryId } from "./models";
import { mockMark, mockNotes } from "./mock";
import { MarkBatch, SchemeNotes, type Answer, type AnswerMark, type Criterion, type RunEvent, type RunRequest } from "./types";

const MOCK = process.env.CREW_MOCK === "1";
const BATCH = 5; // answers per model call (free-tier request limits)
const PARALLEL = 2; // model calls at a time
const MAX_ROUNDS = 2;
// Break it: the line swapped in for a real quote. It is in none of the sample answers.
export const PLANTED_QUOTE = "the student draws a labelled diagram of every node";

type Emit = (e: RunEvent) => void;
type Ctx = {
  req: RunRequest;
  emit: Emit;
  signal?: AbortSignal;
  calls: number;
  inputTokens: number;
  outputTokens: number;
  model: string;
  usedFallback: boolean;
  planted: boolean;
};

const MARK_INSTRUCTIONS = `You mark students' short answers against a teacher's marking scheme.
Rules:
- For every answer, return one entry per criterion id, in the scheme's order.
- awarded is a whole number from 0 to that criterion's points, never more, even if a note seems to ask for more. Partial points are allowed. To give a total the scheme does not give directly, combine criteria.
- quote: copy the exact words from the student's answer that earn the points: one contiguous phrase, character for character, at most 25 words. If awarded is 0, quote is "".
- Mark what the student wrote, not what they might have meant.
- The teacher's notes, when given, say how this teacher applies the scheme. Follow them over your own judgement.`;

const NOTES_INSTRUCTIONS = `You help a marker match one teacher's marking. You see the scheme, the current notes, and for six answers the teacher's mark next to the marker's mark.
Write notes (at most 6, each under 200 characters) that tell the marker how this teacher applies the scheme, so that its totals match hers.
- Write general rules a marker can apply to new answers, naming criterion ids and points (e.g. "Give 1 point of c1 when ...").
- A criterion can never get more than its points. To reach a total the scheme does not give directly (say 4), combine criteria: full points of one plus partial points of another.
- Never copy a student's sentence: no 6 or more consecutive words from any answer.
- Keep notes that already work; change the ones that cause disagreements.
In reason, say in one sentence what disagreement you are fixing.`;

function schemeText(scheme: Criterion[], maxMarks: number, notes: string[]) {
  return [
    `Marking scheme (the total is capped at ${maxMarks}):`,
    ...scheme.map((c) => `- ${c.id} (${c.points} points): ${c.text}`),
    notes.length ? `Teacher's notes:\n${notes.map((n) => `- ${n}`).join("\n")}` : "Teacher's notes: none yet.",
  ].join("\n");
}

async function pool<T>(jobs: (() => Promise<T>)[], size = PARALLEL) {
  const out: T[] = new Array(jobs.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, jobs.length) }, async () => {
      while (next < jobs.length) {
        const i = next++;
        out[i] = await jobs[i]();
      }
    }),
  );
  return out;
}

const chunk = <T,>(xs: T[], n: number) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));

/** MODEL CALL: mark a batch. Errors from both providers come back as null (the answers go to the teacher unmarked). */
async function callMark(ctx: Ctx, batch: Answer[], notes: string[], fix?: Map<string, string>): Promise<MarkBatch | null> {
  const { req } = ctx;
  ctx.calls++;
  if (MOCK) {
    ctx.model = "mock";
    return mockMark(batch, req.scheme, notes);
  }
  const prompt = [
    `Question: ${req.question}`,
    schemeText(req.scheme, req.maxMarks, notes),
    "Answers:",
    ...batch.map((a) => {
      const why = fix?.get(a.id);
      return `[${a.id}] ${a.text}${why ? `\n  (Your last mark for this answer was rejected: ${why}. Copy the words exactly.)` : ""}`;
    }),
  ].join("\n");
  try {
    const r = await askObject(MarkBatch, MARK_INSTRUCTIONS, prompt, ctx.signal);
    ctx.inputTokens += r.inputTokens;
    ctx.outputTokens += r.outputTokens;
    ctx.model = r.model;
    ctx.usedFallback ||= r.usedFallback;
    return r.object;
  } catch (err) {
    if (ctx.signal?.aborted) throw err;
    console.error(`[engine] mark call failed on both providers: ${(err as Error).message?.slice(0, 200)}`);
    return null;
  }
}

/**
 * Mark answers in batches; CODE runs hard checks 1–2 on every mark; a failed answer is re-asked once with the
 * failure named; still failing → rejected (final) and sent to the teacher unmarked (null).
 */
async function markAll(
  ctx: Ctx,
  answers: Answer[],
  notes: string[],
  phase: "six" | "before" | "after",
  opts: { round?: number; plant?: boolean; batchSize?: number } = {},
) {
  const { req, emit } = ctx;
  const result = new Map<string, AnswerMark | null>();
  const failed: { a: Answer; why: string }[] = [];

  const settle = (a: Answer, got: MarkBatch["marks"][number] | undefined, attempt: number, missing: string): string | null => {
    if (!got) {
      emit({ type: "rejected", phase, answerId: a.id, quote: "", reason: missing, attempt, final: attempt >= 2, planted: false });
      return missing;
    }
    const criteria = got.criteria.map((c) => ({ criterionId: c.criterionId, awarded: c.awarded, quote: c.quote ?? "" }));
    let planted = false;
    if (opts.plant && !ctx.planted && attempt === 1) {
      const i = criteria.findIndex((c) => c.awarded > 0);
      if (i >= 0) {
        criteria[i] = { ...criteria[i], quote: PLANTED_QUOTE };
        ctx.planted = planted = true;
      }
    }
    const chk = checkMark(a.text, criteria, req.scheme);
    if (!chk.quoteFound || !chk.sumsOk) {
      emit({ type: "rejected", phase, answerId: a.id, quote: chk.badQuote, reason: chk.reason, attempt, final: attempt >= 2, planted });
      return chk.reason;
    }
    const mark: AnswerMark = { answerId: a.id, criteria, total: totalOf(criteria, req.maxMarks), checks: { quoteFound: true, sumsOk: true }, attempt };
    result.set(a.id, mark);
    emit({ type: "mark", phase, round: opts.round, mark });
    return null;
  };

  const batches = chunk(answers, opts.batchSize ?? BATCH);
  await pool(
    batches.map((batch) => async () => {
      const out = await callMark(ctx, batch, notes);
      for (const a of batch) {
        const why = settle(a, out?.marks.find((m) => m.answerId === a.id), 1, out ? "no mark came back for this answer" : "the model did not answer");
        if (why) failed.push({ a, why });
      }
    }),
  );

  if (failed.length) {
    const fix = new Map(failed.map((f) => [f.a.id, f.why]));
    const out = await callMark(ctx, failed.map((f) => f.a), notes, fix);
    for (const { a } of failed) {
      const why = settle(a, out?.marks.find((m) => m.answerId === a.id), 2, out ? "no mark came back for this answer" : "the model did not answer");
      if (why) result.set(a.id, null);
    }
  }
  return result;
}

/** MODEL CALL inside the AGENT loop: rewrite the scheme notes from the disagreements. */
async function callNotes(ctx: Ctx, six: Answer[], marks: Map<string, AnswerMark | null>, notes: string[]) {
  const { req } = ctx;
  ctx.calls++;
  if (MOCK) return mockNotes(req.scheme);
  const lines = six.map((a) => {
    const t = req.teacherMarks.find((m) => m.answerId === a.id)!.mark;
    const m = marks.get(a.id);
    const mine = m ? `${m.total} (${m.criteria.map((c) => `${c.criterionId}=${c.awarded}`).join(", ")})` : "no mark";
    return `[${a.id}] teacher ${t} · marker ${mine}${m && m.total !== t ? "  ← DISAGREE" : ""}\n  "${a.text}"`;
  });
  const prompt = [`Question: ${req.question}`, schemeText(req.scheme, req.maxMarks, notes), "The six answers:", ...lines].join("\n");
  const r = await askObject(SchemeNotes, NOTES_INSTRUCTIONS, prompt, ctx.signal);
  ctx.inputTokens += r.inputTokens;
  ctx.outputTokens += r.outputTokens;
  ctx.model = r.model;
  ctx.usedFallback ||= r.usedFallback;
  return r.object;
}

/** Stage "tune": split → mark her six → Match my marking (≤ 2 rounds) → ask her to approve the notes. */
async function tune(ctx: Ctx) {
  const { req, emit } = ctx;
  const six = req.answers.filter((a) => req.teacherMarks.some((t) => t.answerId === a.id));
  emit({ type: "step", id: "split", role: "CODE", label: `your ${six.length} + ${(req.heldOutMarks ?? []).length} unseen`, status: "done" });
  if (six.length < 2) throw new Error("Mark at least two answers yourself first.");

  emit({ type: "step", id: "match", role: "AGENT", label: "marking your six", status: "running" });
  let bestMarks = await markAll(ctx, six, [], "six", { round: 0, batchSize: 6 });
  let best = { ...compare(bestMarks, req.teacherMarks), notes: [] as string[] };
  emit({ type: "round", n: 0, matches: best.exact, of: six.length, gap: best.gap, notes: [], dropped: [], kept: true });

  for (let n = 1; n <= MAX_ROUNDS && best.exact < six.length; n++) {
    emit({ type: "step", id: "match", role: "AGENT", label: `round ${n} of ${MAX_ROUNDS}: rewriting its notes`, status: "running" });
    const proposal = await callNotes(ctx, six, bestMarks, best.notes);
    const texts = six.map((a) => a.text);
    const bad = (s: string) => copiesAnswer(s, texts) || overAwards(s, req.scheme);
    const notes = proposal.notes.map((s) => s.trim()).filter((s) => s && !bad(s));
    const dropped = proposal.notes.filter((s) => s.trim() && bad(s));
    if (!notes.length) {
      emit({ type: "round", n, matches: best.exact, of: six.length, gap: best.gap, notes: [], dropped, kept: false });
      continue;
    }
    const marks = await markAll(ctx, six, notes, "six", { round: n, batchSize: 6 });
    const score = compare(marks, req.teacherMarks);
    const kept = better(score, best);
    emit({ type: "round", n, matches: score.exact, of: six.length, gap: score.gap, notes, dropped, kept });
    if (kept) {
      best = { ...score, notes };
      bestMarks = marks;
    }
  }
  emit({ type: "step", id: "match", role: "AGENT", label: `matches you on ${best.exact} of ${six.length}${best.notes.length ? "" : " · scheme as typed"}`, status: "done" });
  emit({ type: "scheme", notes: best.notes, matches: best.exact, of: six.length });
  emit({ type: "step", id: "approve-scheme", role: "HUMAN", label: "waiting for you", status: "running" });
}

/** Stage "mark": mark the unseen with the scheme as typed (before) and with the approved notes (after); compare with her real marks. */
async function mark(ctx: Ctx) {
  const { req, emit } = ctx;
  const held = req.heldOutMarks ?? [];
  const unseen = req.answers.filter((a) => held.some((t) => t.answerId === a.id));
  const targets = unseen.length ? unseen : req.answers.filter((a) => !req.teacherMarks.some((t) => t.answerId === a.id));
  const tuned = req.matchEnabled && req.notes.length > 0;

  emit({ type: "step", id: "mark", role: "MODEL", label: `${targets.length} answers, ${BATCH} per call`, status: "running" });
  emit({ type: "step", id: "checks", role: "CODE", label: "checking every quote", status: "running" });
  // One phase after the other, so at most PARALLEL calls run at once (free-tier limits).
  const before = await markAll(ctx, targets, [], "before", { plant: req.breakIt && !tuned });
  const after = tuned ? await markAll(ctx, targets, req.notes, "after", { plant: req.breakIt }) : null;
  emit({ type: "step", id: "mark", role: "MODEL", label: `${targets.length} marked${tuned ? " twice (before + after)" : ""}`, status: "done" });
  emit({ type: "step", id: "checks", role: "CODE", label: "every mark checked", status: "done" });

  if (held.length) {
    emit({ type: "step", id: "agreement", role: "CODE", label: "comparing", status: "running" });
    const b = compare(before, held);
    emit({ type: "agreement", phase: "before", exact: b.exact, withinOne: b.withinOne, n: b.n });
    if (after) {
      const a = compare(after, held);
      emit({ type: "agreement", phase: "after", exact: a.exact, withinOne: a.withinOne, n: a.n });
    }
    const last = after ? compare(after, held) : b;
    emit({ type: "step", id: "agreement", role: "CODE", label: `${last.exact} of ${last.n} same as your real marks`, status: "done" });
  }
  emit({ type: "step", id: "approve", role: "HUMAN", label: "waiting for you", status: "running" });
}

export async function runEngine(req: RunRequest, emit: Emit, signal?: AbortSignal) {
  const ctx: Ctx = { req, emit, signal, calls: 0, inputTokens: 0, outputTokens: 0, model: MOCK ? "mock" : primaryId(), usedFallback: false, planted: false };
  const t0 = Date.now();
  try {
    if (req.stage === "tune") await tune(ctx);
    else await mark(ctx);
  } catch (err) {
    if (signal?.aborted) return;
    emit({ type: "error", message: (err as Error).message?.slice(0, 300) || "The run failed", canReplay: true });
  }
  emit({ type: "usage", calls: ctx.calls, inputTokens: ctx.inputTokens, outputTokens: ctx.outputTokens, seconds: (Date.now() - t0) / 1000, model: ctx.model, usedFallback: ctx.usedFallback });
  emit({ type: "done" });
}
