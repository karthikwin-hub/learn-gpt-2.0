# Progress: 030 Circles: Centre, Radius, Diameter (Knot G6)

## Status
- **Current State**: Implemented & Verified
- **Branch**: `feat/030-circles`
- **Playable Knots**: 35 (Knot G6 fully active in curriculum)

## Implemented Deliverables
1. **Domain Layer (`src/domain/math/circle.ts`)**:
   - `diameterFromRadius`, `radiusFromDiameter`, `chordLength`, `isChordDiameter`, `circumference`, `circleArea`, `compareChordToDiameter`.
   - 100% unit test coverage in `src/domain/math/circle.test.ts`.
2. **Aggregator (`src/domain/math/index.ts`)**:
   - Re-exported all circle domain functions and verified in `src/domain/math/index.test.ts`.
3. **Lesson Engine (`src/domain/lesson/g6.ts`)**:
   - Created with stateKey `'circle'`, 6 Bodha concept cards, Dev's mistake step analysis (step 2 mistake: off-centre chord labeled as diameter), and synthesis cloze tiles (`radius`, `twice`).
   - Verified in `src/domain/lesson/registry.test.ts`.
4. **Curriculum Binding (`src/domain/curriculum/curriculum.ts`)**:
   - Configured `G6` with `{ prashna: true, bench: bench('circle') }`.
   - Updated playable knots count from 34 to 35 in `src/domain/curriculum/index.test.ts`.
5. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Populated English strings for Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.
6. **Workbench Screen (`src/ui/components/screens/circle.ts`)**:
   - Interactive circle compass, radius slider (2 to 8 cm), distance from centre offset slider (0 to r), presets for diameter and off-centre chord, live SVG visualization, and forward navigation to Spot the Mistake.
   - Registered at `#circle` in `src/main.ts`.
7. **Acceptance Tests (`tests/acceptance/030-circle.spec.ts`)**:
   - 18 tests passing across mobile viewports (360px and 390px).
