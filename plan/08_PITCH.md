# 08 · PITCH

> **Engine:** 🧠 COWORK (runs in parallel while Claude Code builds) · **Status:** NOT STARTED · **Updated:** — · **Skills:** `hv-pitch` + `hv-mrdu` → `references/rounds-pitch.md` (3-minute structure, two rounds, Q&A, claims ledger) · Prompts **PITCH-1** (right after the switch: story, Q&A, script, submission text, deck draft) and **PITCH-2** (after the capture pack: final visuals, QA, PDF, submission video)
> **Rule while Claude Code is building:** in this step Cowork writes ONLY this file, the `pitch/` folder, `plan/data/eval_cases.csv` and `plan/data/claims.csv`. It never touches `web/`, `00`, `06`, `07` or `09`.
> **Job:** a story judges can follow in one pass and repeat when they deliberate: a concrete problem → insight → live product → why it's different → proof → the memory line. Plus a deck that looks like the product (same palette, fonts and 3D renders), the video script, the Q&A bank and the submission text.
> **Inputs:** 04 (idea, WOW stack, rubric map, memory line), 03 §4 and §7 (facts, user quotes), 01 §2–7 (rubric, judges, sponsors, prizes, templates), 05 §8 and §17 (tokens, art direction), `pitch/renders/` and `pitch/screens/` (real stills, clean plates, loops, screenshots from Claude Code).
> **Done when:** eval cases and claims ledger written (`plan/data/eval_cases.csv`, `plan/data/claims.csv`; `ledger.py` PASS) · the 3-minute spine mapped to the working rubric · a round-1 deck (≤ 6 slides) by 22:30 and the final deck by 07:00, each visually checked · ≥ 16 Q&A answers with an owner per topic · mock Q&A done · submission text drafted.

---
## OUTPUT *(Cowork fills below)*

### 1. Constraints
Pitch length: — · Slide cap / mandated template: — · Q&A length: — · Presenters: — · Video limit: — · Presenting laptop has our fonts? —

### 2. Story spine
*The 3-minute order for this event: Hook 0:30 → Who and why 0:30 → Live demo 1:15 → How it works 0:30 → Ask 0:15 (the table below feeds it; keep only what fits).*
| Beat | Line | Rubric criterion | WOW layer |
|---|---|---|---|
| Hook | — | — | L1 |
| Problem (concrete person + one sourced number) | — | — | — |
| Why current ways fail | — | — | — |
| Insight | — | — | — |
| Product (live demo → see 07) | — | — | L2–L3 |
| How it works (+ sponsor tech named) | — | — | — |
| Why different | — | — | — |
| Proof | — | — | L4 |
| Scale / impact | — | — | L5 |
| Close (memory line) | — | — | L6 |

### 3. Slides *(archetypes from deck-design.md; one idea per slide; headline = a full sentence)*
| # | Archetype | Headline | Visual (render / plate / screenshot / loop) | Source | Speaker line | Seconds |
|---|---|---|---|---|---|---|
| 1 | cover | — | — | — | — | — |
Deck: `pitch/deck.pptx` (+ `pitch/deck.pdf`) · built with: Slides artifact / `build_deck.js` / organizer template · Visual QA: — slides checked, issues fixed: —

### 4. Business pack *(only if the rubric scores viability, market or scale)*
Who pays and why: — · Price / cost model: — · Market size (sourced, bottom-up): — · Go-to-market (first 100 users): — · Competitor matrix: —

### 5. Q&A bank
| Likely question | 20-second answer | Proof |
|---|---|---|
| — | — | — |

### 6. Video script and edit plan (if required; judges often watch only the first 3 minutes · the pitch lead records the live URL and edits)
| Seconds | Screen (story loop / live product / proof) | Clip source | Voice-over |
|---|---|---|---|
| 0–10 | — | — | — |
Recorder: — · Editor: — · Captions: — · Music + licence: — · Length vs limit: — · Uploaded to: — · Plays in incognito: —

### 7. Mock Q&A result
Questions asked: — · Weak answers → improved to: —

### 8. Submission text draft
Title: — · Tagline: — · Description (problem · what it does · how · tech · what's real) · AI-use disclosure (if required) · Credits (assets, fonts, models): — · Tracks / prizes applied to: —

### 9. Evidence pack *(written first, right after the switch: the builder needs the cases for the eval in step 2)*
- **Eval cases** → `plan/data/eval_cases.csv` (`id,input,expected,source,kind`): 10–20 **real** cases with a checkable expected result and where each came from; `kind` = clean or tricky. Count: — · Sources: —
- **Claims ledger** → `plan/data/claims.csv` (`id,claim,label,source,used_in`): every number and claim we will say, show or write. `python3 .claude/skills/hv-mrdu/scripts/ledger.py plan/data/claims.csv` → — (must be PASS before each round)
- **Never on a slide:** anything labelled [I], [A] or [U]. Accuracy is always "X of N cases, from <source>, on <date>; these k failed".

### 10. Round kits *(3 minutes unless told otherwise; presenter chosen by audition, not by rank)*
| | Round 1 (00:00) | Final (08:30) |
|---|---|---|
| Presenter · driver | — · — | — · — |
| Hook (0:30) | — | — |
| Who and why (0:30) | — | — |
| Live demo (1:15): happy path → the one planned sad path | — | — |
| How it works (0:30): canvas, what is code / tool / model / agent / human, the measured number | — | — |
| Ask (0:15) | A question for the jury: — | "At midnight you asked for —. Here it is." + — |
| Slides (≤ 6) | — | — |
**Q&A owners:** the problem and the users — · how it works — · data and evidence — · what comes next —

