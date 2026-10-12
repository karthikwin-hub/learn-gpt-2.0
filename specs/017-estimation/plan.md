# Implementation Plan: 017 Estimate First & Mental Benchmarks (Knot A2)

Feature Branch: `feat/014-collection-fractions`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `estimate.ts`: Pure functions for mental estimation and rounding:
  - `roundToNearest(n: number, benchmark: 10 | 100 | 1000): number`: Rounds to nearest 10, 100, 1000 with exact half-way tie breaking.
  - `estimateRange(a: number, b: number, op: 'add' | 'sub' | 'mul'): { low: number, center: number, high: number }`: Produces reasonable bounds.
  - `isWithinMagnitude(actual: number, estimate: number): boolean`: Detects tenfold / order-of-magnitude slips.
- Unit tests: `src/domain/math/estimate.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `a2.ts`:
  - 6 Bodha cards (bazaar math, friendly neighbors, wild error detection, $392+514$ reveal, where, sutra).
  - Mistake data: Meera's $21 \times 39 = 8190$ (Step 4 wrong).
  - Explain data: cloze template with tiles `['estimate', 'exact', 'small']` and `['before', 'after', 'during']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot A2: `k('A2', { prashna: true, bench: bench('estimate') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `estimate.ts`: Manipulative workbench `#estimate`:
  - Magnetic benchmark number line slider.
  - Safe zone guardrail calculator.
  - Wild error detection radar.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for A2 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/017-estimation.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
