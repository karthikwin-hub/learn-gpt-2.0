# Feature Specification: 036 Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2) (Knot H2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/036-bar-graphs -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Ankana strand), children explore **Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Reading bar height as grid line index regardless of scale (e.g. reading line 4 as 4 when the scale increments by 10s).

### 1.2 Pedagogical Solution in Gurukul
Feature 036 delivers a tactile 7-stage learning journey for Knot **H2 (Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2))**:
- **Prashna (Opening Wonder)**: A bar reaches line 4 on an axis marked in steps of 10 (0, 10, 20, 30, 40). What value does the bar represent?
  - Options:
  - A) 4
  - B) 14
  - C) 40
  - Correct: Choice C.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A bar graph uses rectangles of equal width to compare amounts across different categories.
2. **Idea (`idea`)**: The height or length of each bar matches the count: taller bar means greater amount.
3. **Why (`why`)**: The side axis has a scale: always check the step size! If the axis goes by 5s (0, 5, 10, 15), line 3 means 15.
4. **Example (`example`)**: Step 1: Check category (e.g. Mango). Step 2: Follow top of bar horizontally to vertical axis. Step 3: Axis shows 25, so 25 children chose Mango.
5. **Where (`where`)**: Cricket match run rates, daily rainfall records, sports scores, and nutrient intake (Vijnana B1).
6. **Sutra (`sutra`)**: The height of the bar tells the count; always read the scale on the side.
- **Interactive Workbench (`#bargraph`)**:
  - Interactive bar graph builder with draggable bar height handles. Axis scale toggle (steps of 1, 2, 5, 10). Horizontal vs vertical orientation switch. Jaal link toggle connecting nutritional food categories to Vijnana B1.
- **Spot the Mistake**:
  - Learner: Vikram.
  - Claim: Reads a bar reaching grid mark 3 on an axis with step interval 5 (0, 5, 10, 15) and reports the value as 3.
  - Error: Step 2 (counting grid lines instead of reading axis values).
  - Kumkum Focus: Grid line number '3' highlighted in kumkum against the axis value '15'.
  - Correction: The axis scale steps by 5s. Line 3 corresponds to 3 × 5 = 15, not 3.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "The height of a bar represents its count according to the ___ on the axis." (Tiles: ['scale', 'color', 'width'], expected: `scale`).
  - Cloze 2: "All bars in a graph must have equal ___ and start from the same baseline." (Tiles: ['width', 'height', 'color'], expected: `width`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"The height of the bar tells the count; always read the scale on the side."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `H2` on the `ankana` thread appears as an active playable knot and navigates to `/#/prashna?k=H2`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "A bar reaches line 4 on an axis marked in steps of 10 (0, 10, 20, 30, 40). What value does the bar represent?" and accepts choice "C".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#bargraph`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A bar graph represents frequencies using bars of equal width. The height (or length) of a bar corresponds to frequency on a uniformly scaled axis. Reading between grid marks requires interval interpolation. Connects with Vijnana B1 (food intake graph).
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Vikram's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `scale` and `width`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
