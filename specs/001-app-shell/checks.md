# Checks — 001 App shell, language switching and fonts

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US1-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US1-AS3 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US2-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US2-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US3-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US3-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US3-AS3 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US4-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US4-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US5-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US5-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US6-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US7-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US7-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US8-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US8-AS2 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| US9-AS1 | PASS | `tests/acceptance/001-app-shell.spec.ts` (38 passed in 9.4s) | Passed across both devices |
| J1 First run | PASS | `tests/e2e/journeys/001-journeys.spec.ts` (8 passed in 6.0s) | First run through Tamil Ashram & reload |
| J2 Language switch keeps state | PASS | `tests/e2e/journeys/001-journeys.spec.ts` (8 passed in 6.0s) | Preserves route and active view |
| J9 Shell offline | PASS | `tests/e2e/journeys/001-journeys.spec.ts` (8 passed in 6.0s) | Client-side routing and cache offline |
| J10 Cross-subject entry | PASS | `tests/e2e/journeys/001-journeys.spec.ts` (8 passed in 6.0s) | Jaal link navigation and chip toggle |
| Parity: `opening` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | Kolam art, wordmark, tagline, begin |
| Parity: `language` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | 5 Indic language cards in native script |
| Parity: `home` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | Banyan art, 3 shala cards, jaal launcher |
| Parity: `shala?s=ganita` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | Wave spine, 8 domains, 42 knots |
| Parity: `shala?s=vijnana` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | Wave spine, 6 domains, 14 knots |
| Parity: `shala?s=loka` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | Wave spine, 4 domains, 18 knots |
| Parity: `jaal` | PASS | `tests/e2e/mockup/001-shell.spec.ts` (14 passed in 5.7s) | Triangular web, 10 curves, detail card |
| Sweep: 5 languages | PASS | `tests/e2e/sweep/` (11 passed in 9.4s) | Zero axe violations across all languages |

## Independent review
- Reviewer: Antigravity verifier · Verdict: PASS · Findings resolved: All 18 scenarios and 4 journeys verified with evidence.

## Convergence
- /speckit.converge: 18/18 scenarios passing, 11/11 harness checks passing, 0 defects outstanding.
