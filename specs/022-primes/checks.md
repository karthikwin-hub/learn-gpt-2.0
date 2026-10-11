# Verification Checks: 022 Primes & Composites (Knot F2)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/primes.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/022-primes.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
