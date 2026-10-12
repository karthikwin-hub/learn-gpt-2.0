# Feature Specification: 030 Circles: Centre, Radius, Diameter (Knot G6)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/030-circles -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Circles: Centre, Radius, Diameter**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Diameter is any straight line across a circle (ignoring the centre); radius varies depending on where you measure.

### 1.2 Pedagogical Solution in Gurukul
Feature 030 delivers a tactile 7-stage learning journey for Knot **G6 (Circles: Centre, Radius, Diameter)**:
- **Prashna (Opening Wonder)**: A bicycle wheel spoke goes straight from the centre axle to the outer rim and measures 30 cm. How wide is the wheel straight across through the centre?
  - Options:
  - A) 30 cm
  - B) 60 cm
  - C) 90 cm
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A circle is a round boundary where every single point is the exact same distance from the centre dot.
2. **Idea (`idea`)**: Tie a rope to a central peg and pull it taut: as you walk around, the stick traces a circle of radius r.
3. **Why (`why`)**: Diameter is two spokes stretched in a straight line passing through the centre: Diameter = 2 × Radius.
4. **Example (`example`)**: Step 1: Peg at centre, rope length 5 cm (Radius = 5 cm). Step 2: Line straight through centre reaches opposite rim: 5 + 5 = 10 cm (Diameter = 10 cm). Step 3: Any other line across (chord) is shorter than 10 cm.
5. **Where (`where`)**: Bullock cart wheels, coins, bangles, rotary dials, round wells, and circular tracks.
6. **Sutra (`sutra`)**: Every point on the rim is one radius away; through the centre, diameter is twice the radius.
- **Interactive Workbench (`#circle`)**:
  - Interactive circular compass canvas with draggable centre pin and outer rim pencil. Radius slider (2 cm to 10 cm) live updating boundary circumference. Ruler tool testing straight lines through centre vs non-central chords.
- **Spot the Mistake**:
  - Learner: Dev.
  - Claim: Draws a line near the top edge connecting two points on the rim and labels it 'Diameter = 8 cm' on a circle of radius 5 cm.
  - Error: Step 2 (omitting the centre point requirement).
  - Kumkum Focus: Non-central chord highlighted in kumkum with missing centre distance indicator.
  - Correction: A diameter must pass directly through the centre. The diameter of a 5 cm radius circle is 10 cm; an off-centre chord is shorter.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "The distance from the centre to any point on the rim is the ___." (Tiles: ['radius', 'diameter', 'chord'], expected: `radius`).
  - Cloze 2: "A straight line through the centre connecting opposite points is the diameter, which is ___ the radius." (Tiles: ['twice', 'half', 'equal to'], expected: `twice`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Every point on the rim is one radius away; through the centre, diameter is twice the radius."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G6` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G6`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "A bicycle wheel spoke goes straight from the centre axle to the outer rim and measures 30 cm. How wide is the wheel straight across through the centre?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#circle`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A circle is the set of all points at an equal distance (radius) from a fixed centre. The diameter is a straight line passing through the centre connecting two boundary points; it is exactly twice the radius ($d = 2r$). A chord not passing through the centre is shorter than the diameter.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Dev's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `radius` and `twice`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
