# Implementation Plan: 010 Ganita Expansion — Numbers, Fractions & Units (N1, N3, U1)

Feature Branch: `feat/010-ganita-expansion`

## Architecture & Module Ownership
Following `docs/ARCHITECTURE.md` and `docs/standards/ENGINEERING_PRINCIPLES.md`:
1. **Domain Layer (`src/domain/math/`)**:
   - `numbers.ts`: Pure functions `formatIndianNumeral(n: number): string`, `decomposePlaceValue(n: number): PlaceDecomposition`, `getPlaceHouses(): PlaceHouseMeta[]`.
   - `fractions.ts`: Pure functions `areFractionsEquivalent(a: Fraction, b: Fraction): boolean`, `simplifyFraction(f: Fraction): Fraction`, `generateStripSegments(denominators: number[]): StripRow[]`.
   - `money.ts`: Pure functions `calculateTotalMoney(drawer: MoneyDrawer): number`, `paiseToRupeeString(paise: number): string`, `canExchangePaiseToRupee(drawer: MoneyDrawer): boolean`, `exchangePaise(drawer: MoneyDrawer): MoneyDrawer`.
   - Accompanying unit tests in `src/domain/math/*.test.ts`.
2. **Presentation Layer (`src/ui/components/screens/`)**:
   - `place.ts`: Interactive Place Houses manipulative screen (`#place`).
   - `fractions.ts`: Folding Fraction Strips manipulative screen (`#fractions`).
   - `money.ts`: Rupee & Paise Grid currency drawer screen (`#money`).
3. **Application Routing (`src/main.ts`)**:
   - Register the three new screen constructors (`createPlaceScreen`, `createFractionsScreen`, `createMoneyScreen`).
4. **Localization (`src/domain/i18n/dictionaries/`)**:
   - Verify and add UI strings for place houses, fraction folds, and currency drawer in `en`, `hi`, `te`, `ta`, `bn`.
5. **Testing**:
   - Unit tests: `numbers.test.ts`, `fractions.test.ts`, `money.test.ts`.
   - Acceptance tests: `tests/acceptance/010-ganita-expansion.spec.ts`.
   - E2E journey test: `tests/e2e/journeys/010-journeys.spec.ts`.
