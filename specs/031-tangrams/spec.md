# Feature Specification: 031 Tangrams (Geometric Dissection & Area Conservation) (Knot G7)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/031-tangrams -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Tangrams (Geometric Dissection & Area Conservation)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Rearranging shapes changes the total area; tall silhouettes contain more area than compact squares.

### 1.2 Pedagogical Solution in Gurukul
Feature 031 delivers a tactile 7-stage learning journey for Knot **G7 (Tangrams (Geometric Dissection & Area Conservation))**:
- **Prashna (Opening Wonder)**: You rearrange all 7 wooden tangram pieces from a square into a tall candle. Does the total wood area change?
  - Options:
  - A) Yes, the candle is taller so it has more area
  - B) No, rearranging pieces leaves total area exactly unchanged
  - C) Yes, the candle has less area because it is narrower
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A tangram is an ancient 7-piece puzzle created by cutting a single large square into geometric tiles.
2. **Idea (`idea`)**: The 7 pieces: 2 large triangles, 1 medium triangle, 2 small triangles, 1 square, 1 parallelogram.
3. **Why (`why`)**: Pieces can combine into other pieces: two small triangles make the square, the parallelogram, or the medium triangle!
4. **Example (`example`)**: Step 1: All 7 pieces form a 10×10 square (Area = 100). Step 2: Rearrange into a boat. Step 3: Total area is still 100 square units.
5. **Where (`where`)**: Floor tile layouts, carpentry joints, origami, and mosaic paving.
6. **Sutra (`sutra`)**: Rearranging shapes changes the outline, but the total area stays exactly the same.
- **Interactive Workbench (`#tangram`)**:
  - 7-piece tactile wooden felt mat. Draggable and rotatable pieces with snap-to-grid. Target silhouette guides (Square, Candle, Boat, Swan). Area balance inspector showing equal piece decomposition.
- **Spot the Mistake**:
  - Learner: Meera.
  - Claim: Claims the tangram swan has greater area than the tangram square because the neck reaches much higher.
  - Error: Step 2 (confusing maximum height with total enclosed area).
  - Kumkum Focus: Swan height bounding box highlighted in kumkum vs constant sum of 7 pieces.
  - Correction: Height does not determine area. Both silhouettes use the exact same 7 pieces, so their areas are identical.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "When pieces are rearranged into a new silhouette, the total area remains ___." (Tiles: ['unchanged', 'larger', 'smaller'], expected: `unchanged`).
  - Cloze 2: "Two small tangram triangles can be joined to form the medium triangle, the parallelogram, or the ___." (Tiles: ['square', 'circle', 'hexagon'], expected: `square`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Rearranging shapes changes the outline, but the total area stays exactly the same."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G7` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G7`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "You rearrange all 7 wooden tangram pieces from a square into a tall candle. Does the total wood area change?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#tangram`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A 7-piece tangram dissects a square into 5 triangles, 1 square, and 1 parallelogram. Rearranging pieces creates different silhouettes while total surface area remains strictly invariant.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Meera's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `unchanged` and `square`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
