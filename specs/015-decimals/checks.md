# Verification Checks: 015 Tenths and Hundredths (Knot N5)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/decimals.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/015-decimals.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
