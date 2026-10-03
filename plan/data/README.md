# plan/data/ · the numbers behind the decisions

Claude writes CSV files here (with Python's `csv` module) and runs the skill scripts on them from the hackathon folder, so no score, ranking or time is ever computed by hand:
- `statements.csv` → `python3 .claude/skills/hv-mrdu/scripts/funnel.py triage plan/data/statements.csv --keep 15` (02 §2)
- `problems.csv` → `python3 .claude/skills/hv-mrdu/scripts/funnel.py score plan/data/problems.csv` and `… compare plan/data/problems.csv <ID1> <ID2>` (02 §3–4)
- `ideas.csv` + `matches.csv` → `python3 .claude/skills/hv-winning-idea/scripts/tournament.py pairs|rank …` (04 §3)
- `features.csv` → `python3 .claude/skills/hv-winning-idea/scripts/forge.py plan/data/features.csv --hours 1.5 --md plan/data/forge.md` (04 §13)
- `gates.csv` → `python3 .claude/skills/hv-mrdu/scripts/clock.py plan/data/gates.csv` (00 §5, 06 §14). Any prompt may mark a gate DONE in its status column.
- `eval_cases.csv` (laptop B, PITCH-1) → the builder turns it into `web/evals/cases.json` in step 2
- `claims.csv` → `python3 .claude/skills/hv-mrdu/scripts/ledger.py plan/data/claims.csv` (08 §9; must say PASS before each round)

`rounds.md` is written on laptop B only, by prompts **ROUND**, **ROUND-1**, **RESET** and **ROUND-FINAL**: mentor visits, break sessions, explain-it drills and both jury rounds, each with the decision taken. The builder reads new entries at the start of every build session.
