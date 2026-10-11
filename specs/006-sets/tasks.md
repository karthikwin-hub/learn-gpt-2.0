# Tasks: 006 Sets threads (S1–S3), Sorting Courtyard, Venn Union & Intersection

Status: Complete · Feature: `specs/006-sets` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): S2 Sorting Courtyard — 2-Ring Venn Sorting
- [x] T001 `[mockup]` Verify mockups captured in `specs/006-sets/mockups/` for `#sets`, `#sets?mode=guess`, `#bodha?k=S2`, `#bodha?k=S3`.
- [x] T002 `[test-unit]` Author domain sets unit tests in `src/domain/math/sets.test.ts`.
- [x] T003 `[port-domain]` Implement `src/domain/math/sets.ts` and re-export via `src/domain/math/index.ts`.
- [x] T004 `[port-ui]` Implement Sorting Courtyard SVG manipulative in `src/ui/manipulatives/courtyard.ts`.
- [x] T005 `[port-ui]` Implement Sets workbench screen in `src/ui/components/screens/sets.ts` and register in `src/main.ts`.
- [x] T006 `[test-acceptance]` Author acceptance tests for `US1` in `tests/acceptance/006-sets.spec.ts`.

---

## Story US2 (P1): S3 Mystery Rule Guessing
- [x] T007 `[port-ui]` Wire mystery rule guessing mode in `src/ui/components/screens/sets.ts`.
- [x] T008 `[test-acceptance]` Author and verify acceptance tests for `US2` in `tests/acceptance/006-sets.spec.ts`.

---

## Story US3 (P2): Bodha Concept Cards for S2 & S3
- [x] T009 `[port-ui]` Implement Bodha Venn diagrams in `src/ui/diagrams/sets.ts`.
- [x] T010 `[port-domain]` Define lesson data for S1, S2, S3 in `src/domain/lesson/s1.ts`, `s2.ts`, `s3.ts`, registered in `registry.ts`.
- [x] T011 `[port-ui]` Wire S2 and S3 diagrams into `src/ui/components/screens/bodha.ts`.
- [x] T012 `[test-acceptance]` Author and verify acceptance tests for `US3`.

---

## Story US4 (P2): S1 Curriculum Integration
- [x] T013 `[port-curriculum]` Verify Rekha / Sets loom knot routing and integration.
- [x] T014 `[test-acceptance]` Author and verify acceptance tests for `US4`.

---

## Story US5 (P1): Calm Invariants & Multilingual Equity
- [x] T015 `[test-acceptance]` Author and verify calm feedback and multilingual tests in Telugu and Hindi for `US5`.

---

## Verification & Exit Gate
- [x] T016 `[test-mockup]` Author mockup test suite in `tests/e2e/mockup/006-sets.spec.ts`.
- [x] T017 `[test-journeys]` Author user journey suite in `tests/e2e/journeys/006-journeys.spec.ts`.
- [x] T018 `[checks]` Author `specs/006-sets/checks.md` and `progress.md`.
- [x] T019 `[verify]` Run complete verification harness `python3 scripts/harness/verify.py` and confirm all 11 sensors pass clean.
