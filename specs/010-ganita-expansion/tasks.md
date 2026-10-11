# Tasks: 010 Ganita Expansion — Numbers, Fractions & Units (N1, N3, U1)

Status: In Progress · Feature Branch: `feat/010-ganita-expansion`

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 2: Numbers Domain Module & Unit Tests**
  - Implement `src/domain/math/numbers.ts` and `src/domain/math/numbers.test.ts`.
  - Cover Indian comma formatting, place decomposition, house limits up to Crores.

- [x] **Task 3: Fractions Domain Module & Unit Tests**
  - Implement `src/domain/math/fractions.ts` and `src/domain/math/fractions.test.ts`.
  - Cover fraction equivalence, folding divisions, strip segment models.

- [x] **Task 4: Money Domain Module & Unit Tests**
  - Implement `src/domain/math/money.ts` and `src/domain/math/money.test.ts`.
  - Cover Rupee & Paise calculations, 100 paise = ₹1 exchange logic.

- [x] **Task 5: Localization Strings**
  - Add required UI labels and instructions for place houses, fraction strips, and money grid across `en`, `hi`, `te`, `ta`, `bn`.

- [x] **Task 6: Place Houses Screen (`#place`)**
  - Implement `src/ui/components/screens/place.ts`.

- [x] **Task 7: Fraction Strips Screen (`#fractions`)**
  - Implement `src/ui/components/screens/fractions.ts`.

- [x] **Task 8: Money Grid Screen (`#money`)**
  - Implement `src/ui/components/screens/money.ts`.

- [x] **Task 9: App Router Registration**
  - Register `createPlaceScreen()`, `createFractionsScreen()`, `createMoneyScreen()` in `src/main.ts`.

- [x] **Task 10: Acceptance & E2E Test Suites**
  - Author `tests/acceptance/010-ganita-expansion.spec.ts` covering US1 to US5.
  - Author `tests/e2e/journeys/010-journeys.spec.ts`.

- [x] **Task 11: Verification & Traceability**
  - Generate `specs/010-ganita-expansion/traceability.md`.
  - Run full verification `python3 scripts/harness/verify.py` to confirm all 11 sensors PASS.
  - Author `specs/010-ganita-expansion/progress.md`.

- [x] **Task 12: Pull Request & Merge**
  - Commit, push `feat/010-ganita-expansion`, open PR #10, and merge into `main`.
