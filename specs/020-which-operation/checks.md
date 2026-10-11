# Verification Checks: 020 Which Operation? (Knot A3)

## Inner-Loop Checks
- Unit tests: `npx vitest run src/domain/math/wordprob.test.ts`
- Typecheck: `npm run typecheck`
- Linter: `npm run lint`

## Acceptance Checks
- `npx playwright test tests/acceptance/020-which-operation.spec.ts`

## Full 11-Sensor Verification
- Command: `python3 scripts/harness/verify.py`
