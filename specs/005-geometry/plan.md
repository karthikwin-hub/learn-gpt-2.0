# Implementation Plan: 005 Geometry threads (G1–G5), Rope & Pegs, Mirror & Turn

<!-- Spec Kit standard. Status: Draft · Priority: P1 · Lane: Feature · Branch: feat/005-geometry -->

## 1. Port Map & Architectural Alignment

| Source in Prototype | Target in Production | Ownership & Responsibilities |
|---|---|---|
| `design/prototype/js/model/geometry.js` | `src/domain/math/geometry.ts` | **Domain Math**: Pure geometry calculations (`ropeRect`, `ropeOptions`, `maxAreaRect`, `symmetryTransforms`, `mirrorLineAngles`, `smallestTurn`). No DOM, no framework imports. |
| `design/prototype/js/manipulatives/rope.js` | `src/ui/manipulatives/rope.ts` | **UI Manipulative**: Pure SVG rope rectangle component with corner slider, ghost outlines, diagonal guide line, and area hill bar chart. |
| `design/prototype/js/manipulatives/kolam-mirror.js` | `src/ui/manipulatives/kolam.ts` | **UI Manipulative**: HTML5 Canvas / SVG interactive symmetry drawing board supporting dihedral $D_n$ and cyclic $C_n$ stroke replication, threshold dot grid, and stroke history. |
| `design/prototype/js/screens/workbenches.js` (lines 232–320) | `src/ui/components/screens/rope.ts`, `kolam.ts` | **UI Screens**: `#rope` and `#kolam` workbench screens, chips, steppers, live math equations, and narrator synthesis. |
| `design/prototype/js/lessons/ganita-p1.js` (ropes, flowers) | `src/ui/diagrams/geometry.ts` | **UI Diagrams**: Bodha SVG diagram generators for G2 rope rectangles and G4 flower petals. |
| `src/domain/lesson/g1.ts` to `g5.ts` | `src/domain/lesson/` | **Domain Lesson**: Lesson specifications registered in `registry.ts`. |
| `src/main.ts` | `src/main.ts` | Register `createRopeScreen` and `createKolamScreen`. |

---

## 2. Invariants Checklist
- [x] Zero runtime dependencies: Plain TypeScript + DOM + Canvas/SVG.
- [x] Pure domain separation: `src/domain/math/geometry.ts` contains only pure functions.
- [x] Calm feedback: zero chimes, stars, praise words.
- [x] Full accessibility: keyboard arrow keys and accessible steppers accompany pointer drags.
- [x] Multilingual equity: 5 Indic languages supported without refresh.

---

## 3. Test Strategy
1. **Unit Tests**:
   - `src/domain/math/geometry.test.ts`: test `ropeRect`, `ropeOptions`, `maxAreaRect` finding square $6 \times 6$, `mirrorLineAngles`, `smallestTurn`.
2. **Acceptance Tests**:
   - `tests/acceptance/005-geometry.spec.ts`: test US1–US5 (perimeter invariance, area hill, square detection, kolam mirror/turn modes, undo/clear, Bodha cards).
3. **Mockup Parity Tests**:
   - `tests/e2e/mockup/005-geometry.spec.ts`: verify `#rope`, `#kolam`, `#bodha?k=G2`, `#bodha?k=G4` against 12 captured PNGs.
4. **User Journeys**:
   - `tests/e2e/journeys/005-journeys.spec.ts`: end-to-end J5 flows for G2 and G4, plus J2 language switch state preservation.
5. **Quality Sensors**:
   - `python3 scripts/harness/verify.py` passes 11/11 sensors.
