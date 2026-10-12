# Feature Specification: 018 Division as Repeated Subtraction (Knot D2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Theme 2: Number Operations — "Ways to Multiply and Divide"), children are introduced to the dual nature of division: **Partitive (Sharing)** and **Quotitive (Grouping / Repeated Subtraction)**. Most children suffer from three conceptual traps:
1. **The Sharing-Only Blindspot**: Children assume division exclusively means "dealing onto $N$ known plates". When confronted with a problem where group size is known but group count is unknown ("I have ₹35 and stamps cost ₹5 each. How many can I buy?"), they freeze because there are no plates to deal into.
2. **The Single-Subtraction Confusion**: Children confuse division with simple subtraction, computing $15 - 3 = 12$ and stopping, reporting $12$ as the quotient rather than counting how many times 3 was removed.
3. **The Grouping-Remainder Barrier**: In grouping division with leftovers ($23 \div 5$), children either discard the remainder or claim "it cannot be divided", failing to see that 4 full boxes of 5 are made and 3 items wait in reserve.

### 1.2 Pedagogical Solution in Gurukul
Feature 018 delivers a calm, tactile 7-stage learning journey for Knot **D2 (Repeated Subtraction)**:
- **Prashna (Opening Prediction)**: Asks how many boxes can be packed if 20 laddoos are packed 4 per box, contrasting grouping against simple subtraction.
- **Bodha (6 Concept Cards)**:
  - *What*: Division is not just sharing sweets onto plates; it is packing items into boxes of a fixed size.
  - *Idea*: Repeated subtraction counts how many equal packages can be carved out of the total until zero remains.
  - *Why*: Multiplication hops forward on the number line; division hops backward toward zero. $20 - 4 - 4 - 4 - 4 - 4 = 0$ (5 hops).
  - *Worked Example*: Step-by-step reveal: $18 \div 6 \to 18 - 6 = 12 \to 12 - 6 = 6 \to 6 - 6 = 0$ (3 groups formed).
  - *Where*: Cutting a 2-meter ribbon into 25 cm hair ribbons; packing 10-tablet medicine blister strips.
  - *Sutra*: *"Division is repeated subtraction: count how many times the group fits before zero."*
- **Interactive Workbench (`#quotition`)**:
  - *Step 1 (Step-by-Step Group Pack)*: An interactive number line from 20 to 0. Tapping "Take group of 4" animates a backward hop of 4 and stacks 1 packed box on the pantry shelf, until zero remains ($20 \div 4 = 5$).
  - *Step 2 (Grouping with Remainders)*: Grouping $22$ by $5$. The frog hops $22 \to 17 \to 12 \to 7 \to 2$. Since $2 < 5$, no more full hops can be taken: 4 boxes packed, 2 wait in the remainder tray ($22 \div 5 = 4\text{ r }2$).
  - *Step 3 (Sharing vs Grouping Duality)*: Displays side-by-side: 20 items dealt onto 4 plates (each has 5) versus 20 items packed in boxes of 4 (makes 5 boxes). Proves mathematical duality.
- **Spot the Mistake**: Sita solves $15 \div 3$ by writing $15 - 3 = 12$ and stops after 1 step. Child locates Step 2. Kumkum highlight shows the remaining 12 waiting for further hops.
- **Explain Back**: Word-tile cloze synthesis: "Quotitive division counts how many ___ of size $k$ fit into the whole by repeatedly ___." (Tiles: `[groups, subtracting, adding, plates]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `D2` on the `ganana` thread appears as an active playable knot and navigates to `/#/prashna?k=D2`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks how many boxes of 4 laddoos fit in 20 laddoos and enables "Understand it" upon selecting "5 boxes".
- **US2-AS2**: Bodha renders 6 cards explaining quotitive grouping, backward number line hops, worked solution for $18 \div 6$, and the repeated subtraction sutra.

### Story US3 (P1): Interactive Quotition Workbench (`#quotition`)
- **US3-AS1 (Manual Backward Hop Packaging)**: Tapping "Take group" removes 4 from the total on the number line and animates a packed box into the stack.
- **US3-AS2 (Incomplete Hop Remainder)**: Grouping 22 by 5 stops at 2, placing 2 into the remainder tray with equation $22 \div 5 = 4\text{ r }2$.
- **US3-AS3 (Duality Visualizer)**: Toggle shows 4 plates of 5 equals 5 boxes of 4.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Sita's single subtraction $15 - 3 = 12$; child identifies Step 2 (stopping before zero).
- **US4-AS2**: Explain back completes: "Quotitive division counts how many ___ can be formed by repeatedly ___ until zero." (Tiles: `[groups, subtracting, items]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamified stars or buzzers; full mobile responsiveness on 360px and 390px.
