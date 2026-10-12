# Feature Specification: 033 Metres, Grams and Litres (Metric Conversion Ladder) (Knot U2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/033-metric-units -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Mana strand), children explore **Metres, Grams and Litres (Metric Conversion Ladder)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Multiplying when converting smaller units to larger (e.g. 500 cm = 50000 m); mixing units improperly (e.g. 3 m 5 cm = 3.5 m instead of 3.05 m).

### 1.2 Pedagogical Solution in Gurukul
Feature 033 delivers a tactile 7-stage learning journey for Knot **U2 (Metres, Grams and Litres (Metric Conversion Ladder))**:
- **Prashna (Opening Wonder)**: Which is longer: 250 centimetres or 2 metres?
  - Options:
  - A) 2 metres
  - B) 250 centimetres (which is 2.5 metres)
  - C) They are the exact same length
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: We measure length in metres, mass in grams, and liquid capacity in litres using standard metric units.
2. **Idea (`idea`)**: Prefixes tell the power of 10: Kilo means 1000 times bigger; Centi means 100 times smaller; Milli means 1000 times smaller.
3. **Why (`why`)**: Because the metric ladder steps by 10s, converting units is just moving the decimal dot left or right!
4. **Example (`example`)**: Step 1: 1 metre = 100 centimetres. Step 2: 3 m 25 cm = 3.25 m = 325 cm. Step 3: 4500 g = 4.5 kg (divide by 1000).
5. **Where (`where`)**: Cloth merchants, milk packets (500 mL), medicine bottles (5 mL), sack of rice (25 kg), road distances (km).
6. **Sutra (`sutra`)**: Kilo is a thousand, centi a hundredth, milli a thousandth; shift the dot by powers of ten.
- **Interactive Workbench (`#metric`)**:
  - Metric Ladder interactive slider (km ↔ m ↔ cm ↔ mm, kg ↔ g ↔ mg, L ↔ mL). Decimal dot shifting animation. Dual balance comparator comparing mixed quantities (e.g. 1.5 kg vs 1500 g).
- **Spot the Mistake**:
  - Learner: Sonia.
  - Claim: Writes 4 metres and 5 centimetres as 4.5 metres.
  - Error: Step 2 (treating 5 cm as 5 tenths rather than 5 hundredths).
  - Kumkum Focus: Tenths place in decimal reading highlighted in kumkum (0.50 vs 0.05).
  - Correction: 1 metre has 100 cm, so 5 cm is 5 hundredths (0.05 m). 4 m 5 cm is 4.05 m, not 4.5 m (which is 4 m 50 cm).
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "One metre contains exactly ___ centimetres." (Tiles: ['one hundred', 'one thousand', 'ten'], expected: `one hundred`).
  - Cloze 2: "To convert grams into kilograms, we ___ by one thousand." (Tiles: ['divide', 'multiply', 'subtract'], expected: `divide`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Kilo is a thousand, centi a hundredth, milli a thousandth; shift the dot by powers of ten."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `U2` on the `mana` thread appears as an active playable knot and navigates to `/#/prashna?k=U2`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "Which is longer: 250 centimetres or 2 metres?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#metric`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: The metric system uses base-10 place value prefixes: kilo- (1000), base unit (metre, gram, litre), centi- (1/100), milli- (1/1000). Moving between units multiplies or divides by powers of ten, matching decimal place shifting.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Sonia's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `one hundred` and `divide`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
