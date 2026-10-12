# Implementation Plan: 018 Division as Repeated Subtraction (Knot D2)

Feature Branch: `feat/018-quotition`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `quotition.ts`: Pure functions for repeated subtraction division:
  - `repeatedSubtractionSteps(total: number, groupSize: number): SubtractionHop[]`: Generates every backward subtraction hop with intermediate differences.
  - `quotitionDivide(total: number, groupSize: number): { quotient: number, remainder: number }`: Computes packages count and leftover.
- Unit tests: `src/domain/math/quotition.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `d2.ts`:
  - 6 Bodha cards (sharing vs grouping, backward jumps, why $20-4-4...=0$, worked example $18 \div 6$, where, sutra).
  - Mistake data: Sita stopping at $15 - 3 = 12$ (Step 2 wrong).
  - Explain data: cloze template with tiles `['groups', 'subtracting', 'plates']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot D2: `k('D2', { prashna: true, bench: bench('quotition') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `quotition.ts`: Manipulative workbench `#quotition`:
  - Visual backward number line with animated hops.
  - Box packaging stacker shelf and remainder tray.
  - Sharing vs Grouping duality toggle.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for D2 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/018-quotition.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
