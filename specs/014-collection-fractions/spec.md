# Feature Specification: 014 Fractions of a Collection & Like Fractions (Knot N4)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Theme 1: Numbers — "Parts and Wholes"), children transition from continuous area fractions (folding one roti or paper strip) to discrete collections of objects (fractions of a set) and adding like fractions. This transition introduces three deep conceptual breakdowns:
1. **The Single-Object Fallacy**: Children assume fractions only apply to single continuous wholes (a pizza, a chocolate bar, a ribbon). When asked to find $\frac{1}{3}$ of 12 marbles, they struggle to conceptualize a scattered group of 12 items as a unified single "whole".
2. **The Denominator Count Trap**: When asked to take $\frac{1}{4}$ of 20 tokens, children frequently pick 4 tokens because "the bottom number is 4", confusing the number of equal groups with the count of items in a group.
3. **The Denominator Addition Pitfall**: When adding fractions with the same denominator ($\frac{1}{5} + \frac{2}{5}$), children instinctively add both numerators and denominators ($\frac{1+2}{5+5} = \frac{3}{10}$), failing to grasp that the denominator is a unit label (a "fifth") rather than an operand.

### 1.2 Pedagogical Solution in Gurukul
Feature 014 delivers a calm, tactile 7-stage learning journey for Knot **N4 (Fractions of a Collection)**:
- **Prashna (Opening Prediction)**: Explores sharing 12 mangoes among 3 friends ($\frac{1}{3}$), challenging the 3-versus-4 item confusion before Bodha teaching begins.
- **Bodha (6 Concept Cards)**:
  - *What*: A collection of separate objects can be partitioned just like a single roti.
  - *Idea*: The denominator partitions the set into equal baskets; the numerator counts how many baskets are taken.
  - *Why*: In addition of like fractions ($\frac{1}{5} + \frac{2}{5} = \frac{3}{5}$), the basket size ("fifths") is the invariant unit of measure. Denominators never add together.
  - *Worked Example*: Step-by-step reveal: Finding $\frac{2}{3}$ of 18 marbles $\to$ 3 equal baskets of 6 $\to$ take 2 baskets $\to 6 \times 2 = 12$ marbles.
  - *Where*: Sharing laddu boxes at festivals; finding $\frac{1}{4}$ of a 60-minute hour (15 minutes).
  - *Sutra*: *"The bottom number groups the set into equal baskets; the top counts the baskets you take."*
- **Interactive Workbench (`#collection`)**:
  - *Step 1 (Explore Partitioning)*: Deals 12, 16, or 20 tokens into $D$ circular partition rings ($2, 3, 4, 5, 6$) with audible rhythmic distribution, proving that the denominator divides the collection.
  - *Step 2 (Fractions of a Set Challenge)*: Calculates target fractions (e.g. $\frac{2}{3}$ of 12, $\frac{3}{4}$ of 16). Selecting rings shades tokens and dynamically displays $\text{Total} \div \text{Denominator} \times \text{Numerator}$.
  - *Step 3 (Like-Fraction Addition)*: Combines $\frac{1}{5}$ of a collection with $\frac{2}{5}$, illustrating on a shared fraction tray why 1 fifth + 2 fifths = 3 fifths ($\frac{3}{5}$), explicitly demonstrating why the denominator remains 5.
- **Spot the Mistake**: Rahul adds $\frac{2}{5} + \frac{1}{5}$ and writes $\frac{3}{10}$. Child taps Step 3 (adding denominators). Kumkum focal ring shows five-part trays.
- **Explain Back**: Word-tile cloze synthesis reinforcing that the denominator stays constant while numerators combine.
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
As a 10-year-old child browsing Ganita Shala,  
I want Knot N4 to be marked as playable on the Sankhya thread,  
So that I can enter the lesson directly from the Loom.

- **US1-AS1 (Loom Playability & Navigation)**:
  - **Given** I am on Ganita Shala (`/#/shala?s=ganita`),
  - **When** I look at the `sankhya` thread,
  - **Then** Knot `N4` is rendered with an active filled dot and title "Fractions of a collection",
  - **And** clicking `N4` navigates to `/#/prashna?k=N4`.

---

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
As a learner encountering fractions of sets,  
I want to make a prediction before reading 6 structured visual cards,  
So that I commit to my thinking and understand how denominators group collections.

- **US2-AS1 (Prashna Commitment)**:
  - **Given** I am on `/#/prashna?k=N4`,
  - **Then** the title displays "How many apples is 1/3 of a basket of 12 apples?",
  - **And** the "Understand it" button is disabled until a choice is selected,
  - **When** I tap choice "4 apples",
  - **Then** choice "4 apples" receives `aria-pressed="true"` and the button enables,
  - **And** clicking "Understand it" navigates to `/#/bodha?k=N4`.

