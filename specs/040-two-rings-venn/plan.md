# Implementation Plan: 040 Two Rings (Venn Overlap, Union & Complement) (Knot S2)

Feature Branch: `feat/040-two-rings-venn`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Two Rings (Venn Overlap, Union & Complement) logic:
  - `classifyVennRegion(item: any, ruleA: (x: any) => boolean, ruleB: (x: any) => boolean): 'onlyA' | 'onlyB' | 'both' | 'neither'`
  - `getRegionCounts(items: any[], ruleA: any, ruleB: any): Record<string, number>`
  - `verifyVennSum(items: any[], counts: Record<string, number>): boolean`
- Unit tests: `src/domain/math/sets.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/s2.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Pooja.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `S2`: `k('S2', { prashna: true, bench: bench('sets') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/sets.ts`:
  - Interactive manipulative workbench mounted at `#sets`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `S2`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/040-sets.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
