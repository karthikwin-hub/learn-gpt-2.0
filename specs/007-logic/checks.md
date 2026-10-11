# Checks — 007 Logic threads (L1–L4)

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 | PASS | `tests/acceptance/007-logic.spec.ts` (`US1-AS1: Marble Machine loads with default AND gate, doors A and B, and basins`) | Initial layout and door states verified |
| US1-AS2 | PASS | `tests/acceptance/007-logic.spec.ts` (`US1-AS2: Toggling doors updates open and shut states`) | Door toggles verified |
| US1-AS3 | PASS | `tests/acceptance/007-logic.spec.ts` (`US1-AS3: Dropping a marble animates run and tallies in basin`) | Marble route animation and basin tally verified |
| US1-AS4 | PASS | `tests/acceptance/007-logic.spec.ts` (`US1-AS4: Dropping a marble records row in dynamic truth table`) | Dynamic truth table row updates verified |
| US1-AS5 | PASS | `tests/acceptance/007-logic.spec.ts` (`US1-AS5: Switching gate to NOT reconfigures machine and hides Door B`) | Unary NOT reconfiguration verified |
| US2-AS1 | PASS | `tests/acceptance/007-logic.spec.ts` (`US2-AS1: Mystery chip covers the tracks with question mark cover`) | Mystery track cover verified |
| US2-AS2 | PASS | `tests/acceptance/007-logic.spec.ts` (`US2-AS2: Completing all trials presents gate guessing chips`) | Truth table completion trigger verified |
| US2-AS3 | PASS | `tests/acceptance/007-logic.spec.ts` (`US2-AS3: Mystery deduction validates candidate gate guess`) | Candidate hypothesis deduction verified |
| US3-AS1 | PASS | `tests/acceptance/007-logic.spec.ts` (`US3-AS1: Bodha L2 displays concept cards with marble gate cross-section`) | Bodha L2 gate diagrams verified |
| US3-AS2 | PASS | `tests/acceptance/007-logic.spec.ts` (`US3-AS2: Bodha L1, L3, L4 display their respective concept diagrams`) | Bodha L1, L3, L4 diagrams verified |
| US3-AS3 | PASS | `tests/acceptance/007-logic.spec.ts` (`US3-AS2: Bodha L1, L3, L4 display their respective concept diagrams`) | Concept progression verified |
| US4-AS1 | PASS | `tests/acceptance/007-logic.spec.ts` (`US4-AS1: Shala Loom Tarka thread contains knots L1 to L4 with bench links`) | Loom knots L1–L4 verified |
| US4-AS2 | PASS | `tests/acceptance/007-logic.spec.ts` (`US4-AS1: Shala Loom Tarka thread contains knots L1 to L4 with bench links`) | Bench links verified |
| US5-AS1 | PASS | `tests/acceptance/007-logic.spec.ts` (`US5-AS1: Zero gamification or banned praise words appear on logic screens`) | Zero praise words verified |
| US5-AS2 | PASS | `tests/acceptance/007-logic.spec.ts` (`US5-AS2: Telugu localization displays pure Telugu terms without English leaks`) | Telugu parity verified |
| US5-AS3 | PASS | `tests/acceptance/007-logic.spec.ts` (`US5-AS3: In-place language toggle preserves machine and door states`) | Language toggle state persistence verified |
| Parity: `logic` | PASS | Mockup in `specs/007-logic/mockups/logic-*.png` & `tests/e2e/mockup/007-logic.spec.ts` | Visual parity verified across en, te, hi |
| Parity: `bodha?k=L2` | PASS | Mockup in `specs/007-logic/mockups/bodha_k_L2-*.png` & `tests/e2e/mockup/007-logic.spec.ts` | Visual parity verified across en, te, hi |

## Independent review
- Automated harness `python3 scripts/harness/verify.py` executed: 11/11 sensors PASS.
- Full trace: `specs/007-logic/traceability.md` (100% covered).

## Convergence
- 007 Logic threads fully implemented, verified, and complete. Ready for merge to `main`.
