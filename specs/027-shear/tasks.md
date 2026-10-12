# Tasks: 027 Slide the Top (Conservation of Area under Shear) (Knot G3)

Status: Complete

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/027-shear/spec.md`, `specs/027-shear/plan.md`, `specs/027-shear/tasks.md`.

- [x] **Task 2 [US2]: Domain Module & Unit Tests**
  - Implement pure domain logic in `src/domain/math/shear.ts`.
  - Author unit tests in `src/domain/math/shear.test.ts` (100% coverage).

- [x] **Task 3: Domain Aggregator**
  - Export functions in `src/domain/math/index.ts` and assert in `index.test.ts`.

- [x] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Create/update `src/domain/lesson/g3.ts` with full 7-stage metadata.
  - Register in `src/domain/lesson/registry.ts` and test in `registry.test.ts`.

- [x] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `G3` in `src/domain/curriculum/curriculum.ts`.
  - Update playable knot count in `src/domain/curriculum/index.test.ts`.

- [x] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot `G3`.

- [x] **Task 7 [US3]: Interactive Workbench Screen (`#shear`)**
  - Implement `src/ui/components/screens/shear.ts`.

- [x] **Task 8: Router Registration**
  - Mount route `#shear` in `src/main.ts`.

- [x] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author Playwright acceptance tests in `tests/acceptance/027-shear.spec.ts`.

- [x] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [x] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/027-shear`, open PR, and merge into `main`.
