# Progress: Feature 038 — Growing Patterns (Figurate & Triangular Numbers) (Knot P1)

## Status
- **Phase**: Implementation Complete & Verified
- **Harness**: 11/11 Checks Passing (`python3 scripts/harness/verify.py`)

## What Was Done
1. **Domain Logic (`src/domain/math/growing.ts`, `growing.test.ts`)**:
   - Implemented `triangularNumber`, `squareNumber`, `gnomonSize`, `triangularLayerSize`, `generateTriangularDots`, and `generateSquareGrid`.
   - 11/11 unit tests passing (100% coverage).
   - Exported in `src/domain/math/index.ts` and asserted in `index.test.ts`.
2. **Curriculum & Lesson Registry (`src/domain/lesson/p1.ts`, `registry.ts`, `curriculum.ts`)**:
   - Defined Knot `P1` lesson data with full 7-stage engine metadata (what, idea, why, worked example, where, sutra).
   - Spot the Mistake: Amit predicting Stage 5 has 10 tiles (5 × 2) instead of 25 tiles (5 × 5).
   - Explain Back: Cloze synthesis tiles (`layer`, `sixteen`).
   - Bound Knot `P1` as active playable knot in Krama thread (`k('P1', { prashna: true, bench: bench('growing') })`), incrementing total playable knots to 43.
3. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Added all Prashna, Bodha, Workbench, Mistake, Explain, and Sutra strings for Knot `P1`.
4. **Interactive Manipulative Workbench (`src/ui/components/screens/growing.ts`)**:
   - Dot Triangle pyramid builder with stage stepper (1-6) and glowing teal new bottom layer dots.
   - Square Gnomon grid builder with L-shaped outer border tiles and calculation readouts.
   - Growth Table contrasting triangular numbers, square numbers, and Amit's linear misconception.
   - Registered `#growing` in router (`src/main.ts`).
5. **Acceptance Test Suite (`tests/acceptance/038-growing.spec.ts`)**:
   - 9 acceptance scenarios across US1–US5 passing on both 390px and 360px mobile viewports with zero gamification.
