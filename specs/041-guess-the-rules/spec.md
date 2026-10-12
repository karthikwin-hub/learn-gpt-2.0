# Feature Specification: 041 Guess the Rules (Reverse Sorting & Inductive Logic) (Knot S3)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/041-guess-the-rules -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Tarka strand), children explore **Guess the Rules (Reverse Sorting & Inductive Logic)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Formulating a rule based on a single element while ignoring counter-examples in the same region.

### 1.2 Pedagogical Solution in Gurukul
Feature 041 delivers a tactile 7-stage learning journey for Knot **S3 (Guess the Rules (Reverse Sorting & Inductive Logic))**:
- **Prashna (Opening Wonder)**: All items in Ring A are green shapes; all in Ring B are circles. The middle overlap has green circles. Can the rule for Ring A be 'All shapes'?
  - Options:
  - A) Yes, because green shapes are shapes
  - B) No, because non-green shapes are left outside Ring A
  - C) It doesn't matter
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Sometimes you see objects already sorted into rings, but the labels are hidden: you must guess the rules!
2. **Idea (`idea`)**: Inspect all objects in a region: find what they share in common AND check that nothing outside shares it.
3. **Why (`why`)**: Scientific reasoning works this way: look at the evidence, form a hypothesis, and test it against all items.
4. **Example (`example`)**: Step 1: In ring A you see red triangle, red square, red star. Hypothesis: 'Red'. Step 2: Check outside: no red things outside. Step 3: Rule A is confirmed: 'Red'!
5. **Where (`where`)**: Detective work, medical diagnosis from symptoms, debugging computer programs, and scientific discovery.
6. **Sutra (`sutra`)**: Look at what is inside and what was left out: the rule must fit all of them.
- **Interactive Workbench (`#sets`)**:
  - Mystery sorted Venn courtyard with hidden ring rules. Rule hypothesis chips to test against regions. Automated verification showing which items violate the proposed rule. Mode parameter `?mode=guess`.
- **Spot the Mistake**:
  - Learner: Aman.
  - Claim: Looks at Ring A containing 3 triangles and 2 circles and guesses the rule is 'Triangles'.
  - Error: Step 2 (ignoring non-conforming items inside the same region).
  - Kumkum Focus: The 2 circles inside Ring A highlighted in kumkum against the claimed 'Triangles' rule.
  - Correction: A rule must fit ALL items in the ring. Since circles are also inside, the rule cannot be 'Triangles' (it might be 'Blue Shapes').
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "To discover a hidden rule, you must find a property shared by ___ item inside the ring." (Tiles: ['every', 'one', 'some'], expected: `every`).
  - Cloze 2: "If an item inside violates your guess, your hypothesis must be ___." (Tiles: ['revised', 'accepted', 'ignored'], expected: `revised`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Look at what is inside and what was left out: the rule must fit all of them."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `S3` on the `tarka` thread appears as an active playable knot and navigates to `/#/prashna?k=S3`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "All items in Ring A are green shapes; all in Ring B are circles. The middle overlap has green circles. Can the rule for Ring A be 'All shapes'?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#sets`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Inductive reasoning operates backwards from classified evidence to hypothesize the underlying sorting rules. The hypothesized rule must explain every item in the region while excluding all items outside.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Aman's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `every` and `revised`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
