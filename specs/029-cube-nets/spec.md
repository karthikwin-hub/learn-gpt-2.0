# Feature Specification: 029 Fold a Box (Cube Nets & Spatial Visualization) (Knot G5)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/029-cube-nets -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Fold a Box (Cube Nets & Spatial Visualization)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Any arrangement of 6 connected squares will fold into a cube.

### 1.2 Pedagogical Solution in Gurukul
Feature 029 delivers a tactile 7-stage learning journey for Knot **G5 (Fold a Box (Cube Nets & Spatial Visualization))**:
- **Prashna (Opening Wonder)**: If you connect 6 squares in a 2 by 3 solid rectangle, will it fold into a closed cube box?
  - Options:
  - A) Yes, because it has 6 square faces
  - B) No, because faces will overlap and leave holes
  - C) Only if you cut some squares
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A net is a flat pattern of connected faces that folds into a 3D solid box.
2. **Idea (`idea`)**: A cube has 6 identical square faces. When unfolded, they must stay joined at fold lines.
3. **Why (`why`)**: Not all 6-square shapes work! If faces collide during folding, they overlap and leave opposite sides open.
4. **Example (`example`)**: Step 1: The classic 'T' net (4 in a column with 2 wings). Step 2: Fold each wing 90°. Step 3: All 6 faces meet at 90° edges with zero overlap.
5. **Where (`where`)**: Sweet boxes, cardboard carton manufacturing, dice, and origami packaging.
6. **Sutra (`sutra`)**: Six squares must fold without collision to close all six faces of a cube.
- **Interactive Workbench (`#cubenet`)**:
  - 2D grid editor where child can toggle/drag 6 squares into hexomino shapes. 'Fold 3D' scrubber slider (0° flat to 90° closed cube) rendering 3D isometric box. Collision detector highlighting overlapping faces in Kumkum.
- **Spot the Mistake**:
  - Learner: Priya.
  - Claim: Draws a 2 × 3 block of 6 squares and claims it folds into a cube because 2 × 3 = 6.
  - Error: Step 1 (assuming face count alone ensures foldability).
  - Kumkum Focus: Overlapping faces in 2x3 grid highlighted in kumkum during fold animation.
  - Correction: In a 2 × 3 grid, faces fold onto the same sides, overlapping and leaving two faces completely unclosed.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "A cube has ___ square faces that must meet at right angles." (Tiles: ['six', 'eight', 'four'], expected: `six`).
  - Cloze 2: "For a flat net to close into a cube, no two faces can ___ during folding." (Tiles: ['overlap', 'touch', 'separate'], expected: `overlap`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Six squares must fold without collision to close all six faces of a cube."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G5` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G5`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "If you connect 6 squares in a 2 by 3 solid rectangle, will it fold into a closed cube box?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#cubenet`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A cube net is a flat arrangement of 6 connected squares that can fold along edges into a closed 3D cube without face collisions or empty gaps. Exactly 11 unique hexomino nets form a cube.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Priya's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `six` and `overlap`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
