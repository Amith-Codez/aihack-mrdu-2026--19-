"use client";

import { useState } from "react";
import { sampleClass } from "@/lib/demo/sample";
import { CountUp, PenCircle } from "./pen";

// The problem, shown not told: real answers from this class that two trained examiners marked differently.
const cases = sampleClass.answers
  .filter((a) => a.grader1 !== a.grader2)
  .map((a) => ({ ...a, gap: Math.abs(a.grader1 - a.grader2) }))
  .sort((a, b) => b.gap - a.gap);

export function Hero() {
  const [i, setI] = useState(0);
  const c = cases[i];
  const max = sampleClass.maxMarks;

  return (
    <>
      <section className="mm-hero" aria-labelledby="hero-h">
        <div>
          <div className="mm-kicker mm-muted">
            <i aria-hidden="true" />
            A REAL ANSWER · TWO TRAINED EXAMINERS
          </div>
          <h1 id="hero-h">
            Same answer.
            <br />
            Two examiners.
            <br />
            <span className="mm-hl" key={c.id}>
              {c.gap} {c.gap === 1 ? "mark" : "marks"} apart.
            </span>
          </h1>
          <p className="mm-lede">
            Whose mark is right? For your students, <b>yours</b>. MarkMatch learns your marking from six answers, marks
            the rest the way you would, and shows the line behind every mark.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a className="mm-btn" href="#workspace">
              Try it on a real class <span aria-hidden="true">↓</span>
            </a>
            <span className="mm-pen text-[26px] leading-none" style={{ transform: "rotate(-3deg)" }}>
              you stay the examiner
            </span>
          </div>
        </div>

        <figure className="mm-exhibit-wrap m-0" aria-label="One student answer and the two marks it received">
          <div className="mm-exhibit">
            <span className="mm-stamp yellow">SAME ANSWER?</span>
            <div className="mm-mono mm-small mm-muted">
              {c.label.toUpperCase()} · OUT OF {max}
            </div>
            <div className="mm-small mm-muted mt-1">Q: {sampleClass.question}</div>
            <p className="mm-answer">“{c.text}”</p>
            <div className="mm-split">
              {[c.grader1, c.grader2].map((m, k) => (
                <div key={`${c.id}-${k}`} className="mm-examiner">
                  <div className="mm-mono mm-small mm-muted">EXAMINER {k + 1}</div>
                  <PenCircle delay={700 + k * 350}>
                    <span className="mm-bigmark">
                      {m}/{max}
                    </span>
                  </PenCircle>
                </div>
              ))}
            </div>
            <div className="mm-tabs" role="group" aria-label="Other answers the examiners disagreed on">
              {cases.map((x, k) => (
                <button key={x.id} type="button" className="mm-tab" aria-pressed={k === i} onClick={() => setI(k)}>
                  {x.label} · {x.gap} apart
                </button>
              ))}
            </div>
          </div>
          <figcaption className="mm-small mm-muted mt-7">
            Real answers and marks from this class · Mohler dataset (2011), CC-BY-4.0
          </figcaption>
        </figure>
      </section>

      <div className="mm-ribbon" role="list">
        <div className="r1" role="listitem">
          <span className="mm-num">
            <CountUp value={43.2} decimals={1} suffix="%" />
          </span>
          <span className="mm-small">
            of 2,442 real answers got <b>different marks</b> from two trained examiners
          </span>
        </div>
        <div className="r2" role="listitem">
          <span className="mm-num">
            <CountUp value={sampleClass.answers.length} />
          </span>
          <span className="mm-small">
            real answers to one question, <b>each needing a mark</b> and a reason
          </span>
        </div>
        <div className="r3" role="listitem">
          <span className="mm-num">
            <CountUp value={6} />
          </span>
          <span className="mm-small">
            marks from you. It <b>learns your marking</b> from those, and you approve every mark
          </span>
        </div>
      </div>
    </>
  );
}
