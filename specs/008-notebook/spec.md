# Spec: 008 Pothi (Notebook), Recall & Grown-ups (Acharya Corner)

Status: Approved (via Master Plan) · Feature Branch: `feat/008-notebook`

---

## 1. Context & Motivation
In Learn GPT 2.0 (Gurukul), the Notebook (Pothi) replaces points, stars, scores, and badges. Instead of gamified extrinsic motivators, the child's learning artifact is their own sacred notebook containing the ideas they explained in their own words, accompanied by miniature SVG illustrations of the concrete mathematical models they manipulated.

Key pillars:
1. **Sacred Notebook (Pothi)**: Every completed Nididhyasana explanation creates a persistent notebook page with a thumbnail of the physical model, newest pages first.
2. **Multilingual Replay**: Sentences are persisted as abstract tile choices (`fills: ['tens', 'room', 'add']`), enabling immediate, seamless re-reading in any of the 5 Indic languages when the learner switches language.
3. **Model State Reopening**: Tapping a notebook page re-opens the corresponding workbench restoring the exact physical state (e.g. grid dimensions, drum beats, peg positions, marble gates).
4. **Interleaved Spaced Recall (`src/domain/curriculum/recall.ts`)**: Pure domain logic selecting past knots for gentle return prompts, preventing cramming through spaced retrieval.
5. **Grown-ups Acharya Corner**: An adult section protected by a 2-finger physical hold (rather than a math question, which 10-year-olds easily solve). Shows the child's sentences from the past week, explains the calm pedagogy, guarantees 100% on-device privacy (DPDP Act 2023), and provides a two-tap "Erase everything" failsafe.

---

## 2. User Stories & Acceptance Criteria

### Story US1 (P1): Pothi Notebook Screen
- **US1-AS1**: Navigating to `#/notebook` renders the Notebook screen with title `notebook.title` and intro text `notebook.intro`.
- **US1-AS2**: When pages exist in storage, they are displayed newest first, each showing:
  - SVG model thumbnail (`thumb`) reflecting the knot's model state.
  - Knot title (`knot.<thread>.t`) and formatted date label.
  - Reconstructed sentence from tile fills.
- **US1-AS3**: Tapping any notebook page navigates to that knot's workbench route and restores the saved model parameters.
- **US1-AS4**: If kept sutras exist in `sutras` storage, a "Kept Sutras" section displays cards that jump to `#/bodha?k=<id>`.
- **US1-AS5**: When no pages exist, an illustrative sample card (M4 tens room) is shown with empty notice `notebook.empty` and a link button to the Loom.

### Story US2 (P1): Sentence Preservation & Multilingual Replay
- **US2-AS1**: Explain screen allows filling sentence blanks with chips and saves page record to `gurukul:pages` on clicking "Keep" (`explain.keep`).
- **US2-AS2**: A page saved while in English displays in Telugu, Hindi, Bengali, or Tamil immediately when the language is switched, with correct localized vocabulary.
- **US2-AS3**: Sentences maintain grammar-safe phrasing across all 5 languages without broken tokens.

### Story US3 (P1): Spaced Recall Generation (Domain)
- **US3-AS1**: Pure domain function `generateReturnQuestions(history, options)` in `src/domain/curriculum/recall.ts` accepts completion history and identifies candidate knots for spaced retrieval.
- **US3-AS2**: Knots completed > 1 day ago or with fewer reviews are prioritized over recently completed knots.
- **US3-AS3**: When history is empty or has only one knot, generator provides a calm starter prompt without crashing.

### Story US4 (P1): Stop Screen Closure & Reflection
- **US4-AS1**: Stop screen (`#/stop`) displays calm closure heading `stop.heading`, "what was understood" summary `know.<thread>`, and child's own sentence.
- **US4-AS2**: Includes the knot's central sutra line `bodha.<thread>.sutra`.
- **US4-AS3**: Features a calm return button to the Loom (`stop.loom`) with zero timer pressure or score badges.

### Story US5 (P1): Grown-ups Acharya Corner & Safety
- **US5-AS1**: Grown-ups screen (`#/grownups`) defaults to locked state requiring holding both dots simultaneously for 2 seconds.
- **US5-AS2**: In touch environments, pressing only one dot does not trigger progress and does not unlock.
- **US5-AS3**: Once unlocked, displays weekly review card (`grown.week`) listing sentences composed by the child over the last 7 days.
- **US5-AS4**: Settings controls allow toggling Voice Speed (slow vs normal), Captions, Night Mode, and Language.
- **US5-AS5**: Tapping "Erase everything" once turns button to red confirmation state (`grown.resetConfirm`); data is only cleared when tapped a second time.
