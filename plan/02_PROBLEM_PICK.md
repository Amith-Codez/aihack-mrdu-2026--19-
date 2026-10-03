# 02 · PROBLEM PICK

> **Engine:** 🧠 COWORK · **Status:** DONE · APPROVED 3 Oct 2026 (HOME lane) · **Updated:** 3 Oct 2026 · **Skill:** `hv-mrdu` → `references/funnel.md` · Prompt **P1** (EVENT lane, 60 min) or **P1-HOME** (the list is out before the event) · ✋ Team picks the problem
> **Job:** read every statement on the organizers' list, cut it to a top 10 with evidence, score those on 15 criteria, deep-dive and red-team the top 3, and choose ONE problem plus a backup, with a written record of why it beat the alternatives.
> **Inputs:** `inputs/problem-statements/` (the list), 01 §2 (working rubric), 00 §3 (team), each teammate's gut picks.
> **Done when:** every statement has a row in `plan/data/statements.csv` · triage and scorecard computed by `funnel.py` (never by hand) · top 3 deep-dived (pages opened) and red-teamed · comparison record written · backup + switch trigger written · G1 marked DONE · 00 §1 updated · the team replied **APPROVED**.
> **Tags on score cells:** `4 E [P2]` page opened · `4 T [P5]` search title only · `3 J` judgment. Source IDs in this file start at **P1**.

---
## OUTPUT *(Cowork fills below)*

### 1. What's new since recon
Lane: **HOME** · List received at: 2 Oct 2026, ~22:54–23:40 IST (print times on the PDFs) [F P52] · Statements counted: **33 in our pool** (28 with full text + 5 seen only as dashboard cards) out of **89 on the platform** [F P52] · Grouped by: our own themes (Education, Commerce, Marketing, Productivity, GovTech, Travel & Mobility, Finance, Research & Startups, Security & DevOps, Agriculture) · May we pick from any domain? **Not said** → open to us [A]; a teammate asks a coordinator.
- **Platform rule [F P52]:** "Your team can confirm only one problem statement, and it can't be changed afterwards." So the backup is only usable **before** we click Confirm.
- **Own ideas [F P52]:** a team may propose its own statement; "Only 5 team ideas can be approved". Not used (recon: own ideas are discouraged).
- **The pool is the Agentic AI filter, not the whole list.** The dashboard shows 89 statements; only the ones tagged Agentic AI were saved. The other ~56 (UI/UX, Web Dev or Vibe Coding only) were **not read** [U]. We registered as Agentic AI, so this is a reasonable pool [I], but it is a gap against "every statement".
- **Five statements have no saved text** (incident response, farm decision support, three crypto-fraud ones): triaged from the dashboard card only [U].
- **Platform error:** the page titled "AI Shopping Decision Assistant" shows the Teaching & Assignment text, so the real Shopping statement is unreadable; it also means the Teaching statement is shown twice [I: more teams may see it].
- **Team (dashboard):** team 19 · Amith Bhambhu (lead), M Akhil, J Akhil, S Satya chandra → 4 people [F P52]. 00 §3 still lists placeholders.
- Rubric or rule changes: none seen. Every statement is marked "Advanced · General" and lists 20–40 deliverables, so each one needs narrowing to one hero path.
**Scoring notes for this event:** working rubric Problem 40 · Solution 30 · Innovation 20 · Pitch 10 (01 §2) · our registered domain is Agentic AI, so `agentic` asks whether the job truly needs planning, tools, checkable outputs and a human gate. Unfair skills stated by the team: access to Claude Pro (available to most teams, so `feasibility` never scored above 4 for it).

### 2. All statements: triage *(the full list lives in `plan/data/statements.csv`; verbatim text of the top 11 in the appendix)*
**Team gut picks:** none given. No wildcards.
First pass (`--keep 25`, before any search): 33 read · 7 killed · 1 floored · 25 scored, all 25 kept for the evidence scan. One search each on all 25 (titles and snippets only → `T`), then the re-run below with `--keep 10`.

**Triage:** 33 statements read · 7 killed by a hard gate · 1 dropped by a floor · 25 scored · shortlist 11 (incl. 1 tied at the cut line)

Killed: vague (2): AI-ASSISTANT-FOR-WORKERS, AI-DAILY-OPERATIONS-COPILOT · duplicate (2): AI-ROLE-BASED-EMPLOYEE-DAILY-ASSISTANT, REAL-TIME-IDENTIFICATION-OF-FRAUD-LINKED-CRYPTOCURRENCY-EXCHANGES · other (1): AI-SHOPPING-DECISION-ASSISTANT · data (1): REAL-TIME-CRYPTO-FRAUD-ATTRIBUTION-SYSTEM · hardware (1): AUTOMATED-BLOCKCHAIN-INTELLIGENCE-AND-VASP-ATTRIBUTION-ENGINE
Floors: demo=2 (1): AI-POWERED-PERSONALIZED-LEARNING-PLATFORM

| # | ID | Title | Pain | Agentic | Build | Data | Demo | Room | Picks | **Triage** |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT | AI Teaching & Assignment Evaluation Assistant | 5 T | 4 | 4 | 4 | 4 | 3 |  | **4.13** |
| 2 | AI-FACULTY-TIMETABLE-CONFLICT-RESOLUTION-AGENT | AI Faculty Timetable Conflict Resolution Agent | 4 | 4 | 4 | 4 | 5 | 2 T |  | **3.91** |
| 3 | AUTONOMOUS-PRODUCT-RETURN-RESOLUTION-AGENT | Autonomous Product Return Resolution Agent | 4 T | 5 | 4 | 3 | 4 | 3 T |  | **3.83** |
| 4 | ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE | Accessible Digital Public Service Experience | 5 T | 4 | 3 | 4 | 4 | 2 T |  | **3.78** |
| 5 | SMART-HOSTEL-COMPLAINT-MANAGEMENT-PLATFORM | Smart Hostel Complaint Management Platform | 4 | 2 | 5 | 3 | 4 | 2 T |  | **3.65** |
| 6 | AI-WHATSAPP-ORDER-AGENT-FOR-LOCAL-STORES | AI WhatsApp Order Agent for Local Stores | 4 | 4 | 3 | 3 | 5 | 2 T |  | **3.57** |
| 7 | AI-MARKETING-CAMPAIGN-DIAGNOSIS-AGENT | AI Marketing Campaign Diagnosis Agent | 3 | 4 | 4 | 4 | 4 | 2 T |  | **3.48** |
| 8 | AI-RESEARCH-LITERATURE-DISCOVERY-AGENT | AI Research Literature Discovery Agent | 3 | 4 | 4 | 5 | 4 | 1 T |  | **3.48** |
| 9 | AI-SOFTWARE-INCIDENT-RESPONSE-AGENT | AI Software Incident Response Agent | 4 | 5 | 3 | 4 T | 3 | 2 T |  | **3.43** |
| 10 | AI-MOCK-INTERVIEW-PANEL-AGENT | AI Mock Interview Panel Agent | 4 | 3 | 3 | 5 | 4 | 1 T |  | **3.43** |
| 11 | AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT | AI Gig Worker Earnings Optimization Assistant | 5 T | 2 | 3 | 2 | 3 | 4 T |  | **3.43** |

