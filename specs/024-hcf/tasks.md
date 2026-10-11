# Tasks: 024 Common Factors & HCF (Knot F4)

Status: In Progress

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for F4 (`hcf.ts`)**
  - Implement `src/domain/math/hcf.ts` and `src/domain/math/hcf.test.ts`.

- [ ] **Task 3: Domain Aggregator**
  - Export `hcf.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/f4.ts` and register in `registry.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `F4` in `src/domain/curriculum/curriculum.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot F4.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#hcf`)**
  - Implement `src/ui/components/screens/hcf.ts`.

- [ ] **Task 8: Router Registration**
  - Register `createHcfScreen` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/024-hcf.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `verify.py`, author `progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push, open PR #24, and merge into `main`.
