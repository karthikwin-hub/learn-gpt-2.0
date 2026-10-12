# Feature Specification: 028 Kolam Mirror (Line vs Rotational Symmetry) (Knot G4)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/028-kolam-symmetry -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Kolam Mirror (Line vs Rotational Symmetry)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Every symmetrical shape has a mirror line; rotation and reflection are the same.

### 1.2 Pedagogical Solution in Gurukul
Feature 028 delivers a tactile 7-stage learning journey for Knot **G4 (Kolam Mirror (Line vs Rotational Symmetry))**:
- **Prashna (Opening Wonder)**: A four-blade pinwheel turns and looks identical every quarter turn (90°). Can you fold it in half so both sides match?
  - Options:
  - A) Yes, along 4 lines
  - B) Yes, along 2 lines
  - C) No, it has no mirror fold lines even though it looks symmetrical
  - Correct: Choice C.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Symmetry means a shape matches itself after a transformation: folding (mirror) or spinning (turn).
2. **Idea (`idea`)**: A mirror line is like a fold: left flips to right. A rotational turn spins around the central dot.
3. **Why (`why`)**: Some shapes have both (a square has 4 mirror lines and 4-turn symmetry). A pinwheel or swastika has 4-turn symmetry but 0 mirror lines!
4. **Example (`example`)**: Step 1: Draw 1 blade. Step 2: Mirror mode reflects it across an axis. Step 3: Spin mode repeats it 4 times around the center without reflection.
5. **Where (`where`)**: Kolams, rangoli, flower petals, ceiling fans, car wheels, and decorative tiles.
6. **Sutra (`sutra`)**: A mirror folds onto itself; a turn spins onto itself. They are different.
- **Interactive Workbench (`#kolam`)**:
  - Rice-powder dark ground canvas supporting interactive drawing with live symmetry repetition. Mode switch: 'Mirror Fold' vs 'Pure Rotation'. Symmetry orders 1, 2, 4, 8. 'Fold Test' overlay and 'Spin Test' scrubber.
- **Spot the Mistake**:
  - Learner: Arun.
  - Claim: Claims that every kolam pattern with 4-fold rotational symmetry can be folded across a mirror line.
  - Error: Step 2 (assuming rotation requires reflection).
  - Kumkum Focus: Pinwheel blade curved direction highlighted in kumkum to show left-right asymmetry.
  - Correction: Spinning 90° matches the pinwheel, but folding flips blade direction so halves do not match.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "A mirror line ___ a pattern onto itself, while rotational symmetry spins it." (Tiles: ['folds', 'stretches', 'cuts'], expected: `folds`).
  - Cloze 2: "A shape can have rotational symmetry without having any ___ lines." (Tiles: ['mirror', 'curved', 'straight'], expected: `mirror`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"A mirror folds onto itself; a turn spins onto itself. They are different."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G4` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G4`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "A four-blade pinwheel turns and looks identical every quarter turn (90°). Can you fold it in half so both sides match?" and accepts choice "C".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#kolam`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Line (mirror) symmetry folds a shape onto itself along a line. Rotational symmetry spins a shape onto itself around a centre point. A shape can have rotational symmetry without having any mirror lines.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Arun's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `folds` and `mirror`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
