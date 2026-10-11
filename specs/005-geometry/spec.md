# Feature Specification: 005 Geometry threads (G1–G5), Rope & Pegs, Mirror & Turn

<!-- Spec Kit standard. Status: Draft · Priority: P1 · Lane: Feature · Branch: feat/005-geometry -->

## Why
Children commonly conflate perimeter and area, assuming that shapes with the same perimeter must enclose the same area, or that a larger area requires a longer perimeter. Furthermore, symmetry is often taught solely as vertical folding, missing rotational symmetry and the distinction between dihedral reflection and cyclic turn.

Feature 005 implements the Geometry threads (G1–G5) rooted in classical Indian geometry (the Sulba Sutras of Baudhayana and Apastamba, where geometry was constructed using rope and pegs, and threshold Kolam symmetries):
1. **Rope and Pegs** (`#rope`, G2): A fixed closed loop of rope (24m) pinned around 4 pegs demonstrates that while the perimeter stays invariant ($2 \times (w + h) = 24$), the area changes dramatically from a skinny $11 \times 1 = 11\text{m}^2$ corridor to the maximum $6 \times 6 = 36\text{m}^2$ square.
2. **Kolam Mirror & Turn** (`#kolam`, G4): Drawing rice-white lines on dark ground with symmetry groups ($D_n$ mirror reflections vs $C_n$ pure rotations).
3. **Angle as Turn** (G1), **Triangle Tilt & Shear** (G3), and **Perimeter Fence** (G5) conceptual integration.

---

## User Stories & Acceptance Scenarios

### US1 (P1): G2 Area vs Perimeter — Rope and Pegs (`#rope`)
As a 10-year-old child, I want to pull the free corner of a closed rope rectangle so that I discover how area changes while perimeter stays fixed.

- **US1-AS1 (Corner sliding along constant perimeter diagonal)**:
  - Given I navigate to `#rope` with default 24m rope
  - When I drag or step the free corner handle
  - Then width and height always satisfy $w + h = 12\text{m}$, and perimeter equation reads $w + h + w + h = 24\text{m}$.

- **US1-AS2 (Area hill visualization & ghosts)**:
  - Given a 24m rope
  - When I try different widths ($1, 2, \dots, 11$)
  - Then previous rectangles remain as dashed ghost outlines
  - And the "Area hill" card fills in vertical bars showing area for each tried width ($11, 20, 27, 32, 35, 36$).

- **US1-AS3 (Square maximum area detection)**:
  - Given I set width to $6$ ($w = h = 6$)
  - Then the rectangle becomes a square
  - And the narrator speaks the maximum area insight: "A square has the biggest area: 6 × 6 = 36 m²".

---

### US2 (P1): G4 Kolam Mirror & Turn Symmetry (`#kolam`)
As a child, I want to draw kolam patterns with mirror reflection and turn symmetries so that I see the difference between folding and turning.

- **US2-AS1 (Symmetry group repetition)**:
  - Given I navigate to `#kolam`
  - When I draw a stroke on the dark canvas
  - Then with order 4 and mode `mirror`, the stroke is repeated across 4 mirror lines (dihedral group $D_4$)
  - And with mode `turn`, the stroke repeats through 4 rotations of 90° without mirror reflections (cyclic group $C_4$).

- **US2-AS2 (Order and mode chips)**:
  - Given order chips ($1, 2, 4, 8$) and mode chips (`mirror`, `turn`)
  - When I select order 4 and mode `turn`
  - Then the readout displays: "Quarter turn (90°). Challenge: can you make a pattern that turns 4 ways without any mirror line?"
  - And after drawing a stroke, it displays: "Challenge met!".

- **US2-AS3 (Undo and Clear)**:
  - When I click "Undo" (`common.undo`), the last drawn stroke is removed
  - When I click "Clear" (`common.clear`), all strokes are cleared.

---

### US3 (P2): Bodha Concept Cards for G2 & G4 (`#bodha?k=G2`, `#bodha?k=G4`)
As a learner, I want calm visual cards showing rope peg rectangles and kolam flower symmetries before workbench practice.

- **US3-AS1 (G2 Bodha cards)**:
  - Given I view `#bodha?k=G2`
  - Then card step `idea` displays two rectangles using the same 24m rope: $11 \times 1$ and $6 \times 6$
  - And card step `why` shows the areas $11\text{m}^2$ and $36\text{m}^2$
  - And card step `example` compares $8 \times 2$ ($16\text{m}^2$) and $5 \times 5$ ($25\text{m}^2$).

- **US3-AS2 (G4 Bodha cards)**:
  - Given I view `#bodha?k=G4`
  - Then card step `idea` displays a flower with both mirror lines and a 90° turn arc
  - And card step `why` displays a pinwheel flower with turn symmetry only (no mirror lines).

---

### US4 (P2): G1, G3, G5 Curriculum Descriptors
As a learner, I want geometry thread knots G1 (Angle as turn), G3 (Triangle tilt), and G5 (Perimeter fence) registered with structured cards.

- **US4-AS1 (G1 Angle as turn)**:
  - Given knot G1 is registered in `registry.ts`
  - Then its cards teach angle as an amount of turn (quarter turn 90°, half turn 180°, full turn 360°).

- **US4-AS2 (G3 Triangle tilt & G5 Perimeter fence)**:
  - Given knots G3 and G5 are registered
  - Then G3 cards explain shear preserving area ($\frac{1}{2} \times \text{base} \times \text{height}$) and G5 cards explain measuring irregular fences.

---

### US5 (P1): Calm Pedagogical Invariants & Multilingual Equity
As a child learning in Telugu, Hindi, or English, I want calm, dignified guidance with zero praise words and full language parity.

- **US5-AS1 (Banned words & Calm narrator)**:
  - Zero praise words ("great", "correct", "good job", "stars", "points").
- **US5-AS2 (Multilingual equity in Telugu & Hindi)**:
  - Switching to Telugu (`te`) or Hindi (`hi`) renders native terms ("మోకులు మరియు మేకులు", "తాడు మరియు మేకులు", "కోలమ్") in-place without page reload.
