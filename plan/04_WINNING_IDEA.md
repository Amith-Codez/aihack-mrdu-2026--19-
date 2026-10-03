# 04 · WINNING IDEA + WOW STACK + SCOPE

> **Engine:** 🧠 COWORK · **Status:** DONE · concept C2 picked and scope freeze 1 APPROVED, 3 Oct 2026 · **Updated:** 3 Oct 2026 · **Skills:** `hv-mrdu` → `references/solution.md` (order of work, limits, canvas, agentic fit, decision records, freeze) + `hv-winning-idea` (pool, tournament, forge) + `hv-agentic` (crew pattern) · Prompt **P3** (≤ 55 min at the event) · ✋ Team picks the concept, then ✋ approves the scope
> **Job:** Part A picks ONE solution concept for the chosen problem by tournament. Part B draws the one-page canvas, decides what is agentic and what is not, records why every feature is in or out, and freezes the scope at one hero feature, a top 3 and at most 6 shown features.
> **Inputs:** 03 (validation, existing solutions, gap, difference), 01 §2 (working rubric), 00 §3 and §5 (team, time).
> **Done when:** 6 concepts from the team's own ideas + ≥ 3 prompting strategies · tournament ranked with `tournament.py` · top 2 stress-tested · concept chosen ✋ · canvas (§20) · agentic-fit table (§21) · forge run with `forge.py` · decision record for every candidate feature, kept and excluded (§22) · scope freeze 1 (§23) · acceptance tests written · 00 §7 filled · the team replied **APPROVED** twice.
> **Event overrides:** fill §1–8, §13–15, §19 and §20–23; skip §9–12 and §16–18 unless a minute is left · limits here are **6 concepts** (not ≥ 12) and **≤ 15 features** (not 30–60) · the demo spine is the 3-minute order in 08 §10 · the "WOW stack" below is read as: **L2 = the HERO feature**, **L4 = proof** (eval + the planned sad path), **L3 = the judge's own typed input**; L1/L6 (story landing), voice and batch are **PARKED extras** built only after the hero path is live, tagged and recorded.

---
## OUTPUT *(Cowork fills below)*

## PART A · THE IDEA

### 1. Solo seeds
None were given: the P3 prompt arrived without the team's own ideas, and no gut picks were given in P1. **Any teammate can still add a concept at the ✋ below; it gets six head-to-heads against the top two before the pick stands.** Until then this pool is AI-only, which the evidence says makes ideas converge [F: hv-winning-idea → idea-tournament.md §1].

### 2. Concept pool *(event limit: 6 · four prompting strategies · all on the problem in 02 §4, grounded in 03)*
| ID | One-liner | Strategy | Mechanism archetype | Possible WOW | Buildable in our hours? |
|---|---|---|---|---|---|
| C1 | **Doubt-first marker:** locked scheme, a code-checked quote for every mark, two passes, disagreements first, teacher approves | Step by step (the worst moment: "which marks can I trust?") | Checked pipeline + sorted review queue | A mark is rejected on screen because its quote is not in the answer | Yes: this is the plan in 03 §12 |
| C2 | **Calibrate-then-mark:** teacher marks 6 answers, the tool tunes the marking scheme until it matches her, then marks the rest | Inversion (what made the chatbot worse: it chose its own strictness [M, 03 §11 V3]) | Human sets the standard; a loop closes the gap to her, with a number | "Matches your marks on 3 of 6 → 6 of 6", then a held-out score | Yes, with one risky part: the loop may show no gain |
| C3 | **Second marker:** teacher marks as usual; the tool only flags marks it disagrees with | Cross-domain analogy (exam-board moderation) | AI audits the human | Catches the teacher's own slip | Yes, but it saves no time: misses "reduce the time spent" (V6) |
| C4 | **Mistake map first:** what the class got wrong, with quotes and counts, then the marks | Judge persona (a faculty juror) | One model call + counting | "14 of 26 confused X with Y" | Yes; little that is agentic |
| C5 | **Answer groups:** near-identical answers grouped, teacher marks one per group | Constraint-first (certainly buildable) | Grouping; the human marks | 26 answers become 7 decisions | Yes. Gradescope is known for this [A: from memory, not re-checked today] |
| C6 | **Strictness dial:** the same stack under strict, standard and lenient readings; teacher picks | Pattern-driven (what-if simulator) | Makes the hidden policy visible | The class total moves as the dial moves | Yes; a feature more than a product |

