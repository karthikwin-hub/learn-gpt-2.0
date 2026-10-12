# Implementation Plan: 034 Time: 24-Hour Clock & Duration (Railway Time) (Knot U3)

Feature Branch: `feat/034-time-duration`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- Module: Pure functions for Time: 24-Hour Clock & Duration (Railway Time) logic:
  - `to24Hour(hours12: number, minutes: number, isPm: boolean): { hours24: number, minutes: number }`
  - `to12Hour(hours24: number, minutes: number): { hours12: number, minutes: number, isPm: boolean }`
  - `calculateDuration(startH: number, startM: number, endH: number, endM: number): { hours: number, minutes: number, totalMinutes: number }`
- Unit tests: `src/domain/math/timeclock.test.ts`.
- Export through domain aggregator `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- Lesson definition: `src/domain/lesson/u3.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra).
  - Mistake configuration for Rohan.
  - Explain cloze configuration.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot `U3`: `k('U3', { prashna: true, bench: bench('timeclock') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- Screen: `src/ui/components/screens/timeclock.ts`:
  - Interactive manipulative workbench mounted at `#timeclock`.
  - Reversible physics, accessible numeric steppers, mobile responsive layout.
- Router registration in `src/main.ts`.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Populate localized English strings for Knot `U3`:
  - Prashna prompt, choices, explanation.
  - Bodha cards and Sutra.
  - Mistake dialogue and correction.
  - Workbench labels and instructions.

### 6. Acceptance Testing (`tests/acceptance/034-timeclock.spec.ts`)
- Complete Playwright test suite verifying US1-AS1 through US5-AS1 across 360px and 390px viewports.
