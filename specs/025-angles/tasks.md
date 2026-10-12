# Tasks: 025 Angles as Turns (Knot G1)

Status: Complete

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/025-angles/spec.md`, `specs/025-angles/plan.md`, `specs/025-angles/tasks.md`.

- [x] **Task 2 [US2]: Domain Module & Unit Tests (`src/domain/math/angles.ts`)**
  - Implement `classifyAngle`, `turnFraction`, `getAngleInfo`, `arcCoordinates`.
  - Author unit tests in `src/domain/math/angles.test.ts`.

- [x] **Task 3: Domain Aggregator**
  - Export `angles.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [x] **Task 4 [US2] [US4]: Lesson Definition & Registry Update**
  - Update `src/domain/lesson/g1.ts` with 7-stage metadata (mistake, explain) and register in `registry.ts`.

- [x] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `G1` as `{ prashna: true, bench: bench('angles') }` in `curriculum.ts`.
  - Update `curriculum/index.test.ts` expectation to 32 playable knots.

- [x] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot G1.

- [x] **Task 7 [US3]: Interactive Workbench Screen (`#angles`)**
  - Implement `src/ui/components/screens/angles.ts` with rotating ray, arm length stretcher, and dual-clock comparator.

- [x] **Task 8: Router Registration**
  - Mount `createAnglesScreen` in `src/main.ts`.

- [x] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/025-angles.spec.ts` (18/18 passing).

- [x] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [x] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/025-angles`, open PR #25, and merge into `main`.
