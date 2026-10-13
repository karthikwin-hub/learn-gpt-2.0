# Plan: 046 Remediation

## Order (checks first, so every later fix is proven)

1. **Sensors** (US4): app-level route sweep over every playable knot × 5 languages (+ reduced motion), dictionary completeness/script/placeholder test, praise scan over dictionaries, static UI-text scan, data-driven every-lesson journey; add journeys and mockup specs to `harness.toml`. Record the red baseline in `progress.md`.
2. **Engine** (US2, US3): `src/ui/lesson-visuals/` registry (Prashna art, card figures, mistake pictures) used by Prashna, Bodha and Mistake; move the existing `getCardFigure` cases into it unchanged first (refactor commit); remove silent fallbacks; translated mistake equations with safe markup; explain hint/keep-anyway/hear/done; term regex; one HCF owner; storage error reporting; router step validation; digest timer cleanup.
3. **Lessons** (US1, US2) in parallel groups, one owner per file set:
   - number: N2 N4 N5 A1 A2 A3 D2 D4
   - factors: F1 F2 F3 F4 M1
   - geometry: G1 G3 G5 G6 G7 G8 (+ G2 G4 mistake pictures)
   - measure-data-patterns: U2 U3 H1 H2 L4 P1
   - sets-logic: S1 S3 L1 L3 (+ S2 L2 mistake pictures)
   - ported: N1 N3 U1 B3 R1 K2 lesson entries from the prototype; Prashna art for every ported knot
   Each group: move bench English into its own dictionary file, remove `innerHTML`, draw figures, mistake picture, review content, reduced motion and keyboard.
4. **Translation**: hi, te, bn, ta for every missing key, into per-group files; script check in the completeness test.
5. **Verify**: full harness, screenshot sweep, independent reviewer, fix findings.
6. **Record**: `docs/reports/REMEDIATION_046.md`, `checks.md`, lessons.

## Group brief (step 3; one agent per group, working in parallel in one checkout)

**Reference standard**: `design/prototype/js/lessons/ganita-p2.js` (N1, N3, U1) and `fig.js`: a Prashna `art`, `F.cards` figures for what/idea/why/example(step)/where, a mistake `picture(reveal)`. Pictures are SVG built with `src/ui/diagrams/fig.ts` (`figSvg`, `figText`, `figRect`, `figLine`, `figCircle`, `figPath`, `figGrid`) and `svg()`/`el()` from `src/ui/util/dom.ts`; every number shown comes from the knot's domain module (`src/domain/math|science|world`); every word comes from `t()`. Colours: `var(--indigo)`, `var(--teal)`, `var(--kumkum)` (highlight only, never "wrong"), `var(--ink)`, `var(--ink-soft)`, `var(--paper-raised)`, `var(--paper-sunk)`, `var(--thread-soft)`.

**Each group agent, for each of its knots:**
1. `src/ui/lesson-visuals/<group>.ts`: `prashna()` (if the knot has a Prashna), `cards.{what,idea,why,example,where}` (example draws something different for each step 0..steps; the sweep compares first and last), `mistake(reveal)` (if the lesson has a mistake). Each figure illustrates *its* card's text (`bodha.<K>.<card>`), not a generic picture.
2. Content review against `specs/<###>/spec.md` and maths/science accuracy for a 10-year-old. Fix wrong statements or figures. Keep the spec's acceptance scenarios true.
3. Bench (`src/ui/components/screens/<bench>.ts`): every visible string through `t()`; no `innerHTML`, `html:`, `textContent = '...'` with words; equations built as text from domain values plus dictionary words (or `markupLine` from `src/ui/util/markup.ts`); use `createStepGuide`/`setStepGuide`/`toMistakeButton`/`readStep` from `src/ui/util/bench.ts` instead of local copies; honour reduced motion (`reducedMotion()` from `dom.ts`: no animation, jump to end state); every drag/tap control also works by keyboard (focusable, Enter/Space/arrow keys) with an `aria-label` from `t()`.
4. English strings: add new keys to `src/domain/i18n/dictionaries/en-g-<group>.ts` only (prefix with the bench or knot, e.g. `metric.s1`, `bodha.U2.*`). Do **not** edit any other dictionary file: if an existing key elsewhere (en.ts, en-ganita.ts, en-bodha.ts, …) needs new English, list it in your report as `key → new English` and the coordinator applies it. Never re-define a key that exists elsewhere (a test fails on duplicates). Keep placeholders `{n}` and term tokens `[[term-id|word]]`. No praise/score/streak words (`src/domain/lesson/banned-words.ts`).
5. Mistake equation: `mistake.<K>.eq` with `<s>…</s>` (struck) and `<r>…</r>` (highlight) only.

