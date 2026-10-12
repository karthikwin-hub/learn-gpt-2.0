# Verification Evidence: 033 Metres, Grams and Litres (Metric Conversion Ladder) (Knot U2)

- When: 2026-10-12T09:07:12+00:00
- Branch: feat/033-metric-units
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.0s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 3.7s | `npx prettier --check .` |
| lint | PASS | 3.0s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 3.6s | `npx tsc --noEmit` |
| unit-tests | PASS | 11.0s | `npx vitest run` |
| acceptance-tests | PASS | 88.2s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.1s | `npx depcruise src` |
| mockup-parity | PASS | 8.1s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 12.0s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
