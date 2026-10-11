# Feature Specification: 003 Multiplication threads (M1–M5)

**Feature**: `specs/003-multiplication`  
**Status**: Draft (Ready for Gate G1 review)  
**Authors**: Antigravity, Puja  
**Baseline Prototype**: `design/prototype/` (`#wonder`, `#film`, `#rect`, `#drums`, `#mistake`, `#bodha?k=M4`, `#bodha?k=M5`)  
**Pedagogical References**: `docs/product/CURRICULUM.md` §3, `docs/product/SPECKIT_HANDOFF.md` §129–152, `docs/product/DEV_HANDOFF.md` §490–494  

---

## 1. Problem & Product Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
Multiplication is often taught as isolated rote facts (times-table drills) or purely as repeated addition. This causes deep conceptual breakdown when children meet multi-digit multiplication:
1. **The Cross-Term Trap**: Children multiply only tens by tens and ones by ones (e.g., $23 \times 14 = (20 \times 10) + (3 \times 4) = 200 + 12 = 212$), omitting the cross rooms $20 \times 4 = 80$ and $3 \times 10 = 30$.
2. **Disconnected Column Algorithm**: The written column method feels like an arbitrary ritual of carries and mystery zeros rather than partial products adding up rectangular areas.
3. **The Common Multiple Fallacy**: Children assume the common multiple of two numbers is always their product (e.g. assuming drummers beating every 4 and 6 beats only meet at 24, missing 12).
4. **Commutativity as a Coincidence**: Children treat $3 \times 8$ and $8 \times 3$ as two unrelated memory burdens rather than the exact same rectangle rotated by $90^\circ$.

### 1.2 Pedagogical Solution in Gurukul
Feature 003 delivers the complete multiplication curriculum across 5 interconnected threads (M1–M5):
- **M1 Equal groups and arrays**: Seeing multiplication as equal groups arranged into rows and columns (repeated addition made visual).
- **M2 Multiplication is area**: Understanding $a \times b$ as unit squares tiling a rectangular floor (courtyard wonder, row-by-row living film, target area challenge).
- **M3 Turn it around**: Experiencing commutativity ($a \times b = b \times a$) by rotating the Rubber Rectangle $90^\circ$, keeping square count invariant.
- **M4 Cut the rectangle**: Stretches the Rubber Rectangle to $23 \times 14$, cuts it at the tens into 4 rooms ($200, 30, 80, 12 = 322$), folds the rooms into the written column method rows, and transitions to independent exploration with $17 \times 12$. Accompanied by M4 Spot the Mistake.
- **M5 Two drummers**: Two Indian tala cycles (e.g. 3 & 4, 4 & 6) playing along a shared beat line. The child predicts the first meeting beat; hits are marked visually and sonically; beat 12 is ringed as the least common multiple (LCM) for 4 & 6, dispelling the 24 misconception.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): M2 Multiplication is Area (Floor & Array)
As a 10-year-old child,  
I want to estimate courtyard tiles, watch the film build area row by row, and stretch a rectangular floor to target unit areas,  
So that I understand multiplication as continuous area rather than just a memorised formula.

- **US1-AS1 (Courtyard Estimation & Film Transition)**:  
  Given the courtyard wonder screen (`wonder?k=M2`),  
  When the child guesses the tile count using the slider and taps "See how it works",  
  Then the Living Film plays row by row ($6 \times 4 = 24$), followed by the rectangular workbench.

- **US1-AS2 (Target Area Exploration)**:  
  Given the M2 area floor workbench,  
  When the child stretches the grid to cover 18 tiles (e.g. $6 \times 3$, $9 \times 2$, or $3 \times 6$),  
  Then the live equation displays the matching dimensions and confirms 18 unit squares without game points or stars.

---

### Story US2 (P1): M4 Cut the Rectangle & Column Method Folding
As a child learning two-digit multiplication,  
I want to stretch a rectangle to $23 \times 14$, cut it at the tens into 4 rooms, and watch the rooms fold into the written column method,  
So that I see where every number in the standard algorithm comes from.

