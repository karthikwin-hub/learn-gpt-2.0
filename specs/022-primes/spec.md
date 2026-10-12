# Feature Specification: 022 Primes & Composites (Knot F2)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/022-primes -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Be My Multiple, I'll Be Your Factor"), prime numbers are discovered as the indivisible atoms of arithmetic. Children routinely stumble into three major misconceptions:
1. **The Number 1 Fallacy**: Children believe $1$ is a prime number because "it has no other factors", failing to understand the strict mathematical definition: a prime number must have *exactly two distinct factors* ($1$ and itself).
2. **The "Odd Equals Prime" Trap**: Children equate prime with odd, declaring $9, 15, 21, 27$ to be prime because they cannot be halved, overlooking factors like $3$ and $5$.
3. **The "All Even Numbers are Composite" Myth**: Children overlook that $2$ is an even number that is fundamentally prime ($1 \times 2$), making it the solitary even prime in the universe.

### 1.2 Pedagogical Solution in Gurukul
Feature 022 delivers a tactile 7-stage learning journey for Knot **F2 (Primes & Composites)**:
- **Prashna (Opening Prediction)**: How many rectangles can 7 tiles make? (Only 1 straight line $\to 1 \times 7$).
- **Bodha (6 Concept Cards)**:
  - *What*: Some numbers (like 6) make wide and tall mats. Stubborn numbers (like 7 or 13) can only stretch into a single straight line.
  - *Idea*: Prime Numbers have *exactly two distinct factors*: 1 and itself. Composite numbers have more than two.
  - *Why*: The Special Case of 1: Number 1 has only ONE factor (itself), so it is neither prime nor composite. Number 2 is the only even prime!
  - *Worked Example*: Sieve of Eratosthenes up to 30: Striking multiples of 2, 3, 5 revealing primes $\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29\}$.
  - *Where*: Internet banking security encryption; periodic 13- and 17-year cicada insect lifecycles.
  - *Sutra*: *"A prime number makes only one single line: exactly two factors, 1 and itself."*
- **Interactive Workbench (`#primes`)**:
  - *Step 1 (The Single-Line Test)*: Attempts to fold $N$ tiles into multi-row rectangles. Numbers 2, 3, 5, 7 lock into rigid single rows ("Stubborn Prime!").
  - *Step 2 (The Sieve of Eratosthenes Grid)*: 1–50 grid. Selecting "Filter 2s" sweeps even numbers; "Filter 3s" sweeps multiples of 3. Survivor cells illuminate in golden light.
  - *Step 3 (Prime Factor Tree Dissector)*: Decomposes composite numbers like $12 \to 2 \times 2 \times 3$ into prime leaves.
- **Spot the Mistake**: Arjun claims 9 is a prime number because it is odd. Child locates Step 2. Kumkum highlight shows $3 \times 3 = 9$.
- **Explain Back**: Word-tile cloze synthesis: "A prime number has exactly ___ factors. The number 1 is neither prime nor ___." (Tiles: `[two, composite, three, odd]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `F2` on the `guna` thread appears as an active playable knot and navigates to `/#/prashna?k=F2`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks how many rectangles 7 tiles make and accepts "Only 1 line".
- **US2-AS2**: Bodha renders 6 cards explaining stubborn primes, the definition of exactly two factors, the status of 1 and 2, the sieve, and the prime sutra.

### Story US3 (P1): Interactive Primes Workbench (`#primes`)
- **US3-AS1 (Single-Line Rigidity)**: Demonstrates that prime tile counts (7, 11, 13) cannot fold into 2 or more rows without leftovers.
- **US3-AS2 (Sieve Filter Animation)**: Sweeps multiples of 2, 3, 5 on the 1–50 board, illuminating surviving primes.
- **US3-AS3 (Prime Factor Tree)**: Decomposes composite 24 into $2 \times 2 \times 2 \times 3$.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Arjun claiming 9 is prime; child identifies Step 2 ($3 \times 3 = 9$).
- **US4-AS2**: Explain back completes: "A prime number has exactly ___ factors; the number 1 is neither prime nor ___." (Tiles: `[two, composite, one]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; full mobile responsiveness on 360px and 390px.
