# Progress: Feature 037 — What Comes Next? (Sequence Rules & Difference Ladders) (Knot L4)

## Status
- **Phase**: Implementation Complete & Verified
- **Harness**: 11/11 Checks Passing (`python3 scripts/harness/verify.py`)

## What Was Done
1. **Domain Logic (`src/domain/math/sequences.ts`, `sequences.test.ts`)**:
   - Implemented `findFirstDifferences`, `isArithmeticSequence`, `isGeometricSequence`, `predictNextTerm`, `predictNthTerm`, and presets `SEQUENCE_PRESETS`.
   - 12/12 unit tests passing (100% coverage).
   - Exported in `src/domain/math/index.ts` and asserted in `index.test.ts`.
2. **Curriculum & Lesson Registry (`src/domain/lesson/l4.ts`, `registry.ts`, `curriculum.ts`)**:
   - Defined Knot `L4` lesson data with full 7-stage engine metadata (what, idea, why, worked example, where, sutra).
   - Spot the Mistake: Gita's error switching from doubling (×2) to adding previous difference (16 + 8 = 24 instead of 16 × 2 = 32).
   - Explain Back: Cloze synthesis tiles (`rule`, `five`).
   - Bound Knot `L4` as active playable knot in Krama thread (`k('L4', { prashna: true, bench: bench('sequences') })`), incrementing total playable knots to 42.
3. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Added all Prashna, Bodha, Workbench, Mistake, Explain, and Sutra strings for Knot `L4`.
4. **Interactive Manipulative Workbench (`src/ui/components/screens/sequences.ts`)**:
   - Arithmetic difference ladders with sequence bubble train and dynamic next step appending.
   - Doubling Tree vs Adding Trap visualizer with Gita's warning.
   - Distant Term Predictor allowing children to calculate distant terms (e.g. 10th term) directly from the formula.
   - Registered `#sequences` in router (`src/main.ts`).
5. **Acceptance Test Suite (`tests/acceptance/037-sequences.spec.ts`)**:
   - 9 acceptance scenarios across US1–US5 passing on both 390px and 360px mobile viewports with zero gamification.
