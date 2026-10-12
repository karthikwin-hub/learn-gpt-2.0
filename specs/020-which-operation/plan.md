# Implementation Plan: 020 Which Operation? (Knot A3)

Feature Branch: `feat/020-which-operation`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `wordprob.ts`: Pure functions for word problem action modeling:
  - `classifyProblemAction(type: 'combine' | 'compare' | 'replicate' | 'partition'): MathOperation`: Maps physical action to arithmetic operator.
  - `evaluateProblemModel(a: number, b: number, op: MathOperation): number`.
- Unit tests: `src/domain/math/wordprob.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `a3.ts`:
  - 6 Bodha cards (story vs math, 4 root actions, keyword trap buster, 24 & 6 comparison, where, sutra).
  - Mistake data: Amit's $40 + 15 = 55$ (Step 2 wrong).
  - Explain data: cloze template with tiles `['difference', 'subtracting', 'sum']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot A3: `k('A3', { prashna: true, bench: bench('wordprob') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `wordprob.ts`: Manipulative workbench `#wordprob`:
  - Interactive story card viewer with action badges.
  - Animated tape diagram comparator.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for A3 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/020-which-operation.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
