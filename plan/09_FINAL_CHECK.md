# 09 · FINAL CHECK + SUBMIT

> **Engine:** 🛠 CLAUDE CODE · **Status:** NOT STARTED · **Updated:** — · **Skill:** `hv-final-check` (+ `judge-panel` and `ui-critic` agents) · Prompts **B3** (§1–4, before code freeze) and **B5** (§5–7, after it) · ✋ Team submits
> **Job:** score the project the way this event's judges will, fix only what moves the score, and submit every required item correctly and early. This is a winning audit, not a security review.
> **Inputs:** 01 §2 and §7 (rubric, rules, deliverables), 04 §14 and §17 (WOW stack, rubric map), 06 §3 (acceptance tests), 07, 08, and the live product opened cold.
> **Done when:** every criterion scored with evidence · Visual Quality Bar scored · every WOW layer verified live · at most 5 fixes chosen by gain ÷ effort · every required item ✅ with a working link · README passes the check · submitted, confirmation saved.

> **Event overrides (AI HACK × MRDU):** score §1 on the working rubric in 01 §2 (Problem 40 · Solution 30 · Innovation 20 · Pitch 10); the judge panel starts at `/app` · §2 covers `/app` only (the "3D integration" and "motion" columns only if the story is merged) · §3 lists the HERO, the top 3 and any extra that exists · **§9 is the readiness audit, run before each jury round.**

---
## OUTPUT *(Claude Code fills below)*

### 1. Judge panel
| Criterion (weight) | Score /10 | Evidence seen | Weakest point | Fix |
|---|---|---|---|---|
| — | — | — | — | — |

| Judge persona | Top objection | Our answer / fix |
|---|---|---|
| Product | — | — |
| Technical | — | — |
| Design | — | — |
| Sponsor / problem owner | — | — |
| Skeptic | — | — |
**Would each judge put us in their personal top 3? Why / why not:** —
**Presenter's-paradox check (anything weak we still show that dilutes the strong parts?):** —

### 2. Visual Quality Bar *(ui-critic; key screens + story landing; ship bar ≥ 8 each)*
| First impression | Typography | Colour + contrast | Motion quality | 3D integration | States + polish | Mobile | Performance |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

### 3. WOW stack live check
| Layer | Works on the live URL? | Fallback tested? | In the 2-minute script? |
|---|---|---|---|
| L1 | — | — | — |

### 4. Final fixes (max 5)
| Fix | Score gain | Effort | Do / Skip |
|---|---|---|---|
| — | — | — | — |

### 5. Submission checklist *(from 01 §7; each item checked in incognito)*
| Required item | Status | Link | Verified |
|---|---|---|---|
| — | — | — | — |

### 6. README check
- [ ] Name + memory line + live link + video at the top · [ ] GIF or still of the WOW · [ ] problem (1 sourced number) · [ ] what it does · [ ] how it works + sponsor tech · [ ] what's real vs mocked · [ ] AI-use disclosure if the rules ask · [ ] credits for every asset, font and model (CC-BY etc.) · [ ] run-locally steps that work · [ ] team · [ ] licence if required · [ ] commit history shows steady work (not one giant commit) · [ ] public-repo check passed (if the repo must be public)

### 7. Submission record
Submitted at: — · Confirmation: — · Final commit: — · Deployed version: — · Prize tracks entered: —

### 8. Retro (after results, 5 lines)
Result: — · What won points: — · What lost points: — · Keep: — · Change in the OS: —

### 9. Readiness audit *(prompt AUDIT with `hv-mrdu` → readiness.md §4 · run before EACH jury round · GO / NO-GO / PENDING with its time)*
| # | Check | Round 1 (22:20) | Evidence | Final (06:30) | Evidence |
|---|---|---|---|---|---|
| 1 | Hero path: 3 clean runs on the live URL, cold incognito | — | — | — | — |
| 2 | Value on screen within 30 s of starting the demo | — | — | — | — |
| 3 | The judge's own input works in scope; outside it, the product says so | — | — | — | — |
| 4 | The planned sad path works (a wrong answer caught and fixed) | — | — | — | — |
| 5 | Proof is real: eval with N, date, failures listed | — | — | — | — |
| 6 | Shown features ≤ 6, each DONE-TESTED; the rest hidden | — | — | — | — |
| 7 | Fallback model tested (step 2's local test) · the replay plays on the live URL · last-good tag + deployment noted · `CREW_MOCK` not set on Vercel | — | — | — | — |
| 8 | Backup video: real screen recording, on laptop + phone | — | — | — | — |
| 9 | Honesty table current · `ledger.py` PASS | — | — | — | — |
| 10 | Everyone passes the 60-second explain-it · presenter, driver, Q&A owners named | — | — | — | — |
| 11 | 3-minute script timed under 2:50 (+ 2-minute and 60-second cuts) · slides open · the ask is written | — | — | — | — |
| 12 | Online kit: test call on this network · one tab shared · hotspot ready | — | — | — | — |
| 13 | (Final) every submission item works in incognito | n/a | n/a | — | — |
**Incomplete right now (anything not DONE-TESTED):** — · **Cut or hidden for this round:** —
**Verdict round 1:** READY / READY WITH CUTS / NOT READY (blocker · owner · time limit · what we show instead) — · **Verdict final:** —

