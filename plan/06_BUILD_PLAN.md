# 06 · BUILD PLAN (the contract Claude Code follows)

> **BUILD PLAN STATUS:** READY
> *(DRAFT or READY. Set READY only after the checklist at the bottom passes and the team replies APPROVED. Both engines read this line: while it's DRAFT, Claude Code only plans; once it's READY, Cowork stops and Claude Code builds.)*
> **Engine:** 🧠 COWORK writes it (prompt **P5**, ≤ 30 min) → 🛠 CLAUDE CODE follows it · **Updated:** 3 Oct 2026, 16:50 (P5 started 16:44 by the laptop clock; the prompt said 3:55) · **Skills:** `hv-mrdu` → `references/architecture-plan.md` (architecture defence, gates, SHRINK ladder) + `hv-build` (Part A) + `hv-agentic` (crew recipe) · ✋ Team approves
> **Job:** the technical decisions plus the step-by-step build contract: an architecture the whole team can explain, a stack with a reason per line, and an hour-by-hour plan with gates, tests and freezes. It loads into every Claude Code session through `CLAUDE.md`, so it holds decisions, not research. Target ≤ 260 lines when filled.
> **Inputs:** 04 (concept, canvas §20, agentic-fit §21, feature decisions §22, scope freeze §23, tests), 05 (screens, tokens in `design/`), 03 §6 (data/API check), 01 §7 (rules incl. prior work), 00 §3 and §5 (team, time).
> **Pre-filled for AI HACK × MRDU (updated 2 Oct):** the rows marked *(default)* below. P5 confirms or changes them; everything else is filled at the event.

---
## OUTPUT *(Cowork fills below)*

**We are late.** G2 was due 14:45; P5 started 16:44. The two jury rounds cannot move, so the gates before round 1 are compressed (§14) and the core is cut from 6 h to **4.5 h** (18:00 → 22:30). What was cut to fit is in §3 "Round-1 cuts".

### 1. Product
One sentence, memory line, hero, top 3, parked extras: see 04 §6, §20, §23. In short: **MarkMatch** marks a class of typed short answers the way this teacher marks. HERO: **Match my marking**. Top 3: Match my marking · every mark quotes the answer, checked by code · class mistake map (after round 1). Never say "calibration".

### 2. Core loop (= demo path)
See 04 §19 (7 steps). For round 1 the sample class is one real question with 26 real answers: 6 are "the teacher's six", 10 are marked as "unseen" in the live run.

### 3. Scope
**MUST (acceptance tests in 04 §19):** M1 quoted marks with hard checks and Break it (M1a–c) · M2 Match my marking (M2a–c) · M3 review and approve (M3) · M4 proof numbers + recorded replay (M4a–b).
**Round-1 cuts (made now, because 4.5 h is not 6 h):**
- Input: the sample class plus **one "add your own answer" box**. Pasting a whole class comes after round 1.
- Match my marking: **at most 2 rounds** (was 3).
- Proof panel: no separate eval harness before round 1. **The hero run itself measures the proof:** it marks the 10 unseen answers with the scheme as typed and again with the tuned scheme, and shows agreement with the teacher's real marks for both, as "X of 10". The 100-answer ablation (04 §21) runs after round 1.
- M1a becomes "10 unseen answers within 90 s" on a free-tier key.
**Checkpoint 21:15:** if Match my marking is not running on the real model, set `NEXT_PUBLIC_MATCH_ENABLED=0`, present the marker alone (concept C1) and say so.
**PARKED extras (each behind a flag):** doubt queue → handwritten photo → strictness dial → batch → voice → story (`NEXT_PUBLIC_STORY`, fallback: redirect to `/app`).
**After round 1 (step 4), each with its test:** class mistake map (given a marked class, it lists the criteria most students missed, and each count equals the code's count from the marks) · objective exact match (given an answer key of one word or number, the mark comes from code and the card's badge says CODE) · paste a whole class (given 30 pasted answers separated by blank lines, 30 cards appear) · the one jury suggestion · the 100-answer ablation.
**CUT (never build):** login, profiles, courses, notifications, analytics dashboard, plagiarism, version history, answer groups, a database.

