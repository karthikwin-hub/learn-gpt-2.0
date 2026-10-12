# Verification Evidence: 032 Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8) (Knot G8)

- When: 2026-10-12T08:53:34+00:00
- Branch: feat/032-perspective-views
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.1s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 3.9s | `npx prettier --check .` |
| lint | PASS | 3.3s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 3.7s | `npx tsc --noEmit` |
| unit-tests | PASS | 11.9s | `npx vitest run` |
| acceptance-tests | PASS | 86.9s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.1s | `npx depcruise src` |
| mockup-parity | PASS | 7.3s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 10.5s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
