# 06 · BUILD PLAN (the contract Claude Code follows)

> **BUILD PLAN STATUS:** DRAFT
> *(DRAFT or READY. Set READY only after the checklist at the bottom passes and the team replies APPROVED. Both engines read this line: while it's DRAFT, Claude Code only plans; once it's READY, Cowork stops and Claude Code builds.)*
> **Engine:** 🧠 COWORK writes it (prompt **P5**, ≤ 30 min) → 🛠 CLAUDE CODE follows it · **Updated:** — · **Skills:** `hv-mrdu` → `references/architecture-plan.md` (architecture defence, gates, SHRINK ladder) + `hv-build` (Part A) + `hv-agentic` (crew recipe) · ✋ Team approves
> **Job:** the technical decisions plus the step-by-step build contract: an architecture the whole team can explain, a stack with a reason per line, and an hour-by-hour plan with gates, tests and freezes. It loads into every Claude Code session through `CLAUDE.md`, so it holds decisions, not research. Target ≤ 260 lines when filled.
> **Inputs:** 04 (concept, canvas §20, agentic-fit §21, feature decisions §22, scope freeze §23, tests), 05 (screens, tokens in `design/`), 03 §6 (data/API check), 01 §7 (rules incl. prior work), 00 §3 and §5 (team, time).
> **Pre-filled for AI HACK × MRDU (updated 2 Oct):** the rows marked *(default)* below. P5 confirms or changes them; everything else is filled at the event.

---
## OUTPUT *(Cowork fills below)*

### 1. Product
One sentence: — · Memory line: — · HERO feature: — · Top 3: — · Parked extras (in order): —

### 2. Core loop (= demo path)
1. —

