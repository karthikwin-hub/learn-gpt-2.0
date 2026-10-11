# Tasks: 003 Multiplication threads (M1–M5)

Status: Complete · Feature: `specs/003-multiplication` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): M2 Multiplication is Area
Courtyard prediction (`#wonder?k=M2`), Living Film row-by-row demonstration ($6 \times 4 = 24$), and target floor exploration on the area grid.

- [x] T001 `[mockup]` Verify mockups captured for `wonder`, `film`, `rect`, `drums`, `mistake`, `bodha?k=M4`, `bodha?k=M5` in `specs/003-multiplication/mockups/`.  
  *Verify*: `ls specs/003-multiplication/mockups/`
- [x] T002 `[test-acceptance]` Author acceptance tests for `US1-AS1` and `US1-AS2` in `tests/acceptance/003-multiplication.spec.ts`.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US1"`
- [x] T003 `[port-ui]` Verify M2 courtyard wonder and film progression seamlessly lead into the area grid workbench.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US1-AS1"`
- [x] T004 `[test-acceptance]` Verify `US1-AS1` and `US1-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US1"`

---

## Story US2 (P1): M4 Cut the Rectangle & Column Method Folding
Rubber Rectangle $23 \times 14$ cut at tens into 4 rooms ($200, 30, 80, 12$), column folding animation with strip highlighting, and independent step $17 \times 12$.

- [x] T005 `[test-acceptance]` Author acceptance tests `US2-AS1`, `US2-AS2`, `US2-AS3` in `tests/acceptance/003-multiplication.spec.ts`.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US2"`
- [x] T006 `[port-domain]` Verify domain math partial products and column method in `src/domain/math/multiply.ts` against §8.2.  
  *Verify*: `npx vitest run src/domain/math/multiply.test.ts`
- [x] T007 `[port-ui]` Extend `src/ui/manipulatives/area-grid.ts` with `setCut(true)` rendering cutting thread lines at tens ($ta, tb$) and `focusStrip(strip)` styling.  
  *Verify*: `npm run build`
- [x] T008 `[port-ui]` Enhance `src/ui/components/screens/rect.ts` with 3-step scaffold: Step 1 demo ($23 \times 14$), Step 2 "Cut at tens" & "Fold into column" strip animation, and Step 3 independent exploration ($17 \times 12 \to 204$).  
  *Verify*: `npm run build`
- [x] T009 `[test-acceptance]` Verify `US2-AS1`, `US2-AS2`, `US2-AS3` pass.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US2"`

---

## Story US3 (P1): M4 Spot the Mistake & Self-Explanation
Error detection in $23 \times 14 = 200 + 12 = 212$ with kumkum focus on missing rooms $30$ and $80$, and explain it back sentence synthesis.

- [x] T010 `[test-acceptance]` Author acceptance tests `US3-AS1`, `US3-AS2`, `US3-AS3` in `tests/acceptance/003-multiplication.spec.ts`.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US3"`
- [x] T011 `[port-ui]` Wire M4 mistake 4-room diagram in `src/ui/components/screens/mistake.ts` rendering missing rooms $30$ and $80$ with kumkum dashed border upon tapping wrong step.  
  *Verify*: `npm run build`
- [x] T012 `[port-ui]` Ensure tapping valid steps in `mistake.ts` provides non-punitive descriptive explanations.  
  *Verify*: `npm run build`
- [x] T013 `[port-ui]` Configure explain back screen `src/ui/components/screens/explain.ts` for knot M4 with correct sentence tiles.  
  *Verify*: `npm run build`
- [x] T014 `[test-acceptance]` Verify `US3-AS1`, `US3-AS2`, `US3-AS3` pass.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US3"`

---

## Story US4 (P2): M5 Two Drummers & Least Common Multiple (LCM)
Two Drummers rhythm audio/visual workbench (`#drums`), prediction stepper, rhythm dials, beat line hits, and 4 & 6 meeting at 12 LCM (not 24).

- [x] T015 `[test-acceptance]` Author acceptance tests `US4-AS1`, `US4-AS2`, `US4-AS3` in `tests/acceptance/003-multiplication.spec.ts`.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US4"`
- [x] T016 `[port-domain]` Create M5 lesson definition in `src/domain/lesson/m5.ts` and register in `src/domain/lesson/registry.ts`.  
  *Verify*: `npx vitest run src/domain/lesson/registry.test.ts`
- [x] T017 `[port-ui]` Implement `src/ui/diagrams/drums.ts` for M5 Bodha beat diagrams.  
  *Verify*: `npm run build`
- [x] T018 `[port-ui]` Implement Two Drummers SVG manipulative in `src/ui/manipulatives/drums.ts` with dual dials, hand rotation, pulse dots, beat timeline, sound tones, and LCM thread rings.  
  *Verify*: `npm run build`
- [x] T019 `[port-ui]` Implement Two Drummers workbench screen in `src/ui/components/screens/drums.ts` and register route in `src/ui/components/app/app.ts` and router.  
  *Verify*: `npm run build`
- [x] T020 `[test-acceptance]` Verify `US4-AS1`, `US4-AS2`, `US4-AS3` pass.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US4"`

---

## Story US5 (P3): M1 Equal Groups & M3 Turn It Around
Equal groups arranging into arrays (M1) and commutative $90^\circ$ grid rotation preserving tile count (M3).

- [x] T021 `[test-acceptance]` Author acceptance tests `US5-AS1` and `US5-AS2` in `tests/acceptance/003-multiplication.spec.ts`.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US5"`
- [x] T022 `[port-domain]` Define M1 and M3 knot descriptors and lesson representations in `src/domain/lesson/`.  
  *Verify*: `npm run build`
- [x] T023 `[test-acceptance]` Verify `US5-AS1` and `US5-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US5"`

---

## Story US6 (P1): Calm Pedagogical Invariants & Multilingual Equity
Zero praise words, non-punitive kumkum focus, and full translation parity across 5 languages (`en`, `hi`, `te`, `bn`, `ta`).

- [x] T024 `[test-acceptance]` Author acceptance tests `US6-AS1` and `US6-AS2` in `tests/acceptance/003-multiplication.spec.ts`.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US6"`
- [x] T025 `[port-i18n]` Populate string dictionaries for `drums.*`, `rect.*`, `mistake.m4.*`, `bodha.M4.*`, `bodha.M5.*` across all 5 languages in `src/domain/i18n/locales/`.  
  *Verify*: `npx vitest run src/domain/i18n/`
- [x] T026 `[test-acceptance]` Verify `US6-AS1` and `US6-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/003-multiplication.spec.ts -g "US6"`

---

## Verification & Exit Gate
Full mockup parity, end-to-end user journeys, and verification harness run.

- [x] T027 `[test-mockup]` Author mockup parity test suite in `tests/e2e/mockup/003-multiplication.spec.ts` asserting against 21 mockups.  
  *Verify*: `npx playwright test tests/e2e/mockup/003-multiplication.spec.ts`
- [x] T028 `[test-journeys]` Author user journey suite `tests/e2e/journeys/003-journeys.spec.ts` covering J5 for M2, M4, M5 and J2 state preservation on `#rect` and `#drums`.  
  *Verify*: `npx playwright test tests/e2e/journeys/003-journeys.spec.ts`
- [x] T029 `[traceability]` Update traceability matrix via `python3 scripts/harness/check_traceability.py --write`.  
  *Verify*: `python3 scripts/harness/check_traceability.py`
- [x] T030 `[verify]` Run complete verification harness `python3 scripts/harness/verify.py` and confirm all checks pass.  
  *Verify*: `python3 scripts/harness/verify.py`