### 3. Tournament *(data: `plan/data/ideas.csv`, `plan/data/matches.csv` · `tournament.py --rounds 8` · 29 scheduled matches + 6 extra C1 v C2 head-to-heads)*
Question for every match: "Which of these two would more of THIS event's judges put in their personal top 3, given the rubric (Problem 40 · Solution 30 · Innovation 20 · Pitch 10)?" Judged by Claude as five rotating personas (faculty juror, technical juror, industry mentor, the speaker, a lecturer); no judge names are published (01 §3) and no teammate votes were added [so every result here is [I]].

| Rank | ID | Idea | Strength | Wins / played |
|---|---|---|---|---|
| 1 | C2 | Calibrate-then-mark: teacher marks 6 answers, the tool tunes the marking scheme until it matches her, then marks the rest | +0.94 | 11 / 15 |
| 2 | C1 | Doubt-first marker: locked scheme, a code-checked quote for every mark, two passes, disagreements first, teacher approves | +0.75 | 10 / 15 |
| 3 | C5 | Answer groups: near-identical answers grouped, teacher marks one per group, the mark spreads | +0.00 | 8 / 14 |
| 4 | C6 | Strictness dial: the same stack marked under strict, standard and lenient readings side by side; teacher picks the policy | -1.84 | 3 / 9 |
| 5 | C4 | Mistake map first: what the class got wrong, with quotes and counts, then the marks | -2.37 | 2 / 8 |
| 6 | C3 | Second marker: teacher marks as usual, the tool only flags marks it disagrees with, with the quoted reason | -2.91 | 1 / 9 |
Top two are close (C2 vs C1): run 6 more head-to-head matches or decide on WOW + feasibility.

The schedule paired C1 and C2 only once (C2 won), so six extra head-to-heads were added: **3–3**. The faculty, lecturer and technical personas chose C2 (the teacher stays the standard; a loop with a number); the industry mentor, the speaker and a midnight round-1 juror chose C1 (fewer steps, safer to have working at 00:00). The script calls it close and says to decide on WOW and feasibility.

### 4. Finalists stress test *(fast lane: top 2)*
| | Finalist 1 · C2 Calibrate-then-mark | Finalist 2 · C1 Doubt-first marker |
|---|---|---|
| One-liner | Mark six answers yourself; it learns your marking scheme, proves it matches you, then marks the stack | It marks the stack, proves every mark with a quote, and puts the doubtful ones first |
| Familiar frame + ONE atypical move | "An AI marking assistant" + **it is tested against the teacher before it marks anything** | "An AI marking assistant" + **every mark must quote the answer or it is thrown out** |
| WOW potential (event reading) | L2 hero: agreement climbs as the scheme is tuned · L4 proof: held-out agreement next to human–human 56.8% [M] · L3: the judge marks two answers and it adapts | L2 hero: the rejected quote · L4 proof: agreement vs two graders on Mohler · L3: the judge types an answer |
| Proof cues | Real answers with two human marks [R1]; before/after agreement on answers the loop never saw; the ChatGPT 21-vs-15 result as the reason [M] | The same data; the check is code; misses listed |
| Pre-mortem: "We lost. Why?" → fix | 1. The loop shows no gain (a single pass was already near human level [M probe]) → run the ablation in build step 2; if flat, present it as C1 and say so · 2. Six answers is too few; it overfits → score only on held-out answers · 3. Not working at midnight → build C1's engine first; the loop comes on top | 1. "Why not ChatGPT?" (its marks are as good [M]) → lead with the repeat test · 2. Looks like three other builds [F 02 P50] → open on the doubt queue, not an upload screen · 3. "What is agentic?" has a thin answer [F R9] → say "checked pipeline" plainly |
| Prize fit | Overall 1st: strongest answer on Innovation and on "what is agentic" | Overall 1st: strongest on a working prototype at round 1 |
| Crazy extension (stretch only) | Calibrate from a photo of six marked handwritten scripts | The same check on a handwritten photo |
| Can we finish it? | Engine (= C1) inside the 6 core hours; the loop is ~1.5–2 h more with one unknown | Yes, inside the 6 core hours |

