# Verification Checks: 018 Division as Repeated Subtraction (Knot D2)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/quotition.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/018-quotition.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
