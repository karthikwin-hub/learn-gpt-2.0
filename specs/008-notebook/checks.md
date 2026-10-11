# Checks: 008 Pothi (Notebook), Recall & Grown-ups (Acharya Corner)

Status: Evidence Protocol · Feature Branch: `feat/008-notebook`

---

## 1. Acceptance Criteria Mapping

| User Story | Acceptance Scenario | Verification Command | Target Result |
|---|---|---|---|
| US1 | US1-AS1: Notebook renders title & intro | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US1-AS1"` | PASS |
| US1 | US1-AS2: Saved pages render with thumbnail & sentence | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US1-AS2"` | PASS |
| US1 | US1-AS3: Tapping page opens workbench with state | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US1-AS3"` | PASS |
| US1 | US1-AS4: Kept sutras render and link to Bodha | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US1-AS4"` | PASS |
| US1 | US1-AS5: Empty state displays sample card | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US1-AS5"` | PASS |
| US2 | US2-AS1: Sentence saving to pages store | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US2-AS1"` | PASS |
| US2 | US2-AS2: Multilingual replay on language switch | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US2-AS2"` | PASS |
| US2 | US2-AS3: Sentence formatting integrity | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US2-AS3"` | PASS |
| US3 | US3-AS1: Spaced recall generator creates review items | `npx vitest run src/domain/curriculum/recall.test.ts` | PASS |
| US3 | US3-AS2: Older knots prioritized over recent ones | `npx vitest run src/domain/curriculum/recall.test.ts` | PASS |
| US3 | US3-AS3: Empty history produces calm prompt | `npx vitest run src/domain/curriculum/recall.test.ts` | PASS |
| US4 | US4-AS1: Stop screen shows child's sentence & sutra | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US4-AS1"` | PASS |
| US4 | US4-AS2: Calm return button with zero score pressure | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US4-AS2"` | PASS |
| US5 | US5-AS1: Grown-ups screen locked behind hold | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US5-AS1"` | PASS |
| US5 | US5-AS2: Two-finger hold unlocks adult view | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US5-AS2"` | PASS |
| US5 | US5-AS3: Weekly sentences and privacy principles | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US5-AS3"` | PASS |
| US5 | US5-AS4: Settings toggles persist | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US5-AS4"` | PASS |
| US5 | US5-AS5: Two-tap erase confirmation | `npx playwright test tests/acceptance/008-notebook.spec.ts -g "US5-AS5"` | PASS |

---

## 2. 11-Sensor Full Verification Harness

Run before PR merge:
`python3 scripts/harness/verify.py`
Expected: 11 PASS, 0 FAIL.
