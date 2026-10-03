// Pure projection of the event list into what the screen shows. No hidden state: a replay is the same list.
import type { AnswerMark, Role, RunEvent, StepStatus } from "./types";

export type StepView = { role: Role; label: string; status: StepStatus };
export type RoundView = Extract<RunEvent, { type: "round" }>;
export type RejectView = Extract<RunEvent, { type: "rejected" }>;
export type Agreement = { exact: number; withinOne: number; n: number };
export type Usage = Extract<RunEvent, { type: "usage" }>;

export type View = {
  steps: Record<string, StepView>;
  rounds: RoundView[];
  /** her six, as marked in each round */
  six: Record<number, Record<string, AnswerMark>>;
  before: Record<string, AnswerMark>;
  after: Record<string, AnswerMark>;
  rejected: RejectView[];
  agreement: { before?: Agreement; after?: Agreement };
  scheme?: { notes: string[]; matches: number; of: number };
  usage: Usage[];
  error?: string;
  done: number;
};

export function project(events: RunEvent[]): View {
  const v: View = { steps: {}, rounds: [], six: {}, before: {}, after: {}, rejected: [], agreement: {}, usage: [], done: 0 };
  for (const e of events) {
    switch (e.type) {
      case "step":
        v.steps[e.id] = { role: e.role, label: e.label, status: e.status };
        break;
      case "round":
        v.rounds.push(e);
        break;
      case "mark":
        if (e.phase === "six") (v.six[e.round ?? 0] ??= {})[e.mark.answerId] = e.mark;
        else v[e.phase][e.mark.answerId] = e.mark;
        break;
      case "rejected":
        v.rejected.push(e);
        break;
      case "agreement":
        if (e.phase !== "six") v.agreement[e.phase] = { exact: e.exact, withinOne: e.withinOne, n: e.n };
        break;
      case "scheme":
        v.scheme = { notes: e.notes, matches: e.matches, of: e.of };
        break;
      case "usage":
        v.usage.push(e);
        break;
      case "error":
        v.error = e.message;
        break;
      case "done":
        v.done++;
        break;
    }
  }
  return v;
}

/** The round whose marks were kept last (the best one). */
export function keptRound(v: View) {
  return [...v.rounds].reverse().find((r) => r.kept);
}

/** Read an NDJSON response line by line; malformed lines are skipped (06 §13). */
export async function readNdjson(res: Response, onEvent: (e: RunEvent) => void, parse: (x: unknown) => RunEvent | null) {
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i: number;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i).trim();
      buf = buf.slice(i + 1);
      if (!line) continue;
      try {
        const e = parse(JSON.parse(line));
        if (e) onEvent(e);
      } catch {
        // skip a malformed line
      }
    }
  }
}