### 5. DECISION ✋ *(team picked C2, 3 Oct 2026)*
**Recommendation: C2 Calibrate-then-mark, built on C1's engine.** The marking engine with the quote check is built first and is a complete product on its own (that is C1). The calibration loop is added on top and is the one genuinely agentic step: its number of rounds is not known in advance, its result is checked by code against the teacher's own marks, and the teacher approves the scheme. If the loop is not working at G4 (18:45), or the ablation shows no gain, we present C1 and say so. **Decided on feasibility, not on the ranking:** the top two are a statistical tie (3–3 head to head).
**Why the others lost:** C5 saves time but is known prior art and the human does all the marking · C6 is a view of C2's idea, not a product · C4 is one model call and a count (kept as a candidate feature: the statement asks for "common mistakes and learning gaps") · C3 saves no time.
**Team pick:** C2 Calibrate-then-mark, built on C1's engine ("lets go with the c2", 3 Oct).

### 6. The idea in one sentence
For **a college lecturer** who **marks stacks of descriptive answers by hand**, **MarkMatch** *(working name, not searched [A])* is a **marking assistant** that **first learns her marking from six answers she marks herself, shows how often it matches her, and only then marks the rest, quoting the line behind every mark**, unlike **a general chatbot**, which **gave the same 8 answers 21/40 in one chat and 15/40 in another** [M, 03 §11 V3].
**Wording rule (a tripwire tripped here):** the team lead did not follow the word "calibration" when the concept was shown. On screen and in the pitch the step is called **"Match my marking"**. Nobody says "calibrate".

### 7. The insight
AI marking's weak point is not how well it marks one answer (a single pass was as close to the human graders as they are to each other [M, probe]). It is **whose strictness it uses**: left alone, the chatbot picked "partial credit" in one chat and "strict" in the next [M]. So the teacher's own marks must set the standard before the stack is marked.

### 8. How it works
Input → question, marking scheme and typed answers; the teacher's marks on six of them · Processing → the tool marks the same six, compares with her, rewrites its scheme notes and re-marks (up to 3 rounds), code counts the matches each round; then it marks the rest, and code rejects any mark whose quoted line is not in the answer · Output → a mark per criterion with the quoted line, a class total, the most-missed criteria · What the user does next → edits any mark and approves; nothing is final without her.

*§9–12 skipped by the event rule (the canvas, the decision records and the 3-minute pitch order replace them).*

## PART B · WOW STACK, FEATURES, SCOPE

### 13. Feature forge *(15 candidates → `plan/data/features.csv` → `forge.py --hours 1.5`)*
Feature hours budget (from 00 §5): **1.5 h** after round 1 · Core loop hours: **6 h** (build steps 1–2), which is the whole core budget with **no slack**.

| Order | ID | Feature | Tier | WOW | Value | Visible | Hours | Risk | Priority |
|---|---|---|---|---|---|---|---|---|---|
| 1 | K1 | Paste question, marking scheme and typed answers, or load the sample class | **CORE** | 1 | 3 | 3 | 0.5 | 1 | 22.00 |
| 2 | K2 | Marker: per-criterion marks, each with the line from the answer that earned it | **CORE** | 3 | 5 | 5 | 1.5 | 2 | 12.17 |
| 3 | K3 | Hard checks in code (quote is in the answer, marks add up) and Break it: a bad quote is rejected on screen | **CORE** | 4 | 4 | 5 | 0.5 | 1 | 42.00 |
| 4 | K4 | Match my marking: teacher marks 6, the tool tunes the scheme until it matches her (up to 3 rounds), teacher approves the scheme | **CORE** | 5 | 5 | 5 | 1.75 | 3 | 10.99 |
| 5 | K5 | Review and approve: teacher edits any mark and approves the class | **CORE** | 2 | 4 | 4 | 0.5 | 1 | 32.00 |
| 6 | K6 | Proof panel: agreement with the teacher on unseen answers, before and after tuning, beside the human-human baseline; misses listed | **CORE** | 4 | 5 | 4 | 0.75 | 2 | 25.51 |
| 7 | K7 | Replay of a recorded real run, labelled as recorded | **CORE** | 1 | 4 | 1 | 0.5 | 1 | 22.00 |
| 8 | W2 | Class mistake map: the criteria most students missed, with counts and quotes | **WOW** | 3 | 5 | 4 | 0.5 | 1 | 40.00 |
| 9 | D1 | Objective answers marked by exact match in code | **DEPTH** | 1 | 3 | 2 | 0.25 | 1 | 40.00 |
| 10 | W1 | Doubt queue: every answer marked twice, disagreements first, with a same-mark-twice count | **STRETCH** | 4 | 4 | 4 | 1 | 2 | 17.39 |
| 11 | W3 | Strictness dial: the class total under strict, standard and lenient readings | **STRETCH** | 3 | 2 | 3 | 1 | 2 | 11.30 |
| 12 | S2 | Batch: a whole paper of several questions for a full class | **STRETCH** | 2 | 3 | 2 | 1 | 2 | 10.43 |
| 13 | S1 | Handwritten photo to typed answer, teacher confirms the transcript | **STRETCH** | 4 | 4 | 3 | 1.5 | 4 | 8.74 |
| 14 | S3 | Voice feedback in Telugu or Hindi | **STRETCH** | 3 | 2 | 3 | 1.5 | 4 | 5.98 |
| 15 | S4 | Story landing page | **STRETCH** | 3 | 1 | 2 | 3 | 3 | 2.56 |

