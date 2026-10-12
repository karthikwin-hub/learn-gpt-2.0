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
- `en-ganita.ts` silently overrode English S2 and L2 Bodha/explain/know text; the other four languages still had the originals. S2's new text (multiples of 2 and 3) contradicted its figure and bench (courtyard blocks). Decision: restore the original S2 English (matches figure, bench and translations); keep the newer L2 English (the 043 acceptance tests encode it) and re-translate L2 in hi/te/bn/ta.
- `BANNED_WORDS` flagged ordinary words (en point/star/coins, hi अंक, bn তারা); refined to praise and score terms only. Its own test is unchanged and passes.
- The stop screen shows `bodha.<K>.sutra` without stripping glossary markup.

## Next action
T006: lesson-visuals registry (refactor first, existing figures unchanged).
