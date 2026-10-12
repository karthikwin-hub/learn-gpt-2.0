# Verification Evidence: 040 Two Rings (Venn Overlap, Union & Complement) (Knot S2)

- When: 2026-10-12T12:08:39+00:00
- Branch: feat/040-two-rings-venn
- Harness: scripts/harness/verify.py (full 11/11 checks)

| Check | Result | Time | Command |
|---|---|---|---|
| harness-syntax | PASS | 0.0s | `python3 -m py_compile scripts/harness/*.py` |
| format | PASS | 4.2s | `npx prettier --check .` |
| lint | PASS | 3.3s | `npx eslint . --max-warnings=0` |
| typecheck | PASS | 4.6s | `npx tsc --noEmit` |
| unit-tests | PASS | 13.2s | `npx vitest run` |
| acceptance-tests | PASS | 103.6s | `npx playwright test tests/acceptance` |
| architecture-rules | PASS | 1.3s | `npx depcruise src` |
| mockup-parity | PASS | 9.3s | `npx playwright test tests/e2e/tools/capture-mockups.spec.ts` |
| sweep | PASS | 12.0s | `npx playwright test tests/e2e/sweep` |
| traceability | PASS | 0.1s | `python3 scripts/harness/check_traceability.py --write` |
| test-integrity | PASS | 0.1s | `python3 scripts/harness/check_test_integrity.py` |
