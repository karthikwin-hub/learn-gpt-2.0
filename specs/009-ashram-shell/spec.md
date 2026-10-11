# Spec: 009 Gurukul Shell — Full Multi-Subject Ashram, Shalas & Jaal

Status: Approved (via Master Plan) · Feature Branch: `feat/009-ashram-shell`

---

## 1. Context & Motivation
Learn GPT 2.0 (Gurukul) replaces disjoint, math-only interfaces with an integrated multi-subject learning environment modeled after a traditional ashram courtyard:
1. **The Ashram Courtyard (`#/home`)**: The central sanctuary under the Banyan tree connecting the 3 learning houses (Shalas) — Ganita (Mathematics), Vijnana (Science), and Loka (Social studies / World).
2. **Carry-on Card**: When a child stops mid-lesson, the courtyard displays a quiet "Carry on" card that resumes their exact knot and model.
3. **The Shala Looms (`#/shala?s=<subject>`)**: Each subject weaves its knowledge into threads (sutras) and knots (concepts). Unbuilt knots calmly display "Coming soon" without breaking or punishing.
4. **The Jaal Web (`#/jaal`)**: Concepts in reality are not isolated into silos; the Jaal displays cross-subject crossings (e.g. map scale connecting cartography to multiplication; shadows connecting light to planetary spin).
5. **The Stage Bar (`createStageBar`)**: Visual and screen-reader accessible 3-movement rhythm: Shravana (listening / Bodha), Manana (hands-on exploration / workbench), Nididhyasana (deep internalization / explain & reflect).

---

## 2. User Stories & Acceptance Criteria

### Story US1 (P1): Ashram Courtyard & Mid-Lesson Carry-on Card
- **US1-AS1**: Navigating to `#/home` renders the Banyan tree SVG art, subtitle `ashram.intro`, cards for Ganita, Vijnana, and Loka, and links to Jaal, Pothi, and Acharya corner.
- **US1-AS2**: If a lesson was left in flight (`gurukul:continue`), a prominent Carry-on card renders showing knot title, and clicking it resumes the saved knot and route.

### Story US2 (P1): Multi-Subject Shala Looms & Calm Unbuilt Handling
- **US2-AS1**: Navigating to `#/shala?s=ganita`, `#/shala?s=vijnana`, or `#/shala?s=loka` renders the respective subject Loom with threads and sinusoidal thread graphics.
- **US2-AS2**: Tapping an unbuilt knot (e.g. in Vijnana or Loka) shows a calm notification (`home.notInProto`) without error.
- **US2-AS3**: Tapping a playable knot (e.g. M4, M2, D1, G2, S2, L2) records `gurukul:continue` and opens its first step.

### Story US3 (P1): Accessible Stage Bar
- **US3-AS1**: In-lesson screens render the 3-stage breadcrumb bar (`Shravana`, `Manana`, `Nididhyasana`) with `aria-current="step"` and accessible label `stage.label`.
- **US3-AS2**: On workbench screens, "What am I learning?" button is accessible and navigates to the knot's Bodha card.

### Story US4 (P1): Jaal Cross-Subject Connection Web
- **US4-AS1**: Navigating to `#/jaal` renders the triangle SVG joining the 3 Shala nodes with interactive crossing curves.
- **US4-AS2**: Selecting a crossing curve displays the bridge title, conceptual explanation (`jaal.<id>.say`), and knot buttons for both endpoints.

### Story US5 (P1): Calm Pedagogical Invariants & Multilingual Equity
- **US5-AS1**: All shell screens uphold calm pedagogical invariants: zero stars, points, timers, streaks, or praise words.
- **US5-AS2**: Full script purity and string parity across English, Telugu, Hindi, Bengali, and Tamil.
