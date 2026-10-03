# 07 · DEMO

> **Engine:** 🛠 CLAUDE CODE · **Status:** NOT STARTED · **Updated:** — · **Skills:** `hv-demo` + `hv-mrdu` → `references/rounds-pitch.md` (3-minute structure, online kit) · Prompt **B4** (the round-1 version of the script is written by ROUND-1 into `plan/data/rounds.md`)
> **Job:** make the live demo impossible to break and easy to follow, in person or over a video call: value on screen within 30 seconds, the hero path flawless, one planned sad path caught and fixed, proof it's real, and one specific ask at the end.
> **Inputs:** 04 §14 and §17–18 (WOW stack, rubric map, demo spine), 06 §2 and §8 (core loop, demo safety), 01 §2 and §8 (judging format, room), the live product.
> **Done when:** the 3-minute script (plus 5-minute and 2-minute variants) fits its limit with a 10% buffer · every step has a fallback · demo safety all ✅ · backup video (a real screen recording) saved on the laptop and a phone · online kit checked · 3 clean timed rehearsals logged.

---
## OUTPUT *(Claude Code fills below)*

### 1. Format and limits
Judging format: — · Live demo length: — · Video limit: — · Presenters: — · Driver (hands on the laptop): —

### 2. Demo script
| # | Time | Action on screen | Judge sees | We say (≤ 2 sentences) | WOW layer | If it fails |
|---|---|---|---|---|---|---|
| 1 | 0:00 | `/app` is already open with the sample case loaded; the presenter gives the hook (one person, one number) | the product, ready | hook line | — | deck slide 1 |
| 2 | 1:00 | Press Run on the hero case | the result within 30 s | what it just did | HERO | `/app?replay=<slug>` |
| 3 | — | — | — | — | — | — |
| last | 2:45 | The result stays on screen | the measured number | the memory line + **one specific ask** | — | the closing slide |

**5-minute version (adds: the judge's own input · the eval card · the other top-3 features):** —
**2-minute version:** —
**60-second emergency version:** —

### 3. Demo safety
- [ ] **Online kit:** share ONE browser tab (not the screen) · window ≈ 1280×720, zoom 125–150% · other tabs closed · test call on this network done · second laptop in the call, muted · earphones with a mic · backup video as a local file
- [ ] Seed + one-click reset · [ ] DEMO_MODE with cached REAL results · [ ] timeouts with graceful states
- [ ] Every WOW layer: flag works, fallback rehearsed · [ ] judge-participation kit ready (QR / phone / sample input)
- [ ] Live URL works logged-out on a phone · [ ] env vars set on the host · [ ] last good deployment noted in 00 §10
- [ ] Presenting laptop: browser hardware acceleration ON, 3D runs smoothly, charger plugged in (low-power mode throttles WebGL)
- [ ] Local production build runs offline · [ ] backup video on laptop + phone · [ ] inputs ready to paste
- [ ] Clean browser profile, zoom 125–150%, notifications off (Focus / Do Not Disturb) · [ ] hotspot + second device ready
- [ ] Projector test done: mirror display, text readable from the back, dark scenes not crushed

### 4. Capture pack and backup video *(product screenshots always; the story recorder `.claude/skills/hv-cinematic/scripts/record_story.mjs` only if the story landing is merged; commit + push at once for PITCH-2)*
Stills `still-*.jpg` (4K): — · Clean plates `plate-*.jpg`: — · `story.mp4` (scroll loop): — · Product screenshots in `pitch/screens/`: — · Pushed: —
Backup video 1 (after the MVP gate, before round 1): — · Backup video 2 of the final demo path (1080p, a real screen recording, ≤ 90 s): — · On the laptop + a phone: — · Submission video: the pitch lead's (08 §6), link: —

### 5. Table / stall setup (expo judging)
Title card + QR to the live URL: — · 30 s looping `story.mp4` on a second screen: — · Laptop resting on the demo start screen: — · Judge-participation prop (phone / QR / sample): —

### 6. Rehearsal log
| Run | Time | What broke / felt weak | Fixed? |
|---|---|---|---|
| 1 | — | — | — |
