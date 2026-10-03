"use client";

import { useState } from "react";
import { SIX_IDS, SOURCE_LINE, sampleClass } from "@/lib/demo/sample";
import { defaultFlags } from "@/lib/flags";
import type { Role } from "@/lib/types";

type RailStep = { id: string; role: Role; label: string };

// The named steps of the hero run (06 §7). Status comes from real events from step 1 on.
const RAIL: RailStep[] = [
  { id: "split", role: "CODE", label: "Split the class: your six + 10 unseen" },
  { id: "six", role: "HUMAN", label: "You mark six answers" },
  { id: "match", role: "AGENT", label: "Match my marking (at most 2 rounds)" },
  { id: "approve-scheme", role: "HUMAN", label: "You approve the scheme" },
  { id: "mark", role: "MODEL", label: "Mark the unseen answers" },
  { id: "checks", role: "CODE", label: "Checks: quote found · marks add up" },
  { id: "approve", role: "HUMAN", label: "You approve the class" },
];

export function MarkApp() {
  const [six, setSix] = useState<Record<string, string>>(() =>
    Object.fromEntries(SIX_IDS.map((id) => [id, String(sampleClass.answers.find((a) => a.id === id)!.grader1)])),
  );
  const flags = defaultFlags;
  const sixFilled = SIX_IDS.every((id) => six[id] !== "" && Number(six[id]) >= 0 && Number(six[id]) <= sampleClass.maxMarks);

  return (
    <main className="mm-wrap">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mm-mono mm-small mm-muted">MARKMATCH · SAMPLE CLASS · {sampleClass.answers.length} ANSWERS</div>
          <h1 className="text-[44px] leading-none sm:text-[64px]">
            It marks the way <span className="mm-hl">you</span> mark.
          </h1>
        </div>
        <span className="mm-sticker">receipts for every mark ✓</span>
      </header>

      <div className="mm-grid">
        {/* STEPS rail */}
        <section className="mm-steps mm-card" aria-labelledby="steps-h">
          <h2 id="steps-h" className="text-[26px]">Steps</h2>
          <ol className="m-0 list-none p-0">
            {RAIL.map((s) => (
              <li key={s.id} className="mm-step">
                <span className={`mm-badge${s.role === "AGENT" ? " agent" : ""}`}>{s.role}</span>
                <span className="flex-1">
                  {s.label}
                  <span className="mm-muted mm-small block">
                    {s.id === "six" ? (sixFilled ? "✓ six marks entered" : "waiting for your six marks") : "waiting"}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* QUESTION + ANSWERS */}
        <section className="mm-main flex flex-col gap-6" aria-labelledby="q-h">
          <div className="mm-card blue">
            <div className="mm-mono mm-small mm-muted">QUESTION {sampleClass.id} · {sampleClass.maxMarks} MARKS</div>
            <h2 id="q-h" className="my-1 text-[26px] leading-tight sm:text-[30px]">{sampleClass.question}</h2>
            <div className="mm-small mm-muted">
              Your scheme: {sampleClass.scheme.map((c) => `${c.text.toLowerCase()} (${c.points})`).join(" · ")}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="mm-btn"
                disabled
                title={flags.match ? "The run engine is connected in build step 1" : "Match my marking is switched off"}
              >
                {flags.match ? "Match my marking" : "Mark the class"}
              </button>
              <span className="mm-small mm-muted">Your six marks are filled in from the sample teacher. Change any of them.</span>
            </div>
          </div>

          <ul className="m-0 flex list-none flex-col gap-6 p-0">
            {sampleClass.answers.map((a) => {
              const isSix = SIX_IDS.includes(a.id);
              return (
                <li key={a.id} className="mm-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mm-mono mm-small mm-muted">
                        {a.label.toUpperCase()}
                        {isSix ? " · YOU MARK THIS ONE" : ""}
                      </div>
                      <p className="mt-1.5 mb-0 text-[21px] break-words">{a.text}</p>
                    </div>
                    {isSix && (
                      <label className="flex shrink-0 flex-col items-center gap-1">
                        <span className="mm-pen text-[22px] leading-none">your mark</span>
                        <input
                          className="mm-markbox"
                          inputMode="numeric"
                          aria-label={`Your mark for ${a.label}, out of ${sampleClass.maxMarks}`}
                          value={six[a.id]}
                          onChange={(e) => setSix((m) => ({ ...m, [a.id]: e.target.value.replace(/[^0-9]/g, "").slice(0, 1) }))}
                        />
                        <span className="mm-mono mm-small mm-muted">/ {sampleClass.maxMarks}</span>
                      </label>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* APPROVE + PROOF */}
        <aside className="mm-side flex flex-col gap-6">
          <div className="mm-card">
            <h2 className="text-[26px]">Your call</h2>
            <p className="mm-small mm-muted mt-1.5 mb-3.5">Nothing is final until you approve. No marks yet.</p>
            <button type="button" className="mm-btn" disabled>
              Approve marks
            </button>
          </div>
          <div className="mm-card">
            <h2 className="text-[26px]">Proof</h2>
            <div className="mm-num mt-2">56.8%</div>
            <div className="mm-small">two human graders give the same mark</div>
            <div className="mm-num mt-3">78.0%</div>
            <div className="mm-small">…within one mark of each other</div>
            <div className="mm-small mm-muted mt-1.5">2,442 real answers, Mohler dataset · measured 3 Oct 2026</div>
            <div className="mt-3 border-t-2 border-dotted border-border-strong pt-2 mm-small">
              This tool vs you, on 10 answers it has not seen: <span className="mm-mono mm-muted">after the first run</span>
            </div>
          </div>
        </aside>
      </div>

      <footer className="mm-small mm-muted mt-10">
        {SOURCE_LINE}. Typed short answers today. Marks stay in this tab; nothing is stored.
      </footer>
    </main>
  );
}