**Who draws what (merged per part by `lesson-visuals/index.ts`; a part defined twice throws)**:
- ported (`ported.ts`): N1 N3 U1 B3 R1 K2 everything; M2 M4 M5 D1 D3 G2 G4 card figures (Phase 1, already there) plus a `where` figure for each; Prashna art for M2 M4 M5 D1 D3 if their curriculum entry has `prashna: true`; M5 mistake picture (M4's exists).
- geometry: G1 G3 G5 G6 G7 G8 everything; G2 and G4 only `prashna` (if `prashna: true`) and `mistake`.
- logic: S1 S2 S3 L1 L2 L3 everything (the Phase 1 S2/L1/L2/L3 figures did not match the current text; `src/ui/diagrams/sets.ts` and `logic.ts` are yours to reuse or change).
- measure: U2 U3 H1 H2 L4 P1 everything. number: N2 N4 N5 A1 A2 A3 D2 D4 everything. factors: F1 F2 F3 F4 M1 M3 everything.

**Files you own**: your group's screens, `lesson-visuals/<group>.ts`, `en-g-<group>.ts`, `src/ui/components/theme/g-<group>.css` (already linked; do not edit lesson.css), your knots' `src/domain/lesson/<k>.ts`, and domain modules used only by your knots. **Everything else is read-only**, including tests in `tests/`, the 046 sensors, `lesson-visuals/index.ts`, `src/ui/util/*`, `router.ts`, other groups' files and the non-English dictionaries. Need a change there? Put it in your report.

**Acceptance tests are the contract**: never edit them; if an English text is matched by a test, keep the en value matching it.

**Checks (a dev server already serves the live source on localhost:4173; do not start or stop servers, do not run `npm run build`)**:
- `npx tsc --noEmit` (ignore errors in files you do not own — another agent may be mid-edit; re-run).
- `npx eslint <your files>` and `npx prettier --write <your files>`.
- `npx vitest run src/ui/ui-text.test.ts` — no line may name your files.
- `PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright npx playwright test tests/acceptance/<your specs> --project=chromium-390x844`
- `… npx playwright test tests/e2e/sweep -g "(K1|K2): .* in en," --project=chromium-390x844` and `… tests/e2e/journeys -g "(K1|K2): "`. Non-English sweeps fail until translation — ignore them.
- Look at your pictures: a throwaway Playwright script in `.agent/tmp/<group>/` can screenshot `/#/prashna?k=K`, `/#/bodha?k=K&card=N`, the mistake screen; open the PNG and check it reads well at 360 px.
- Do not commit; do not touch git. The coordinator commits.

**Report (≤25 lines)**: per knot, done/not done for picture, 5 card figures, mistake picture, bench strings, reduced motion, keyboard; content errors found and fixed; `key → new English` requests for files you do not own; check commands and results.

## Files

- Per-group dictionaries: `src/domain/i18n/dictionaries/<lang>-g-<group>.ts`, merged in `dictionaries/index.ts`. Moving keys out of `en-ganita.ts` is behaviour-preserving.
- Visuals: `src/ui/lesson-visuals/{types,index,<group>}.ts`. Figures call `src/domain/math|science|world` and `t()`; no rule is computed in the figure.

## Dependencies

None added.

## Risks

- Machine-drafted translations: marked draft; teacher review is a human gate after merge.
- Volume: about 1,700 keys × 4 languages. Mitigation: per-language, per-group files and an automated script check.
