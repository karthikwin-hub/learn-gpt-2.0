# Tasks: 002 Lesson engine, Bodha cards and Living Film player

Status: Complete · Feature: `specs/002-lesson-engine` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): Universal 7-Stage Thread Flow
Prashna $\to$ Bodha $\to$ Film $\to$ Workbench $\to$ Mistake $\to$ Explain $\to$ Stop flow with Ashram carry-on state restoration.

- [x] T001 `[mockup]` Verify mockups captured for `wonder`, `bodha?k=M2`, `film`, `rect`, `mistake`, `explain`, and `stop` in `specs/002-lesson-engine/mockups/`.  
  *Verify*: `ls -l specs/002-lesson-engine/mockups/`
- [x] T002 `[test-acceptance]` Write acceptance tests `US1-AS1`, `US1-AS2`, `US1-AS3` in `tests/acceptance/002-lesson-engine.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US1"`
- [x] T003 `[port-domain]` Implement `src/domain/lesson/types.ts` defining lesson stages, cards, and metadata.  
  *Verify*: `npx tsc --noEmit`
- [x] T004 `[port-ui]` Implement thread tracking helper `enterThread(knotId, route, params)` updating `gurukul:continue` in storage.  
  *Verify*: `npx vitest run src/persistence/index.test.ts`
- [x] T005 `[port-ui]` Wire route transitions between stages in `src/ui/components/app/router.ts`.  
  *Verify*: `npm run build`
- [x] T006 `[test-acceptance]` Verify `US1-AS1`, `US1-AS2`, `US1-AS3` pass.  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US1"`

---

## Story US2 (P1): Living Film Player
Time-computed SVG animation, beat pause, bidirectional scrubber, interactive dragging during pause with ghost outline, and reduced motion cut mode.

- [x] T007 `[test-acceptance]` Write acceptance tests `US2-AS1`, `US2-AS2`, `US2-AS3`, `US2-AS4` in `tests/acceptance/002-lesson-engine.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US2"`
- [x] T008 `[port-ui]` Implement Living Film screen and time player `src/ui/components/screens/film.ts` with beat segments and play/pause controls.  
  *Verify*: `npm run build`
- [x] T009 `[port-ui]` Implement pause-to-drag interaction in `src/ui/components/screens/film.ts` preserving ghost outline of scripted state.  
  *Verify*: `npm run build`
- [x] T010 `[port-ui]` Implement bidirectional scrubbing and reduced-motion cut mode in `src/ui/components/screens/film.ts`.  
  *Verify*: `npm run build`
- [x] T011 `[test-acceptance]` Verify `US2-AS1`, `US2-AS2`, `US2-AS3`, `US2-AS4` pass.  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US2"`

---

## Story US3 (P1): Narration, Captions & Sound Control
Speech synthesis controller with caption parity, speech rate toggle, and sound toggle.

- [x] T012 `[test-acceptance]` Write acceptance tests `US3-AS1` and `US3-AS2` in `tests/acceptance/002-lesson-engine.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US3"`
- [x] T013 `[port-ui]` Implement `src/ui/components/voice/voice.ts` with SpeechSynthesis API, voice rate configuration, and `#caption` banner with `aria-live`.  
  *Verify*: `npx vitest run src/ui/components/voice/voice.test.ts`
- [x] T014 `[port-ui]` Add sound toggle button `#btn-sound` to topbar in `index.html` and wire controller in `src/ui/components/chrome/topbar.ts`.  
  *Verify*: `npm run build`
- [x] T015 `[test-acceptance]` Verify `US3-AS1` and `US3-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US3"`

---

## Story US4 (P2): Workbench Linked Representations & Step Fading
Interactive Rubber Rectangle manipulative with synchronized equation updates and fading scaffolding.

- [x] T016 `[test-acceptance]` Write acceptance tests `US4-AS1` and `US4-AS2` in `tests/acceptance/002-lesson-engine.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US4"`
- [x] T017 `[test-unit]` Write domain unit tests for `partialProducts`, `columnMethod`, `lcm`, and `splitTensOnes` in `src/domain/math/multiply.test.ts`.  
  *Verify*: `npx vitest run src/domain/math/multiply.test.ts`
- [x] T018 `[port-domain]` Implement `src/domain/math/multiply.ts` reproducing §8.2 known values.  
  *Verify*: `npx vitest run src/domain/math/multiply.test.ts`
