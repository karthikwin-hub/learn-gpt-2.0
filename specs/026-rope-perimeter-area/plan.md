# Implementation Plan: 026 Rope and Pegs (Perimeter vs Area) (Knot G2)

Feature Branch: `feat/026-rope-perimeter-area`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Rope and Pegs (Perimeter vs Area) logic:
  - `calculateArea(width: number, perimeter: number): number`
  - `getMaxSquareArea(perimeter: number): { side: number, area: number }`
  - `getPerimeterRectanglePairs(perimeter: number): Array<{ width: number, height: number, area: number }>`
- Unit tests: `src/domain/math/rope.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/g2.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Neha.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `G2`: `k('G2', { prashna: true, bench: bench('rope') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/rope.ts`:
  - Interactive manipulative workbench mounted at `#rope`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `G2`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/026-rope.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
