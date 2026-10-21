# Progress: 048 Loka maps and chapters

Branch `feat/048-loka-maps-reading`, stacked on `feat/047-loka-lessons` (unmerged, draft PR #47).

## Done
- T001 spec, plan, tasks, ADR-0004 (accepted: the product owner approved the map).
- T002 `scripts/geo/build_india_map.py` generates `src/domain/world/geo/india-map.ts` from the Survey of India `STATE_BOUNDARY.shp` (in `docs/Map_India/`, git-ignored) and Natural Earth rivers. 28 states, 8 UTs, 4 disputed areas drawn neutral.
- T003 `renderIndiaMap` in the C1 and C9 benches and pictures; 047 US7-AS1 updated with approval.
- T004 places, approximate zones, locator insets on the C4 climb and the C7 cross-section; "where" cards of C3–C8 and E3 and every chapter's "On the map of India" section show the real map.
- T005 reading model, `#read` screen, entry points.
- T006–T011 all 18 English chapters, each at least 1,000 words.
- T012 full verify 12/12; reviewer findings fixed; screenshots read by eye.
- T013 `checks.md` with the teacher fact list.

## Open (needs people)
- Native-speaker review of the hi/te/bn/ta map words (Telugu first).
- Teacher sign-off on the fact list in `checks.md`.
- Chapters in hi/te/bn/ta (the "Read the chapter" entry stays hidden in those languages until they exist).

## Next action
Product owner reviews the draft PR; to rebuild the map after new Survey of India data, run
`python3 scripts/geo/build_india_map.py --states docs/Map_India/91/STATE_BOUNDARY.shp --rivers .agent/tmp/geo/ne/ne_10m_rivers_lake_centerlines.shp`.
