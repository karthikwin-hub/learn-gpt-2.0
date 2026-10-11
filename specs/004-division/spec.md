# Feature Specification: 004 Division threads (D1–D4) & Fair Share Table

<!-- Spec Kit standard. Status: Draft · Priority: P1 · Lane: Feature · Branch: feat/004-division -->

## Why
Children often misunderstand division as mere subtraction or believe division must always "come out even", regarding remainders as mistakes or waste to be discarded. In rural and municipal classrooms in India, children share physical sweets (laddoos, chikkis) and marbles by dealing one-by-one into circles or plates, round and round.

Feature 004 implements the Division threads (D1–D4) anchored by the Fair Share Table manipulative (`#share`), where:
1. Division is first experienced as equal partitive sharing (`#share?mode=share`, D1).
2. Remainders wait safely in a dedicated leftover tray rather than being discarded, showing that the remainder is always strictly smaller than the divisor (`#share?mode=leftover`, D3).
3. Leftovers can be cut into equal fractional wedges, bridging division directly into fractions ($14 \div 4 = 3\text{ r }2 = 3\frac{1}{2}$).
4. Quotative grouping ($D2$) and missing rectangular dimension ($D4$) are conceptually unified with multiplication.

---

## User Stories & Acceptance Scenarios

### US1 (P1): D1 Fair Share Workbench (`#share?mode=share`)
As a 10-year-old child, I want to deal a pile of laddoos onto plates so that I see division as sharing equally.

- **US1-AS1 (Round-by-round dealing)**:
  - Given I navigate to `#share?mode=share` with default 12 laddoos and 4 plates
  - When I click "Share one round" (`share.round`)
  - Then 1 laddoo is animated from the top pile onto each of the 4 plates with an audible tick sound (`voice.tone('tick')`)
  - When all 12 laddoos are dealt
  - Then each plate contains 3 laddoos and the top pile is empty.

- **US1-AS2 (Written equations & Bar visual)**:
  - Given all 12 laddoos have been dealt across 4 plates
  - Then the written card (`share.written`) displays $12 \div 4 = 3$ and $4 \times 3 = 12$
  - And a bar diagram (`share.barTitle`) renders a horizontal strip partitioned into 4 equal segments of 3 with label $12$ laddoos in all.

- **US1-AS3 (Adjustable Steppers & Deal All)**:
  - Given I change laddoos stepper (range 2–30) and plates stepper (range 2–6)
  - When I click "Share all" (`share.all`)
  - Then all items deal sequentially onto the plates until the pile is empty.

---

### US2 (P1): D3 Leftovers, Remainders & Fractions (`#share?mode=leftover`)
As a child, I want to share numbers that do not divide evenly, so that I understand remainders and see how leftovers turn into fractions.

- **US2-AS1 (Remainder tray retention)**:
  - Given I navigate to `#share?mode=leftover` with default 14 laddoos and 4 plates
  - When all items are dealt
  - Then each of the 4 plates receives 3 laddoos
  - And exactly 2 laddoos are placed in the dashed remainder tray (`share.tray`)
  - And the written equation displays $14 \div 4 = 3 \text{ r } 2$ and $4 \times 3 + 2 = 14$ in kumkum emphasis.

- **US2-AS2 (Cutting leftovers into fractional pieces)**:
  - Given 14 laddoos dealt on 4 plates with 2 in the remainder tray
  - When I click "Cut remainder into 4 pieces" (`share.cut`)
  - Then each leftover laddoo is sliced into 4 wedges and distributed to each plate
  - And the written card updates to show $3 + 2/4 = 3 + 1/2$.

---

### US3 (P2): Bodha Concept Cards for D1 & D3 (`#bodha?k=D1`, `#bodha?k=D3`)
As a learner, I want calm visual cards showing fair share plates and remainder cuts before entering the workbench.

- **US3-AS1 (D1 Bodha card diagrams)**:
  - Given I view `#bodha?k=D1`
  - Then card step `idea` displays 4 plates with 3 laddoos each
  - And card step `why` displays the inverse multiplication $4 \times 3 = 12$
  - And card step `example` displays 5 plates sharing 15 items ($5 \times 3 = 15$).

- **US3-AS2 (D3 Bodha card diagrams)**:
  - Given I view `#bodha?k=D3`
  - Then card step `idea` displays 4 plates with 3 laddoos each and 2 in remainder tray ($14 \div 4 = 3 \text{ r } 2$)
  - And card step `why` displays cut wedges with half annotation ($3 + \frac{1}{2}$)
  - And card step `example` illustrates 7 rotis shared between 2 children ($7 \div 2 = 3\frac{1}{2}$).

---

### US4 (P2): D2 (Grouping) & D4 (Missing side) Curriculum Integration
As a learner, I want to explore how division connects to grouping and missing side rectangles.

- **US4-AS1 (D2 lesson descriptor)**:
  - Given knot D2 is loaded in `registry.ts`
  - Then its lesson cards teach quotative grouping (how many groups of size $k$ fit in total).

- **US4-AS2 (D4 lesson descriptor)**:
  - Given knot D4 is loaded in `registry.ts`
  - Then its cards teach missing side of a rectangle ($24 \div 6 = 4$) and link directly to factor pairs on the area grid.

---

### US5 (P1): Calm Pedagogical Invariants & Multilingual Equity
As a child learning in Tamil, Hindi, or English, I want calm, dignified guidance with zero gamification and full language parity.

- **US5-AS1 (Banned words & Calm narrator)**:
  - The UI and narrator say must contain zero praise words ("great", "correct", "perfect", "good job", "stars", "points")
  - All feedback is descriptive ("Every plate has 3; nothing is left", "Every plate has 3, and 2 wait in the tray. They are not thrown away.").

- **US5-AS2 (Multilingual equity in Tamil rotation)**:
  - Switching to Tamil (`ta`) immediately updates all titles, buttons, steppers, voice transcripts, and math equations without page refresh.
