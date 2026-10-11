# Verification Checks: 021 Factors Make Rectangles (Knot F1)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/factors.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/021-factors.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
