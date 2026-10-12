# Implementation Plan: 042 True for All? (Universal Claims & Counterexamples) (Knot L1)

Feature Branch: `feat/042-counterexamples`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for True for All? (Universal Claims & Counterexamples) logic:
  - `findCounterexample(claimId: string, testRange: number[]): { found: boolean, counterexample?: any }`
  - `verifyUniversalStatement(claim: (x: any) => boolean, domain: any[]): { holds: boolean, counterexample?: any }`
  - `formatDisproof(claimText: string, counterexampleValue: any): string`
- Unit tests: `src/domain/math/counterexample.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/l1.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Rahul.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `L1`: `k('L1', { prashna: true, bench: bench('counterexample') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/counterexample.ts`:
  - Interactive manipulative workbench mounted at `#counterexample`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `L1`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/042-counterexample.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
