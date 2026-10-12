# Progress: 031 Tangrams (Dissection & Area Conservation) (Knot G7)

## Status
- **Current State**: Implemented & Verified
- **Branch**: `feat/031-tangrams`
- **Playable Knots**: 36 (Knot G7 fully active in curriculum)

## Implemented Deliverables
1. **Domain Layer (`src/domain/math/tangram.ts`)**:
   - `TANGRAM_PIECES`, `totalTangramUnits`, `calculateSilhouetteArea`, `isAreaConserved`, `canTwoSmallTrianglesCompose`, `SILHOUETTES`.
   - 100% unit test coverage in `src/domain/math/tangram.test.ts`.
2. **Aggregator (`src/domain/math/index.ts`)**:
   - Re-exported all tangram domain functions and verified in `src/domain/math/index.test.ts`.
3. **Lesson Engine (`src/domain/lesson/g7.ts`)**:
   - Created with stateKey `'tangram'`, 6 Bodha concept cards, Meera's mistake step analysis (step 2 mistake: claiming tall swan silhouette has more area than compact square), and synthesis cloze tiles (`unchanged`, `square`).
   - Verified in `src/domain/lesson/registry.test.ts`.
4. **Curriculum Binding (`src/domain/curriculum/curriculum.ts`)**:
   - Configured `G7` with `{ prashna: true, bench: bench('tangram') }`.
   - Updated playable knots count from 35 to 36 in `src/domain/curriculum/index.test.ts`.
5. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Populated English strings for Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.
6. **Workbench Screen (`src/ui/components/screens/tangram.ts`)**:
   - Interactive 7-piece tangram mat, silhouette presets (Square, Candle, Boat, Swan), area conservation status (16/16 units = 100%), small triangle composition demo, and forward navigation to Spot the Mistake.
   - Registered at `#tangram` in `src/main.ts`.
7. **Acceptance Tests (`tests/acceptance/031-tangram.spec.ts`)**:
   - 18 tests passing across mobile viewports (360px and 390px).
