# Verification Evidence: 035 Pictographs (Scaled Keys & Data Representation) (Knot H1)

- When: 2026-10-12T09:34:30+00:00
- Branch: feat/035-pictographs
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.0s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 3.7s | `npx prettier --check .` |
| lint | PASS | 3.2s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 3.8s | `npx tsc --noEmit` |
| unit-tests | PASS | 11.5s | `npx vitest run` |
| acceptance-tests | PASS | 93.3s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.2s | `npx depcruise src` |
| mockup-parity | PASS | 8.1s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 11.8s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
