# Progress: 008 Pothi (Notebook), Recall & Grown-ups (Acharya Corner)

Status: Complete · Branch: `feat/008-notebook`

---

## Completed
1. Prototype mockups captured across en, te, hi for `#/notebook` and `#/grownups` into `specs/008-notebook/mockups/`.
2. Specification authored: `spec.md`, `mockups.md`, `plan.md`, `tasks.md`, `checks.md`.
3. Mathematical/pedagogical domain implemented: `src/domain/curriculum/recall.ts` with `computeRecallPriority` and `generateReturnQuestions` for spaced interleaved retrieval practice without cramming.
4. Domain unit test suite: `src/domain/curriculum/recall.test.ts` (5/5 tests passing).
5. Persistence layer implemented: `src/persistence/pothi.ts` with typed helpers for `NotebookPage` and `KeptSutra` storage (100% on-device, DPDP compliant).
6. Persistence unit test suite: `src/persistence/pothi.test.ts` (3/3 tests passing).
7. Compact 48x48 SVG model thumbnail renderers implemented in `src/ui/components/notebook/thumbs.ts` covering M4, M5, D1, D3, G2, G4, S2, S3, L2 models.
8. Pothi Notebook screen implemented in `src/ui/components/screens/notebook.ts` with newest-first ordering, multilingual replay of child sentences, kept sutras list, empty sample card, and workbench state reopening.
9. Upgraded Stop screen in `src/ui/components/screens/stop.ts` with model thumbnail, child sentence, sutra reflection, and calm return routes without points or timers.
10. Acharya corner / Grown-ups screen in `src/ui/components/screens/grownups.ts` with two-finger hold gate, weekly sentence activity log, pedagogy principles, DPDP privacy guarantee, system settings, and two-tap erase confirmation.
11. Acceptance test suite: `tests/acceptance/008-notebook.spec.ts` (28 scenarios covering US1 to US5).
12. Mockup parity test suite: `tests/e2e/mockup/008-notebook.spec.ts`.
13. User journey test suite: `tests/e2e/journeys/008-journeys.spec.ts` (J6 Pothi accumulation and reopening, J8 grown-ups two-finger security).
14. Traceability and checks: `specs/008-notebook/traceability.md` (100% covered).
15. Full 11-sensor verification passing.
