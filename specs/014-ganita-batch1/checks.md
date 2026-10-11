# Verification Checks: 014 Ganita Expansion Batch 1 (N4, N5, A1, A2)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/014-ganita-batch1.spec.ts`

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
