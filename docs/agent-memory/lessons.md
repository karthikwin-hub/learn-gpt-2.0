# Lessons — corrections that became rules

<!-- Agentic Delivery Standard v1.0 · tier: SEED. Agents may ADD candidates here; humans decide what is promoted.
     A lesson without an example rots. A rule nobody needs is decoration. -->

How this file works
1. When a human corrects an agent, the agent proposes a **candidate** below (skill `capture-lesson`): the rule as
   "When X, do Y — because Z", a before/after example, where it applies and where it must not.
2. At the weekly harness review a human decides: **promote** (to AGENTS.md §13, a nested AGENTS.md, a skill, or an
   instruction file), **automate** (a lint rule, test or hook — preferred, see harness-backlog.md), or **reject**.
3. Same mistake twice → the lesson is unclear: rewrite it. A promoted rule that hasn't fired in a month → remove it.

## Candidates (newest first)

<!-- Template:
### YYYY-MM-DD — [short name]
- Rule: When [situation], do [action] — because [reason].
- Example: before `[what the agent did]` → after `[what it should do]`.
- Applies to: [paths/situations] · Not to: [exceptions]
- Proposed destination: AGENTS.md | nested AGENTS.md | skill | lint/test/hook
- Status: candidate | promoted (where) | automated (which check) | rejected (why)
-->

### 2026-10-12 — Pause for explicit human approval on spec and plan before coding features
- Rule: When receiving a prompt to build a new feature or lesson, pause and present `spec.md` and `plan.md` for human approval before writing production or UI code — because running the entire pipeline autonomously turns SDD into post-hoc compliance paperwork rather than a collaborative steering wheel ("vibe coding with docs").
- Example: before on "create a lesson for Roman Numerals", agent drafted `spec.md`, `plan.md`, `roman.ts`, UI screens, and tests in a single autonomous burst without stopping → after agent drafts `spec.md` and `plan.md`, presents them to the user with "Here are the requirements and architectural plan. Do you approve before I begin implementation?", and only writes code upon approval.
- Applies to: `specs/` feature lane tasks · Not to: chores, bug reproductions, or explicitly approved implementation phases.
- Proposed destination: AGENTS.md §3 & §10
- Status: candidate

### 2026-10-11 — Check the script of every translated string
- Rule: When an agent or subagent writes Indic-language strings, run a script-purity and key-parity check before accepting them — because translation output can look complete while being romanised, in the wrong script, or half English.
- Example: before `te-loka.js` accepted with "bodha.I2.can": "Nuvvu ghatanaalanu kramamlo…" and `ta-ganita.js` with "ஒரு pencil ₹4.5" → after each file passes a check that every value is mostly in its language's script (danda and digits allowed), has the same keys and `{placeholders}` as English, and keeps `[[id|…]]` glossary markup.
- Applies to: `design/prototype/js/i18n/*` and future `src/domain/i18n/` dictionaries · Not to: glossary ids, placeholders, AND/OR/NOT gate names, BCE/CE in English files.
- Proposed destination: lint/test (a parity and script check in `scripts/harness/verify.py`)
- Status: candidate

## Promoted / automated (history)
- (none yet)
