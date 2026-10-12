# Verification Checks: 016 Adding & Subtracting Big Numbers with Regrouping (Knot A1)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/regroup.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/016-regrouping.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
