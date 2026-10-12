# Feature Specification: 023 Divisibility Tests (Knot F3)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/014-collection-fractions -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (NCERT: "Playing with Numbers"), children learn divisibility rules to test large numbers without tedious long division. Children routinely fall into three major errors:
1. **The Last-Digit Overgeneralization**: Children know that $2, 5, 10$ depend on the last digit, so they erroneously apply the same rule to $3$ and $9$, declaring that $43$ or $73$ is divisible by $3$ because "it ends in $3$".
2. **Magical Ritual without Place-Value Insight**: Children memorize "add the digits for 3" as an arbitrary superstition without understanding *why* base-ten powers leave a remainder of 1 ($10 = 9+1, 100 = 99+1$), leaving them unable to adapt the rule.
3. **The Multi-Factor Gap for 6**: Children forget that composite divisors like $6$ require passing two simultaneous conditions: being even (divisible by 2) AND having a digit sum divisible by 3.

### 1.2 Pedagogical Solution in Gurukul
Feature 023 delivers a tactile 7-stage learning journey for Knot **F3 (Divisibility Tests)**:
- **Prashna (Opening Prediction)**: Is $5,232$ divisible by 3 without performing long division? (Yes, because digit sum $12$ divides by 3).
- **Bodha (6 Concept Cards)**:
  - *What*: You don't need long division to know if 4,125 divides by 5; our base-ten system hides quick secrets.
  - *Idea*: Two rule families: Last-digit checks ($2, 5, 10$) and Digit-sum checks ($3, 9$).
  - *Why*: Why the 3-rule works: $10 = 9+1, 100 = 99+1, 1000 = 999+1$. The $9$s are already divisible by 3; only the loose $+1$s from each place need to be summed!
  - *Worked Example*: Testing $5,232 \to 5 + 2 + 3 + 2 = 12 \to 12 \div 3 = 4$ (Yes!). Testing for $9 \to 12 \div 9$ has remainder (No!).
  - *Where*: Bank account checksums; verifying packaging batch counts without unpacking.
  - *Sutra*: *"For 2, 5, 10 inspect the last digit; for 3 and 9 add all digits together."*
- **Interactive Workbench (`#divisibility`)**:
  - *Step 1 (The Last-Digit Gate)*: Scans numbers through 2, 5, 10 test filters, highlighting the units place.
  - *Step 2 (The Digit-Sum Unfolder)*: Expands multi-digit numbers (e.g. 5,232) into digit tiles, sweeps them into a sum balance beam, and checks against 3 and 9.
  - *Step 3 (Dual-Test Gateway for 6)*: Tests numbers against both the 2-gate (even) and 3-gate (digit sum), unlocking the 6-shield only if both lights turn green.
- **Spot the Mistake**: Mona says 43 is divisible by 3 because it ends in 3. Child locates Step 2. Kumkum highlight shows $4 + 3 = 7$, which is not divisible by 3.
- **Explain Back**: Word-tile cloze synthesis: "To test if a number divides by 3, we add its ___: if their sum divides by 3, the whole number ___." (Tiles: `[digits, divides, last]`).
- **Pothi (Notebook)**: Sutra and student's completed rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Ganita Shala Loom Playability
- **US1-AS1**: Knot `F3` on the `guna` thread appears as an active playable knot and navigates to `/#/prashna?k=F3`.

### Story US2 (P1): Prashna Prediction & Bodha Concept Cards
- **US2-AS1**: Prashna asks if $5,232$ divides by 3 and accepts choice "Yes".
- **US2-AS2**: Bodha renders 6 cards explaining last-digit rules, why digit sums work, the worked test for 5,232, and the divisibility sutra.

### Story US3 (P1): Interactive Divisibility Workbench (`#divisibility`)
- **US3-AS1 (Last-Digit Filter Scanner)**: Validates divisibility by 2, 5, 10 by highlighting the units digit.
- **US3-AS2 (Digit-Sum Balance Beam)**: Animates expanding 5,232 into $5+2+3+2=12$ and validates against 3 and 9.
- **US3-AS3 (Composite Rule for 6)**: Validates that 5,232 is even and sums to 12, successfully passing divisibility by 6.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake shows Mona claiming 43 divides by 3; child identifies Step 2 (confusing last digit with sum).
- **US4-AS2**: Explain back completes: "For 3 and 9, we must add all the ___ together to test the ___." (Tiles: `[digits, sum, last]`).

### Story US5 (P1): Calm Pedagogical Invariants
- **US5-AS1**: Zero gamification; full mobile responsiveness on 360px and 390px.
