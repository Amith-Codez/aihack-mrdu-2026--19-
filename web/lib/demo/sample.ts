// The sample class (06 §2): one real question, 26 real answers, a real grader's marks.
// Source: Mohler ASAG dataset (Mohler, Bunescu, Mihalcea 2011), CC-BY-4.0. "Teacher" = human grader 1.
import data from "./mohler_sample.json";
import type { Answer, Criterion, TeacherMark } from "../types";

// DEMO_MODE: "live" calls the models; "mock" uses canned outputs (local building only, CREW_MOCK=1, never on Vercel).
export const DEMO_MODE: "live" | "mock" = process.env.CREW_MOCK === "1" ? "mock" : "live";

export const SOURCE_LINE = "Mohler ASAG dataset (2011), CC-BY-4.0 · real student answers, real grader marks";

const q = data.questions.find((x) => x.id === "E07.Q07")!;

export type SampleAnswer = Answer & { label: string; grader1: number; grader2: number };

export const sampleClass = {
  id: q.id,
  question: q.question,
  referenceAnswer: q.referenceAnswer,
  maxMarks: q.maxMarks,
  // The scheme as the teacher typed it (style preview, 05). Totals are capped at maxMarks.
  // The scheme as typed = the dataset's own reference answer, one criterion. The teacher's partial credit
  // (3s and 4s for "insertion/deletion is harder") is what Match my marking has to learn from her six.
  scheme: [{ id: "c1", text: "Names the extra space needed to store the back pointers", points: 5 }] satisfies Criterion[],
  answers: q.answers.map((a, i) => ({
    id: a.id,
    text: a.text,
    label: `Student ${String(i + 1).padStart(2, "0")}`,
    grader1: a.grader1,
    grader2: a.grader2,
  })) satisfies SampleAnswer[],
};

// The teacher's six: a spread of 5, 4 and 3 marks. The next ten are the unseen answers the run is scored on.
export const SIX_IDS = ["E07.Q07.A00", "E07.Q07.A01", "E07.Q07.A02", "E07.Q07.A06", "E07.Q07.A11", "E07.Q07.A19"];
export const UNSEEN_IDS = sampleClass.answers.filter((a) => !SIX_IDS.includes(a.id)).slice(0, 10).map((a) => a.id);

export const teacherSix: TeacherMark[] = SIX_IDS.map((id) => ({
  answerId: id,
  mark: sampleClass.answers.find((a) => a.id === id)!.grader1,
}));

export const heldOut: TeacherMark[] = UNSEEN_IDS.map((id) => ({
  answerId: id,
  mark: sampleClass.answers.find((a) => a.id === id)!.grader1,
}));

/** The request for the hero case: her six + the 10 unseen (their real marks are held back for the agreement step). */
export function heroRequest(o: { stage: "tune" | "mark"; breakIt: boolean; notes?: string[]; teacherMarks?: TeacherMark[]; matchEnabled?: boolean }) {
  const ids = [...SIX_IDS, ...UNSEEN_IDS];
  return {
    question: sampleClass.question,
    maxMarks: sampleClass.maxMarks,
    scheme: sampleClass.scheme,
    answers: sampleClass.answers.filter((a) => ids.includes(a.id)).map(({ id, text }) => ({ id, text })),
    teacherMarks: o.teacherMarks ?? teacherSix,
    heldOutMarks: heldOut,
    breakIt: o.breakIt,
    matchEnabled: o.matchEnabled ?? true,
    stage: o.stage,
    notes: o.notes ?? [],
  };
}

/** A class on screen: the sample, or one read from an uploaded PDF. `real` = a real grader's mark, when we have one. */
export type ClassData = {
  id: string;
  source: "sample" | "pdf";
  title: string;
  question: string;
  maxMarks: number;
  scheme: Criterion[];
  schemeNote: string;
  answers: { id: string; label: string; text: string; real?: number; inPdf?: boolean }[];
  sixIds: string[];
  unseenIds: string[];
};

export const sampleData: ClassData = {
  id: sampleClass.id,
  source: "sample",
  title: "SAMPLE CLASS · DATA STRUCTURES · QUESTION 7",
  question: sampleClass.question,
  maxMarks: sampleClass.maxMarks,
  scheme: sampleClass.scheme,
  schemeNote: "Your marking scheme",
  answers: sampleClass.answers.map((a) => ({ id: a.id, label: a.label, text: a.text, real: a.grader1 })),
  sixIds: SIX_IDS,
  unseenIds: UNSEEN_IDS,
};

/** Her first six marked by her; with an uploaded class, every other answer is marked by the tool. */
export function classFromPdf(x: {
  title: string;
  question: string;
  maxMarks: number;
  scheme: { text: string; points: number }[];
  schemeFrom: string;
  answers: { label: string; text: string; inPdf: boolean }[];
}): ClassData {
  const answers = x.answers.map((a, i) => ({ id: `P${String(i + 1).padStart(2, "0")}`, label: a.label, text: a.text, inPdf: a.inPdf }));
  const six = Math.min(6, Math.max(2, answers.length - 1));
  return {
    id: `pdf-${Date.now()}`,
    source: "pdf",
    title: `FROM YOUR PDF · ${x.title.toUpperCase().slice(0, 60)}`,
    question: x.question,
    maxMarks: x.maxMarks,
    scheme: x.scheme.map((c, i) => ({ id: `c${i + 1}`, text: c.text, points: Math.min(c.points, x.maxMarks) })),
    schemeNote: x.schemeFrom === "scheme" ? "Marking scheme from your PDF" : x.schemeFrom === "model answer" ? "Scheme made from the model answer in your PDF" : "Scheme made from the question (no model answer in the PDF)",
    answers,
    sixIds: answers.slice(0, six).map((a) => a.id),
    unseenIds: answers.slice(six).map((a) => a.id),
  };
}

/** The /api/run body for any class. */
export function buildRequest(cls: ClassData, o: { stage: "tune" | "mark"; breakIt: boolean; notes: string[]; teacherMarks: TeacherMark[]; matchEnabled: boolean }) {
  const ids = [...cls.sixIds, ...cls.unseenIds];
  return {
    question: cls.question,
    maxMarks: cls.maxMarks,
    scheme: cls.scheme,
    answers: cls.answers.filter((a) => ids.includes(a.id)).map(({ id, text }) => ({ id, text })),
    teacherMarks: o.teacherMarks,
    heldOutMarks: cls.unseenIds.flatMap((id) => {
      const real = cls.answers.find((a) => a.id === id)?.real;
      return real === undefined ? [] : [{ answerId: id, mark: real }];
    }),
    breakIt: o.breakIt,
    matchEnabled: o.matchEnabled,
    stage: o.stage,
    notes: o.notes,
  };
}