Core loop: 6 h · features chosen: 0.75 h of 1.5 h budget · WOW layers inside the budget: 1
**Reading it for this event:** the "fewer than 3 WOW layers" warning is expected at 1.5 hours (solution.md §3). The doubt queue (W1, 1 h) did not fit behind the mistake map (W2) and objective answers (D1), so it is PARKED first. **The unspent 0.75 h is kept for the one jury suggestion chosen at 01:30.** Hours are our estimates [A]; nobody on the team has built this before.

### 14. THE WOW STACK *(event reading: L2 = HERO · L4 = proof · L3 = the judge's own input · L1/L6, voice, batch = PARKED)*
| Layer | What the judge experiences | Demo second | Mechanism | Fallback if it fails live | Flag | Hours | Build step |
|---|---|---|---|---|---|---|---|
| L1 First second | PARKED (story landing) | — | — | `/` redirects to `/app` | `NEXT_PUBLIC_STORY` | 3 | after round 1 only |
| L2 Magic moment = HERO | "Matches your marks on 3 of 6 … 5 of 6 … 6 of 6", with the scheme note it changed each round | by 60 s | K4 Match my marking | Flag off: mark with the teacher's scheme as typed (this is concept C1) and say so | `MATCH_ENABLED` | 1.75 | 2 |
| L3 Judge joins in | The judge marks two of the six answers, or types a student answer | 90–120 s | Core input (K1, K4) | The prepared sample class | none | 0 | 1–2 |
| L4 Proof it's real | A mark is thrown out because its quote is not in the answer (Break it); then the agreement panel on unseen answers with the misses listed | 60–90 s | K3 + K6 | The panel shows the last recorded eval, dated | `EVAL_PANEL` | 1.25 | 1–2 |
| L5 Scale | PARKED (batch) | — | — | — | `BATCH` | 1 | after round 1 only |
| L6 Ending | PARKED (story) | — | — | The last frame is the approved marks table | — | — | — |
**Shown in the demo (strongest only):** K4, K3, K2, K6, then W2 after round 1 · **Kept for Q&A / README:** §15.

### 15. Depth pack
| Feature | Why a judge might ask | Where it lives |
|---|---|---|
| Objective answers by exact match (D1) | "The statement says objective and subjective" | One line in the demo after round 1 · Q&A |
| How the quote check works (text normalised, then exact match) | "How do you know it isn't inventing the evidence?" | Q&A, `plan/EXPLAIN.md` |
| Cost and seconds per answer | "Is it cheaper than a teacher's hour?" | Proof panel footer [M at build] |
| Why six answers, and why score only on unseen ones | "Isn't it just memorising the six?" | Q&A |

*§16–18 skipped by the event rule (the 3-minute order is in 08 §10).*

### 19. SCOPE ✋
**Core loop (= the demo path, 7 steps):**
1. The teacher pastes the question, her marking scheme and the typed answers (or loads the sample class).
2. She marks six of the answers herself.
3. The tool marks the same six and shows how many match her.
4. It rewrites its scheme notes and re-marks, up to 3 rounds; she approves the scheme.
5. It marks the rest: a mark per criterion, each with the quoted line; code rejects a mark whose quote is not in the answer.
6. She edits any mark and approves the class.
7. The proof panel shows agreement with her on answers the tool had not seen, before and after step 4.

