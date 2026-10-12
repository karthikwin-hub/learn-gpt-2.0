# Tasks: 022 Primes & Composites (Knot F2)

Status: In Progress

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests for F2 (`primes.ts`)**
  - Implement `src/domain/math/primes.ts` and `src/domain/math/primes.test.ts`.

- [ ] **Task 3: Domain Aggregator**
  - Export `primes.ts` in `src/domain/math/index.ts` and update `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/f2.ts` and register in `registry.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `F2` in `src/domain/curriculum/curriculum.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot F2.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#primes`)**
  - Implement `src/ui/components/screens/primes.ts`.

- [ ] **Task 8: Router Registration**
  - Register `createPrimesScreen` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/022-primes.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `verify.py`, author `progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push, open PR #22, and merge into `main`.
