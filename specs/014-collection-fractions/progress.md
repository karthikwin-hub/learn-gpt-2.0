# Progress: 014 Fractions of a Collection (Knot N4)

## Session Context
- Feature Branch: `feat/014-collection-fractions`
- Scope: Fully playable 7-stage lesson for Knot N4 (Fractions of a Collection & Like-Fraction Addition) with dedicated `#collection` workbench.

## State of Work
- **Domain Modeling**: `src/domain/math/collection.ts` and `src/domain/math/collection.test.ts` implemented (10 unit tests passing).
- **Lesson Registry**: `src/domain/lesson/n4.ts` registered in `registry.ts`.
- **Curriculum**: Knot N4 playable binding in `src/domain/curriculum/curriculum.ts` (21 playable knots).
- **Workbench**: `#collection` SVG workbench screen implemented with partition rings and like-fraction addition.
- **Acceptance Tests**: `tests/acceptance/014-collection-fractions.spec.ts` (16/16 passed).
- **Verification**: All 11 sensors PASS (`.agent/last-verify.md`).

## Next Step
- Complete PR & merge into `main`, then proceed to Feature 015: Decimals (Knot N5).