| Feature | MUST / WOW / DEPTH / STRETCH / CUT | Why | Shows in demo? | Hours |
|---|---|---|---|---|
| M1 Quoted marks with hard checks (K1, K2, K3) | MUST | The engine; a complete product on its own (C1) | Yes | 2.5 |
| M2 Match my marking (K4) | MUST · HERO | The difference; the one agentic step | Yes | 1.75 |
| M3 Review and approve (K5) | MUST | The statement's "review, modify, and approve" | Yes | 0.5 |
| M4 Proof panel + recorded replay (K6, K7) | MUST | Proof (30 marks) and demo safety | Yes | 1.25 |
| Class mistake map (W2) | WOW | The statement's "common mistakes and learning gaps" | After round 1 | 0.5 |
| Objective exact match (D1) | DEPTH | The statement's "objective … answers" | One line | 0.25 |
| Doubt queue, dial, batch, handwriting, voice, story | STRETCH (PARKED) | §22 | No | — |

**Acceptance tests:**
- [ ] M1a Given the sample question and 20 typed answers, when Mark runs, then every answer shows a mark per criterion and a quoted line, within 60 s for the 20.
- [ ] M1b Given a mark whose quoted line is not in the student's answer, when the check runs, then that mark is rejected on screen, re-asked once, and if it fails again the answer is sent to the teacher unmarked. (Break it forces this case.)
- [ ] M1c Given any marked answer, then its criterion marks add up to its total and never exceed the scheme's maximum.
- [ ] M2a Given six answers with the teacher's marks, when Match my marking runs, then each round shows "matches you on k of 6" and the scheme note it changed, and it stops at 6 of 6 or after 3 rounds, within 90 s.
- [ ] M2b Given a tuned scheme, then no scheme note copies six or more consecutive words from any of the six answers (checked in code), and the scheme is used only after the teacher presses Approve.
- [ ] M2c Given a round that matches fewer answers than the round before, then the earlier scheme is kept.
- [ ] M3 Given marked answers, when the teacher changes a mark and presses Approve, then the table shows her mark, flagged as edited, and nothing is final before Approve.
- [ ] M4a Given the eval set, when the eval runs, then the panel shows agreement with the teacher on unseen answers for the scheme before and after tuning, as "X of N" with the date, the human–human baseline beside it and the misses listed.
- [ ] M4b Given the model is unreachable, when Run is pressed, then the recorded real run plays, labelled "recorded run".

**Real / seeded / mocked (honesty table):**
| Part | Real | Seeded | Mocked | How we disclose it |
|---|---|---|---|---|
| Marking, quote check, tuning rounds, agreement numbers | Real model calls and real code | — | — | Dates and N on the panel |
| Student answers and "teacher's marks" in the sample class | Real answers and a real grader's marks | From the Mohler dataset (US course, 2011), not our college | — | Credit line on screen and in the README |
| The teacher | — | — | A teammate or the judge plays her | Said aloud |
| Replay | A real run, recorded | — | — | "recorded run" label |
| Handwriting, login, plagiarism, notifications, analytics | Not built | — | — | "typed answers today" on the input; listed as not built in the README |
| Possible leak: a public 2011 dataset may be in the model's training data | — | — | — | Said in Q&A if asked [I]; the judge's own typed answer is the unseen case |

**Demo data:** one Mohler question with its 24–31 real student answers and both human graders' marks; a second question as a spare. Our own lecturers' question and answers replace it if we get them at the venue.
**Cut order if behind:** see §23.

## PART C · EVENT OUTPUTS (hv-mrdu → solution.md)

### 20. One-page solution canvas
`Lecturer with a stack of typed answers` → `Question + marking scheme + answers; her marks on six` → `Match her marking (tune, re-mark, count matches), then mark the rest with a code-checked quote for every mark` → `Marks per criterion, class total, most-missed criteria` → `She edits and approves; agreement with her on unseen answers`
| Problem | User | Solution | Top 3 features | Tech | Impact (the number we will measure) |
|---|---|---|---|---|---|
| Marking descriptive answers is slow, and an AI left alone picks its own strictness | One lecturer at a JNTUH-affiliated college [A] | It learns her marking from six answers, proves the match, then marks the rest with quoted reasons | 1. Match my marking 2. Every mark quotes the answer, checked by code 3. Class mistake map | Next.js + AI SDK + Claude API with a second provider as fallback; checks in plain TypeScript | Agreement with the teacher on unseen answers, before vs after tuning, as X of N, beside human–human 56.8% exact / 78.0% within one mark [M] |

