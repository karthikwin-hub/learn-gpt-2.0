# Feature Specification: 015 Tenths and Hundredths (Knot N5)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Tenths and Hundredths"), children meet decimals as base-ten fractional place values. Children routinely suffer from three stubborn misconceptions:
1. **The Longer-is-Larger Trap**: Children transfer whole-number intuition directly to decimals, declaring that $0.15 > 0.5$ because $15 > 5$, or that $0.125 > 0.4$.
2. **The Magnitude-of-Zero Misconception**: Children believe writing a trailing zero ($0.50$) multiplies the number by 10 (as it does in whole numbers $5 \to 50$), failing to realize that $0.5$ (5 tenths) and $0.50$ (50 hundredths) represent the exact same continuous area.
3. **The Leading-Digit Confusion**: Children compare $0.09$ and $0.4$ and declare $0.09$ larger because 9 is greater than 4, ignoring the empty tenths column.

### 1.2 Pedagogical Solution in Gurukul
Feature 015 delivers a tactile 7-stage learning journey for Knot **N5 (Tenths and Hundredths)**:
- **Prashna (Opening Prediction)**: Asks whether a pencil measuring $0.4\text{ cm}$ or a beetle measuring $0.09\text{ cm}$ is longer, confronting the 9-versus-4 illusion before Bodha cards appear.
- **Bodha (6 Concept Cards)**:
  - *What*: Rulers between centimeters have millimeter ticks. We zoom in ten times.
  - *Idea*: The decimal point separates wholes from parts. The first house counts tenths ($\frac{1}{10}$, strips); the second counts hundredths ($\frac{1}{100}$, single tiles).
  - *Why*: Place value rules continue to the right: each house is ten times smaller. 5 tenths equals 50 hundredths. Five full strips ($0.5$) clearly exceed 1 strip and 5 tiles ($0.15$).
  - *Worked Example*: Step-by-step reveal: Decomposing $1.35\text{ m}$ into 1 full meter $+ 3\text{ tenths } (30\text{ cm}) + 5\text{ hundredths } (5\text{ cm})$.
  - *Where*: Digital clinical thermometers ($37.2^\circ\text{C}$); Olympic 100m sprint photo-finish timers ($9.58\text{ s}$).
  - *Sutra*: *"Each step past the dot is ten times smaller: compare the tenths house first, not how many digits you see."*
- **Interactive Workbench (`#decimals`)**:
  - *Step 1 (Explore the 100-Grid)*: A $10 \times 10$ base-ten grid where clicking vertical columns shades tenths ($0.1$) and individual tiles shades hundredths ($0.01$). Readout dynamically updates fraction ($\frac{45}{100}$) and decimal ($0.45$).
  - *Step 2 (Side-by-Side Decimal Duel)*: Places two $10 \times 10$ grids side-by-side (e.g. $0.5$ vs $0.15$, $0.4$ vs $0.09$). The visual height of shaded strips immediately clarifies magnitude.
  - *Step 3 (Trailing Zero Conservation)*: Toggles $0.5$ to $0.50$, proving to the child that no extra area is shaded or removed.
- **Spot the Mistake**: Priya claims $0.15 > 0.7$ because 15 is larger than 7. Step 2 compares digit counts instead of tenths columns. Kumkum focal point shows 7 tenths towering over 1 tenth.
- **Explain Back**: Word-tile cloze synthesis reinforcing that the first digit past the dot counts tenths, and place value determines size.
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
As a learner in Ganita Shala,  
I want Knot N5 to appear as playable on the Sankhya thread,  
So that I can enter the decimals lesson from the Loom.

- **US1-AS1 (Loom Playability & Navigation)**:
  - **Given** I am on Ganita Shala (`/#/shala?s=ganita`),
  - **When** I look at the `sankhya` thread,
  - **Then** Knot `N5` displays as an active playable dot with title "Tenths and hundredths",
  - **And** clicking `N5` navigates to `/#/prashna?k=N5`.

---

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
As a child learning decimals,  
I want to predict whether $0.4\text{ cm} > 0.09\text{ cm}$ and learn through 6 structured visual cards,  
So that I understand decimal place values before using the manipulative.

