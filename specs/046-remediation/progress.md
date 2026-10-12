# Progress: 046 Remediation

## State
Branch `fix/046-remediation` from `main@ee6e54e`. New features frozen (product owner, 12 Oct 2026).

## Red baseline (sensors written before fixes, T001–T005)
- `src/domain/i18n/dictionaries.test.ts`: 1,335 English keys missing in each of hi, te, bn, ta; 19–44 English or mixed values per language; 2 term-id mismatches (S2/L2 English text had been overridden in `en-ganita.ts`); praise words in en (`roman.s2done` "Well done!") and te (`bodha.U1.where` "స్కోరు").
- `src/ui/ui-text.test.ts`: 488 hard-coded English strings or `innerHTML`/`html:` uses in `src/ui`.
- `tests/e2e/sweep/app-routes.spec.ts` + `tests/e2e/journeys/046-every-lesson.spec.ts` (390×844 project): 323 failed, 1 passed (15.4 min).

## Findings recorded during the survey
- Production Prashna never rendered a picture; prototype did (`design/prototype/js/screens/prashna.js:20`).
- Explain-it-back lost the prototype hint, keep-anyway, hear and knot label; hint strings exist per knot but were unused.
- `en-ganita.ts` silently overrode English S2 and L2 Bodha/explain/know text; the other four languages still had the originals. S2's new text (multiples of 2 and 3) contradicted its figure and bench (courtyard blocks). Decision (revised after running acceptance): approved spec 040 defines S2's text (multiples of 2 and 3, explain tiles both/outside) and its acceptance tests encode it, so the spec-040 English now lives in the owning files (no override) and the logic group must make S2's figures match it. Likewise keep the newer L2 English (043 acceptance tests). Stale S2 and L2 translations removed; hi/te/bn/ta re-translate them.
- `BANNED_WORDS` flagged ordinary words (en point/star/coins, hi अंक, bn তারা); refined to praise and score terms only. Its own test is unchanged and passes.
- The stop screen shows `bodha.<K>.sutra` without stripping glossary markup.

## Next action
T006: lesson-visuals registry (refactor first, existing figures unchanged).

## Engine (T006-T009) done
- Visuals registry `src/ui/lesson-visuals/` (Prashna art, card figures, mistake picture per knot); Phase 1 figures moved unchanged into `ported.ts`.
- No silent fallbacks: Bodha/Prashna/mistake/explain show `lesson.missing` and log an error for a knot without data. A bare `/#/mistake` or `/#/explain` (no knot, no thread) still opens M4, the Phase 1 lesson (002 acceptance and mockup tests).
- Mistake equations are dictionary strings `mistake.<K>.eq` with `<s>`/`<r>` markup rendered without innerHTML; term ids may contain hyphens; `plainText` lives in `src/ui/util/markup.ts`.
- Explain: hint on first mismatch, Keep anyway, writes `done`, Pothi page carries the bench route. M2 explain template moved from the screen into `m2.ts`.
- FR-006: `gcd` is `calculateHCF` (hcf.ts); angles.ts uses it. FR-007: storage warns once per operation; `readStep` validates `?step=`; digest demo interval cleared on leave.
- Acceptance + mockup: 994 run, all pass after fixes (roman text keeps "assembled", S2 per spec 040).
