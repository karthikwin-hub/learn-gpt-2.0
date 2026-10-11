# Tasks: 001 App shell, language switching and fonts

Status: Complete · Feature: `specs/001-app-shell` · Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

---

## Story US1 (P1): First run experience
Opening thread, language selection screen, and landing on the Ashram in the chosen language.

- [x] T001 `[mockup]` Verify mockups captured for `opening`, `language`, and `home` in `specs/001-app-shell/mockups/`.  
  *Verify*: `ls -l specs/001-app-shell/mockups/`
- [x] T002 `[test-acceptance]` Write acceptance tests `US1-AS1`, `US1-AS2`, `US1-AS3` in `tests/acceptance/001-app-shell.spec.ts` (confirm failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US1"`
- [x] T003 `[port-domain]` Implement `src/persistence/storage.ts` with typed `gurukul:` namespace prefix (`get`, `set`, `remove`).  
  *Verify*: `npx vitest run src/persistence/index.test.ts`
- [x] T004 `[i18n]` Port core, gurukul, bodha, ganita, vijnana, loka dictionaries in 5 languages into `src/domain/i18n/dictionaries/`.  
  *Verify*: `npx vitest run src/domain/i18n/index.test.ts`
- [x] T005 `[port-domain]` Implement `src/domain/i18n/core.ts` with `t()`, `tIn()`, fallback to English, and duplicate key checks.  
  *Verify*: `npx vitest run src/domain/i18n/core.test.ts`
- [x] T006 `[port-domain]` Port curriculum model in `src/domain/curriculum/curriculum.ts` (3 Shalas, 18 threads, 74 knots, 10 Jaal links).  
  *Verify*: `npx vitest run src/domain/curriculum/curriculum.test.ts`
- [x] T007 `[port-ui]` Implement `src/ui/components/app/router.ts` (hash routing `#/<screen>`, in-memory state keys, screen cleanup).  
  *Verify*: `npx vitest run src/ui/components/app/router.test.ts`
- [x] T008 `[port-ui]` Implement opening screen `src/ui/components/screens/opening.ts` with unbroken kolam line drawing and tap-to-skip.  
  *Verify*: `npm run build`
- [x] T009 `[port-ui]` Implement language selection screen `src/ui/components/screens/language.ts` (5 native script cards, continue button).  
  *Verify*: `npm run build`
- [x] T010 `[test-acceptance]` Verify `US1-AS1`, `US1-AS2`, `US1-AS3` pass.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US1"`

---

## Story US2 (P1): Zero-loss language switching anywhere
Topbar language button and modal bottom sheet updating UI in place without losing screen state.

- [x] T011 `[test-acceptance]` Write acceptance tests `US2-AS1` and `US2-AS2` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US2"`
- [x] T012 `[port-ui]` Implement topbar component `src/ui/components/chrome/topbar.ts` (title, back button, language button, sound toggle).  
  *Verify*: `npm run build`
- [x] T013 `[port-ui]` Implement language sheet modal `src/ui/components/chrome/language-sheet.ts` (accessible `dialog`, 5 options).  
  *Verify*: `npm run build`
- [x] T014 `[test-acceptance]` Verify `US2-AS1` and `US2-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US2"`

---

## Story US3 (P1): The Ashram (Home)
Ashram courtyard with banyan tree line art, 3 Shala cards, continue card, remember card, and Jaal button.

- [x] T015 `[mockup]` Verify mockups captured for `home` in `specs/001-app-shell/mockups/`.  
  *Verify*: `ls -l specs/001-app-shell/mockups/home-*.png`
- [x] T016 `[test-acceptance]` Write acceptance tests `US3-AS1`, `US3-AS2`, `US3-AS3` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US3"`
- [x] T017 `[port-ui]` Implement banyan tree SVG component `src/ui/diagrams/banyan.ts`.  
  *Verify*: `npm run build`
- [x] T018 `[port-ui]` Implement Ashram screen `src/ui/components/screens/ashram.ts` (banyan art, 3 Shala cards, continue, remember, Jaal link).  
  *Verify*: `npm run build`
- [x] T019 `[test-acceptance]` Verify `US3-AS1`, `US3-AS2`, `US3-AS3` pass.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US3"`

---

## Story US4 (P2): Ganita Shala (Mathematics)
8 threads, 33 knots, wave spine, knot indicators, and calm toast for coming knots.

- [x] T020 `[mockup]` Verify mockups for `shala?s=ganita`.  
  *Verify*: `ls -l specs/001-app-shell/mockups/shala_s_ganita-*.png`
- [x] T021 `[test-acceptance]` Write acceptance tests `US4-AS1` and `US4-AS2` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US4"`
- [x] T022 `[port-ui]` Implement reusable Shala screen `src/ui/components/screens/shala.ts` supporting `ganita`, `vijnana`, and `loka`.  
  *Verify*: `npm run build`
- [x] T023 `[test-acceptance]` Verify `US4-AS1` and `US4-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US4"`

---

## Story US5 (P2): Vijnana Shala (Science)
6 threads, 16 knots, and cross-subject crossing tags.

- [x] T024 `[mockup]` Verify mockups for `shala?s=vijnana`.  
  *Verify*: `ls -l specs/001-app-shell/mockups/shala_s_vijnana-*.png`
- [x] T025 `[test-acceptance]` Write acceptance tests `US5-AS1` and `US5-AS2` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US5"`
- [x] T026 `[test-acceptance]` Verify `US5-AS1` and `US5-AS2` pass on `src/ui/components/screens/shala.ts`.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US5"`

---

## Story US6 (P2): Loka Shala (Social Studies)
4 threads, 25 knots covering history, civics, geography, and heritage.

- [x] T027 `[mockup]` Verify mockups for `shala?s=loka`.  
  *Verify*: `ls -l specs/001-app-shell/mockups/shala_s_loka-*.png`
- [x] T028 `[test-acceptance]` Write acceptance test `US6-AS1` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US6"`
- [x] T029 `[test-acceptance]` Verify `US6-AS1` passes on `src/ui/components/screens/shala.ts`.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US6"`

---

## Story US7 (P2): Jaal (Cross-Subject Web)
Interactive triangular web connecting Ganita, Vijnana, and Loka with 10 curved links.

- [x] T030 `[mockup]` Verify mockups for `jaal`.  
  *Verify*: `ls -l specs/001-app-shell/mockups/jaal-*.png`
- [x] T031 `[test-acceptance]` Write acceptance tests `US7-AS1` and `US7-AS2` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US7"`
- [x] T032 `[port-ui]` Implement Jaal screen `src/ui/components/screens/jaal.ts` and SVG curve diagram `src/ui/diagrams/jaal-web.ts`.  
  *Verify*: `npm run build`
- [x] T033 `[test-acceptance]` Verify `US7-AS1` and `US7-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US7"`

---

## Story US8 (P2): Offline capability & child privacy
Zero telemetry, DPDP Act 2023 compliance, only `gurukul:` storage keys, and offline service worker caching.

- [x] T034 `[test-acceptance]` Write acceptance tests `US8-AS1` and `US8-AS2` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US8"`
- [x] T035 `[port-ui]` Implement offline service worker `public/sw.js` and registration utility `src/ui/util/register-sw.ts`.  
  *Verify*: `npm run build`
- [x] T036 `[test-acceptance]` Verify `US8-AS1` and `US8-AS2` pass.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US8"`

---

## Story US9 (P3): Night colours
Dark mode toggle in chrome applying high-contrast night palette meeting WCAG AA.

- [x] T037 `[test-acceptance]` Write acceptance test `US9-AS1` in `tests/acceptance/001-app-shell.spec.ts` (failing first).  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US9"`
- [x] T038 `[port-ui]` Add theme toggle to topbar and wire `[data-theme='night']` state persistence in `gurukul:theme`.  
  *Verify*: `npm run build`
- [x] T039 `[test-acceptance]` Verify `US9-AS1` passes.  
  *Verify*: `npx playwright test tests/acceptance/001-app-shell.spec.ts -g "US9"`

---

## Cross-Cutting Verification, Journeys & Parity

- [x] T040 `[test-parity]` Implement mockup parity test `tests/e2e/mockup/001-shell.spec.ts` comparing visible text against prototype for `opening`, `language`, `home`, `shala?s=ganita`, `shala?s=vijnana`, `shala?s=loka`, and `jaal`.  
  *Verify*: `npx playwright test tests/e2e/mockup/001-shell.spec.ts`
- [x] T041 `[test-journey]` Implement journeys `J1` (First run), `J2` (Language switch keeps state), `J9` (Shell offline), and `J10` (Cross-subject entry) in `tests/e2e/journeys/001-journeys.spec.ts`.  
  *Verify*: `npx playwright test tests/e2e/journeys/001-journeys.spec.ts`
- [x] T042 `[a11y]` Run 5-language sweep (`tests/e2e/sweep/`) on all shell routes with and without reduced motion; verify 0 serious/critical axe violations.  
  *Verify*: `npx playwright test tests/e2e/sweep`
- [x] T043 `[regression]` Run full verification harness (`python3 scripts/harness/verify.py`).  
  *Verify*: `python3 scripts/harness/verify.py`
- [x] T044 `[evidence]` Fill evidence rows in `specs/001-app-shell/checks.md`.  
  *Verify*: `python3 scripts/harness/check_traceability.py --write`
