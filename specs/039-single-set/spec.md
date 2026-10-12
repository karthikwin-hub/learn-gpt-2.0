# Feature Specification: 039 Sort by a Rule (Single Set & Universe of Discourse) (Knot S1)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/039-single-set -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Tarka strand), children explore **Sort by a Rule (Single Set & Universe of Discourse)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Sorting by subjective affinity ('things I like') rather than a testable rule; believing an object can be halfway in.

### 1.2 Pedagogical Solution in Gurukul
Feature 039 delivers a tactile 7-stage learning journey for Knot **S1 (Sort by a Rule (Single Set & Universe of Discourse))**:
- **Prashna (Opening Wonder)**: If the sorting ring rule is 'Multiples of 5', where does the number 34 belong?
  - Options:
  - A) Inside the ring
  - B) Outside the ring
  - C) On the line
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A set is a collection of objects that all obey a clear, exact rule (like 'even numbers' or 'yellow shapes').
2. **Idea (`idea`)**: A single ring on the floor splits the whole world into two: things that fit go INSIDE; everything else stays OUTSIDE.
3. **Why (`why`)**: Every object must be tested against the rule: it either fits or it doesn't. There is no in-between!
4. **Example (`example`)**: Rule: 'Shapes with 4 sides'. Step 1: Square has 4 sides $\to$ Inside. Step 2: Triangle has 3 sides $\to$ Outside. Step 3: Circle has 0 straight sides $\to$ Outside.
5. **Where (`where`)**: Library book categories, kitchen spice organization, recycling bins, and animal classification.
6. **Sutra (`sutra`)**: A rule divides everything: it belongs inside or it stays outside.
- **Interactive Workbench (`#singleset`)**:
  - Single ring courtyard canvas with attribute blocks (Shapes, Colors, Sizes) and Number chips. Rule selector chip (e.g. 'Even', 'Triangles', 'Red'). Drag-and-drop sorting with calm instant validation feedback.
- **Spot the Mistake**:
  - Learner: Kunal.
  - Claim: Places the number 15 outside the 'Numbers ending in 5' ring because 15 is also divisible by 3.
  - Error: Step 2 (inventing an extra exclusion rule).
  - Kumkum Focus: Number 15 outside ring highlighted in kumkum with ending digit '5' focused.
  - Correction: The rule only asks if the number ends in 5. 15 ends in 5, so it belongs inside the ring regardless of other properties.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "A set is a collection of objects defined by an exact ___." (Tiles: ['rule', 'guess', 'color'], expected: `rule`).
  - Cloze 2: "Every object tested against the rule must be either inside the ring or ___ it." (Tiles: ['outside', 'halfway', 'above'], expected: `outside`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"A rule divides everything: it belongs inside or it stays outside."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `S1` on the `tarka` thread appears as an active playable knot and navigates to `/#/prashna?k=S1`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "If the sorting ring rule is 'Multiples of 5', where does the number 34 belong?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#singleset`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A set is a well-defined collection of objects sharing a clear rule. A single boundary ring partitions the universe of objects into two distinct regions: inside (satisfies rule) and outside (does not satisfy rule).
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Kunal's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `rule` and `outside`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
