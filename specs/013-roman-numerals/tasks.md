# Tasks: 013 Roman Numerals (Knot N2)

Status: In Progress · Feature Branch: `feat/013-roman-numerals`

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 2: Roman Numerals Domain Module & Unit Tests**
  - Implement `src/domain/math/roman.ts` and `src/domain/math/roman.test.ts`.
  - Validate conversion, repetition limits, and subtractive rules.

- [x] **Task 3: Math Domain Aggregator**
  - Export `roman.ts` from `src/domain/math/index.ts` and update `src/domain/math/index.test.ts`.

- [x] **Task 4: Localization Dictionaries**
  - Populate N2 strings in `en-ganita.ts`, `hi-ganita.ts`, `te-ganita.ts`, `ta-ganita.ts`, `bn-ganita.ts`.

- [x] **Task 5 [US2] [US4]: Lesson Definition & Registry**
  - Implement `src/domain/lesson/n2.ts` and register in `src/domain/lesson/registry.ts`.
  - Update `src/domain/lesson/registry.test.ts`.

- [x] **Task 6 [US1]: Curriculum Playable Knot Binding**
  - Update `N2` in `src/domain/curriculum/curriculum.ts` to `{ prashna: true, bench: bench('roman') }`.
  - Update `src/domain/curriculum/index.test.ts` to assert 20 playable knots.

- [x] **Task 7 [US3]: Interactive Roman Screen (`#roman`)**
  - Implement `src/ui/components/screens/roman.ts`.
  - Register in `src/main.ts`.

- [x] **Task 8 [US1] [US2] [US3] [US4]: Acceptance & Journey Test Suite**
  - Author `tests/acceptance/013-roman-numerals.spec.ts`.

- [x] **Task 9: Traceability & Full 11-Sensor Verification**
  - Generate `specs/013-roman-numerals/traceability.md`.
  - Run `python3 scripts/harness/verify.py` to confirm all 11 sensors PASS.
  - Author `specs/013-roman-numerals/progress.md`.

- [ ] **Task 10: Pull Request & Merge**
  - Commit, push `feat/013-roman-numerals`, open PR #13, and merge into `main`.
