# Implementation Plan: 021 Factors Make Rectangles (Knot F1)

Feature Branch: `feat/021-factors`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `factors.ts`: Pure functions for factor computation and rectangle arrangements:
  - `findFactorPairs(n: number): [number, number][]`: Returns all integer factor pairs ordered by width.
  - `findAllFactors(n: number): number[]`: Returns sorted unique factors.
  - `isValidRectangle(total: number, rows: number): boolean`: Checks if total is cleanly divisible by rows.
- Unit tests: `src/domain/math/factors.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `f1.ts`:
  - 6 Bodha cards (seeds on floor, rectangle sides, partner pairs, factors of 20 reveal, where, sutra).
  - Mistake data: Raju's incomplete list for 18 (Step 2 wrong).
  - Explain data: cloze template with tiles `['pairs', 'partner', 'multiples']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot F1: `k('F1', { prashna: true, bench: bench('factors') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `factors.ts`: Manipulative workbench `#factors`:
  - Visual tile grid with draggable row height.
  - Rainbow pair connector arc display.
  - Square number symmetry highlighter.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for F1 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/021-factors.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
