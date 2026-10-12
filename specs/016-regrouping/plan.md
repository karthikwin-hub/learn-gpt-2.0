# Implementation Plan: 016 Adding & Subtracting Big Numbers with Regrouping (Knot A1)

Feature Branch: `feat/014-collection-fractions`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `regroup.ts`: Pure functions for columnar multi-digit arithmetic:
  - `decomposeColumnSubtraction(minuend: number, subtrahend: number): SubtractionStep[]`: Computes each column's borrow status, unbundled values, and differences.
  - `decomposeColumnAddition(a: number, b: number): AdditionStep[]`: Computes column sums, carries, and resulting digits.
- Unit tests: `src/domain/math/regroup.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `a1.ts`:
  - 6 Bodha cards (column rules, unbundling idea, why $500$ converts to $400+90+10$, worked example $40,005 - 18,347$, where, sutra).
  - Mistake data: Dev's inverted subtraction $704 - 358 = 454$ (Step 2 wrong).
  - Explain data: cloze template with tiles `['borrow', 'add', 'multiply']` and `['ten', 'one', 'hundred']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot A1: `k('A1', { prashna: true, bench: bench('regroup') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `regroup.ts`: Manipulative workbench `#regroup`:
  - Visual place-house abacus with animated bead unbundling.
  - Columnar subtraction and addition interaction modes.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for A1 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/016-regrouping.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
