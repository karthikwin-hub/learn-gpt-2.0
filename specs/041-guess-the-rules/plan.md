# Implementation Plan: 041 Guess the Rules (Reverse Sorting & Inductive Logic) (Knot S3)

Feature Branch: `feat/041-guess-the-rules`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Guess the Rules (Reverse Sorting & Inductive Logic) logic:
  - `evaluateRuleHypothesis(itemsInRegion: any[], itemsOutside: any[], candidateRule: string): { matches: boolean, violations: any[] }`
  - `generateMysteryVennPuzzle(difficulty: number): { ruleA: string, ruleB: string, items: any[] }`
  - `checkAllPuzzleRegions(puzzle: any, guessA: string, guessB: string): boolean`
- Unit tests: `src/domain/math/sets.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/s3.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Aman.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `S3`: `k('S3', { prashna: true, bench: bench('sets') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/sets.ts`:
  - Interactive manipulative workbench mounted at `#sets`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `S3`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/041-sets.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
