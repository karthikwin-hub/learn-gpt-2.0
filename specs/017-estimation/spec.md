# Feature Specification: 017 Estimate First & Mental Benchmarks (Knot A2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Number Operations"), estimation is introduced not as an afterthought, but as an essential mathematical safety check. Children routinely struggle with three habits:
1. **The Order-of-Magnitude Blindness**: Children perform mechanical multi-digit calculations without any mental sanity check, happily accepting $21 \times 39 = 8190$ or $392 + 514 = 8810$ because "that's what the paper gave me".
2. **The "Rounding is Only at the End" Myth**: Children think rounding is only a formatting instruction ("round the final answer"), missing its primary function as a proactive planning anchor.
3. **The Nearest-Benchmark Drift**: Children struggle with rounding thresholds, rounding $48$ down to $40$ or treating rounding as arbitrary truncation.

### 1.2 Pedagogical Solution in Gurukul
Feature 017 delivers a tactile 7-stage learning journey for Knot **A2 (Estimate First)**:
- **Prashna (Opening Prediction)**: Asks whether buying 48 books at ₹98 each costs about ₹500, ₹5,000, or ₹50,000, anchoring order of magnitude before calculation.
- **Bodha (6 Concept Cards)**:
  - *What*: In the bazaar, you don't calculate paise while haggling; you estimate before reaching your pocket.
  - *Idea*: Replace prickly numbers with friendly round neighbors ($48 \to 50$, $98 \to 100$) to set guardrails.
  - *Why*: Friendly estimation catches the wild error: $50 \times 100 = 5000$. An answer of $4704$ is reasonable; an answer of $47,040$ is immediately revealed as a misplaced zero.
  - *Worked Example*: Step-by-step reveal: Estimating $392 + 514 \to 400 + 500 = 900$. Exact is $906$.
  - *Where*: Planning fuel for bus journeys; estimating grain sack storage in a godown.
  - *Sutra*: *"Round to friendly numbers before you calculate to catch the wild mistake."*
- **Interactive Workbench (`#estimate`)**:
  - *Step 1 (Magnetic Benchmark Snap)*: A continuous number line where numbers snap to the nearest 10 or 100 with spring physics, proving proximity.
  - *Step 2 (Safe Zone Guardrail Builder)*: Child inputs friendly bounds ($29 \times 41 \to 30 \times 40 = 1200$), and the model generates a visual "Safe Zone" range on the dial.
  - *Step 3 (Wild Error Radar)*: Tests calculations against the Safe Zone, detecting and filtering wild tenfold errors.
- **Spot the Mistake**: Meera calculates $21 \times 39 = 8190$ and accepts it. Step 4 accepts a wild number without checking against $20 \times 40 = 800$.
- **Explain Back**: Word-tile cloze synthesis: "Rounding to friendly numbers gives a quick ___ that helps us catch wild errors ___ we calculate." (Tiles: `[estimate, exact]`, `[before, after]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `A2` on the `ganana` thread appears as an active playable knot and navigates to `/#/prashna?k=A2`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks the approximate cost of $48 \times ₹98$ and enables "Understand it" upon selecting "About ₹5,000".
- **US2-AS2**: Bodha renders 6 cards explaining friendly rounding, error guardrails, worked example $392 + 514$, and the estimation sutra.

### Story US3 (P1): Interactive Estimation Workbench (`#estimate`)
- **US3-AS1 (Magnetic Benchmark Snap)**: Number line slider snaps 48 to 50 and 392 to 400 with visual distance indicators.
- **US3-AS2 (Safe Zone Guardrail Builder)**: Builds estimation bounds for $29 \times 41$, painting the green safe range around $1200$.
- **US3-AS3 (Wild Error Radar)**: Catches $8190$ as outside the safe zone for $20 \times 40$.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Meera's $21 \times 39 = 8190$; child identifies Step 4 (failing to compare against estimate).
- **US4-AS2**: Explain back completes: "Rounding gives a quick ___ that helps us check answers ___ we calculate." (Tiles: `[estimate, before, exact, after]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; fully operable on 360px and 390px mobile viewports.
