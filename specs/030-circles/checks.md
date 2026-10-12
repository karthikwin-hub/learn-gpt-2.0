# Verification Evidence: 030 Circles: Centre, Radius, Diameter (Knot G6)

- When: 2026-10-12T08:33:11+00:00
- Branch: feat/030-circles
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.1s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 4.4s | `npx prettier --check .` |
| lint | PASS | 3.5s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 4.6s | `npx tsc --noEmit` |
| unit-tests | PASS | 10.5s | `npx vitest run` |
| acceptance-tests | PASS | 88.3s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.6s | `npx depcruise src` |
| mockup-parity | PASS | 8.1s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 12.0s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
