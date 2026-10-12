# Feature Specification: 043 Marble Gates (Boolean Logic: AND, OR, NOT) (Knot L2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/043-logic-gates -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Tarka strand), children explore **Marble Gates (Boolean Logic: AND, OR, NOT)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Exclusive OR confusion (believing OR means only one input can be ON); thinking NOT leaves false unchanged.

### 1.2 Pedagogical Solution in Gurukul
Feature 043 delivers a tactile 7-stage learning journey for Knot **L2 (Marble Gates (Boolean Logic: AND, OR, NOT))**:
- **Prashna (Opening Wonder)**: In a track with an AND gate, Switch A is OPEN and Switch B is CLOSED. Can a marble roll all the way through?
  - Options:
  - A) Yes, because Switch A is open
  - B) No, because an AND gate requires BOTH switches to be open
  - C) It depends on marble speed
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Logic gates are decision points that allow or block paths based on truth rules: AND, OR, NOT.
2. **Idea (`idea`)**: AND is like two switches in a row (series): BOTH must be open for electricity or a marble to pass.
3. **Why (`why`)**: OR is like two parallel tracks: if EITHER path is open (or both!), the marble passes freely.
4. **Example (`example`)**: NOT gate flips truth: if input is ON, output is OFF; if input is OFF, output is ON!
5. **Where (`where`)**: Light switches on staircases, search engines, railway signals, and computer microchips.
6. **Sutra (`sutra`)**: AND needs both; OR needs at least one; NOT flips the answer.
- **Interactive Workbench (`#logic`)**:
  - Marble machine canvas with draggable physical switches A & B. Gate swap selector (AND gate, OR gate, NOT inverter). 'Drop Marble' physics simulation tracing path down rails. Live truth table recording test rows.
- **Spot the Mistake**:
  - Learner: Sneha.
  - Claim: Claims that in an OR gate, if BOTH switches are ON, the path will block the marble because 'OR means only one'.
  - Error: Step 2 (confusing inclusive OR with exclusive choice).
  - Kumkum Focus: Parallel tracks both open with blocked symbol highlighted in kumkum.
  - Correction: In mathematics and logic, OR is inclusive: it is true if A is true, B is true, OR BOTH are true.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "An AND gate allows a marble to pass only when ___ switches are on." (Tiles: ['both', 'one', 'neither'], expected: `both`).
  - Cloze 2: "An OR gate allows a marble to pass if at least ___ switch is on." (Tiles: ['one', 'both', 'neither'], expected: `one`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"AND needs both; OR needs at least one; NOT flips the answer."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `L2` on the `tarka` thread appears as an active playable knot and navigates to `/#/prashna?k=L2`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "In a track with an AND gate, Switch A is OPEN and Switch B is CLOSED. Can a marble roll all the way through?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#logic`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Boolean operators control pathways based on truth values: AND requires both inputs ON (series connection); OR requires at least one input ON (parallel connection); NOT inverts the input. Physical marble tracks demonstrate truth tables.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Sneha's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `both` and `one`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
