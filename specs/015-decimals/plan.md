# Implementation Plan: 015 Tenths and Hundredths (Knot N5)

Feature Branch: `feat/014-collection-fractions`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `decimals.ts`: Pure functions for decimal modeling:
  - `decomposeDecimal(val: number): { whole: number, tenths: number, hundredths: number }`: Decomposes decimal into units, tenths, and hundredths.
  - `compareDecimals(a: number, b: number): number`: Compares two numbers by place values.
  - `gridTileBreakdown(val: number): { fullColumns: number, singleTiles: number, totalHundredths: number }`: Converts decimal into $10 \times 10$ grid coordinates.
- Unit tests: `src/domain/math/decimals.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `n5.ts`:
  - 6 Bodha cards (ruler zoom, grid strips, place comparison, 1.35 reveal, where, sutra).
  - Mistake data: Priya comparing $15 > 7$ (Step 2 wrong).
  - Explain data: cloze template with tiles `['tenths', 'hundredths', 'thousandths']` and `['place', 'length', 'color']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot N5: `k('N5', { prashna: true, bench: bench('decimals') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `decimals.ts`: Manipulative workbench `#decimals`:
  - Visual SVG $10 \times 10$ hundred-grid with individual square tiles and vertical strip selector.
  - Side-by-side decimal comparison mode ($0.5$ vs $0.15$).
  - Trailing zero conservation toggle ($0.5 \leftrightarrow 0.50$).
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for N5 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/015-decimals.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS2.
