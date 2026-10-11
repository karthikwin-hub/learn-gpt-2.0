# Checks — 004 Division threads (D1–D4)

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 | PASS | `tests/acceptance/004-division.spec.ts` (`US1-AS1: 12 laddoos shared across 4 plates round-by-round deals evenly`) | Round-by-round deal verified |
| US1-AS2 | PASS | `tests/acceptance/004-division.spec.ts` (`US1-AS2: Dealing all shows bar partition diagram with equal parts`) | Bar partition diagram verified |
| US1-AS3 | PASS | `tests/acceptance/004-division.spec.ts` (`US1-AS3: Stepper adjustment updates total and plates`) | Stepper dynamic text update verified |
| US2-AS1 | PASS | `tests/acceptance/004-division.spec.ts` (`US2-AS1: 14 laddoos on 4 plates retains 2 in remainder tray with kumkum equation`) | Remainder tray retention verified |
| US2-AS2 | PASS | `tests/acceptance/004-division.spec.ts` (`US2-AS2: Cut leftovers divides remainder into fractional wedges`) | Fractional cut $3 + 2/4 = 3 + 1/2$ verified |
| US3-AS1 | PASS | `tests/acceptance/004-division.spec.ts` (`US3-AS1: Bodha D1 renders plate diagrams on concept cards`) | Bodha D1 plates diagram verified |
| US3-AS2 | PASS | `tests/acceptance/004-division.spec.ts` (`US3-AS2: Bodha D3 renders leftover remainder and cut halves`) | Bodha D3 plates & cut halves verified |
| US4-AS1 | PASS | `tests/acceptance/004-division.spec.ts` (`US4-AS1: Bodha D2 provides grouping cards and explanation`) | D2 grouping descriptor verified |
| US4-AS2 | PASS | `tests/acceptance/004-division.spec.ts` (`US4-AS2: Bodha D4 provides missing side rectangular cards`) | D4 missing side rectangle verified |
| US5-AS1 | PASS | `tests/acceptance/004-division.spec.ts` (`US5-AS1: Calm pedagogy feedback has zero banned praise words`) | Zero praise words verified |
| US5-AS2 | PASS | `tests/acceptance/004-division.spec.ts` (`US5-AS2: Tamil rotation renders native strings in place`) | Tamil language in-place rendering verified |
| Parity: `share?mode=share` | PASS | Mockup in `specs/004-division/mockups/share_mode_share-*.png` & `tests/e2e/mockup/004-division.spec.ts` | Visual parity verified across en, ta, hi |
| Parity: `share?mode=leftover` | PASS | Mockup in `specs/004-division/mockups/share_mode_leftover-*.png` & `tests/e2e/mockup/004-division.spec.ts` | Visual parity verified across en, ta, hi |
| Parity: `bodha?k=D1` | PASS | Mockup in `specs/004-division/mockups/bodha_k_D1-*.png` & `tests/e2e/mockup/004-division.spec.ts` | Visual parity verified across en, ta, hi |
| Parity: `bodha?k=D3` | PASS | Mockup in `specs/004-division/mockups/bodha_k_D3-*.png` & `tests/e2e/mockup/004-division.spec.ts` | Visual parity verified across en, ta, hi |

## Independent review
- Automated harness `python3 scripts/harness/verify.py` executed: 11/11 sensors PASS.
- Full trace: `specs/004-division/traceability.md` (100% covered).

## Convergence
- 004 Division threads fully implemented, verified, and complete. Ready for merge to `main`.
