# Checks: 011 Vijnana (Science) Shala — Body, Light, Motion & Living Systems

Feature Branch: `feat/011-vijnana-shala`

## 1. Automated Verification Checks
- **harness-syntax**: Python harness formatting and syntax clean.
- **format**: `npx prettier --check .` passes clean.
- **lint**: `npx eslint .` zero warnings or errors.
- **typecheck**: `npx tsc --noEmit` zero type errors.
- **unit-tests**: `npx vitest run` passes 100% of domain tests (`digest.test.ts`, `shadow.test.ts`, `ramp.test.ts`, `seed.test.ts`, `balance.test.ts`).
- **acceptance-tests**: `npx playwright test tests/acceptance/011-vijnana-shala.spec.ts` passes 100%.
- **architecture-rules**: Module boundary invariant check passes (no UI imports in domain).
- **mockup-parity**: Calm aesthetic parity check passes.
- **sweep**: Clean git status and no residual scratch files.
- **traceability**: 100% trace coverage for all functional requirements and user story acceptance criteria.
- **test-integrity**: No skipped or deleted assertions.

## 2. Invariant Scientific Values (per SCIENCE_RULES.md §2)
- Organ order: `['mouth', 'pipe', 'stomach', 'small', 'large']`.
- Absorption: Most nutrients in small intestine, water in large intestine.
- Ramp distances ($h=1\text{m}$): Tile ($6.0$), Wood ($3.8$), Rug ($1.9$), Sand ($1.2$) pretend metres.
- Shadow geometry ($h=1.5, d=2.5, L=3.0$): Shadow length = $4.5\text{m}$.
- Shadow geometry ($L \le h$): Shadow length = $\infty$.
- Material darkness: Cardboard (opaque) > Wax paper (translucent) > Glass (transparent).
