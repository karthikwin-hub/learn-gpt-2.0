# Checks: 009 Gurukul Shell — Full Multi-Subject Ashram, Shalas & Jaal

Status: Evidence Protocol · Feature Branch: `feat/009-ashram-shell`

---

## 1. Acceptance Criteria Mapping

| User Story | Acceptance Scenario | Verification Command | Target Result |
|---|---|---|---|
| US1 | US1-AS1: Ashram renders Banyan, 3 Shala cards, bottom links | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US1-AS1"` | PASS |
| US1 | US1-AS2: Carry-on card resumes in-flight knot | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US1-AS2"` | PASS |
| US2 | US2-AS1: Shala looms render threads and knots | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US2-AS1"` | PASS |
| US2 | US2-AS2: Tapping unbuilt knot displays calm notice | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US2-AS2"` | PASS |
| US2 | US2-AS3: Tapping playable knot opens first step and saves continue | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US2-AS3"` | PASS |
| US3 | US3-AS1: Stage bar marks active stage with accessible label | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US3-AS1"` | PASS |
| US3 | US3-AS2: What am I learning link returns to Bodha | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US3-AS2"` | PASS |
| US4 | US4-AS1: Jaal screen renders triangle network SVG | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US4-AS1"` | PASS |
| US4 | US4-AS2: Selecting crossing curve displays explanation card | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US4-AS2"` | PASS |
| US5 | US5-AS1: Zero gamification pressure | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US5-AS1"` | PASS |
| US5 | US5-AS2: Multilingual script purity across 5 Indic languages | `npx playwright test tests/acceptance/009-ashram-shell.spec.ts -g "US5-AS2"` | PASS |

---

## 2. 11-Sensor Full Verification Harness

Run before PR merge:
`python3 scripts/harness/verify.py`
Expected: 11 PASS, 0 FAIL.
