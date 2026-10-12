# Feature Specification: 040 Two Rings (Venn Overlap, Union & Complement) (Knot S2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/040-two-rings-venn -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Tarka strand), children explore **Two Rings (Venn Overlap, Union & Complement)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: An object that satisfies both rules must be duplicated or placed arbitrarily in only one of the rings.

### 1.2 Pedagogical Solution in Gurukul
Feature 040 delivers a tactile 7-stage learning journey for Knot **S2 (Two Rings (Venn Overlap, Union & Complement))**:
- **Prashna (Opening Wonder)**: A ball is both RED and ROUND. In two sorting rings labelled 'Red Things' and 'Round Things', where does it go?
  - Options:
  - A) In the Red ring only
  - B) In the Round ring only
  - C) In the shared middle overlap between both rings
  - Correct: Choice C.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: When two sorting rings overlap on the floor, they create four distinct zones.
2. **Idea (`idea`)**: Zone 1: Fits rule A only. Zone 2: Fits rule B only. Zone 3: Fits BOTH rules at once (the overlap). Zone 4: Fits NEITHER rule (outside).
3. **Why (`why`)**: The overlap is the 'AND' zone: a red round ball belongs to both sets at once, so it sits in the shared lens!
4. **Example (`example`)**: Rule A: Multiples of 2; Rule B: Multiples of 3. Step 1: 4 is 2 only. Step 2: 9 is 3 only. Step 3: 6 and 12 fit both, so they sit in the overlap!
5. **Where (`where`)**: Search filters (e.g. Price < 500 AND Free Delivery), medical symptoms, and sports team rosters.
6. **Sutra (`sutra`)**: Where two rings overlap, a thing belongs to both sets at once.
- **Interactive Workbench (`#sets`)**:
  - Two-ring Venn courtyard canvas with 12 geometric blocks. Draggable circular rings. Region count monitor tracking A-only + B-only + Overlap + Neither = 12. Mode parameter `?mode=sort`.
- **Spot the Mistake**:
  - Learner: Pooja.
  - Claim: Places the number 12 only in the 'Multiples of 4' ring, ignoring that 12 is also a multiple of 3.
  - Error: Step 2 (omitting membership in the second rule).
  - Kumkum Focus: Number 12 placed in single ring highlighted in kumkum with missing overlap trajectory.
  - Correction: 12 is a multiple of both 4 and 3 (4 × 3 = 12). It must be placed in the central overlap region.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "Where two rings overlap, an object belongs to ___ sets at the same time." (Tiles: ['both', 'neither', 'one'], expected: `both`).
  - Cloze 2: "Objects that satisfy neither rule remain ___ both rings." (Tiles: ['outside', 'between', 'inside'], expected: `outside`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Where two rings overlap, a thing belongs to both sets at once."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `S2` on the `tarka` thread appears as an active playable knot and navigates to `/#/prashna?k=S2`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "A ball is both RED and ROUND. In two sorting rings labelled 'Red Things' and 'Round Things', where does it go?" and accepts choice "C".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#sets`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: Two overlapping rings divide the universe into 4 disjoint regions: Set A only, Set B only, Both (Intersection / Overlap), and Neither (Complement / Outside). An object satisfying both rules belongs in the shared overlap.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Pooja's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `both` and `outside`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
