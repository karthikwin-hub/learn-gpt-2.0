# Tasks: 023 Divisibility Tests (Knot F3)

Status: In Progress

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for F3 (`divisibility.ts`)**
  - Implement `src/domain/math/divisibility.ts` and `src/domain/math/divisibility.test.ts`.

- [ ] **Task 3: Domain Aggregator**
  - Export `divisibility.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/f3.ts` and register in `registry.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `F3` in `src/domain/curriculum/curriculum.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot F3.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#divisibility`)**
  - Implement `src/ui/components/screens/divisibility.ts`.

- [ ] **Task 8: Router Registration**
  - Register `createDivisibilityScreen` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/023-divisibility.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `verify.py`, author `progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push, open PR #23, and merge into `main`.
