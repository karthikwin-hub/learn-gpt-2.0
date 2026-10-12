# Implementation Plan: 024 Common Factors & HCF (Knot F4)

Feature Branch: `feat/024-hcf`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `hcf.ts`: Pure functions for greatest common divisor calculations:
  - `findCommonFactors(a: number, b: number): number[]`: Computes intersection of factor sets.
  - `calculateHCF(a: number, b: number): number`: Euclidean algorithm GCD with edge case handling.
  - `simplifyFractionByHCF(num: number, den: number): { num: number, den: number, hcf: number }`.
- Unit tests: `src/domain/math/hcf.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `f4.ts`:
  - 6 Bodha cards (two wooden beams, shared factors, geometric tile size, 16 & 24 reveal, where, sutra).
  - Mistake data: Tarun stopping at 2 for 8 & 12 (Step 2 wrong).
  - Explain data: cloze template with tiles `['largest', 'remainder', 'smallest']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot F4: `k('F4', { prashna: true, bench: bench('hcf') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `hcf.ts`: Manipulative workbench `#hcf`:
  - Venn diagram factor circle sorter.
  - Dual-rod tile length comparison display.
  - One-step fraction reducer visualizer.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for F4 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/024-hcf.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
