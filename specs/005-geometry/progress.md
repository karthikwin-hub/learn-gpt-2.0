# Progress — 005 Geometry threads (G1–G5)

## Status: COMPLETE

### Completed Work
1. **Mockups**: 12 canonical mockups captured into `specs/005-geometry/mockups/` (`#rope`, `#kolam`, `#bodha?k=G2`, `#bodha?k=G4` across en, te, hi).
2. **Domain Mathematics**: `src/domain/math/geometry.ts` implementing `ropeRect`, `ropeOptions`, `maxAreaRect`, `symmetryTransforms`, `mirrorLineAngles`, `smallestTurn`. Unit tests in `src/domain/math/geometry.test.ts` (10/10 passed).
3. **Manipulatives**:
   - `src/ui/manipulatives/rope.ts`: Rope & Pegs SVG manipulative, 12x12 grid, diagonal guide, ghost layer, corner handle slider, synchronized equations, and Area Hill chart.
   - `src/ui/manipulatives/kolam.ts`: Kolam canvas board with 7x7 dot pulli grid, cyclic C_n & dihedral D_n symmetry transforms, demonstration stroke tween, and stroke undo/clear.
4. **Screens**:
   - `src/ui/components/screens/rope.ts`: `#rope` workbench with stepper, perimeter selector chips, calm feedback, and area hill card.
   - `src/ui/components/screens/kolam.ts`: `#kolam` workbench with order chips (1, 2, 4, 8), mode chips (mirror vs turn), challenge card, and smallest turn angle readout.
   - Registered both in `src/main.ts`.
5. **Bodha Diagrams & Curriculum**:
   - `src/ui/diagrams/geometry.ts`: `renderG2Ropes` and `renderG4Flower`.
   - Wired into `src/ui/components/screens/bodha.ts` for knots G2 and G4.
   - Lesson definitions `g1.ts` through `g5.ts` registered in `src/domain/lesson/registry.ts`.
6. **Tests**:
   - `tests/acceptance/005-geometry.spec.ts`: 11 acceptance scenarios covering US1–US5 (all passed).
   - `tests/e2e/mockup/005-geometry.spec.ts`: 4 mockup parity checks across 12 mockups (all passed).
   - `tests/e2e/journeys/005-journeys.spec.ts`: 4 end-to-end user journeys (all passed).
