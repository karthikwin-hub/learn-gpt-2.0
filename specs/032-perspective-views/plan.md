# Implementation Plan: 032 Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8) (Knot G8)

Feature Branch: `feat/032-perspective-views`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8) logic:
  - `generateTopView(grid3D: number[][][]): boolean[][]`
  - `generateFrontView(grid3D: number[][][]): boolean[][]`
  - `generateSideView(grid3D: number[][][]): boolean[][]`
- Unit tests: `src/domain/math/views.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/g8.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Kabir.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `G8`: `k('G8', { prashna: true, bench: bench('views') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/views.ts`:
  - Interactive manipulative workbench mounted at `#views`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `G8`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/032-views.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
