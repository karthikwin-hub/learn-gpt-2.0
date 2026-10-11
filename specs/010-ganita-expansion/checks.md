# Checks: 010 Ganita Expansion — Numbers, Fractions & Units (N1, N3, U1)

Feature Branch: `feat/010-ganita-expansion`

## 1. Automated Verification Checks
- **harness-syntax**: Python harness formatting and syntax clean.
- **format**: `npx prettier --check .` passes clean.
- **lint**: `npx eslint .` zero warnings or errors.
- **typecheck**: `npx tsc --noEmit` zero type errors.
- **unit-tests**: `npx vitest run` passes 100% of domain tests (`numbers.test.ts`, `fractions.test.ts`, `money.test.ts`).
- **acceptance-tests**: `npx playwright test tests/acceptance/010-ganita-expansion.spec.ts` passes 100%.
- **architecture-rules**: Module boundary invariant check passes (no UI imports in domain).
- **mockup-parity**: Calm aesthetic parity check passes.
- **sweep**: Clean git status and no residual scratch files.
- **traceability**: 100% trace coverage for all functional requirements and user story acceptance criteria.
- **test-integrity**: No skipped or deleted assertions.

## 2. Pedagogical Sensory Checks
- **No Star Counters / Badges**: Visual inspection proves zero point trackers or stars across all screens.
- **No Timers**: No countdown clocks or speed pressure.
- **Reversibility**: Adding or exchanging coins/fractions can be manipulated forward and backward freely.
