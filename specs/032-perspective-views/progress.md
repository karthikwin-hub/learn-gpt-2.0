# Progress: 032 Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8) (Knot G8)

## Status
- **Current State**: Implemented & Verified
- **Branch**: `feat/032-perspective-views`
- **Playable Knots**: 37 (Knot G8 fully active in curriculum)

## Implemented Deliverables
1. **Domain Layer (`src/domain/math/views.ts`)**:
   - `projectOrthographicViews`, `generateTopView`, `generateFrontView`, `generateSideView`, `countBlocks`, `STRUCTURE_PRESETS`.
   - 100% unit test coverage in `src/domain/math/views.test.ts`.
2. **Aggregator (`src/domain/math/index.ts`)**:
   - Re-exported all views domain functions and verified in `src/domain/math/index.test.ts`.
3. **Lesson Engine (`src/domain/lesson/g8.ts`)**:
   - Created with stateKey `'views'`, 6 Bodha concept cards, Kabir's mistake step analysis (step 2 mistake: drawing vertical step drops in overhead top view), and synthesis cloze tiles (`map`, `height`).
   - Verified in `src/domain/lesson/registry.test.ts`.
4. **Curriculum Binding (`src/domain/curriculum/curriculum.ts`)**:
   - Configured `G8` with `{ prashna: true, bench: bench('views') }`.
   - Updated playable knots count from 36 to 37 in `src/domain/curriculum/index.test.ts`.
5. **Localization (`src/domain/i18n/dictionaries/en-ganita.ts`)**:
   - Populated English strings for Prashna, Bodha, Workbench, Mistake, Explain, and Sutra.
6. **Workbench Screen (`src/ui/components/screens/views.ts`)**:
   - Interactive 3-viewport orthographic projection monitor (Top, Front, Side), presets (Staircase, Tower, L-Corner, Bridge Arch), Jaal E4 Map linkage toggle, and forward navigation to Spot the Mistake.
   - Registered at `#views` in `src/main.ts`.
7. **Acceptance Tests (`tests/acceptance/032-views.spec.ts`)**:
   - 18 tests passing across mobile viewports (360px and 390px).
