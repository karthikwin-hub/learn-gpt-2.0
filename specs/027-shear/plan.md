# Implementation Plan: 027 Slide the Top (Conservation of Area under Shear) (Knot G3)

Feature Branch: `feat/027-shear`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Slide the Top (Conservation of Area under Shear) logic:
  - `parallelogramArea(base: number, height: number): number`
  - `slantLength(height: number, offset: number): number`
  - `shearDecomposition(base: number, height: number, offset: number): { triangleWidth: number, rectWidth: number, totalArea: number }`
- Unit tests: `src/domain/math/shear.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/g3.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Leena.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `G3`: `k('G3', { prashna: true, bench: bench('shear') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/shear.ts`:
  - Interactive manipulative workbench mounted at `#shear`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `G3`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/027-shear.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
