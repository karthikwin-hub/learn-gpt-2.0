# Implementation Plan: 028 Kolam Mirror (Line vs Rotational Symmetry) (Knot G4)

Feature Branch: `feat/028-kolam-symmetry`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Kolam Mirror (Line vs Rotational Symmetry) logic:
  - `calculateSymmetryAxes(order: number, hasMirror: boolean): number`
  - `minimumTurnDegree(order: number): number`
  - `transformPoint(x: number, y: number, cx: number, cy: number, angleDeg: number, mirror: boolean): { x: number, y: number }`
- Unit tests: `src/domain/math/kolam.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/g4.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Arun.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `G4`: `k('G4', { prashna: true, bench: bench('kolam') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/kolam.ts`:
  - Interactive manipulative workbench mounted at `#kolam`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `G4`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/028-kolam.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
