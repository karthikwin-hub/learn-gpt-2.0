# ADR-0004: Map of India from Survey of India boundary data

- **Status**: Proposed
- **Date**: 2026-10-21 · **Deciders**: product owner · **Related**: specs/048-loka-maps-reading, specs/047-loka-lessons

## Context
The Loka chapters on India (C1–C9) drew India as a grid of squares, because 047 decided not to trace a political outline. The product owner asked for a real map. A published map of India must show the external boundary as the Survey of India does, including all of Jammu and Kashmir, Ladakh and Arunachal Pradesh. Many free datasets do not, or are out of date (before the 2019 Ladakh and 2020 Dadra and Nagar Haveli and Daman and Diu changes). The app has no GIS library and no new runtime dependency may be added.

## Options considered
1. **Survey of India Administrative Boundary Database (OVSF/1M/7)**: official boundary; ₹0 for all users; the National Geospatial Guidelines say Survey of India political boundaries are the standard and their digital display and printing is permitted. Download is behind a captcha, so a person fetches it. Cost to reverse: delete one generated file.
2. **Community datasets (DataMeet)**: easy to download, CC BY / CC BY-SA, but the state layer is out of date and not guaranteed to follow the official boundary.
3. **Hand-drawn outline**: no outside data, but shapes are inaccurate and the external boundary cannot be guaranteed.
4. **Keep the grid**: rejected by the product owner.

## Decision
Use option 1 for state and external boundaries, simplified once by a standard-library Python script (`scripts/geo/build_india_map.py`) into `src/domain/world/geo/india-map.ts`. Rivers come from Natural Earth 10m river centrelines (public domain). Terrain zones (Himalaya, plains, Thar, Deccan, Ghats) are drawn by hand and labelled approximate. The boundary is never edited by hand.

## Consequences
- Positive: a recognisable, official map in every India chapter; no runtime dependency; small generated file.
- Risks: simplification can make tiny states and islands hard to see; benches keep named buttons for choosing. The source zip is not committed; the generator records its source name and date in the output header.
- The source (`STATE_BOUNDARY`, data modified 2025-10-16) has 28 states and 8 union territories, plus four areas it marks as disputed between states (Madhya Pradesh–Gujarat, Madhya Pradesh–Rajasthan, Rajasthan–Gujarat, West Bengal–Bihar–Jharkhand). They are drawn as their own neutral layer inside India and given to no state. The source files sit in `docs/Map_India/` (git-ignored).
- Follow-ups: every map shows "Boundaries: Survey of India"; `india-map.test.ts` checks 36 regions, frame bounds and neighbour contact.