### 4. Screens and states
| Route | Purpose | States to build | Mobile notes |
|---|---|---|---|
| `/app` | The product and the demo start (05 §3) | sample case loaded · running (named steps with role badges) · check results (incl. thrown-out mark) · approval · proof strip · error with replay · replay badge | columns stack: question → steps → answers → approve → proof |
| `/` | Temporary redirect to `/app` unless `NEXT_PUBLIC_STORY=1` | — | — |

### 5. Design system (full detail in 05)
- Concept: **Examiner's margin, loud**: ruled paper with a red margin line, 2.5 px ink outlines with hard 6 px shadows, marks circled in red-pen handwriting, CHECKED / THROWN OUT stamps, yellow highlighter on the quoted line.
- Tokens: copy `design/tokens.css` + `design/tokens.json` into `web/design/` (never retype a colour) · light theme only.
- Fonts via `next/font/google`: Bricolage Grotesque 700/800 (headings, big numbers) · IBM Plex Sans 400/500/600 (text) · IBM Plex Mono 500/600 (counts, badges) · Caveat 700 (circled marks and one note only).
- Scale 15 / 18 / 21 / 26 / 44 / 54 / 64 · radius 12 (cards, buttons), 6 (badges) · no blur shadows, no gradients.
- Motion: state changes ≤ 250 ms on real events only; nothing loops; reduced motion = instant.
- Signature interaction: the round row that reaches the teacher's marks turns highlighter yellow, with the red-pen note "matches you now!".
- Reference: `pitch/style-preview.html` (its counts are placeholders; never use it as a screenshot).
- Never do: purple gradients, stat-tile dashboard, chat box, ✨ icons, slang in buttons or labels, colour-only status, decoration beyond the four loud devices (05 §12).

### 6. Stack
| Layer | Choice | Why | Doc checked |
|---|---|---|---|
| App | Next.js 16.3.8 (App Router) + TypeScript + Tailwind 4 *(default kept; installed by B0)* | One deployable on Vercel | `web/package.json` |
| Engine | AI SDK `ai` 7.0.x: `generateText` with `Output.object({ schema })` + our own small engine (~200 lines, one file) *(default kept)* | Typed outputs; we can explain every line | ai-sdk.dev, 3 Oct [03 R14] |
| **Primary model** | **Google Gemini on the free tier**, id from env `MODEL_PRIMARY`, first choice `gemini-3.8-flash`, step down to `gemini-3.5-flash` then `gemini-3.5-flash-lite` if the key's free tier does not serve it | **Team decision: keep the budget at zero** | ai.google.dev/gemini-api/docs/models, 3 Oct [F]. Which ids the free tier serves and their limits are shown only in AI Studio: **[U], the SPIKE never ran** |
| **Fallback model** | **Groq free plan**, `openai/gpt-oss-120b`, through `@ai-sdk/openai` with Groq's OpenAI-compatible base URL (no new package) | Another provider, also free | console.groq.com/docs/models and /rate-limits, 3 Oct [F]: 30 requests/min, 1,000 requests/day, 8,000 tokens/min. Structured-output support: [U] → the fallback path asks for JSON and validates with Zod |
| Hosting | Vercel Hobby, region bom1, `maxDuration` 120 on the run route | Free; live already (B0) | — |
| Story landing (PARKED) | three, R3F, drei, gsap, lenis: already installed by B0 | After round 1 only; no owner yet [U] | — |
**Four stack questions:** stored data across sessions? **No** → no database · file or image input? **No** for the hero path (typed text; handwriting is parked) · a Python-only library? **No** (the dataset sample is already JSON: `plan/data/mohler_sample.json`, 5 real questions, 141 answers, two human marks each) · real-time? **Only a stream of step events** → a streaming route, no sockets. Nothing changes except the models.
**Free-tier consequences (they shape the engine):** answers are marked **5 per model call**; at most **2 calls at a time**; a 429 or a 25 s timeout switches that call to the fallback once; a hero run is ~9 calls. A live run can still be refused at 00:00, so **the recorded replay is part of the plan, not an emergency**. This overrides the event default "paid primary; the demo never depends on a free tier" (CLAUDE.md §9), by team choice.
**Prior-work rule → starters:** REBUILD from the recipes; nothing copied. README line: "Built during AI HACK × MRDU 2K26 from an empty Next.js scaffold; planning documents were written before the start; student answers are from the Mohler ASAG dataset (CC-BY-4.0)."

