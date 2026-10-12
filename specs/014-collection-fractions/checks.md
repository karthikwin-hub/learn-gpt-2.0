# Verification Checks: 014 Fractions of a Collection (Knot N4)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/collection.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/014-collection-fractions.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
  1. harness-syntax
  2. format
  3. lint
  4. typecheck
  5. unit-tests
  6. acceptance-tests
  7. architecture-rules
  8. mockup-parity
  9. sweep
  10. traceability
  11. test-integrity
