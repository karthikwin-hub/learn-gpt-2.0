# Feature Specification: 012 Loka (Social Studies) Shala — Thread of Time, Spin and Travel, Courtyard from Above

## 1. Context & Motivation
In elementary school (Class 5), children frequently develop deep conceptual misconceptions in social studies:
1. **Historical Chronology**: Counting across the BCE/CE join as if year zero existed (e.g. reckoning 50 BCE to 50 CE as 100 years instead of 99), or thinking 300 BCE is more recent than 200 BCE.
2. **Earth & Astronomy**: Believing summer happens because the Earth is closer to the Sun (in reality, Earth is closest in early January), or that day/night results from the Sun moving around the Earth.
3. **Maps & Geography**: Adding a map's scale rather than multiplying by it (e.g. 3 grid squares at 10 m/square reckoned as 13 m instead of 30 m), or struggling with cardinal direction navigation and top-down map projections.

Feature 012 delivers the pure domain models, lesson engines, interactive SVG workbenches, and calm pedagogical workflows for the three core Class 5 Loka knots:
- **I2 (`#timeline`)**: Thread of time (calendars, historical intervals, zero-year prohibition, centuries, 6 historical anchor events).
- **E1 (`#earth`)**: Spin and travel (Earth 24h rotation, local solar hours, day/night division, 23.5° axial tilt, orbit seasons).
- **E4 (`#map`)**: Courtyard from above (top-down map projection, cardinal directions N/E/S/W, obstacle blocking, linear scale conversion).

---

## 2. User Stories & Acceptance Criteria

### User Story 1: Thread of Time (I2)
As a Class 5 child, I want to explore historical time on an unrolling thread so that I understand BCE/CE chronology, centuries, and that there is no year zero.
- **US1-AS1 (Unroll Thread)**: On step 1, tapping "Unroll the thread" animates the number line from 3000 BCE to 2000 CE showing the knot join at 1 BCE | 1 CE with no year zero.
- **US1-AS2 (Hang Events Chronologically)**: On step 2, 6 historical events (Mohenjo-daro, Ashoka’s edicts, Aryabhatiya, Taj Mahal, Independence, Chandrayaan-3) must be hung oldest first. Tapping out of order produces a gentle hint.
- **US1-AS3 (Zero-Year Prohibition Calculation)**: On step 3, counting years between Ashoka’s edicts (250 BCE) and Aryabhata (499 CE) requires answering 748 ($249 + 1 + 498$). Selecting 749 gives feedback that year zero was erroneously counted.

### User Story 2: Spin and Travel (E1)
As a Class 5 child, I want to spin the Earth and carry it in orbit so that I see why we have day and night and how axial tilt produces seasons.
- **US2-AS1 (Day and Night Rotation)**: Viewing the North Pole from above, turning the Earth rotates India through sunlight and night shading. The local solar hour updates ($0^\circ \to 12:00$, $90^\circ \to 18:00$, $180^\circ \to 00:00$, $270^\circ \to 06:00$).
- **US2-AS2 (Night Target)**: On step 2, turning the Earth until India reaches the night half advances to the orbit step.
- **US2-AS3 (Axial Tilt Seasons)**: On step 3, selecting December moves the Earth in its orbit showing the tilted axis pointing away from the Sun in the northern hemisphere, confirming winter is caused by tilt rather than distance.

### User Story 3: Courtyard from Above (E4)
As a Class 5 child, I want to flatten the Ashram courtyard into a map and navigate from gate to well so that I understand top views, cardinal directions, and map scales.
- **US3-AS1 (Perspective Flattening)**: On step 1, tapping "Look from above" flattens the oblique courtyard into a true top-down grid showing legend symbols and scale ($1\text{ square} = 5\text{ m}$).
- **US3-AS2 (Grid Walking & Obstacle Blocking)**: On step 2, directional buttons (N, E, S, W) step the child across the $8 \times 6$ courtyard grid. Moving into boundary walls or the house ($[4,3], [5,3], [4,4], [5,4]$) is blocked with clear feedback.
- **US3-AS3 (Scale Multiplication)**: On step 3, reaching the well (e.g. 9 squares) asks for real distance. Selecting $9 + 5 = 14\text{ m}$ gives feedback that scale was added; selecting $9 \times 5 = 45\text{ m}$ is accepted.

### User Story 4: Complete Lesson Flow
As a learner, I can progress through Prashna, Bodha cards, Living Film / Workbench, Spot the Mistake, and Explain Back for knots I2, E1, and E4 with zero scores, timers, or praise words.

---

## 3. Invariants & Rules
- **No Year Zero**: Function `signed(0, era)` throws an error. Function `yearsBetween(a, b)` accounts for the missing year 0 when spanning negative and positive years ($|b - a| - 1$ when signs differ).
- **Centuries**: `centuryCE(100) = 1`, `centuryCE(101) = 2`, `centuryCE(1947) = 20`.
- **Axial Tilt Invariant**: Seasons depend strictly on axial tilt angle relative to solar incidence, not orbital distance.
- **Scale Invariant**: Map real distance is strictly `squares * scale`, never addition.
- **Zero Dependencies**: Pure SVG/TypeScript, zero external runtime packages.
