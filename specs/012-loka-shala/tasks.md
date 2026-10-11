# Tasks: 012 Loka (Social Studies) Shala

Status: In Progress · Feature Branch: `feat/012-loka-shala`

---

## Task Matrix

- [x] **Task 1: Spec Kit Documentation**
  - Author `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 2: Timeline Domain Module & Unit Tests**
  - Implement `src/domain/world/timeline.ts` and `src/domain/world/timeline.test.ts`.
  - Validate historical intervals, zero-year exception, century mapping.

- [x] **Task 3: Earth Domain Module & Unit Tests**
  - Implement `src/domain/world/earth.ts` and `src/domain/world/earth.test.ts`.
  - Validate spin solar hours, day/night cycles, and axial tilt seasons.

- [x] **Task 4: Map Domain Module & Unit Tests**
  - Implement `src/domain/world/map.ts` and `src/domain/world/map.test.ts`.
  - Validate step moves, obstacle blocking in courtyard, and scale multiplication.

- [x] **Task 5: World Domain Aggregator**
  - Update `src/domain/world/index.ts` and `src/domain/world/index.test.ts`.

- [x] **Task 6: Lesson Definitions (I2, E1, E4)**
  - Implement `src/domain/lesson/i2.ts`, `e1.ts`, `e4.ts` and register in `src/domain/lesson/registry.ts`.

- [x] **Task 7: Timeline Screen (`#timeline`)**
  - Implement `src/ui/components/screens/timeline.ts`.

- [x] **Task 8: Earth Screen (`#earth`)**
  - Implement `src/ui/components/screens/earth.ts`.

- [x] **Task 9: Map Screen (`#map`)**
  - Implement `src/ui/components/screens/map.ts`.

- [x] **Task 10: App Router Registration**
  - Register `createTimelineScreen`, `createEarthScreen`, `createMapScreen` in `src/main.ts`.

- [x] **Task 11: Acceptance & E2E Journey Tests**
  - Author `tests/acceptance/012-loka-shala.spec.ts`.
  - Author `tests/e2e/journeys/012-journeys.spec.ts`.

- [x] **Task 12: Traceability & Full 11-Sensor Verification**
  - Generate `specs/012-loka-shala/traceability.md`.
  - Run `python3 scripts/harness/verify.py` to confirm all 11 sensors PASS.
  - Author `specs/012-loka-shala/progress.md`.

- [x] **Task 13: Pull Request & Merge**
  - Commit, push `feat/012-loka-shala`, open PR #12, and merge into `main`.
