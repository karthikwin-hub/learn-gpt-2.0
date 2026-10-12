# Progress: Feature 033 — Metres, Grams and Litres (Metric Conversion Ladder) (Knot U2)

## Status
- **Phase**: Implementation Complete & Verified
- **Harness**: 11/11 Checks Passing (`python3 scripts/harness/verify.py`)

## What Was Done
1. **Domain Logic (`src/domain/math/metric.ts`, `metric.test.ts`)**:
   - Implemented metric unit conversion ladders for Length (`km`, `m`, `cm`, `mm`), Mass (`kg`, `g`, `mg`), and Capacity (`kL`, `L`, `mL`).
   - Implemented decimal notation helper `parseMetersAndCentimeters` and equality tester `areMetricQuantitiesEqual`.
   - Aggregated in `src/domain/math/index.ts` and tested in `index.test.ts`.
2. **Curriculum & Lesson Registry (`src/domain/lesson/u2.ts`, `registry.ts`, `curriculum.ts`)**:
   - Defined Knot `U2` lesson data with full 7-stage engine metadata (what, idea, why, worked example, where, sutra).
   - Spot the Mistake: Sonia's decimal placement misconception (4 m 5 cm is 4.05 m, not 4.5 m).
   - Explain Back: Word tiles cloze test (`one hundred`, `divide`).
   - Bound Knot `U2` as active playable knot in Mana thread (`k('U2', { prashna: true, bench: bench('metric') })`), incrementing total playable knots to 38.
3. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Added all Prashna, Bodha, Workbench, Mistake, Explain, and Sutra strings for Knot `U2`.
4. **Interactive Manipulative Workbench (`src/ui/components/screens/metric.ts`)**:
   - Length Ladder interactive explorer with place value powers-of-10 shift indicators.
   - Mass and Capacity interactive submodes.
   - Dual Balance Comparator for evaluating equivalent quantities across different units with preset shortcuts.
   - Registered `#metric` in router (`src/main.ts`).
5. **Acceptance Test Suite (`tests/acceptance/033-metric.spec.ts`)**:
   - 9 acceptance scenarios across US1–US5 passing on both 390px and 360px mobile viewports with zero gamification.
