# Implementation Plan: 035 Pictographs (Scaled Keys & Data Representation) (Knot H1)

Feature Branch: `feat/035-pictographs`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Pictographs (Scaled Keys & Data Representation) logic:
  - `calculateTotalFromIcons(fullIcons: number, halfIcons: number, keyScale: number): number`
  - `iconsRequiredForCount(count: number, keyScale: number): { full: number, half: number, remainder: number }`
  - `validatePictographScale(dataCounts: number[], keyScale: number): boolean`
- Unit tests: `src/domain/math/pictograph.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/h1.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Anita.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `H1`: `k('H1', { prashna: true, bench: bench('pictograph') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/pictograph.ts`:
  - Interactive manipulative workbench mounted at `#pictograph`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `H1`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/035-pictograph.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
