# Progress: 047 Loka lessons

## State
Branch `feat/047-loka-lessons` from `main@4f77dc0`. Dev server for checks: `npx vite --port 4173 --strictPort`.

## Done
- T001 spec/plan/tasks. Count corrected: Loka has 18 knots, 15 to build (not 16).
- T002 shared pieces (`loka-bench.ts`, `l-loka.css`, per-thread dictionaries and picture tables). `figArrow` moved to `fig.ts`.
- T003 I1 (`#dig`): domain `world/sources.ts`, drawing `diagrams/loka/dig.ts`, bench `screens/dig.ts`, five languages, `tests/acceptance/047-i1.spec.ts`. Sweep, journey, keyboard pass.
- T004 Q1 (`#govern`): `world/civics.ts`, `diagrams/loka/govern.ts`, five languages, `047-q1.spec.ts`.
- T005 Q2 (`#citizen`): `world/citizenship.ts`, `diagrams/loka/citizen.ts`, five languages, `047-q2.spec.ts`.
- T006 Q3 (`#river`): `world/pollution.ts`, `diagrams/loka/river.ts` (village, stream, bins), five languages, `047-q3.spec.ts`. `house` moved to `diagrams/loka/parts.ts`.
- Note: after a miss the chosen chip stays chosen; tapping it again un-chooses it (tests check `aria-pressed`).

## Per-knot recipe
1. `src/domain/world/<topic>.ts` + test (export from `world/index.ts` with unique names).
2. `src/ui/diagrams/loka/<topic>.ts` (one drawing for bench and pictures).
3. `src/ui/components/screens/<route>.ts` with `lokaFrame`, `pairPad`, `orderPad`, `choiceRow`; register in `src/main.ts`.
4. `src/domain/lesson/<k>.ts` + `registry.ts`; curriculum `prashna: true, bench: bench('<route>')`; bump the playable count in `src/domain/curriculum/index.test.ts`.
5. Pictures in `lesson-visuals/loka-<thread>.ts`.
6. Strings in `<lang>-l-<thread>.ts` for en hi te bn ta.
7. `tests/acceptance/047-<k>.spec.ts`; run sweep/journey/keyboard `-g "<K>:"`; screenshots with `node .agent/tmp/shots.mjs <K> <route> <lang>` (WRONG=<index>).

## Next action
T007 E2 Four domains (`#domains`).
