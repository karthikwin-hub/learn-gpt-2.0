# Implementation Plan: 038 Growing Patterns (Figurate & Triangular Numbers) (Knot P1)

Feature Branch: `feat/038-growing-patterns`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Growing Patterns (Figurate & Triangular Numbers) logic:
  - `triangularNumber(n: number): number`
  - `squareNumber(n: number): number`
  - `gnomonSize(n: number): number`
- Unit tests: `src/domain/math/growing.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/p1.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Amit.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `P1`: `k('P1', { prashna: true, bench: bench('growing') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/growing.ts`:
  - Interactive manipulative workbench mounted at `#growing`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `P1`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/038-growing.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
