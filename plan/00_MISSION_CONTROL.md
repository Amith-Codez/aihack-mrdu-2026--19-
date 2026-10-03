# 00 · MISSION CONTROL

> The team's live scoreboard. Whichever engine is working (Cowork or Claude Code) reads this **first** and updates it **last**.
> Status only: details live in files 01–09. It should be readable in 30 seconds.
> **Two engines:** 🧠 **COWORK** plans (files 01–06, 08, and the `design/`, `assets/`, `pitch/` folders) · 🛠 **CLAUDE CODE** builds (the app in `web/`, files 07 and 09).

**Last updated:** 3 Oct 2026 · **by:** B0 early setup (Claude Code)

## 1. WHERE WE ARE NOW
- **Engine to use now:** 🛠 CLAUDE CODE
- **Step:** 7 done · Build plan **READY and APPROVED** (06). Planning is finished; Cowork stops
- **Next action (one):** in Claude Code, paste **B1** (build step 0: the `/app` skeleton, due 18:00). **First put a free Gemini key and a free Groq key into `web/.env.local`**; step 1 tests them in its first 10 minutes. When B1 says "PLAN PUSHED", laptop B starts PITCH-1
- **Blocker:** none, but **we are ~2.5 h late**: gates before round 1 were moved (G3 18:00 · G4 20:15 · G5 22:30 · G6 23:15) and the core was cut to 4.5 h (06 §3). The jury rounds do not move. Open: keys never tested · two lecturer conversations · no owner for the story page

