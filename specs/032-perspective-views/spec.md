# Feature Specification: 032 Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8) (Knot G8)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/032-perspective-views -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: A 3D object looks identical from all directions, or front view reveals hidden depths.

### 1.2 Pedagogical Solution in Gurukul
Feature 032 delivers a tactile 7-stage learning journey for Knot **G8 (Views from Above (Top, Front, Side Views & Jaal E4 ↔ G8))**:
- **Prashna (Opening Wonder)**: Looking straight down from the ceiling at a round water cup, what 2D shape do you see?
  - Options:
  - A) A rectangle
  - B) A circle
  - C) A triangle
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Every 3D object looks like different 2D shapes when viewed from different angles: Top, Front, and Side.
2. **Idea (`idea`)**: A top view looks straight down from above: it shows ground layout and width/depth, like a map!
3. **Why (`why`)**: A front view shows width and height, but hides what lies behind. We need multiple views to describe a 3D structure.
4. **Example (`example`)**: Step 1: 3-step staircase. Step 2: Front view shows ascending steps. Step 3: Top view looks like 3 flat rectangles side by side.
5. **Where (`where`)**: Architectural blueprints, maps, shadows cast by sunlight, and vehicle design.
6. **Sutra (`sutra`)**: A top view sees the ground; a front view sees the height; together they describe the whole 3D shape.
- **Interactive Workbench (`#views`)**:
  - 3D block courtyard builder with 3 dynamic orthographic viewports (Top, Front, Side) updating synchronously as child adds or removes blocks on isometric grid. Jaal crossing toggle connecting Top View to Map (E4).
- **Spot the Mistake**:
  - Learner: Kabir.
  - Claim: Draws the top view of a 3-step block staircase with step profiles, claiming you can see the step drops from straight above.
  - Error: Step 2 (mixing elevation height into overhead orthogonal projection).
  - Kumkum Focus: Perspective depth lines in top view highlighted in kumkum to show projection error.
  - Correction: Looking straight down from above collapses vertical drops: you only see a flat row of squares.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "A top view looks straight down from above and shows the shape like a ___." (Tiles: ['map', 'shadow', 'mirror'], expected: `map`).
  - Cloze 2: "A front view shows width and ___, but hides the depth behind." (Tiles: ['height', 'perimeter', 'weight'], expected: `height`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"A top view sees the ground; a front view sees the height; together they describe the whole 3D shape."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G8` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G8`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "Looking straight down from the ceiling at a round water cup, what 2D shape do you see?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#views`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: 3D objects project distinct 2D orthographic silhouettes depending on vantage point: Top view (plan / bird's eye), Front view (elevation), and Side view (profile). A top view connects geometry with maps (Jaal link E4 ↔ G8).
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Kabir's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `map` and `height`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
