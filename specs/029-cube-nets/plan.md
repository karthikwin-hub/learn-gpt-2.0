# Implementation Plan: 029 Fold a Box (Cube Nets & Spatial Visualization) (Knot G5)

Feature Branch: `feat/029-cube-nets`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Fold a Box (Cube Nets & Spatial Visualization) logic:
  - `isValidCubeNet(matrix: number[][]): boolean`
  - `getOppositeFacePairs(netId: string): Array<[number, number]>`
  - `detectFaceCollisions(gridSquares: Array<{ x: number, y: number }>): { valid: boolean, overlaps: number[] }`
- Unit tests: `src/domain/math/cubenet.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/g5.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Priya.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `G5`: `k('G5', { prashna: true, bench: bench('cubenet') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/cubenet.ts`:
  - Interactive manipulative workbench mounted at `#cubenet`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `G5`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/029-cubenet.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
