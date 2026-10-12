# Tasks: 038 Growing Patterns (Figurate & Triangular Numbers) (Knot P1)

Status: Pending Approval (Spec Kit Phase Complete)

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/038-growing-patterns/spec.md`, `specs/038-growing-patterns/plan.md`, `specs/038-growing-patterns/tasks.md`.

- [x] **Task 2 [US2]: Domain Module & Unit Tests**
  - Implement pure domain logic in `src/domain/math/growing.ts`.
  - Author unit tests in `src/domain/math/growing.test.ts` (100% coverage).

- [x] **Task 3: Domain Aggregator**
  - Export functions in `src/domain/math/index.ts` and assert in `index.test.ts`.

- [x] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Create/update `src/domain/lesson/p1.ts` with full 7-stage metadata.
  - Register in `src/domain/lesson/registry.ts` and test in `registry.test.ts`.

- [x] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `P1` in `src/domain/curriculum/curriculum.ts`.
  - Update playable knot count in `src/domain/curriculum/index.test.ts`.

- [x] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot `P1`.

- [x] **Task 7 [US3]: Interactive Workbench Screen (`#growing`)**
  - Implement `src/ui/components/screens/growing.ts`.

- [x] **Task 8: Router Registration**
  - Mount route `#growing` in `src/main.ts`.

- [x] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author Playwright acceptance tests in `tests/acceptance/038-growing.spec.ts`.

- [x] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [x] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/038-growing-patterns`, open PR, and merge into `main`.