### 7. Architecture
```
Browser /app ──POST /api/run (JSON)──► run engine (one file, plain async code)
  [HUMAN] six marks                     1 [CODE]  validate input, pick six + unseen
  ◄── NDJSON events, one per line ──    2 [MODEL] mark the six (1 call)         ─┐
  steps rail · round cards ·            3 [CODE]  count matches with the teacher  │ [AGENT, provisional]
  answer cards · proof strip            4 [MODEL] rewrite scheme notes            │ ≤ 2 rounds, kept only
  [HUMAN] approve scheme, edit,         5 [CODE]  note rules; keep if matches rise┘ if matches rise
          approve marks (client state)  6 [MODEL] mark unseen: before + after (5 per call, 2 at a time)
  [Play recorded run] ──► public/replays/*.ndjson (same events, same UI)
                                        7 [CODE]  hard checks: quote in answer · marks add up → re-ask once
                                        8 [CODE]  agreement with the teacher's real marks, totals, cost
```
**Data model (no database):** `Criterion {id, text, points}` · `Answer {id, text}` · `TeacherMark {answerId, mark}` · `CriterionMark {criterionId, awarded, quote}` · `AnswerMark {answerId, criteria[], total, checks{quoteFound, sumsOk}, attempt}`. State lives in the request and in the browser tab. Approved marks stay in the tab (said on screen).
**Route:** `POST /api/run` body `{question, maxMarks, scheme: Criterion[], answers: Answer[], teacherMarks: TeacherMark[], heldOutMarks?: TeacherMark[], breakIt: boolean, matchEnabled: boolean}` → `application/x-ndjson`.
**Event types (`web/lib/types.ts`, Zod first, before any UI):** `step {id, role: CODE|MODEL|AGENT|HUMAN, label, status: running|done|failed}` · `round {n, matches, of, notes[], kept}` · `mark {phase: six|before|after, mark: AnswerMark}` · `rejected {answerId, quote, reason, attempt}` · `agreement {phase, exact, withinOne, n}` · `usage {calls, inputTokens, outputTokens, seconds, model, usedFallback}` · `error {message, canReplay}` · `done`.
**Model output schemas:** `MarkBatch {marks: [{answerId, criteria: [{criterionId, awarded: int, quote: string}]}]}` · `SchemeNotes {notes: string[] (≤ 6, each ≤ 200 chars), reason: string}`.
**Env var names:** `GOOGLE_GENERATIVE_AI_API_KEY` · `GROQ_API_KEY` · `MODEL_PRIMARY` · `MODEL_FALLBACK` · `CREW_MOCK` (local only, never on Vercel) · **Flags:** `NEXT_PUBLIC_MATCH_ENABLED` · `NEXT_PUBLIC_EVAL_PANEL` · `NEXT_PUBLIC_STORY`.

