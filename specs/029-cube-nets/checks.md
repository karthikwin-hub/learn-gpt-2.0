# Verification Evidence: 029 Fold a Box / Cube Nets (Knot G5)

- When: 2026-10-12T08:21:55+00:00
- Branch: feat/029-cube-nets
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.0s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 3.6s | `npx prettier --check .` |
| lint | PASS | 2.9s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 3.4s | `npx tsc --noEmit` |
| unit-tests | PASS | 10.1s | `npx vitest run` |
| acceptance-tests | PASS | 84.4s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.4s | `npx depcruise src` |
| mockup-parity | PASS | 8.1s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 12.1s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
