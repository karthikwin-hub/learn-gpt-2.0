# Implementation Plan: 022 Primes & Composites (Knot F2)

Feature Branch: `feat/014-collection-fractions`

## Architecture & Module Ownership

### 1. Domain Layer (`src/domain/math/`)
- `primes.ts`: Pure functions for prime number determination and sieving:
  - `isPrime(n: number): boolean`: Strict primality check (rejects $\le 1$, checks divisibility).
  - `sievePrimesUpTo(max: number): number[]`: Returns primes up to max using the Sieve of Eratosthenes.
  - `primeFactorize(n: number): number[]`: Returns prime factors of $n$.
- Unit tests: `src/domain/math/primes.test.ts`.
- Export through `src/domain/math/index.ts`.

### 2. Lesson Engine (`src/domain/lesson/`)
- `f2.ts`:
  - 6 Bodha cards (stubborn stick, 2 factors definition, status of 1 and 2, sieve up to 30 reveal, where, sutra).
  - Mistake data: Arjun claiming 9 is prime (Step 2 wrong).
  - Explain data: cloze template with tiles `['two', 'composite', 'three']`.
- Register in `src/domain/lesson/registry.ts`.

### 3. Curriculum Binding (`src/domain/curriculum/curriculum.ts`)
- Bind Knot F2: `k('F2', { prashna: true, bench: bench('primes') })`.

### 4. Presentation Layer (`src/ui/components/screens/`)
- `primes.ts`: Manipulative workbench `#primes`:
  - Single-line tile stretcher vs multi-row rectangle animator.
  - Sieve of Eratosthenes 1–50 filter grid.
  - Prime factor tree visualizer.
- Register in `src/main.ts` router.

### 5. Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)
- English strings for F2 Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.

### 6. Acceptance Testing (`tests/acceptance/022-primes.spec.ts`)
- Complete acceptance coverage for US1-AS1 through US5-AS1.
