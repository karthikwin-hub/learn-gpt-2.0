# Feature Specification: 037 What Comes Next? (Sequence Rules & Difference Ladders) (Knot L4)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/037-sequences -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Krama strand), children explore **What Comes Next? (Sequence Rules & Difference Ladders)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Guessing the next term by arbitrary similarity without checking if a constant operation holds across all terms.

### 1.2 Pedagogical Solution in Gurukul
Feature 037 delivers a tactile 7-stage learning journey for Knot **L4 (What Comes Next? (Sequence Rules & Difference Ladders))**:
- **Prashna (Opening Wonder)**: What comes next in the sequence: 3, 7, 11, 15, ___?
  - Options:
  - A) 18
  - B) 19
  - C) 20
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A sequence is a train of numbers where every step follows the exact same mathematical rule.
2. **Idea (`idea`)**: Build a difference ladder: subtract each number from the next to uncover the hidden jump between steps.
3. **Why (`why`)**: Once you know the jump (e.g. add 4 each time), you can predict any future number without guessing!
4. **Example (`example`)**: Step 1: 3, 7, 11, 15. Step 2: Jump: 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4 (Rule: +4). Step 3: Next term is 15 + 4 = 19.
5. **Where (`where`)**: Calendar days (add 7 for next Monday), bus schedules, tile borders, and spiral shells.
6. **Sutra (`sutra`)**: Find what connects one step to the next: the rule tells you what comes next.
- **Interactive Workbench (`#sequences`)**:
  - Sequence caterpillar with interactive difference ladder showing first differences. Operation tester (+, -, ×, ÷). 'Distant Jump' predictor allowing child to calculate the 10th term directly from the rule.
- **Spot the Mistake**:
  - Learner: Gita.
  - Claim: Looks at 2, 4, 8, 16 and guesses the next term is 24 because she noticed 16 + 8 = 24.
  - Error: Step 2 (switching operations from doubling to adding).
  - Kumkum Focus: Inconsistent jump (+8 vs ×2) highlighted in kumkum on the difference ladder.
  - Correction: The rule is multiplying by 2 (2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16). The next term is 16 × 2 = 32, not 24.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "To find what comes next in a sequence, we discover the unchanging ___ between steps." (Tiles: ['rule', 'guess', 'color'], expected: `rule`).
  - Cloze 2: "In the sequence 5, 10, 15, 20, the rule is to add ___ at every step." (Tiles: ['five', 'ten', 'two'], expected: `five`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Find what connects one step to the next: the rule tells you what comes next."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `L4` on the `krama` thread appears as an active playable knot and navigates to `/#/prashna?k=L4`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "What comes next in the sequence: 3, 7, 11, 15, ___?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#sequences`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A sequence is an ordered list of terms following a definite rule. Finding the difference or operation between consecutive terms identifies the rule (+k, -k, ×k), enabling prediction of future terms.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Gita's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `rule` and `five`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