### 21. Agentic-fit table
| # | Step | Role | Why this role (which test decided it) | Why not simpler | How a judge sees it |
|---|---|---|---|---|---|
| 1 | Split the pasted answers; load the sample class | CODE | For-loop test: a fixed script gives the same result | — | Answer cards appear |
| 2 | Turn the reference answer into criteria with marks, if the teacher gave none | MODEL CALL | One-call test: language in, structure out | Rules can't read a free-text answer key | Editable scheme card, MODEL badge |
| 3 | Teacher marks six answers and edits the scheme | HUMAN | Her marks are the standard | — | Six mark boxes |
| 4 | Mark one answer per criterion with a quoted line | MODEL CALL | One-call test | Keyword matching misses paraphrase | Mark card with the quote highlighted |
| 5 | Quote is in the answer; marks add up and stay in range; no scheme note copies an answer | CODE | For-loop test. These are the hard checks | — | Check badges; a rejected mark in Break it |
| 6 | Re-ask once after a failed check, then hand to the teacher | CODE | For-loop test: a fixed retry of one | An agent is not needed to retry once | "attempt 2" on the card |
| 7 | **Match my marking:** look at where its marks differ from hers, decide what to change in the scheme notes, re-mark the six, keep the change only if matches rise, stop at 6 of 6 or 3 rounds | **AGENT (provisional)** | For-loop test passes: what to change depends on which answers missed and why. One-call test is borderline: one rewrite may be enough. Separation test: one agent only; its checker is code (the match count). Ablation decides | A fixed script can't write the note; one call can't see whether its rewrite helped | Round cards: "3 of 6 → 5 of 6", the note changed, a rejected round |
| 8 | Teacher approves the tuned scheme | HUMAN | It decides students' marks | — | Approve button; scheme locked |
| 9 | Count matches; sort; totals; most-missed criteria | CODE | For-loop test | — | Numbers on the panel |
| 10 | Word the class mistake summary | MODEL CALL | One-call test | — | Three lines above the table |
| 11 | Teacher edits and approves marks | HUMAN | Marks affect whether a student may sit the final [F R3] | — | Approval card |
**Agents after the tests:** 1, provisional (limit 4) · **Hard checks (always CODE):** quote in answer · marks add up and in range · scheme notes copy no answer · a round is kept only if the match count rises · **Ablation plan:** on about 20 unseen answers per question for 5 questions (~100 answers), agreement with the "teacher" (human grader 1) for: the scheme as typed · after one rewrite (a single model call) · after the loop (up to 3 rounds). **If the loop does not beat one rewrite we call step 7 a MODEL CALL; if tuning does not beat the typed scheme we switch the flag off, present concept C1, and say so.** Zero agents is a possible honest result.

