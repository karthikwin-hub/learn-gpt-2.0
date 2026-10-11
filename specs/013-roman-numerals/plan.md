# Implementation Plan: 013 Roman Numerals (Knot N2)

## 1. Domain Modeling (`src/domain/math/roman.ts`)
- Pure functions:
  - `toRoman(num: number): string` (1–3999 standard conversion)
  - `fromRoman(roman: string): number`
  - `isValidRoman(s: string): boolean`
  - `explainRoman(roman: string): { symbol: string; value: number; op: 'add' | 'sub' }[]`
- Unit tests: `src/domain/math/roman.test.ts`
- Export from `src/domain/math/index.ts` and verify in `src/domain/math/index.test.ts`.

## 2. Curriculum & Lesson Engine Integration
- Lesson data in `src/domain/lesson/n2.ts`:
  - 6 Bodha cards (what, idea, why, example, where, sutra)
  - Prashna opening question
  - Mistake data: Aman writes 45 as `VL`
  - Explain data: `{ tiles: ['subtracts', 'multiplies', 'adds'], expect: 'subtracts' }`, `{ tiles: ['three', 'five', 'ten'], expect: 'three' }`
- Register in `src/domain/lesson/registry.ts`.
- Update `src/domain/curriculum/curriculum.ts` to attach `{ prashna: true, bench: bench('roman') }` to Knot `N2`.
- Update `src/domain/curriculum/index.test.ts` to assert 20 playable knots.

## 3. Localization & Strings
- Populate N2 entries in `src/domain/i18n/dictionaries/en-ganita.ts`, `hi-ganita.ts`, `te-ganita.ts`, `ta-ganita.ts`, `bn-ganita.ts`:
  - `prashna.N2.*`
  - `bodha.N2.*`
  - `mistake.N2.*`
  - `explain.N2.*`
  - `roman.*` (slate title, guides, tile labels)

## 4. UI Workbench Screen (`src/ui/components/screens/roman.ts`)
- Screen ID: `#roman`
- Stone slate manipulative with tactile Roman symbol tiles (I, V, X, L, C).
- Live evaluation readout showing token breakdown (e.g. `X (+10) + X (+10) + IV (+4) = 24`).
- Interactive steps: Explore, Build target values (14, 24, 29), and Subtractive rule test.
- Register in `src/main.ts` router.

## 5. Verification & Testing
- Vitest unit tests: `roman.test.ts`, `index.test.ts`, `registry.test.ts`, `curriculum/index.test.ts`.
- Acceptance test suite: `tests/acceptance/013-roman-numerals.spec.ts`.
- Full 11-sensor verification via `python3 scripts/harness/verify.py`.
