# Tasks: 007 Logic threads (L1–L4), Marble Gates & Truth Tables

Status: Complete · Feature: `specs/007-logic` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): L2 Marble Machine — Gates AND, OR, NOT
- [x] T001 `[mockup]` Verify mockups captured in `specs/007-logic/mockups/` for `#logic` and `#bodha?k=L2`.
- [x] T002 `[test-unit]` Author domain logic unit tests in `src/domain/math/logic.test.ts`.
- [x] T003 `[port-domain]` Implement `src/domain/math/logic.ts` and re-export via `src/domain/math/index.ts`.
- [x] T004 `[port-ui]` Implement Marble Machine SVG manipulative in `src/ui/manipulatives/marbles.ts`.
- [x] T005 `[port-ui]` Implement Logic workbench screen in `src/ui/components/screens/logic.ts` and register in `src/main.ts`.
- [x] T006 `[test-acceptance]` Author acceptance tests for `US1` in `tests/acceptance/007-logic.spec.ts`.

---

## Story US2 (P1): Mystery Gate Deduction Mode
- [x] T007 `[port-ui]` Implement mystery gate mode and candidate guessing in `src/ui/components/screens/logic.ts`.
- [x] T008 `[test-acceptance]` Author and verify acceptance tests for `US2` in `tests/acceptance/007-logic.spec.ts`.

---

## Story US3 (P2): Bodha Concept Cards for L1–L4
- [x] T009 `[port-ui]` Implement Bodha Logic diagrams in `src/ui/diagrams/logic.ts`.
- [x] T010 `[port-domain]` Define lesson data for L1, L2, L3, L4 in `src/domain/lesson/l1.ts`–`l4.ts` and register in `registry.ts`.
- [x] T011 `[port-ui]` Wire L1–L4 diagrams into `src/ui/components/screens/bodha.ts`.
- [x] T012 `[test-acceptance]` Author and verify acceptance tests for `US3`.

---

## Story US4 (P2): Shala Loom Curriculum Integration
- [x] T013 `[port-curriculum]` Verify Tarka Loom knots L1–L4 routing and integration.
- [x] T014 `[test-acceptance]` Author and verify acceptance tests for `US4`.

---

## Story US5 (P1): Calm Invariants & Multilingual Equity
- [x] T015 `[test-acceptance]` Author and verify calm feedback and multilingual tests in Telugu and Hindi for `US5`.

---

## Verification & Exit Gate
- [x] T016 `[test-mockup]` Author mockup test suite in `tests/e2e/mockup/007-logic.spec.ts`.
- [x] T017 `[test-journeys]` Author user journey suite in `tests/e2e/journeys/007-journeys.spec.ts`.
- [x] T018 `[checks]` Author `specs/007-logic/checks.md` and `progress.md`.
- [x] T019 `[verify]` Run complete verification harness `python3 scripts/harness/verify.py` and confirm all 11 sensors pass clean.
