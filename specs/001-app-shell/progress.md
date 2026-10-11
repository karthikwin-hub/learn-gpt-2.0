# Progress — 001 App shell, language switching and fonts

- **Task**: Implement Feature 001 App shell, language switching, Noto fonts, and Gurukul multi-subject shell · **Lane**: Feature · **Branch**: `feat/001-app-shell`
- **Active constraints**: Zero runtime dependencies, plain DOM/SVG + Vite + strict TypeScript, 1:1 prototype visual & key parity, self-hosted offline fonts, DPDP Act 2023 compliance.

## Completed (with evidence)
- [2026-10-11] Phase 0 Foundation completed on `chore/foundation` and merged to `main` (commit `73a88b1`). All 11 checks passing in `python3 scripts/harness/verify.py`.
- [2026-10-11] Feature 001 specified in `specs/001-app-shell/spec.md` with 9 user stories (US1–US9) and 18 acceptance scenarios covering Opening, Language, Ashram home, Ganita Shala, Vijnana Shala, Loka Shala, Jaal web, Offline/Privacy, and Night theme.
- [2026-10-11] Prototype mockups captured for all 7 routes (`opening`, `language`, `home`, `shala?s=ganita`, `shala?s=vijnana`, `shala?s=loka`, `jaal`) across English, Hindi, and Tamil in `specs/001-app-shell/mockups/` (21 reference images).
- [2026-10-11] Technical design completed in `specs/001-app-shell/plan.md` with full curriculum model and component mappings.
- [2026-10-11] Task breakdown finalized in `specs/001-app-shell/tasks.md` (44 tasks across all 9 stories). All 44/44 tasks completed.
- [2026-10-11] Acceptance test scenarios authored in `tests/acceptance/001-app-shell.spec.ts` (18 scenarios, confirmed failing first).
- [2026-10-11] Traceability generated in `specs/001-app-shell/traceability.md` (18/18 scenarios mapped).
- [2026-10-11] Production implementation completed:
  - Persistence: `src/persistence/storage.ts` with typed `gurukul:` namespace prefix and raw-string fallback.
  - Localization: `src/domain/i18n/core.ts` with all 30 dictionary files ported into TypeScript (zero duplicate keys, English fallback).
  - Curriculum: `src/domain/curriculum/curriculum.ts` with 3 subjects, 18 threads, 74 knots (19 playable), 10 Jaal links, helper methods.
  - Mathematical curve: `src/domain/math/kolam.ts` mirror curve construction.
  - UI Infrastructure: `src/ui/util/dom.ts` typed DOM/SVG constructors.
  - Visual Art: `src/ui/diagrams/kolam-curve.ts` (animated SVG kolam), `src/ui/diagrams/banyan.ts` (banyan line art & shala motifs).
  - Chrome: `src/ui/components/chrome/topbar.ts` & `language-sheet.ts` (modal sheet, night toggle, language picker).
  - Router: `src/ui/components/app/router.ts` hash routing with in-memory state preservation and lifecycle cleanups.
  - Screens: `opening.ts` (unbroken kolam, skip), `language.ts` (5 native script cards), `ashram.ts` (courtyard, 3 shala cards, continue, remember, jaal), `shala.ts` (thread wave spine, knot statuses, calm toasts), `jaal.ts` (triangular web, curved links, detail inspector).
  - Offline: `public/sw.js` and `src/ui/util/register-sw.ts`.
- [2026-10-11] Test suites verified:
  - Acceptance: 38/38 passing in `tests/acceptance/` across 390x844 and 360x740 viewports.
  - E2E Journeys: 8/8 passing in `tests/e2e/journeys/001-journeys.spec.ts` (J1, J2, J9, J10).
  - Mockup Parity: 14/14 passing in `tests/e2e/mockup/001-shell.spec.ts` across all 7 screens.
  - Sweep: 11/11 passing in `tests/e2e/sweep/` with 0 accessibility violations across 5 languages.
  - Full Verification Harness: 11/11 checks PASS in `python3 scripts/harness/verify.py`.

## In progress
- **Gate G4**: Final review, git commit, and draft pull request preparation.

## Decisions (and why)
- **Ashram Courtyard as Feature 001 Home**: Rather than a temporary maths-only Loom, Feature 001 delivers the true Gurukul shell matching the working prototype 1:1 (`#home` = Ashram with banyan tree, `#shala?s=ganita|vijnana|loka` = generic Shala component, and `#jaal` = cross-subject web).
- **Port All Dictionaries and Curriculum in 001**: Per `DEV_HANDOFF.md` §11.2, all 30 i18n dictionaries across 5 languages and the complete 74-knot, 18-thread, 3-subject curriculum model (Ganita: 8 threads/42 knots, Vijnana: 6 threads/14 knots, Loka: 4 threads/18 knots, and 10 Jaal links) are ported in Feature 001.

## Open issues and questions for humans
- None. All requirements and gates satisfied.

## Failed attempts (don't repeat)
- Dev server unbundled reload during offline simulation: In Vite dev mode, unbundled ESM files are fetched dynamically; offline reload fails to reach dev server. Test offline client-side SPA routing and static bundle caching rather than dev-mode page reload.

## Next action
- Complete Gate G4 review, commit changes, and present final contract report.
