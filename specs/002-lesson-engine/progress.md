# Progress — 002 Lesson engine, Bodha cards and Living Film player

- **Task**: Implement Feature 002 Lesson engine, Bodha cards and Living Film player · **Lane**: Feature · **Branch**: `feat/002-lesson-engine`
- **Active constraints**: Zero runtime dependencies, plain DOM/SVG + Vite + strict TypeScript, 1:1 prototype visual & key parity, self-hosted offline fonts, calm feedback (no red for wrong, no praise/points/stars/streaks).

## Completed (with evidence)
- [2026-10-11] Feature 001 App shell merged into `main` (PR #1).
- [2026-10-11] Branch `feat/002-lesson-engine` created from `main`.
- [2026-10-11] Prototype mockups captured for all 7 routes (`wonder`, `bodha?k=M2`, `film`, `rect`, `mistake`, `explain`, `stop`) across `en`, `hi`, `ta` into `specs/002-lesson-engine/mockups/` (21 PNGs).
- [2026-10-11] Specification authored in `specs/002-lesson-engine/spec.md` with 6 user stories (`US1`–`US6`) and 15 acceptance scenarios.
- [2026-10-11] Visual fidelity protocol authored in `specs/002-lesson-engine/mockups.md` with element inventories, control maps, and prototype baseline alignments.
- [2026-10-11] Gate G1 approved by user.
- [2026-10-11] Technical design plan authored in `specs/002-lesson-engine/plan.md` with port map, engine utilization, domain unit tests table (§8.2), test plan, and zero new dependencies statement.
- [2026-10-11] Gate G2 approved by user.
- [2026-10-11] Tasks decomposed into `specs/002-lesson-engine/tasks.md` (37 tasks T001–T037).
- [2026-10-11] Acceptance test suite authored in `tests/acceptance/002-lesson-engine.spec.ts` covering all 18 acceptance scenarios (`US1-AS1` through `US6-AS5`).
- [2026-10-11] Traceability matrix generated in `specs/002-lesson-engine/traceability.md` via `python3 scripts/harness/check_traceability.py --write` (18/18 scenarios mapped, 0 missing).
- [2026-10-11] Fail-first verification executed: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts --retries 0` (all 36 runs failed cleanly on missing Feature 002 screens and components, proving test sensitivity).
- [2026-10-11] Gate G3 approved by user.
- [2026-10-11] Implemented pure domain math module `src/domain/math/multiply.ts` with comprehensive unit tests in `multiply.test.ts` (all 40 unit tests passing).
- [2026-10-11] Implemented pure domain lesson types, M2/M4 card data, and lesson registry (`src/domain/lesson/`) completely decoupled from UI types (0 depcruise violations).
- [2026-10-11] Implemented calm feedback dictionary `src/domain/lesson/banned-words.ts` enforcing zero praise words across 5 Indic languages.
- [2026-10-11] Implemented speech synthesis controller with Web Audio fallback, sound toggle, rate toggle, and `#caption` banner in `src/ui/components/voice/voice.ts`.
- [2026-10-11] Implemented 7 lesson screens: `wonder.ts`, `prashna.ts`, `bodha.ts`, `film.ts`, `rect.ts`, `mistake.ts`, `explain.ts`, `stop.ts`.
- [2026-10-11] Implemented Rubber Rectangle manipulative in `src/ui/manipulatives/area-grid.ts` and SVG diagram renderers in `src/ui/diagrams/tiles.ts`.
- [2026-10-11] Authored mockup parity suite `tests/e2e/mockup/002-lesson.spec.ts` (all 7 routes pass across viewports).
- [2026-10-11] Authored user journeys suite `tests/e2e/journeys/002-journeys.spec.ts` (J3 7-stage flow, J4 film interactive pause, J7 keep sutra persistence all pass).
- [2026-10-11] Verification harness passed: `python3 scripts/harness/verify.py` (11/11 checks PASS, full suite green).
- [2026-10-11] SDD status verified: `python3 scripts/harness/sdd_status.py` (37/37 tasks complete).

## In progress
- None (Feature 002 implementation complete and verified).

## Decisions (and why)
- **Baseline Alignment**: Prototype screens are the canonical visual baseline per `DEV_HANDOFF.md` §2.4.
- **Audio Strategy**: Web Speech API / synthesized audio fallback with 100% on-screen caption parity so sound is never required to learn.
- **Data-Driven Decoupling**: Bodha cards and Living Film scripts are pure data structures; translators and curriculum designers edit string dictionaries without touching engine rendering code.
- **Domain Decoupling**: All SVG renderers moved to UI layer (`src/ui/diagrams/tiles.ts`) so domain modules (`m2.ts`, `m4.ts`) remain strictly pure data and pass `depcruise` architectural rules.
- **Fail-First Verification**: All 18 acceptance scenarios failed before code implementation to eliminate false greens.

## Open issues and questions for humans
- Ready for final review and merge into main.

## Failed attempts (don't repeat)
- Avoid importing UI SVG functions into domain lesson data files; keep domain pure and resolve diagrams at the UI layer.
- Ensure buttons inside `.stepper` include `.stepper-label` so locator queries with text match properly.

## Next action
- Hand off to user with full verification contract.
