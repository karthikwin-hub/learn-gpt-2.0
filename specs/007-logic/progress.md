# Progress: 007 Logic threads (L1–L4), Marble Gates manipulative, and Truth Tables

Status: Complete · Branch: `feat/007-logic`

---

## Completed
1. Prototype mockups captured across en, te, hi for `#logic` and `#bodha?k=L2` into `specs/007-logic/mockups/`.
2. Specification authored: `spec.md`, `mockups.md`, `plan.md`, `tasks.md`, `checks.md`.
3. Mathematical domain implemented: `src/domain/math/logic.ts` with truth evaluations for AND, OR, NOT, IMPLIES, XOR, NAND, quantifier universe checking (ALL/SOME/NONE), truth table generation, and mystery machine deduction.
4. Domain unit test suite: `src/domain/math/logic.test.ts` (8/8 tests passing).
5. Interactive SVG manipulative: `src/ui/manipulatives/marbles.ts` with mechanical rocker gates, dynamic dual-door chutes, realistic physics trajectories, collision bounce, and basin accumulation.
6. Logic workbench screen: `src/ui/components/screens/logic.ts` supporting interactive gate switching, door state toggles, truth table recording, mystery deduction mode with hidden machine guessing, and quantifiers exploration.
7. Bodha diagrams: `src/ui/diagrams/logic.ts` wiring L1, L2, L3, L4 concept card illustrations into `src/ui/components/screens/bodha.ts`.
8. Lessons L1, L2, L3, L4 defined in `src/domain/lesson/l1.ts`, `l2.ts`, `l3.ts`, `l4.ts` and registered in `src/domain/lesson/registry.ts`.
9. Acceptance tests: `tests/acceptance/007-logic.spec.ts` (14 scenarios covering US1 to US5).
10. Mockup regression tests: `tests/e2e/mockup/007-logic.spec.ts`.
11. End-to-end user journeys: `tests/e2e/journeys/007-journeys.spec.ts` (J5 L1, J5 L2, J5 L4, language persistence).
12. Checks and Traceability: `specs/007-logic/checks.md` and `specs/007-logic/traceability.md` (100% covered).
13. Full verification harness passing.
