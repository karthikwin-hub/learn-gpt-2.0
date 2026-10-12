# Tasks: 036 Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2) (Knot H2)

Status: Pending Approval (Spec Kit Phase Complete)

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/036-bar-graphs/spec.md`, `specs/036-bar-graphs/plan.md`, `specs/036-bar-graphs/tasks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests**
  - Implement pure domain logic in `src/domain/math/bargraph.ts`.
  - Author unit tests in `src/domain/math/bargraph.test.ts` (100% coverage).

- [ ] **Task 3: Domain Aggregator**
  - Export functions in `src/domain/math/index.ts` and assert in `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Create/update `src/domain/lesson/h2.ts` with full 7-stage metadata.
  - Register in `src/domain/lesson/registry.ts` and test in `registry.test.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `H2` in `src/domain/curriculum/curriculum.ts`.
  - Update playable knot count in `src/domain/curriculum/index.test.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot `H2`.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#bargraph`)**
  - Implement `src/ui/components/screens/bargraph.ts`.

- [ ] **Task 8: Router Registration**
  - Mount route `#bargraph` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author Playwright acceptance tests in `tests/acceptance/036-bargraph.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/036-bar-graphs`, open PR, and merge into `main`.