- [x] T019 `[port-ui]` Implement Rubber Rectangle manipulative `src/ui/manipulatives/area-grid.ts` with handles, keyboard navigation, and ghost trails.  
  *Verify*: `npm run build`
- [x] T020 `[port-ui]` Implement workbench screen `src/ui/components/screens/rect.ts` linking manipulative, equation, and step fading.  
  *Verify*: `npm run build`
- [x] T021 `[test-acceptance]` Verify `US4-AS1` and `US4-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US4"`

---

## Story US5 (P2): Calm Pedagogical Feedback & Zero Gamification
Descriptive reality feedback without praise, points, stars, streaks, and zero punitive red.

- [x] T022 `[test-acceptance]` Write acceptance tests `US5-AS1` and `US5-AS2` in `tests/acceptance/002-lesson-engine.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US5"`
- [x] T023 `[port-domain]` Implement `src/domain/lesson/banned-words.ts` and test suite checking feedback strings across 5 Indic languages.  
  *Verify*: `npx vitest run src/domain/lesson/banned-words.test.ts`
- [x] T024 `[port-ui]` Implement Spot the Mistake screen `src/ui/components/screens/mistake.ts` with kumkum red focal pointer and zero penalty.  
  *Verify*: `npm run build`
- [x] T025 `[test-acceptance]` Verify `US5-AS1` and `US5-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US5"`

---

## Story US6 (P1): Bodha Cards Engine & Glossary Bridge
5–6 concept cards, step reveal, bilingual glossary bridge cards, in-workbench recall, and sutra retention.

- [x] T026 `[test-acceptance]` Write acceptance tests `US6-AS1`, `US6-AS2`, `US6-AS3`, `US6-AS4`, `US6-AS5` in `tests/acceptance/002-lesson-engine.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US6"`
- [x] T027 `[port-ui]` Implement Prashna prediction screen `src/ui/components/screens/prashna.ts` with range guess and courtyard art.  
  *Verify*: `npm run build`
- [x] T028 `[port-ui]` Implement diagram builders in `src/ui/diagrams/fig.ts` and M2 tile visuals in `src/ui/diagrams/tiles.ts`.  
  *Verify*: `npm run build`
- [x] T029 `[port-domain]` Implement M2 lesson card data in `src/domain/lesson/m2.ts` and lesson registry `src/domain/lesson/registry.ts`.  
  *Verify*: `npx vitest run src/domain/lesson/registry.test.ts`
- [x] T030 `[port-ui]` Implement Bodha cards screen `src/ui/components/screens/bodha.ts` with progress beads, text size controls, glossary bridge modal, and step reveal.  
  *Verify*: `npm run build`
- [x] T031 `[port-ui]` Implement Explain It Back screen `src/ui/components/screens/explain.ts` and Stop screen `src/ui/components/screens/stop.ts`.  
  *Verify*: `npm run build`
- [x] T032 `[test-acceptance]` Verify `US6-AS1` through `US6-AS5` pass.  
  *Verify*: `npx playwright test tests/acceptance/002-lesson-engine.spec.ts -g "US6"`

---

## Cross-Cutting Verification, Journeys & Parity

- [x] T033 `[test-parity]` Implement mockup parity test `tests/e2e/mockup/002-lesson.spec.ts` verifying all 7 screens against captured mockups.  
  *Verify*: `npx playwright test tests/e2e/mockup/002-lesson.spec.ts`
- [x] T034 `[test-journey]` Implement journeys `J3` (Prashna to Stop flow), `J4` (Film interactive pause), and `J7` (Keep sutra persistence) in `tests/e2e/journeys/002-journeys.spec.ts`.  
  *Verify*: `npx playwright test tests/e2e/journeys/002-journeys.spec.ts`
- [x] T035 `[a11y]` Run 5-language accessibility sweep on all 7 lesson routes with and without reduced motion.  
  *Verify*: `npx playwright test tests/e2e/sweep`
- [x] T036 `[regression]` Run full verification harness (`python3 scripts/harness/verify.py`).  
  *Verify*: `python3 scripts/harness/verify.py`
- [x] T037 `[evidence]` Fill evidence rows in `specs/002-lesson-engine/checks.md`.  
  *Verify*: `python3 scripts/harness/check_traceability.py --write`