- **US2-AS1 (Prashna Commitment)**:
  - **Given** I am on `/#/prashna?k=N5`,
  - **Then** the title displays "Which is longer: 0.4 cm or 0.09 cm?",
  - **When** I select choice "0.4 cm",
  - **Then** the "Understand it" button enables,
  - **And** clicking "Understand it" navigates to `/#/bodha?k=N5`.

- **US2-AS2 (Bodha Cards & Step-by-Step Reveal)**:
  - **Given** I view `/#/bodha?k=N5`,
  - **Then** Card 1 (`what`) shows ruler zoom,
  - **And** Card 2 (`idea`) illustrates the $10 \times 10$ grid strips and tiles,
  - **And** Card 3 (`why`) explains why $0.5 = 50\text{ hundredths} > 0.15$,
  - **And** Card 4 (`example`) reveals the worked decomposition of $1.35$ in 3 steps,
  - **And** Card 5 (`where`) connects decimals to stopwatches and thermometers,
  - **And** Card 6 (`sutra`) presents the decimal comparison sutra,
  - **And** tapping "To the workbench" navigates to `/#/decimals`.

---

### Story US3 (P1): Interactive Decimals Workbench (`#decimals`)
As a child,  
I want an interactive hundred-grid where I can fill strips and tiles and compare decimals side by side,  
So that I see with my own eyes why place value decides size.

- **US3-AS1 (Step 1: Shading Tenths & Hundredths)**:
  - **Given** I navigate to `/#/decimals`,
  - **Then** the screen renders a clean $10 \times 10$ hundred-grid,
  - **When** I click the "+0.1" strip button 3 times and "+0.01" tile button 4 times,
  - **Then** 3 full columns and 4 individual tiles shade with leaf green fill,
  - **And** the equation card displays $0.34 = \frac{34}{100} = 3\text{ tenths} + 4\text{ hundredths}$.

- **US3-AS2 (Step 2: Side-by-Side Comparison Challenge)**:
  - **Given** Step 2 of `#decimals` comparing $0.5$ and $0.15$,
  - **Then** Grid A shows 5 full columns ($50$ squares) and Grid B shows 1 column and 5 squares ($15$ squares),
  - **And** the live comparison badge confirms $0.5 > 0.15$ with calm text: "5 tenths is 50 hundredths; 50 is more than 15."

- **US3-AS3 (Step 3: Trailing Zero Conservation)**:
  - **Given** Step 3 of `#decimals` showing $0.5$ on the hundred-grid,
  - **When** I tap the "Add trailing zero (0.50)" button,
  - **Then** the decimal display changes from $0.5$ to $0.50$,
  - **And** the shaded area on the grid remains identical,
  - **And** the narrator confirms: "5 tenths and 50 hundredths cover the exact same space."

---

### Story US4 (P1): Spot the Mistake & Explain Back
As a learner,  
I want to identify Priya's mistake when she claimed $0.15 > 0.7$ and explain the rule in my own words.

- **US4-AS1 (Spotting Decimal Length Fallacy)**:
  - **Given** I am on `/#/mistake?knot=N5`,
  - **Then** Priya's 4 steps are shown:
    - Step 1: "We want to compare 0.7 and 0.15."
    - Step 2: "Look at the numbers after the dot: 7 and 15."
    - Step 3: "15 is bigger than 7."
    - Step 4: "So 0.15 is greater than 0.7."
  - **When** I tap Step 2,
  - **Then** Step 2 receives the kumkum highlight,
  - **And** the explanation states: "0.7 has 7 tenths (70 hundredths), while 0.15 has only 1 tenth. Compare the tenths house first.",
  - **And** the "Explain it" button unlocks.

- **US4-AS2 (Explain Back Synthesis)**:
  - **Given** I am on `/#/explain?knot=N5`,
  - **Then** the cloze sentence displays: "The first digit after the dot counts ___, and decimal size is decided by ___ not digit length.",
  - **When** I tap word tiles "tenths" and "place",
  - **Then** the sentence completes and unlocks "Keep in my Pothi",
  - **And** tapping advances to `/#/stop`.

---

### Story US5 (P1): Calm Invariants & Accessibility
- **US5-AS1**: Zero gamified praise words or penalty buzzers.
- **US5-AS2**: Fully operable on 360px and 390px mobile viewports.
