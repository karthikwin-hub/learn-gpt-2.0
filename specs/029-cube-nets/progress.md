# Progress: 029 Fold a Box (Cube Nets & Spatial Visualization) (Knot G5)

## Status
- **Current State**: Implemented & Verified
- **Branch**: `feat/029-cube-nets`
- **Playable Knots**: 34 (Knot G5 fully active in curriculum)

## Implemented Deliverables
1. **Domain Layer (`src/domain/math/cubenet.ts`)**:
   - `detectFaceCollisions`, `isValidCubeNet`, `getOppositeFacePairs` using a die-rolling spatial transition model.
   - 100% unit test coverage in `src/domain/math/cubenet.test.ts`.
2. **Aggregator (`src/domain/math/index.ts`)**:
   - Re-exported all cubenet domain functions and verified in `src/domain/math/index.test.ts`.
3. **Lesson Engine (`src/domain/lesson/g5.ts`)**:
   - Updated with stateKey `'cubenet'`, 6 Bodha concept cards, Priya's mistake step analysis (step 1 mistake: solid 2x3 block), and synthesis cloze tiles (`six`, `overlap`).
   - Verified in `src/domain/lesson/registry.test.ts`.
4. **Curriculum Binding (`src/domain/curriculum/curriculum.ts`)**:
   - Configured `G5` with `{ prashna: true, bench: bench('cubenet') }`.
   - Updated playable knots count from 33 to 34 in `src/domain/curriculum/index.test.ts`.
5. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Populated English strings for Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.
6. **Workbench Screen (`src/ui/components/screens/cubenet.ts`)**:
   - Interactive 2D hexomino editor, fold 3D scrubber slider (0° to 90°), collision detector, and forward navigation to Spot the Mistake.
   - Registered at `#cubenet` in `src/main.ts`.
7. **Acceptance Tests (`tests/acceptance/029-cubenet.spec.ts`)**:
   - 18 tests passing across mobile viewports (360px and 390px).
