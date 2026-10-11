# Spec: 006 Sets threads (S1–S3), Sorting Courtyard, Venn Union & Intersection

Status: Approved (via Master Plan) · Feature Branch: `feat/006-sets`

---

## 1. Context & Motivation
Sets and classification form the bedrock of logical and mathematical thinking for 10-year-olds. The Sorting Courtyard manipulative visualizes set membership using 12 tangible attribute blocks (shape × colour × size, inspired by Zoltán Dienes' logic blocks) and two movable rope rings (A and B). Children physically experience:
1. Intersection ($A \cap B$, "and"): blocks satisfying both conditions.
2. Union ($A \cup B$, "or"): blocks satisfying either condition.
3. Complement ($U \setminus (A \cup B)$, "not"): blocks outside both rings.
4. Subsets and Disjoint sets: dragging rings apart leaves intersection blocks "homeless" (highlighted gently with kumkum red), while placing one ring inside another demonstrates subset relations.
5. Mystery induction ($S3$): observing placed blocks and deducing the hidden rules.

---

## 2. User Stories & Acceptance Criteria

### Story US1 (P1): S2 Sorting Courtyard — 2-Ring Venn Sorting
- **US1-AS1**: Navigating to `#/sets` renders the Sorting Courtyard with 12 attribute blocks, universe boundary $U$, and two rope rings (Ring A: indigo, default 'yellow'; Ring B: teal, default 'circle') in overlapping layout.
- **US1-AS2**: Blocks animate smoothly into their classified regions (`both`, `a`, `b`, `none`). The counts card reflects the exact distribution ($A \cap B$, $A \setminus B$, $B \setminus A$, neither).
- **US1-AS3**: Tapping a ring's rule chip cycles it to the next valid rule in `RULE_ORDER` (`yellow`, `circle`, `big`, `green`, `triangle`, `small`, `square`, `black`), causing blocks to re-sort dynamically.
- **US1-AS4**: Selecting word chips (`and`, `or`, `not`) highlights the corresponding geometric region with soft saffron fill and updates the explanatory statement.
- **US1-AS5**: Selecting layout chips (`overlap`, `apart`, `inside`) re-positions the rings. In `apart` mode, any block requiring both attributes becomes homeless and is outlined in kumkum with a calm count note.

### Story US2 (P1): S3 Mystery Rule Guessing
- **US2-AS1**: Navigating to `#/sets?mode=guess` hides ring labels (`?`) and initiates mystery mode with hidden rules (default 'green' and 'big').
- **US2-AS2**: Selecting rule chips for Ring A and Ring B evaluates the candidate hypothesis against the actual block placements.
- **US2-AS3**: If the guessed rules correctly partition the 12 blocks, calm acknowledgement (`sets.solved`) is displayed. If incorrect, calm feedback shows how many blocks would move (`sets.wouldMove`).

### Story US3 (P2): Bodha Concept Cards for S2 & S3
- **US3-AS1**: Visiting `#/bodha?k=S2` renders 6 concept cards with `renderS2Rings` diagram displaying two overlapping rings (Ring A: yellow, Ring B: circle) and attribute blocks.
- **US3-AS2**: Worked example steps reveal progressive block additions into regions.
- **US3-AS3**: Visiting `#/bodha?k=S3` opens the S3 concept card sequence explaining mystery rule deduction.

### Story US4 (P2): S1 Sorting Foundations Curriculum Integration
- **US4-AS1**: Lesson registry registers S1, S2, and S3 with 6-card Bodha sequence and Explain fill-in-the-blank questions.
- **US4-AS2**: Shala Loom displays knots S1, S2, and S3 with bench links to `#/sets`.

### Story US5 (P1): Calm Invariants & Multilingual Equity
- **US5-AS1**: Feedback maintains calm pedagogical invariants: zero stars, points, badges, timers, streaks, or praise words.
- **US5-AS2**: All UI strings render with complete parity across English, Telugu, Hindi, Tamil, and Bengali.
- **US5-AS3**: In-place language toggling preserves current rules, ring positions, and selected highlights without resetting state.