Ties inside the shortlist (order among them is not meaningful): AI-MARKETING-CAMPAIGN-DIAGNOSIS-AGENT = AI-RESEARCH-LITERATURE-DISCOVERY-AGENT (3.48) · AI-SOFTWARE-INCIDENT-RESPONSE-AGENT = AI-MOCK-INTERVIEW-PANEL-AGENT = AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT (3.43)

Just below the line: AI-GMAIL-ACTION-FOLLOW-UP-ASSISTANT 3.39 · AI-MERCHANDISING-ASSISTANT-FOR-ONLINE-SELLERS 3.39 · AI-FARM-DECISION-SUPPORT-PLATFORM 3.39 · AI-STARTUP-IDEA-VALIDATION-AGENT 3.35 · AI-LECTURE-TO-LEARNING-MATERIAL-GENERATOR 3.30 (rescue one only if a teammate picked it or new evidence raised a score)

Possible duplicates - a hint from shared rare words, not a full check (read both; mark the weaker one `duplicate: of <ID>`): AI-CAMPAIGN-CONTENT-GENERATION-AGENT ~ AI-CONTENT-REPURPOSING-PLATFORM [adapt, adaptation, advertis, blog] · AI-POWERED-PERSONALIZED-LEARNING-PLATFORM ~ AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT [assessment, class, concept, course] · AI-LECTURE-TO-LEARNING-MATERIAL-GENERATOR ~ AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT [answer, concept, difficulty, edtech] · AI-LECTURE-TO-LEARNING-MATERIAL-GENERATOR ~ AI-POWERED-PERSONALIZED-LEARNING-PLATFORM [concept, difficulty, edtech, educator] · AI-BUSINESS-ASSISTANT-FOR-LOCAL-RETAIL-STORES ~ AI-MERCHANDISING-ASSISTANT-FOR-ONLINE-SELLERS [actionable, best, catalogue, demand] · AI-AUTOMATED-MARKETING-PUBLISHING-AGENT ~ AI-CAMPAIGN-CONTENT-GENERATION-AGENT [adaptation, advertis, approv, asset] · AI-DYNAMIC-TRAVEL-PLANNING-AGENT ~ AI-EV-CHARGING-ROUTE-PLANNING-PLATFORM [alternative, calculation, destination, distance] · AI-ORDER-TRACKING-ASSISTANT ~ AUTONOMOUS-PRODUCT-RETURN-RESOLUTION-AGENT [classification, complex, escalat, escalation] · AI-CONTENT-REPURPOSING-PLATFORM ~ AI-CREATOR-CONTENT-PLANNING-AGENT [article, calendar, creator, economy] · AI-SOFTWARE-INCIDENT-RESPONSE-AGENT ~ AI-FARM-DECISION-SUPPORT-PLATFORM [captur, card, first, full] · AI-CONTENT-REPURPOSING-PLATFORM ~ AI-LECTURE-TO-LEARNING-MATERIAL-GENERATOR [accept, audio, download, extract] · AI-MOCK-INTERVIEW-PANEL-AGENT ~ AI-POWERED-PERSONALIZED-LEARNING-PLATFORM [adaptive, assessment, difficulty, experience] (+83 more)

Weights: pain 30, build 25, demo 20, data 15, agentic 10, room 15 · floors: drop when build <= 2, demo <= 2, data <= 1, agentic <= 1

**Warnings and what we did:** none printed by the script. Duplicate hints checked by reading each theme group: the three worker/employee/operations assistants share one user and job (two killed as vague, one as duplicate); the three crypto statements are one job (one kept as the reference, killed on data; one duplicate; one needs the SAHYOG portal). The marketing four and the education four are different jobs and stay separate.

**After the evidence scan, top 10 + the tie at the cut line (11), in final scorecard order:**
| # | ID | Title (verbatim) | One-line reason it survived | Sources |
|---|---|---|---|---|
| 1 | AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT | AI Teaching & Assignment Evaluation Assistant | Grading time is an official workload item; a public dataset with two human graders lets us measure agreement ourselves | P1 P2 P28 P29 P35 P36 P45 |
| 2 | ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE | Accessible Digital Public Service Experience | Strongest pain evidence on the list (welfare not reaching workers) | P4 P5 P34 P38 P39 |
| 3 | AI-FACULTY-TIMETABLE-CONFLICT-RESOLUTION-AGENT | AI Faculty Timetable Conflict Resolution Agent | Clearest before/after demo; checks are plain code; our own college's timetable | P3 P30 P37 |
| 4 | AUTONOMOUS-PRODUCT-RETURN-RESOLUTION-AGENT | Autonomous Product Return Resolution Agent | Most naturally agentic: lookup, policy check, clarify, escalate | P13 P31 P32 P43 P44 |
| 5 | AI-MARKETING-CAMPAIGN-DIAGNOSIS-AGENT | AI Marketing Campaign Diagnosis Agent | Few teams likely; planted-cause eval is measurable | P11 |
| 6 | AI-SOFTWARE-INCIDENT-RESPONSE-AGENT | AI Software Incident Response Agent | Highly agentic, open log data; full text not saved [U] | P14 |
| 7 | AI-WHATSAPP-ORDER-AGENT-FOR-LOCAL-STORES | AI WhatsApp Order Agent for Local Stores | Best one-line pitch and live demo | P8 P40 P41 P42 |
| 8 | AI-RESEARCH-LITERATURE-DISCOVERY-AGENT | AI Research Literature Discovery Agent | Open paper APIs; checkable citations | P7 |
| 9 | AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT | AI Gig Worker Earnings Optimization Assistant | Livelihood pain, little tooling; tied at the cut line | P21 |
| 10 | SMART-HOSTEL-COMPLAINT-MANAGEMENT-PLATFORM | Smart Hostel Complaint Management Platform | Easiest build; we are the users | P6 |
| 11 | AI-MOCK-INTERVIEW-PANEL-AGENT | AI Mock Interview Panel Agent | Pain we know first-hand | P9 |

### 3. Funnel
**Scorecard on the top 11** *(data: `plan/data/problems.csv` · tool: `funnel.py score` · evidence caps are applied by the script, never by hand)*

| # | ID | Problem | Problem /40 | Solution /30 | Innovation /20 | Pitch /10 | **Total /100** | Evidence (E of 6) |
|---|---|---|---|---|---|---|---|---|
| 1 | AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT | AI Teaching & Assignment Evaluation Assistant | 31.0 | 23.2 | 12.6 | 8.0 | **74.8** | 5/6 |
| 2 | ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE | Accessible Digital Public Service Experience | 31.6 | 19.4 | 9.4 | 8.0 | **68.4** | 5/6 |
| 3 | AI-FACULTY-TIMETABLE-CONFLICT-RESOLUTION-AGENT | AI Faculty Timetable Conflict Resolution Agent | 24.4 | 25.4 | 10.4 | 8.0 | **68.2** | 3/6 |
| 4 | AUTONOMOUS-PRODUCT-RETURN-RESOLUTION-AGENT | Autonomous Product Return Resolution Agent | 26.8 | 21.8 | 13.4 | 6.0 | **68.0** | 4/6 |
| 5 | AI-MARKETING-CAMPAIGN-DIAGNOSIS-AGENT | AI Marketing Campaign Diagnosis Agent | 24.4 | 20.8 | 14.4 | 6.0 | **65.6** | 0/6 |
| 6 | AI-SOFTWARE-INCIDENT-RESPONSE-AGENT | AI Software Incident Response Agent | 26.2 | 17.4 | 15.8 | 4.0 | **63.4** | 0/6 |
| 7 | AI-WHATSAPP-ORDER-AGENT-FOR-LOCAL-STORES | AI WhatsApp Order Agent for Local Stores | 22.8 | 20.8 | 9.4 | 10.0 | **63.0** | 4/6 |
| 8 | AI-RESEARCH-LITERATURE-DISCOVERY-AGENT | AI Research Literature Discovery Agent | 22.0 | 24.0 | 10.8 | 6.0 | **62.8** | 0/6 |
| 9 | AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT | AI Gig Worker Earnings Optimization Assistant | 27.2 | 15.0 | 10.6 | 8.0 | **60.8** | 0/6 |
| 10 | SMART-HOSTEL-COMPLAINT-MANAGEMENT-PLATFORM | Smart Hostel Complaint Management Platform | 21.0 | 26.2 | 5.4 | 8.0 | **60.6** | 0/6 |
| 11 | AI-MOCK-INTERVIEW-PANEL-AGENT | AI Mock Interview Panel Agent | 21.6 | 20.8 | 8.4 | 8.0 | **58.8** | 0/6 |

