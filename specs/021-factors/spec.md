# Feature Specification: 021 Factors Make Rectangles (Knot F1)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Be My Multiple, I'll Be Your Factor"), factors are introduced through visual grid geometry. Children routinely stumble on three pitfalls:
1. **The Factor-Multiple Reversal**: Children invert the vocabulary, calling 18 a "factor" of 3 rather than a multiple, or calling 3 a "multiple" of 18.
2. **Missing Factor Partners**: Children find small trial factors ($2, 3$) but forget to log their paired partner divisors ($18 \div 2 = 9, 18 \div 3 = 6$), leaving factor lists incomplete.
3. **The 1-and-Self Amnesia**: Children forget that $1$ and $N$ ($1 \times N$) are always legitimate factors of every positive integer $N$.

### 1.2 Pedagogical Solution in Gurukul
Feature 021 delivers a tactile 7-stage learning journey for Knot **F1 (Factors Make Rectangles)**:
- **Prashna (Opening Prediction)**: How many different rectangles can you build using 12 square tiles? (Choices: 1, 3, 6).
- **Bodha (6 Concept Cards)**:
  - *What*: Seeds or tiles on the floor can form solid rectangular mats with no gaps or loose ends.
  - *Idea*: Every solid rectangle of area $N$ gives a factor pair: its length and width.
  - *Why*: Factors always travel in pairs: if $3$ divides $18$, then $6$ must also be a factor because $3 \times 6 = 18$.
  - *Worked Example*: Finding all factors of $20$: $(1, 20), (2, 10), (4, 5) \to \{1, 2, 4, 5, 10, 20\}$.
  - *Where*: Hall seating arrangements; tiling kitchen backsplashes.
  - *Sutra*: *"A factor divides with no leftover: the sides of every neat rectangle are factors."*
- **Interactive Workbench (`#factors`)**:
  - *Step 1 (The Rectangle Snapper)*: Interactive grid for $N=12$. Dragging rows snaps tiles into rectangular dimensions. Invalid rows (e.g. 5 rows leaves 2 loose tiles) visibly break; valid rows ($1 \times 12, 2 \times 6, 3 \times 4$) snap and illuminate in leaf green.
  - *Step 2 (The Rainbow Pair Map)*: Links factors with visual rainbow arcs ($1 \leftrightarrow 24, 2 \leftrightarrow 12, 3 \leftrightarrow 8, 4 \leftrightarrow 6$), demonstrating partner pairings.
  - *Step 3 (Square Number Symmetry)*: Explores $N=16$ or $N=25$, demonstrating why square numbers have an odd number of factors ($4 \times 4$ shares its partner).
- **Spot the Mistake**: Raju lists factors of 18 as $1, 2, 3, 6$ and stops. Child locates Step 2. Kumkum highlight shows missing partners $9$ and $18$.
- **Explain Back**: Word-tile cloze synthesis: "Factors of a number always come in ___, formed by the sides of neat ___." (Tiles: `[pairs, rectangles, multiples]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `F1` on the `guna` thread appears as an active playable knot and navigates to `/#/prashna?k=F1`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks how many rectangles 12 tiles make and accepts choice "3 rectangles" ($1\times12, 2\times6, 3\times4$).
- **US2-AS2**: Bodha renders 6 cards explaining factor pairs, rectangular tiles, worked factors of 20, and the rectangle sutra.

### Story US3 (P1): Interactive Factors Workbench (`#factors`)
- **US3-AS1 (Tile Grid Assembly)**: Assembles $N=12$ into valid rectangles and rejects row counts with gaps.
- **US3-AS2 (Rainbow Pair Accumulator)**: Logs factor pairs into the rainbow arc tracker.
- **US3-AS3 (Square Factor Pair Center)**: Demonstrates $4 \times 4 = 16$ as a single middle factor.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Raju's missing factors for 18; child identifies Step 2 (forgot partner factors 9 and 18).
- **US4-AS2**: Explain back completes: "Factors come in ___: dividing by one factor reveals its ___." (Tiles: `[pairs, partner, single]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; full mobile responsiveness on 360px and 390px.
