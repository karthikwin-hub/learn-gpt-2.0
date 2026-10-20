# Tasks: 047 Loka lessons

Verify for every knot task: `npx vitest run src/domain/world src/domain/lesson src/domain/i18n src/ui` and `npx playwright test tests/acceptance/047-<k>.spec.ts tests/e2e/sweep tests/e2e/journeys -g "<K>:" --project=chromium-390x844`, then `python3 scripts/harness/verify.py --fast`.

- [x] T001 Spec, plan, tasks, progress
- [x] T002 Shared pieces: `loka-bench.ts`, `l-loka.css`, per-thread dictionaries and visuals files wired in
- [x] T003 US1 I1 Clues from the past (`#dig`)
- [x] T004 US2 Q1 What is civics? (`#govern`)
- [x] T005 US3 Q2 A good citizen (`#citizen`)
- [x] T006 US4 Q3 Pollution and us (`#river`)
- [ ] T007 US5 E2 Four domains (`#domains`)
- [ ] T008 US6 E3 Landforms (`#landforms`)
- [ ] T009 US7 C1 The states of India (`#states`)
- [ ] T010 US8 C2 Farms of India (`#farms`)
- [ ] T011 US9 C3 Cities of India (`#cities`)
- [ ] T012 US10 C4 The Himalaya (`#himalaya`)
- [ ] T013 US11 C5 The northern plains (`#plains`)
- [ ] T014 US12 C6 The Thar Desert (`#desert`)
- [ ] T015 US13 C7 The peninsular plateau (`#plateau`)
- [ ] T016 US14 C8 Rivers of India (`#rivers`)
- [ ] T017 US15 C9 Unity in diversity (`#unity`)
- [ ] T018 Docs: `WORLD_RULES.md`, `CURRICULUM_PHASE2.md` statuses
- [ ] T019 Full verify, screenshots at 360 and 390 px, independent review, fixes
- [ ] T020 Draft PR, `checks.md`, teacher fact list