### 8. AI block
Job only AI can do: read a free-text answer against a marking scheme and say which criteria it meets, quoting the line; rewrite scheme notes from the teacher's disagreements.
| Step | Role | Model | Fallback | Checked by |
|---|---|---|---|---|
| Mark a batch of ≤ 5 answers | MODEL CALL | `MODEL_PRIMARY` (Gemini, free) | `MODEL_FALLBACK` (Groq) once, on 429 / timeout / invalid output | Zod schema, then the hard checks |
| Rewrite scheme notes | part of the AGENT loop | same | same | Note rules in code; kept only if matches rise |
| Draft criteria from a reference answer | MODEL CALL (after round 1; the sample class ships with a typed scheme) | same | same | Teacher edits |
**Hard checks (CODE, the model cannot override them):** 1. every awarded > 0 has a quote that is an exact substring of the answer after normalising case, spaces and punctuation · 2. each awarded is an integer in 0…points; total = min(maxMarks, sum) · 3. no scheme note shares 6 or more consecutive words with any of the six answers · 4. a round is kept only if exact matches rise (tie: smaller total gap). A failed check 1 or 2 → that answer is re-asked once with the failure named → still failing → sent to the teacher unmarked.
**Break it:** swaps one returned quote for a line that is not in the answer, so check 1 fires in front of the judge. Labelled "Break it: plant a false quote".
**How judges see it:** role badges on every step; round cards; the highlighted quote; the THROWN OUT card; "before X of 10 → after Y of 10" against the teacher's real marks.
**Eval:** round 1 = the in-run agreement on 10 unseen answers (real, small, said as "X of 10, one question"). After round 1 = `npm run eval` on `plan/data/eval_cases.csv` (5 questions, ~100 unseen answers): scheme as typed vs one rewrite vs the loop; plus the same answers marked twice (identical marks out of N). Results to `web/public/eval-results.json` with the date and the misses. **If the loop does not beat one rewrite, the badge changes from AGENT to MODEL and we say so.**
**Responsible AI:** privacy: only a public dataset is sent; a free-tier provider may use what it receives to improve its models [A: not checked today], so no real student names or scripts go in · bias: language models lean lenient [F 03 R9]; shown by the before/after numbers · oversight: the teacher approves the scheme and every mark · unsure: a mark it cannot evidence is thrown out and handed to her.
**Demo safety:** every model call: 25 s timeout, one fallback, then an `error` event with `canReplay` · `public/replays/` holds 3 recorded real runs as NDJSON, played with real pacing and a "Recorded real run · date" badge · `CREW_MOCK=1` is for building only · reset = reload the page.

### 9. Build steps *(one Claude Code session each; the live URL is updated after every step)*
| # | Goal | Done when (verifiable, on the live URL) | Est. | Owner | Gate |
|---|---|---|---|---|---|
| 0 | Skeleton: tokens from `design/`, the four fonts, the `/app` shell in the loud style with the sample class from `plan/data/mohler_sample.json` (question E07.Q07) on screen; `/` redirects to `/app` | `/app` shows the question and 26 real answers in our design; build + lint pass; pushed | 0.75 h | A | G3 18:00 |
| 1 | **Key test first (10 min):** one structured call to the primary and one to the fallback. Then the hero path on the mock model: `types.ts`, the engine, `/api/run`, the steps rail, round cards, answer cards with the quote highlighted, Break it. Then one real run | Both keys answer (or the model id is stepped down); the run streams step by step; Break it shows a thrown-out mark; one real run completes; `plan/EXPLAIN.md` v1 | 2.25 h | A | G4 20:15 |
| 2 | **MVP, the real mechanism:** real run live → hard checks → Match my marking on the real model (checkpoint 21:15) → approve scheme, edit and approve marks → before/after agreement on 10 unseen → fallback model → 3 recorded replays | Checks pass 5 good and reject 5 bad samples (script); fallback takes over in a local test; **3 clean hero runs**; replays play offline; tag `ok-mvp` | 2.25 h | A | **G5 22:30** |
| 3 | PARKED: story landing on branch `story`, second clone | Proven locally; merged never before round 1 | background | [U] | — |
| 4 | Mistake map · objective exact match · paste a whole class · the one jury suggestion · `npm run eval` (100 answers, ablation, repeat-run count) | Each passes its test; 3 clean hero runs after each; eval table on the panel with misses | 1.75 h | A | G7 03:30 |
| 5 | Polish + judge panel; README draft | ui-critic: no P0/P1 | 1.5 h | A | G8 05:00 |
| 6 | Demo hardening + capture | Scripted path 3× clean and timed; replay works offline; screenshots in `pitch/screens/`; backup video 2 | 1 h | A | G9 07:00 |

