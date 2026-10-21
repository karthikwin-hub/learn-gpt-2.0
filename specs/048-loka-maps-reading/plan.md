# Plan: 048 Loka maps and chapters

## Map

| Part | File | Holds |
|---|---|---|
| Source data | `.agent/tmp/geo/` (not committed) | Survey of India Administrative Boundary Database OVSF/1M/7 (states); Natural Earth 10m river centrelines (public domain) |
| Generator | `scripts/geo/build_india_map.py` | Python standard library only: reads `.shp`/`.dbf`, keeps state polygons, projects (equirectangular scaled by cos 22°N), simplifies (Douglas–Peucker), writes TypeScript |
| Map data | `src/domain/world/geo/india-map.ts` (generated, do not edit) | `STATE_PATHS` keyed by `REGIONS` ids, `RIVER_PATHS`, frame size, `project(lat, lon)` |
| Zones and places | `src/domain/world/geo/zones.ts`, `places.ts` | hand-drawn approximate terrain zones (in lat/lon), named places with lat/lon |
| Drawing | `src/ui/diagrams/loka/india-map.ts` | `renderIndiaMap({ highlight, chosen, rivers, zones, places, caption, crop })`; attribution "Boundaries: Survey of India" |

The C1 and C9 benches keep their named buttons for tapping (small states and islands are too small to tap at 360 px); the map shows what was chosen. Map `aria-label`s keep the 047 wording so the 047 acceptance tests stay unchanged.

## Reading

| Part | File | Holds |
|---|---|---|
| Model | `src/domain/reading/types.ts`, `index.ts` | `Chapter`, `chapterFor(knot, lang)`, `availableIn(knot, lang)`, `wordCount(chapter)` |
| Content | `src/domain/reading/en/<knot>.ts` | the English chapter: sections (heading, paragraphs, figure id, Did you know?), words to know (glossary ids), activity, questions with answers |
| Figures | `src/ui/lesson-visuals/reading.ts` | figure id → SVG, reusing the lesson drawings and the map |
| Screen | `src/ui/components/screens/read.ts` (`#read?k=<knot>`) | renders a chapter; text size as Bodha; glossary bridge; Hear; Show answer |
| Entry | `shala.ts`, `bodha.ts`, `stop.ts`, `notebook.ts` | "Read the chapter" where `availableIn(knot, getLang())` |
| UI words | `src/domain/i18n/dictionaries/*-read.ts` | the screen's own labels, in all five languages |

Content is kept out of the UI dictionaries: those require all five languages, and the reading is English-only until a teacher approves it.

## Tests
- `india-map.test.ts`: 36 ids, non-empty paths inside the frame, neighbour boxes touch, places inside their state, rivers inside the outline.
- `reading.test.ts`: every Loka knot has an English chapter, at least 1,000 words, figures resolve, questions have answers, glossary ids exist, no praise words.
- `tests/acceptance/048-maps.spec.ts` (US1), `048-reading.spec.ts` (US2), sweep extension (US3).

## Order
Spec, ADR → data and generator (screenshot to the product owner) → map renderer in C1, C9 → map layers in C2–C8, E3 → reading framework → 18 chapters → verify, review, PR.
