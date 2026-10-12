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

## Files

- Per-group dictionaries: `src/domain/i18n/dictionaries/<lang>-g-<group>.ts`, merged in `dictionaries/index.ts`. Moving keys out of `en-ganita.ts` is behaviour-preserving.
- Visuals: `src/ui/lesson-visuals/{types,index,<group>}.ts`. Figures call `src/domain/math|science|world` and `t()`; no rule is computed in the figure.

## Dependencies

None added.

## Risks

- Machine-drafted translations: marked draft; teacher review is a human gate after merge.
- Volume: about 1,700 keys × 4 languages. Mitigation: per-language, per-group files and an automated script check.
