# Tasks: 033 Metres, Grams and Litres (Metric Conversion Ladder) (Knot U2)

Status: In Verification

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/033-metric-units/spec.md`, `specs/033-metric-units/plan.md`, `specs/033-metric-units/tasks.md`.

- [x] **Task 2 [US2]: Domain Module & Unit Tests**
  - Implement pure domain logic in `src/domain/math/metric.ts`.
  - Author unit tests in `src/domain/math/metric.test.ts` (100% coverage).

- [x] **Task 3: Domain Aggregator**
  - Export functions in `src/domain/math/index.ts` and assert in `index.test.ts`.

- [x] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Create/update `src/domain/lesson/u2.ts` with full 7-stage metadata.
  - Register in `src/domain/lesson/registry.ts` and test in `registry.test.ts`.

- [x] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `U2` in `src/domain/curriculum/curriculum.ts`.
  - Update playable knot count in `src/domain/curriculum/index.test.ts`.

- [x] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot `U2`.

- [x] **Task 7 [US3]: Interactive Workbench Screen (`#metric`)**
  - Implement `src/ui/components/screens/metric.ts`.

- [x] **Task 8: Router Registration**
  - Mount route `#metric` in `src/main.ts`.

- [x] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author Playwright acceptance tests in `tests/acceptance/033-metric.spec.ts`.

- [x] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/033-metric-units`, open PR, and merge into `main`.
