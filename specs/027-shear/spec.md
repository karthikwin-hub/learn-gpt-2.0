# Feature Specification: 027 Slide the Top (Conservation of Area under Shear) (Knot G3)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/027-shear -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Rekha strand), children explore **Slide the Top (Conservation of Area under Shear)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: A slanted parallelogram is bigger because its slanted side is longer, or leaning reduces area.

### 1.2 Pedagogical Solution in Gurukul
Feature 027 delivers a tactile 7-stage learning journey for Knot **G3 (Slide the Top (Conservation of Area under Shear))**:
- **Prashna (Opening Wonder)**: If you push the top card of a deck of cards sideways so the deck leans, does the face area of the cards change?
  - Options:
  - A) Yes, it gets bigger
  - B) Yes, it gets smaller
  - C) No, the area stays exactly the same
  - Correct: Choice C.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: Take a rectangle and slide its top edge along a straight guide rail: it slants into a parallelogram.
2. **Idea (`idea`)**: A triangle overhangs on one side, but an identical triangular gap opens on the other side.
3. **Why (`why`)**: Slice off the overhanging triangle and slide it across: it fits the gap perfectly, reforming the original rectangle!
4. **Example (`example`)**: Step 1: Rectangle with base 6 and height 4 (Area = 24). Step 2: Slide top right by 3 units: height remains 4. Step 3: Area is still 6 × 4 = 24.
5. **Where (`where`)**: Leaning stacks of coins, ramps, staircases, and roof trusses.
6. **Sutra (`sutra`)**: Slide the top along the rail: the cut piece fills the gap, and the area never changes.
- **Interactive Workbench (`#shear`)**:
  - Parallelogram canvas with horizontal top guide rail. Slidable top edge handle. 'Cut & Shift' button animating triangular slice sliding from right to left to prove area invariance. Live readouts comparing constant Area with changing Perimeter.
- **Spot the Mistake**:
  - Learner: Leena.
  - Claim: Measures the slanted edge (5 cm) of a parallelogram with base 6 cm and height 4 cm, claiming area is 6 × 5 = 30 cm².
  - Error: Step 2 (using slanted side instead of perpendicular height).
  - Kumkum Focus: Slanted side length highlighted in kumkum; perpendicular height dropped as dashed plumb line.
  - Correction: Area requires perpendicular height (4 cm), not slanted side (5 cm). Area is 6 × 4 = 24 cm².
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "When the top slides along the rail, the ___ stays the same because the base and vertical height do not change." (Tiles: ['area', 'perimeter', 'slant'], expected: `area`).
  - Cloze 2: "To calculate the area of a parallelogram, we multiply the base by the ___ height." (Tiles: ['perpendicular', 'slanted', 'corner'], expected: `perpendicular`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Slide the top along the rail: the cut piece fills the gap, and the area never changes."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `G3` on the `rekha` thread appears as an active playable knot and navigates to `/#/prashna?k=G3`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "If you push the top card of a deck of cards sideways so the deck leans, does the face area of the cards change?" and accepts choice "C".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#shear`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A parallelogram has the same area as a rectangle with the same base and vertical height ($A = b \times h$). Sliding the top edge horizontally preserves area because the removed triangle perfectly fills the opposite side.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Leena's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `area` and `perpendicular`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