### 3. Scope
**MUST (each with its acceptance test):**
- [ ] M1 — … → passes when: —
**HERO + TOP 3 + proof (each with an acceptance test; the hero's happy path must be flawless):**
- [ ] HERO — … → passes when: —
**PARKED extras (only after the hero path is live, tagged and recorded; each behind a flag with a fallback):**
- [ ] — … → passes when: — · flag: — · fallback: —
**DEPTH (only after every MUST and planned WOW passes):** —
**STRETCH (only after code freeze is safe; time-boxed):** —
**CUT (never build):** —

### 4. Screens and states
| Route | Purpose | States to build | Mobile notes |
|---|---|---|---|
| `/app` | **The product and the demo start screen:** input with a sample case loaded, live steps, checks, answer + approval, proof strip *(default)* | empty (sample case ready) · running (named steps) · error (+ replay) · success · approval · replay badge | steps collapse to a vertical list |
| `/` | Redirects to `/app`. Only with `story: yes`: the scroll story after round 1 (PARKED extra, flag `NEXT_PUBLIC_STORY=1`) *(default)* | poster · reduced-motion · no-WebGL | object centred behind text + scrim |
| — | — | — | — |

### 5. Design system (condensed from 05; full detail stays in 05)
- Concept: —
- Tokens: copy `design/tokens.css` + `design/tokens.json` into `web/design/` (never retype colours) · theme per surface: —
- Fonts (display / text / numbers / Indic) + source: —
- Type scale · spacing · radius · borders: —
- Motion tokens (durations / easing): —
- Signature interaction: —
- Cinematic: hero object — · technique — · chapters (05 §15) — · particle shapes — · assets (05 §16) —
- Never do (project-specific anti-generic rules): —

### 6. Stack *(check versions with `npm view <pkg> version` at setup; docs checked with URL + date)*
| Layer | Choice | Why | Doc checked |
|---|---|---|---|
| App | Next.js (App Router) + TypeScript + Tailwind *(default)* | One deployable; Vercel | — |
| Agents | AI SDK 7 (`ai`, Node ≥ 22) + our own crew engine (hv-agentic crew-recipe.md) *(default)* | Typed plans/verdicts, parallel workers, hard checks, bounded retries, NDJSON trace | — |
| Models | Primary: paid `<provider:model>` · Fallback: `<other provider:model>` *(ids from this morning's SPIKE)* | Reliability under rate limits | — |
| Voice (PARKED extra) | Sarvam STT `saaras` + TTS `bulbul:v3` (te-IN, hi-IN, en-IN) | Local-language access; shown as a recorded clip on a video call | — |
| Story landing (PARKED extra) | three · @react-three/fiber · @react-three/drei · @react-three/postprocessing · gsap + @gsap/react · lenis | First impression on the public link; never in the shared-screen demo | — |
| Hosting | Vercel, region bom1, `maxDuration` 300 on the crew route *(default)* | Low latency from Hyderabad | — |
| — | — | — | — |
Mandated / sponsor tech and exactly where it does the core job: —
**Prior-work rule (01 §7) → starters:** REBUILD the hv-cinematic and hv-agentic starters from their recipes during the event *(default; COPY only with the organizers' written OK)* · Disclosure line for the README: —

### 7. Architecture *(the defence tables are in §13)*
```
(ASCII: browser → route → steps in order, each marked CODE / TOOL / MODEL / AGENT / HUMAN → result)
```
**Data model:** — · **Routes and contracts (input → output types):** — · **Env var names:** — · **Feature flags (one per WOW layer):** —

### 8. AI block *(or "No AI" with the reason)*
Job only AI can do: — · Model + provider (verified): — · Input: — · Steps: — · Output schema: — · How judges SEE it working: — · Guardrails: — · Fallback: — · Eval set (10 inputs + expected): —
**Responsible AI (1 line each):** data privacy — · bias risk — · human oversight — · what we tell users when it's unsure —
**Demo safety:** DEMO_MODE behavior — · seed + reset — · cached real results — · timeouts — · offline backup —

### 9. Build steps *(one Claude Code session each; every step ends with its test gate from `hv-mrdu` → readiness.md §1; the live URL is updated after every step)*
| # | Goal | Done when (verifiable, on the live URL) | Est. | Owner | Gate |
|---|---|---|---|---|---|
| 0 | Skeleton (on top of the B0 setup): tokens from `design/`, fonts, app shell at `/app`, `/` redirects to `/app` unless `NEXT_PUBLIC_STORY=1` (never edit `web/app/page.tsx`: laptop B owns it) | `/app` opens in our design; code pushed; build + lint pass | 1 h | A | G3 15:45 |
| 1 | Hero path on the mock model: engine + route + the `/app` screen, then one real run | The run streams step by step; Break it shows a rejected and fixed attempt; one real run completes; `plan/EXPLAIN.md` v1 | 3 h | A | G4 18:45 |
| 2 | **MVP, the real mechanism**, in this order: a real hero run live → the domain's hard checks as CODE → the approval action → 3 recorded replays → fallback model → the eval on `plan/data/eval_cases.csv` (≤ 10 cases, in the background from 21:00) | Checks pass 5 good / reject 5 bad samples; fallback takes over (local test); eval table for the cases finished by 21:15 (clean OFF vs ON; injected faults); **3 clean hero runs**; tag `ok-mvp` | 3 h | A | **G5 21:45** |
| 3 | PARKED extra, only with `story: yes`: story landing on branch `story` in laptop B's second clone | Proven locally at 6 scroll positions × 3 sizes; merged never before round 1; switched on by laptop A with STORY-ON between 01:45 and 05:00 | background | B | — |
| 4 | Top 3 complete + the one jury suggestion from round 1; then PARKED extras in forge order (each after a tag) | Each feature passes its test; after each: 3 clean hero runs + the checks script; the full eval once at the end; flags off and on | 1.75 h | A | G7 03:30 |
| 5 | Polish + judge panel (before freeze): every state, mobile, ≤ 5 judge fixes, README draft | ui-critic: no P0/P1; nothing weaker than the hero is shown | 1.5 h | A | G8 05:00 |
| 6 | Demo hardening + capture (after freeze) | Scripted path 3× clean and timed; replay works offline on a local build; screenshots in `pitch/screens/`; backup video 2 (recorded in the final AUDIT) | 1 h | A | G9 07:00 |

### 10. Checkpoints *(= the gates in §14 and 00 §5)*
—

### 11. Decision rights during the build
Claude decides (small, reversible): — · Ask the team: scope changes, paid services, architecture changes, anything in CUT or STRETCH.

### 12. Risky unknowns to prove first *(spikes in steps 0–1)*
| Question | Passes if | Fallback |
|---|---|---|
| — | — | — |

### 13. Architecture defence *(hv-mrdu → architecture-plan.md §1; the jury scores our understanding of the tech we chose)*
**Components**
| Component | Responsibility (one line) | Input → output | State it holds | How it fails | What happens then | What breaks without it |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |
**Data flow of the hero case (numbered hops, same order as the canvas in 04 §20):** 1. — 2. — 3. —
**Agent and tool interactions**
| Step | Role (from 04 §21) | Reads | Tools it may call | Output schema | Checked by | Max attempts |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |
**State and integrations**
| Service or store | Purpose | Env var NAME | Limit | Timeout | Fallback |
|---|---|---|---|---|---|
| — | — | — | — | — | — |
**Tech choices**
| Choice | Why this | Why not the simpler option | Why not the bigger option | One-line answer for a judge |
|---|---|---|---|---|
| — | — | — | — | — |
**Complexity budget:** one app ☐ · no login ☐ · ≤ 1 database (or none) ☐ · ≤ 2 external services besides the model ☐ · ≤ 4 agents ☐ · no queue or microservices ☐ · every box answers "what breaks without it?" ☐ · exceptions and why: —
**60-second explanation card (every teammate says it without notes):** "A — gives —. —. —. Fixed rules check —. If a check fails, —. A human approves —. On — real cases we measured —."

### 14. Gates, tests and freezes *(source of truth: `plan/data/gates.csv`; check with `python3 .claude/skills/hv-mrdu/scripts/clock.py plan/data/gates.csv`)*
| Gate | Time | Must be true | Test that proves it | Recovery if missed |
|---|---|---|---|---|
| H0 Hacking starts | 3 Oct 11:30 | List in `inputs/problem-statements/`; P1 and B0 running | — | Start P1 the moment the list is readable |
| G1 Problem approved | 12:30 | 02 §4 APPROVED | — | The recommendation stands 10 min after it is shown |
| G2 Plan READY (freeze 1 done) | 14:45 | This file READY | Ready checklist | P4 → palette + one screen; defaults stand |
| G3 Skeleton live | 15:45 | `/app` on the live URL | build + lint + screenshots | Skip styling |
| G4 Hero path on the mock | 18:45 | Streams; Break it; one real run | Step 1 test gate | SHRINK 3–4 |
| **G5 MVP** | **21:45** | 3 clean hero runs, real mechanism | Step 2 test gate | SHRINK 3–5; no extras |
| **G6 Round-1 freeze** (freeze 2) | **23:00** | AUDIT (22:20) · tag `ok-r1` · backup video 1 · round-1 kit; rehearsals 23:00–23:45 | 09 §9 | Replay; say what is live |
| G7 Top 3 complete | 4 Oct 03:30 | Top 3 tested; jury suggestion built | Step 4 test gate | Drop the weakest of the top 3 |
| **G8 Code freeze** (freeze 3) | **05:00** | Fixes only | — | Hide what isn't DONE-TESTED |
| G9 Submittable | 07:00 | Every item ready; AUDIT GO | 09 §5, §9 | Submit what works |
**Break sessions with outsiders:** 21:45 and 03:30 (readiness.md §3) · **Explain-it drills:** 18:45, 22:30, 07:45 · **Backup rule:** tag `ok-<HHMM>` + note the last-good deployment before anything new · **SHRINK ladder order:** parked extras → depth and the weakest of the top 3 → one input, one scenario → fewer agents → seeded data → replay first.

---
### Ready checklist (all must pass before READY)
- [ ] Every MUST has an acceptance test, and together they cover the core loop
- [ ] The HERO and each of the TOP 3 has a test; every PARKED extra has a flag and a fallback; shown features ≤ 6
- [ ] §13 filled: every component answers "what breaks without it?"; the complexity budget passes; the explanation card is written
- [ ] §14 matches `plan/data/gates.csv` (times moved only if we are early or late) and `clock.py` runs clean
- [ ] Every agent in §13 passed the tests in 04 §21 (or is marked provisional); hard checks are CODE
- [ ] No tripwire in `hv-mrdu` SKILL.md trips (scope limits, superficial AI, agent theatre, differentiation, needless boxes, can the team explain it)
- [ ] Tokens complete in `design/` (report ALL PASS): no "TBD" colours or fonts
- [ ] Style preview approved (05); a motion preview only if the story landing is being built
- [ ] Contracts exist for every core-loop route
- [ ] Every key or service is obtained or has a mock; every asset has a licence line
- [ ] Every build step has a verifiable "done when"
- [ ] Checkpoints fit the deadline
- [ ] Team replied **APPROVED** → set `BUILD PLAN STATUS:` to **READY**

---
## 🛑 WHEN THIS FILE IS READY: COWORK STOPS HERE → MOVE TO CLAUDE CODE
Planning is finished. Cowork must not write app code. Do this now:
1. In the Claude desktop app, click the **Code** tab (top middle).
2. Choose **Local** → **Select folder** → pick this same hackathon folder.
3. Set the mode next to the send button to **Auto** (or **Accept edits**).
4. Paste prompt **B1** from `3_PROMPTS.md` and press Enter. Approve the `playwright` tool if asked.
