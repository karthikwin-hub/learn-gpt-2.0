# Feature Specification: 025 Angles as Turns (Knot G1)

## 1. Overview & Pedagogical Purpose
- **Knot ID**: `G1`
- **Thread**: Rekha (Shapes & Space)
- **Shala**: Ganita (Mathematics)
- **Concept**: An angle is an amount of turn, not the length of its arms. Quarter turn ($90^\circ$ / right angle), half turn ($180^\circ$ / straight angle), full turn ($360^\circ$); classifying acute and obtuse angles.
- **Core Misconception**: Longer arms make a bigger angle (confusing the linear length of drawn rays with angular aperture).
- **Target Learner**: 10-year-old child in Class 5.
- **Calm Ethics**: Zero gamification, reversible touch physics, mobile-first responsive (360px & 390px viewports), Kumkum highlights for attention.

---

## 2. Universal 7-Stage Engine Sequence

### 2.1 Stage 1: Prashna (Diagnostic Wonder)
- **Hook Question**: "Two clocks show exactly 3 o'clock. One is a giant town hall clock; the other is a tiny wristwatch. Which clock's hands form a bigger angle?"
- **Options**:
  - `A`: The giant clock (because its hands are much longer)
  - `B`: The tiny wristwatch
  - `C`: Both angles are exactly the same (quarter turn)
- **Correct**: `C`.
- **Pedagogical Resolution**: Both turn the same quarter circle ($90^\circ$); stretching the arm does not change the turn.

### 2.2 Stage 2: Bodha (6 Structured Cards)
1. **What (`what`)**: An angle measures the amount of turn between two lines meeting at a point (vertex).
2. **Idea (`idea`)**: Imagine an arm turning around a fixed pin: as it sweeps, it traces a circular turn.
3. **Why (`why`)**: The length of the arms does not change how far you turned. A door opening a crack turns the same whether the door is wide or narrow.
4. **Example (`example`)**: 3-step angular progression:
   - Step 1: Quarter turn from 12 to 3 = $90^\circ$ (a square corner / right angle).
   - Step 2: Half turn from 12 to 6 = $180^\circ$ (a straight line).
   - Step 3: Full turn back to 12 = $360^\circ$.
5. **Where (`where`)**: Opening doors, clock hands, scissor blades, solar shadows, roof slopes.
6. **Sutra (`sutra`)**: *"An angle is how far you turn, not how long the arms are."*

### 2.3 Stage 3: Spot the Mistake (`mistake`)
- **Faulty Scenario**: Tarun opens a giant room door by a small crack ($15^\circ$) and opens a small pencil box lid wide ($60^\circ$). He claims the room door makes a bigger angle because the door is much larger.
- **Wrong Step**: Step 1 (judging angle by door size rather than amount of turn).
- **Kumkum Highlight**: Outlines the door's linear width vs angular arc in `--kumkum`.
- **Explanation**: The pencil box lid turned $60^\circ$, which is 4 times wider than the door's $15^\circ$ turn.

### 2.4 Stage 4: Practice (`practice`)
- Angle classification interactive check: identifying whether a shown turn is a right angle ($90^\circ$), acute (< $90^\circ$), obtuse (> $90^\circ$), or straight ($180^\circ$).

### 2.5 Stage 5: Manipulative Workbench (`#angles`)
- **Route**: `#angles`
- **Interactive Controls**:
  - **Rotating Ray Handle**: Smooth dragging from $0^\circ$ to $360^\circ$ with live degree readout and arc wedge.
  - **Arm Stretcher Slider**: Changes ray length from 60px to 180px while angle arc remains unchanged.
  - **Snap Presets**: $45^\circ$, $90^\circ$, $135^\circ$, $180^\circ$, $270^\circ$, $360^\circ$.
  - **Angle Type Badge**: Live calm label: "Quarter turn / Right angle", "Acute", "Obtuse", "Straight angle".
  - **Dual Clock Comparison Tool**: Side-by-side comparison of long vs short hands showing identical angular arcs.

### 2.6 Stage 6: Explain It Back (`explain`)
- **Cloze Tile 1**: "An angle measures the amount of [turn / length / weight], not how long the arms are."
  - Expected: `turn`.
- **Cloze Tile 2**: "A quarter turn makes a [right / straight / zero] angle of ninety degrees."
  - Expected: `right`.

### 2.7 Stage 7: Sutra in Pothi
- Notebook consolidation stamping the rule: *"An angle is how far you turn, not how long the arms are."*

---

## 3. User Stories & Acceptance Scenarios

### US1: Playable Knot Discovery in Ganita Shala
- **US1-AS1**: Navigating to `#shala?s=ganita` renders Knot `G1` as playable with title "Angles as turns".
- **US1-AS2**: Tapping Knot `G1` routes to `#prashna?k=G1`.

### US2: Prashna Commitment & Bodha Cards
- **US2-AS1**: `#prashna?k=G1` presents the clock hands wonder question and accepts choice `C`.
- **US2-AS2**: Advancing to `#bodha?k=G1` displays 6 cards with 3-step clock progression and Sutra.

### US3: Interactive Workbench (`#angles`)
- **US3-AS1**: Dragging the rotating handle to $90^\circ$ displays "Quarter turn (Right angle)".
- **US3-AS2**: Adjusting the arm length slider from 80px to 160px keeps the angle readout strictly at $90^\circ$.
- **US3-AS3**: Comparing the dual clocks proves that ray length does not alter angular aperture.

### US4: Spot the Mistake & Explain Back
- **US4-AS1**: `#mistake?k=G1` identifies Tarun's misconception and highlights the error in Kumkum.
- **US4-AS2**: `#explain?k=G1` validates cloze selections `turn` and `right`.

### US5: Calm Gurukul Ethics & Mobile Viewport
- **US5-AS1**: All screens maintain zero gamification tokens (no stars, scores, timers, praise).
- **US5-AS2**: All interactive controls have $\ge 44$px touch targets and function smoothly on 360px and 390px viewports.
