# Tasks: 008 Pothi (Notebook), Recall & Grown-ups (Acharya Corner)

Status: Complete · Feature Branch: `feat/008-notebook`

---

## Task Matrix

- [x] **Task 1: Capture prototype mockups & baseline visual evidence**
  - Run capture tool for `#/notebook` and `#/grownups` in `en`, `te`, `hi`.
  - Save to `specs/008-notebook/mockups/`.

- [x] **Task 2: Spec Kit documentation**
  - Author `specs/008-notebook/mockups.md`, `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 3: Domain Module & Unit Tests**
  - Author `src/domain/curriculum/recall.ts` with `generateReturnQuestions`.
  - Author unit tests in `src/domain/curriculum/recall.test.ts`.
  - Export from `src/domain/curriculum/index.ts`.

- [x] **Task 4: Persistence Module**
  - Author `src/persistence/pothi.ts` with typed helpers for `NotebookPage` and `KeptSutra`.
  - Export from `src/persistence/index.ts` and add unit tests in `src/persistence/pothi.test.ts`.

- [x] **Task 5: Model Thumbnail Renderers**
  - Author `src/ui/components/notebook/thumbs.ts` with 48x48 SVG miniatures for M4, M5, D1, D3, G2, G4, S2, S3, L2.

- [x] **Task 6: Pothi Notebook Screen**
  - Author `src/ui/components/screens/notebook.ts`.
  - Wire into `src/main.ts` router registry.

- [x] **Task 7: Grown-ups Screen & Two-Finger Hold**
  - Enhance `src/ui/components/screens/grownups.ts` with full 2-finger hold detection, weekly sentences, privacy cards, settings, and two-tap erase.

- [x] **Task 8: Acceptance & E2E Test Suites**
  - Author `tests/acceptance/008-notebook.spec.ts` covering US1 to US5.
  - Author `tests/e2e/mockup/008-notebook.spec.ts`.
  - Author `tests/e2e/journeys/008-journeys.spec.ts` (J6 notebook accumulation & reopening, J8 grown-ups two-finger gate).

- [x] **Task 9: Traceability & Full Verification**
  - Generate `specs/008-notebook/traceability.md`.
  - Verify all 11 sensors pass clean in `python3 scripts/harness/verify.py`.
  - Author `specs/008-notebook/progress.md`.

- [x] **Task 10: Pull Request & Merge**
  - Commit, push `feat/008-notebook`, open PR #8, and merge into `main`.
