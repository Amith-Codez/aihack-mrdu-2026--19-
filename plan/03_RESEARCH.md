# 03 · RESEARCH

> **Engine:** 🧠 COWORK · **Status:** DONE (HOME lane) · GO WITH FIXES · V3 recorded from the team's test · **Updated:** 3 Oct 2026 · **Skills:** `hv-mrdu` → `references/validate-gap.md` (order of work, challenge, gap) + `hv-research` (lanes, fact grades) · Prompt **P2** (≤ 30 min at the event)
> **Job:** try to break the chosen problem before a jury does, then find what really exists, the real gap and our difference, and collect the facts the pitch will stand on. Research that changes no decision is left out.
> **Inputs:** 02 §4 (decision, backup), 01 §2 (working rubric), current web sources, anything a mentor or user tells the team.
> **Fill at this event:** §2–6, §9, §11, §12 and the sources in §10 (IDs start at **R1**); skip §0, §1, §7, §8 unless a minute is left.
> **Done when:** the six validation challenges have verdicts (§11) · 5–8 existing solutions analysed with labels (§5) · the gap sentence passes its three tests and the differentiation passes the ten-team test (§12) · 3 graded facts in `plan/data/claims.csv` · every data source or API for the hero path verified or given a fallback (§6) · the stop rule is met.

---
## OUTPUT *(Cowork fills below)*

*P2 run at home, 3 Oct 2026, started 01:05 IST (laptop clock), finished inside the 30-minute box. Filled: §2–6, §9–12. Skipped by the event rule: §0, §1, §7, §8. Lanes were run in one session, not by sub-agents; the red-team memos from P1 (02 §3) fed lanes B and D.*

