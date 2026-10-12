# Feature Specification: 019 Long Division Algorithm (Knot D4)

<!-- Spec Kit standard. Status: Approved · Priority: P1 · Lane: Feature · Branch: feat/019-long-division -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Ways to Multiply and Divide"), children transition from mental division to the multi-step standard long division algorithm. This transition is notorious for one disastrous error:
1. **The Forgotten Quotient Zero Trap**: When dividing $612 \div 3$, children divide hundreds ($6 \div 3 = 2$), bring down $1$, see that $3$ does not fit into $1$, and immediately pull down $2$ to divide $12 \div 3 = 4$, writing the quotient as **$24$ instead of $204$**—off by an entire order of magnitude!
2. **Disconnected Place-Value Ritual**: Children memorize "Daddy, Mommy, Sister, Brother" (Divide, Multiply, Subtract, Bring down) as an arbitrary ritual without connecting each step to unbundling place-value houses.
3. **Premature Remainder Halting**: When bringing down a digit that cannot divide, children frequently declare it the final remainder without completing the ones column.

### 1.2 Pedagogical Solution in Gurukul
Feature 019 delivers a calm, structured 7-stage learning journey for Knot **D4 (Long Division Algorithm)**:
- **Prashna (Opening Prediction)**: Asks what the tens digit of $615 \div 3$ is, directly targeting the zero-in-quotient misconception.
- **Bodha (6 Concept Cards)**:
  - *What*: When distributing ₹612 among 3 Panchayats, drawing beads takes all day. We work house by house.
  - *Idea*: The division dance: Divide $\to$ Multiply $\to$ Subtract $\to$ Bring down.
  - *Why*: The Zero Gate: Every place house brought down MUST produce a quotient digit. If 3 cannot divide 1 ten, write $0$ in the tens quotient house!
  - *Worked Example*: Step-by-step reveal: $612 \div 3 = 204$ detailing the tens column zero.
  - *Where*: Dividing district scholarship funds; distributing railway textbook shipments.
  - *Sutra*: *"Divide, multiply, subtract, bring down: if a house cannot share, write zero before you open the next door."*
- **Interactive Workbench (`#longdiv`)**:
  - *Step 1 (The Four-Beat Rhythm Walkthrough)*: Color-coded long-division frame ($824 \div 4$). Highlights active house, showing partial product and subtraction remainder.
  - *Step 2 (The Zero-Gate Challenge)*: Solving $612 \div 3$. When 1 ten is brought down, the workbench prompts: "Can 3 fit into 1? Write 0 in the quotient!"
  - *Step 3 (Independent Division)*: Practicing $918 \div 9 = 102$ and $735 \div 5 = 147$.
- **Spot the Mistake**: Kabir divides $824 \div 4$ and gets $26$. Child locates Step 2. Kumkum highlight marks the missing zero in the tens slot.
- **Explain Back**: Word-tile cloze synthesis: "When a brought-down digit is smaller than the divisor, we write a ___ in the quotient before bringing down the next digit." (Tiles: `[zero, one, dot]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `D4` appears as an active playable knot on the `ganana` thread and navigates to `/#/prashna?k=D4`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks the tens digit of $615 \div 3$ and accepts choice "0".
- **US2-AS2**: Bodha renders 6 cards explaining place columns, the four-beat rhythm, the worked solution for $612 \div 3 = 204$, and the long division sutra.

### Story US3 (P1): Interactive Long Division Workbench (`#longdiv`)
- **US3-AS1 (Four-Beat Step Execution)**: Highlights active house for Divide, Multiply, Subtract, Bring down in sequential color tints.
- **US3-AS2 (Mandatory Zero Gate)**: Rejects skipping the tens column and prompts writing 0 in the quotient for $612 \div 3$.
- **US3-AS3 (Full Quotient Validation)**: Confirms complete multi-digit division with calm verification check ($204 \times 3 = 612$).

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Kabir's $824 \div 4 = 26$; child identifies Step 2 (omitted tens zero).
- **US4-AS2**: Explain back completes: "If a brought-down house cannot share, we write ___ in the quotient." (Tiles: `[zero, one, ten]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; full mobile responsiveness on 360px and 390px.
