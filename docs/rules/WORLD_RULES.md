# World Domain Rules (Loka)

**Owning Module**: `src/domain/world/`  
**Owner**: Core Team + Social Studies Teacher Reviewer  
**Governing Invariant**: INV-1 (Single Domain Ownership)  
**Reference Sources**: [docs/product/CURRICULUM_PHASE2.md](../product/CURRICULUM_PHASE2.md), [docs/product/DEV_HANDOFF.md](../product/DEV_HANDOFF.md) §8.2, ADR-0002, ADR-0003

---

## 1. Domain Scope & Responsibilities
`src/domain/world/` owns models and rules for Class 5 Loka (History, Geography, and Civics).
It contains pure logic:
- **Historical Chronology (I2 `timeline`)**:
  - BCE / CE chronological numbering.
  - **Zero Year Prohibition**: There is NO year 0 in historical reckoning (1 BCE is directly followed by 1 CE).
  - Century calculation (e.g., 100 CE is 1st Century, 101 CE is 2nd Century, 1947 CE is 20th Century).
- **Earth, Sun, & Astronomy (E1 `earth`)**:
  - Planetary rotation producing diurnal day/night cycles (local solar hours from longitude/rotation angle).
  - Axial tilt ($23.5^\circ$) producing seasonal variation (Northern Hemisphere summer when tilted toward the Sun; winter when tilted away). Distance from Sun does NOT determine seasons.
- **Maps, Scales, & Directions (E4 `map`)**:
  - Cardinal and intermediate compass directions (North, South, East, West).
  - Grid coordinate navigation, collision/blocking obstacles, and pathfinding.
  - Linear scale factors converting grid unit steps into real-world distances ($d_{\text{real}} = \text{steps} \times \text{scale}$).
- **Feature 047 lessons** (one module per knot; each file's header states its rule):
  - I1 `sources`: kinds of historical source; a deeper layer of a dig is older.
  - Q1 `civics`: three levels of government (local, state, union) and which level does which job.
  - Q2 `citizenship`: every right is paired with the duty that keeps it working.
  - Q3 `pollution`: what each everyday cause dirties; green bin for wet waste, blue for dry.
  - E2 `spheres`: 71 of 100 parts of the surface are water; of 100 drops of water, 97 salt, 2 ice, 1 fresh.
  - E3 `landforms`: a landform is named by height and top together, never height alone.
  - C1 `states`: 28 states and 8 union territories with capital, main language and land neighbours on a schematic (not to scale) grid.
  - C2 `farming`: kharif sown June–July, rabi October–December, zaid March–April; out of season fails.
  - C3 `settlements`: water, flat land and trade routes together grow a city.
  - C4 `himalaya`: about 6.5 °C colder per 1,000 m climbed; Shivalik, Himachal, Himadri from the plains up.
  - C5 `plains`: floods spread silt layer on layer into a flat, fertile plain.
  - C6 `desert`: dry, not always hot; the Thar swings far more between day and night than the coast.
  - C7 `plateau`: the Deccan tilts east, so Godavari, Krishna, Kaveri reach the Bay of Bengal; Narmada and Tapi flow west in rift valleys.
  - C8 `rivers`: a river flows from high source to low mouth; snow-fed rivers flow all year, rain-fed ones fall low in the dry months.
  - C9 `unity`: 22 scheduled languages; Pongal, Lohri, Bihu and Uttarayan celebrate the same mid-January harvest.

---

## 2. Invariant Known Values
Every implementation of these world rules must pass the test cases in `DEV_HANDOFF.md` §8.2:

| Concept | Scenario | Expected Invariant |
|---|---|---|
| Historical interval | `yearsBetween(-250, 499)` | 748 years (accounting for no year 0) |
| Historical interval | `yearsBetween(-100, 100)` | 199 years |
| Historical interval | `yearsBetween(-50, 50)` | 99 years |
| Year zero assertion | `signed(0, ...)` | Throws error (no year zero) |
| Century mapping | 1947 CE, 100 CE, 101 CE | 20th century, 1st century, 2nd century |
| Solar hour | Earth rotation $0^\circ, 90^\circ, 180^\circ, 270^\circ$ | 12:00, 18:00, 00:00, 06:00 |
| Seasons | Tilt angle $5$ (June), $11$ (December) | Northern summer, Northern winter |
| Grid distance & blocking | Step count 9 at scale 5 | 45 real metres |
| Courtyard obstacle | Points $(4, 3)$, $(0, 0)$, $(8, 0)$ | Blocked: true, false, true |
| Gate-to-well walk | Path `[N, N, N, E, N, E, E, E, E]` | Ends at well; 9 squares traversed |
| States and UTs (047) | `STATE_COUNT`, `UT_COUNT` | 28, 8 |
| Cooling with height (047) | `PLAINS_TEMPERATURE` 32 °C, `COOLING_PER_KM` 6.5 | Freezing first reached at the 5,000 m step |
| Earth's water (047) | `WATER_DROPS` | 97 salt, 2 ice, 1 fresh (of 100) |
| Desert day (047) | `DAY_RANGE.thar.summer`, `.coast.summer` | 25–45 °C, 27–34 °C |
| Scheduled languages (047) | `SCHEDULED_LANGUAGES` | 22 |

---

## 3. Dependency Constraints
- May NOT import UI or DOM packages.
- May import `src/domain/math/index.ts` for pure mathematical calculations.
- May NOT import `src/domain/science/` or `src/domain/curriculum/`.
- All historical dates and geography models require review from a social-studies educator prior to Gate G1.
