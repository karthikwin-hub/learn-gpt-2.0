# Feature Specification: 016 Adding & Subtracting Big Numbers with Regrouping (Knot A1)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Number Operations"), multi-digit addition and subtraction are extended to 5- and 6-digit numbers (ten thousands and lakhs). Children routinely struggle with three fundamental errors:
1. **The Inverted Subtraction Trap**: When a top digit is smaller than the bottom digit ($2 - 8$), children instinctively subtract the smaller from the larger ($8 - 2 = 6$) to avoid the discomfort of borrowing, producing answers like $502 - 138 = 436$.
2. **The Zero-Borrowing Paralysis**: When subtracting across zeroes ($500 - 247$ or $40,005 - 18,347$), children attempt to "borrow from 0", or convert zeroes directly to 10s without decrementing the leftmost non-zero digit.
3. **Carry Blindness**: In multi-digit addition, children write two digits in a single column or forget to add the carried ten into the subsequent column.

### 1.2 Pedagogical Solution in Gurukul
Feature 016 delivers a tactile 7-stage learning journey for Knot **A1 (Adding & Subtracting Big Numbers)**:
- **Prashna (Opening Prediction)**: Challenges borrowing across zeroes in $500 - 247$, confronting the top-bottom inversion trap.
- **Bodha (6 Concept Cards)**:
  - *What*: When counting sheep or rupees in the lakhs, we need columnar rules.
  - *Idea*: Regrouping is unbundling or bundling: 1 unit of a higher house equals exactly 10 units of the neighboring right house.
  - *Why*: You cannot take 7 ones from 0 ones. But $500$ can unbundle: 1 hundred becomes 10 tens, and 1 ten becomes 10 ones ($400 + 90 + 10 = 500$). The quantity remains identical!
  - *Worked Example*: Step-by-step reveal: Calculating $40,005 - 18,347 = 21,658$ showing every intermediate unbundling cross-out.
  - *Where*: District population census changes; bank treasury balances.
  - *Sutra*: *"When a house does not have enough, take one from the left and make ten in your house."*
- **Interactive Workbench (`#regroup`)**:
  - *Step 1 (Unbundle Across Zeroes)*: An interactive bead-house abacus. Clicking the "Unbundle" tool on the 100s house unbundles 1 bead into 10 beads in the 10s house, and 1 ten into 10 ones.
  - *Step 2 (Columnar Subtraction Challenge)*: Interactively executes $500 - 247$ and $1,004 - 638$, validating each columnar difference.
  - *Step 3 (Bundle Overflows in Addition)*: Visualizes $678 + 456$, bundling 10 ones into 1 ten and carrying to the next column.
- **Spot the Mistake**: Dev calculates $704 - 358 = 454$ by doing $8 - 4 = 4$. Child locates Step 2. Kumkum highlight shows the ones house needing unbundling.
- **Explain Back**: Word-tile cloze synthesis reinforcing that when the top digit is smaller, we unbundle 1 from the left house into 10.
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `A1` on the `ganana` thread appears as an active playable knot and navigates to `/#/prashna?k=A1`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks what happens first in $500 - 247$ and enables "Understand it" upon selecting "Exchange 1 hundred for 10 tens".
- **US2-AS2**: Bodha renders 6 cards explaining unbundling, borrowing across zeroes, the worked solution for $40,005 - 18,347$, and the regrouping sutra.

### Story US3 (P1): Interactive Regroup Workbench (`#regroup`)
- **US3-AS1 (Unbundling Across Zeroes)**: Clicking the unbundle tool on $500$ unbundles 1 hundred into 10 tens, and 1 ten into 10 ones with animated visual beads.
- **US3-AS2 (Step-by-Step Subtraction)**: Child subtracts ones, tens, and hundreds sequentially, verifying $500 - 247 = 253$.
- **US3-AS3 (Columnar Addition Bundling)**: Child adds $678 + 456$, sweeping 10 ones into 1 ten carry bead.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Dev's error ($704 - 358 = 454$); child identifies Step 2 (inverting subtraction).
- **US4-AS2**: Explain back completes: "When the top digit is smaller, we ___ from the left house which gives ___ to our house." (Tiles: `[borrow, ten, add]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero praise words or negative buzzers; full mobile responsiveness on 360px and 390px.
