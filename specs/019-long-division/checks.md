# Verification Checks: 019 Long Division Algorithm (Knot D4)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/longdiv.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/019-long-division.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
