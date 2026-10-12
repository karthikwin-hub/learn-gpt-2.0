# Feature Specification: 045 Multiplication Foundations: Equal Groups & Commutative Rotation (Knot M1, M3)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/045-multiplication-foundations -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Ganana strand), children explore **Multiplication Foundations: Equal Groups & Commutative Rotation**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Multiplying allows unequal groups; $3 \times 8$ and $8 \times 3$ are unrelated isolated facts to memorise separately.

### 1.2 Pedagogical Solution in Gurukul
Feature 045 delivers a tactile 7-stage learning journey for Knot **M1, M3 (Multiplication Foundations: Equal Groups & Commutative Rotation)**:
- **Prashna (Opening Wonder)**: You have 3 baskets with 8 apples each, and your friend has 8 baskets with 3 apples each. Who has more apples?
  - Options:
  - A) You have more
  - B) Your friend has more
  - C) Both have the exact same total (24 apples)
  - Correct: Choice C.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Multiplication means putting together equal groups: 4 bunches of 5 coconuts each.
2. **Idea (`idea`)**: Line the bunches up into straight rows and columns: an array forms! 4 rows of 5 is written 4 × 5.
3. **Why (`why`)**: Now spin the rectangle 90°: 4 rows of 5 turns into 5 rows of 4! No squares were added or removed.
4. **Example (`example`)**: Step 1: Build 3 rows of 8 (3 × 8 = 24). Step 2: Rotate 90°. Step 3: It becomes 8 rows of 3 (8 × 3 = 24). Commutativity!
5. **Where (`where`)**: Egg cartons, pill blister packs, window panes, and planting orchard trees.
6. **Sutra (`sutra`)**: Turning the rectangle doesn't change the squares: rows times columns is the same both ways.
- **Interactive Workbench (`#rect`)**:
  - Array canvas grouping loose coconut bunches into rectangular arrays. Rotate button spinning array 90° to demonstrate commutative symmetry. Grid multiplier table highlighting mirror symmetry across diagonal.
- **Spot the Mistake**:
  - Learner: Varun.
  - Claim: Believes that knowing 8 × 3 = 24 does not help with 3 × 8, calculating 3 × 8 = 38.
  - Error: Step 2 (failing to recognize commutative rotation invariance).
  - Kumkum Focus: Array rotation animation highlighted in kumkum to show 24 squares unchanged.
  - Correction: Rotating 8 × 3 by a quarter turn creates 3 × 8 with the exact same 24 squares. a × b always equals b × a.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "Multiplication means combining equal groups into rows and ___." (Tiles: ['columns', 'diagonals', 'circles'], expected: `columns`).
  - Cloze 2: "Rotating a rectangular array by ninety degrees proves that a × b is ___ b × a." (Tiles: ['equal to', 'greater than', 'less than'], expected: `equal to`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Turning the rectangle doesn't change the squares: rows times columns is the same both ways."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `M1, M3` on the `ganana` thread appears as an active playable knot and navigates to `/#/prashna?k=M1`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "You have 3 baskets with 8 apples each, and your friend has 8 baskets with 3 apples each. Who has more apples?" and accepts choice "C".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#rect`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Multiplication represents equal groups arranged into rows and columns (arrays). Rotating an array by 90° changes rows into columns while total unit count remains invariant, proving commutativity ($a \times b = b \times a$). Closes foundational Ganana knots M1 and M3.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Varun's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `columns` and `equal to`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
