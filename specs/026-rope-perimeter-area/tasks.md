# Tasks: 026 Rope and Pegs (Perimeter vs Area) (Knot G2)

Status: Complete

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/026-rope-perimeter-area/spec.md`, `plan.md`, `tasks.md`.

- [x] **Task 2 [US2]: Domain Module & Unit Tests**
  - Pure domain functions in `src/domain/math/geometry.ts` verified with Vitest.

- [x] **Task 3: Domain Aggregator**
  - Exported through `src/domain/math/index.ts`.

- [x] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Update `src/domain/lesson/g2.ts` with mistake data, test in `registry.test.ts`.

- [x] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `G2` with `prashna: true` in `src/domain/curriculum/curriculum.ts`.

- [x] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot G2.

- [x] **Task 7 [US3]: Interactive Workbench Screen (`#rope`)**
  - Update `src/ui/components/screens/rope.ts` with screen-title and mistake navigation.

- [x] **Task 8: Router Registration**
  - Route `#rope` verified in `src/main.ts`.

- [x] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author Playwright acceptance tests in `tests/acceptance/026-rope-perimeter-area.spec.ts` (16/16 passing).

- [x] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [x] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/026-rope-perimeter-area`, open PR, and merge into `main`.
