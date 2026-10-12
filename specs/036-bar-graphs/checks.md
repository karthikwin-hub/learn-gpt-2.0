# Verification Evidence: 036 Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2) (Knot H2)

- When: 2026-10-12T09:51:30+00:00
- Branch: feat/036-bar-graphs
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.0s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 3.9s | `npx prettier --check .` |
| lint | PASS | 3.1s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 3.7s | `npx tsc --noEmit` |
| unit-tests | PASS | 12.3s | `npx vitest run` |
| acceptance-tests | PASS | 100.9s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.3s | `npx depcruise src` |
| mockup-parity | PASS | 9.7s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 13.0s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