## 2. Event
| | |
|---|---|
| Hackathon / URL | AI HACK × MRDU 2K26 · https://www.mrhack.in · registration: https://app.studenttribe.in/events/ai-hack-x-mrdu-hackathon |
| Event type (archetype) | Live · problems from a provided list of 100+ · two jury rounds |
| Judging format | **The winner is the average of two jury sessions** (possibly more), likely on a video call: **round 1 00:00–01:30 (4 Oct)** · **final 08:30–10:00**. Both count equally |
| Working rubric | **Problem selection (impact) 40 · Solution prototype (proof) 30 · Innovation (fresh angle) 20 · Pitch as a team (questions) 10** (speaker's deck; the organizers also said: solution, understanding of the chosen tech, pitch) |
| Start / Deadline (IST) | Check-in 09:00 3 Oct · hacking ~11:30 · the listing's sprint ends 07:00 4 Oct (≈ 19.5 h; submission deadline unknown, so everything is ready by 07:00) · final 08:30 · prizes 10:00–11:00 |
| Must-submit items | UNKNOWN (ask): expect repo + live URL + deck + a recorded backup demo |
| Domain | Registered as **Agentic AI**. The organizers said there are no domain-level criteria or prizes |
| Rules that bite | Statements only from the list (own ideas discouraged) · AI tools unrestricted · "from scratch in 24 hours" → REBUILD starters at the event, commit from minute one · team 2–5 (5 strongly advised) |
| Prize we target | **Overall 1st** (prize split on mrhack.in is unverified) |

## 3. Team *(5 is advised; roles for 2–5 people in `1_START_HERE.md` §5)*
| Name | Role | Q&A topic owned | Hours |
|---|---|---|---|
| Amith | Builder 1 · laptop A (Cowork planning + Claude Code core) · demo driver | How it works | 21 |
| [teammate 2] | Laptop B: evidence pack (eval cases, claims ledger) → pitch lane → rounds log → UI-polish notes | Data and evidence | 21 |
| [teammate 3] | Presenter (chosen by audition at 18:45) · clock and gates · rounds log | The problem and the users | 21 |
| [teammate 4, optional] | Tester: break sessions, every screen on a phone, unprepared inputs | What's real, what failed | 21 |
| [teammate 5, optional] | Researcher: sources, claims ledger, mentor questions | What comes next | 21 |

## 4. Progress
| # | Step (workflow stages) | Engine | Prompt | File / folder | ✋ | Status |
|---|---|---|---|---|---|---|
| 1 | Recon (refreshed 2 Oct) | 🧠 COWORK | — | 01 | — | DONE |
| — | Keys spike (both laptops, before the event) | 🛠 CLAUDE CODE | SPIKE | outside this folder | — | NOT STARTED |
| 2 | Problem funnel: 100+ → top 10 → top 3 → one (stages 1–9) | 🧠 COWORK | P1 / P1-HOME | 02 | ✋ problem | DONE · APPROVED 3 Oct (HOME lane) |
| 3 | Early setup (repo, blank deploy, packages), in parallel with P1 | 🛠 CLAUDE CODE | B0 | `web/` | — | DONE · repo pushed, blank app live |
| 4 | Validation · existing solutions · gap · difference (stages 10–13) | 🧠 COWORK | P2 | 03 | — | DONE (HOME lane) · GO WITH FIXES |
| 5 | Concept · agentic fit · features · scope freeze 1 (stages 14–16) | 🧠 COWORK | P3 | 04 | ✋ concept · ✋ scope | DONE · concept C2 · scope freeze 1 APPROVED 3 Oct |
| 6 | Look of the hero screen | 🧠 COWORK | P4 | 05, `design/` | ✋ look | DONE · GO 3 Oct 15:22 |
| 7 | Architecture · stack · gates (stages 17–19) | 🧠 COWORK | P5 | 06, `plan/data/gates.csv` | ✋ plan → 🛑 **MOVE TO CLAUDE CODE** | DONE · READY 3 Oct |
| 8 | Evidence + pitch lane: eval cases, claims ledger, story, Q&A, deck | 🧠 COWORK (laptop B) | PITCH-1 · PITCH-2 | 08, `pitch/`, `plan/data/` | — | NOT STARTED |
| 9 | Build · test · debug (stages 20–22): steps 0–2 = MVP | 🛠 CLAUDE CODE | B1 · B2 | `web/` | — | NOT STARTED |
| 10 | Readiness audit 1 + jury round 1 (00:00) | either | AUDIT · ROUND-1 · ROUND | 09 §9, `plan/data/rounds.md` | — | NOT STARTED |
| 11 | Top 3 + jury suggestion · polish | 🛠 CLAUDE CODE | B2 · B3 | `web/` | — | NOT STARTED |
| 12 | Demo + capture (stage 23) | 🛠 CLAUDE CODE | B4 | 07, `pitch/` | — | NOT STARTED |
| 13 | Final check + submit · readiness audit 2 · final round (stages 24–26) | 🛠 CLAUDE CODE | B5 · AUDIT · ROUND-FINAL | 09 | ✋ submit | NOT STARTED |

## 5. Time plan *(gates: `plan/data/gates.csv`, checked with `clock.py`; minute-by-minute plan in `5_RUN_SHEET.md`)*
| Gate | Time (IST) | Must be true | Status |
|---|---|---|---|
| H0 Hacking starts | 3 Oct 11:30 | The list is in `inputs/problem-statements/`; P1 and B0 start together | — |
| G1 Problem approved | **12:30** | 02 §4 APPROVED (the recommendation stands 10 minutes after it is shown) | — |
| G2 Plan READY → switch (scope freeze 1) | **17:15** (was 14:45) | 06 READY; B1 says "PLAN PUSHED" and laptop B starts PITCH-1 | — |
| G3 Skeleton live | 18:00 (was 15:45) | `/app` opens in our design on the live URL | — |
| Evidence pack pushed (laptop B) | 20:30 (was 18:30) | `plan/data/eval_cases.csv` and `claims.csv` on main | — |
| G4 Hero path on the mock | 20:15 (was 18:45) | The run streams; Break it works; one real run; explain-it drill 1; presenter audition | — |
| **G5 MVP: the real mechanism** | **22:30** (was 21:45) | 3 clean hero runs on the live URL; eval numbers so far; tag `ok-mvp` | — |
| Break session 1 (outsiders) | 22:30–22:45 | 10 unprepared inputs tried; breaks logged; P0 fixes on the hero path only | — |
| AUDIT → ROUND-1 kit | 22:45 → 23:10 | Audit verdict, "AUDIT PUSHED", tag `ok-r1`, backup video 1; then the running order | — |
| **G6 Round-1 freeze** (scope freeze 2) | **23:15** (was 23:00) | No deploys until after our slot; 23:00–23:45 two timed rehearsals, explain-it drill 2 | — |
| **Jury round 1** | **00:00–01:30** | Full 3-minute pitch of what works; feedback logged | — |
| Hour-14 reset (ROUND, RESET) | 01:30 | One jury suggestion chosen; three lanes: features · UI polish · bug testing; "RESET PUSHED" | — |
| G7 Top 3 complete | 03:30 | Top 3 tested; the suggestion built; tag; break session 2 | — |
| **G8 Code freeze** (scope freeze 3) | **05:00** | Polish + judge panel done; only fixes after this | — |
| Capture | 06:00 | Screenshots pushed; PITCH-2 starts | — |
| **G9 Submittable** | **07:00** | Repo, live URL, README, deck PDF; AUDIT (06:30) verdict; backup video 2 | — |
| Rehearsals | 07:45–08:20 | 3 clean timed runs; explain-it drill 3 | — |
| **Final round** | **08:30–10:00** | Submitted as instructed; in place 10 minutes early | — |
Hours (revised 3 Oct 16:50): core loop **4.5 h** (steps 1–2, 18:00–22:30; was 6 h) · **features 1.5 h** (step 4, after round 1) · polish 1.5 h.

## 6. Build steps *(filled from 06 §9; status words: NOT STARTED · PARTIAL · DONE-UNTESTED · DONE-TESTED)*
| # | Goal | Status | Live URL updated? | Tag |
|---|---|---|---|---|
| — | — | — | — | — |

**Features shown in a round (≤ 6, only DONE-TESTED)** *(from 04 §22)*
| Feature | Kind (HERO / TOP 3 / SHOWN / PARKED) | Status | Flag | Fallback tested? |
|---|---|---|---|---|
| Match my marking (K4) | HERO · TOP 3 | NOT STARTED | `MATCH_ENABLED` | — |
| Quoted marks + hard checks + Break it (K2, K3) | TOP 3 | NOT STARTED | — | — |
| Class mistake map (W2) | TOP 3 (after round 1) | NOT STARTED | — | — |
| Review and approve (K5) | SHOWN | NOT STARTED | — | — |
| Proof panel (K6) | SHOWN | NOT STARTED | `EVAL_PANEL` | — |
| Objective exact match (D1) | SHOWN (after round 1) | NOT STARTED | — | — |

## 7. Must ship / cut first *(scope freeze 1, 04 §23; APPROVED 3 Oct)*
- **Must ship:** M1 quoted marks with hard checks and Break it · M2 Match my marking · M3 review and approve · M4 proof panel + recorded replay
- **Parked extras, in build order:** doubt queue → handwritten photo → strictness dial → batch → voice → story (0.75 h of the 1.5 feature hours is kept for the jury's suggestion)
- **Cut first, in order (SHRINK ladder):** parked extras → objective exact match, then the mistake map → paste only, one question → Match my marking as one rewrite, else flag off and present C1 → recorded eval on the panel → replay first. Never cut: the marker with its quote check, Break it, teacher approval, the honesty labels, the backup recording

## 8. Decisions log *(time · decision · why)*
- 30 Sep · Domain = **Agentic AI** · the team's strongest track
- 30 Sep · Follow the organizer's Student Tribe schedule (earlier deadlines) until told otherwise
- 30 Sep · REBUILD the starters at the event unless the organizers allow pre-existing code in writing · "from scratch in 24 hours"
- 2 Oct · **Target = overall 1st on the average of two jury rounds** · the organizers said there are no domain-level criteria or prizes; the earlier targets (Agentic AI Logic Champion, Best Pitch) came from a template website
- 2 Oct · **Working rubric = Problem 40 · Solution 30 · Innovation 20 · Pitch 10** · from the speaker's deck at the pre-event session; replace it the moment a jury sheet is shown (prompt E3)
- 2 Oct · **Problem pick = a 60-minute funnel over the whole list** (`hv-mrdu`), with B0 running in parallel · problem selection is the largest block of marks
- 2 Oct · **Round 1 gets a complete pitch** with a backup video and an audit · it is half of the result
- 2 Oct · **One hero feature + top 3, at most 6 shown; story landing, voice and batch are PARKED extras** · the meeting and the deck both warn against feature overload, and a video call makes 3D and voice fragile
- 2 Oct · **Demo opens on `/app`**; `/` redirects there. The story landing is built only with `story: yes` (4+ people) and is never merged before round 1
- 3 Oct · **Problem = AI Teaching & Assignment Evaluation Assistant**, backup = Faculty Timetable Conflict Resolution · 74.8/100, 6.4 clear, ROBUST, 2/2 rubrics (02 §4); the backup is only usable before Confirm is clicked on the platform
- 3 Oct · **We do not claim better marks than a chatbot** · a blind single pass was already as close to the human graders as they are to each other (03 §11 V3); the product is the checked quote, the sorted doubt queue and the published agreement
- 3 Oct · **Concept = C2 "Match my marking" on C1's engine** · team pick; the tournament tied C1 and C2 (3–3), decided on feasibility: C2 falls back to C1 by a flag
- 3 Oct · **Never say "calibration"** · the lead did not follow the word; the step is called "Match my marking" on screen and in the pitch
- 3 Oct · **Scope freeze 1 APPROVED** · 4 MUST, hero = Match my marking, at most 6 shown
- 3 Oct · **Look = "Examiner's margin, loud"** · the lead asked for a Gen-Z look that fits the project; kept ≥ 7:1 text and no dependence on animation for the video call
- 3 Oct · **Repo stays public** · team choice, accepted that plan files are visible
- 3 Oct · **B0: Vercel project `aihack-mrdu-2026--19-` (team amith6), no Git connection, story: yes → cinematic packages installed on main** · deploys only from this laptop's CLI; one laptop may run both lanes (story in a second clone on branch `story`)
- 3 Oct · **Build plan APPROVED → READY; engine switched to Claude Code**
- 3 Oct 16:50 · **Gates before round 1 moved; core cut to 4.5 h** · planning ended ~2.5 h late and the rounds are fixed; cuts: sample class + one own-answer box, 2 tuning rounds, the hero run measures its own proof on 10 unseen answers (06 §3)
- 3 Oct 16:50 · **Models: free Gemini (primary) + free Groq (fallback), ₹0** · team choice; overrides "paid primary"; the recorded replay is therefore part of the plan; keys untested
- 2 Oct · **Production deploys only from laptop A's CLI** (Vercel's Git connection is disconnected in B0) · a teammate's push must never redeploy during a freeze

## 9. Top risks (max 3)
- The list of 100+ arrives only at the start → the 60-minute funnel with a decision that stands 10 minutes after it is shown; B0 runs in parallel
- Round 1 at midnight is half the score → MVP gate at 21:45, freeze at 23:00, backup video and replay ready
- A small team (advice: 5) and a beginner builder being asked how the tech works → explain-it drills, `plan/EXPLAIN.md`, the smallest architecture that runs the hero path

## 10. Links
Repo git@github.com:Amith-Codez/aihack-mrdu-2026--19-.git (https://github.com/Amith-Codez/aihack-mrdu-2026--19-) · Live URL (the stable production alias) https://aihack-mrdu-2026-19.vercel.app · Last good deployment https://aihack-mrdu-2026-19-j0ygv1dm4-amith6.vercel.app (B0 blank app, 3 Oct) · Last good tag — · Backup video — · Deck — · Submission page — · Registration: https://app.studenttribe.in/events/ai-hack-x-mrdu-hackathon