### 10. Checkpoints
See §14.

### 11. Decision rights during the build
Claude decides (small, reversible): file layout, component split, copy tweaks inside 05 §5, batch size, the mock's canned outputs, stepping `MODEL_PRIMARY` down to a smaller free id. Ask the team: scope changes, anything paid, a database, a new package, anything PARKED or CUT, switching Match my marking off.

### 12. Risky unknowns to prove first
| Question | Passes if | Fallback |
|---|---|---|
| Do we have working free keys, and which Gemini id does the free tier serve? | A structured call returns valid JSON from both providers in the first 10 minutes of step 1 | Step the id down; if Gemini fails entirely, Groq becomes primary and the replay carries the demo |
| Do free-tier limits allow a ~9-call hero run and three recordings? | One full real run without a 429 | Batch 6 per call, 1 call at a time, 5 s spacing; record replays early (21:30) |
| Does Groq return schema-valid JSON for `MarkBatch`? | 3 of 3 test calls parse | JSON mode + Zod parse + one repair re-ask |
| Does tuning raise agreement on unseen answers at all? | after ≥ before on the 10 unseen, for at least 2 of 3 runs | Present it honestly as "no gain on this question"; flag off → C1 |
| Does the model quote exactly? | ≥ 9 of 10 quotes pass check 1 on the first attempt | The prompt says "copy the words exactly"; re-ask once; else to the teacher |

