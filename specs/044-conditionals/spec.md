# Feature Specification: 044 If This, Then That (Conditionals & Converse Fallacy) (Knot L3)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/044-conditionals -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Tarka strand), children explore **If This, Then That (Conditionals & Converse Fallacy)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Assuming 'If P then Q' means 'If Q then P' (e.g. 'If it rains, the grass is wet' implies 'If the grass is wet, it rained').

### 1.2 Pedagogical Solution in Gurukul
Feature 044 delivers a tactile 7-stage learning journey for Knot **L3 (If This, Then That (Conditionals & Converse Fallacy))**:
- **Prashna (Opening Wonder)**: Statement: 'If an animal is a dog, it has 4 legs.' If you see an animal with 4 legs, is it definitely a dog?
  - Options:
  - A) Yes, all 4-legged animals are dogs
  - B) No, it could be a cat, cow, or tiger
  - C) Only if it barks
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A conditional statement connects a cause to an effect: 'IF this happens, THEN that follows.'
2. **Idea (`idea`)**: Direction matters! If A happens, B is guaranteed. But B can happen for completely different reasons!
3. **Why (`why`)**: Think of nested rings: 'Dogs' is a small ring inside the giant ring of 'Four-legged animals.'
4. **Example (`example`)**: Statement: 'If a number is divisible by 10, it ends in 0.' True! Reverse: 'If it ends in 0, it is divisible by 100.' False! (70 ends in 0 but doesn't divide by 100).
5. **Where (`where`)**: Game rules ('If you roll a 6, you roll again'), doctor advice, and science experiments.
6. **Sutra (`sutra`)**: If A then B tells the forward direction; turning it backwards is not always true.
- **Interactive Workbench (`#conditional`)**:
  - Implication machine with cause and effect card slots. Nested concentric Venn visualizer showing P contained inside Q. Counterexample carousel testing whether reversing the statement holds or fails.
- **Spot the Mistake**:
  - Learner: Farhan.
  - Claim: Argues: 'If a shape is a square, it has 4 sides. Therefore, any 4-sided shape must be a square.'
  - Error: Step 2 (committing the converse fallacy).
  - Kumkum Focus: Non-square 4-sided shapes (rectangle, trapezoid, kite) highlighted in kumkum inside outer ring.
  - Correction: Having 4 sides does not guarantee being a square. Rectangles and kites also have 4 sides.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "A conditional statement tells what happens in the ___ direction." (Tiles: ['forward', 'reverse', 'opposite'], expected: `forward`).
  - Cloze 2: "Reversing an 'If A then B' statement is ___ automatically true." (Tiles: ['not', 'always', 'certainly'], expected: `not`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"If A then B tells the forward direction; turning it backwards is not always true."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `L3` on the `tarka` thread appears as an active playable knot and navigates to `/#/prashna?k=L3`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "Statement: 'If an animal is a dog, it has 4 legs.' If you see an animal with 4 legs, is it definitely a dog?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#conditional`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A conditional statement asserts that premise P implies conclusion Q ($P \implies Q$). Reversing the statement to form the converse ($Q \implies P$) is not automatically valid (the converse fallacy). Visualized as nested sets (P is a subset of Q).
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Farhan's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `forward` and `not`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
