# Checks — 002 Lesson engine, Bodha cards and Living Film player

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US1-AS1: Carry On State Retention`) | Verified passing across viewports (390x844, 360x740) |
| US1-AS2 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US1-AS2: Linear Progression without Film`) | Verified passing across viewports |
| US1-AS3 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US1-AS3: Linear Progression with Film`) | Verified passing across viewports |
| US2-AS1 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US2-AS1: Beat Pause automatically halts at narrative beat end`) | Verified passing across viewports |
| US2-AS2 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US2-AS2: Interactive Exploration During Pause`) | Verified passing across viewports |
| US2-AS3 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US2-AS3: Bidirectional Scrubber`) | Verified passing across viewports |
| US2-AS4 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US2-AS4: Reduced-Motion Cut Mode`) | Verified passing across viewports |
| US3-AS1 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US3-AS1: Speech Synthesis Narration with Caption Parity`) | Verified passing across viewports |
| US3-AS2 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US3-AS2: Sound Toggle and Speech Rate Customization`) | Verified passing across viewports |
| US4-AS1 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US4-AS1: Interactive Rubber Rectangle with Synchronized Equation`) | Verified passing across viewports |
| US4-AS2 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US4-AS2: Scaffold Fading transitions from guided demonstration`) | Verified passing across viewports |
| US5-AS1 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US5-AS1: Descriptive Reality Feedback`) | Verified zero praise words, stars, points, streaks |
| US5-AS2 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US5-AS2: Non-Punitive Color Invariant`) | Verified zero punitive red / error banners |
| US6-AS1 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US6-AS1: Prashna to Bodha Gate`) | Verified passing across viewports |
| US6-AS2 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US6-AS2: Step-by-Step Worked Example Reveal`) | Verified passing across viewports |
| US6-AS3 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US6-AS3: Bilingual Glossary Bridge Card`) | Verified passing across viewports |
| US6-AS4 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US6-AS4: In-Workbench Bodha Recall`) | Verified passing across viewports |
| US6-AS5 | PASS | `tests/acceptance/002-lesson-engine.spec.ts` (`US6-AS5: Sutra Retention persists kept sutra`) | Verified passing across viewports |
| J3 Prashna to Stop flow | PASS | `tests/e2e/journeys/002-journeys.spec.ts` (`J3: Prashna to Stop flow progresses sequentially`) | Complete 7-stage thread flow verified |
| J4 Film interactive pause | PASS | `tests/e2e/journeys/002-journeys.spec.ts` (`J4: Film interactive pause allows dragging`) | Pause and ghost outline verified |
| J7 Keep sutra persistence | PASS | `tests/e2e/journeys/002-journeys.spec.ts` (`J7: Keep sutra persists saved insight`) | Sutra persistence to storage verified |
| Parity: `wonder` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`wonder route renders prashna prediction`) | Art and prediction inputs verified |
| Parity: `bodha?k=M2` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`bodha route renders concept cards`) | Concept cards, beads, and stage bar verified |
| Parity: `film` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`film route renders living film player`) | Film stage, controls, and scrubber verified |
| Parity: `rect` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`rect route renders rubber rectangle`) | Area grid, steppers, and equation verified |
| Parity: `mistake` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`mistake route renders spot the mistake`) | Work steps and focal pointer verified |
| Parity: `explain` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`explain route renders explain it back`) | Sentence builder and chips verified |
| Parity: `stop` | PASS | `tests/e2e/mockup/002-lesson.spec.ts` (`stop route renders calm stopping screen`) | Calm review and return button verified |
| Sweep: 5 languages | PASS | `tests/e2e/sweep/` (`npx playwright test tests/e2e/sweep`) | 0 console errors, 0 overflow across languages |

## Independent review
- Reviewer: Automated Verification Suite (`verify.py`) · Verdict: PASS · Findings resolved: Architecture decoupling verified with 0 dependency-cruiser violations.

## Convergence
- /speckit.converge: 18/18 acceptance scenarios PASS, 7/7 route mockup parities PASS, 3/3 user journeys PASS.
