# Progress: 016 Adding & Subtracting Big Numbers with Regrouping (Knot A1)

## Session Context
- Scope: Fully playable 7-stage lesson for Knot A1 (Multi-digit Regrouping across Zeroes) with dedicated `#regroup` abacus workbench.

## State of Work
- **Domain Modeling**: `src/domain/math/regroup.ts` and `src/domain/math/regroup.test.ts` implemented (5 unit tests passing).
- **Lesson Registry**: `src/domain/lesson/a1.ts` registered in `registry.ts`.
- **Curriculum**: Knot A1 playable binding in `src/domain/curriculum/curriculum.ts` (23 playable knots).
- **Workbench**: `#regroup` SVG columnar bead board workbench screen implemented with unbundling across zeroes, multi-digit subtraction, and carry bundling.
- **Acceptance Tests**: `tests/acceptance/016-regrouping.spec.ts` (16/16 passed).
- **Verification**: All 11 sensors PASS (`.agent/last-verify.md`).

## Next Step
- Commit on `feat/016-regrouping`, push PR #16, merge into `main`, and proceed to Feature 017: Estimation (Knot A2).
