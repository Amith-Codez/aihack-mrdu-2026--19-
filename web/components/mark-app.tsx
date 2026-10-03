"use client";

import Link from "next/link";
import { useState } from "react";
import { SIX_IDS, SOURCE_LINE, UNSEEN_IDS, sampleClass } from "@/lib/demo/sample";
import { defaultFlags } from "@/lib/flags";
import type { Role } from "@/lib/types";
import { Hero } from "./hero";
import { CountUp, PenCircle, Reveal } from "./pen";

type RailStep = { id: string; role: Role; label: string; note: string };

// The named steps of the hero run (06 §7). Status comes from real events from step 1 on.
const RAIL: RailStep[] = [
  { id: "split", role: "CODE", label: "Split the class", note: "your six + 10 unseen to test on" },
  { id: "six", role: "HUMAN", label: "You mark six answers", note: "" },
  { id: "match", role: "AGENT", label: "Match my marking", note: "rewrites its notes, at most 2 rounds, keeps a round only if it matches you more" },
  { id: "approve-scheme", role: "HUMAN", label: "You approve the scheme", note: "nothing is marked with it before" },
  { id: "mark", role: "MODEL", label: "Mark the unseen answers", note: "5 answers per call, a quote for every mark" },
  { id: "checks", role: "CODE", label: "Hard checks", note: "quote is really in the answer · marks add up" },
  { id: "approve", role: "HUMAN", label: "You approve the class", note: "edit any mark first" },
];

const LEGEND = [
  { label: "the tool acts", bg: "var(--primary)" },
  { label: "evidence", bg: "var(--signal)" },
  { label: "a teacher's mark", bg: "var(--danger)" },
  { label: "check passed", bg: "var(--success)" },
];

type Filter = "all" | "six" | "unseen";

