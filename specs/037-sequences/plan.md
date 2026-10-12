# Implementation Plan: 037 What Comes Next? (Sequence Rules & Difference Ladders) (Knot L4)

Feature Branch: `feat/037-sequences`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for What Comes Next? (Sequence Rules & Difference Ladders) logic:
  - `findFirstDifferences(terms: number[]): number[]`
  - `isArithmeticSequence(terms: number[]): { valid: boolean, commonDifference?: number }`
  - `predictNextTerm(terms: number[]): number`
- Unit tests: `src/domain/math/sequences.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/l4.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Gita.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `L4`: `k('L4', { prashna: true, bench: bench('sequences') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/sequences.ts`:
  - Interactive manipulative workbench mounted at `#sequences`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `L4`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/037-sequences.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
