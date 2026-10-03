# 01 · RECON (arrive already ahead)

> **Engine:** 🧠 COWORK · **Status:** DONE (pre-filled 30 Sep 2026; **refreshed 2 Oct 2026** with the pre-event meeting, the speaker's deck and a re-check of the listing) · **Updated:** 2 Oct 2026 · **Skill:** `hv-recon` · Prompt **R-REFRESH** (the full recon R was done on 30 Sep)
> **When:** as soon as you register, and again the day before. If the problems are revealed at the start, finish everything here **before** the clock starts.
> **Job:** know the battlefield before the problems arrive: the event type, what judges reward and how they score, who judges and what gets into their top 3, what sponsors want, which prizes to target, what past winners built **and how they looked and presented**, what the rules forbid, and whether the team's kit is ready.
> **Inputs:** event page(s), rules, FAQ, sponsor pages, past editions (winners' galleries, repos, videos, decks, LinkedIn posts), anything in `inputs/`, the team card.
> **Done when:** event archetype chosen · rubric decoded (or archetype rubric if unpublished) · judges and sponsors mapped · prize map chosen · past winners studied (build **and** style) · rules extracted (incl. prior-work and AI-use rules) · logistics known · readiness kit all ✅ · 00 §2–3 filled.

---
## OUTPUT *(Cowork fills below)*

**Labels:** [F] fact we read, with its source · [I] inference · [A] assumption · [U] unknown.
**What changed on 2 Oct (read this first):** (1) statements come from a provided list of 100+ and own ideas are discouraged [F, S15]; (2) the winner is the **average of two jury sessions**, possibly more, likely online [F, S15]; (3) no domain-level criteria or prizes: teams are judged on the solution, their understanding of the tech they chose, and the pitch [F, S15]; (4) the speaker's deck weights **problem 40 · solution 30 · innovation 20 · pitch 10** [F, S16]; (5) teams of 5 are strongly advised [F, S15]; (6) 695 of 1,000 seats sold, booking closes 3 Oct 12:00 [F, S3]. The earlier targets "Agentic AI Logic Champion" and "Best Pitch" came only from the template website and are dropped.

**Source reliability:** the organizers' own words in the pre-event meeting [S15] and the session deck [S16] rank highest, though S15 reached us as a teammate's summary, so its wording is second-hand. The poster [S1] and the organizer's Student Tribe listing + its API record [S2, S3] agree with each other: trust them. mrhack.in [S4–S7] is built on a website template: placeholder partner names (TechCorp, NeuralNet, CloudScale…), a timeline dated 2025, "Team size 2–4" on its home page, and 404 pages for sponsors, terms, code of conduct and privacy. Treat mrhack.in details as **UNVERIFIED** unless S1–S3 confirm them.

### 1. Event facts *(FACT = quoted with source)*
| Fact | Value | Source |
|---|---|---|
| Event | AI HACK × MRDU 2K26, "24HRS Hackathon", "Innovate Beyond Tomorrow" | S1, S2 |
| Organizer | Department of CSE-AIML, School of Computer Science and Engineering, Malla Reddy (MR) Deemed to be University | S1, S2 |
| Event type (archetype) | **Live · problems chosen from a provided list of 100+** (own ideas discouraged) · **two jury rounds, averaged** | S15, S2 |
| Dates | 3–4 Oct 2026 | S1, S2, S3 |
| Venue | MRDU main campus, Maisammaguda, Dhulapally (via Kompally), Medchal-Malkajgiri, Hyderabad 500100 | S2, S7 |
| Team size | 2–5 members (poster, listing, API). **The organizers strongly advise 5; they said teams of 3 will struggle** | S1–S3, S15 |
| Fee | ₹469 per member (+5% booking fee on Student Tribe) | S1, S3 |
| Registration | Student Tribe. Each member picks "Name of the Domain": Agentic AI / UI/UX / Web Development / Vibe Coding. No idea or abstract field. 398 of 1,000 seats sold on 30 Sep; **695 on 2 Oct; booking closes 3 Oct 12:00 IST**, one ticket per booking (a new member books separately) | S3 |
| Domains | UI/UX Design · Web Development · Vibe Coding · Agentic AI (S1, S2). **No domain-level criteria or prizes** (S15); the website's "judged independently by domain specialists" is template copy. A UI/UX team still needs a minimal working frontend (S15) | S1, S2, S15 |
| **Our domain: Agentic AI** | "Deploy autonomous systems with self-correcting logic. Build workflows where multiple LLM agents coordinate to complete complex tasks." Home page: "Design autonomous agents that plan, act, and adapt without a human in every loop." Difficulty EXPERT, 16 open slots (Vibe Coding 40, Web Dev 32, UI/UX 24) per the template website: UNVERIFIED. Toolkit listed: LangChain, AutoGen, CrewAI, OpenAI Assistants API | S4, S5 |
| Scale | "500+ participants", "50+ elite teams" (template claims); 398 paid registrations on 30 Sep | S4, S3 |
| Mentors | "50+ industry-leading engineers from corporate sponsors, core university research fellows, and tech leaders specialized in Large Language Models" | S6 |
| Benefits | Prize pool up to ₹2,00,000; stipend-based internships for winners; certificates; JetBrains Student Pack; Postman access + goodies; Udemy/EdXcellence offers; 55% off a 1% AI Learners cohort; cultural night, bonfire, food, stalls | S1, S2 |
| Format: rounds | Organizer listing (unchanged on 2 Oct): **First Round Jury Evaluation 00:00–01:30 (4 Oct)**, **Final Round Evaluation 08:30–10:00**, prizes 10:00–11:00. **The winner is the average of two jury sessions, possibly more; the sessions are likely online (not final)** | S2, S15 |
| Problem statements | **A provided list of 100+**; a community member explains the statements, the platform and registration in a voice call. The list itself, the platform's name and whether statements are tied to domains are **[U]** on 2 Oct | S15, S17 |
| AI tools | No restrictions | S15 |

### 2. Rubric (the working rubric until a jury sheet is shown)
**No official sheet is published [U].** Two pieces of evidence from the organizers' side:
- The pre-event meeting: teams are judged on **the solution, their understanding of the tech they chose, and the pitch**; there are **no domain-level criteria** [F, S15].
- The speaker's deck, slide "Decoding Evaluation Secret": **Problem 40% (selection · impact) · Solution 30% (prototype · proof) · Innovation 20% (unique angle · fresh) · Pitch 10% (as a team · questions)** [F, S16]. That the jury's sheet matches this slide is **[I]**; `funnel.py` therefore also tests every choice under two other weightings.

| Criterion (working) | Weight | What judges will actually check | What we must SHOW (build · demo · pitch) |
|---|---|---|---|
| **Problem selection · impact** | 40 | Is it a real pain for a nameable person? Can they repeat it in one sentence? Why this one? | One person, one sourced number, how they cope today; the comparison record (02 §4); the measured before/after |
| **Solution prototype · proof** | 30 | Does it work, live, on an input they choose? Is the core real? | A flawless hero path on the live URL; the judge's own input; a planned sad path caught and fixed; eval numbers with failures listed |
| **Innovation · unique angle** | 20 | "Have I seen this five times today?" | The gap sentence and three "only we show this" proofs (03 §12); a genuine agentic step, with the rest honestly plain code (04 §21) |
| **Pitch as a team · questions** | 10 | Can every member explain the tech and answer? | The 3-minute structure; Q&A owners; the explain-it drill; no claim without a source |
Indian rubrics we could read weight the same things similarly: TCET's SIH 2026 internal round gives problem understanding and impact 25, innovation and technical excellence 30, feasibility 25, presentation 20 [S18]; IIT Delhi InnovateX gives 25 each to innovation, feasibility, impact and presentation [S19].

### 3. Judges map *(public facts only, written so you'd be happy for that judge to read it: a public repo exposes plan/)*
No judge names were published by 2 Oct 2026 [U]. By role:
| Judge | Role / company | Taste | What gets a project into their top 3 | What to show them |
|---|---|---|---|---|
| Jury, round 1 (00:00) | Unknown; likely faculty and industry mentors [I] | Problem sense + does it work | A problem they can repeat, a working hero path at midnight, honest scope | The full 3-minute pitch of what is DONE-TESTED; end with one question for them (hv-mrdu → rounds-pitch.md) |
| Jury, final (08:30) | Possibly the same people [U] | The same, plus progress since their last note | Their suggestion, built; proof numbers; every member answering | The pitch + "at midnight you asked for X: here it is" |
| Speaker: Sree Keerthana | Gave the pre-event session; may visit the college [S15]. Role at the event [U] | Her deck: clear thinking, one hero feature, a flawless happy path, a human story | A team that followed the playbook she taught | Canvas on one slide; hook with one person; the ask |
| Mentors (all night) | Unnamed | Varies | Teams that ask one precise question | Prompt ROUND before and after each visit |

### 4. Sponsors and their tech
| Sponsor | Product / API | Newest feature (date) | Free access / credits | How it could be CENTRAL (not decorative) |
|---|---|---|---|---|
| **Sarvam** (partner on the poster) | Indian-language AI: STT `saaras:v4`/`v3`, TTS `bulbul:v3` (incl. te-IN, hi-IN), LLM `sarvam-105b`, translation | Voice Cloning and Dubbing APIs (26 Sep 2026) | ₹100 free credit on sign-up (check the dashboard); starter limits: LLM 40 RPM, TTS 30 RPM | A PARKED extra at this event: voice in Telugu/Hindi only after the MVP is live, tagged and recorded (hv-agentic voice-sarvam.md); on a video call it is shown as a recorded clip |
| JetBrains · Postman · Udemy · EdXcellence · 1% AI Learners | Perks and learning offers (not tech we need) | — | Student pack / discounts | None in the product; don't force them |
| Student Tribe | Ticketing partner | — | — | — |
| Red Bull | Drinks at midnight | — | — | — |
| The 1% School · Trizen · COPEX · LinkedInspire · Sharp Brands (+2 unidentified logos) | Could not be identified reliably (S1) | — | — | — |

### 5. Prize map *(2 Oct: the organizers said there are no domain-level prizes; the split below is from the template website and stays UNVERIFIED)*
| Prize | Criteria | Competition level | Fit with our strengths | Target? |
|---|---|---|---|---|
| Main: 1st ₹50,000 + guaranteed 3-month internship + certificate (website) | "Supreme execution across design, development, and systems logic" | All domains (~100–200 teams INFERENCE) | The right problem, a flawless working prototype with proof, a fresh angle, a team that can explain it | **YES** |
| 2nd ₹30,000 + incubator seat · 3rd ₹20,000 (website) | "Architectural rigor and refined pipeline integration" · "capability, speed, and clean code" | Same | Same | (falls out of the main target) |
| Agentic AI Logic Champion ₹10,000 (website only) | "The most self-correcting multi-agent orchestration loop" | The organizers said there are no domain-level prizes [S15] | — | No (unverified) |
| Special track: Best Pitch ₹10,000 (website only) | "Defends its system with the sharpest technical narrative" | Unverified | — | No (unverified) |
| UI/UX · Vibe Coding champions (website only) | The organizers said there are no domain-level prizes [S15] | — | — | No (unverified) |
**Decision (2 Oct): target overall 1st on the average of the two jury rounds.** The domain and pitch awards above appear only on the template website and contradict what the organizers said in the meeting [S15]; we don't plan for them. The ₹2,00,000 pool is confirmed by S1–S2.

### 6. What won before *(this event's past editions, or its closest equivalent)*
No earlier edition of AI HACK × MRDU and no published winners of MRDU's other 2026 hackathons were found (searches 30 Sep 2026).
| Year / event | Winner | What it did | Its WOW moments | Look & presentation style (UI, deck, video) | Why it likely won | Lesson for us |
|---|---|---|---|---|---|---|
| HakITxMRDU'26 Open Innovation + TechFusion, MRDU, Aug 2026 [S8, S9] | Not published | 24 h, teams 2–4, "no predefined problem statements" | — | TechFusion judged innovation, problem identification, technical implementation, functionality, UI/UX, scalability, feasibility, presentation, impact | — | MRDU runs open-innovation formats; judges score a full product, not just an idea |
| GDG Hyderabad Agentathon at Malla Reddy University, Dec 2025 [S14] | Not found | Agentic problem statements: Government/Public sector and MSME/Business | — | Judged by Google Developer Experts | — | Local agentic themes: public services and small businesses |
| Google ADK Hackathon 2025: SalesShortcut [S13] | 1st | 34 agents (sequential, parallel, loop) with real tools and a live dashboard for human oversight | Live multi-agent dashboard | Architecture diagram + 3-min video | End-to-end agentic workflow with real tools | Make the orchestration visible and real |
| Gemini 3 Hackathon 2026: Globot [S13] | 1st | 5 agents incl. an adversarial agent that red-teams each decision; humans approve critical ones | Streamed reasoning logs, token use, a 3D globe | Polished UI with 3D | Self-checking + human approval + visible traces | Checker + approval + trace = what judges reward |
| Google Cloud Agentic AI Day India 2025 [S13] | Winners | Teacher aid in 22+ languages, voice farming assistant, crowd safety | Indian languages, voice | — | Practical for Indian users | Voice in Telugu is a strong local edge |
**Patterns across winners:** real multi-agent orchestration with tools; a visible trace; self-checking and human approval; measured results; practical Indian use cases; a polished UI.
**The bar to beat (one line):** a real problem a judge can repeat, solved live on a deployed product with one genuine agentic step that catches and fixes its own mistake, asks a human before acting, and proves it with honest numbers.

### 7. Rules and deliverables that bind us
| Rule / deliverable | Exact wording + source | What it means for us |
|---|---|---|
| Prior work / pre-written code / templates allowed? | "leverage state-of-the-art AI tooling to create scalable products from scratch in just 24 hours" (S5 about). No formal rule published; terms page 404 | **Default: REBUILD** the hv-cinematic and hv-agentic starters from their recipes during the event. COPY only with the organizers' written OK, credited in the README. Commit from the first minute. Never bring code from any other hackathon |
| AI-use disclosure required? | Not stated; AI tools are the theme (a Vibe Coding domain exists; "Cursor, Copilot, Claude Code" listed) | Allowed. Add an honest "How we built it" line in the README |
| Problem statements | Chosen from the organizers' list of 100+; own ideas are discouraged (S15) | Prompt P1 runs the funnel over the whole list; no open-theme path |
| Demo backup | "Pre-record a real screen-recorded backup demo (not AI-generated)" (S15, S16) | Record after the MVP gate and after the code freeze |
| Required template (PPT, video length, README, repo public?) | UNKNOWN. mrhack.in (template): "Push your codebase, working demo, and repository packages"; "Git repositories committed and locked" | Prepare: repo (private until told), live URL, README, deck PDF, backup video. Ask the format (§10) |
| Team and domain | Team 2–5 (S1–S3); each member chose a domain on the form (S3) | Everyone registered as Agentic AI; confirm a team counts as one domain |
| Eligibility | "Any undergraduate or graduate college student with active enrollment credentials" (S6) | Carry college ID |
| What to bring | "personal laptop, charger setups, power extension adapters, valid student identification badges" (S6) | Packing list in 5_RUN_SHEET.md |
| OpenAI Assistants API (listed toolkit) | Shut down on 26 Aug 2026 (S11) | Do not use it; AI SDK 7 / Agents SDK / LangGraph instead |

### 8. Logistics
Venue: MRDU main campus, Maisammaguda, Dhulapally (via Kompally), Hyderabad 500100: north of the city, allow 60–90 min in morning traffic (INFERENCE). Check-in 09:00–10:00, inauguration 10:00–11:30, hacking from ~11:30 (S2). Overnight on campus; lunch, dinner, midnight snacks, breakfast covered (S6). **Wi-Fi: unknown → two phone hotspots.** Power: bring an extension board (S6). **Jury sessions are likely on a video call [S15]** → the online kit in hv-mrdu → rounds-pitch.md §4 (share one tab, test call at 22:30, earphones with a mic, backup video as a file). In case it is in person instead: HDMI/USB-C adapter, light theme for the product, 7:1 text contrast. Rounds: jury 00:00–01:30, final 08:30–10:00 (S2).

### 9. Readiness kit
- [ ] Claude paid plan on both laptops (A: planner + builder · B: evidence, pitch, UI polish); a backup account with the 12 skills uploaded
- [ ] The 12 skills uploaded (the 10 OS skills + `hv-agentic` + `hv-mrdu`); Cowork needs them
- [ ] Node.js **≥ 22** (AI SDK 7 requires it; LTS 24 recommended), Git, GitHub CLI; `gh auth login`; Vercel logged in (laptop A)
- [ ] Warm-up **W** done on both laptops; **SPIKE** done (primary and fallback keys, on Wi-Fi and a hotspot)
- [ ] Funnel drill done on the practice list (`4_PRACTICE_DRILL.md`, 90 min, 2 Oct)
- [ ] Keys: a paid primary LLM key ($5–10 credit) and a fallback key from another provider (a Sarvam key only if voice might be built); all in phone notes, never in chat
- [ ] Charger, extension board, HDMI/USB-C adapter, 2 phone hotspots with data, earphones with mic, college ID
- [ ] Screen recorder installed · Focus / Do Not Disturb ready

### 10. Questions for the coordinators *(ask today by phone or WhatsApp, and again at check-in; the full message is in `1_START_HERE.md` §2)*
1. When and where is the list of problem statements released (before the event, on which platform)? May a team pick any statement, or only those of its registered domain?
2. Are the two jury sessions online or in person? Which tool (Meet, Zoom, Teams)? How many minutes per team, and is Q&A inside that time?
3. Is round 1 scored like the final, and are the two scores averaged? Will the same jury see us twice?
4. Is there a scoring sheet (the session showed problem 40 · solution 30 · innovation 20 · pitch 10)?
5. What do we submit, where, and by when (repo, live link, deck, recorded demo)? Public or private repo?
6. May we use open-source libraries and our own earlier components with credit, or must every line be written during the event?
7. Can a team that registered 3 members add two more today? Is 5 the cap?
8. Wi-Fi and power sockets per team? Are phone hotspots allowed?

### 11. Sources
| ID | Title | URL | Date |
|---|---|---|---|
| S1 | Event poster (shared by the team) | `inputs/poster.png` | seen 30 Sep 2026 |
| S2 | AI HACK X MRDU HACKATHON, Student Tribe listing (organizer: Shashikanth) | https://app.studenttribe.in/events/ai-hack-x-mrdu-hackathon | read 30 Sep 2026 |
| S3 | Student Tribe API record for the event (form fields, seats) | https://stapp.studenttribe.in/api/legacy/events/ai-hack-x-mrdu-hackathon | read 30 Sep 2026 |
| S4 | mrhack.in home | https://www.mrhack.in/ | read 30 Sep 2026 |
| S5 | mrhack.in about, domains, challenges, timeline, prizes (printed) | `inputs/mrhack-*.pdf` | printed 30 Sep 2026 |
| S6 | mrhack.in FAQ | https://www.mrhack.in/faq | read 30 Sep 2026 |
| S7 | mrhack.in contact | https://www.mrhack.in/contact | read 30 Sep 2026 |
| S8 | Open Innovation Hackathon, HakITxMRDU'26 (Unstop) | https://unstop.com/hackathons/open-innovation-hackathon-hakitxmrdu-malla-reddy-deemed-to-be-university-1725253 | created 25 Jul 2026 |
| S9 | TechFusion Hackathon, HakITxMRDU'26 (Unstop) | https://unstop.com/hackathons/techfusion-hackathon-malla-reddy-mr-deemed-university-1726419 | created 27 Jul 2026 |
| S10 | TKR Hack Conquest 1.0 (round structure, Hyderabad) | https://events.vtools.ieee.org/m/479967 | Mar 2025 |
| S11 | OpenAI deprecations (Assistants API sunset 26 Aug 2026) | https://developers.openai.com/api/docs/deprecations | read 30 Sep 2026 |
| S12 | Sarvam docs: models, pricing, rate limits, changelog | https://docs.sarvam.ai/api/getting-started/models | read 30 Sep 2026 |
| S13 | Agent-hackathon rubrics and winners 2025–26 (list with URLs) | `.claude/skills/hv-agentic/references/agentic-judging.md` §1 | 2025–2026 |
| S14 | GDG Hyderabad Agentathon 2025 at Malla Reddy University | gdg.community.dev (Agentathon 2025 event page) | Dec 2025 |
| S15 | Pre-event online meeting with the organizers, 1 Oct 2026 (a teammate's summary; second-hand wording) | `inputs/pre-event-meeting-2026-10-01.md` | 1 Oct 2026 |
| S16 | Speaker session deck "Hacking the Hackathon: Playbook for Winning & Beyond" (Sree Keerthana), 10 slides | `inputs/session-deck-hacking-the-hackathon.pdf` | file dated 2 Oct 2026 |
| S17 | Re-check of the Student Tribe API record and listing (seats, booking close, unchanged schedule; no list, platform or rubric published) | https://stapp.studenttribe.in/api/legacy/events/ai-hack-x-mrdu-hackathon | read 2 Oct 2026 |
| S18 | TCET SIH 2026 internal hackathon: evaluation weights | https://tcetcercd.in/hackathons/3 | Aug 2026 |
| S19 | IIT Delhi InnovateX 2025: judging criteria | https://unstop.com/hackathons/innovatex-2025-hackathon-iit-delhi-1592604 | Nov 2025 |
| S20 | How hackathons are judged and won: evidence table with sources | `MLRH/2_GAME_PLAN.md` §8 | read 2 Oct 2026 |
