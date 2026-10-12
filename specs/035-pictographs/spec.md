# Feature Specification: 035 Pictographs (Scaled Keys & Data Representation) (Knot H1)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/035-pictographs -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Ankana strand), children explore **Pictographs (Scaled Keys & Data Representation)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Counting icons literally without multiplying by the key scale factor.

### 1.2 Pedagogical Solution in Gurukul
Feature 035 delivers a tactile 7-stage learning journey for Knot **H1 (Pictographs (Scaled Keys & Data Representation))**:
- **Prashna (Opening Wonder)**: In a school library pictograph, 1 book symbol stands for 5 books. If there are 4 book symbols on the shelf row, how many books does that mean?
  - Options:
  - A) 4 books
  - B) 9 books
  - C) 20 books
  - Correct: Choice C.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: A pictograph shows counts and quantities using pictures instead of long lists of numbers.
2. **Idea (`idea`)**: The key tells what one picture is worth: 1 tree icon might stand for 10 real trees.
3. **Why (`why`)**: Drawing 50 trees is too slow; drawing 5 tree icons with a key of 10 is fast, neat, and clear!
4. **Example (`example`)**: Step 1: Key: 1 star = 4 students. Step 2: 3 stars = 3 × 4 = 12 students. Step 3: Half a star = half of 4 = 2 students. Total for 3½ stars = 14 students.
5. **Where (`where`)**: Newspaper charts, museum displays, crop harvest reports, and traffic survey posters.
6. **Sutra (`sutra`)**: The key tells what one picture is worth; multiply the pictures by the key.
- **Interactive Workbench (`#pictograph`)**:
  - Interactive survey table (Favorite Fruits / Vehicles). Key scale selector (1 icon = 2, 5, or 10 items). Icon stamp tool allowing placement of full icons and half icons. Real-time data total calculator.
- **Spot the Mistake**:
  - Learner: Anita.
  - Claim: Looks at 3 bicycle icons where the key states 1 icon = 10 bicycles, and reports that only 3 bicycles were sold.
  - Error: Step 2 (omitting multiplication by the key scale).
  - Kumkum Focus: The icon count '3' highlighted in kumkum against the unmultiplied key label.
  - Correction: You must multiply the number of icons by the key: 3 icons × 10 bicycles = 30 bicycles.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "Every symbol in a pictograph stands for the amount specified in the ___." (Tiles: ['key', 'title', 'border'], expected: `key`).
  - Cloze 2: "If one apple symbol stands for five apples, then four symbols represent ___ apples." (Tiles: ['twenty', 'nine', 'four'], expected: `twenty`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"The key tells what one picture is worth; multiply the pictures by the key."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `H1` on the `ankana` thread appears as an active playable knot and navigates to `/#/prashna?k=H1`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "In a school library pictograph, 1 book symbol stands for 5 books. If there are 4 book symbols on the shelf row, how many books does that mean?" and accepts choice "C".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#pictograph`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A pictograph represents data using repeated symbols or icons. A key establishes the scale factor (e.g. 1 icon = 5 items). Partial icons represent fractional quantities (e.g. half icon = half of key value).
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Anita's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `key` and `twenty`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
