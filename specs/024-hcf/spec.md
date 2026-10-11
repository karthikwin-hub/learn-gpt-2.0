# Feature Specification: 024 Common Factors & HCF (Knot F4)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Be My Multiple, I'll Be Your Factor"), children combine factor pairs from two different numbers to find their **Highest Common Factor (HCF)**. Children routinely fall into three conceptual traps:
1. **The HCF vs LCM Inversion**: Children confuse factors with multiples, assuming the HCF of 12 and 18 must be a giant number like 36 or 72, rather than a shared divisor $\le \min(12, 18)$.
2. **The "First Common is Enough" Fallacy**: Children identify that 2 divides both 12 and 18 and prematurely declare 2 to be the HCF, failing to continue testing larger divisors up to 6.
3. **The Fraction-Reduction Disconnect**: Children learn to reduce fractions by trial-and-error division (halving, halving again) without realizing that dividing numerator and denominator by their HCF yields the simplest form in a single clean step.

### 1.2 Pedagogical Solution in Gurukul
Feature 024 delivers a tactile 7-stage learning journey for Knot **F4 (Common Factors & HCF)**:
- **Prashna (Opening Prediction)**: What is the largest measuring cup that can measure both 12 L and 18 L of milk exactly? (6 L).
- **Bodha (6 Concept Cards)**:
  - *What*: You have two wooden beams: 12 m and 18 m. You want to cut both into equal pieces with zero scraps.
  - *Idea*: List factors of both numbers. The divisors they share are Common Factors; the greatest of these is the HCF.
  - *Why*: Geometric Tiling: The HCF is the largest tile size that perfectly tiles both lengths. A 6 m piece fits twice into 12 m and 3 times into 18 m!
  - *Worked Example*: Step-by-step reveal: Finding HCF of 16 and 24:
    - Factors of 16: $\{1, 2, 4, 8, 16\}$
    - Factors of 24: $\{1, 2, 3, 4, 6, 8, 12, 24\}$
    - Shared Intersection: $\{1, 2, 4, 8\}$ $\to$ $\text{HCF} = 8$.
  - *Where*: Tiling floors without cutting tiles; simplifying fractions in one step ($\frac{16}{24} \div 8 = \frac{2}{3}$).
  - *Sutra*: *"The highest common factor is the greatest shared divisor that fits both without leftover."*
- **Interactive Workbench (`#hcf`)**:
  - *Step 1 (Venn Factor Sorter)*: Two overlapping rings for numbers $A$ and $B$. Dragging common factors snaps them into the glowing central lens.
  - *Step 2 (The Dual-Rod Tiler)*: Tests tile lengths (2, 3, 6) against parallel rods of length 12 and 18. Shows tile 6 as the largest that leaves zero gap in both.
  - *Step 3 (One-Step Fraction Reducer)*: Demonstrates that dividing top and bottom of $\frac{12}{18}$ by $\text{HCF}(6)$ instantly simplifies to $\frac{2}{3}$.
- **Spot the Mistake**: Tarun finds common factors of 8 and 12 as 2 and stops, declaring $\text{HCF} = 2$. Child locates Step 2. Kumkum highlight reveals 4 as the true HCF.
- **Explain Back**: Word-tile cloze synthesis: "The HCF is the ___ shared divisor that fits both numbers with zero ___." (Tiles: `[largest, remainder, smallest]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `F4` on the `guna` thread appears as an active playable knot and navigates to `/#/prashna?k=F4`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks the largest measuring container for 12 L and 18 L and accepts choice "6 L".
- **US2-AS2**: Bodha renders 6 cards explaining shared factors, geometric beam tiling, worked solution for 16 and 24, and the HCF sutra.

### Story US3 (P1): Interactive HCF Workbench (`#hcf`)
- **US3-AS1 (Venn Overlap Intersection)**: Pulls common factors of 12 and 18 into the central lens, identifying $\{1, 2, 3, 6\}$.
- **US3-AS2 (Dual Rod Tile Fitting)**: Proves visually that tile 6 fits both 12 and 18 with zero overhang.
- **US3-AS3 (Fraction Simplifier)**: Divides $\frac{12}{18}$ by 6 to yield $\frac{2}{3}$.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Tarun stopping at $\text{HCF}=2$ for 8 and 12; child identifies Step 2 (missing larger factor 4).
- **US4-AS2**: Explain back completes: "The HCF is the ___ factor that divides both numbers evenly without leaving any ___." (Tiles: `[largest, remainder, multiple]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; full mobile responsiveness on 360px and 390px.
