# Tasks: 018 Division as Repeated Subtraction (Knot D2)

Status: In Progress

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for D2 (`quotition.ts`)**
  - Implement `src/domain/math/quotition.ts` and `src/domain/math/quotition.test.ts`.

- [ ] **Task 3: Domain Aggregator**
  - Export `quotition.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/d2.ts` and register in `registry.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `D2` in `src/domain/curriculum/curriculum.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot D2.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#quotition`)**
  - Implement `src/ui/components/screens/quotition.ts`.

- [ ] **Task 8: Router Registration**
  - Register `createQuotitionScreen` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/018-quotition.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `verify.py`, author `progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push, open PR #18, and merge into `main`.
