# Tasks: 005 Geometry threads (G1–G5), Rope & Pegs, Mirror & Turn

Status: Completed · Feature: `specs/005-geometry` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): G2 Area vs Perimeter — Rope and Pegs
- [x] T001 `[mockup]` Verify mockups captured in `specs/005-geometry/mockups/` for `#rope`, `#kolam`, `#bodha?k=G2`, `#bodha?k=G4`.
- [x] T002 `[test-unit]` Author domain geometry unit tests in `src/domain/math/geometry.test.ts`.
- [x] T003 `[port-domain]` Implement `src/domain/math/geometry.ts` and export via `src/domain/math/index.ts`.
- [x] T004 `[test-acceptance]` Author acceptance tests for `US1` in `tests/acceptance/005-geometry.spec.ts`.
- [x] T005 `[port-ui]` Implement Rope and Pegs SVG manipulative and Area Hill chart in `src/ui/manipulatives/rope.ts`.
- [x] T006 `[port-ui]` Implement Rope and Pegs workbench screen in `src/ui/components/screens/rope.ts` and register in `src/main.ts`.
- [x] T007 `[test-acceptance]` Verify `US1` acceptance tests pass.

---

## Story US2 (P1): G4 Kolam Mirror & Turn Symmetry
- [x] T008 `[test-acceptance]` Author acceptance tests for `US2` in `tests/acceptance/005-geometry.spec.ts`.
- [x] T009 `[port-ui]` Implement Kolam Mirror & Turn manipulative in `src/ui/manipulatives/kolam.ts`.
- [x] T010 `[port-ui]` Implement Kolam workbench screen in `src/ui/components/screens/kolam.ts` and register in `src/main.ts`.
- [x] T011 `[test-acceptance]` Verify `US2` acceptance tests pass.

---

## Story US3 (P2): Bodha Concept Cards for G2 & G4
- [x] T012 `[port-ui]` Implement Bodha diagrams for G2 rope rectangles and G4 flower petals in `src/ui/diagrams/geometry.ts`.
- [x] T013 `[port-domain]` Define lesson data for G2 and G4 in `src/domain/lesson/g2.ts` and `src/domain/lesson/g4.ts`, registered in `src/domain/lesson/registry.ts`.
- [x] T014 `[port-ui]` Wire G2 and G4 diagrams into `src/ui/components/screens/bodha.ts`.
- [x] T015 `[test-acceptance]` Author and verify acceptance tests for `US3`.

---

## Story US4 (P2): G1, G3, G5 Curriculum Integration
- [x] T016 `[port-domain]` Define lesson data for G1, G3, G5 in `src/domain/lesson/` and register in `src/domain/lesson/registry.ts`.
- [x] T017 `[test-acceptance]` Author and verify acceptance tests for `US4`.

---

## Story US5 (P1): Calm Invariants & Multilingual Equity
- [x] T018 `[test-acceptance]` Author and verify calm feedback and multilingual tests in Telugu and Hindi for `US5`.

---

## Verification & Exit Gate
- [x] T019 `[test-mockup]` Author mockup test suite in `tests/e2e/mockup/005-geometry.spec.ts` asserting against 12 mockups.
- [x] T020 `[test-journeys]` Author user journey suite in `tests/e2e/journeys/005-journeys.spec.ts`.
- [x] T021 `[traceability]` Update traceability matrix.
- [x] T022 `[verify]` Run complete verification harness `python3 scripts/harness/verify.py` and confirm all 11 sensors pass clean.
