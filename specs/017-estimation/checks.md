# Verification Checks: 017 Estimate First & Mental Benchmarks (Knot A2)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/estimate.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/017-estimation.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
