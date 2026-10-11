# Implementation Plan: 014 Fractions of a Collection (Knot N4)

Feature Branch: `feat/014-collection-fractions`

## Architecture & Module Ownership
Following `docs/ARCHITECTURE.md` and `docs/standards/ENGINEERING_PRINCIPLES.md`:

### 1. Domain Layer (`src/domain/math/`)
- `collection.ts`: Pure functions for set partitioning and like-fraction arithmetic:
  - `partitionSet(total: number, parts: number): { itemsPerPart: number, remainder: number }`: Divides $N$ tokens into $P$ parts.
  - `fractionOfSet(total: number, numerator: number, denominator: number): number`: Computes $(N \div D) \times \text{numerator}$ with strict integer validation.
  - `addLikeFractions(a: { num: number, den: number }, b: { num: number, den: number }): { num: number, den: number }`: Adds like fractions, throwing if denominators differ.
  - `isLikeFractionSum(a: { num: number, den: number }, b: { num: number, den: number }, sum: { num: number, den: number }): boolean`: Validates candidate sum without denominator addition.
- Unit tests: `src/domain/math/collection.test.ts` (100% domain test coverage).
- Export through `src/domain/math/index.ts` and test in `index.test.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `n4.ts`:
  - 6 Bodha cards (what, idea, why, example with 3-step reveal, where, sutra).
  - Mistake data: Rahul adding denominators ($\frac{2}{5} + \frac{1}{5} = \frac{3}{10}$, step 3 wrong).
  - Explain data: cloze template with tiles `['stays', 'changes', 'doubles']` and `['add', 'multiply', 'subtract']`.
- Register in `src/domain/lesson/registry.ts` and verify in `registry.test.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot N4 in `curriculum.ts`:
  ```ts
  k('N4', { prashna: true, bench: bench('collection') })
  ```
- Update `src/domain/curriculum/index.test.ts` to assert 21 playable knots.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `collection.ts`: Manipulative workbench `#collection`:
  - SVG Token Tray & Rings: Renders circular SVG tokens and circular partition rings.
  - Step 1: Dynamic partitioning stepper (2, 3, 4, 6 rings) with animated ring placement.
  - Step 2: Interactive ring selection highlighting $\frac{n}{d}$ of total.
  - Step 3: Like-fraction visual addition tray proving why denominator stays constant.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- Complete English dictionary entries for N4 Prashna, Bodha, Workbench (`collection.*`), Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/014-collection-fractions.spec.ts`)
- Covers `US1-AS1` through `US5-AS2` with Playwright across mobile viewports.
