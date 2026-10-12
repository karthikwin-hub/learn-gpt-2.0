# Implementation Plan: 033 Metres, Grams and Litres (Metric Conversion Ladder) (Knot U2)

Feature Branch: `feat/033-metric-units`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Metres, Grams and Litres (Metric Conversion Ladder) logic:
  - `convertLength(value: number, from: 'km'|'m'|'cm'|'mm', to: 'km'|'m'|'cm'|'mm'): number`
  - `convertMass(value: number, from: 'kg'|'g'|'mg', to: 'kg'|'g'|'mg'): number`
  - `convertCapacity(value: number, from: 'L'|'mL', to: 'L'|'mL'): number`
- Unit tests: `src/domain/math/metric.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/u2.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Sonia.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `U2`: `k('U2', { prashna: true, bench: bench('metric') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/metric.ts`:
  - Interactive manipulative workbench mounted at `#metric`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `U2`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/033-metric.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
