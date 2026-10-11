# Progress: 012 Loka (Social Studies) Shala

Status: Ready for Merge · Feature Branch: `feat/012-loka-shala`

---

## 1. Accomplishments
1. **Spec Kit**: Created `spec.md`, `plan.md`, `tasks.md`, `checks.md`, `traceability.md`.
2. **Domain Modules (`src/domain/world/`)**:
   - `timeline.ts`: BCE/CE signed numbers, zero-year prohibition exception, `yearsBetween` calculation ($748, 199, 99$), century calculation ($100 \to 1, 101 \to 2, 1947 \to 20$), chronological event sorting across 6 canonical Class 5 anchor events.
   - `earth.ts`: Planetary rotation local solar hours ($0^\circ \to 12, 90^\circ \to 18, 180^\circ \to 0, 270^\circ \to 6$), daytime check, northern hemisphere seasons from 23.5° axial tilt ($5 \to \text{summer}, 11 \to \text{winter}$).
   - `map.ts`: Cardinal directions N/E/S/W, coordinate stepping and walking, courtyard obstacle detection ($[4,3], [5,3], [4,4], [5,4]$ house blocking and boundaries), linear scale distance multiplication ($9 \times 5 = 45$).
   - Unit tests: 16/16 tests passing across `timeline.test.ts`, `earth.test.ts`, `map.test.ts`, `index.test.ts`.
3. **Lesson Definitions (`src/domain/lesson/`)**:
   - Added `i2.ts`, `e1.ts`, `e4.ts` with Bodha cards, Prashna, Explain back, and Spot the mistake data.
   - Registered in `src/domain/lesson/registry.ts`.
4. **Interactive Screens (`src/ui/components/screens/`)**:
   - `timeline.ts`: `#timeline` workbench with unroll demo, chronological event chips, and zero-year count calculation.
   - `earth.ts`: `#earth` workbench with North Pole view, day/night division, and seasonal orbit tilt view.
   - `map.ts`: `#map` workbench with perspective flattening, directional movement pad, obstacle collision blocking, and scale calculation.
   - Registered in `src/main.ts` with `#timeline`, `#earth`, `#seasons`, `#map`.
5. **Testing**:
   - Authoring `tests/acceptance/012-loka-shala.spec.ts` (10 acceptance tests passing).
   - Authoring `tests/e2e/journeys/012-journeys.spec.ts` (J12 full journey passing).
   - 22 Playwright tests passing across mobile viewports.
   - 100% trace coverage documented in `specs/012-loka-shala/traceability.md`.

---

## 2. Invariants Preserved
- No year zero in historical intervals.
- Earth seasons governed strictly by axial tilt, never distance.
- Map ground distance computed by multiplication, never addition.
- Zero npm runtime dependencies.
- Zero stars, points, streaks, timers, or praise words.
