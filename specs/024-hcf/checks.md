# Verification Checks: 024 Common Factors & HCF (Knot F4)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/hcf.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/024-hcf.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
