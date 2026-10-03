# Hackathon workspace · rules for BOTH engines (Cowork and Claude Code)

This folder is one hackathon run with the **Hackathon Victory OS**: **AI HACK × MRDU 2K26, registered domain Agentic AI**. **Read §9–10 first: they hold this event's facts and they override any `hv-*` skill text that disagrees.** The goal is first place on the average of two jury rounds: the right problem (40% of the working rubric), one flawless hero path with proof, a genuine fresh angle, and a team that can explain every part.

- Plan files (source of truth): `plan/00`–`09` (+ numbers in `plan/data/`) · Official material: `inputs/` · Palette and type: `design/` · Raw visual assets: `assets/` · Product code: `web/` · Pitch assets: `pitch/`
- Scoreboard, read first and update last: @plan/00_MISSION_CONTROL.md
- Build contract: @plan/06_BUILD_PLAN.md

## 0. Which engine does what
| Engine | Does | Never does |
|---|---|---|
| 🧠 **COWORK** (desktop app → Cowork tab) | Steps 1–6: recon, the problem funnel, validation + gap, concept + agentic fit + scope, look, architecture + gates (files 01–06, `design/`). Standalone previews in `pitch/`. Runs the skill scripts (funnel, clock, ledger, tournament, forge, palette, deck). PITCH-1 and PITCH-2 (file 08, `pitch/`, `plan/data/eval_cases.csv`, `plan/data/claims.csv`) in parallel | Write or run app code, scaffold projects, touch `web/` |
| 🛠 **CLAUDE CODE** (desktop app → Code tab, or the `claude` terminal) | Early setup (B0, while Cowork plans), build steps 0–6 (`web/`), demo + capture pack (07, `pitch/screens/`, `pitch/renders/`), final check + submit (09) | Change the plan silently; build anything in CUT; start STRETCH before code freeze is safe |

Lanes and what they may write: **ROUND**, **ROUND-1**, **RESET**, **ROUND-FINAL** → `plan/data/rounds.md` (written on laptop B only, so the two laptops never edit it at once) · **AUDIT** → 09 §9 · **PITCH-1/2** → 08, `pitch/`, `plan/data/eval_cases.csv`, `plan/data/claims.csv` (after "PLAN PUSHED" these two CSVs are written on laptop B only). **Any prompt may edit the status column of `plan/data/gates.csv`.**

**Switch rule:** when `BUILD PLAN STATUS:` in 06 becomes **READY**, Cowork prints the box below and STOPS.
```
🛑 PLANNING DONE → MOVE TO CLAUDE CODE NOW
Code tab → Local → Select folder (this folder) → mode: Auto → paste prompt B1 from 3_PROMPTS.md
```
- If you are **Cowork** and anyone asks you to build, code or deploy the product: print that box instead. (Standalone preview pages in `pitch/` are design artifacts, not app code: allowed.)
- If you are **Claude Code** and 06 is still DRAFT: say "Planning happens in Cowork (prompts P1–P5). Reply PLAN HERE to plan in Claude Code instead." Only plan if they reply PLAN HERE. **Exceptions:** prompts **B0** (early setup, in parallel with P1: scaffold, private repo, blank deploy, default packages, no product code) and **B0-STORY** (laptop B: the idea-independent story engine on branch `story`) run while 06 is DRAFT. **SPIKE** runs outside this folder.

## 1. Every step, both engines
1. Read 00, then the step's plan file (Job, Inputs, Done when) and its inputs. Say in 2 lines: the step, its goal, the next ✋.
2. Work only on that step and inside its time box (the prompt states it). Never fill later files early. Write the output below the file's OUTPUT line, keep its header, and set Status and Updated.
3. At every ✋, show the decision in ≤ 10 lines and WAIT for **APPROVED**, **GO**, or changes.
4. Update 00 (§1 WHERE WE ARE NOW, §4 Progress, §8 Decisions), then name the next prompt and the engine it runs in. Exception: the parallel lanes (PITCH-1, PITCH-2, ROUND, ROUND-1, ROUND-FINAL, RESET, AUDIT) never touch 00; they report in chat and the builder records their status.
5. **Evidence:** web-check anything current (rules, APIs, prices, model names, versions, competitors, statistics). Label every claim: `[F]` fact with `[S#]` · `[M]` measured by us (which run, when) · `[I]` inference · `[A]` assumption · `[U]` unknown (older files write (INFERENCE), (ASSUMPTION), UNKNOWN: same meaning). **Never invent** users, market size, statistics, accuracy, impact, competitor weaknesses or findings; a competitor weakness is [F] only if a source says it or we reproduced it.
6. **Numbers:** scores, rankings, feature budgets and time left come from the skill scripts on CSVs in `plan/data/` (`funnel.py`, `tournament.py`, `forge.py`, `clock.py`, `ledger.py`), never mental arithmetic. Write CSVs with Python's `csv` module. Colours come from `palette_build.py`, never typed by eye.
7. **Originality:** the obvious AI idea is the crowded idea. Collect the team's own ideas before generating any, and use several prompting strategies (see `hv-winning-idea`).
8. **Time:** at the start of every step, first mark DONE every gate in `plan/data/gates.csv` that is already true, then run `python3 .claude/skills/hv-mrdu/scripts/clock.py plan/data/gates.csv` from the hackathon folder and paste its verdict. When a time box ends: stop researching, write `[U]` for what is open, and decide. More than 10% behind → the SHRINK ladder (§10), never the hero path.
9. If an `hv-*` skill isn't loaded, read its files directly from `.claude/skills/<skill>/` in this folder (SKILL.md, then the reference the prompt names) and carry on; tell the user once to upload the zips from MLRH/SKILLS_TO_UPLOAD.

