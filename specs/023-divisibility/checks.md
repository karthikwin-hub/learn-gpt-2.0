# Verification Checks: 023 Divisibility Tests (Knot F3)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/divisibility.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/023-divisibility.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
