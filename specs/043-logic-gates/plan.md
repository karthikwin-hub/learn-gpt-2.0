# Implementation Plan: 043 Marble Gates (Boolean Logic: AND, OR, NOT) (Knot L2)

Feature Branch: `feat/043-logic-gates`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Marble Gates (Boolean Logic: AND, OR, NOT) logic:
  - `evaluateAndGate(a: boolean, b: boolean): boolean`
  - `evaluateOrGate(a: boolean, b: boolean): boolean`
  - `evaluateNotGate(a: boolean): boolean`
  - `generateTruthTable(gateType: 'AND'|'OR'|'NOT'): Array<{ inputs: boolean[], output: boolean }>`
- Unit tests: `src/domain/math/logic.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/l2.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Sneha.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `L2`: `k('L2', { prashna: true, bench: bench('logic') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/logic.ts`:
  - Interactive manipulative workbench mounted at `#logic`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `L2`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/043-logic.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
