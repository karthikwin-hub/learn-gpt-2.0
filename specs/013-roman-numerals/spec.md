# Feature Specification: 013 Roman Numerals (Knot N2)

## 1. Context & Pedagogical Motivation
In Class 5 Mathematics (Theme 1: Numbers), children encounter **Roman Numerals**, an ancient non-positional numeral system. Children frequently stumble on key misconceptions:
1. **Additive Overextension**: Writing 4 as `IIII` or 40 as `XXXX` (violating the 3-repetition rule).
2. **Subtractive Misconceptions**: Writing 8 as `IIX` (subtracting two symbols) or writing 45 as `VL` (thinking 50 - 5 = 45, violating the rule that V, L, D are never subtracted).
3. **Absence of Place Value & Zero**: Assuming Roman numerals have place-value columns or a symbol for zero.

Feature 013 implements a complete, calm, and interactive 7-stage learning journey for Knot **N2 (Roman Numerals)**:
- **Prashna (Opening question)**: Explores how 4 is represented (`IIII` vs `IV`).
- **Bodha (6 Cards)**: 7 fundamental symbols (I, V, X, L, C, D, M), additive vs subtractive rules, historical absence of zero, multi-step assembly of 24 and 45, real-world clocks and book chapters, and the core sutra.
- **Interactive Workbench (`#roman`)**: The Roman Stone Slate where children build numbers tile by tile, understand additive/subtractive mechanics, and test the 3-repetition rule.
- **Spot the Mistake**: Aman attempts to write 45 as `VL`, revealing why V is never subtracted.
- **Explain Back**: Word-tile completion clarifying the subtractive placement and repetition limit.
- **Pothi (Notebook)**: Sutra and child's rule permanently recorded.

---

## 2. User Stories & Acceptance Scenarios

### User Story 1: Ganita Shala Loom Playability
As a learner, I can discover Knot N2 on the Ganita Shala Loom and enter the lesson flow.
- **US1-AS1**: Knot N2 in Ganita Shala is marked playable (filled dot) and enters Prashna on click.

### User Story 2: Prashna Prediction & Bodha Direct Teaching
As a Class 5 child, I want to commit to an initial prediction before learning the rules through structured concept cards.
- **US2-AS1**: Prashna challenges the IIII misconception and accepts IV prediction before advancing to Bodha.
- **US2-AS2**: Bodha renders 6 cards explaining additive and subtractive rules, worked examples, and sutra retention.

### User Story 3: Interactive Slate Workbench (`#roman`)
As a Class 5 child, I want an interactive stone tile workbench to build Roman numerals and see their values update in real time.
- **US3-AS1**: Roman screen `#roman` renders stone slate and symbol tiles.
- **US3-AS2**: Building target numbers updates the slate and advances.
- **US3-AS3**: Subtractive challenge rejects `XXXX` and accepts `XL` for 40.

### User Story 4: Mistake & Explain Back
As a learner, I want to find the error in another student's working and explain the rule in my own words.
- **US4-AS1**: Spot the mistake identifies that V cannot be subtracted.
- **US4-AS2**: Explain back validates `subtracts` and `three` word tiles.

---

## 3. Engineering & Pedagogical Invariants
- Zero npm runtime dependencies. Pure TypeScript + DOM/SVG.
- Calm pedagogical principles: no points, timers, streaks, or red penalty alarms.
- 100% trace coverage and pass across all 11 verification sensors.