export function MarkApp() {
  const max = sampleClass.maxMarks;
  const [six, setSix] = useState<Record<string, string>>(() =>
    Object.fromEntries(SIX_IDS.map((id) => [id, String(sampleClass.answers.find((a) => a.id === id)!.grader1)])),
  );
  const [filter, setFilter] = useState<Filter>("all");
  const flags = defaultFlags;

  const valid = (v: string | undefined) => v !== undefined && v !== "" && Number(v) >= 0 && Number(v) <= max;
  const filled = SIX_IDS.filter((id) => valid(six[id])).length;
  const sixDone = filled === SIX_IDS.length;

  const kind = (id: string) => (SIX_IDS.includes(id) ? "yours" : UNSEEN_IDS.includes(id) ? "unseen" : "rest");
  const shown = sampleClass.answers.filter((a) => filter === "all" || kind(a.id) === (filter === "six" ? "yours" : "unseen"));

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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="mm-mono mm-small mm-muted">
              SAMPLE CLASS · DATA STRUCTURES · QUESTION 7 · {max} MARKS
            </div>
            <span className="mm-tag" style={{ color: "var(--primary)" }}>
              {sampleClass.answers.length} ANSWERS
            </span>
          </div>
          <h2 id="q-h" className="my-2 text-[26px] leading-tight sm:text-[32px]">
            {sampleClass.question}
          </h2>
          <div className="mt-3 rounded-[10px] border-2 border-dashed border-border-strong bg-surface-2 px-3.5 py-2.5">
            <div className="mm-mono mm-small mm-muted">YOUR MARKING SCHEME · MAX {max}</div>
            <ul className="m-0 mt-1 list-none p-0">
              {sampleClass.scheme.map((c) => (
                <li key={c.id} className="flex items-baseline justify-between gap-3 py-0.5">
                  <span>{c.text}</span>
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
                <b className="text-foreground">{filled} of 6</b> marked by you · 10 kept back to test it · {sampleClass.answers.length - 16} more
              </span>
            </div>
            <div className="mm-pile" aria-hidden="true">
              {sampleClass.answers.map((a, n) => {
                const k = kind(a.id);
                return (
                  <span
                    key={a.id}
                    title={`${a.label}${k === "yours" ? " · you mark this" : k === "unseen" ? " · unseen, used to test it" : ""}`}
                    className={`mm-tile ${k}${k === "yours" && valid(six[a.id]) ? " filled" : ""}`}
                  >
                    {String(n + 1).padStart(2, "0")}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="mm-btn"
              disabled
              title={flags.match ? "The run engine is connected in build step 1" : "Match my marking is switched off"}
            >
              {flags.match ? "Match my marking" : "Mark the class"}
            </button>
            <span className="mm-small mm-muted max-w-[36ch]">
              {sixDone
                ? "Your six marks are in. The marking run is being connected."
                : `Enter ${6 - filled} more of your marks to start.`}
            </span>
          </div>
        </section>

        {/* STEPS rail */}
        <section className="mm-a-steps mm-card" aria-labelledby="steps-h">
          <div className="mm-section-h">
            <h2 id="steps-h" className="text-[26px]">
              How it marks
            </h2>
            <span className="mm-mono mm-small mm-muted">7 STEPS</span>
          </div>
          <ol className="m-0 mt-1 list-none p-0">
            {RAIL.map((s, n) => {
              const done = s.id === "six" && sixDone;
              return (
                <li key={s.id} className={`mm-step${done ? " is-done" : ""}${s.role === "AGENT" ? " is-agent" : ""}`}>
                  <span className="mm-stepnum" aria-label={done ? "done" : "waiting"} title={done ? "done" : "waiting"}>
                    {done ? "✓" : n + 1}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <b className="font-semibold">{s.label}</b>
                      <span className={`mm-badge ${s.role}`}>{s.role}</span>
                    </span>
                    <span className="mm-small mm-muted block">
                      {s.id === "six" ? (done ? <span className="mm-ok">✓ done · 6 of 6 entered</span> : `${filled} of 6 entered · waiting`) : s.note}
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

        {/* ANSWERS */}
        <section className="mm-a-answers" aria-labelledby="ans-h">
          <div className="mm-section-h mb-4">
            <h2 id="ans-h" className="text-[26px]">
              The answers
            </h2>
            <div className="mm-filter" role="group" aria-label="Show answers">
              {(
                [
                  ["all", `All ${sampleClass.answers.length}`],
                  ["six", "Your 6"],
                  ["unseen", "Unseen 10"],
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
              return (
                <li key={a.id} className={`mm-card ${k}`}>
                  {k === "yours" && <span className="mm-stamp yellow">YOU MARK THIS</span>}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="mm-mono mm-small mm-muted">{a.label.toUpperCase()}</span>
                        {k === "unseen" && (
                          <span className="mm-tag" style={{ color: "var(--primary)" }}>
                            UNSEEN · TESTS THE TOOL
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 mb-0 text-[21px] break-words">{a.text}</p>
                    </div>
                    {k === "yours" && (
                      <label className="flex shrink-0 flex-row items-center gap-2 self-end sm:flex-col sm:gap-1">
                        <span className="mm-pen text-[22px] leading-none">your mark</span>
                        <input
                          className="mm-markbox"
                          inputMode="numeric"
                          aria-invalid={bad}
                          aria-label={`Your mark for ${a.label}, out of ${max}`}
                          value={six[a.id]}
                          onChange={(e) => setSix((m) => ({ ...m, [a.id]: e.target.value.replace(/[^0-9]/g, "").slice(0, 1) }))}
                        />
                        <span className={`mm-mono mm-small ${bad ? "mm-bad" : "mm-muted"}`}>{bad ? `✗ max ${max}` : `/ ${max}`}</span>
                      </label>
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
            <h2 className="text-[26px]">Your call</h2>
            <p className="mm-small mt-1.5 mb-3.5">
              <b>Nothing is final until you approve.</b> <span className="mm-muted">No marks yet: run the marking first.</span>
            </p>
            <button type="button" className="mm-btn" disabled>
              Approve marks
            </button>
          </div>
          <Reveal className="mm-card">
            <h2 className="text-[26px]">Proof</h2>
            <p className="mm-small mm-muted mt-1 mb-3">How often two trained examiners agree, on 2,442 real answers:</p>
            <div className="flex items-baseline justify-between">
              <span className="mm-small">same mark</span>
              <span className="mm-num text-[34px]">
                <CountUp value={56.8} decimals={1} suffix="%" />
              </span>
            </div>
            <div className="mm-bar-track mt-1">
              <div className="mm-bar-fill" style={{ width: "56.8%", background: "var(--foreground)" }} />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="mm-small">within one mark</span>
              <span className="mm-num text-[34px]">
                <CountUp value={78} decimals={1} suffix="%" />
              </span>
            </div>
            <div className="mm-bar-track mt-1">
              <div className="mm-bar-fill" style={{ width: "78%", background: "var(--muted-foreground)" }} />
            </div>
            <div className="mt-4 rounded-[10px] border-2 border-dashed border-primary bg-surface-2 p-3">
              <div className="mm-small">
                <b>This tool vs you</b>, on 10 answers it has not seen
              </div>
              <div className="mm-mono mm-small mt-1" style={{ color: "var(--primary)" }}>
                before → after: measured on the first run
              </div>
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
