# Progress: 048 Loka maps and chapters

Branch `feat/048-loka-maps-reading`, stacked on `feat/047-loka-lessons` (unmerged, draft PR #47).

## Done
- T001 spec, plan, tasks, ADR-0004.
- T005 reading model, `#read` screen, entry points (Shala, Bodha end, Stop, Pothi), UI words in five languages.
- T006–T011 all 18 English chapters, each at least 1,000 words, with pictures checked against their captions.
- US3-AS1 sweep: every chapter at 360 and 390 px (36 passing).
- T002, part: `scripts/geo/build_india_map.py` written (Lambert inverse verified by round trip; all 14 rivers matched in Natural Earth).

## Blocked
- T002 needs the Survey of India state boundaries (OVSF/1M/7). The download has a captcha, so the product owner saves the zip into `.agent/tmp/geo/`. T003, T004 and the map figures in the C chapters and E3 wait on it.

## Next action
Unzip the SoI data in `.agent/tmp/geo/soi/`, then run
`python3 scripts/geo/build_india_map.py --states <states .shp> --rivers .agent/tmp/geo/ne/ne_10m_rivers_lake_centerlines.shp`,
write `india-map.test.ts`, and screenshot the map for the product owner before using it anywhere.
