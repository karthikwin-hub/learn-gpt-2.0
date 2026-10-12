# Implementation Plan: 039 Sort by a Rule (Single Set & Universe of Discourse) (Knot S1)

Feature Branch: `feat/039-single-set`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Sort by a Rule (Single Set & Universe of Discourse) logic:
  - `testRuleMembership(item: any, ruleId: string): boolean`
  - `partitionSet(items: any[], ruleId: string): { inside: any[], outside: any[] }`
  - `validateSetRule(ruleId: string): boolean`
- Unit tests: `src/domain/math/singleset.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/s1.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Kunal.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `S1`: `k('S1', { prashna: true, bench: bench('singleset') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/singleset.ts`:
  - Interactive manipulative workbench mounted at `#singleset`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `S1`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/039-singleset.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
