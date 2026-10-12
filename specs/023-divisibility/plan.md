# Implementation Plan: 023 Divisibility Tests (Knot F3)

Feature Branch: `feat/014-collection-fractions`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `divisibility.ts`: Pure functions for divisibility tests:
  - `sumOfDigits(n: number): number`: Calculates recursive or single-pass digit sum.
  - `testDivisibility(n: number, divisor: 2 | 3 | 5 | 6 | 9 | 10): { passes: boolean, reason: string }`: Evaluates specific divisibility rules with explanatory text.
- Unit tests: `src/domain/math/divisibility.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `f3.ts`:
  - 6 Bodha cards (base-10 secrets, 2 rule families, why 3-rule works, $5232$ reveal, where, sutra).
  - Mistake data: Mona's last-digit error on 43 (Step 2 wrong).
  - Explain data: cloze template with tiles `['digits', 'divides', 'last']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot F3: `k('F3', { prashna: true, bench: bench('divisibility') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `divisibility.ts`: Manipulative workbench `#divisibility`:
  - Last-digit scanner for 2, 5, 10.
  - Digit sum balance beam calculator for 3 and 9.
  - Dual-light gate for 6.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for F3 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/023-divisibility.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
