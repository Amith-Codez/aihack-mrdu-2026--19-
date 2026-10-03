"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { SOURCE_LINE, buildRequest, classFromPdf, sampleData, type ClassData } from "@/lib/demo/sample";
import { defaultFlags } from "@/lib/flags";
import { keptRound, project, readNdjson, type View } from "@/lib/project";
import { RunEvent, type AnswerMark, type Role } from "@/lib/types";
import { Hero } from "./hero";
import { CountUp, PenCircle, Reveal } from "./pen";

type RailStep = { id: string; role: Role; label: string; note: string; match?: boolean };

// The named steps of the hero run (06 §7). Status comes from the real events.
const RAIL: RailStep[] = [
  { id: "split", role: "CODE", label: "Split the class", note: "your six + the rest" },
  { id: "six", role: "HUMAN", label: "You mark six answers", note: "" },
  { id: "match", role: "AGENT", label: "Match my marking", note: "rewrites its notes, at most 2 rounds, keeps a round only if it matches you more", match: true },
  { id: "approve-scheme", role: "HUMAN", label: "You approve the scheme", note: "nothing is marked with it before", match: true },
  { id: "mark", role: "MODEL", label: "Mark the unseen answers", note: "5 answers per call, a quote for every mark" },
  { id: "checks", role: "CODE", label: "Hard checks", note: "quote is really in the answer · marks add up" },
  { id: "agreement", role: "CODE", label: "Compare with your real marks", note: "on answers it had not seen" },
  { id: "approve", role: "HUMAN", label: "You approve the marks", note: "edit any mark first" },
];

const LEGEND = [
  { label: "the tool acts", bg: "var(--primary)" },
  { label: "evidence", bg: "var(--signal)" },
  { label: "a teacher's mark", bg: "var(--danger)" },
  { label: "check passed", bg: "var(--success)" },
];

type Filter = "all" | "six" | "unseen";
type Upload = { state: "idle" } | { state: "reading"; name: string } | { state: "done"; name: string; found: number; inPdf: number; how: string; model: string } | { state: "error"; message: string };

const initialSix = (c: ClassData) => Object.fromEntries(c.sixIds.map((id) => [id, c.answers.find((a) => a.id === id)?.real?.toString() ?? ""]));
type Phase = "idle" | "tuning" | "approve-scheme" | "marking" | "review" | "approved" | "error";

const parseEvent = (x: unknown) => {
  const r = RunEvent.safeParse(x);
  return r.success ? r.data : null;
};

/** Highlight each quote inside the answer text (case-insensitive; a quote that is not found is simply not marked). */
function withQuotes(text: string, quotes: string[]): ReactNode {
  const spans: [number, number][] = [];
  const low = text.toLowerCase();
  for (const q of quotes) {
    const i = q.trim() ? low.indexOf(q.trim().toLowerCase()) : -1;
    if (i >= 0 && !spans.some(([a, b]) => i < b && i + q.trim().length > a)) spans.push([i, i + q.trim().length]);
  }
  if (!spans.length) return text;
  spans.sort((a, b) => a[0] - b[0]);
  const out: ReactNode[] = [];
  let at = 0;
  spans.forEach(([a, b], k) => {
    if (a > at) out.push(text.slice(at, a));
    out.push(
      <mark key={k} className="mm-q">
        {text.slice(a, b)}
      </mark>,
    );
    at = b;
  });
  if (at < text.length) out.push(text.slice(at));
  return out;
}

