# Implementation Plan: 014 Ganita Expansion Batch 1 (N4, N5, A1, A2)

Feature Branch: `feat/014-ganita-batch1`

## Architecture & Module Ownership
Following `docs/ARCHITECTURE.md` and `docs/standards/ENGINEERING_PRINCIPLES.md`:

### 1. Domain Layer (`src/domain/math/`)
- `collection.ts`: Pure functions for partition collections into groups, finding fractions of sets, and adding like fractions.
  - `partitionSet(total: number, parts: number): number`
  - `fractionOfSet(total: number, num: number, den: number): number`
  - `addLikeFractions(a: { num: number, den: number }, b: { num: number, den: number }): { num: number, den: number }`
  - Unit tests in `collection.test.ts`.
- `decimals.ts`: Pure functions for decimal tenths and hundredths.
  - `decomposeDecimal(val: number): { whole: number, tenths: number, hundredths: number }`
  - `compareDecimals(a: number, b: number): number`
  - `gridTilesCount(val: number): { strips: number, singles: number }`
  - Unit tests in `decimals.test.ts`.
- `regroup.ts`: Pure functions for multi-digit addition and subtraction with columnar unbundling.
  - `getRegroupSteps(a: number, b: number, op: 'add' | 'sub'): ColumnStep[]`
  - Unit tests in `regroup.test.ts`.
- `estimate.ts`: Pure functions for rounding to friendly benchmarks (tens, hundreds, thousands) and error checking.
  - `roundToFriendly(n: number, benchmark: 10 | 100 | 1000): number`
  - `estimateOperation(a: number, b: number, op: 'add' | 'sub' | 'mul'): number`
  - `isOrderOfMagnitudeMatch(exact: number, estimate: number): boolean`
  - Unit tests in `estimate.test.ts`.
- Export through `src/domain/math/index.ts` and test in `index.test.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `n4.ts`: Lesson structure (6 Bodha cards, mistake on adding denominators, explain back cloze).
- `n5.ts`: Lesson structure (6 Bodha cards, mistake on $0.15 > 0.7$, explain back cloze).
- `a1.ts`: Lesson structure (6 Bodha cards, mistake on subtracting smaller from larger, explain back cloze).
- `a2.ts`: Lesson structure (6 Bodha cards, mistake on missed 10x error, explain back cloze).
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Activation (`src/domain/curriculum/curriculum.ts`)
- Activate knots in `curriculum.ts`:
  - `N4`: `{ prashna: true, bench: bench('collection') }`
  - `N5`: `{ prashna: true, bench: bench('decimals') }`
  - `A1`: `{ prashna: true, bench: bench('regroup') }`
  - `A2`: `{ prashna: true, bench: bench('estimate') }`

### 4. Presentation Layer (`src/ui/components/screens/`)
- `collection.ts`: Partition tokens into rings and like-fraction addition manipulative (`#collection`).
- `decimals.ts`: Interactive $10 \times 10$ hundred-grid comparison manipulative (`#decimals`).
- `regroup.ts`: Abacus place-house bead unbundler manipulative (`#regroup`).
- `estimate.ts`: Friendly benchmark number line dial manipulative (`#estimate`).
- Register in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for all 4 knots across Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/014-ganita-batch1.spec.ts`)
- Validate Shala loom playability (`US1-AS1`).
- Validate complete 7-stage flows for N4 (`US2-AS1` to `US2-AS3`), N5 (`US3-AS1` to `US3-AS3`), A1 (`US4-AS1` to `US4-AS3`), and A2 (`US5-AS1` to `US5-AS3`).
