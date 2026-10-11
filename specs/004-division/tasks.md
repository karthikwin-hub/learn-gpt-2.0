# Tasks: 004 Division threads (D1–D4) & Fair Share Table

Status: Complete · Feature: `specs/004-division` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): D1 Fair Share Workbench
- [x] T001 `[mockup]` Verify mockups captured in `specs/004-division/mockups/` for `#share?mode=share`, `#share?mode=leftover`, `#bodha?k=D1`, `#bodha?k=D3` across `en`, `hi`, `ta`.
- [x] T002 `[test-unit]` Author domain math unit tests in `src/domain/math/divide.test.ts` testing `share`, `dealSequence`, `leftoverFraction`, `factorPairs`.
- [x] T003 `[port-domain]` Implement `src/domain/math/divide.ts` and export via `src/domain/math/index.ts`.
- [x] T004 `[test-acceptance]` Author acceptance tests for `US1` in `tests/acceptance/004-division.spec.ts`.
- [x] T005 `[port-ui]` Implement Fair Share SVG manipulative in `src/ui/manipulatives/fair-share.ts`.
- [x] T006 `[port-ui]` Implement Fair Share workbench screen in `src/ui/components/screens/share.ts` and register in `src/main.ts`.
- [x] T007 `[test-acceptance]` Verify `US1` acceptance tests pass.

---

## Story US2 (P1): D3 Remainder & Fractions
- [x] T008 `[test-acceptance]` Author acceptance tests for `US2` in `tests/acceptance/004-division.spec.ts`.
- [x] T009 `[port-ui]` Implement remainder tray support and fractional wedge cutting (`cutLeftovers`) in `src/ui/manipulatives/fair-share.ts` and `src/ui/components/screens/share.ts`.
- [x] T010 `[test-acceptance]` Verify `US2` acceptance tests pass.

---

## Story US3 (P2): Bodha Concept Cards for D1 & D3
- [x] T011 `[port-ui]` Implement Bodha plate diagrams in `src/ui/diagrams/share.ts`.
- [x] T012 `[port-domain]` Define lesson data for D1 and D3 in `src/domain/lesson/d1.ts` and `src/domain/lesson/d3.ts`, registered in `src/domain/lesson/registry.ts`.
- [x] T013 `[port-ui]` Wire D1 and D3 diagrams into `src/ui/components/screens/bodha.ts`.
- [x] T014 `[test-acceptance]` Author and verify acceptance tests for `US3`.

---

## Story US4 (P2): D2 & D4 Curriculum Integration
- [x] T015 `[port-domain]` Define D2 (Grouping) and D4 (Missing side) lesson definitions in `src/domain/lesson/d2.ts` and `src/domain/lesson/d4.ts`.
- [x] T016 `[test-acceptance]` Author and verify acceptance tests for `US4`.

---

## Story US5 (P1): Calm Pedagogical Invariants & Multilingual Equity
- [x] T017 `[test-acceptance]` Author and verify calm pedagogy and Tamil language equity tests for `US5`.
- [x] T018 `[sweep]` Verify zero banned words across all division screens and cards.

---

## Verification & Exit Gate
- [x] T019 `[test-mockup]` Author mockup test suite in `tests/e2e/mockup/004-division.spec.ts` asserting against 12 mockups.
- [x] T020 `[test-journeys]` Author user journey suite in `tests/e2e/journeys/004-journeys.spec.ts`.
- [x] T021 `[traceability]` Update traceability matrix via `python3 scripts/harness/check_traceability.py --write`.
- [x] T022 `[verify]` Run complete verification harness `python3 scripts/harness/verify.py` and confirm all 11 sensors pass clean.