### 13. Architecture defence
**Components**
| Component | Responsibility | Input → output | State it holds | How it fails | What happens then | What breaks without it |
|---|---|---|---|---|---|---|
| `/app` page (client) | Shows the class, takes six marks, renders events, approval | user input + NDJSON → screen | The run's events; edited marks | A malformed event line | The line is skipped; the error card offers the replay | There is no product |
| `/api/run` route | Starts a run and streams its events | request JSON → NDJSON | None | Timeout at 120 s | `error` event with `canReplay` | The browser would hold the keys |
| Run engine (one file) | Orders the steps; batching; retries; the two-round loop | inputs → events | Per-run variables only | A step throws | Caught; `step failed` + `error` | Nothing sequences the steps |
| Model client | One function: call primary, on 429 / timeout / bad output call the fallback once | prompt + schema → typed object | None | Both providers fail | `error` with `canReplay` | Every call would repeat this logic |
| Hard checks (pure functions) | Quote in answer; marks add up; note rules; keep-if-better | marks, answers → pass / reason | None | They cannot call anything, so only a bug | Covered by the 5-good / 5-bad script | **Our proof: without them it is "trust the model"** |
| Recorded replays (3 files) | Play a real run when the model is unreachable | file → same events | The recordings | A file is missing | Two others | The demo depends on a free tier at midnight |
| Sample class JSON | Real answers with real human marks | file → first screen | 141 answers | — | — | An empty first screen and no ground truth |
**Data flow of the hero case:** 1. The page loads the sample class; the teacher's six marks are in the boxes · 2. Match my marking → `POST /api/run` · 3. CODE validates and splits six / unseen · 4. MODEL marks the six · 5. CODE counts matches with her marks · 6. MODEL rewrites the scheme notes; CODE checks the notes; MODEL re-marks; CODE keeps the round only if matches rise (≤ 2 rounds) · 7. HUMAN approves the scheme · 8. MODEL marks the 10 unseen with the scheme as typed and with the tuned scheme · 9. CODE runs the hard checks, re-asks once, throws out what still fails · 10. CODE compares both sets with the teacher's real marks → "before X of 10, after Y of 10" · 11. HUMAN edits and approves.
**Agent and tool interactions**
| Step | Role | Reads | Tools it may call | Output schema | Checked by | Max attempts |
|---|---|---|---|---|---|---|
| Mark a batch | MODEL CALL | question, scheme, notes, ≤ 5 answers | none | `MarkBatch` | Zod + hard checks 1–2 | 2 per answer |
| Match my marking | AGENT (provisional) | its marks on the six, her marks, its quotes | none: it proposes notes; **code** re-marks and scores (no free tool choice, said plainly) | `SchemeNotes` | Hard checks 3–4 (code) | 2 rounds |
| Split, count, sort, totals, agreement | CODE | — | — | — | Unit script | — |
| Approve scheme; edit and approve marks | HUMAN | — | — | — | — | — |
**State and integrations**
| Service or store | Purpose | Env var NAME | Limit | Timeout | Fallback |
|---|---|---|---|---|---|
| Google Gemini API (free tier) | Primary model | `GOOGLE_GENERATIVE_AI_API_KEY`, `MODEL_PRIMARY` | [U]: read it in AI Studio during the key test | 25 s | Groq |
| Groq API (free plan) | Fallback model | `GROQ_API_KEY`, `MODEL_FALLBACK` | 30 req/min · 1,000 req/day · 8,000 tokens/min [F] | 25 s | Recorded replay |
| Browser tab | Edited and approved marks | — | Lost on reload (said on screen) | — | — |
| `web/public/replays/*.ndjson` | Recorded real runs | — | 3 files | — | — |
**Tech choices**
| Choice | Why this | Why not the simpler option | Why not the bigger option | One-line answer for a judge |
|---|---|---|---|---|
| Our own engine in one file | About 200 lines we can read aloud | A single prompt can't check itself or retry a failed quote | LangGraph or CrewAI hide the steps the jury asks about | "It is a loop, four checks and a retry; we wrote every line" |
| No database | The hero path stores nothing between sessions | — | A database adds a failure point and a login question | "Nothing is stored; marks stay in the teacher's tab" |
| Checks in code, not a second model | A substring test is exact and free | Trusting the model's own "I'm sure" | A verifier model can be wrong too, and costs calls on a free tier | "The model cannot overrule the check" |
| 5 answers per call | Fits free-tier request limits | One call per answer hits the limit at ~15 answers | One giant call fails all at once and exceeds token limits | "Batches of five: fewer calls, small blast radius" |
| Free Gemini + free Groq | Zero budget | One provider only = one point of failure | A paid key was not available to us | "Two free providers and a recorded run as the third line" |
| NDJSON stream | One line per real event; trivial to record and replay | A single JSON reply shows nothing until the end | WebSockets need a server we don't have | "The replay is literally the same lines read from a file" |
**Complexity budget:** one app ☑ · no login ☑ · no database ☑ · 0 external services besides the two model providers ☑ · 1 agent, provisional (≤ 4) ☑ · no queue or microservices ☑ · every box answers "what breaks without it?" ☑ · money spent: ₹0 · exceptions: the demo depends on free tiers (team choice), covered by the replay.
**60-second explanation card:** "A lecturer gives the question, her marking scheme, the typed answers, and her own marks on six of them. The tool marks those six and counts how many match her. It rewrites its scheme notes and tries again, at most twice, and a round is kept only if the match count goes up. Then it marks the rest, five answers per model call, and for every mark it must quote the line that earned it. Fixed rules check that the quote is really in the answer and that the marks add up. If a check fails, it asks once more, and if that fails the answer goes to her unmarked. A human approves the scheme and every mark. On ten answers it had not seen we show how often it matched her before and after." *(The number is filled from the real run, never before.)*

