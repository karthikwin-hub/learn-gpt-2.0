# Tasks: 020 Which Operation? (Knot A3)

Status: In Progress

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for A3 (`wordprob.ts`)**
  - Implement `src/domain/math/wordprob.ts` and `src/domain/math/wordprob.test.ts`.

- [ ] **Task 3: Domain Aggregator**
  - Export `wordprob.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/a3.ts` and register in `registry.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `A3` in `src/domain/curriculum/curriculum.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot A3.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#wordprob`)**
  - Implement `src/ui/components/screens/wordprob.ts`.

- [ ] **Task 8: Router Registration**
  - Register `createWordprobScreen` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/020-which-operation.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `verify.py`, author `progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push, open PR #20, and merge into `main`.
