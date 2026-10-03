// PDF → a class to mark. TOOL: read the text (unpdf) · MODEL: one structured call finds the question, scheme and
// answers · CODE: every answer must really be in the PDF text (else it is flagged) · CODE fallback: a plain
// "Student 01" layout is parsed by rules when both models fail.
import { extractText, getDocumentProxy } from "unpdf";
import { z } from "zod";
import { normalise } from "./checks";
import { askObject, askObjectWithFile } from "./models";

export const MAX_PDF_BYTES = 4 * 1024 * 1024; // Vercel's request body limit is 4.5 MB

export const ExtractedClass = z.object({
  title: z.string(),
  question: z.string(),
  maxMarks: z.number().int().min(1).max(100),
  scheme: z.array(z.object({ text: z.string().min(1), points: z.number().int().min(1) })).min(1).max(6),
  schemeFrom: z.enum(["scheme", "model answer", "question"]),
  answers: z.array(z.object({ label: z.string(), text: z.string() })).max(80),
});
export type ExtractedClass = z.infer<typeof ExtractedClass>;

export type ExtractResult = {
  cls: ExtractedClass & { answers: { label: string; text: string; inPdf: boolean }[] };
  pages: number;
  how: "model" | "model (read the PDF directly)" | "rules";
  model: string;
  usedFallback: boolean;
};

const INSTRUCTIONS = `You read an exam answer-script document for a teacher. Find the FIRST question and every student's answer to it.
- question: the question text exactly as written. maxMarks: the marks for it (5 if not stated).
- scheme: if the document has a marking scheme, copy its criteria with their points. Otherwise make ONE criterion "Matches the model answer: <model answer>" worth maxMarks. With no model answer either, make one criterion from the question.
- schemeFrom: "scheme", "model answer" or "question", saying where the scheme came from.
- answers: one entry per student, in order. label = the student's name or number as written (e.g. "Student 01"). text = the answer copied WORD FOR WORD, character for character. Never fix spelling, never summarise, never invent an answer. Skip students with no answer.
- title: a short title for the class (subject and test name if given).`;

/** CODE fallback for the plain layout: "Question …: …", "Model answer: …", then "Student NN" blocks. */
export function parseByRules(text: string): ExtractedClass | null {
  const q = text.match(/Question[^:\n]*?(?:\((\d+)\s*marks?\))?\s*:\s*([^\n]+)/i);
  const parts = text.split(/^\s*(Student\s*\d+)\s*$/im);
  if (!q || parts.length < 3) return null;
  const answers: { label: string; text: string }[] = [];
  for (let i = 1; i + 1 < parts.length; i += 2) {
    const t = parts[i + 1].replace(/\s+/g, " ").trim();
    if (t) answers.push({ label: parts[i].trim(), text: t });
  }
  const model = text.match(/Model answer\s*:\s*([^\n]+)/i)?.[1]?.trim();
  const maxMarks = Number(q[1] ?? 5);
  return {
    title: text.split("\n")[0].trim().slice(0, 80),
    question: q[2].trim(),
    maxMarks,
    scheme: [{ text: model ? `Matches the model answer: ${model}` : `Answers the question: ${q[2].trim()}`, points: maxMarks }],
    schemeFrom: model ? "model answer" : "question",
    answers,
  };
}

export async function extractClass(bytes: Uint8Array, signal?: AbortSignal): Promise<ExtractResult> {
  // TOOL: read the text layer.
  const pdf = await getDocumentProxy(new Uint8Array(bytes));
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  const hasText = text.replace(/\s/g, "").length > 40;

  let cls: ExtractedClass | null = null;
  let how: ExtractResult["how"] = "model";
  let model = "rules";
  let usedFallback = false;

  if (process.env.CREW_MOCK === "1") {
    cls = parseByRules(text);
    how = "rules";
  } else {
    try {
      if (hasText) {
        const r = await askObject(ExtractedClass, INSTRUCTIONS, `The document's text (${totalPages} pages):\n\n${text.slice(0, 60_000)}`, signal);
        cls = r.object;
        model = r.model;
        usedFallback = r.usedFallback;
      } else {
        // No text layer (a scan): only the primary model can read the PDF itself.
        const r = await askObjectWithFile(ExtractedClass, INSTRUCTIONS, "Read this scanned answer-script PDF.", bytes, "application/pdf", signal);
        cls = r.object;
        model = r.model;
        how = "model (read the PDF directly)";
      }
    } catch (err) {
      if (signal?.aborted) throw err;
      console.warn(`[extract] model extraction failed: ${(err as Error).message?.slice(0, 200)}`);
      cls = hasText ? parseByRules(text) : null;
      how = "rules";
    }
  }
  if (!cls || cls.answers.length === 0) throw new Error("No question and student answers found in this PDF.");

  // CODE: every answer must really be in the PDF (whitespace and punctuation ignored).
  const hay = ` ${normalise(text)} `;
  const answers = cls.answers
    .map((a) => ({ label: a.label.trim() || "Student", text: a.text.trim() }))
    .filter((a) => a.text)
    .map((a) => ({ ...a, inPdf: !hasText || hay.includes(` ${normalise(a.text)} `) }));
  return { cls: { ...cls, answers }, pages: totalPages, how, model, usedFallback };
}
