# Tasks: 014 Fractions of a Collection (Knot N4)

Status: In Progress · Feature Branch: `feat/014-collection-fractions`

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 2 [US2]: Domain Module & Unit Tests for N4 (`collection.ts`)**
  - Implement `src/domain/math/collection.ts` and `src/domain/math/collection.test.ts`.
  - Validate set partitioning, fraction of collections, and like-fraction sums.

- [x] **Task 3: Domain Aggregator**
  - Export `collection.ts` in `src/domain/math/index.ts` and update `src/domain/math/index.test.ts`.

- [x] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/n4.ts` with 6 Bodha cards, mistake data, and explain cloze.
  - Register in `src/domain/lesson/registry.ts` and verify in `registry.test.ts`.

- [x] **Task 5 [US1]: Curriculum Playable Binding**
  - Update `N4` in `src/domain/curriculum/curriculum.ts` to `{ prashna: true, bench: bench('collection') }`.
  - Update `src/domain/curriculum/index.test.ts` to assert 21 playable knots.

- [x] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot N4.

- [x] **Task 7 [US3]: Interactive Workbench Screen (`#collection`)**
  - Implement `src/ui/components/screens/collection.ts` with SVG token trays, partition rings, and like-fraction addition.

- [x] **Task 8: Router Registration**
  - Register `createCollectionScreen` in `src/main.ts`.

- [x] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author `tests/acceptance/014-collection-fractions.spec.ts`.

- [x] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `specs/014-collection-fractions/traceability.md`.
  - Run `python3 scripts/harness/verify.py` to confirm all 11 sensors PASS.
  - Author `specs/014-collection-fractions/progress.md`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push `feat/014-collection-fractions`, open PR #14, and merge into `main`.
