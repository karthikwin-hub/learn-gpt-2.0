# Feature Specification: 020 Which Operation? (Knot A3)

<!-- Spec Kit standard. Status: Approved · Priority: P1 · Lane: Feature · Branch: feat/020-which-operation -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Number Operations"), word problems cease to be simple single-step narratives. Children routinely suffer from three destructive heuristics:
1. **The Keyword Hunting Trap**: Children scan the text for isolated trigger words ("total", "more", "left", "each") and trigger an operation without understanding the physical scene. For instance, seeing "more" in *"A pole is 40 m tall; how much taller is it than a 15 m pole?"* leads children to add $40 + 15 = 55$ instead of finding the difference.
2. **Size-Based Number Picking**: Children pick whichever operation "feels right" for number sizes (e.g. if numbers are two digits, add; if one is small, divide), treating word problems as numbers with decorative text.
3. **Action-Model Blindness**: Children fail to recognize the four underlying physical actions: Combining, Separating/Comparing, Replicating equal units, and Partitioning into shares.

### 1.2 Pedagogical Solution in Gurukul
Feature 020 delivers a structured 7-stage learning journey for Knot **A3 (Which Operation?)**:
- **Prashna (Opening Prediction)**: 5 children share 30 laddoos equally. Which operation model fits? ($30 + 5, 30 \times 5, 30 \div 5$).
- **Bodha (6 Concept Cards)**:
  - *What*: Words tell a human story; mathematics captures the physical action.
  - *Idea*: The Four Root Actions: Combine ($+$), Separate/Compare ($-$), Replicate equal groups ($\times$), Partition ($\div$).
  - *Why*: Keyword Traps Exposed: "How much more?" is not joining amounts—it is measuring the gap between two towers (Subtraction).
  - *Worked Example*: Three distinct problems using the exact same numbers ($24$ and $6$) mapped to their distinct operation models.
  - *Where*: Planning school buses for a field trip; calculating bill change at the market.
  - *Sutra*: *"Look at the action in the scene: joining is plus, comparing is minus, repeating is multiply, sharing is divide."*
- **Interactive Workbench (`#wordprob`)**:
  - *Step 1 (Physical Action Classifier)*: Visual scene cards where children select the root action badge ([Join], [Compare], [Repeat], [Share]), animating the matching tape diagram.
  - *Step 2 (The Keyword Trap Buster)*: Presents tricky comparison stories and guides finding the difference.
  - *Step 3 (Equation Assembler)*: Assembles the mathematical model from story parameters.
- **Spot the Mistake**: Amit reads "A rope is 40 m. How much more is it than 15 m?" and adds $40 + 15 = 55$. Child locates Step 2. Kumkum highlight shows comparing heights requires subtraction.
- **Explain Back**: Word-tile cloze synthesis: "To compare two amounts and find how much taller one is, we ___ the smaller from the larger." (Tiles: `[subtract, add, multiply]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `A3` appears as an active playable knot on the `ganana` thread and navigates to `/#/prashna?k=A3`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks which operation finds equal shares of 30 laddoos for 5 children and accepts $30 \div 5$.
- **US2-AS2**: Bodha renders 6 cards explaining the four root actions, keyword traps, three problems with 24 and 6, and the action sutra.

### Story US3 (P1): Interactive Word Problem Workbench (`#wordprob`)
- **US3-AS1 (Action Badge Selection)**: Correctly identifies physical action for story cards with animated tape diagrams.
- **US3-AS2 (Comparison Gap Modeling)**: Models "how much taller" as a subtraction difference gap between bars.
- **US3-AS3 (Equation Assembly)**: Assembles parameters into the correct arithmetic expression.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Amit's $40 + 15 = 55$; child identifies Step 2 (falling for "more" keyword).
- **US4-AS2**: Explain back completes: "Comparing amounts means finding the ___ by ___." (Tiles: `[difference, subtracting, sum, adding]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; full mobile responsiveness on 360px and 390px.