### 14. Gates, tests and freezes *(source of truth: `plan/data/gates.csv`; times before round 1 moved on 3 Oct 16:50 because we are late; the rounds are fixed)*
| Gate | Time | Must be true | Test that proves it | Recovery if missed |
|---|---|---|---|---|
| H0 · G1 | done | — | — | — |
| G2 Plan READY (freeze 1 done) | **17:15** (was 14:45) | This file READY | Ready checklist | — |
| G3 Skeleton live | **18:00** (was 15:45) | `/app` with the sample class on the live URL | build + lint + screenshots | Skip styling; go to step 1 |
| G4 Hero path on the mock | **20:15** (was 18:45) | Streams; Break it; keys tested; one real run | Step 1 test gate | SHRINK 3–4 |
| Checkpoint | 21:15 | Match my marking runs on the real model | One real round | Flag off → present C1 |
| **G5 MVP** | **22:30** (was 21:45) | 3 clean hero runs; replays recorded; tag `ok-mvp` | Step 2 test gate | SHRINK 3–5; replay first |
| Break session + AUDIT | 22:30–23:10 | 5 unprepared inputs by an outsider; audit verdict | 09 §9 | Hide what failed |
| **G6 Round-1 freeze** (freeze 2) | **23:15** (was 23:00) | Tag `ok-r1` · backup video 1 · round-1 kit; rehearsals 23:15–23:45 | 09 §9 | Replay; say what is live |
| R1 Jury round 1 | 4 Oct 00:00 (fixed) | Pitched; feedback logged | — | Pitch what is DONE-TESTED |
| G7 Top 3 complete | 03:30 | Step 4 done; jury suggestion built | Step 4 test gate | Drop the mistake map last; drop the eval never |
| **G8 Code freeze** (freeze 3) | 05:00 | Fixes only | — | Hide what isn't DONE-TESTED |
| G9 Submittable | 07:00 | Every item ready; AUDIT GO | 09 §5, §9 | Submit what works |
| R2 Final round | 08:30 (fixed) | In place 10 min early | — | Replay if the live run fails |
**Evidence pack from laptop B:** was 18:30, now **20:30** (it starts PITCH-1 at "PLAN PUSHED") · **Explain-it drills:** 20:15, 22:45, 07:45 · **Backup rule:** tag `ok-<HHMM>` and note the last-good deployment before anything new · **SHRINK ladder:** 04 §23.

---
### Ready checklist (run 3 Oct 16:50)
- [x] Every MUST has an acceptance test (04 §19), and together they cover the core loop
- [x] The HERO and each of the TOP 3 has a test; the story has a flag and a fallback; the other parked extras get a flag when started; shown features ≤ 6
- [x] §13 filled: every component answers "what breaks without it?"; the complexity budget passes; the explanation card is written
- [x] §14 matches `plan/data/gates.csv` (pre-round-1 times moved because we are late) and `clock.py` says ON TRACK against the new times
- [x] The one agent step is marked provisional with its ablation; hard checks are CODE
- [x] No tripwire trips: MUST 4 · shown ≤ 6 · agents 1 · loop 7 steps · the AI does a job code cannot · the loop has a written downgrade · the difference passes the ten-team test [I] · no box without a reason · the 60-second card exists; "calibration" is never said
- [x] Tokens complete in `design/` (report ALL PASS, all text ≥ 7:1)
- [x] Style preview approved (05, v2); no motion preview (the story is parked)
- [x] Contracts exist for the one core-loop route and its events
- [ ] **Every key or service is obtained or has a mock: PASSES ONLY THROUGH THE MOCK.** `web/.env.local` holds no model key yet. Get a free Gemini key (AI Studio) and a free Groq key and type them into `web/.env.local` **before step 1's key test**. Font licences are from memory: add the lines to `assets/LICENSES.md` in step 0 after checking the font pages
- [x] Every build step has a verifiable "done when"
- [x] Checkpoints fit the deadline, with no slack: 4.5 core hours for a 5-hour estimate; the 21:15 checkpoint is the release valve
- [x] Team replied **APPROVED** (3 Oct) → `BUILD PLAN STATUS:` is **READY**

---
## 🛑 WHEN THIS FILE IS READY: COWORK STOPS HERE → MOVE TO CLAUDE CODE
Planning is finished. Cowork must not write app code. Do this now:
1. In the Claude desktop app, click the **Code** tab (top middle).
2. Choose **Local** → **Select folder** → pick this same hackathon folder.
3. Set the mode next to the send button to **Auto** (or **Accept edits**).
4. Paste prompt **B1** from `3_PROMPTS.md` and press Enter. Approve the `playwright` tool if asked.
