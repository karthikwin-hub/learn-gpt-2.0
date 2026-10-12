# Feature Specification: 042 True for All? (Universal Claims & Counterexamples) (Knot L1)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/042-counterexamples -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Tarka strand), children explore **True for All? (Universal Claims & Counterexamples)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Many positive examples prove a claim is universal; a single exception is just a special case to ignore.

### 1.2 Pedagogical Solution in Gurukul
Feature 042 delivers a tactile 7-stage learning journey for Knot **L1 (True for All? (Universal Claims & Counterexamples))**:
- **Prashna (Opening Wonder)**: Someone says: 'Every number that ends in 4 can be shared equally by 4 friends without remainder.' Is this statement true?
  - Options:
  - A) Yes, because 4, 24, and 44 all divide by 4
  - B) No, because 14 ends in 4 but leaves a remainder of 2
  - C) Yes, all numbers ending in 4 divide by 4
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A statement says something is ALWAYS true for all numbers or objects.
2. **Idea (`idea`)**: To prove a statement FALSE, you do not need a hundred reasons: you only need ONE single counterexample!
3. **Why (`why`)**: Seeing a thousand white swans does not prove all swans are white; spotting one black swan proves the rule wrong.
4. **Example (`example`)**: Statement: 'All prime numbers are odd.' Step 1: 3, 5, 7, 11 are odd. Step 2: But 2 is a prime number and it is even! Step 3: The single number 2 disproves the claim!
5. **Where (`where`)**: Scientific laws, safety rules, mathematics proofs, and legal arguments.
6. **Sutra (`sutra`)**: A thousand examples cannot prove 'always', but one counterexample disproves it.
- **Interactive Workbench (`#counterexample`)**:
  - Universal claim testing machine. Child inputs candidate statements or tests preset claims. Counterexample finder tool testing integers and geometric shapes until a disproof is found.
- **Spot the Mistake**:
  - Learner: Rahul.
  - Claim: Claims that 'Multiplying any two numbers always makes a bigger number' and lists 3 × 4 = 12 and 5 × 6 = 30 as proof.
  - Error: Step 2 (ignoring boundary cases like 0 and 1).
  - Kumkum Focus: Calculation 5 × 1 = 5 and 5 × 0 = 0 highlighted in kumkum to show counterexample.
  - Correction: 5 × 1 = 5 (not bigger) and 5 × 0 = 0 (smaller). A single counterexample disproves 'always'.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "To disprove a claim that says 'always', you only need to find ___ counterexample." (Tiles: ['one', 'many', 'ten'], expected: `one`).
  - Cloze 2: "Even if a hundred examples work, a single exception proves the claim is ___." (Tiles: ['false', 'true', 'proven'], expected: `false`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"A thousand examples cannot prove 'always', but one counterexample disproves it."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `L1` on the `tarka` thread appears as an active playable knot and navigates to `/#/prashna?k=L1`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "Someone says: 'Every number that ends in 4 can be shared equally by 4 friends without remainder.' Is this statement true?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#counterexample`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A universal statement claims a property holds for all elements of a set. A million positive examples cannot prove 'always', but a single counterexample conclusively disproves the claim.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Rahul's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `one` and `false`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
