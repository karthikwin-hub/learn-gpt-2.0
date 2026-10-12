# Implementation Plan: 044 If This, Then That (Conditionals & Converse Fallacy) (Knot L3)

Feature Branch: `feat/044-conditionals`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for If This, Then That (Conditionals & Converse Fallacy) logic:
  - `evaluateConditional(p: boolean, q: boolean): boolean`
  - `isConverseValid(forwardRules: Array<{ p: any, q: any }>): boolean`
  - `testImplicationSubset(subsetP: any[], setQ: any[]): boolean`
- Unit tests: `src/domain/math/conditional.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/l3.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Farhan.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `L3`: `k('L3', { prashna: true, bench: bench('conditional') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/conditional.ts`:
  - Interactive manipulative workbench mounted at `#conditional`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `L3`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/044-conditional.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
