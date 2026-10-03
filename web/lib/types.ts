// Contracts for the one core-loop route (06 §7). Zod first; the UI and the engine import from here.
import { z } from "zod";

// ── Input data ──
export const Criterion = z.object({ id: z.string().min(1), text: z.string().min(1), points: z.number().int().min(0) });
export const Answer = z.object({ id: z.string().min(1), text: z.string() });
export const TeacherMark = z.object({ answerId: z.string().min(1), mark: z.number().min(0) });

// ── Marks ──
export const CriterionMark = z.object({ criterionId: z.string(), awarded: z.number().int().min(0), quote: z.string() });
export const AnswerMark = z.object({
  answerId: z.string(),
  criteria: z.array(CriterionMark),
  total: z.number().min(0),
  checks: z.object({ quoteFound: z.boolean(), sumsOk: z.boolean() }),
  attempt: z.number().int().min(1),
});

// ── POST /api/run body ──
export const RunRequest = z.object({
  question: z.string().min(1),
  maxMarks: z.number().int().positive(),
  scheme: z.array(Criterion).min(1),
  answers: z.array(Answer).min(1),
  teacherMarks: z.array(TeacherMark),
  heldOutMarks: z.array(TeacherMark).optional(),
  breakIt: z.boolean(),
  matchEnabled: z.boolean(),
  // The run is two requests because the teacher approves the scheme in between (06 §13 step 7):
  // "tune" = split, mark her six, Match my marking · "mark" = mark the unseen with the approved notes.
  stage: z.enum(["tune", "mark"]),
  notes: z.array(z.string().max(200)).max(6).default([]),
});

// ── NDJSON events, one per line ──
export const Role = z.enum(["CODE", "MODEL", "AGENT", "HUMAN"]);
export const StepStatus = z.enum(["waiting", "running", "done", "failed"]);
export const Phase = z.enum(["six", "before", "after"]);

export const RunEvent = z.discriminatedUnion("type", [
  z.object({ type: z.literal("step"), id: z.string(), role: Role, label: z.string(), status: StepStatus }),
  z.object({ type: z.literal("round"), n: z.number().int(), matches: z.number().int(), of: z.number().int(), gap: z.number(), notes: z.array(z.string()), dropped: z.array(z.string()).default([]), kept: z.boolean() }),
  z.object({ type: z.literal("mark"), phase: Phase, round: z.number().int().optional(), mark: AnswerMark }),
  // End of the "tune" stage: the notes the teacher is asked to approve (HUMAN step).
  z.object({ type: z.literal("scheme"), notes: z.array(z.string()), matches: z.number().int(), of: z.number().int() }),
  z.object({ type: z.literal("rejected"), phase: Phase, answerId: z.string(), quote: z.string(), reason: z.string(), attempt: z.number().int(), final: z.boolean(), planted: z.boolean() }),
  z.object({ type: z.literal("agreement"), phase: Phase, exact: z.number().int(), withinOne: z.number().int(), n: z.number().int() }),
  z.object({ type: z.literal("usage"), calls: z.number().int(), inputTokens: z.number().int(), outputTokens: z.number().int(), seconds: z.number(), model: z.string(), usedFallback: z.boolean() }),
  z.object({ type: z.literal("error"), message: z.string(), canReplay: z.boolean() }),
  z.object({ type: z.literal("done") }),
]);

// ── Model output schemas ──
export const MarkBatch = z.object({
  marks: z.array(
    z.object({
      answerId: z.string(),
      criteria: z.array(z.object({ criterionId: z.string(), awarded: z.number().int(), quote: z.string() })),
    }),
  ),
});
export const SchemeNotes = z.object({
  notes: z.array(z.string().max(200)).max(6),
  reason: z.string(),
});

export type Criterion = z.infer<typeof Criterion>;
export type Answer = z.infer<typeof Answer>;
export type TeacherMark = z.infer<typeof TeacherMark>;
export type CriterionMark = z.infer<typeof CriterionMark>;
export type AnswerMark = z.infer<typeof AnswerMark>;
export type RunRequest = z.infer<typeof RunRequest>;
export type Role = z.infer<typeof Role>;
export type StepStatus = z.infer<typeof StepStatus>;
export type RunEvent = z.infer<typeof RunEvent>;
export type MarkBatch = z.infer<typeof MarkBatch>;
export type SchemeNotes = z.infer<typeof SchemeNotes>;
