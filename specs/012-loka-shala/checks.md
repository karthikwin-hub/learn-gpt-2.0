# Verification Checks: 012 Loka (Social Studies) Shala

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/world/`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Full Acceptance Checks
- `npx vitest run tests/acceptance/012-loka-shala.spec.ts`
- `npx vitest run tests/e2e/journeys/012-journeys.spec.ts`

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
