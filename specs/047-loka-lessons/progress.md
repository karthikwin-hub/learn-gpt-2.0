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
- T007 E2 (`#domains`): `world/spheres.ts`, `diagrams/loka/spheres.ts` (globe, 100 squares, domains scene, 100-drop jug), five languages, `047-e2.spec.ts`.
- T008 E3 (`#landforms`): `world/landforms.ts`, `diagrams/loka/landforms.ts` (rising section, height-and-top shape), five languages, `047-e3.spec.ts`. Fixed broken te/bn Loka knot titles (e.g. te "ఆభార" for భారత, bn "মেসা" for মালভূমি).
- T009 C1 (`#states`): `world/states.ts` (36 regions, capitals via strings, main language, symmetric borders, grid tile), `diagrams/loka/states.ts` (schematic tile map, not to scale), native `<select>` for "my state", five languages, `047-c1.spec.ts`. Teacher check: AP capital Amaravati, A&N capital Sri Vijaya Puram, Uttarakhand Dehradun, HP–UP border left out.
- T010 C2 (`#farms`): `world/farming.ts` (kharif/rabi/zaid sowing months, six crops, three fields), `diagrams/loka/farms.ts` (year wheel with legend), five languages, `047-c2.spec.ts`. te uses సంక్రాంతి and bn adds নবান্ন as local harvest festivals.
- T011 C3 (`#cities`): `world/settlements.ts` (three needs: water, flat land, travel; size by count; four cities), `diagrams/loka/cities.ts` (land from above, six numbered sites), five languages, `047-c3.spec.ts`. Teacher check: Bengaluru about 900 m.
- T012 C4 (`#himalaya`): `world/himalaya.ts` (6.5 °C per 1,000 m from 32 °C; freezes at the 5,000 m step; three ranges), `diagrams/loka/himalaya.ts` (side view with height line and thermometer), five languages, `047-c4.spec.ts`. Temperatures use a no-break space before °C.
- T013 C5 (`#plains`): `world/plains.ts` (one silt layer per flood, four to fill; five-link chain), `diagrams/loka/plains.ts` (mountain and low land cut open), five languages, `047-c5.spec.ts`.
- T014 C6 (`#desert`): `world/desert.ts` (rounded day ranges: Thar summer 25–45 °C, winter 5–25 °C; seaside 27–34 and 20–30; smooth curve coolest at 6, warmest at 15; only a winter 6 am is 6 °C or below), `diagrams/loka/desert.ts` (two thermometers), five languages, `047-c6.spec.ts`. Step 2 starts at 3 pm so the child must choose the hour.
- T015 C7 (`#plateau`): `world/plateau.ts` (three rivers east to the Bay of Bengal, Narmada and Tapi west in rift valleys), `diagrams/loka/plateau.ts` (schematic peninsula; rivers drawn as far as they have run via pathLength), five languages, `047-c7.spec.ts`. Native check: hi/te use the textbook loanword for delta.
- Note: SVG text does not wrap; long picture captions go in the `aria-label` only.
- Note: after a miss the chosen chip stays chosen; tapping it again un-chooses it (tests check `aria-pressed`).

## Per-knot recipe
1. `src/domain/world/<topic>.ts` + test (export from `world/index.ts` with unique names).
2. `src/ui/diagrams/loka/<topic>.ts` (one drawing for bench and pictures).
3. `src/ui/components/screens/<route>.ts` with `lokaFrame`, `pairPad`, `orderPad`, `choiceRow`; register in `src/main.ts`.
4. `src/domain/lesson/<k>.ts` + `registry.ts`; curriculum `prashna: true, bench: bench('<route>')`; bump the playable count in `src/domain/curriculum/index.test.ts`.
5. Pictures in `lesson-visuals/loka-<thread>.ts`.
6. Strings in `<lang>-l-<thread>.ts` for en hi te bn ta.
7. `tests/acceptance/047-<k>.spec.ts`; run sweep/journey/keyboard `-g "<K>:|<route>"` (a bare `-g E2` also matches unrelated tests); screenshots with `node .agent/tmp/shots.mjs <K> <route> <lang>` (WRONG=<index>).

## Next action
T016 C8 Rivers of India (`#rivers`).
