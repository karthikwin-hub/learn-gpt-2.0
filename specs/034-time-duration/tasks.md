# Tasks: 034 Time: 24-Hour Clock & Duration (Railway Time) (Knot U3)

Status: Pending Approval (Spec Kit Phase Complete)

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `specs/034-time-duration/spec.md`, `specs/034-time-duration/plan.md`, `specs/034-time-duration/tasks.md`.

- [ ] **Task 2 [US2]: Domain Module & Unit Tests**
  - Implement pure domain logic in `src/domain/math/timeclock.ts`.
  - Author unit tests in `src/domain/math/timeclock.test.ts` (100% coverage).

- [ ] **Task 3: Domain Aggregator**
  - Export functions in `src/domain/math/index.ts` and assert in `index.test.ts`.

- [ ] **Task 4 [US2] [US4]: Lesson Definition & Registry**
  - Create/update `src/domain/lesson/u3.ts` with full 7-stage metadata.
  - Register in `src/domain/lesson/registry.ts` and test in `registry.test.ts`.

- [ ] **Task 5 [US1]: Curriculum Playable Binding**
  - Bind Knot `U3` in `src/domain/curriculum/curriculum.ts`.
  - Update playable knot count in `src/domain/curriculum/index.test.ts`.

- [ ] **Task 6: Localization Dictionaries**
  - Populate English strings in `src/domain/i18n/dictionaries/en-ganita.ts` for Knot `U3`.

- [ ] **Task 7 [US3]: Interactive Workbench Screen (`#timeclock`)**
  - Implement `src/ui/components/screens/timeclock.ts`.

- [ ] **Task 8: Router Registration**
  - Mount route `#timeclock` in `src/main.ts`.

- [ ] **Task 9 [US1] [US2] [US3] [US4] [US5]: Acceptance Test Suite**
  - Author Playwright acceptance tests in `tests/acceptance/034-timeclock.spec.ts`.

- [ ] **Task 10: Traceability & Full 11-Sensor Verification**
  - Generate `traceability.md`, run `python3 scripts/harness/verify.py`.

- [ ] **Task 11: Pull Request & Merge**
  - Commit, push branch `feat/034-time-duration`, open PR, and merge into `main`.
