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
  scheme: [
    { id: "c1", text: "Names the extra space needed for the back pointers", points: 5 },
    { id: "c2", text: "Only says insertion or deletion is harder", points: 3 },
  ] satisfies Criterion[],
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