**Winner: AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT** by 6.4 points over ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE
Sensitivity: ROBUST (halving or raising any single weight by half never flips the winner)
Other rubrics: winner holds under 2/2 (EQUAL 25/25/25/25: AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT · BUILD-HEAVY 25/45/20/10: AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT)
Score check: after a 1-point drop on its weakest unverified score (pitch), the winner still leads by 4.4 points

Evidence caps applied (same rule for every row): AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT importance 5 T -> 4 · AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT pain 5 T -> 4

Weights: Problem 40 (importance 9, pain 11, impact 8, existing 4, gap 5, scalability 3) · Solution 30 (build24 8, feasibility 5, data 6, demo 7, lowrisk 4) · Innovation 20 (innovation 8, agentic 7, competition 5) · Pitch 10 (pitch 10)

**Margin (points /100; under 3 is a tie):** 6.4 · **Sensitivity:** ROBUST · **Other rubrics:** winner holds under 2/2 · **Caps applied:** gig worker importance and pain 5 T → 4 · **Warnings and what we did:** the first run had the Timetable and Public Service statements tied at 73.4 behind Teaching (77.0). The red team's evidence lowered all three; WhatsApp and Returns then rose into the top 3 with less-checked evidence (script warning), so both got an opened page and their own kill memo, and their scores fell too. This is the third run, one more than the EVENT rule allows; the HOME lane had the time, and the top 3 is now **frozen**. The earlier "Score check" on `pitch` no longer matters: after a 1-point drop the lead is still 4.4.
- **How deep the HOME lane really went:** one search on all 25 survivors; extra searches and opened pages on six contenders; kill memos by sub-agent on five. The other six of the top 11 (campaign diagnosis, incident response, literature, gig, hostel, mock interview: the rows with 0/6 evidence) rest on judgment plus one search title each.

**Deep-dive (top 3)**
| | #1 Teaching & Assignment Evaluation | #2 Accessible Public Service | #3 Faculty Timetable Conflicts |
|---|---|---|---|
| Who exactly (one person) | A lecturer at an Indian engineering college with a stack of internal-assessment answers to mark [A: not yet confirmed with a real lecturer] | A helper at a service centre filling a welfare application for a construction worker; the worker often has only a feature phone [F P4] [I: the helper is the real user] | The faculty member who is the department's timetable coordinator [A] |
| The problem in one sentence | Marking subjective answers eats hours and nobody can say which marks to trust | People who qualify for schemes don't get them because of unknown rules and mismatched documents | One teacher's leave forces a chain of manual swaps that can create new clashes |
| How they solve it today, and why that hurts | By hand: West Bengal's order credits 20–30 min per UG script [F P35]; teachers in 4 other countries report ~6 h/week on evaluation and feedback [F P45]. Hours actually spent by Indian college teachers: [U] | myScheme's eligibility finder (free, 1,360 schemes) [F P34, P38] or a paid field agent (Haqdarshak) [F P4]; ~80% have ID mismatches, only 25% of construction workers registered [F P4, one 2022 article] | Excel and messages [A]; FET generates timetables free [F P30]; OpenEduCat and aSc offer substitution [F P3, P37]. No independent Indian evidence of the pain found [U] |
| Hero path we can demo in < 3 min | Paste rubric + typed answers → per-criterion marks, each with a quoted line from the answer checked by code → two independent passes; disagreements go to a teacher queue → teacher approves | Two documents that disagree → agent finds the mismatch, lists schemes the person qualifies for by coded rules, builds the document checklist → helper confirms | Type "Dr Rao is on leave Thursday" → code proposes the smallest set of swaps, checks every hard constraint → coordinator approves; diff shows "2 changes, 0 clashes" |
| Data or APIs we have right now | Mohler dataset: 2,442 answers, 2 human graders, CC-BY-4.0, downloaded [M 3 Oct]; an LLM API | No open myScheme API; its terms forbid scraping [F P39] → hand-encode 8–12 schemes from official guidelines | Our own department's timetable [A: must be typed in during hour one] |
| Our unfair skills here | We are students: we can ask our own lecturers and show real answers. Claude Pro is not unfair | None | We can get a real timetable from our own college |
| Expected outcome, word by word | "helps educators reduce the time spent on routine academic evaluation" · "analyze student submissions against defined evaluation criteria" · "evaluate objective and subjective answers" · "structured feedback" · "common mistakes and learning gaps" · "Teachers should be able to review, modify, and approve AI-generated evaluations before they are finalized" | "easier to discover, understand, apply for, and track" · "different digital skills, languages, accessibility needs, and connectivity conditions" | "identify scheduling conflicts and recommend suitable alternatives" · "administrators to review and approve suggested changes while maintaining timetable consistency" |
| What ~80% of teams would build | Upload a PDF → one model call returns marks and feedback → dashboard (three look-alike hackathon builds found [F P50]) | A multilingual scheme-finder chatbot (two 2026 look-alikes found [F P49]) | A coloured grid with a chat box that regenerates the timetable |
| The one step that truly needs an agent | Deciding what to do when the two passes disagree or a quote fails the check: retry once, then hand to the teacher. Published evidence says a second pass does **not** raise accuracy; it only tells you which answers to defer [F P46, P47] → `AGENT (provisional)` until our eval decides | The document loop: compare fields, find a conflict, decide what to request, re-check. Eligibility itself is rules in code | Parsing the disruption and choosing which constraint to relax when no clean repair exists. The repair itself is code (a solver does it better [F P51]) |

**Proof ceiling for #1 [M, measured by us 3 Oct on the downloaded Mohler file, `cleaned` config, 2,442 rows]:** the two human graders give the identical score on **56.8%** of answers, are within one mark on **78.0%**, Pearson **0.773**. Our result is shown against that, not against 100%. Trap: some questions are marked out of 10, so scores must be normalised per question.

