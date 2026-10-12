# Verification Evidence: 031 Tangrams (Dissection & Area Conservation) (Knot G7)

- When: 2026-10-12T08:42:33+00:00
- Branch: feat/031-tangrams
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.0s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 4.1s | `npx prettier --check .` |
| lint | PASS | 3.4s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 4.0s | `npx tsc --noEmit` |
| unit-tests | PASS | 12.4s | `npx vitest run` |
| acceptance-tests | PASS | 87.6s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.1s | `npx depcruise src` |
| mockup-parity | PASS | 8.2s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 13.0s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
