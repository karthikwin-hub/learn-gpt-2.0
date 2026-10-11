# Feature Specification: 010 Ganita Expansion — Numbers, Fractions & Units (N1, N3, U1)

Feature Branch: `feat/010-ganita-expansion`

## 1. Context & Motivation
Gurukul teaches mathematics to 10-year-olds through tactile conceptual manipulatives.
Following the foundational operations (Multiplication M1–M5, Division D1–D4), Geometry (G1–G5), Sets (S1–S3), and Logic (L1–L4), Feature 010 introduces the core number theory, fractional reasoning, and real-world currency units:
1. **N1 (Lakh & Crore Place Houses)**: Indian numeral system with distinct 2-digit grouping after hundreds (Ones, Thousands, Lakhs, Crores). Children slide numbers into place houses and observe how digits expand by powers of 10.
2. **N3 (Folding Fraction Strips)**: Conceptual strips that fold into halves, fourths, and eighths. Children visually align folds to understand equivalent fractions ($2/4 = 1/2$, $4/8 = 1/2$) without rote formulas.
3. **U1 (Rupee & Paise Grid)**: Indian currency exchange drawer where 100 paise equal ₹1. Children exchange coins (50p, ₹1, ₹2, ₹5, ₹10) and notes (₹20, ₹50, ₹100, ₹500) to understand decimals through real spending manipulatives.

---

## 2. User Stories & Acceptance Scenarios

### User Story 1: Lakh & Crore Place Houses (N1)
Children explore large numbers up to Crores through Indian place-value houses.

- **US1-AS1**: Place value house screen `#place` displays interactive houses for Crores, Lakhs, Thousands, and Ones with proper Indian comma formatting (e.g. `1,25,00,000`).
- **US1-AS2**: Incrementing, decrementing, or sliding digit controls updates the displayed expanded sum and standard Indian numeral format in real-time.
- **US1-AS3**: Resetting or setting a target number highlights the active houses without timers or error buzzers.

### User Story 2: Folding Fraction Strips (N3)
Children interactively fold paper strips to discover equal portions and equivalent fractions.

- **US2-AS1**: Fraction screen `#fractions` renders full length strip ($1$) along with foldable strips ($1/2$, $1/4$, $1/8$, and $1/3$, $1/6$).
- **US2-AS2**: Tapping or dragging fold segments highlights aligned boundary lines to prove equivalence (e.g. two $1/4$ segments match exactly one $1/2$ segment).
- **US2-AS3**: Selecting equivalent parts updates the calm readout showing $a/b = c/d$ with visual strip comparison.

### User Story 3: Rupee & Paise Grid (U1)
Children assemble and exchange Indian currency denominations.

- **US3-AS1**: Money screen `#money` displays currency trays for Paise (50p) and Rupees (₹1, ₹2, ₹5, ₹10 coins and ₹20, ₹50, ₹100, ₹500 notes).
- **US3-AS2**: Adding two 50 paise coins enables an exchange action into a ₹1 coin/note with exact 100p = ₹1 conservation.
- **US3-AS3**: Total amount is clearly displayed in standard ₹ symbol format (e.g. `₹152.50`) without scores, stars, or time pressure.

### User Story 4: Screen Integration & Routing
All three workbenches integrate seamlessly into Gurukul shell and navigation rhythm.

- **US4-AS1**: Navigating from Shala Ganita loom (`/#shala?s=ganita`) tapping N1, N3, or U1 opens the respective workbench directly or through Bodha/Prashna without errors.
- **US4-AS2**: Each workbench displays the accessible Stage bar (`.stage-bar`) with return link to Bodha.

### User Story 5: Calm UX & Multilingual Invariants
The expansion preserves core pedagogical calm and localized scripts.

- **US5-AS1**: Zero gamification: no star counters, score badges, streaks, countdowns, or praise words across all three workbenches.
- **US5-AS2**: Full multilingual rendering across English, Hindi, Telugu, Tamil, and Bengali without corrupt font fallback or untranslated tokens.

---

## 3. Functional Requirements
- **FR-001**: Pure domain `src/domain/math/numbers.ts` handles Indian place-value decomposition up to 99,99,99,999 and formatting with Indian comma placement.
- **FR-002**: Pure domain `src/domain/math/fractions.ts` computes fractional equivalence, common denominators, and strip segment divisions.
- **FR-003**: Pure domain `src/domain/math/money.ts` calculates currency totals in paise, decomposes into minimum denomination counts, and verifies ₹1 = 100p exchanges.
- **FR-004**: Screens `#place`, `#fractions`, `#money` render clean DOM/SVG manipulatives with full touch and keyboard accessibility.
