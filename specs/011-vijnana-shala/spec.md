# Feature Specification: 011 Vijnana (Science) Shala — Body, Light, Motion & Living Systems

Feature Branch: `feat/011-vijnana-shala`

## 1. Context & Motivation
Following mathematics foundations (003 to 010), Feature 011 brings the **Vijnana (Science) Shala** alive with conceptual, tactile inquiry models designed specifically for 10-year-olds:
1. **B3 Digestion Journey (`#digest`)**: The complete human digestive tract sequence (Mouth $\to$ Food Pipe $\to$ Stomach $\to$ Small Intestine $\to$ Large Intestine), peristalsis food bolus movement, and nutrient absorption in the small intestine.
2. **R1 Shadow & Sundial (`#shadow` / `#sundial`)**: Light geometry showing shadow formation on the side opposite the light source, calculation of shadow length $\frac{h \times d}{L - h}$, sun altitude angle variation, and opaque/translucent/transparent material comparisons.
3. **K2 Ramp & Friction (`#ramp`)**: Controlled fair testing principles where only one variable changes (the surface floor), demonstrating rolling distances on Tile ($6.0\text{ m}$), Wood ($3.8\text{ m}$), Rug ($1.9\text{ m}$), and Sand ($1.2\text{ m}$).
4. **J2 Seed Germination (`#seed`)**: Seed anatomy (seed coat, cotyledon food store, embryo radicle, plumule) and living system requirements (water, air, warmth).
5. **K1 Two-Pan Balance (`#balance`)**: Equilibrium and mass comparison where beam dips towards the heavier pan with tare zeroing.

---

## 2. User Stories & Acceptance Scenarios

### User Story 1: Digestion Journey (B3)
Children trace a bite of food along the digestive system and discover nutrient absorption.

- **US1-AS1**: Digestion screen `#digest` renders the five organ stops in order: Mouth, Food Pipe, Stomach, Small Intestine, Large Intestine.
- **US1-AS2**: Tapping the stops in sequence moves the food bolus along the tract and describes each organ's function without sound effects or timers.
- **US1-AS3**: Screen highlights the Small Intestine as the primary organ where nutrients pass into the blood, and the Large Intestine where water is recovered.

### User Story 2: Light & Shadows / Sundial (R1)
Children explore straight-line light propagation and shadow length geometry.

- **US2-AS1**: Shadow screen `#shadow` renders a lamp/sun light source, a vertical stick, and the resulting ground shadow.
- **US2-AS2**: Raising the lamp or increasing sun elevation angle shortens the shadow; lowering the light lengthens the shadow according to $\frac{h \times d}{L - h}$.
- **US2-AS3**: Selecting different materials (cardboard, wax paper, glass) adjusts shadow opacity from dark opaque to faint translucent to none.

### User Story 3: Ramp & Friction Fair Test (K2)
Children conduct scientific fair testing on rolling cars.

- **US3-AS1**: Ramp screen `#ramp` renders a ramp with adjustable surface textures: Tile, Wood, Rug, Sand.
- **US3-AS2**: Releasing the car rolls it to exact model distances: Tile (6.0m) > Wood (3.8m) > Rug (1.9m) > Sand (1.2m).
- **US3-AS3**: Fair test validator ensures only one variable is changed at a time to teach rigorous scientific method.

### User Story 4: Seed Germination & Living Systems (J2)
Children examine seed anatomy and environmental germination triggers.

- **US4-AS1**: Seed screen `#seed` displays seed coat, cotyledon, radicle, and plumule layers.
- **US4-AS2**: Adjusting moisture, air, and warmth sliders triggers sprout growth when all essential conditions are met.

### User Story 5: Two-Pan Balance (K1)
Children compare masses on a balanced beam.

- **US5-AS1**: Balance screen `#balance` renders two pans on a central pivot with tare adjustment.
- **US5-AS2**: Placing weights on left or right pan causes the heavier side to dip smoothly; equal weights restore horizontal equilibrium.

### User Story 6: Shell Integration & Calm Invariants
Workbenches adhere strictly to calm UX and localization standards.

- **US6-AS1**: Accessible stage bar is present across all science screens with return navigation.
- **US6-AS2**: Zero gamification: no star counters, score badges, streaks, countdowns, or praise words across all five workbenches.
- **US6-AS3**: Full multilingual rendering in English, Hindi, Telugu, Tamil, and Bengali without unrendered tokens.

---

## 3. Functional Requirements
- **FR-001**: Pure domain `src/domain/science/digest.ts` models organ tract sequence and nutrient absorption distribution.
- **FR-002**: Pure domain `src/domain/science/shadow.ts` calculates shadow geometry $\frac{h \times d}{L - h}$ and material transparency.
- **FR-003**: Pure domain `src/domain/science/ramp.ts` verifies fair test parameters and computes friction roll distances.
- **FR-004**: Pure domain `src/domain/science/seed.ts` models seed anatomy and germination condition verification.
- **FR-005**: Pure domain `src/domain/science/balance.ts` calculates beam tilt angle and equilibrium state.
