# Plan: 007 Logic threads (L1–L4), Marble Gates & Truth Tables

Feature: `specs/007-logic` · Branch: `feat/007-logic`

---

## 1. Architecture & Module Responsibilities
- **Domain Layer (`src/domain/math/logic.ts`)**:
  - Pure functions: `evalGate(type, a, b)` returning boolean.
  - Combinations: `getGateInputs(type)` returning `[boolean, boolean][]` (or `[boolean][]` for NOT).
  - Routes: `getMarbleRoute(type, a, b)` returning sequence of door checkpoints and destination basin (`'yes'` or `'no'`).
  - Unit tests in `src/domain/math/logic.test.ts`.
  - Re-export via `src/domain/math/index.ts`.
- **UI Manipulative (`src/ui/manipulatives/marbles.ts`)**:
  - SVG 360x360 with track geometry, door nodes (A: indigo, B: teal), YES basin (leaf) / NO basin (ink-soft), marble circle, path residue layer, and mystery cover.
  - Smooth marble animation using tween/requestAnimationFrame along polyline paths.
  - Methods: `setType(t)`, `setInputs(a, b)`, `setHidden(bool)`, `drop(done)`, `busy()`, `destroy()`.
- **Workbench Screen (`src/ui/components/screens/logic.ts`)**:
  - Screen meta registered for `id: 'logic'`.
  - Gate selection chips (`and`, `or`, `not`, `mystery`).
  - Door toggle buttons (`A: open/shut`, `B: open/shut`).
  - Drop marble button triggering animated simulation.
  - Dynamic truth table card tracking trials with active row highlight, completion summary, and mystery deduction picker.
- **Bodha Diagrams (`src/ui/diagrams/logic.ts`)**:
  - SVG diagrams illustrating marble machine tracks and logic gates for L1–L4.
- **Lessons (`src/domain/lesson/l1.ts` to `l4.ts`)**:
  - Register L1–L4 in `registry.ts`.
- **Testing & Verification**:
  - Acceptance tests in `tests/acceptance/007-logic.spec.ts`.
  - Mockup parity tests in `tests/e2e/mockup/007-logic.spec.ts`.
  - User journeys in `tests/e2e/journeys/007-journeys.spec.ts`.
  - All 11 sensors verified via `python3 scripts/harness/verify.py`.