### 22. Feature decision records
| Feature | Decision | Problem it solves | Differentiation | Judge or demo value | Effort (h) | Why not the alternative / why excluded |
|---|---|---|---|---|---|---|
| K4 Match my marking | **HERO** · TOP 3 #1 | The AI's strictness is not the teacher's [M] | Tested against the teacher before it marks anything | Innovation 20 + "what is agentic" · by 60 s | 1.75 | Chosen over the strictness dial: the dial shows the problem, this fixes it |
| K2 + K3 Quoted marks, hard checks, Break it | **TOP 3 #2** · MUST | She can't see why a mark was given | A mark without real evidence is thrown out by code | Solution 30 · 60–90 s | 2.0 | Chosen over a confidence score: a quote can be checked, a score cannot |
| W2 Class mistake map | **TOP 3 #3** (after round 1) | Statement: "common mistakes and learning gaps" | Counts come from the per-criterion marks, not a guess | Problem 40 (expected outcome) | 0.5 | Chosen over the doubt queue by forge order and because the statement asks for it |
| K5 Review and approve | SHOWN · MUST | Statement: "review, modify, and approve" | — | Trust; the human gate | 0.5 | Auto-finalising marks was never an option |
| K6 Proof panel | SHOWN · MUST | "Does it work?" | Agreement on unseen answers beside the human–human baseline, misses listed | Solution 30 · 60–90 s | 0.75 | Chosen over a bare accuracy percentage |
| K1 Input + sample class | MUST (plumbing, not counted as shown) | Gets a case in; takes the judge's own input | Real answers with two human marks | L3 | 0.5 | File upload excluded: paste is enough |
| K7 Recorded replay | MUST (not shown unless needed) | A dead network at 00:00 | — | Demo safety | 0.5 | — |
| D1 Objective exact match | SHOWN (one line, after round 1) | Statement: "objective … answers" | Honest: it is code, not AI | Completeness | 0.25 | Cheaper than a model call and never wrong |
| W1 Doubt queue (two passes, same-mark-twice count) | PARKED 1 | Which marks to re-check | Published work says it sorts answers, not improves marks [F R9] | Would be shown if built | 1.0 | Did not fit 1.5 h behind W2 and D1; the repeat-run number is still measured in the eval |
| S1 Handwritten photo → transcript | PARKED 2 | Real scripts are on paper [A] | — | The question a juror is most likely to ask | 1.5 | Risk 4, untested; likely the jury suggestion we build |
| W3 Strictness dial | PARKED 3 | Shows the hidden policy | — | Vivid, low value | 1.0 | Match my marking already solves it |
| S2 Batch (several questions, full class) | PARKED 4 | Scale | — | L5 | 1.0 | One question proves the mechanism |
| S3 Voice feedback in Telugu or Hindi | PARKED 5 | — | — | Fragile on a video call | 1.5 | Feedback is read by the teacher, in English |
| S4 Story landing | PARKED 6 | — | — | Never in a shared-screen demo | 3.0 | Needs `story: yes` and a spare person |
| Login, profiles, courses, notifications, analytics dashboard, plagiarism, version history | EXCLUDED | Listed deliverables | — | None in 3 minutes | — | Rookie pitfalls (solution.md §3); plagiarism needs data we don't have. Named as not built in the README |
| Answer groups (concept C5) | EXCLUDED | — | Known prior art [A] | — | 1.5 | Lost the tournament; the human does all the marking |
**Shown in a round (≤ 6, all DONE-TESTED):** round 1: Match my marking · quoted marks with Break it · review and approve · proof panel (4) · final: + class mistake map · objective exact match (6) · **Parked, in build order:** doubt queue → handwritten photo → strictness dial → batch → voice → story. A jury suggestion can jump the queue (one in, one out) · **The judge's own input:** we accept any short-answer question with a reference answer or scheme and typed English answers of up to about 100 words; the judge may also mark the six himself · outside it (handwriting, essays, code, maths working, other languages) we say "typed short answers today" and show the nearest sample.

### 23. Scope freeze 1 ✋ *(APPROVED by the team, 3 Oct 2026)*
Core loop (7 steps): §19 · **MUST (4):** M1 quoted marks with hard checks · M2 Match my marking · M3 review and approve · M4 proof panel + replay · **HERO:** Match my marking · **TOP 3:** Match my marking · every mark quotes the answer, checked by code · class mistake map · **PARKED:** doubt queue → handwritten photo → strictness dial → batch → voice → story · **EXCLUDED:** login, profiles, courses, notifications, analytics, plagiarism, version history, answer groups, file upload.
**Cut order (SHRINK ladder for this product):** 1. parked extras · 2. objective exact match, then the mistake map · 3. one question, one input type (paste only); the sample class is the only prepared case · 4. Match my marking drops from a loop to one rewrite (one model call); if that also fails, flag off and present C1 · 5. the proof panel shows a recorded eval, dated · 6. replay first. **Never cut:** the marker with its quote check, Break it, teacher approval, the honesty labels, the backup recording.
**Tripwires checked (hv-mrdu SKILL.md):** MUST 4 of 4 ✓ · shown 6 of 6 ✓ · agents 1 of 4 ✓ · core loop 7 of 7 ✓ · superficial AI: without the model nothing gets marked ✓ · agent theatre: one provisional step with an ablation and a written downgrade ✓ · weak differentiation: "tested against the teacher first" passes the ten-team test [I] ✓ · excessive research: none in this step ✓ · unstable demo: replay is a MUST ✓ · needless architecture: for P5 · **cannot explain it: TRIPPED** (the lead did not follow "calibration") → fixed by renaming the step "Match my marking" and by §6's wording rule; the explain-it drill at 18:45 tests it · **over-scoping, watch:** the core is exactly 6 h of 6 h with no slack → the first cut (ladder step 4) is already written.
**From now: one in, one out** (logged in 00 §8). Freeze 2 = round-1 freeze (23:00). Freeze 3 = code freeze (05:00).