- **US2-AS2 (Bodha Cards & Step-by-Step Reveal)**:
  - **Given** I view `/#/bodha?k=N4`,
  - **Then** the header displays "Bodha" and knot title "Fractions of a collection",
  - **And** Card 1 (`what`) explains collections as whole units,
  - **And** Card 2 (`idea`) illustrates partition baskets,
  - **And** Card 3 (`why`) explains why denominators do not add,
  - **And** Card 4 (`example`) reveals the worked solution for $\frac{2}{3}$ of 18 in 3 distinct progressive steps,
  - **And** Card 5 (`where`) connects fractions of sets to hours, minutes, and sweets,
  - **And** Card 6 (`sutra`) displays the retention sutra *"The bottom number groups the set into equal baskets; the top counts the baskets you take."*,
  - **And** the "To the workbench" button navigates to `/#/collection`.

---

### Story US3 (P1): Interactive Collection Workbench (`#collection`)
As a child,  
I want an interactive tray where tokens can be dealt into equal rings and combined,  
So that I visually understand finding fractions of sets and adding like fractions.

- **US3-AS1 (Step 1: Partitioning Tokens into Equal Rings)**:
  - **Given** I navigate to `/#/collection`,
  - **Then** the screen renders a main token tray with 12 circular items and 3 partition rings,
  - **When** I change the group selector to 4 rings,
  - **Then** the tokens re-distribute evenly into 4 rings of 3 tokens each,
  - **And** the equation card displays $12 \div 4 = 3\text{ items per group} = \frac{1}{4}\text{ of }12$.

- **US3-AS2 (Step 2: Selecting Groups to Build Fractions)**:
  - **Given** Step 2 of `#collection` with 16 tokens partitioned into 4 rings of 4,
  - **When** I tap 3 rings to select them,
  - **Then** the 3 rings highlight with shaded backgrounds,
  - **And** the live readout displays: $\frac{3}{4}\text{ of }16 = 3 \times 4 = 12\text{ tokens}$,
  - **And** a calm confirmation line explains: "3 out of 4 equal baskets taken: 12 tokens in all."

- **US3-AS3 (Step 3: Like-Fraction Addition without Denominator Addition)**:
  - **Given** Step 3 of `#collection` showing a 5-basket collection model,
  - **When** I add $\frac{1}{5}$ (1 basket) and $\frac{2}{5}$ (2 baskets),
  - **Then** 3 baskets out of 5 highlight,
  - **And** the equation card explicitly shows $\frac{1}{5} + \frac{2}{5} = \frac{3}{5}$,
  - **And** if an option button $\frac{3}{10}$ is tapped, the workbench calmly demonstrates: "10 would mean cutting into 10 baskets. Our baskets are still fifths."

---

### Story US4 (P1): Spot the Mistake & Explain Back
As a learner reflecting on common errors,  
I want to examine Rahul's work where he added denominators, locate the exact mistake step, and explain the rule in my own words,  
So that I solidify conceptual understanding without fear of failure.

- **US4-AS1 (Spotting Denominator Addition Error)**:
  - **Given** I am on `/#/mistake?knot=N4`,
  - **Then** 4 steps of Rahul's calculation for $\frac{2}{5} + \frac{1}{5}$ are displayed:
    - Step 1: "Both fractions have fifths as their parts."
    - Step 2: "Add the top numbers: 2 + 1 = 3."
    - Step 3: "Add the bottom numbers: 5 + 5 = 10."
    - Step 4: "So 2/5 + 1/5 = 3/10."
  - **When** I tap valid Steps 1 or 2,
  - **Then** calm guidance confirms why that step is sound,
  - **When** I tap Step 3,
  - **Then** Step 3 receives the kumkum focal ring ("look here"),
  - **And** the explanation displays: "The parts are fifths; adding the amounts does not double the number of parts. The bottom number stays 5: 3/5.",
  - **And** the "Explain it" button unlocks.

- **US4-AS2 (Explain Back Sentence Synthesis)**:
  - **Given** I am on `/#/explain?knot=N4`,
  - **Then** the cloze prompt displays: "When adding fractions with the same bottom number, the denominator ___ and only the numerators ___.",
  - **When** I tap word tile "stays" for blank 1 and "add" for blank 2,
  - **Then** the sentence completes and unlocks "Keep in my Pothi",
  - **And** tapping "Keep in my Pothi" saves the page to Pothi and advances to `/#/stop`.

---

### Story US5 (P1): Calm Pedagogical Invariants & Accessibility
As a 10-year-old child learning quietly,  
I want calm, dignified presentation with zero gamification and full mobile responsiveness.

- **US5-AS1 (Zero Banned Words & Calm Feedback)**:
  - The UI and narrator say must contain zero praise words ("great", "correct", "perfect", "good job", "stars", "points", "streaks").
  - All feedback is descriptive and mathematical.

- **US5-AS2 (Mobile Ergonomics & Keyboard Navigation)**:
  - All touch targets on `#collection` meet minimum $44 \times 44\text{ px}$.
  - The screen is fully operable on 360px and 390px mobile viewports without horizontal clipping.
