# Progress: 027 Slide the Top (Conservation of Area under Shear) (Knot G3)

## Status
- **Current State**: Implemented & Verified
- **Branch**: `feat/027-shear`
- **Playable Knots**: 33 (Knot G3 active in curriculum)

## Implemented Deliverables
1. **Domain Model (`src/domain/math/shear.ts`)**:
   - `parallelogramArea`, `slantLength`, `parallelogramPerimeter`, `shearDecomposition`, `isAreaConservedUnderShear`.
   - Comprehensive unit test suite in `src/domain/math/shear.test.ts`.
2. **Aggregator (`src/domain/math/index.ts`)**:
   - Re-exported all shear domain methods and verified in `src/domain/math/index.test.ts`.
3. **Lesson Engine (`src/domain/lesson/g3.ts`)**:
   - Configured with stateKey `'shear'`, 6 Bodha concept cards, Leena's mistake step analysis (step 2 mistake), and synthesis cloze tiles (`area`, `perpendicular`).
   - Verified in `src/domain/lesson/registry.test.ts`.
4. **Curriculum Binding (`src/domain/curriculum/curriculum.ts`)**:
   - Bound `G3` with `{ prashna: true, bench: bench('shear') }`.
   - Updated playable knots count from 32 to 33 in `src/domain/curriculum/index.test.ts`.
5. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Populated English strings for Prashna, Bodha, Mistake, Explain, Sutra, and Workbench.
6. **Workbench Screen (`src/ui/components/screens/shear.ts`)**:
   - Mounted at `#shear` with guide rail slider, cut-and-shift triangular toggle, real-time invariant area readouts, and responsive touch controls.
7. **Acceptance Tests (`tests/acceptance/027-shear.spec.ts`)**:
   - 18 tests passing across mobile viewports (360px and 390px).
