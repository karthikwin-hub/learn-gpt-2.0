# Spec: 007 Logic threads (L1–L4), Marble Gates & Truth Tables

Status: Approved (via Master Plan) · Feature Branch: `feat/007-logic`

---

## 1. Context & Motivation
Mathematical logic for 10-year-olds turns abstract formalisms into physical cause-and-effect. The Marble Machine manipulative transforms boolean logic gates (`AND`, `OR`, `NOT`) into gravity-fed marble tracks with binary doors. Children physically observe:
1. Conjunction ($A \land B$, AND): Marble passes Door A, then meets Door B. Both must be open to reach the YES basin; either closed drops into NO.
2. Disjunction ($A \lor B$, OR): Marble checks Door A; if open it lands in YES, if shut it rolls across to Door B.
3. Negation ($\neg A$, NOT): An open Door A dumps the marble into NO; a closed Door A deflects it into YES.
4. Truth Tables: Every drop creates physical residue and fills one row of the truth table.
5. Induction / Mystery Gates: The machine is covered, and child determines whether it is AND, OR, or NOT by filling out the table.

Curriculum progression:
- L1: True / False, Negation (Not)
- L2: AND and OR marble gates
- L3: All vs Some (universal vs existential quantifiers)
- L4: If-then implication (domino causality)

---

## 2. User Stories & Acceptance Criteria

### Story US1 (P1): L2 Marble Machine — Gates AND, OR, NOT
- **US1-AS1**: Navigating to `#/logic` renders the Marble Machine manipulative with default AND gate, Door A open, Door B shut, hopper, track network, and YES/NO basins.
- **US1-AS2**: Clicking Door A or Door B toggles door state between `open` and `shut` with updated visual door openings.
- **US1-AS3**: Clicking the Drop Marble button animates the marble down the permitted track route into YES or NO basin, leaves a visible path residue line, and updates the basin marble count.
- **US1-AS4**: Dropping a marble records the corresponding row in the dynamic truth table; completed rows show `yes` or `no`, and unattempted rows show `?`.
- **US1-AS5**: Switching gate chips (`and`, `or`, `not`) reconfigures track routes and resets basin counts; NOT gate hides Door B and renders a 2-row truth table.

### Story US2 (P1): Mystery Gate Deduction Mode
- **US2-AS1**: Selecting the `mystery` chip places a dashed cover with `?` over the tracks, hiding the gate type.
- **US2-AS2**: Toggling doors and dropping marbles populates the truth table rows without revealing the internal track layout.
- **US2-AS3**: When all rows are tested, gate candidate chips appear (`and`, `or`, `not`). Selecting the correct gate unveils the cover and displays calm confirmation (`logic.solved`). An incorrect guess displays calm encouragement (`logic.notThat`).

### Story US3 (P2): Bodha Concept Cards for L1–L4
- **US3-AS1**: Visiting `#/bodha?k=L2` renders 6 concept cards with `renderL2Gate` diagram illustrating the marble gate and cross-sectional tracks.
- **US3-AS2**: Step progression in example cards shows marble movement along the gate route.
- **US3-AS3**: Visiting `#/bodha?k=L1`, `#/bodha?k=L3`, `#/bodha?k=L4` provides concept cards with diagrams for negation, all vs some, and implication.

### Story US4 (P2): Shala Loom Curriculum Integration
- **US4-AS1**: Lesson registry registers L1, L2, L3, and L4 with complete Bodha sequences and Explain fill-in-the-blank questions.
- **US4-AS2**: Shala Loom displays knots L1 to L4 in the Tarka thread with bench links to `#/logic`.

### Story US5 (P1): Calm Invariants & Multilingual Equity
- **US5-AS1**: Feedback maintains calm pedagogical invariants: zero stars, points, badges, timers, streaks, or praise words.
- **US5-AS2**: All UI strings render with complete parity across English, Telugu, Hindi, Tamil, and Bengali.
- **US5-AS3**: In-place language toggling preserves current gate type, door states, and truth table history without resetting.