- **US2-AS1 (Four Rooms Product Decomposition)**:  
  Given a $23 \times 14$ grid on the Rubber Rectangle (`rect?k=M4`),  
  When the child cuts the rectangle at the tens with the thread tool,  
  Then four rooms display products $20 \times 10 = 200$, $3 \times 10 = 30$, $20 \times 4 = 80$, and $3 \times 4 = 12$, with partial products summing to $322$.

- **US2-AS2 (Column Method Folding Alignment)**:  
  Given the cut $23 \times 14$ grid,  
  When the child taps "Fold into column",  
  Then the grid highlights each horizontal strip in sequence, and the corresponding line in the written column calculation lights up synchronously.

- **US2-AS3 (Independent Exploration 17 × 12)**:  
  Given Step 3 of the M4 workbench,  
  When the child resizes the grid to $17 \times 12$ by dragging or using steppers,  
  Then the four rooms reveal $100, 70, 20, 14$ and the total area $204$ with calm reality feedback.

---

### Story US3 (P1): M4 Spot the Mistake & Self-Explanation
As a learner reflecting on common pitfalls,  
I want to inspect someone else's calculation that forgot two rooms, find the error, and formulate the rule in my own words,  
So that I build deep error-detection habits without fear of being judged wrong.

- **US3-AS1 (Non-Punitive Fine Step Feedback)**:  
  Given the M4 mistake screen (`mistake?k=M4`) presenting 4 steps of working,  
  When the child taps a mathematically valid step (step 1, 3, or 4),  
  Then a calm narrative line explains why that step is sound, without using the word "wrong" or negative buzzer sounds.

- **US3-AS2 (Kumkum Focal Point on Omitted Rooms)**:  
  Given the M4 mistake screen,  
  When the child taps the faulty step (step 2: $200 + 12 = 212$),  
  Then the 4-room diagram appears with the omitted rooms $30$ and $80$ highlighted in kumkum outline ("look here"), accompanied by the corrected equation $200 + 30 + 80 + 12 = 322$.

- **US3-AS3 (Explain It Back Sentence Synthesis)**:  
  Given the M4 explain screen (`explain?k=M4`),  
  When the child places word tokens into the prompt,  
  Then the sentence correctly reads: "I cut the rectangle into tens and ones and added every room", and enables saving to the child's notebook.

---

### Story US4 (P2): M5 Two Drummers & Least Common Multiple (LCM)
As a child discovering cycles and multiples,  
I want two drummers to play different tala cycles on a shared beat line and see where they strike together,  
So that I realise the first meeting is the least common multiple, and that 4 and 6 meet at 12 rather than 24.

- **US4-AS1 (Audio-Visual Rhythm Hits)**:  
  Given drummer A beating every $a$ beats and drummer B every $b$ beats (`drums?a=4&b=6`),  
  When playback begins,  
  Then on every beat $n$, drummer A pulses and sounds a low tone when $n \pmod a = 0$, drummer B pulses and sounds a high tone when $n \pmod b = 0$, and marks appear on the beat line.

- **US4-AS2 (4 and 6 Meet at 12 LCM)**:  
  Given drummer cycles of 4 and 6,  
  When the drummers play through beat 24,  
  Then beat 12 is distinctly ringed as the first simultaneous meeting (LCM), and beat 24 as the second meeting, refuting the misconception that they only meet at $4 \times 6 = 24$.

- **US4-AS3 (Prediction & Multiple Lists)**:  
  Given the Two Drummers workbench,  
  When the child enters their guess (e.g. 7 or 24) and completes playback,  
  Then the readout displays: "They first hit together on beat 12. You guessed [guess]. 12 is in both lists", alongside the highlighted lists of multiples.

---

### Story US5 (P3): M1 Equal Groups & M3 Turn It Around
As a learner building a complete multiplication foundation,  
I want to group loose items into equal bunches and rotate rectangular grids by $90^\circ$,  
So that I see equal grouping and commutativity as core properties of multiplication.

