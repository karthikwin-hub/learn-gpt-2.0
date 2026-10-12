# Feature Specification: 026 Rope and Pegs (Perimeter vs Area) (Knot G2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/026-rope-perimeter-area -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Rope and Pegs (Perimeter vs Area)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Shapes with the same perimeter must have the same area.

### 1.2 Pedagogical Solution in Gurukul
Feature 026 delivers a tactile 7-stage learning journey for Knot **G2 (Rope and Pegs (Perimeter vs Area))**:
- **Prashna (Opening Wonder)**: A 24-metre rope fences a vegetable garden. Does changing the shape of the rectangle change how much ground it holds?
  - Options:
  - A) No, 24 metres of rope always holds the same area
  - B) Yes, squarer shapes hold more ground (a square holds the most)
  - C) Yes, longer thin shapes hold more ground
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Perimeter is the boundary around a shape (the rope); area is the flat space inside (the ground).
2. **Idea (`idea`)**: Stretch a 24 m rope into a long, thin rectangle like 11 m by 1 m: it holds only 11 square metres.
3. **Why (`why`)**: Now pull the pegs wider: 10 by 2 gives 20 m², 8 by 4 gives 32 m², and a 6 by 6 square gives 36 m²!
4. **Example (`example`)**: Compare rectangles with perimeter 24 m: Step 1: 11 × 1 = 11 m²; Step 2: 8 × 4 = 32 m²; Step 3: 6 × 6 square = 36 m².
5. **Where (`where`)**: Fencing fields, packing boxes, house foundations, and building courtyard walls.
6. **Sutra (`sutra`)**: The same rope can hold different ground; the square holds the most.
- **Interactive Workbench (`#rope`)**:
  - Interactive rope loop canvas on coordinate grid with draggable corner peg constrained to constant perimeter ($w + h = P/2$). Real-time Area Hill histogram plotting tried dimensions. Presets for 24 m, 20 m, and 16 m ropes.
- **Spot the Mistake**:
  - Learner: Neha.
  - Claim: Claims that a 10 m by 2 m field and a 6 m by 6 m field have the same area because both use a 24 m fence.
  - Error: Step 2 (confusing boundary rope length with inner enclosed area).
  - Kumkum Focus: Enclosed grid tiles highlighted in kumkum to show 20 tiles vs 36 tiles.
  - Correction: Both have perimeter 24 m, but 10 × 2 = 20 m² while 6 × 6 = 36 m². The square holds 16 m² more ground!
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "The length of the boundary stays the same, but the inner ___ changes." (Tiles: ['area', 'perimeter', 'rope'], expected: `area`).
  - Cloze 2: "For any given perimeter, a ___ encloses the maximum amount of ground." (Tiles: ['square', 'rectangle', 'triangle'], expected: `square`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"The same rope can hold different ground; the square holds the most."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G2` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G2`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "A 24-metre rope fences a vegetable garden. Does changing the shape of the rectangle change how much ground it holds?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#rope`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Perimeter is the length of fence; area is the amount of ground inside. Shapes with the same perimeter can enclose completely different areas; a square holds the maximum area for a given perimeter (isoperimetric property).
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Neha's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `area` and `square`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
