# Tasks: 014 Ganita Expansion Batch 1 (N4, N5, A1, A2)

Status: In Progress · Feature Branch: `feat/014-ganita-batch1`

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for N4 (`collection.ts`)**
  - Implement `src/domain/math/collection.ts` and `src/domain/math/collection.test.ts`.

- [ ] **Task 3 [US3]: Domain Module & Unit Tests for N5 (`decimals.ts`)**
  - Implement `src/domain/math/decimals.ts` and `src/domain/math/decimals.test.ts`.

- [ ] **Task 4 [US4]: Domain Module & Unit Tests for A1 (`regroup.ts`)**
  - Implement `src/domain/math/regroup.ts` and `src/domain/math/regroup.test.ts`.

- [ ] **Task 5 [US5]: Domain Module & Unit Tests for A2 (`estimate.ts`)**
  - Implement `src/domain/math/estimate.ts` and `src/domain/math/estimate.test.ts`.

- [ ] **Task 6: Domain Aggregator**
  - Export new modules in `src/domain/math/index.ts` and update `src/domain/math/index.test.ts`.

- [ ] **Task 7 [US2] [US3] [US4] [US5]: Lesson Definitions & Registry**
  - Implement `src/domain/lesson/n4.ts`, `n5.ts`, `a1.ts`, `a2.ts`.
  - Register in `src/domain/lesson/registry.ts` and verify in `registry.test.ts`.

- [ ] **Task 8 [US1]: Curriculum Playable Binding**
  - Update `N4`, `N5`, `A1`, `A2` in `src/domain/curriculum/curriculum.ts`.
  - Update `src/domain/curriculum/index.test.ts` to assert 24 playable knots.

- [ ] **Task 9: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for all 4 knots.

- [ ] **Task 10 [US2]: Interactive Workbench Screen (`#collection`)**
  - Implement `src/ui/components/screens/collection.ts`.

- [ ] **Task 11 [US3]: Interactive Workbench Screen (`#decimals`)**
  - Implement `src/ui/components/screens/decimals.ts`.

- [ ] **Task 12 [US4]: Interactive Workbench Screen (`#regroup`)**
  - Implement `src/ui/components/screens/regroup.ts`.

- [ ] **Task 13 [US5]: Interactive Workbench Screen (`#estimate`)**
  - Implement `src/ui/components/screens/estimate.ts`.

- [ ] **Task 14: Router Registration**
  - Register all 4 screens in `src/main.ts`.

- [ ] **Task 15 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/014-ganita-batch1.spec.ts`.

- [ ] **Task 16: Traceability & Full 11-Sensor Verification**
  - Generate `specs/014-ganita-batch1/traceability.md`.
  - Run `python3 scripts/harness/verify.py` to confirm all 11 sensors PASS.
  - Author `specs/014-ganita-batch1/progress.md`.

- [ ] **Task 17: Pull Request & Merge**
  - Commit, push `feat/014-ganita-batch1`, open PR #14, and merge into `main`.