- **US5-AS1 (M1 Equal Groups to Array)**:  
  Given loose items grouped into bunches (e.g. 7 bunches of 4 coconuts),  
  When arranged into rows,  
  Then the display reads $7 \times 4 = 28$ ("7 groups of 4"), linking skip-counting to rectangular arrays.

- **US5-AS2 (M3 Commutative Rotation)**:  
  Given a $3 \times 8$ rectangle,  
  When rotated $90^\circ$ to $8 \times 3$,  
  Then the total square count ($24$) remains identical, proving $a \times b = b \times a$ through physical conservation of area.

---

### Story US6 (P1): Calm Pedagogical Invariants & Multilingual Equity
As a 10-year-old child learning in India,  
I want a peaceful interface free of pressure, scores, and streak anxiety, available in my mother tongue,  
So that I can think deeply without stress.

- **US6-AS1 (Zero Banned Words Enforcement)**:  
  Given any multiplication screen in Feature 003,  
  When prompts, feedback, or step guidance are displayed,  
  Then zero banned praise words (e.g. "Good job", "Great", "Bravo", "शाबाश", "சபாஷ்") or punitive alerts appear.

- **US6-AS2 (5-Language Script Purity & Parity)**:  
  Given the application language is set to English (`en`), Hindi (`hi`), Telugu (`te`), Bengali (`bn`), or Tamil (`ta`),  
  When viewing Bodha cards, workbenches (`rect`, `drums`), and mistake screens for M1–M5,  
  Then every string key exists, placeholder tokens match, and Indic text is rendered in native script with line height $\ge 1.7$.

---

## 3. Pedagogical Invariants & Boundary Rules

| Invariant | Implementation Rule |
|---|---|
| **No Praise / No Shame** | Use strictly descriptive reality feedback: "They meet on beat 12", "The four rooms make 322". Never use evaluative praise ("Awesome!"), stars, points, or streaks. |
| **Kumkum Attention Color** | Kumkum red (`--kumkum`) denotes focal attention ("look here"), never failure or an error penalty. |
| **Bidirectional Manipulation** | All transformations (grid resizing, cycle adjustments, steppers) can be reversed freely. |
| **Accessible Steppers** | Every draggable canvas element (grid handle, drummer speed) provides numeric stepper buttons as keyboard and screen-reader accessible alternatives. |
| **Audio-Visual Redundancy** | Every sound cue (drum beats, speech narration) has a visible, high-contrast visual counterpart on screen. |

---

## 4. Traceability Register

| Requirement ID | Acceptance Scenario | Verification Vehicle | Target Status |
|---|---|---|---|
| `US1-AS1` | Courtyard estimation & film transition | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US1-AS2` | Target area exploration | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US2-AS1` | Four rooms product decomposition (23 × 14) | Domain Unit (`multiply.test.ts`) & Acceptance | Pending G3 |
| `US2-AS2` | Column method folding alignment | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US2-AS3` | Independent exploration 17 × 12 = 204 | Domain Unit (`multiply.test.ts`) & Acceptance | Pending G3 |
| `US3-AS1` | Non-punitive fine step feedback | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US3-AS2` | Kumkum focal point on omitted rooms (30 & 80) | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US3-AS3` | Explain it back sentence synthesis | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US4-AS1` | Audio-visual rhythm hits | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US4-AS2` | 4 and 6 meet at 12 LCM (not 24) | Domain Unit (`multiply.test.ts`) & Acceptance | Pending G3 |
| `US4-AS3` | Prediction & multiple lists | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US5-AS1` | M1 equal groups to array | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US5-AS2` | M3 commutative rotation | Playwright Acceptance (`003-multiplication.spec.ts`) | Pending G3 |
| `US6-AS1` | Zero banned words enforcement | Unit Test (`banned-words.test.ts`) & Sweep | Pending G3 |
| `US6-AS2` | 5-language script purity & parity | Domain Unit (`i18n.test.ts`) & Sweep | Pending G3 |
