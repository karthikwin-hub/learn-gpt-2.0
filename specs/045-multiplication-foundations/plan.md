# Implementation Plan: 045 Multiplication Foundations: Equal Groups & Commutative Rotation (Knot M1, M3)

Feature Branch: `feat/045-multiplication-foundations`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Multiplication Foundations: Equal Groups & Commutative Rotation logic:
  - `arrayTotal(rows: number, cols: number): number`
  - `rotateArrayDimensions(rows: number, cols: number): { rows: number, cols: number, total: number }`
  - `generateArrayGrid(rows: number, cols: number): Array<{ row: number, col: number }>`
- Unit tests: `src/domain/math/rect.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/m1.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Varun.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `M1`: `k('M1', { prashna: true, bench: bench('rect') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/rect.ts`:
  - Interactive manipulative workbench mounted at `#rect`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `M1, M3`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/045-rect.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
