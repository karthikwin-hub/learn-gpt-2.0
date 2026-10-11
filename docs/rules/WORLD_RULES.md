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

---

## 3. Dependency Constraints
- May NOT import UI or DOM packages.
- May import `src/domain/math/index.ts` for pure mathematical calculations.
- May NOT import `src/domain/science/` or `src/domain/curriculum/`.
- All historical dates and geography models require review from a social-studies educator prior to Gate G1.
