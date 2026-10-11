# Tasks: 009 Gurukul Shell — Full Multi-Subject Ashram, Shalas & Jaal

Status: In Progress · Feature Branch: `feat/009-ashram-shell`

---

## Task Matrix

- [x] **Task 1: Capture prototype mockups & baseline visual evidence**
  - Run capture tool for `home`, `shala?s=ganita`, `jaal` in `en`, `te`, `hi`.
  - Save to `specs/009-ashram-shell/mockups/`.

- [x] **Task 2: Spec Kit documentation**
  - Author `specs/009-ashram-shell/mockups.md`, `spec.md`, `plan.md`, `tasks.md`, `checks.md`.

- [x] **Task 3: Domain Curriculum Verification**
  - Verify curriculum domain coverage across all 3 Shalas in `src/domain/curriculum/index.test.ts`.

- [x] **Task 4: Ashram Courtyard & Carry-on Card**
  - Verify and refine `src/ui/components/screens/ashram.ts` to ensure Carry-on card resumes knot and state smoothly.

- [x] **Task 5: Shala Loom & Unbuilt Knot Toast**
  - Verify and refine `src/ui/components/screens/shala.ts` for Ganita, Vijnana, and Loka subject looms.

- [x] **Task 6: Jaal Web Screen & Cross-Subject Links**
  - Verify and refine `src/ui/components/screens/jaal.ts` for interactive crossing arcs and navigation.

- [x] **Task 7: Accessible Stage Bar**
  - Verify `src/ui/components/chrome/stage-bar.ts` accessible navigation and Bodha recall link.

- [x] **Task 8: Acceptance & E2E Test Suites**
  - Author `tests/acceptance/009-ashram-shell.spec.ts` covering US1 to US5.
  - Author `tests/e2e/mockup/009-ashram-shell.spec.ts`.
  - Author `tests/e2e/journeys/009-journeys.spec.ts` (Ashram entry, Shala navigation, Carry-on resumption, Jaal crossing navigation).

- [x] **Task 9: Traceability & Full Verification**
  - Generate `specs/009-ashram-shell/traceability.md`.
  - Verify all 11 sensors pass clean in `python3 scripts/harness/verify.py`.
  - Author `specs/009-ashram-shell/progress.md`.

- [x] **Task 10: Pull Request & Merge**
  - Commit, push `feat/009-ashram-shell`, open PR #9, and merge into `main`.
