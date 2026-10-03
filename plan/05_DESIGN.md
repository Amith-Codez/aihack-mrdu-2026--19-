# 05 · DESIGN (UX + LOOK + CINEMATIC LAYER)

> **Engine:** 🧠 COWORK · **Status:** DONE · GO on style preview v2 · audit P0 fixed · **Updated:** 3 Oct 2026, 15:10 · **Skills:** `hv-design` + `hv-cinematic` · Prompt **P4** · ✋ Team approves the look (style preview + motion preview)
> **Job:** decide the experience, a distinctive visual identity and the cinematic layer (the 3D object, the scroll story, the art direction) **before** any code, so the build never falls back to defaults. Judges form a visual impression in a fraction of a second, and most teams now ship the same AI-default look.
> **Inputs:** 04 (idea, WOW stack, core loop, MUSTs), 03 §2 (user), 01 §6 and §8 (winners' style, room and projector), current reference research on the web.
> **Done when:** every MUST has a screen and every key screen has its states · the judge's first 10 seconds are designed · the design concept is named and grounded in the domain · 3–6 references with principles · palette built and contrast-checked by `palette_build.py` (files in `design/`) · signature interaction specified · hero object + scroll storyboard + asset plan + art direction lock written · anti-generic audit shows 0 open hits · the team replied **GO** on `pitch/style-preview.html` AND `pitch/motion-preview.html`.

> **Event overrides (AI HACK × MRDU):** P4 is a 20-minute step for the **`/app` screen, the palette and the type**. "Done when" here means: every state of `/app` is specified · the palette passes `palette_build.py` · the team replied **GO** on `pitch/style-preview.html` · anti-generic audit P0 hits fixed. **Part C (hero object, storyboard, motion preview) is written only with `story: yes`**; otherwise write "not built at this event" there. In §1, the first screen a judge sees is `/app` with a sample case loaded, not a landing.

---
## OUTPUT *(Cowork fills below)*

*P4 started 15:01 on 3 Oct. `clock.py`: BEHIND by 0:19 h on G2 → "Cut P4 to palette plus one screen". Done that way: one screen with all its states, the palette, the type, the style preview. Reference research (§7) was skipped. Part C is the short form (`story: yes` in the prompt).*

## PART A · EXPERIENCE

### 1. Screens
| Route | Job | Primary action | MUSTs / WOW layers served |
|---|---|---|---|
| `/app` | The whole product: load a class, match the teacher's marking, mark, check, approve, prove | One at a time, by state: **Mark these six** → **Match my marking** → **Approve the scheme** → **Approve N marks** | M1–M4 · L2 hero · L3 · L4 |
| `/` | Redirects to `/app` (temporary redirect) unless `NEXT_PUBLIC_STORY=1` | — | L1/L6, after round 1 only |

### 2. Journey
| Stage | Screen state | User does | Product shows |
|---|---|---|---|
| ENTRY | Sample case loaded | Nothing: the sample class is already on screen | Question, scheme, 26 real answers, "Load another / paste your own" |
| UNDERSTAND | Same | Reads the scheme line | Whose marking will be used: "yours" |
| ACT | Mark six | Types six marks (or keeps the sample teacher's) | Six answer cards with mark boxes |
| TRANSFORM | Running | Presses Match my marking | Round cards "3 of 6 → 5 of 6 → 6 of 6", the scheme note changed; then marking progress "14 / 20" |
| VERIFY | Check results | Reads the quoted lines; presses Break it | Check chips; a rejected mark in a red-bordered card |
| RESULT | Answer + approval + proof | Edits a mark, approves | Marks table, class total, proof strip |

### 3. Key screen
**`/app`** · Job: mark a class the teacher's way, with proof · Primary action: the one button for the current state
```
┌ MARKMATCH ── Sample class: Data structures Q7 · 26 answers (Mohler, CC-BY) ── [Paste your own] ┐
├ STEPS (rail) ──────────┬ QUESTION + SCHEME (red margin rule) ───────┬ APPROVE ────────────────┤
│ [CODE]  Split 26   ✓   │ What is the main disadvantage of ...?      │ Nothing is final until  │
│ [HUMAN] You marked 6 ✓ │ Your scheme: extra space (5) · harder ...  │ you approve.            │
│ [AGENT] Match my       ├ ANSWER CARDS ◄ FOCAL POINT ────────────────┤ [Approve 26 marks][Edit]│
│   marking              │ STUDENT 08                           5/5   ├ PROOF ──────────────────┤
│   Round 1    3 of 6    │ "...▓require more space per node▓..."      │ humans agree   56.8%    │
│   Round 2    5 of 6    │ criterion ........................... 5    │ within one     78.0%    │
│  ▓Round 3    6 of 6▓   │ ✓ Quote found   ✓ Marks add up             │ tool vs you   X of N    │
│ [MODEL] Marking 14/20  ├─────────────────────────────────────────────┤ 12 s · 21 calls · ₹—   │
│ [CODE]  Checks         │ ✗ MARK THROWN OUT · STUDENT 16 (red border) ├ [Break it] [Play        │
│ [HUMAN] You approve    │ quote not in this answer → asked again      │  recorded run]          │
└────────────────────────┴─────────────────────────────────────────────┴─────────────────────────┘
```
| State | What is on screen |
|---|---|
| **Sample case loaded** (first paint, never empty) | Question, scheme, 26 answer cards unmarked, six mark boxes filled with the sample teacher's marks, button **Match my marking**. Steps rail all "waiting" |
| **Running** | Named steps in the rail, each with its role badge and a word (waiting · running · done · failed). Round cards appear one by one from real events; then "Marking the other 20… 14 / 20". No spinner, no fake typing |
| **Check results** | On every answer card: the highlighted quote, criterion rows, two chips with icon + words. A failed check: red-bordered card, "✗ Mark thrown out", the reason in plain words, "attempt 2" when re-asked |
| **Answer + approval** | Marks table (student · mark · edited?), class total, **Approve N marks** and **Edit**. After approval: "Approved 15:42 · 2 marks edited by you" |
| **Proof strip** | Human–human 56.8% / 78.0% [M] · "tool vs you on unseen answers: X of N, before → after" from `eval-results.json` with its date · seconds, calls, cost for this run · a "Recorded real run · date" badge in replay |
| **Error with replay** | "Model not reachable. Nothing was marked." + **Play recorded run**. Never a blank card |
Mobile (390 px): the three columns stack in the order question → steps → answers → approve → proof.

### 4. Judge's first 10 seconds at the URL
A light page headed by a real exam question and real student answers; one yellow-highlighted line; one button, **Match my marking**. No login, no landing, no empty dashboard.

### 5. Words
Tone: a careful colleague; sentence case; no marketing words inside the product · User terms: mark, marking scheme, answer, class, approve (never "calibrate", "rubric engine", "pipeline", "agent run") · Button verbs: Match my marking · Approve the scheme · Approve 26 marks · Edit · Break it · Play recorded run.

## PART B · LOOK

### 6. Design concept
Name: **Examiner's margin, loud** (v2, 3 Oct: the lead asked for a Gen-Z look that still fits the project) · One sentence: the screen is an answer script on a desk, drawn like a sticker sheet: ruled paper with a red margin line, thick ink outlines with hard offset shadows, marks circled in red pen handwriting, rubber stamps for CHECKED and THROWN OUT, and a yellow highlighter on the line that earned the mark · 3 attributes: loud, legible, in the teacher's hand · Drawn from: ruled answer booklets, the margin marks column, blue ballpoint, the examiner's red pen, a highlighter, the marks register.

### 7. References
Skipped: P4 was cut to palette plus one screen because G2 was already late. **Anti-references (what we are deliberately not):** the purple-gradient AI dashboard with stat tiles and a chat box; an upload screen followed by an analytics dashboard (the look of the three look-alike builds in 02 P50 [I: from their descriptions, not their screenshots]).

### 8. Tokens *(`design/spec.json` → `palette_build.py` → `design/tokens.css`, `design/tokens.json`, `design/palette-preview.html`)*
Brand hue 262 (blue ink, chroma raised to 0.19 in v2) · Signal hue 92 (highlighter) · Neutral tint 0.012 toward the ink · Themes built: light only (shared tab on a video call) · Contrast report: **ALL PASS**; body text 16.78:1 on the background (target 7:1)
| Role | Light hex | Use |
|---|---|---|
| background / surface / surface-2 | #f7faff / #ffffff / #ecf0f8 | Page, cards, round rows |
| foreground / muted-foreground | #161a20 / #454f5f | Text; secondary text (now also ≥ 7:1 after the audit) |
| primary / primary-foreground | #2d69de / #fafcff | The one action button per state |
| signal / signal-soft | #a98800 / #faecc2 | The quoted evidence, the winning round, one sticker |
| danger · success · warning · info | #a83630 · #007835 · #974c00 · #006d91 | Margin rule and thrown-out marks · passed checks · — · — |
| chart 1–6 | #507ed3 #b35c9e #c65959 #957f00 #499442 #008faa | The mistake-map bars after round 1 |

| Type role | Family | Source + licence | Weights | Why |
|---|---|---|---|---|
| Display | Bricolage Grotesque | Google Fonts · SIL OFL 1.1 [A: licence from memory; confirm on the font page before the README credit] | 700, 800 | Loud and current; big numbers |
| Handwriting | Caveat | Google Fonts · SIL OFL 1.1 [A, same] | 700 | The teacher's red pen: circled marks and one margin note. Never for body text |
| Text | IBM Plex Sans | Google Fonts · SIL OFL 1.1 [A, same] | 400, 500, 600 | Plain, wide, clear at video-call compression |
| Numbers / mono | IBM Plex Mono | Google Fonts · SIL OFL 1.1 [A, same] | 500, 600 | Every mark and count lines up; badges |
Type scale: 15 / 18 body / 21 answers / 26 / 44 numbers / 54 circled marks / 64 headline · Spacing: 4-px grid · Radius: 12 px cards and buttons, 6 px badges, a pill only for the one sticker · Borders: 2.5 px ink outlines with a hard 6 px offset shadow (no blur; survives video compression) · Icons: ✓ ✗ ⚠ as text with a word beside them · Colour patterning: ruled paper lines and one red margin line down the page (flat colours, no gradients).

### 9. Component rules
| Component | Our treatment |
|---|---|
| Button | One filled blue button per state with a hard shadow that presses in; the rest white. Label says exactly what happens |
| Card | White, 2.5 px ink outline, hard ink shadow. The question card has a blue shadow; a thrown-out mark has a red outline, red shadow and a THROWN OUT stamp |
| Stamp | Rotated outlined label on the card corner: CHECKED ✓ (green), THROWN OUT ✗ (red). Always with its word |
| Sticker | One only, in the header ("receipts for every mark ✓"). No slang inside the product's own labels and buttons |
| Role badge | Mono capitals in an ink outline; **AGENT** alone is filled, so the one agentic step is visible at a glance |
| Quote | `<mark>` in highlighter yellow with a darker underline; the only place the signal colour appears besides the winning round |
| Marks | Caveat, 54 px, red, circled and tilted, top right of the answer card, like a teacher's mark. Counts stay in mono |
| Status | Always icon + word; never colour alone |

### 10. Motion and the signature interaction
Motion principles: state changes only, ≤ 250 ms, nothing loops; `prefers-reduced-motion` gets instant changes · **Signature interaction:** Purpose: show the tool closing the gap to the teacher · Trigger: each real round event · Behaviour: a round row appears with its count; the row that reaches the teacher's marks turns highlighter yellow and the red-pen note "matches you now!" appears · Tech: CSS class change on a real event, no timers · Budget: none needed · Reduced motion: same, without the fade · Demo second: by 60 s. **Nothing in the demo depends on smooth animation.**

### 11. Quality floor
Body text ≥ 7:1 (16.78:1 measured by the script) · visible 3 px focus ring · the whole loop works by keyboard · reduced motion respected · works at 390 px · readable at 125% zoom in a shared tab.

### 12. Anti-generic audit
Run 3 Oct 15:25 after the team's GO, on the v2 preview. P0 = breaks the demo conditions or honesty; only P0 is fixed now.
| Check | Hit? | Fix |
|---|---|---|
| Contrast for the demo condition "7:1 text" | ❌ **P0**: secondary text was 5.2:1 | **Fixed:** `muted_target` raised to 7.0 in `design/spec.json`, palette re-run, ALL PASS, preview updated |
| Real seed data, no fake numbers | ❌ **P0 risk**: the preview's "3 of 6 → 6 of 6" and the tool's marks are placeholders | **Fixed by rule:** labelled on the preview; in the app these come only from real events, and the preview is never used as a screenshot in the deck |
| Exactly one bold element, the rest disciplined | ❌ P1 (the lead asked for a loud look) | Not fixed now. In the build keep the loud devices to four: hard shadows, circled red-pen marks, stamps, one sticker. Nothing else gets decoration |
| Single-word accent in the headline ("you") | ❌ P2 | Kept on purpose: the highlighter is the concept's evidence mark and "you" is the teacher as the standard. Used once |
| Mono capitals labels on cards | ❌ P2 | Kept: they carry real information (question number, student number) |
| Concept named and traceable to the domain · faces chosen for the concept · neutrals tinted · semantic colours distinct · no decorative gradients · status never colour alone · CTAs name the action · no buzzwords · no emoji icons · no fake social proof | ✅ | — |
| Motion: one orchestrated moment; reduced motion honoured | ✅ (specified; checked again on screenshots in the build) | — |

**Style preview file:** `pitch/style-preview.html` (v2 rendered and checked at 1440 px: fonts load, no horizontal overflow; palette re-run, ALL PASS, body text still 16.78:1) · Team verdict: **GO** (v2, "sounds good and perfect", 3 Oct 15:22)

## PART C · CINEMATIC LAYER *(`story: yes` · short form · hv-cinematic defaults · no motion preview)*
**Rules that still hold (CLAUDE.md §9):** the story is built on laptop B in a second clone on branch `story`, proved locally, **merged never before round 1**, switched on by laptop A with STORY-ON, and never appears in a shared-screen demo. It needs a named person who is not on the evidence and pitch lane: **nobody is assigned yet [U]**.

### 13. Theme per surface
Story landing: dark stage (ink #161a20) with ≥ 7:1 text · Product UI: light · Slides: light · Why: the product is read over a video call; the landing is seen in person or in the recorded video.

### 14. Hero object and technique
Domain object: **a stack of answer scripts** held by a red margin rule · On scroll: the stack fans open, one sheet lifts out, one line on it lights up in highlighter yellow · Technique: procedural (thin boxes for sheets, a plane with a line texture); no model file, nothing to license · Particle shapes: loose marks → two unequal piles ("21" and "15") → six ticks → the product mark.

### 15. Scroll storyboard
| Chapter | Copy (headline) | Object state | Particles | Colour mood | Camera | Height |
|---|---|---|---|---|---|---|
| 0 hero | It marks the way you mark | Stack closed, slow turn | Hidden | Calm ink | Wide | 100vh |
| 1 problem | Sixty scripts. One evening | Stack grows taller | — | Red margin tint | Low | 118vh |
| 2 insight | Same answers. 21, then 15 | Stack splits in two | Two unequal piles | Alert | Closer | 118vh |
| 3 how | Mark six. It learns your marking | One sheet lifts; six ticks land | Six ticks | Highlighter warm | Close on the sheet | 118vh |
| 4 hero feature | Every mark shows its line | A line on the sheet lights up | Stream to the line | Yellow on ink | Pinned | pinned rail |
| 5 proof | Two humans agree 57% of the time. Here is ours | Sheets settle into a column | A bar of counts | Calm | Pulls back | 118vh |
| 6 close | You approve. Always | Stack closes, red rule on top | The product mark | Ink | Wide | 165vh |
The number in chapter 5 is 56.8% [M]; "ours" is filled only from the real eval.

### 16. Asset plan
| Asset | Source | Licence + credit | Owner | Status |
|---|---|---|---|---|
| Sheets, margin rule, highlight | Procedural, our code | Ours | [U] | Not started |
| Fonts | Google Fonts | SIL OFL 1.1 [A] | — | Chosen |
| Student answers and human marks | Mohler ASAG dataset | CC-BY-4.0, credit Mohler, Bunescu and Mihalcea (2011) | — | Downloaded |

### 17. Art direction lock
Palette hexes: #161a20 ink · #416dc1 blue ink · #f8edc9 / #a98800 highlighter · #a83630 margin red · #f7faff paper · Lighting: one soft key from above left, like a desk lamp · Materials: matte paper, no gloss, no glass · Camera: 50 mm feel, low and close to the desk · Mood words: quiet, exact, late evening · Forbidden: robots, brains, glowing networks, purple gradients, stock classroom photos · Image prompt stem: "matte paper answer scripts on a dark desk, a red margin rule, one line highlighted in yellow, soft desk-lamp light".

### 18. Motion preview and budget
Not made (not asked for). Budget when built: ≤ 6k particles · dpr ≤ 1.5 · bloom off under 40 fps · poster image, reduced-motion still and a no-WebGL message as fallbacks.
