# Feature Specification: 038 Growing Patterns (Figurate & Triangular Numbers) (Knot P1)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/038-growing-patterns -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Krama strand), children explore **Growing Patterns (Figurate & Triangular Numbers)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Assuming all growing patterns increase by the same constant amount (confusing linear addition with quadratic growth).

### 1.2 Pedagogical Solution in Gurukul
Feature 038 delivers a tactile 7-stage learning journey for Knot **P1 (Growing Patterns (Figurate & Triangular Numbers))**:
- **Prashna (Opening Wonder)**: In a dot triangle, row 1 has 1 dot, row 2 has 2 dots, row 3 has 3 dots. How many total dots are in a 4-row triangle?
  - Options:
  - A) 7 dots
  - B) 10 dots (1 + 2 + 3 + 4)
  - C) 12 dots
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Growing patterns are shapes made of dots or tiles that expand stage by stage according to a geometric rule.
2. **Idea (`idea`)**: In a dot triangle, each new stage adds a whole new bottom row: stage 1 has 1; stage 2 adds 2 (total 3); stage 3 adds 3 (total 6).
3. **Why (`why`)**: Square patterns grow by adding an L-shaped border around the previous square: 1, 4, 9, 16, 25 (each stage n has n × n dots).
4. **Example (`example`)**: Step 1: Stage 1 = 1 dot. Step 2: Stage 2 = 1 + 2 = 3 dots. Step 3: Stage 3 = 1 + 2 + 3 = 6 dots. Stage 4 = 1 + 2 + 3 + 4 = 10 dots.
5. **Where (`where`)**: Kolam border expansions, staircases, brick pyramid construction, and pinecones.
6. **Sutra (`sutra`)**: Each new stage adds a new layer; see how the shape grows to find the count.
- **Interactive Workbench (`#growing`)**:
  - Figurate pattern simulator for Dot Triangles and Square Grids. Stage stepper (1 to 6) highlighting newly added outer layer in glowing teal. Data growth table tracking Stage, Added Layer, and Total Count.
- **Spot the Mistake**:
  - Learner: Amit.
  - Claim: Predicts that Stage 5 of a square tile pattern will have 10 tiles, calculating 5 × 2.
  - Error: Step 2 (multiplying by 2 instead of squaring n × n).
  - Kumkum Focus: Linear perimeter approximation highlighted in kumkum vs full 5x5 tile grid.
  - Correction: A square of side 5 contains 5 rows of 5 tiles = 5 × 5 = 25 tiles, not 10.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "In a growing pattern, each stage adds a new ___ of tiles or dots." (Tiles: ['layer', 'border', 'corner'], expected: `layer`).
  - Cloze 2: "A square pattern of side length four contains ___ total tiles." (Tiles: ['sixteen', 'eight', 'twelve'], expected: `sixteen`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Each new stage adds a new layer; see how the shape grows to find the count."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `P1` on the `krama` thread appears as an active playable knot and navigates to `/#/prashna?k=P1`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "In a dot triangle, row 1 has 1 dot, row 2 has 2 dots, row 3 has 3 dots. How many total dots are in a 4-row triangle?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#growing`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Growing patterns expand in geometric stages. Triangular numbers (1, 3, 6, 10) add row $n$ at stage $n$. Square numbers (1, 4, 9, 16) add an L-shaped gnomon of $2n-1$ dots. Visualizing geometric growth connects spatial layout to quadratic arithmetic.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Amit's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `layer` and `sixteen`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
