// What a workspace remembers (MVP, no login). A teacher is identified only by the workspace code she types.
import { z } from "zod";
import { AnswerMark, Criterion, RunEvent } from "./types";

/** "cse-ds rani" → "CSE-DS-RANI". 3–40 characters, letters, digits and dashes. */
export function normaliseCode(raw: string) {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}
export const WorkspaceCode = z.string().regex(/^[A-Z0-9][A-Z0-9-]{1,38}[A-Z0-9]$/, "3–40 letters, digits or dashes");

const TokenCount = z.object({ calls: z.number().int().min(0), inputTokens: z.number().int().min(0), outputTokens: z.number().int().min(0) });
export type TokenCount = z.infer<typeof TokenCount>;
export const zeroTokens = (): TokenCount => ({ calls: 0, inputTokens: 0, outputTokens: 0 });

export const Tips = z.object({ notes: z.array(z.string().max(200)).max(6), approvedAt: z.string(), fromPaperId: z.string().optional() });
export type Tips = z.infer<typeof Tips>;

export const PaperSummary = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  questions: z.number().int(),
  students: z.number().int(),
  marked: z.number().int(), // answers with a mark (tool or teacher)
  total: z.number().int(), // answers in the paper
});
export type PaperSummary = z.infer<typeof PaperSummary>;

export const Workspace = z.object({
  code: WorkspaceCode,
  createdAt: z.string(),
  updatedAt: z.string(),
  papers: z.array(PaperSummary),
  /** approved tips by question + scheme fingerprint, for "Reuse saved tips" */
  tips: z.record(z.string(), Tips),
});
export type Workspace = z.infer<typeof Workspace>;

export const Question = z.object({
  id: z.string(),
  n: z.number().int(),
  text: z.string(),
  maxMarks: z.number().int().positive(),
  scheme: z.array(Criterion).min(1),
  schemeKey: z.string(),
  tips: Tips.nullable(),
  answers: z.array(z.object({ studentId: z.string(), text: z.string(), inPdf: z.boolean() })),
  /** her marks on the six students, for this question */
  teacherMarks: z.record(z.string(), z.number().min(0)),
});
export type Question = z.infer<typeof Question>;

export const Paper = z.object({
  id: z.string(),
  code: WorkspaceCode,
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  students: z.array(z.object({ id: z.string(), label: z.string() })),
  sixStudentIds: z.array(z.string()),
  questions: z.array(Question),
});
export type Paper = z.infer<typeof Paper>;

/** Everything one question's runs produced. Saved after every run event. */
export const QuestionRun = z.object({
  questionId: z.string(),
  updatedAt: z.string(),
  /** every event of every stage, in order, each tagged with its run */
  events: z.array(z.object({ run: z.number().int(), stage: z.enum(["tune", "mark"]), at: z.string(), e: RunEvent })),
  marks: z.record(z.string(), z.object({ mark: AnswerMark, phase: z.enum(["six", "before", "after"]), run: z.number().int(), at: z.string() })),
  /** answers the checks rejected twice */
  rejected: z.record(z.string(), z.object({ reason: z.string(), run: z.number().int(), at: z.string() })),
  edits: z.record(z.string(), z.object({ mark: z.number().min(0), at: z.string() })),
  usage: z.object({ learning: TokenCount, marking: TokenCount }),
  tipsReused: z.boolean(),
  resumed: z.boolean(),
});
export type QuestionRun = z.infer<typeof QuestionRun>;

export const emptyRun = (questionId: string): QuestionRun => ({
  questionId,
  updatedAt: new Date().toISOString(),
  events: [],
  marks: {},
  rejected: {},
  edits: {},
  usage: { learning: zeroTokens(), marking: zeroTokens() },
  tipsReused: false,
  resumed: false,
});

/** Same question + same scheme → same fingerprint (FNV-1a over the normalised text). */
export function schemeKey(question: string, scheme: { text: string; points: number }[]) {
  const s = [question, ...scheme.map((c) => `${c.text}|${c.points}`)].join("\n").toLowerCase().replace(/\s+/g, " ").trim();
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}