export function MarkApp() {
  const flags = defaultFlags;
  const [cls, setCls] = useState<ClassData>(sampleData);
  const [upload, setUpload] = useState<Upload>({ state: "idle" });
  const max = cls.maxMarks;
  const SIX_IDS = cls.sixIds;
  const UNSEEN_IDS = cls.unseenIds;
  const nSix = SIX_IDS.length;
  const nUnseen = UNSEEN_IDS.length;
  const hasReal = UNSEEN_IDS.some((id) => cls.answers.find((a) => a.id === id)?.real !== undefined);
  const [six, setSix] = useState<Record<string, string>>(() => initialSix(sampleData));
  const [filter, setFilter] = useState<Filter>("all");
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [breakIt, setBreakIt] = useState(true);
  const [notesDraft, setNotesDraft] = useState<string[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const abort = useRef<AbortController | null>(null);

  const valid = (v: string | undefined) => v !== undefined && v !== "" && Number(v) >= 0 && Number(v) <= max;
  const filled = SIX_IDS.filter((id) => valid(six[id])).length;
  const sixDone = filled === SIX_IDS.length;
  const busy = phase === "tuning" || phase === "marking";

  const v: View = project(events);
  const kept = keptRound(v);
  const sixMarks = kept ? v.six[kept.n] ?? {} : {};
  const tuned = Object.keys(v.after).length > 0;
  const finalMarks = tuned ? v.after : v.before;
  const finalPhase = tuned ? "after" : "before";
  const showReal = v.agreement.before !== undefined;

  const kind = (id: string) => (SIX_IDS.includes(id) ? "yours" : UNSEEN_IDS.includes(id) ? "unseen" : "rest");
  const shown = cls.answers.filter((a) => filter === "all" || kind(a.id) === (filter === "six" ? "yours" : "unseen"));

  async function runStage(stage: "tune" | "mark", notes: string[]) {
    abort.current?.abort();
    const ctl = new AbortController();
    abort.current = ctl;
    const teacherMarks = SIX_IDS.map((id) => ({ answerId: id, mark: Number(six[id]) }));
    const body = buildRequest(cls, { stage, breakIt, notes, teacherMarks, matchEnabled: flags.match });
    let sawScheme = false;
    let sawError = false;
    try {
      const res = await fetch("/api/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: ctl.signal });
      if (!res.ok || !res.body) throw new Error(`The server answered ${res.status}`);
      await readNdjson(
        res,
        (e) => {
          if (e.type === "scheme") {
            sawScheme = true;
            setNotesDraft(e.notes);
          }
          if (e.type === "error") sawError = true;
          setEvents((prev) => [...prev, e]);
        },
        parseEvent,
      );
    } catch (err) {
      if (ctl.signal.aborted) return;
      sawError = true;
      setEvents((prev) => [...prev, { type: "error", message: (err as Error).message || "The run failed", canReplay: true }]);
    }
    if (sawError) setPhase("error");
    else if (stage === "tune") setPhase(sawScheme ? "approve-scheme" : "error");
    else setPhase("review");
  }

  function start() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => document.getElementById("run")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), 50);
    setEvents([]);
    setEdits({});
    setNotesDraft([]);
    if (flags.match) {
      setPhase("tuning");
      void runStage("tune", []);
    } else {
      setPhase("marking");
      void runStage("mark", []);
    }
  }

  function approveScheme() {
    setPhase("marking");
    setEvents((prev) => [...prev, { type: "step", id: "approve-scheme", role: "HUMAN", label: notesDraft.length ? `approved · ${notesDraft.length} notes` : "approved · scheme as typed", status: "done" }]);
    void runStage("mark", notesDraft.map((n) => n.trim().slice(0, 200)).filter(Boolean).slice(0, 6));
  }

  function approveMarks() {
    setPhase("approved");
    setEvents((prev) => [...prev, { type: "step", id: "approve", role: "HUMAN", label: "approved", status: "done" }]);
  }

  function loadClass(c: ClassData) {
    abort.current?.abort();
    setCls(c);
    setSix(initialSix(c));
    setEvents([]);
    setEdits({});
    setNotesDraft([]);
    setFilter("all");
    setPhase("idle");
  }

  async function uploadPdf(file: File) {
    if (file.size > 4 * 1024 * 1024) return setUpload({ state: "error", message: "The PDF is larger than 4 MB." });
    setUpload({ state: "reading", name: file.name });
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/extract", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `The server answered ${res.status}`);
      const c = classFromPdf(data.cls);
      if (c.answers.length < 3) throw new Error(`Only ${c.answers.length} answer${c.answers.length === 1 ? "" : "s"} found; at least 3 are needed.`);
      loadClass(c);
      setUpload({
        state: "done",
        name: file.name,
        found: c.answers.length,
        inPdf: c.answers.filter((a) => a.inPdf).length,
        how: data.how,
        model: data.model + (data.usedFallback ? " (fallback)" : ""),
      });
      setTimeout(() => document.getElementById("workspace")?.scrollIntoView({ block: "start" }), 50);
    } catch (err) {
      setUpload({ state: "error", message: (err as Error).message || "Could not read this PDF." });
    }
  }

  async function trySamplePdf() {
    const res = await fetch("/samples/class-test-infix.pdf");
    const blob = await res.blob();
    void uploadPdf(new File([blob], "class-test-infix.pdf", { type: "application/pdf" }));
  }

  function reset() {
    abort.current?.abort();
    setEvents([]);
    setEdits({});
    setNotesDraft([]);
    setPhase("idle");
  }

  const stepStatus = (id: string) => {
    if (id === "six") return sixDone ? "done" : "waiting";
    return v.steps[id]?.status ?? "waiting";
  };
  const editedCount = Object.entries(edits).filter(([id, val]) => finalMarks[id] && val !== "" && Number(val) !== finalMarks[id].total).length;
  const usage = v.usage.reduce(
    (s, u) => ({ calls: s.calls + u.calls, tokens: s.tokens + u.inputTokens + u.outputTokens, seconds: s.seconds + u.seconds, fallback: s.fallback || u.usedFallback, model: u.model }),
    { calls: 0, tokens: 0, seconds: 0, fallback: false, model: "" },
  );
  const planted = v.rejected.find((r) => r.planted);

  return (
    <main className="mm-wrap">
      <header className="mm-bar">
        <Link className="mm-logo" href="/app" aria-label="MarkMatch">
          Mark
          <PenCircle delay={150}>
            <b>Match</b>
          </PenCircle>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="mm-chip">
            <span className="mm-dot" style={{ background: "var(--success)" }} aria-hidden="true" />
            typed short answers
          </span>
          <span className="mm-chip">
            <span className="mm-dot" style={{ background: "var(--signal)" }} aria-hidden="true" />
            nothing is stored
          </span>
          <span className="mm-sticker">receipts for every mark ✓</span>
        </div>
      </header>

      <Hero />

      <div id="workspace" className="mm-grid scroll-mt-4">
        {/* QUESTION */}
        <section className="mm-a-q mm-card blue" aria-labelledby="q-h">
          <div className="mm-upload" aria-live="polite">
            <div className="flex flex-wrap items-center gap-3">
              <label className={`mm-btn yellow small${upload.state === "reading" || busy ? " is-disabled" : ""}`}>
                Upload a PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  className="sr-only"
                  disabled={upload.state === "reading" || busy}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (f) void uploadPdf(f);
                  }}
                />
              </label>
              <span className="mm-small">
                of typed answer scripts: one question, up to 4 MB.{" "}
                <button type="button" className="mm-linkbtn" onClick={trySamplePdf} disabled={upload.state === "reading" || busy}>
                  Try our sample PDF
                </button>
                {cls.source === "pdf" && (
                  <>
                    {" · "}
                    <button type="button" className="mm-linkbtn" onClick={() => (loadClass(sampleData), setUpload({ state: "idle" }))} disabled={busy}>
                      back to the sample class
                    </button>
                  </>
                )}
              </span>
            </div>
            {upload.state === "reading" && (
              <p className="mm-small mm-running mt-2 mb-0">
                ● Reading {upload.name}: text out of the PDF <span className="mm-badge CODE">TOOL</span> → question and answers <span className="mm-badge MODEL">MODEL</span> → every
                answer checked against the PDF <span className="mm-badge CODE">CODE</span>
              </p>
            )}
            {upload.state === "done" && cls.source === "pdf" && (
              <p className="mm-small mt-2 mb-0">
                <span className="mm-ok">✓ {upload.found} answers found in {upload.name}</span> ·{" "}
                {upload.inPdf === upload.found ? (
                  <span className="mm-ok">✓ all {upload.found} found word for word in the PDF</span>
                ) : (
                  <span className="mm-bad">✗ {upload.found - upload.inPdf} not found word for word: check those cards</span>
                )}{" "}
                · <span className="mm-muted">read by {upload.how === "rules" ? "fixed rules (models unreachable)" : upload.model}</span>
              </p>
            )}
            {upload.state === "error" && (
              <p className="mm-small mm-bad mt-2 mb-0" role="alert">
                ✗ {upload.message} The sample class is still loaded.
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="mm-mono mm-small mm-muted">
              {cls.title} · {max} MARKS
            </div>
            <span className="mm-tag" style={{ color: "var(--primary)" }}>
              {cls.answers.length} ANSWERS
            </span>
          </div>
          <h2 id="q-h" className="my-2 text-[26px] leading-tight sm:text-[32px]">
            {cls.question}
          </h2>
          <div className="mt-3 rounded-[10px] border-2 border-dashed border-border-strong bg-surface-2 px-3.5 py-2.5">
            <div className="mm-mono mm-small mm-muted">{cls.schemeNote.toUpperCase()} · MAX {max}</div>
            <ul className="m-0 mt-1 list-none p-0">
              {cls.scheme.map((c) => (
                <li key={c.id} className="flex items-baseline justify-between gap-3 py-0.5">
                  <span>
                    <span className="mm-mono mm-small mm-muted">{c.id}</span> {c.text}
                  </span>
                  <span className="mm-mono">{c.points}</span>
                </li>
              ))}
            </ul>
            <div className="mm-small mm-muted mt-1">The total is capped at {max}.</div>
          </div>

          {/* the pile: one tile per script */}
          <div className="mt-5">
            <div className="mm-section-h mb-2">
              <span className="mm-mono mm-small">THE PILE</span>
              <span className="mm-small mm-muted">
                <b className="text-foreground">
                  {filled} of {nSix}
                </b>{" "}
                marked by you ·{" "}
                {hasReal ? `${nUnseen} kept back to test it · ${cls.answers.length - nSix - nUnseen} more` : `${nUnseen} for the tool to mark`}
              </span>
            </div>
            <div className="mm-pile" aria-hidden="true">
              {cls.answers.map((a, n) => {
                const k = kind(a.id);
                return (
                  <span
                    key={a.id}
                    title={`${a.label}${k === "yours" ? " · you mark this" : k === "unseen" ? " · unseen, used to test it" : ""}`}
                    className={`mm-tile ${k}${k === "yours" && valid(six[a.id]) ? " filled" : ""}${finalMarks[a.id] ? " marked" : ""}`}
                  >
                    {String(n + 1).padStart(2, "0")}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" className="mm-btn" disabled={!sixDone || busy} onClick={start} aria-busy={busy}>
              {busy ? "Running…" : phase === "idle" ? (flags.match ? "Match my marking" : "Mark the class") : "Run again"}
            </button>
            <label className="mm-toggle">
              <input type="checkbox" checked={breakIt} disabled={busy} onChange={(e) => setBreakIt(e.target.checked)} />
              <span>
                <b>Break it:</b> plant a false quote
              </span>
            </label>
            {phase !== "idle" && !busy && (
              <button type="button" className="mm-linkbtn" onClick={reset}>
                Start again
              </button>
            )}
          </div>
          <p className="mm-small mm-muted mt-2 mb-0 max-w-[60ch]">
            {!sixDone
              ? `Enter ${nSix - filled} more of your marks to start${cls.source === "pdf" ? ": mark the first answers the way you would on paper" : ""}.`
              : breakIt
                ? "Break it swaps one quote the model returns for a line that is not in the answer, so you can watch the check throw it out."
                : "Your six marks are in."}
          </p>
        </section>

        {/* STEPS rail */}
        <section className="mm-a-steps mm-card" aria-labelledby="steps-h" aria-live="polite">
          <div className="mm-section-h">
            <h2 id="steps-h" className="text-[26px]">
              How it marks
            </h2>
            <span className="mm-mono mm-small mm-muted">{RAIL.filter((s) => (flags.match || !s.match) && (hasReal || s.id !== "agreement")).length} STEPS</span>
          </div>
          <ol className="m-0 mt-1 list-none p-0">
            {RAIL.filter((s) => (flags.match || !s.match) && (hasReal || s.id !== "agreement")).map((s, n) => {
              const st = stepStatus(s.id);
              const live = v.steps[s.id]?.label;
              return (
                <li key={s.id} className={`mm-step is-${st}${s.role === "AGENT" ? " is-agent" : ""}`}>
                  <span className="mm-stepnum" aria-label={st} title={st}>
                    {st === "done" ? "✓" : st === "failed" ? "✗" : n + 1}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <b className="font-semibold">{s.id === "mark" && !hasReal ? "Mark the rest" : s.label}</b>
                      <span className={`mm-badge ${s.role}`}>{s.role}</span>
                    </span>
                    <span className="mm-small mm-muted block">
                      {s.id === "six" ? (
                        sixDone ? (
                          <span className="mm-ok">✓ done · 6 of 6 entered</span>
                        ) : (
                          `${filled} of 6 entered · waiting`
                        )
                      ) : st === "running" ? (
                        <span className="mm-running">● {live ?? "working"}</span>
                      ) : st === "done" && live ? (
                        <span className="mm-ok">✓ {live}</span>
                      ) : (
                        s.note
                      )}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 border-t-2 border-dotted border-border-strong pt-3">
            <div className="mm-mono mm-small mm-muted">COLOUR KEY</div>
            <div className="mm-legend">
              {LEGEND.map((l) => (
                <span key={l.label}>
                  <i style={{ background: l.bg }} aria-hidden="true" />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ANSWERS (+ the run's cards on top) */}
        <section className="mm-a-answers" aria-labelledby="ans-h">
          {v.error && (
            <div className="mm-card red mb-6" role="alert">
              <h2 className="text-[26px]">The run stopped</h2>
              <p className="mt-1 mb-3">{v.error}</p>
              <p className="mm-small mm-muted mt-0 mb-3">Both model providers were tried. Nothing was marked with an unchecked mark.</p>
              <button type="button" className="mm-btn ghost" onClick={start} disabled={!sixDone}>
                Try again
              </button>
            </div>
          )}

          {flags.match && (v.rounds.length > 0 || phase === "tuning") && (
            <div id="run" className="mm-card blue mb-6 scroll-mt-4" aria-live="polite">
              <div className="mm-section-h">
                <h2 className="text-[26px]">Match my marking</h2>
                <span className="mm-badge AGENT">AGENT</span>
              </div>
              <p className="mm-small mm-muted mt-1 mb-3">It marks your six, compares with your marks, rewrites its notes and tries again. Code keeps a round only if it matches you more.</p>
              {v.scheme && (
                <p className="mm-verdict">
                  {v.scheme.notes.length ? (
                    <>
                      ✓ Its notes now match you on {v.scheme.matches} of {v.scheme.of} (was {v.rounds[0]?.matches} of {v.rounds[0]?.of})
                    </>
                  ) : (
                    <>No round matched you better → your scheme stays as typed ({v.scheme.matches} of {v.scheme.of})</>
                  )}
                </p>
              )}
              <ol className="m-0 flex list-none flex-col gap-3 p-0">
                {v.rounds.map((r) => {
                  const best = kept?.n === r.n;
                  const full = r.matches === r.of;
                  return (
                    <li key={r.n} className={`mm-round${best ? " is-best" : ""}${best && full ? " is-full" : ""}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="mm-mono mm-small">{r.n === 0 ? "ROUND 0 · YOUR SCHEME AS TYPED" : `ROUND ${r.n} · NEW NOTES`}</span>
                        <span className={`mm-tag ${r.kept ? "mm-ok" : "mm-bad"}`}>{r.kept ? "✓ KEPT" : "✗ NOT KEPT · no better"}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
                        <span>matches you on</span>
                        <span className="mm-num text-[34px]">
                          {r.matches} of {r.of}
                        </span>
                        <span className="mm-small mm-muted">total gap {r.gap}</span>
                        {best && full && <span className="mm-pen text-[24px]">matches you now!</span>}
                      </div>
                      {r.notes.length > 0 &&
                        (r.kept ? (
                          <ul className="mm-notes">
                            {r.notes.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        ) : (
                          <details className="mm-details">
                            <summary>
                              {r.notes.length} note{r.notes.length > 1 ? "s" : ""} tried
                            </summary>
                            <ul className="mm-notes">
                              {r.notes.map((n, i) => (
                                <li key={i}>{n}</li>
                              ))}
                            </ul>
                          </details>
                        ))}
                      {r.dropped.length > 0 && (
                        <ul className="mm-notes dropped">
                          {r.dropped.map((n, i) => (
                            <li key={i}>
                              <s>{n}</s> <span className="mm-bad mm-small">✗ dropped by code: copies an answer or gives more than a criterion is worth</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
                {phase === "tuning" && <li className="mm-small mm-running">● {v.steps.match?.label ?? "marking your six"}</li>}
              </ol>

              {v.scheme && (
                <div className="mt-4 rounded-[10px] border-2 border-dashed border-danger bg-surface p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <b>Your call: the scheme notes</b>
                    <span className="mm-badge HUMAN">HUMAN</span>
                  </div>
                  {phase === "approve-scheme" ? (
                    <>
                      <p className="mm-small mm-muted mt-1 mb-2">
                        {notesDraft.length
                          ? "Edit or delete any note. Nothing is marked with them until you approve."
                          : "No round matched you better, so your scheme is used as typed."}
                      </p>
                      {notesDraft.map((n, i) => (
                        <div key={i} className="mb-2 flex items-start gap-2">
                          <textarea
                            className="mm-notebox"
                            value={n}
                            maxLength={200}
                            rows={2}
                            aria-label={`Scheme note ${i + 1}`}
                            onChange={(e) => setNotesDraft((d) => d.map((x, j) => (j === i ? e.target.value : x)))}
                          />
                          <button type="button" className="mm-linkbtn" onClick={() => setNotesDraft((d) => d.filter((_, j) => j !== i))} aria-label={`Delete note ${i + 1}`}>
                            delete
                          </button>
                        </div>
                      ))}
                      <button type="button" className="mm-btn mt-1" onClick={approveScheme}>
                        Approve and mark the {nUnseen} {hasReal ? "unseen" : "others"}
                      </button>
                    </>
                  ) : (
                    <p className="mm-small mt-1 mb-0">
                      <span className="mm-ok">✓ Approved</span>
                      {notesDraft.length ? ` · ${notesDraft.length} note${notesDraft.length > 1 ? "s" : ""} in use` : " · scheme as typed"}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {planted && (
            <div className="mm-card red mb-6">
              <span className="mm-stamp">THROWN OUT</span>
              <div className="flex flex-wrap items-center gap-2">
                <b>Break it worked: the check caught the planted quote</b>
                <span className="mm-badge CODE">CODE</span>
              </div>
              <p className="mm-small mt-1 mb-0">
                <a className="mm-anchor" href={`#ans-${planted.answerId}`}>
                  {cls.answers.find((a) => a.id === planted.answerId)?.label}
                </a>
                : <s>“{planted.quote}”</s> is not in the answer → mark thrown out → re-asked once
                {finalMarks[planted.answerId] ? <span className="mm-ok"> → ✓ fixed on try 2</span> : <span className="mm-bad"> → sent to you unmarked</span>}
              </p>
            </div>
          )}

          <div className="mm-section-h mb-4">
            <h2 id="ans-h" className="text-[26px]">
              The answers
            </h2>
            <div className="mm-filter" role="group" aria-label="Show answers">
              {(
                [
                  ["all", `All ${cls.answers.length}`],
                  ["six", `Your ${nSix}`],
                  ["unseen", `${hasReal ? "Unseen" : "To mark"} ${nUnseen}`],
                ] as const
              ).map(([f, label]) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <ul className="m-0 flex list-none flex-col gap-6 p-0">
            {shown.map((a) => {
              const k = kind(a.id);
              const bad = k === "yours" && six[a.id] !== "" && !valid(six[a.id]);
              const tool: AnswerMark | undefined = k === "yours" ? sixMarks[a.id] : finalMarks[a.id];
              const rej = v.rejected.filter((r) => r.answerId === a.id && (k === "yours" ? r.phase === "six" : r.phase === finalPhase));
              const thrown = k === "unseen" && !tool && rej.some((r) => r.final);
              const edit = edits[a.id];
              const edited = tool && edit !== undefined && edit !== "" && Number(edit) !== tool.total;
              const real = a.real ?? 0;
              const miss = k === "unseen" && tool && showReal && tool.total !== real;
              const caught = rej.some((r) => r.planted) && !!tool;
              return (
                <li key={a.id} id={`ans-${a.id}`} className={`mm-card ${k}${miss ? " miss" : ""}${caught ? " caught" : ""} scroll-mt-4`}>
                  {k === "yours" && <span className="mm-stamp yellow">YOU MARK THIS</span>}
                  {k === "unseen" && tool && !caught && <span className="mm-stamp green">{phase === "approved" ? "APPROVED" : "CHECKED ✓"}</span>}
                  {caught && <span className="mm-stamp">CAUGHT ✗ → FIXED ✓</span>}
                  {thrown && <span className="mm-stamp">THROWN OUT · TO YOU</span>}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="mm-mono mm-small mm-muted">{a.label.toUpperCase()}</span>
                        {k === "unseen" && (
                          <span className="mm-tag" style={{ color: "var(--primary)" }}>
                            {hasReal ? "UNSEEN · TESTS THE TOOL" : "THE TOOL MARKS THIS"}
                          </span>
                        )}
                        {k === "rest" && events.length > 0 && <span className="mm-tag mm-muted">NOT IN THIS RUN</span>}
                        {a.inPdf === false && <span className="mm-tag mm-bad">✗ NOT WORD FOR WORD IN THE PDF</span>}
                      </div>
                      <p className="mt-1.5 mb-0 text-[21px] break-words">{tool ? withQuotes(a.text, tool.criteria.map((c) => c.quote)) : a.text}</p>
                      {tool && (
                        <ul className="mm-crit">
                          {tool.criteria.map((c) => {
                            const crit = cls.scheme.find((s) => s.id === c.criterionId);
                            return (
                              <li key={c.criterionId}>
                                <span className="mm-mono">
                                  {c.criterionId} {c.awarded}/{crit?.points}
                                </span>{" "}
                                {c.awarded > 0 ? <span className="mm-small">“{c.quote}”</span> : <span className="mm-small mm-muted">not met</span>}
                              </li>
                            );
                          })}
                          <li className="mm-small">
                            <span className="mm-ok">✓ quote in answer</span> · <span className="mm-ok">✓ marks add up</span>
                            {tool.attempt > 1 && <span className="mm-bad"> · try {tool.attempt}</span>}
                          </li>
                        </ul>
                      )}
                      {rej.map((r, i) => (
                        <p key={i} className="mm-reject">
                          ✗ Try {r.attempt} thrown out{r.planted ? " (planted by Break it)" : ""}:{" "}
                          {r.quote ? (
                            <>
                              <s>“{r.quote}”</s> is not in the answer
                            </>
                          ) : (
                            r.reason
                          )}
                        </p>
                      ))}
                    </div>
                    {k === "yours" && (
                      <div className="flex shrink-0 flex-row items-end gap-4 self-end sm:flex-col sm:items-center sm:gap-2">
                        <label className="flex flex-row items-center gap-2 sm:flex-col sm:gap-1">
                          <span className="mm-pen text-[22px] leading-none">your mark</span>
                          <input
                            className="mm-markbox"
                            inputMode="numeric"
                            aria-invalid={bad}
                            disabled={busy}
                            aria-label={`Your mark for ${a.label}, out of ${max}`}
                            value={six[a.id]}
                            onChange={(e) => setSix((m) => ({ ...m, [a.id]: e.target.value.replace(/[^0-9]/g, "").slice(0, 1) }))}
                          />
                          <span className={`mm-mono mm-small ${bad ? "mm-bad" : "mm-muted"}`}>{bad ? `✗ max ${max}` : `/ ${max}`}</span>
                        </label>
                        {tool && (
                          <span className="mm-small text-center">
                            tool: <b className="mm-mono">{tool.total}</b>{" "}
                            {tool.total === Number(six[a.id]) ? <span className="mm-ok">✓ same</span> : <span className="mm-bad">✗ differs</span>}
                          </span>
                        )}
                      </div>
                    )}
                    {k === "unseen" && tool && (
                      <div className="flex shrink-0 flex-row items-end gap-4 self-end sm:flex-col sm:items-center sm:gap-2">
                        <PenCircle delay={0}>
                          <span className="mm-bigmark" aria-label={`Tool's mark ${edited ? edit : tool.total} of ${max}`}>
                            {edited ? edit : tool.total}
                          </span>
                        </PenCircle>
                        {phase === "review" ? (
                          <label className="flex items-center gap-1">
                            <span className="mm-small">edit</span>
                            <input
                              className="mm-markbox small"
                              inputMode="numeric"
                              aria-label={`Change the mark for ${a.label}`}
                              value={edit ?? String(tool.total)}
                              onChange={(e) => setEdits((m) => ({ ...m, [a.id]: e.target.value.replace(/[^0-9]/g, "").slice(0, 1) }))}
                            />
                          </label>
                        ) : null}
                        {edited && <span className="mm-tag mm-bad">EDITED BY YOU</span>}
                        {showReal && (
                          <span className="mm-small text-center">
                            real mark <b className="mm-mono">{real}</b>{" "}
                            {miss ? <span className="mm-bad">✗ {Math.abs(tool.total - real)} off</span> : <span className="mm-ok">✓ same</span>}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* APPROVE + PROOF */}
        <aside className="mm-a-side flex flex-col gap-6">
          <div className="mm-card red">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[26px]">Your call</h2>
              <span className="mm-badge HUMAN">HUMAN</span>
            </div>
            {phase === "approved" ? (
              <p className="mt-1.5 mb-0">
                <span className="mm-ok">✓ Marks approved</span>
                {editedCount ? ` · ${editedCount} changed by you` : ""}. They stay in this tab; nothing is stored.
              </p>
            ) : (
              <>
                <p className="mm-small mt-1.5 mb-3.5">
                  <b>Nothing is final until you approve.</b>{" "}
                  <span className="mm-muted">
                    {phase === "review"
                      ? `${Object.keys(finalMarks).length} marks ready. Change any mark in its card first.`
                      : phase === "approve-scheme"
                        ? "First approve the scheme notes."
                        : busy
                          ? "The run is going."
                          : "No marks yet: run the marking first."}
                  </span>
                </p>
                {phase === "review" && (
                  <button type="button" className="mm-btn" onClick={approveMarks}>
                    Approve {Object.keys(finalMarks).length} marks{editedCount ? ` (${editedCount} edited)` : ""}
                  </button>
                )}
              </>
            )}
          </div>
          <Reveal className="mm-card">
            <h2 className="text-[26px]">Proof</h2>
            <div className="mt-2 rounded-[10px] border-2 border-dashed border-primary bg-surface-2 p-3">
              <div className="mm-small">
                <b>This tool vs you</b>, {hasReal ? `same mark on ${nUnseen} answers it had not seen` : `same mark on your ${nSix}`}
              </div>
              {!hasReal ? (
                v.scheme ? (
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                    <span className="mm-num text-[64px]" style={{ color: "var(--primary)" }}>
                      {v.scheme.matches}
                    </span>
                    <span className="mm-small">
                      of {v.scheme.of}
                      {v.rounds[0] && v.rounds[0].matches !== v.scheme.matches ? ` · was ${v.rounds[0].matches} with the scheme as typed` : ""}
                    </span>
                    <div className="mm-small mm-muted w-full">Your PDF has no marks for the other answers, so your six are the test. Check its marks before you approve.</div>
                  </div>
                ) : (
                  <div className="mm-mono mm-small mt-1" style={{ color: "var(--primary)" }}>
                    {busy ? "measuring…" : "measured when you run it"}
                  </div>
                )
              ) : v.agreement.before ? (
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  {v.agreement.after ? (
                    <>
                      <span className="mm-small">before</span>
                      <span className="mm-num text-[44px]">{v.agreement.before.exact}</span>
                      <span className="mm-small">→ after</span>
                      <span className="mm-num text-[64px]" style={{ color: "var(--primary)" }}>
                        {v.agreement.after.exact}
                      </span>
                      <span className="mm-small">of {v.agreement.after.n}</span>
                    </>
                  ) : (
                    <>
                      <span className="mm-num text-[64px]" style={{ color: "var(--primary)" }}>
                        {v.agreement.before.exact}
                      </span>
                      <span className="mm-small">of {v.agreement.before.n} · you vs this tool</span>
                    </>
                  )}
                  <div className="mm-small mm-muted w-full">
                    two trained examiners: 5.7 of 10 · within one mark: {(v.agreement.after ?? v.agreement.before).withinOne} of {(v.agreement.after ?? v.agreement.before).n} · one question, this run
                  </div>
                </div>
              ) : (
                <div className="mm-mono mm-small mt-1" style={{ color: "var(--primary)" }}>
                  {busy ? "measuring…" : "measured when you run it"}
                </div>
              )}
            </div>
            {usage.calls > 0 && (
              <dl className="mm-usage">
                <dt>time</dt>
                <dd>{usage.seconds.toFixed(1)} s</dd>
                <dt>model calls</dt>
                <dd>{usage.calls}</dd>
                <dt>tokens</dt>
                <dd>{usage.tokens.toLocaleString("en-IN")}</dd>
                <dt>model</dt>
                <dd>
                  {usage.model}
                  {usage.fallback ? " (fallback used)" : ""}
                </dd>
                <dt>cost</dt>
                <dd>₹0 · free tier</dd>
              </dl>
            )}
            <p className="mm-small mm-muted mt-4 mb-2">How often two trained examiners agree, on 2,442 real answers:</p>
            <div className="flex items-baseline justify-between">
              <span className="mm-small">same mark</span>
              <span className="mm-num text-[26px]">
                <CountUp value={56.8} decimals={1} suffix="%" />
              </span>
            </div>
            <div className="mm-bar-track mt-1">
              <div className="mm-bar-fill" style={{ width: "56.8%", background: "var(--foreground)" }} />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="mm-small">within one mark</span>
              <span className="mm-num text-[26px]">
                <CountUp value={78} decimals={1} suffix="%" />
              </span>
            </div>
            <div className="mm-bar-track mt-1">
              <div className="mm-bar-fill" style={{ width: "78%", background: "var(--muted-foreground)" }} />
            </div>
            <div className="mm-small mm-muted mt-3">Mohler dataset · measured by us, 3 Oct 2026</div>
          </Reveal>
        </aside>
      </div>

      <footer className="mm-small mm-muted mt-12 border-t-2 border-dotted border-border-strong pt-4">
        {SOURCE_LINE}. Typed short answers today. Marks stay in this tab; nothing is stored.
      </footer>
    </main>
  );
}