## 2. Claude Code build session (one build step per session)
1. `git pull --rebase --autostash` (teammates push plan/08, pitch/, plan/data/). Mark true gates and run `clock.py` (§1.8). Read 00 §1, §5, §6, any new entries in `plan/data/rounds.md`, and the step in 06 §9. Say the goal, its "done when", its test gate and the time left. **Before anything new:** if the last committed state works, `git tag ok-<HHMM> && git push origin --tags`, and note the last-good deployment in 00 §10.
2. Plan briefly (plan mode for multi-file work), then build: UI → API → data/AI, against the contracts in 06 §7. Each WOW layer goes behind its flag with its fallback.
3. Prove it: section 3 plus the step's **test gate** (`hv-mrdu` → readiness.md §1). Show the evidence. After steps 1, 2 and 4 update `plan/EXPLAIN.md` (≤ 40 lines, plain words: what happens when the user presses Run, file by file; which steps are code, tool, model call, agent, human; five likely questions with answers).
4. Redeploy (`npx vercel --prod --cwd web`) → confirm the **live URL** works → mark the gate DONE in `plan/data/gates.csv` → update 00 (§1, §4, §5, §6 with status words NOT STARTED / PARTIAL / DONE-UNTESTED / DONE-TESTED, §8, §10) and the step's plan file → `git add -A && git commit -m "step N: <goal>"` → `git push` (teammates then pull the code and the status together).
5. Tell the user: "Step N done. Type /clear, then paste <next prompt>". The map: step 0 → **B2** for step 1 · step 1 → **B2** for step 2 · step 2 (MVP) → break session, then **AUDIT** at 22:20 · **never step 3 on laptop A** (it is laptop B's story lane) · step 4 only after "RESET PUSHED" → **B3** → **B4** → **B5** → **AUDIT** for the final.

## 3. Done means proven
- `(cd web && npm run build)` passes; `(cd web && npm run lint)` shows no new errors. Use the brackets so the shell stays in the hackathon folder: every other command (the event scripts, `npx vercel … --cwd web`, git) runs from there.
- UI: dev server running → Playwright MCP screenshots of each touched route at **1440×900, 768×1024 and 390×844** → compare with `plan/05_DESIGN.md` → fix → run the `ui-critic` agent → fix every P0/P1. From step 1 on, save the best screenshots to `pitch/screens/` (the pitch lane uses them).
- Scroll story (`/`): screenshots at 0 / 20 / 40 / 60 / 80 / 100% of the page (6 positions, `/?e2e=1`) match the storyboard in 05 §15; `prefers-reduced-motion` shows a still pose; no WebGL shows the poster; no console errors.
- Core loop: click through every step in 06 §2 on the **live URL**; no console errors.
- AI: run the eval set (06 §8); outputs validate against the schema; the fallback works; env vars exist on the host (Vercel), not only in `.env.local`.
- Two failed attempts with the same approach → stop, re-read the docs or error, and change approach. Never silence errors, skip type checks or delete tests.

## 4. Scope
- Build order: MUST and the HERO path → the rest of the TOP 3 → PARKED extras in forge order (04 §22) → DEPTH. STRETCH only after code freeze is safe and time-boxed. CUT and EXCLUDED are forbidden. After scope freeze 1 a new feature enters only if one of equal hours leaves (one in, one out, logged in 00 §8). Paid services or architecture changes need the team's OK.
- **Always shippable:** the demo path is never left broken at the end of a session, and the live URL always shows the last working version. Anything not DONE-TESTED stays behind its flag and is never shown in a round. No deploys between the round-1 freeze and our jury slot.
- After **code freeze** (00 §5): only bug fixes, copy, ui-critic fixes and demo hardening.

## 5. Frontend bar
- Colours and fonts only from the tokens in `web/design/` (copied from `design/`): CSS variables in `tokens.css`, mapped in `@theme inline`; three.js and canvas code read hex values from `tokens.json`. No raw hex values or ad-hoc fonts in components.
- Restyle every shadcn/ui component you use; the default library look never ships. Follow `hv-design` → `references/anti-generic-audit.md`.
- **Cinematic layer:** build it with `hv-cinematic` (starter files in `assets/react/`, recipes and gotchas in its references). 3D renders client-side only (`dynamic(..., { ssr: false })` inside a client component, one level deep). Per-frame values live in a mutable store read in `useFrame`, never in React state; mutate three.js objects through refs (the React Compiler lint rejects mutating `useMemo` values). Keep `?e2e=1` (no smooth scroll) and `?plate=1` (3D only) working.
- Motion only as specified in 05 §10 and §13–18: purposeful, animate transform/opacity (and uniforms), respect `prefers-reduced-motion`, keep the performance budget in 05 §18 (fallback poster, bloom off on slow machines).
- Every core screen has empty, loading, error and success states, and works at 390 px. Use realistic domain data, never lorem ipsum or invented numbers.

## 6. Engineering
- Check a dependency is needed and run `npm view <pkg> version` before adding it. For Next.js, read `web/AGENTS.md` and `web/node_modules/next/dist/docs/`; for other libraries, fetch the official docs.
- Secrets only in `web/.env.local` (gitignored) **and** in the host's environment settings; names in `web/.env.example`. Nothing secret on the client. Never ask the user to paste a key into the chat and never print one: the user types keys into `web/.env.local`; upload each with `grep '^NAME=' web/.env.local | cut -d= -f2- | tr -d '\r\n' | npx vercel env add NAME production --force --cwd web` (from the hackathon folder; `NAME=value` lines without quotes). Never set `CREW_MOCK` on Vercel. **Production deploys come only from laptop A's CLI:** after linking, run `npx vercel git disconnect --yes --cwd web` and never set a Root Directory (this overrides hv-build's B0 note); otherwise every push by a teammate would redeploy.
- TypeScript strict. Contracts in `web/lib/types.ts` (Zod) before any UI uses them.
- Every asset in the app has a line in `assets/LICENSES.md`; credits go in the README. Follow the prior-work and AI-use rules recorded in 01 §7 and 06 §6.
- When compacting, keep: the current step and its "done when", files changed, failing checks, decisions.

## 7. Commands *(filled in build step 0)*
Install — · Dev — · Build / lint — · Reset demo data — · Capture pack (from the hackathon folder, 3 runs into `pitch/renders`: `node .claude/skills/hv-cinematic/scripts/record_story.mjs <url> --out pitch/renders --stills --plate` → plate-*.jpg · same without `--plate` → still-*.jpg · `--video 24` → story.mp4) — · Deploy — · Rollback (1: Vercel dashboard → Deployments → last good → ⋯ → Promote to Production; 2: `git checkout ok-<HHMM> -- web`, commit, `npx vercel --prod --cwd web`; never reset or force-push) —

## 8. Tools
Skills: **`hv-mrdu`** (this event's layer: wins over the others) · **`hv-agentic`** · `hv-recon` · `hv-problem-pick` · `hv-research` · `hv-winning-idea` · `hv-design` · `hv-cinematic` · `hv-build` · `hv-demo` · `hv-pitch` · `hv-final-check` · Agents (Claude Code): `ui-critic`, `judge-panel` (read-only) · MCP (Claude Code): `playwright` (approve on first use)

## 9. This event: AI HACK × MRDU 2K26 (full intel in 01; clock plan in MLRH/5_RUN_SHEET.md)
- **How it is won:** the **average of two jury sessions** (round 1 at 00:00–01:30, final at 08:30–10:00 on 4 Oct), likely on a video call. Round 1 is half the result. Working rubric: **Problem selection (impact) 40 · Solution prototype (proof) 30 · Innovation (fresh angle) 20 · Pitch as a team (questions) 10**; the organizers also said they judge the solution, the team's understanding of the tech it chose, and the pitch. There are no domain-level criteria or prizes.
- **Problem statements:** only from the organizers' list of 100+ (own ideas are discouraged). Prompt P1 runs the `hv-mrdu` funnel over the whole list; there is no open-theme path.
- **Registered domain: Agentic AI.** Build a genuine agentic step with `hv-agentic` (plan → tools → hard checks → bounded retry → human approval, visible on screen), sized by the agentic-fit table in 04 §21. No agents for appearance: a step that fixed code or one model call can do is built that way and described that way; a borderline step is `AGENT (provisional)` until the eval decides.
- **Shape of the product:** ONE hero feature with a flawless happy path + a top 3; at most 6 features shown, all DONE-TESTED. The product and the demo start at **`/app`**. `/` redirects to `/app` (a temporary redirect) unless `NEXT_PUBLIC_STORY=1`. **PARKED extras** (only after round 1, a tag and a backup video): story landing, voice (Sarvam), batch.
- **Schedule we follow (organizer listing; gates in `plan/data/gates.csv`):** hacking ~11:30 on 3 Oct (P1 and B0 start together) · G1 problem 12:30 · G2 plan READY 14:45 · G3 skeleton 15:45 · G4 hero path on the mock 18:45 · **G5 MVP 21:45** · **G6 round-1 freeze 23:00** · jury 00:00 · G7 top 3 03:30 · **G8 code freeze 05:00** · G9 submittable 07:00 · final 08:30.
- **Prior work:** "create scalable products from scratch in just 24 hours" → **REBUILD** the hv-agentic and hv-cinematic starters from their recipes during the event; COPY only with the organizers' written OK, credited in the README. Commit from the first minute; never bring code from another hackathon. AI tools are unrestricted.
- **Two laptops:** laptop A (builder) owns `web/` and 00/06/07/09, deploys, and never edits `web/app/page.tsx`. Laptop B runs the evidence and pitch lane in Cowork in a clone that stays on `main` (08, `pitch/`, `plan/data/eval_cases.csv`, `plan/data/claims.csv`, `plan/data/rounds.md`); it never edits 00/06/07/09 or `web/`. Hand-offs are said aloud: "PLAN PUSHED" (B1), "AUDIT PUSHED", "RESET PUSHED".
- **Story landing: only with `story: yes`** (4 or more people; decided at B0). Then laptop B uses a **second clone** on branch `story` and owns `web/app/page.tsx`, `web/app/story.css`, `web/components/cinematic/**`; it proves the story locally (no Vercel access) and merges **never before round 1** (`git fetch origin && git merge origin/main` first; main's tokens win, the story's `page.tsx` wins); laptop A switches it on with prompt STORY-ON.
- **Stack defaults:** Next.js 16 + TypeScript + Tailwind · AI SDK 7 (`ai`, Node ≥ 22) with our own small crew engine (hv-agentic crew-recipe.md) · a paid primary model + a fallback from another provider · Vercel region bom1 · replays of recorded real runs. Never the retired OpenAI Assistants API.

## 10. Event overrides (these win over any `hv-*` skill text)
1. **Problem pick** uses `hv-mrdu` → funnel.md and `funnel.py` (15 criteria, 100+ statements), not hv-problem-pick's 11-criterion scorecard. hv-problem-pick's open-theme hunt is not used.
2. **Time boxes at the event:** P1 60 min · P2 30 · P3 55 · P4 20 · P5 30. A box that ends is a decision point, not a suggestion.
3. **"WOW stack" in the OS skills** reads as: L2 = the HERO feature · L4 = proof (eval + the planned sad path) · L3 = the judge's own typed input · L1/L6 (story), voice and L5 (batch) = PARKED extras. "WOW status" in 00 §6 = the features table.
4. **Design step (P4)** covers the `/app` screen, palette and type; 05's "done when" needs only the style preview. The storyboard, the motion preview and everything cinematic are made only with `story: yes`, and the story never appears in a shared-screen demo. In 04, fill §1–8, §13–15, §19 and §20–23; the limits are 6 concepts and ≤ 15 features. In 03, fill §2–6, §9–12. In 09, §2–3 cover only what exists. The judge-panel agent starts at `/app`.
5. **Tripwires** (over-scoping, superficial AI, agent theatre, weak differentiation, excessive research, unstable demo, late testing, needless architecture, cannot explain): the table in `hv-mrdu` SKILL.md. When a signal trips, take its action without debate.
6. **Engine size:** build only the steps in 06 §13. CODE and TOOL roles are plain functions; a MODEL CALL is one structured call; only AGENT steps plan or loop. hv-agentic's planner → workers → verifier → synthesizer is a menu, not a requirement.
7. **SHRINK ladder when behind (prompt E1):** parked extras → depth and the weakest of the top 3 → one input type, one scenario (hard-code and label the rest) → fewer agents (one model call + code checks) → seeded data (disclosed) → replay first. Never cut: the hero path, the hard checks, the honesty labels, the backup recording.
8. **Before each jury round:** prompt AUDIT (09 §9) and `ledger.py` PASS. A NO-GO off the hero path is cut or hidden; a NO-GO on it is the only work.
9. **Explain-it:** every teammate can say the 60-second card (06 §13) from `plan/EXPLAIN.md`. If the design is too complex to explain, simplify the design.
