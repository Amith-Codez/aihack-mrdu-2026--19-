# EXPLAIN · how MarkMatch works (v1, after build step 1 · 3 Oct 19:50)

**60 seconds:** A lecturer gives the question, her marking scheme, the typed answers, and her own marks on six of them. The tool marks those six and counts how many match her. It rewrites its scheme notes and tries again, at most twice, and a round is kept only if the match count goes up. She approves the notes. Then it marks the rest, five answers per model call, and every mark must quote the line that earned it. Fixed rules in code check that the quote is really in the answer and that the marks add up. If a check fails, it asks once more; if that fails, the answer goes to her unmarked. On ten answers it had not seen, we show how often it matched her real marks.

## What happens when you press "Match my marking" (file by file)
1. `web/components/mark-app.tsx` (the page) sends her six marks, the 6 + 10 answers and the scheme to `POST /api/run` with `stage: "tune"`.
2. `web/app/api/run/route.ts` checks the request against the contract in `web/lib/types.ts` (Zod) and streams back one JSON line per event (NDJSON).
3. `web/lib/engine.ts` runs the steps:
   - **CODE** split: her six vs the 10 unseen (their real marks are held back).
   - **MODEL CALL** mark her six (one call, via `web/lib/models.ts`).
   - **CODE** hard checks 1–2 on every mark (`web/lib/checks.ts`), then count matches with her → "round 0".
   - **AGENT** Match my marking, ≤ 2 rounds: a MODEL CALL writes new notes → **CODE** drops any note that copies 6+ words of an answer or gives more points than a criterion is worth → MODEL re-marks the six → **CODE** keeps the round only if matches rise (tie: smaller total gap).
4. **HUMAN** she reads the kept notes, edits or deletes them, presses Approve → the page sends `stage: "mark"` with the approved notes.
5. **MODEL CALL** marks the 10 unseen, 5 per call, 2 calls at a time: once with the scheme as typed ("before"), once with the notes ("after", only if there are notes).
6. **CODE** hard checks again; a failed answer is re-asked once with the failure named; still failing → "thrown out, to you".
7. **CODE** compares with her real marks → "before X of 10 → after Y of 10"; usage (seconds, calls, tokens, model, fallback).
8. **HUMAN** she edits any mark (shown "EDITED BY YOU") and presses Approve marks. Marks stay in the tab; nothing is stored.

**Break it** (ticked by default): the engine swaps one quote the model returned for "the student draws a labelled diagram of every node", which is in no answer. Check 1 throws it out on screen, the answer is re-asked, and try 2 passes.
**Models:** Gemini 3.5 Flash-Lite (free) first; on a 429, a 25 s timeout or bad JSON, the same call goes to Groq `gpt-oss-120b` (free) once (`models.ts`). Keys live only on the server.
**Mock:** `CREW_MOCK=1` (local only) swaps the model for canned answers in `web/lib/mock.ts`.

## Five likely questions
1. *Why is it "agentic" and not one prompt?* — Only one step is an agent: it looks at where it disagrees with her, writes new notes, re-marks, and code decides whether to keep the round. Everything else is fixed code or a single model call, and the badges say which.
2. *What stops the model from making up evidence?* — Check 1: every awarded mark needs a quote that is literally in the student's answer (after ignoring case and punctuation). The model cannot overrule it; Break it shows it firing.
3. *What if the model is down or rate-limited?* — Each call has a 25 s timeout and falls back to a second provider once; we saw Groq take over on the live site at 19:46 when Gemini's free quota ran out. A recorded real run is the third line (step 2).
4. *Does tuning actually help?* — Measured live, not claimed: on 3 Oct 19:45 the real model matched her on 4 of 6 before and after tuning, and on the unseen 10 it scored 9 of 10 with the scheme as typed. If tuning does not beat the typed scheme by the 21:15 checkpoint, we switch it off and say so.
5. *Why your own engine and not LangChain/CrewAI?* — It is about 250 lines: a loop, four checks and a retry. We can read every line aloud; a framework would hide exactly the steps judges ask about.
