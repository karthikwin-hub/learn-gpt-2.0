# Tasks: 011 Vijnana (Science) Shala — Body, Light, Motion & Living Systems

Status: In Progress · Feature Branch: `feat/011-vijnana-shala`

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 2: Digestion Domain Module & Unit Tests**
  - Implement `src/domain/science/digest.ts` and `src/domain/science/digest.test.ts`.
  - Cover organ sequence, nutrient absorption, water absorption.

- [x] **Task 3: Shadow & Light Domain Module & Unit Tests**
  - Implement `src/domain/science/shadow.ts` and `src/domain/science/shadow.test.ts`.
  - Cover shadow formula $\frac{h \cdot d}{L - h}$, materials (opaque, translucent, transparent).

- [x] **Task 4: Ramp & Friction Domain Module & Unit Tests**
  - Implement `src/domain/science/ramp.ts` and `src/domain/science/ramp.test.ts`.
  - Cover surface friction order: Tile (6.0), Wood (3.8), Rug (1.9), Sand (1.2), fair test validation.

- [x] **Task 5: Seed & Balance Domain Modules & Unit Tests**
  - Implement `src/domain/science/seed.ts`, `src/domain/science/seed.test.ts`.
  - Implement `src/domain/science/balance.ts`, `src/domain/science/balance.test.ts`.

- [x] **Task 6: Curriculum Knot Bindings**
  - Update `src/domain/curriculum/curriculum.ts` for `J2` (`seed`) and `K1` (`balance`).

- [x] **Task 7: Digestion Screen (`#digest`)**
  - Implement `src/ui/components/screens/digest.ts`.

- [x] **Task 8: Shadow Screen (`#shadow`, `#sundial`)**
  - Implement `src/ui/components/screens/shadow.ts`.

- [x] **Task 9: Ramp Screen (`#ramp`)**
  - Implement `src/ui/components/screens/ramp.ts`.

- [x] **Task 10: Seed & Balance Screens (`#seed`, `#balance`)**
  - Implement `src/ui/components/screens/seed.ts` and `src/ui/components/screens/balance.ts`.

- [x] **Task 11: App Router Registration**
  - Register `createDigestScreen`, `createShadowScreen`, `createRampScreen`, `createSeedScreen`, `createBalanceScreen` in `src/main.ts`.

- [x] **Task 12: Acceptance & E2E Test Suites**
  - Author `tests/acceptance/011-vijnana-shala.spec.ts` covering US1 to US6.
  - Author `tests/e2e/journeys/011-journeys.spec.ts`.

- [x] **Task 13: Full Verification & Traceability**
  - Generate `specs/011-vijnana-shala/traceability.md`.
  - Run `python3 scripts/harness/verify.py` to confirm all 11 sensors PASS.
  - Author `specs/011-vijnana-shala/progress.md`.

- [x] **Task 14: Pull Request & Merge**
  - Commit, push `feat/011-vijnana-shala`, open PR #11, and merge into `main`.
