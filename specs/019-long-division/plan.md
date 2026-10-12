# Implementation Plan: 019 Long Division Algorithm (Knot D4)

Feature Branch: `feat/019-long-division`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `longdiv.ts`: Pure functions for long-division execution:
  - `executeLongDivisionSteps(dividend: number, divisor: number): LongDivisionStep[]`: Computes each step's active column, quotient digit, product, subtraction difference, and brought-down digit.
  - `verifyLongDivision(dividend: number, divisor: number, quotient: number, remainder: number): boolean`.
- Unit tests: `src/domain/math/longdiv.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `d4.ts`:
  - 6 Bodha cards (place houses, four-beat rhythm, the zero gate, $612 \div 3 = 204$ reveal, where, sutra).
  - Mistake data: Kabir's $824 \div 4 = 26$ (Step 2 wrong).
  - Explain data: cloze template with tiles `['zero', 'one', 'dot']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot D4: `k('D4', { prashna: true, bench: bench('longdiv') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `longdiv.ts`: Manipulative workbench `#longdiv`:
  - Visual long-division bracket with active house highlights.
  - Guided step buttons (Divide, Multiply, Subtract, Bring down).
  - Zero-gate verification modal/check.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for D4 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/019-long-division.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
