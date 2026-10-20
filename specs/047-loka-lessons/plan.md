# Plan: 047 Loka lessons

## Shape of one knot

| Part | File | Holds |
|---|---|---|
| Facts and rules | `src/domain/world/<topic>.ts` (+ `.test.ts`) | plain data and pure functions; no UI types |
| Lesson data | `src/domain/lesson/<k>.ts`, `registry.ts` | cards, mistake (steps, wrong), explain tiles |
| Curriculum | `src/domain/curriculum/curriculum.ts` | `prashna: true, bench: bench('<route>')` |
| Drawing | `src/ui/diagrams/loka/<topic>.ts` | the SVG model, used by both the bench and the Bodha figures |
| Bench | `src/ui/components/screens/<route>.ts`, `src/main.ts` | three steps; state in the screen state; words via `t()` |
| Pictures | `src/ui/lesson-visuals/loka-<thread>.ts`, `index.ts` | Prashna, five card figures, mistake picture |
| Words | `src/domain/i18n/dictionaries/<lang>-l-<thread>.ts`, `index.ts` | en, hi, te, bn, ta |
| Style | `src/ui/components/theme/l-loka.css`, `index.html` | shared Loka bench styles |
| Acceptance | `tests/acceptance/047-<k>.spec.ts` | US<n>-AS<m> from spec §3 |

## Shared bench pieces

`src/ui/util/loka-bench.ts`: the bench frame (title, step guide, model, say line, actions), a tap-to-pair control (choose one item, then its place; used for sorting and matching), a tap-in-order control and a choice row. They hold no rule: each takes a `fits(a, b)` or `isNext(x)` from the knot's domain module. Built with buttons, so every control is keyboard operable with `aria-pressed` and labels from `t()`. Animations use `tween`, which jumps to the end under reduced motion.

## Order

Spec and plan, shared pieces, then I1, Q1, Q2, Q3, E2, E3, C1–C9. Each knot is finished in all five languages and passes `verify.py --fast` and its acceptance spec before its commit. Then docs, the full verify, a screenshot pass at 360 and 390 px, an independent review, and a draft PR.

## Translation

Written directly in each script by the agent (AGENTS.md §13). The child is addressed informally (तुम, నువ్వు, তুমি, நீ). Proper names (states, cities, rivers, festivals) are written in the target script. Drafts until native review.

## Dependencies

None added.

## Risks

- Map sensitivity: schematic tiles only, labelled not to scale; human review before release.
- Facts: listed for teacher sign-off in `checks.md`.
- Volume: about 15 × 120 strings × 5 languages.