**Red team (top 3)** *(kill memos by sub-agents with fresh context; verdict per attack with the evidence checked. Pages they opened were summarised by a small model: re-open any quote before it goes on a slide)*
| Attack | #1 Teaching & Assignment | #2 Public Service | #3 Timetable |
|---|---|---|---|
| A1 The problem isn't real or important | **WOUNDED** · official norm of 20–30 min per script [P35], but no survey of hours Indian teachers spend. Fix: quote the norm as a norm; ask 2–3 of our own lecturers | **WOUNDED** · exclusion is large (29% of AP farmers missed PM-KISAN instalments [P48]) but the cited causes are e-KYC and bank mapping, not name mismatch | **WOUNDED** · no evidence of the pain in Indian colleges; vendor claims only |
| A2 It already exists and works | **WOUNDED** · Gemini in Classroom is free (rubrics, feedback pilot); CoGrader free for 100 submissions/month; Eklavvya sells to Indian universities [P36, P2]. Fix: never pitch "AI grades papers" | **WOUNDED** · discovery and eligibility are solved and free (myScheme) [P38] | **WOUNDED** · UniTime (free) already does minimal-change repair; aSc and Studybase do substitution [P37] |
| A3 It won't run by midnight | **HOLDS** for typed answers · **DEAD for handwriting OCR and plagiarism** in 10 hours → typed or pasted answers only, OCR labelled out of scope | **WOUNDED** · no API, scraping forbidden [P39]; apply and track need a government system | **HOLDS** if the timetable is typed in during hour one |
| A4 The agent is theatre | **WOUNDED** · multi-pass grading shows no accuracy gain [P47]; consensus only helps by deferring answers [P46]. Fix: claim routing, not accuracy; measure one pass vs two | **WOUNDED** · eligibility is a rules lookup | **WOUNDED** (DEAD if the model picks the swaps) |
| A5 The demo will look like everyone's | **WOUNDED** · three near-identical builds [P50]. Fix: open on the disagreement queue and the measured number, not an upload screen | **WOUNDED, severe** · two 2026 look-alikes and a stock vendor tutorial [P49] | **WOUNDED** |
| **Overall** | WOUNDED, alive. One attack HOLDS. Survives as typed short answers with quote-checked marks and disagreement routing | WOUNDED on all five | WOUNDED on four |
Also red-teamed after they briefly entered the top 3: **Returns** (five WOUNDED; Return Prime does rule-based eligibility for $19.99/month, 768 reviews [P44]; the independent return rate is 10.4%, half the vendor figure [P43]) and **WhatsApp orders** (five WOUNDED; Meta's own Business Agent is live and free in India [P41]; no evidence on lost orders).

### 4. DECISION ✋ *(APPROVED by the team, 3 Oct 2026)*
**Comparison record**
| | Total /100 | Problem /40 | Solution /30 | Innovation /20 | Pitch /10 | Evidence (E of 6) | Red team (wounds on A1–A2) | Strongest evidence | Biggest risk |
|---|---|---|---|---|---|---|---|---|---|
| #1 Teaching & Assignment Evaluation | 74.8 | 31.0 | 23.2 | 12.6 | 8.0 | 5 | 2 | Public dataset with two human graders; human–human agreement measured by us [M] | A crowded idea with free tools from Google; the "agent" may show no gain |
| #2 Accessible Public Service | 68.4 | 31.6 | 19.4 | 9.4 | 8.0 | 5 | 2 | 25% registered, ~80% ID mismatches [F P4] | No data source; 26 deliverables; looks like every scheme bot |
| #3 Faculty Timetable Conflicts | 68.2 | 24.4 | 25.4 | 10.4 | 8.0 | 3 | 2 | Checks are plain code; own data | Weakest on the 40-mark problem block |

**AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT (74.8/100) vs ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE (68.4/100)** - difference +6.4 points

| Criterion | Bucket | AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT | ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE | Points for AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT |
|---|---|---|---|---|
| impact | Problem | 5 E [P28] | 3 J | +3.2 |
| innovation | Innovation | 4 J | 2 J | +3.2 |
| pain | Problem | 4 E [P2][P35] | 5 E [P4] | -2.2 |
| importance | Problem | 4 E [P35] | 5 E [P4] | -1.8 |
| build24 | Solution | 4 J | 3 J | +1.6 |
| data | Solution | 4 E [P28] | 3 E [P39] | +1.2 |
| feasibility | Solution | 4 J | 3 J | +1.0 |
| existing | Problem | 2 E [P36][P2] | 1 E [P34][P38] | +0.8 |
| scalability | Problem | 4 J | 5 J | -0.6 |

AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT wins on: impact (+3.2), innovation (+3.2), build24 (+1.6), data (+1.2)
AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT gives up: pain (-2.2), importance (-1.8), scalability (-0.6)
Bucket difference: Problem -0.6 · Solution +3.8 · Innovation +3.2 · Pitch +0.0
Team judgment: AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT's lead on innovation (+3.2), build24 (+1.6) is our own scoring - say why in one line each.

- **Problem chosen:** AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT, narrowed to: typed short answers, per-criterion marks with a code-checked quote, disagreements routed to the teacher, agreement with human graders published.
- **Why #1 over #2** *(from `funnel.py compare`)*: wins on impact (+3.2), innovation (+3.2), build24 (+1.6), data (+1.2) · gives up pain (−2.2), importance (−1.8), scalability (−0.6): the public-service problem is the more important one, and we are choosing the one we can prove. · Leads that rest on judgment: innovation (three look-alikes exist, but none publishes agreement with human graders [F P50]) and build24 (typed answers and a ready dataset vs hand-encoding schemes).
- **Why not #3:** 6.6 points behind on the problem block; no independent evidence that the pain exists; repair is 20-year-old prior art available free.
- **Constraints that decided it (hours, team, data):** ~10 build hours to round 1, four beginners, and the only top-3 problem with real labelled data on disk tonight.
- **Who suffers and how much (best evidence):** a college teacher; 20–30 minutes credited per UG script by one state's order [F P35]. Real hours in our own college: [U] until we ask.
- **Main risk → the early test that would expose it:** the loop adds nothing → in P2/at B1, run one pass vs two on 100 Mohler answers; if routing does not separate good from bad marks, call it a checked pipeline and say so.
- **Backup problem + measurable switch trigger:** AI-FACULTY-TIMETABLE-CONFLICT-RESOLUTION-AGENT (#2 has an open data question, so the rule passes over it). Switch if V1, V3 or V6 FAILS in P2. **Because the platform locks the choice, do not click Confirm until P2 has passed.** After Confirm there is no switch: the SHRINK ladder is the fallback if the hero path is not on the mock at G4 (18:45).
- **How it was decided:** clear win (6.4 points ≥ 3, ROBUST, 2/2 rubrics) · **Confidence:** medium. It rests on a pool of 33 of 89 statements, no teammate gut picks, and a problem block where both of the top two attacks wounded it.

### 5. Sources
| ID | Title | URL | Date |
|---|---|---|---|
| P1 | EducationWorld: Cutting evaluation time to give teachers more instructional hours (opened) | https://educationworld.in/cutting-evaluation-time-to-give-teachers-more-instructional-hours/ | 14 Nov 2025 |
| P2 | Eklavvya: AI answer sheet checking (opened) | https://www.eklavvya.com/ai-answer-sheet-checking/ | read 3 Oct 2026 |
| P3 | OpenEduCat: Timetable management system (opened; vendor claims) | https://openeducat.org/solutions/timetable-management-system/ | read 3 Oct 2026 |
| P4 | Citizen Matters: Why government schemes aren't reaching those who need it the most in Mumbai (opened) | https://citizenmatters.in/?p=16634 | 15 Feb 2022 |
| P5 | IIT Kanpur: GovTech AI Eligibility Engine project page (title only) | https://home.iitk.ac.in/~jrkumar/12_Government_Scheme_Finder_Project.html | 2026 |
| P6 | SpaceBasic: Complaint management for hostel residents (title only) | https://www.spacebasic.com/hostel-management-system/complaint-management | — |
| P7 | Acurio: AI research tools compared: Elicit, SciSpace, Consensus, Research Rabbit (title only) | https://acurio.ch/en/blog/ai-research-tools-compared | — |
| P8 | AiSensy: Kirana Order Bot template (opened) | https://aisensy.com/whatsapp-chatbot-template/kirana-order-bot | read 3 Oct 2026 |
| P9 | Cloudvyn: Top 10 free AI mock interview platforms for freshers in India (title only) | https://www.cloudvyn.com/blog/free-ai-mock-interview-platforms-india-freshers-2026 | 2026 |
| P10 | Mailmeteor: Gemini in Gmail (title only) | https://mailmeteor.com/blog/gemini-in-gmail | 2026 |
| P11 | AdAdvisor: Use Claude for underperforming Meta Ads campaigns (title only) | https://adadvisor.ai/blog/use-claude-for-underperforming-meta-ads-campaign | — |
| P12 | StartupDeckAI: free AI startup idea validation tool (title only) | https://startupdeckai-h717.onrender.com/ | 2026 |
| P13 | Base.com: How to set up a returns management process (opened; vendor blog) | https://www.base.com/en-IN/blog/how-to-set-up-a-returns-management-process-that-does-not-kill-your-margins/ | undated |
| P14 | Loghub: a large collection of system log datasets (title only) | https://arxiv.org/pdf/2008.06448v2 | 2020 |
| P15 | Streamoid: Fix marketplace listing rejections (title only) | https://streamoid.com/resources/guides/fix-marketplace-listing-rejections | — |
| P16 | Google for Education: NotebookLM (title only) | https://edu.google.com/intl/hi_in/ai-notebooklm | — |
| P17 | AIKosh: FarmerChat, AI-powered agricultural advisory at scale (title only) | https://aikosh.indiaai.gov.in/home/use-cases/details/farmerchat_ai_powered_agricultural_advisory_at_scale.html | — |
| P18 | Vyapar: kirana store success story (title only) | https://vyaparapp.in/success-stories/kirana-store | — |
| P19 | Unite.AI: Best AI tools for travel planning (title only) | https://www.unite.ai/best-ai-tools-for-travel-planning/ | 2026 |
| P20 | Canva: Magic Write (title only) | https://www.canva.com/newsroom/news/magic-write-ai-text-generator/ | — |
| P21 | arXiv: Forced volatility: earnings and incentives for gig work in quick commerce (title only) | https://arxiv.org/pdf/2609.13178 | 2026 |
| P22 | ClipSpeed: free content calendar generator (title only) | https://www.clipspeed.ai/tools/content-calendar-generator.html | — |
| P23 | Streamlit forum: EV Highway Copilot using Open Charge Map (title only) | https://discuss.streamlit.io/t/ev-highway-copilot-an-ai-driven-route-range-optimizer-using-pydeck-open-charge-map-and-gemini/121511 | — |
| P24 | Pictory: Best AI content repurposing tools 2026 (title only) | https://pictory.ai/blog/best-ai-content-repurposing-tools-2026 | 30 Jul 2026 |
| P25 | F-Droid: PennyWise AI tracker (title only) | https://f-droid.org/en/packages/com.pennywiseai.tracker | — |
| P26 | AI Productivity: Best social media scheduling tools 2026 (title only) | https://aiproductivity.ai/blog/best-social-media-scheduling-tools-2026/ | 2026 |
| P27 | ChatBot.com: WISMO automation (title only) | https://www.chatbot.com/solutions/wismo/ | — |
| P28 | Hugging Face: Mohler ASAG dataset, CC-BY-4.0 (opened; downloaded and counted by us 3 Oct) | https://huggingface.co/datasets/nkazi/MohlerASAG | 2011 data |
| P29 | arXiv: ASAG2024, a combined benchmark for short answer grading (abstract opened) | https://arxiv.org/abs/2409.18596 | Sep 2024 |
| P30 | FET free timetabling software (opened) | https://lalescu.ro/liviu/fet/ | read 3 Oct 2026 |
| P31 | Shopify App Store: EcoReturns (opened) | https://apps.shopify.com/ecoreturns-by-saarainc | read 3 Oct 2026 |
| P32 | Fin.ai: Automating ecommerce refunds with AI (opened; vendor) | https://fin.ai/learn/automating-returns-exchanges-ecommerce | — |
| P33 | Times Higher Education: Anger at clashing classes (opened; UK, 2004; not used for any score) | https://www.timeshighereducation.com/news/anger-at-clashing-classes/191885.article | 22 Oct 2004 |
| P34 | myScheme: About (opened) | https://www.myscheme.gov.in/about | read 3 Oct 2026 |
| P35 | Govt of West Bengal, Higher Education Dept order 314-Edn(A): hours credited per answer script (opened) | https://wbxpress.com/assessment-hours-spent-college-teacher-paper/ | 22 Feb 2019 |
| P36 | Google blog: Gemini in Classroom AI features (opened by the red-team agent) · CoGrader/Gradescope pricing via Coursebox listing | https://blog.google/outreach-initiatives/education/classroom-ai-features · https://www.coursebox.ai/blog/best-ai-grading-tools | 30 Jun 2025 |
| P37 | UniTime help: course timetabling, interactive changes (opened by the red-team agent) | https://help.unitime.org/course-timetabling | — |
| P38 | Digital India Corporation: myScheme, 1,360 schemes, apply via GovForms (opened by the red-team agent) | https://dic.gov.in/my-scheme/ | — |
| P39 | myScheme: Terms of use, no scraping without authorisation (opened by the red-team agent) | https://www.myscheme.gov.in/terms-of-use | — |
| P40 | Zoko: WhatsApp order management guide (opened; vendor) | https://www.zoko.io/post/whatsapp-order-management-guide | — |
| P41 | Hyperleap: Meta Business Agent India launch · KiranaOS on GitHub (opened by the red-team agent) | https://hyperleap.ai/blog/meta-business-agent-india-launch-what-it-means · https://github.com/sankarshanmukhopadhyay/kiranaos | 2026 |
| P42 | Twilio docs: WhatsApp sandbox (opened by the red-team agent) | https://twilio.com/docs/whatsapp/sandbox | — |
| P43 | YourStory (Unicommerce FY23 figures) · The Week (LocalCircles survey) (opened by the red-team agent) | https://yourstory.com/2024/03/decoding-the-art-of-minimising-d2c-ecommerce-return-rates · https://www.theweek.in/news/biz-tech/2025/01/16/fake-products-no-refunds-no-complaints-redressals-the-many-woes-of-indias-online-shoppers.html | 2024 · 2025 |
| P44 | Shopify App Store: Return Prime · Shopify help: return rules (opened by the red-team agent) | https://apps.shopify.com/return-prime · https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/return-rules | — |
| P45 | McKinsey: How artificial intelligence will impact K-12 teachers (opened; 4 countries, not India) | https://www.mckinsey.com/industries/education/our-insights/how-artificial-intelligence-will-impact-k-12-teachers | 14 Jan 2020 |
| P46 | arXiv: rubric-conditioned LLM grading, consensus filtering and coverage (opened by the red-team agent) | https://arxiv.org/html/2601.08843v1 | 2026 |
| P47 | arXiv: self-consistency in automated scoring, no significant gains (abstract, red-team agent) | https://arxiv.org/abs/2604.26954 | 2026 |
| P48 | The News Minute: 16.6 lakh Andhra farmers yet to receive full PM-KISAN benefit (LibTech) (opened by the red-team agent) | https://www.thenewsminute.com/article/166-lakh-farmers-andhra-yet-receive-full-benefit-pm-kisan-155947 | — |
| P49 | Look-alike builds, schemes: Yojana AI (lablab) · JanSahayak AI (dev.to) (opened by the red-team agent) | https://lablab.ai/ai-hackathons/amd-developer-hackathon-act-ii/vectrasource/yojana-ai-multilingual-government-scheme-finder · https://dev.to/arixenx/meet-jansahayak-ai-your-personal-guide-to-indian-government-schemes-2jjj | 2026 |
| P50 | Look-alike builds, grading: Evalyze (Devpost) · Evalytics (FOSS Hack 2026) · AI_Evalution (Devfolio) (opened by the red-team agent) | https://devpost.com/software/evalyze · https://platform.fossunited.org/hack/fosshack26/p/9gf3dh5qjt · https://devfolio.co/projects/aievalution-6a54 | 2025–2026 |
| P51 | arXiv: RAGDyS, LLM writes constraints and a solver schedules (opened by the red-team agent) | https://arxiv.org/html/2405.06697v1 | 2024 |
| P52 | Trizen Community dashboard and statement pages, saved as PDFs in inputs/problem-statements/ | https://community.trizenventures.com/dashboard | 2 Oct 2026 |

### Appendix · Verbatim text of the top 11 statements
**1. AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT**

```
AI-TEACHING-ASSIGNMENT-EVALUATION-ASSISTANT Advanced General
AI Teaching & Assignment Evaluation Assistant
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Education / EdTech / Higher Education Agentic AI, AI/ML, Generative AI, LLMs, NLP,
OCR, Document Processing, Web Application,
Data Analytics, Recommendation Systems
SCOPE
Teaching Assistance / Assignment Evaluation / Automated Assessment / Personalized Feedback /
Academic Performance
DESCRIPTION
Develop an AI-powered teaching and assignment evaluation assistant that helps educators reduce
the time spent on routine academic evaluation and teaching-related activities. The system should
allow educators to upload assignments, question papers, rubrics, notes, and other educational
material, then analyze student submissions against defined evaluation criteria.
The assistant should evaluate objective and subjective answers where appropriate, provide structured
feedback, identify common mistakes and learning gaps, and generate useful insights for educators.
Teachers should be able to review, modify, and approve AI-generated evaluations before they are
finalized.
KEY DELIVERABLES
Teacher and student profile management
Course, subject, class, and assignment management
Assignment creation
Question paper and rubric upload
Custom evaluation criteria
Student submission upload
Support for text and document submissions
OCR for scanned submissions
AI-based answer evaluation
Objective-answer evaluation
Subjective-answer assessment
Rubric-based grading
Marks/score generation
Partial-credit assessment
Answer relevance analysis
Concept and keyword matching
Plagiarism/similarity detection assistance
Common mistake identification
Learning-gap identification
Personalized student feedback
Strength and weakness analysis
AI-generated explanations for evaluation
Teacher review and score modification
Human approval before final grading
Assignment-wise performance analytics
Student-wise performance tracking
Class-level performance analysis
Question-wise difficulty/performance analysis
Frequently incorrect-question identification
AI-generated teaching insights
Recommended remedial learning topics
Personalized practice recommendations
Automated evaluation summaries
Student progress dashboard
Teacher dashboard
Assignment history and version tracking
Notifications and feedback sharing
Reports and data export
Role-based access control
Secure handling of student academic data
Evaluation audit trail and AI decision history
```

**2. ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE**

```
ACCESSIBLE-DIGITAL-PUBLIC-SERVICE-EXPERIENCE Advanced General
Accessible Digital Public Service Experience
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Government / Public Services / GovTech / AI/ML, Agentic AI, Web Application, Mobile
Digital Inclusion Application, NLP, Multilingual AI, Accessibility
Technologies, Workflow Automation
SCOPE
Digital Public Services / Citizen Experience / Accessibility / Inclusive Service Delivery
DESCRIPTION
Develop an accessible digital public-service platform that makes government services easier to
discover, understand, apply for, and track. The platform should reduce complexity in navigating
government services and support citizens with different digital skills, languages, accessibility needs,
and connectivity conditions. A unified, citizen-centred experience can help reduce fragmented
service journeys, while accessible design and assisted guidance can address barriers faced by users
with disabilities or limited digital literacy.
KEY DELIVERABLES
Centralized public-service discovery
Citizen registration and secure authentication
Search and categorization of government services
Simple step-by-step service guidance
Eligibility and required-document guidance
Online application/request submission
Document upload and management
Application status tracking
Notifications and service updates
AI-powered citizen assistance
Natural-language service search and guidance
Multilingual support, including Indian languages
Voice-based assistance where applicable
Accessibility support for users with disabilities
Screen-reader-friendly interfaces
Adjustable text/display and accessible navigation
Low-bandwidth-friendly experience
Assisted digital workflows for users with limited digital literacy
Service-specific FAQs and knowledge base
Appointment/office information where applicable
Admin dashboard for service and content management
Application/request management
Citizen feedback mechanism
Service usage and accessibility analytics
Secure handling of citizen information
Audit trail and activity history
```

**3. AI-FACULTY-TIMETABLE-CONFLICT-RESOLUTION-AGENT**

```
AI-FACULTY-TIMETABLE-CONFLICT-RESOLUTION-AGENT Advanced General
AI Faculty Timetable Conflict Resolution Agent
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Education / Higher Education / Academic Agentic AI, AI/ML, Web Application, Constraint
Administration Optimization, Scheduling Algorithms, Data
Analytics, Notifications
SCOPE
Faculty Timetable Management / Scheduling / Conflict Resolution / Academic Operations
DESCRIPTION
Develop an AI-powered faculty timetable management agent that helps educational institutions
create and maintain conflict-free academic schedules. The system should analyze faculty availability,
subjects, classes, rooms, working hours, and existing timetable constraints to identify scheduling
conflicts and recommend suitable alternatives. The agent should allow administrators to review and
approve suggested changes while maintaining timetable consistency.
KEY DELIVERABLES
Faculty profile and availability management
Subject and course management
Class and section management
Room and resource management
Faculty workload configuration
Timetable creation and management
Automatic conflict detection
Faculty availability conflict detection
Class and room collision detection
Workload and scheduling constraint validation
AI-assisted timetable generation
Alternative timetable suggestions
Conflict resolution recommendations
Manual timetable editing and override
Administrator approval workflow
Timetable version/history management
Faculty timetable view
Student/class timetable view
Notifications for timetable changes
Dashboard for unresolved conflicts
Workload and scheduling analytics
Timetable export and reporting
```

**4. AUTONOMOUS-PRODUCT-RETURN-RESOLUTION-AGENT**

```
AUTONOMOUS-PRODUCT-RETURN-RESOLUTION-AGENT Advanced General
Autonomous Product Return Resolution Agent
Web Development Agentic AI
INDUSTRY PLATFORM / TECH
E-Commerce / Retail / Customer Service / Agentic AI, Generative AI, LLMs, NLP, Web
Logistics Application, Workflow Automation, Order
Management, Recommendation Systems,
Notifications, Data Analytics
SCOPE
Product Returns / Refund Management / Customer Support / Return Workflow Automation / Order
Resolution
DESCRIPTION
Develop an autonomous AI-powered product return resolution agent that helps e-commerce
businesses handle customer return requests efficiently. The agent should understand customer return
requests, retrieve relevant order and product information, verify return eligibility based on applicable
policies, and determine the appropriate resolution workflow.
The system should support return, replacement, refund, and exchange processes while handling
customer communication, return status tracking, and follow-ups. It should use order history, product
details, return policies, delivery information, and customer-provided reasons or evidence to assist
with resolution. Important or exceptional cases should be escalated for human review.
KEY DELIVERABLES
Customer authentication and profile management
Order and product information retrieval
Return-request creation
Return reason collection
Product/order eligibility verification
Return-policy evaluation
AI-based return request understanding
Return reason classification
Image/document evidence support
Product condition assessment assistance
Return, replacement, refund, and exchange workflows
AI-powered resolution recommendations
Automated customer communication
Clarification questions for incomplete requests
Return pickup scheduling
Return shipment tracking
Refund-status tracking
Replacement-order tracking
Exchange management
Exception and dispute handling
Human escalation for complex or high-risk cases
Human approval for consequential actions where required
Natural-language customer support
Return-status notifications
Automated follow-up and reminders
Customer return history
Order and return timeline
Return dashboard for support teams
AI-generated case summaries
Policy and decision explanations
Return analytics and reporting
Common return-reason analysis
Refund/return trend analysis
SLA and resolution-time tracking
Admin policy and workflow configuration
Role-based access control
Audit trail of AI and user actions
Secure customer, order, and payment-related data handling
```

**5. AI-MARKETING-CAMPAIGN-DIAGNOSIS-AGENT**

```
AI-MARKETING-CAMPAIGN-DIAGNOSIS-AGENT Advanced General
AI Marketing Campaign Diagnosis Agent
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Marketing / Advertising / E-Commerce / Agentic AI, AI/ML, Generative AI, LLMs, NLP,
Digital Business Predictive Analytics, Web Application,
Marketing Analytics, Data Visualization
SCOPE
Marketing Analytics / Campaign Performance Diagnosis / Optimization / Decision Support
DESCRIPTION
Develop an AI-powered marketing campaign diagnosis agent that analyzes campaign data to identify
performance issues, understand their possible causes, and provide actionable recommendations. The
system should examine metrics such as reach, impressions, engagement, clicks, conversions, spend,
cost per acquisition, and audience performance. It should identify underperforming campaigns,
channels, audiences, or content and help marketers understand what may need to be changed.
KEY DELIVERABLES
Campaign creation and management
Marketing-channel data integration
Campaign performance data ingestion
KPI and metric tracking
Reach and impression analysis
Click and engagement analysis
Conversion analysis
Spend and budget analysis
Cost-per-click and cost-per-acquisition analysis
Audience-segment performance analysis
Channel-level performance analysis
Content/creative performance analysis
Campaign trend analysis
Underperforming campaign detection
Anomaly and performance-drop detection
AI-powered campaign diagnosis
Root-cause analysis assistance
Performance comparison across campaigns
AI-generated campaign insights
Optimization recommendations
Budget-allocation recommendations
Audience-targeting recommendations
Content/creative recommendations
Channel optimization suggestions
Natural-language campaign queries
Explainable recommendations
Campaign health/performance dashboard
Visual analytics and charts
Automated campaign summaries
Alerts for significant performance changes
Historical campaign analysis
Reports and data export
Human review before major campaign changes
```

**6. AI-SOFTWARE-INCIDENT-RESPONSE-AGENT**

```
[U] full text not saved in inputs/problem-statements; only the dashboard card (title, tags, first two lines) was captured
```

**7. AI-WHATSAPP-ORDER-AGENT-FOR-LOCAL-STORES**

```
AI-WHATSAPP-ORDER-AGENT-FOR-LOCAL-STORES Advanced General
AI WhatsApp Order Agent for Local Stores
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Retail / E-Commerce / Local Commerce / Agentic AI, Generative AI, LLMs, NLP,
Quick Commerce WhatsApp Business API, Web Application,
Product Catalogue, Order Management,
Payment Integration, Notifications
SCOPE
WhatsApp Commerce / Order Management / Conversational Shopping / Local Store Automation
DESCRIPTION
Develop an AI-powered WhatsApp ordering agent that enables customers to discover products,
check availability, place orders, and receive order updates through a conversational interface. The
agent should understand natural-language requests, identify products from the store catalogue,
handle quantities and order details, clarify missing information, and create orders for the local store. It
should also support store-side order management and provide customers with relevant order status
updates.
KEY DELIVERABLES
WhatsApp-based conversational ordering
Customer registration and identification
Product catalogue integration
Product search and discovery
Natural-language product queries
Product availability checking
Quantity and variant handling
Cart management
Order creationOverview My Team
Address and delivery-detail collection
AI-based intent and product understanding
Clarification of incomplete orders
Price and order-total calculation
Order confirmation
Order status tracking
Customer order-history access
Order notifications and updates
Store-side order dashboard
Accept/reject order management
Inventory/stock availability integration
Customer and store communication
Payment integration or payment-status handling
Multilingual conversational support
Admin controls and configuration
Order history and analytics
Secure handling of customer and order information
```

**8. AI-RESEARCH-LITERATURE-DISCOVERY-AGENT**

```
AI-RESEARCH-LITERATURE-DISCOVERY-AGENT Advanced General
AI Research Literature Discovery Agent
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Research / Education / R&D / Academic Agentic AI, Generative AI, LLMs, NLP, Semantic
Technology Search, Recommendation Systems,
Knowledge Graphs, Web Application,
Document Processing, Data Analytics
SCOPE
Research Literature Discovery / Academic Search / Literature Review / Research Intelligence
DESCRIPTION
Develop an AI-powered research literature discovery agent that helps researchers efficiently discover,
understand, and organize relevant academic papers and research literature. The system should
understand a researcher's topic, keywords, research questions, or uploaded papers and identify
relevant literature based on semantic similarity and research context.
The agent should summarize papers, identify key findings, methods, datasets, and limitations, and help
researchers discover related or influential work. It should organize discovered literature and support
comparison of papers, citation/context analysis, and identification of research gaps or emerging
topics.
KEY DELIVERABLES
Researcher profile and research-interest management
Research topic/question input
Keyword and query management
Academic paper search and discovery
Semantic similarity-based paper recommendations
Relevant-paper ranking
Paper metadata extraction
Abstract and full-text document processing
AI-generated paper summaries
Key findings and contribution extraction
Research methodology extraction
Dataset and experiment identification
Limitations and future-work extraction
Citation and reference analysis
Related-paper discovery
Similar and influential paper identification
Paper comparison
Research topic clustering
Research trend identification
Emerging-topic detection
Research-gap identification assistance
Natural-language conversational research assistant
Follow-up literature search
Saved papers and reading lists
Research workspace/library
Notes and annotations
Search history
Citation/reference organization
Source-grounded responses with paper references
Content provenance and source links
Personalized literature recommendations
Dashboard and research analytics
Exportable literature summaries/reports
Human review and verification of AI-generated research insights
```

**9. AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT**

```
AI-GIG-WORKER-EARNINGS-OPTIMIZATION-ASSISTANT Advanced General
AI Gig Worker Earnings Optimization Assistant
Web Development Agentic AI
INDUSTRY PLATFORM / TECH
Gig Economy / Logistics / Delivery / Mobility / Agentic AI, AI/ML, Predictive Analytics,
Workforce Platforms Recommendation Systems, Web Application,
Data Analytics, Geolocation, Real-Time Data,
Notifications
SCOPE
Gig Worker Earnings / Work Optimization / Task Selection / Income Analytics
DESCRIPTION
Develop an AI-powered assistant that helps gig workers understand and optimize their earnings
based on available work opportunities, working hours, location, demand patterns, incentives, and
historical performance. The assistant should provide personalized insights and recommendations on
when and where to work, which available tasks to consider, and how different work patterns may
affect earnings. The system should present these recommendations transparently so workers can
make their own decisions.
KEY DELIVERABLES
Gig-worker profile and preferences
Earnings and work-history tracking
Task/order opportunity data
Location and working-area management
Working-hour and availability configuration
Earnings analysis
Historical income analysis
Demand-pattern analysis
Peak-hour identification
High-demand area identification
Incentive and bonus tracking
Estimated earning analysis for available opportunities
AI-powered work recommendations
Personalized earning insights
Recommended working schedules
Location-based opportunity insights
Task/ride/order selection assistance
Earnings forecasting
Daily/weekly/monthly earning summaries
Goal and target management
Notifications and opportunity alerts
Interactive earnings dashboard
Maps and location visualization
Performance and productivity analytics
Recommendation explanations
User-controlled preferences and decisions
Historical recommendation tracking
Reports and data export
```

**10. SMART-HOSTEL-COMPLAINT-MANAGEMENT-PLATFORM**

```
SMART-HOSTEL-COMPLAINT-MANAGEMENT-PLATFORM Advanced General
Smart Hostel Complaint Management Platform
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Education / Campus Management / Student Agentic AI, AI/ML, NLP, Web Application,
Services Mobile Application, Workflow Automation,
Notifications, Data Analytics, Dashboard
SCOPE
Hostel Complaint Management / Issue Tracking / Maintenance Management / Student Services /
Workflow Automation
DESCRIPTION
Develop a smart hostel complaint management platform that enables students to report hostel-
related issues and allows hostel administrators and maintenance teams to efficiently manage,
prioritize, assign, and resolve complaints.
The platform should support complaints related to areas such as rooms, electricity, plumbing,
sanitation, food, internet, security, and other hostel facilities. AI can assist in automatically categorizing
complaints, identifying priority or severity, detecting duplicate complaints, routing issues to the
appropriate team, and providing insights into recurring problems.
KEY DELIVERABLES
Student registration and authentication
Hostel, block, floor, and room management
Complaint submission
Complaint category and subcategory management
Text, image, and attachment support
Complaint location/room identification
AI-based complaint classification
Automatic priority/severity
Overview detection My Team
Duplicate complaint detection
Automatic complaint routing
Maintenance-team assignment
Complaint status workflow
SLA and resolution-time tracking
Real-time complaint status updates
Student notifications
Admin and maintenance dashboards
Complaint search and filtering
Escalation for unresolved complaints
Complaint history and resolution records
Recurring-issue identification
Hostel-wise and category-wise analytics
Maintenance workload analytics
Average resolution-time tracking
AI-generated issue summaries and insights
Student feedback and satisfaction rating
Reports and data export
Role-based access control
Audit trail for complaint actions
Secure student and hostel data management
```

**11. AI-MOCK-INTERVIEW-PANEL-AGENT**

```
AI-MOCK-INTERVIEW-PANEL-AGENT Advanced General
AI Mock Interview Panel Agent
Web Development Vibe Coding Agentic AI
INDUSTRY PLATFORM / TECH
Education / Recruitment / HRTech / Career Agentic AI, Generative AI, NLP, Speech-to-
Development Text, Text-to-Speech, LLMs, Web Application,
Voice AI, Data Analytics
SCOPE
AI Mock Interviews / Interview Preparation / Candidate Assessment / Skill Evaluation
DESCRIPTION
Develop an AI-powered mock interview panel that simulates realistic technical, behavioral, and role-
specific interviews. The system should generate questions based on the candidate's target role,
experience level, skills, and selected interview type, conduct an interactive interview, ask relevant
follow-up questions based on previous responses, and evaluate the candidate's performance. It
should provide a detailed feedback report highlighting strengths, weaknesses, skill gaps,
communication quality, technical accuracy, and areas for improvement. Existing AI mock-interview
implementations demonstrate role-aware question generation, adaptive follow-ups, voice interaction,
transcripts, scoring, and progress analytics as practical components of such a system.
KEY DELIVERABLES
PS-60 — AI Mock Interview Panel Agent
Problem Statement ID: Not specified
Organization: Not specified
Department: Not specified
Target Domain: Agentic AI, Web Development, Vibe Coding
Difficulty: Advanced
Industry: Education / Recruitment / HRTech / Career Development
Scope: AI Mock Interviews / Interview Preparation / Candidate Assessment
Overview My/Team
Skill Evaluation
Platform/Tech: Agentic AI, Generative AI, NLP, Speech-to-Text, Text-to-Speech, LLMs, Web
Application, Voice AI, Data Analytics
Description:
Develop an AI-powered mock interview panel that simulates realistic technical, behavioral, and
role-specific interviews. The system should generate questions based on the candidate's target
role, experience level, skills, and selected interview type, conduct an interactive interview, ask
relevant follow-up questions based on previous responses, and evaluate the candidate's
performance. It should provide a detailed feedback report highlighting strengths, weaknesses, skill
gaps, communication quality, technical accuracy, and areas for improvement. Existing AI mock-
interview implementations demonstrate role-aware question generation, adaptive follow-ups,
voice interaction, transcripts, scoring, and progress analytics as practical components of such a
system.
Key Deliverables:
Candidate profile and target-role configuration
Role and skill-based interview generation
Technical interview mode
Behavioral interview mode
HR interview mode
System-design or domain-specific interview mode
AI-generated interview questions
Adaptive follow-up questions
Multi-round interview simulation
Voice-based interview interaction
Speech-to-text transcription
Text-to-speech interviewer
Real-time interview session interface
Evaluation of technical accuracy
Problem-solving assessment
Communication assessment
Behavioral-response assessment
Interview confidence and response-quality analysis
Skill-gap identification
AI-generated interview feedback
Detailed performance scorecard
Personalized improvement
Overview recommendations My Team
Interview transcript and session history
Progress tracking across multiple interviews
Candidate performance analytics dashboard
Downloadable interview reports
Configurable interview duration and difficulty
Human-review or configurable evaluation criteria where required
```
