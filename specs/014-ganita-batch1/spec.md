# Feature Specification: 014 Ganita Expansion Batch 1 (N4, N5, A1, A2)

## 1. Context & Pedagogical Motivation
In Class 5 Mathematics (NCERT: "Parts and Wholes", "Tenths and Hundredths", and "Number Operations"), children transition from single-unit models to multi-unit sets, decimal fractions, and multi-digit arithmetic.
Children frequently stumble on four deep misconceptions:
1. **N4 (Fractions of a Collection)**: Adding denominators when adding like fractions ($\frac{1}{4} + \frac{2}{4} = \frac{3}{8}$), or counting total objects rather than equal group partitions.
2. **N5 (Tenths and Hundredths)**: Thinking longer decimals are larger ($0.15 > 0.5$ because $15 > 5$) or that $0.08 > 0.2$ because 8 is larger than 2.
3. **A1 (Adding & Subtracting Big Numbers)**: Subtracting smaller from larger regardless of position ($502 - 138 \to 2 - 8 = 6$), and getting lost borrowing across multiple zeroes.
4. **A2 (Estimate First)**: Calculating blindly and missing answers that are off by a factor of 10 or 100, instead of anchoring with friendly benchmarks first.

Feature 014 delivers 4 complete 7-stage interactive lessons:
- **N4 (Fractions of a Collection)**: Prashna $\to$ Bodha (6 cards) $\to$ Workbench (`#collection`) $\to$ Mistake $\to$ Explain $\to$ Pothi.
- **N5 (Tenths and Hundredths)**: Prashna $\to$ Bodha (6 cards) $\to$ Workbench (`#decimals`) $\to$ Mistake $\to$ Explain $\to$ Pothi.
- **A1 (Regrouping Big Numbers)**: Prashna $\to$ Bodha (6 cards) $\to$ Workbench (`#regroup`) $\to$ Mistake $\to$ Explain $\to$ Pothi.
- **A2 (Estimate First)**: Prashna $\to$ Bodha (6 cards) $\to$ Workbench (`#estimate`) $\to$ Mistake $\to$ Explain $\to$ Pothi.

---

## 2. User Stories & Acceptance Scenarios

### User Story 1: Ganita Shala Loom Playability for Batch 1
As a learner in Ganita Shala, I can access N4, N5, A1, and A2 as playable knots on the Loom.
- **US1-AS1**: Knots N4, N5, A1, and A2 appear as playable filled dots in Ganita Shala and navigate to their respective 7-stage flows upon tapping.

### User Story 2: Knot N4 — Fractions of a Collection (`#collection`)
As a Class 5 child, I want to divide groups of objects into equal piles and understand how to add like fractions without changing the denominator.
- **US2-AS1**: Prashna challenges whether $\frac{1}{3}$ of 12 is 3 or 4, and Bodha renders 6 cards explaining group denominators and like-fraction addition.
- **US2-AS2**: Collection workbench `#collection` allows dividing tokens into equal rings and adding like fraction portions.
- **US2-AS3**: Spot the Mistake for N4 identifies the error of adding denominators ($\frac{2}{5} + \frac{1}{5} = \frac{3}{10}$), and Explain Back reinforces that the denominator stays unchanged.

### User Story 3: Knot N5 — Tenths and Hundredths (`#decimals`)
As a Class 5 child, I want to explore decimal tenths and hundredths visually so I understand that place value determines size, not digit length.
- **US3-AS1**: Prashna asks whether $0.4\text{ cm} > 0.09\text{ cm}$, and Bodha renders 6 cards explaining tenths, hundredths, and place value.
- **US3-AS2**: Decimals workbench `#decimals` provides a $10 \times 10$ hundred-grid to compare decimals and visually prove that $0.5 = 0.50 > 0.15$.
- **US3-AS3**: Spot the Mistake for N5 identifies the error of claiming $0.15 > 0.7$, and Explain Back reinforces tenths and hundredths.

### User Story 4: Knot A1 — Adding & Subtracting Big Numbers (`#regroup`)
As a learner, I want to understand regrouping across columns and zeroes as exchanging 1 unit of a higher house for 10 units of the neighboring house.
- **US4-AS1**: Prashna challenges borrowing across zeroes in $500 - 247$, and Bodha renders 6 cards explaining columnar unbundling.
- **US4-AS2**: Regroup workbench `#regroup` demonstrates unbundling 1 higher bead/unit into 10 lower units across place houses.
- **US4-AS3**: Spot the Mistake for A1 identifies subtracting smaller from larger in ones column ($704 - 358 = 454$), and Explain Back validates borrowing rules.

### User Story 5: Knot A2 — Estimate First (`#estimate`)
As a learner, I want to estimate with friendly round numbers before calculating so I can catch wild calculation mistakes.
- **US5-AS1**: Prashna challenges estimating $48 \times 98$ before calculating, and Bodha renders 6 cards on friendly benchmarks.
- **US5-AS2**: Estimation workbench `#estimate` provides a visual number line that snaps numbers to the nearest 10 or 100 with error guardrails.
- **US5-AS3**: Spot the Mistake for A2 catches an order-of-magnitude error ($21 \times 39 = 8190$), and Explain Back reinforces rounding first.

---

## 3. Engineering & Pedagogical Invariants
- Zero npm runtime dependencies. Pure TypeScript + DOM/SVG.
- Calm pedagogical principles: no points, timers, streaks, or red penalty alarms.
- 100% trace coverage and pass across all 11 verification sensors.