### 2. The user
- **Primary user (one real persona):** an assistant professor at a JNTUH-affiliated engineering college in Hyderabad who teaches one theory subject to two sections and marks the descriptive part of each mid-term and the assignments herself, in English, on a college laptop [A: built from the exam structure in R3; no lecturer has been asked yet]. Under R22 each theory subject has two mid-terms a semester, each with a 20-mark descriptive part, plus assignments [F R3, one college's document].
- **Other people involved:** the head of department who receives the marks (approver) [A] · the student, who needs at least 14 of 40 internal marks to sit the semester-end exam [F R3], so a wrong mark has a cost.
- **What we do not know:** whether her scripts are handwritten on paper (very likely [A]) and how many hours she spends [U]. Both are questions for two lecturers at the venue.

### 3. How it works today
| Step | What they do | Tool | Pain | Evidence |
|---|---|---|---|---|
| 1 | Set the paper and a marking scheme | Word, paper | — | [A] |
| 2 | Read each answer against the scheme and give marks | Pen, by hand | Time: one state's order credits 20–30 min per UG university script; Madras evaluators mark ~40 scripts a day | [F R2] [F R4] |
| 3 | Stay consistent across a whole stack | Memory | Two trained graders gave the identical mark on only 56.8% of 2,442 answers | [M] on [R1] |
| 4 | Write feedback | Usually a mark only | [U] for Indian colleges | [U] |
| 5 | Total, enter marks, hand in | Register or portal | — | [A] |
| 6 | Spot what the class got wrong | Rarely done | [U] | [U] |

### 4. Pitch-grade facts *(A = official data / peer-reviewed · B = reputable news or industry report · C = blog, forum, vendor claim)*
| # | Fact (number · year · place) | Source | Grade | ★ Killer fact? |
|---|---|---|---|---|
| F1 | Two human graders agree exactly on 56.8% of 2,442 answers and within one mark on 78.0% · 2011 data, measured by us 3 Oct 2026 · University of North Texas | [R1] [M] | A (peer-reviewed dataset, our own count) | ★ |
| F2 | 20–30 minutes credited per UG answer script · 2019 · West Bengal | [R2] | A (government order, read on a third-party copy) | ★ |
| F3 | Two mid-terms per semester, each with a 20-mark descriptive part · R22 · JNTUH colleges | [R3] | B− (one college's document; confirm in the university regulation) | ★ once confirmed |
| F4 | ~40 scripts a day at Rs 12 a script · June 2026 · University of Madras | [R4] | B | |
| F5 | Six hours a week on evaluation and feedback · 2020 · Canada, Singapore, UK, US (not India) | [R5] | B | |
| F6 | Repeated gradings that agree are more accurate, at the price of grading fewer answers (81.1% two-way accuracy at 85.6% coverage) · 2026 · SciEntsBank | [R9] | A (preprint; re-open before quoting) | |
**Not a fact we have:** any measured number for hours Indian college teachers spend marking [U].

### 5. What already exists
| Name | Type | What it does | Who it serves | Where it falls short | Label | Source |
|---|---|---|---|---|---|---|
| Marking by hand | Manual way | The teacher reads every answer against her scheme | Every teacher | Slow (F2, F4); even trained graders differ (F1) | [F] [M] | R1 R2 R4 |
| A general chatbot (ChatGPT) | Generic chatbot | Marks pasted answers on request, with a line of feedback each | Anyone | **We reproduced it:** the same 8 answers got 21/40 in one chat and 15/40 in another; marks matched on 3 of 8. Marking quality on a single answer is not the weak point (chat 1 was within one mark of grader 2 on 8 of 8). That it keeps no record is our reading, not a tested fact | [M] team test · [I] for the record-keeping | v3_chatbot_test.csv |
| Gemini in Google Classroom | Product (free for Workspace for Education) | Its announcement describes rubric generation and suggested feedback for writing | Schools on Google Classroom | The announcement does not describe automatic marking; whether our college uses Classroom: [U] | [F] as "what the page says" | R6 |
| CoGrader | Product | AI first-pass grading with teacher review; free plan 100 submissions a month; handwriting on the $15 plan; Google Classroom integration | US school teachers [I] | Nothing read about where it falls short | [I] | R7 |
| Eklavvya | Product (India) | Scans handwritten exams, rubric-driven AI marks, re-evaluation workflow; claims 31% less grading time | Universities and boards (NMIMS, Sharda) | Price not on the page; its page does not mention flagging low-confidence marks (absence on a page is not proof) | [F] as "what the page says" | R8 |
| University of Zurich grading platform | University tool | Highlights rubric matches, orders answers, flags possible inconsistencies after humans grade; deliberately shows no AI marks | Its own lecturers | Public availability not stated | [F] | R10 |
| Evalyze and similar | Past hackathon projects | OCR, compare to model answer, marks and feedback, class dashboard | Demo | Its page reports no measured agreement with human graders | [F] as "what the page says" | R11 |
| Open source | — | One search for a self-hosted LLM grader with teacher review found papers, no maintained tool | — | Not a finding about the world: one search [F: our search, 3 Oct] | [F: our search] | — |

- **What ~80% of teams will build:** upload a PDF → one model call → marks, feedback and a dashboard (this is exactly Evalyze [F R11]).
- **What nobody we found does well:** tell the teacher *which* marks to check, with proof on screen, and publish how close the tool is to human graders. Stated as what we found, not as what does not exist.

### 6. Data and API check
| Resource | Gives us | Access (free / key / limits / speed) | Terms | Verified how |
|---|---|---|---|---|
| Mohler ASAG dataset | 2,442 real answers, reference answers, two human marks each | Free, no login, Parquet, ~160 KB | CC-BY-4.0 (credit in README) | Downloaded and counted 3 Oct [M]; trap: some questions are out of 10, normalise per question |
| Claude API | Per-criterion marks as structured output; image input | Needs a Console API key with credit. `claude-sonnet-5-5` $2 / $10 per million tokens, `claude-haiku-4-5-20251001` $1 / $5 | — | platform.claude.com/docs/en/models/overview, 3 Oct [F R12]. **A Claude Pro subscription does not pay for the API** [F R13, article title only]. Whether the team has a funded key: **[U], the SPIKE in 00 §4 is NOT STARTED** |
| Cost of the eval | — | [I] about $0.0084 per answer for two passes (2 × (600 in × $2 + 300 out × $10) / 1M) → ~$0.84 for 100 answers, ~$20.5 for all 2,442. Token counts are our assumption | — | Arithmetic only; measure on the first 10 calls |
| AI SDK | Schema-checked output | `generateText` with `Output.object({ schema })` | — | ai-sdk.dev docs, 3 Oct [F R14]; version on the page not stated [U] |
| Fallback model (Gemini API) | Second provider | A free tier exists; the per-model limits are only shown inside AI Studio | — | ai.google.dev rate-limits page, 3 Oct [F R15]; numbers [U] → check in the SPIKE |
| Handwritten scripts | — | Claude models accept images [F R12]; accuracy on Indian exam handwriting [U] | — | Not tested. Fallback: typed or pasted answers; the Mohler set as seeded real data |
No test call was made: this environment has no API key.

### 9. Still unknown
| Unknown | Plan (assume / test in build / cut) |
|---|---|
| Does **our** grader give the same marks twice? (the chatbot did not: §11 V3) | Test in build step 2: the same 8 answers twice, and 100 Mohler answers twice. Report identical marks out of N |
| Hours our lecturers spend; are scripts handwritten; would they use it | Ask two lecturers at the venue before 14:00 (5-question script in hv-research); quotes go to 08 |
| Does a second pass or a disagreement flag separate good marks from bad on Mohler? | Test in build step 2 on 100 answers: accuracy of auto-accepted vs flagged, and coverage. If no separation, call it one checked model call |
| Handwriting | Test one photo of a real answer after round 1; ship only if DONE-TESTED; until then say "typed answers today" |
| Is there a funded API key and a fallback key | SPIKE before 11:30 |
| JNTUH R22 wording in the university's own regulation | One teammate opens the regulation PDF; until then F3 stays out of slides |
| Plagiarism, profiles, notifications, analytics (listed deliverables) | Cut or hard-coded and labelled; decided in P3 |

### 10. Sources
| ID | Title | Publisher | URL | Date | Grade |
|---|---|---|---|---|---|
| R1 | Mohler ASAG dataset card and files | Hugging Face (data: Mohler, Bunescu, Mihalcea 2011) | https://huggingface.co/datasets/nkazi/MohlerASAG | accessed 3 Oct 2026 | A |
| R2 | Assessment of hours spent by college teacher for paper (order 314-Edn(A), 22 Feb 2019) | Govt of West Bengal, via WBXPress | https://wbxpress.com/assessment-hours-spent-college-teacher-paper/ | 22 Feb 2019 | A |
| R3 | CIE procedure (R18 and R22) | Scient Institute of Technology (JNTUH-affiliated) | https://scient.ac.in/images/12._CIE_Procedure.pdf | undated | B− |
| R4 | Madras University lecturers' evaluation boycott to delay UG results | DT Next | https://www.dtnext.in/amp/story/news/chennai/madras-university-lecturers-evaluation-boycott-to-delay-ug-results | June 2026 | B |
| R5 | How artificial intelligence will impact K-12 teachers | McKinsey | https://www.mckinsey.com/industries/education/our-insights/how-artificial-intelligence-will-impact-k-12-teachers | 14 Jan 2020 | B |
| R6 | Gemini in Classroom AI features | Google | https://blog.google/outreach-initiatives/education/classroom-ai-features | 30 Jun 2025 | company primary |
| R7 | Pricing | CoGrader | https://cograder.com/pricing | accessed 3 Oct 2026 | company primary |
| R8 | AI answer sheet checking | Eklavvya | https://www.eklavvya.com/ai-answer-sheet-checking/ | accessed 3 Oct 2026 | C (vendor claims) |
| R9 | Rubric-conditioned LLM grading (SciEntsBank, consensus and coverage) | arXiv 2601.08843 | https://arxiv.org/html/2601.08843v1 | 2026 | A (preprint) |
| R10 | AI-assisted grading platform | University of Zurich | https://www.df.uzh.ch/en/studies/teaching-center/projects-and-innovation/ai-assisted-grading/grading-platform.html | accessed 3 Oct 2026 | A |
| R11 | Evalyze | Devpost | https://devpost.com/software/evalyze | 28 May 2026 | C |
| R12 | Models overview | Anthropic | https://platform.claude.com/docs/en/models/overview | accessed 3 Oct 2026 | official docs |
| R13 | Why do I have to pay separately to use the Claude API and Console? (title only) | Anthropic support | https://support.claude.com/en/articles/9876003-i-have-a-paid-claude-subscription-pro-max-team-or-enterprise-plans-why-do-i-have-to-pay-separately-to-use-the-claude-api-and-console | — | official docs |
| R14 | Generating structured data | AI SDK | https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data | accessed 3 Oct 2026 | official docs |
| R15 | Rate limits | Google AI for Developers | https://ai.google.dev/gemini-api/docs/rate-limits | accessed 3 Oct 2026 | official docs |
Pages were read through a summarising fetch tool: re-open any quote before it goes on a slide.

### 11. Problem validation *(HOLDS / WEAK / FAILS)*
| # | Challenge | Evidence | Label | Verdict | Fix if weak |
|---|---|---|---|---|---|
| V1 | Is the pain real and frequent? | A state order credits 20–30 min per script [R2]; ~40 scripts a day in Madras [R4]; two descriptive mid-terms a semester per subject under R22 [R3]. No teacher's own words; no Indian survey of hours | [F] [F] [F] · [U] | **HOLDS, narrowly** | Two lecturer quotes at the venue. Never say "teachers spend X hours" |
| V2 | Who exactly? | An assistant professor at a JNTUH-affiliated college marking the 20-mark descriptive part for two sections | [A] on [F R3] | **HOLDS** as a persona, unconfirmed | Confirm with one real lecturer |
| V3 | Is a substitute good enough? *We tried it on one real case:* | **Team test, ChatGPT (free; model version not noted [U]), same prompt in two new chats, 8 real Mohler answers to one question:** the two chats gave the identical mark on 3 of 8 answers; chat 2 was lower on the other 5 and never higher; one answer went from 4 to 2; the class total was 21/40 in chat 1 and 15/40 in chat 2 (the human graders: 26 and 24). Chat 1 said it marked "with partial credit", chat 2 "strictly": the chatbot chose its own marking policy each time. Against the humans: chat 1 was within one mark of grader 2 on 8 of 8, chat 2 on 6 of 8 (the two humans: 7 of 8). Separately, Claude's blind single pass on 24 answers was as close to the humans as they are to each other. **So a chatbot can mark an answer well, but the same stack got a different total on the second try.** One question, two chats: a small test | [M] team, 3 Oct, `plan/data/v3_chatbot_test.csv` · [M] probe, `plan/data/probe_p2.csv` | **HOLDS** (the substitute is not good enough at repeatability; it is good enough at marking one answer) | Never claim better marks. Lock the marking scheme per criterion before marking, so the policy is the teacher's and not the model's. **Our own repeatability is untested [U]: run the same 8 answers twice in build step 2; if our totals also move, the product has the same fault** |
| V4 | Would they trust and use our fix? | A wrong internal mark can stop a student sitting the final exam [F R3]; LLM graders lean lenient [F R9]; the teacher signs the marks [A]. Scripts are probably handwritten [A] | [F] [F] [A] | **WEAK** | The teacher approves every mark; nothing is final without her; say "typed answers today" and test one handwritten photo after round 1 |
| V5 | Can we measure the improvement ourselves tonight? | Yes: exact and within-one agreement with each human grader on Mohler against the human–human baseline (56.8% / 78.0%); accuracy of auto-accepted vs flagged answers and coverage; seconds per answer | [M] baseline done; the rest in build step 2 | **HOLDS** | — |
| V6 | Does our plan deliver the expected outcome, word by word? | "reduce the time spent on routine academic evaluation" → seconds per answer and share sent to the teacher · "upload ... question papers, rubrics" → paste or upload text · "analyze student submissions against defined evaluation criteria" → per-criterion marks · "objective and subjective answers" → objective by exact match in code, subjective by the model · "structured feedback" → one line per criterion · "common mistakes and learning gaps" → the three most-missed criteria for the class · "review, modify, and approve ... before they are finalized" → the approval screen. Listed deliverables **not** covered: OCR for scanned submissions, plagiarism, profiles, notifications | [F] statement text | **HOLDS** on the description · WEAK on the OCR deliverable | The class summary of missed criteria must be in scope (P3). OCR is a parked extra, never promised untested |
**Verdict: GO WITH FIXES.** No FAILS. V3 now HOLDS on the team's own test (3 Oct). Still open: two lecturer conversations (V1, V2, V4) and our own repeatability test.

### 12. The real gap and our difference
- **Gap sentence:** For **a lecturer marking a stack of descriptive answers**, **marking by hand and pasting answers into a chatbot** fail at **knowing which marks can be trusted without re-reading everything**, because **neither shows its evidence or says where it is unsure**. In the tools whose pages we read (R6, R7, R8, R11), nobody **shows a code-checked quote for every mark, sorts the doubtful answers to the top, and publishes its agreement with human graders**.
- **Gap tests:**
  1. *Not just unknown to us:* two more searches (evidence quote per rubric criterion with a confidence flag; published agreement with human graders, India). Found: the University of Zurich platform flags inconsistencies but shows no AI marks [F R10]; a 2026 paper measures exactly the consensus-and-coverage trade-off [F R9]. **So the idea exists in research and inside one university; we found no tool a college lecturer can open that does it.** Test 1 passes only in that narrow form, so by the rule we treat it as "the same job, better at the trust step" and must show a measured difference.
  2. *Somebody wants it:* V1 holds narrowly, V4 is weak → passes on paper; needs the two lecturer conversations.
  3. *Small enough to close tonight:* yes; the hero path closes it for one real question with real student answers from Mohler.
- **What ~80% of teams will build on this statement:** upload → one model call → marks, feedback, dashboard.
- **What the V3 test adds [M]:** the chatbot's marks moved because it picked its own strictness. A marking scheme the teacher locks per criterion, and a repeat-run check, are therefore part of the difference, not extras (feeds P3).
- **Our difference in one sentence:** *"Every mark shows the line it was given for, the answers our two passes disagree on come first, and on 2,442 answers already marked by two humans we show how often we match them, next to how often they match each other."*
- **Ten-team test:** "AI grades with feedback and teacher approval" → ten teams can say it. The sentence above needs the Mohler baseline and a working quote check; a team would have to have built both. Our judgment: passes [I]. It fails the moment we drop the measured number.
- **Three "only we show this" proofs, each visible in the demo:** 1. the quote check: a mark whose quote is not in the answer is rejected on screen (the planned sad path) · 2. the data: real answers with two human marks, credited · 3. the number: our agreement with each grader beside the human–human 56.8% / 78.0%, with the misses listed.
- **The agentic opportunity in one line:** plain rules: quote exists, marks add up, objective answers, totals, the class summary count. One model call: per-criterion marks. The only step uncertain enough for a loop is what to do after a failed check or a disagreement between passes (retry once with the failure named, then hand to the teacher), and published evidence says that loop sorts answers rather than improving marks [F R9] → `AGENT (provisional)` until our eval. Zero agents is a possible honest result.
