# Implementation Plan: 031 Tangrams (Geometric Dissection & Area Conservation) (Knot G7)

Feature Branch: `feat/031-tangrams`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Tangrams (Geometric Dissection & Area Conservation) logic:
  - `tangramPieceAreas(unitSize: number): Record<string, number>`
  - `totalTangramArea(pieces: string[], unitSize: number): number`
  - `validateDissectionEquivalence(pieceSetA: string[], pieceSetB: string[]): boolean`
- Unit tests: `src/domain/math/tangram.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/g7.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Meera.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `G7`: `k('G7', { prashna: true, bench: bench('tangram') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/tangram.ts`:
  - Interactive manipulative workbench mounted at `#tangram`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `G7`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/031-tangram.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
