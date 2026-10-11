# Checks — 005 Geometry threads (G1–G5)

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US1-AS1: Rope and Pegs loads with 24m perimeter and initial 1x11 dimensions`) | Initial dimensions & equations verified |
| US1-AS2 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US1-AS2: Stepper adjustment to 6x6 square reveals peak area and calm feedback`) | Square maximum area & ghost trails verified |
| US1-AS3 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US1-AS3: Perimeter chip changes rope length to 20m and resets area hill`) | 20m perimeter reconfiguration verified |
| US2-AS1 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US2-AS1: Kolam Mirror loads with 7x7 grid, order 4, mirror mode and demo stroke`) | Kolam canvas, dot pulli grid, mirror lines verified |
| US2-AS2 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US2-AS2: Toggling to turn mode switches to rotations only and smallest turn angle`) | Turn mode C_n smallest turn angle verified |
| US2-AS3 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US2-AS3: Order chips dynamically update smallest turn angle`) | Orders 1, 2, 4, 8 dynamic turn readout verified |
| US2-AS4 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US2-AS4: Turn mode order 4 with strokes meets challenge`) | Challenge met feedback verified |
| US2-AS5 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US2-AS5: Undo and clear buttons manipulate canvas strokes`) | Undo/Clear stroke operations verified |
| US3-AS1 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US3-AS1: Bodha G2 displays 6 cards with rope diagram comparing dimensions`) | Bodha G2 rope comparison diagrams verified |
| US3-AS2 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US3-AS2: Bodha G4 displays flower petals with 90 deg turn and mirror symmetry`) | Bodha G4 flower petal symmetry verified |
| US4-AS1 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US4-AS1: Shala Loom Rekha contains knots G1 to G5 with bench links`) | Shala Rekha loom knot buttons verified |
| US5-AS1 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US5-AS1: No gamification or banned praise words appear on geometry screens`) | Zero praise words verified |
| US5-AS2 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US5-AS2: Telugu localization displays pure Telugu terms without English leaks`) | Telugu parity verified |
| US5-AS3 | PASS | `tests/acceptance/005-geometry.spec.ts` (`US5-AS3: In-place language toggle preserves rope state`) | In-place language state preservation verified |
| Parity: `rope` | PASS | Mockup in `specs/005-geometry/mockups/rope-*.png` & `tests/e2e/mockup/005-geometry.spec.ts` | Visual parity verified across en, te, hi |
| Parity: `kolam` | PASS | Mockup in `specs/005-geometry/mockups/kolam-*.png` & `tests/e2e/mockup/005-geometry.spec.ts` | Visual parity verified across en, te, hi |
| Parity: `bodha?k=G2` | PASS | Mockup in `specs/005-geometry/mockups/bodha_k_G2-*.png` & `tests/e2e/mockup/005-geometry.spec.ts` | Visual parity verified across en, te, hi |
| Parity: `bodha?k=G4` | PASS | Mockup in `specs/005-geometry/mockups/bodha_k_G4-*.png` & `tests/e2e/mockup/005-geometry.spec.ts` | Visual parity verified across en, te, hi |

## Independent review
- Automated harness `python3 scripts/harness/verify.py` executed: 11/11 sensors PASS.
- Full trace: `specs/005-geometry/traceability.md` (100% covered).

## Convergence
- 005 Geometry threads fully implemented, verified, and complete. Ready for merge to `main`.
