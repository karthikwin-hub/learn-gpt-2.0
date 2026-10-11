# Tasks: 021 Factors Make Rectangles (Knot F1)

Status: In Progress

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for F1 (`factors.ts`)**
  - Implement `src/domain/math/factors.ts` and `src/domain/math/factors.test.ts`.

- [ ] **Task 3: Domain Aggregator**
  - Export `factors.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/f1.ts` and register in `registry.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `F1` in `src/domain/curriculum/curriculum.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot F1.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#factors`)**
  - Implement `src/ui/components/screens/factors.ts`.

- [ ] **Task 8: Router Registration**
  - Register `createFactorsScreen` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/021-factors.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `verify.py`, author `progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push, open PR #21, and merge into `main`.
