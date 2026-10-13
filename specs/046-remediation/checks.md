# Checks — 046 Remediation of lessons 013–045 and the ported Phase 1 lessons

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

Full verification: `python3 scripts/harness/verify.py` → 12/12 PASS at `34c3324` (`.agent/last-verify.md`).

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 | PASS | `tests/e2e/sweep/app-routes.spec.ts` (every playable knot × en/hi/te/bn/ta, no raw keys, no Latin words on non-English screens); `src/domain/i18n/dictionaries.test.ts` (key parity, script, glued Latin, informal address) | Strings are machine-quality drafts; see the native-review row |
| US1-AS2 | PASS | Same sweep, 360×740 and 390×844 projects; overflow/axe audit for hi/te/bn/ta at 360px | — |
| US1-AS3 | PASS | `dictionaries.test.ts` placeholder and glossary-markup parity | — |
| US2-AS1 | PASS | `app-routes.spec.ts` (every Bodha card has a figure); `src/ui/lesson-visuals/` registry | — |
| US2-AS2 | PASS | `app-routes.spec.ts` (mistake picture per knot) | — |
| US2-AS3 | PASS | `app-routes.spec.ts` (Prashna art per knot) | — |
| US3-AS1 | PASS | `tests/e2e/journeys/046-every-lesson.spec.ts` (Prashna → Stop for every lesson) | — |
| US3-AS2 | PASS | `046-every-lesson.spec.ts` (explain-it-back hint and keep anyway) | — |
| US4-AS1 | PASS | Red baseline at `3106cb5`: 1,335 missing keys per language, 488 UI-text hits, 323/324 sweep failures (`progress.md`) | — |
| FR-001 | PASS | `src/ui/ui-text.test.ts`; no `innerHTML` left in `src/ui` | — |
| FR-002 | PASS | `src/ui/lesson-visuals/` (one registry, refuses duplicates) | — |
| FR-003 | PASS | `app-routes.spec.ts:69`, `046-every-lesson.spec.ts:23` | Bare `/#/mistake` and `/#/explain` still open M4 (002 acceptance depends on it) — product decision |
| FR-004 | PASS | Acceptance glossary tests; hyphenated term ids | — |
| FR-005 | PASS | `mistake.<K>.eq` with `<s>`/`<r>` markup; acceptance mistake tests | — |
| FR-006 | PASS | `src/domain/math/hcf.test.ts:79` | — |
| FR-007 | PASS | `src/persistence/storage.test.ts`, `src/ui/util/bench.test.ts`; digest and growing now use `readStep` | — |
| FR-008 | PASS | `tests/e2e/sweep/keyboard.spec.ts` (every bench: no mouse-only control; N4 rings by Enter/Space keep focus) — 96 passed | — |
| Native-speaker review of hi/te/bn/ta | UNRESOLVED | Two agent review passes on Telugu still left about 4 typos in every 20 strings sampled | Needs a native teacher, Telugu first (`docs/reports/REMEDIATION_046.md` §4) |
| Independent review | PASS | Reviewer subagent read the diff cold; findings fixed in `3150a29` or listed as skipped in the report | — |
