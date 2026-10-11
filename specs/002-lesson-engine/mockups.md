# Mockups & Visual Fidelity Protocol: 002 Lesson Engine

**Feature**: `specs/002-lesson-engine`  
**Status**: Draft (Ready for Gate G1 review)  
**Reference Prototype**: `design/prototype/`  
**Target Viewports**: 390×844 (iOS reference) and 360×740 (Android baseline)  
**Languages Captured**: English (`en`), Hindi (`hi`), Tamil (`ta`) in `specs/002-lesson-engine/mockups/` (21 PNGs)  

---

## 1. Screen-by-Screen Visual Inventory

### Screen 1: Prashna (Prediction / Wonder)
- **Route**: `#wonder` (or `#prashna?k=M2`)
- **Captured Mockups**: `specs/002-lesson-engine/mockups/wonder-*.png`
- **Purpose**: Low-stakes question and prediction before any formal concept presentation.
- **Key Elements**:
  1. **Top Bar**: Back button, knot name title (`topbar.title`), Sound toggle, Language picker.
  2. **Question Card** (`.wonder-q`): Clean typography stating the everyday scenario (e.g. "How many tiles will cover this courtyard?").
  3. **Visual Scene / Canvas** (`.wonder-art`): Diagram illustrating the question with concrete dimensions.
  4. **Prediction Slider / Choices** (`.guess-box`): Stepper or range slider where the child picks their estimate.
  5. **Action Button** (`button.btn.primary`): "See how it works" / Continue button activating transition to Bodha.

---

### Screen 2: Bodha (Conceptual Understanding Cards)
- **Route**: `#bodha?k=M2`
- **Captured Mockups**: `specs/002-lesson-engine/mockups/bodha_k_M2-*.png`
- **Purpose**: Learner-paced progression through 5–6 core concept cards.
- **Key Elements**:
  1. **Progress Indicator** (`.bodha-dots`): 6 beads representing the cards (past beads filled in `--thread-soft`, current bead in `--thread`).
  2. **Card Type / Heading**: Card title (e.g. "What we are learning", "The idea", "Why it works", "Worked example", "Where you see it in India", "The Sutra").
  3. **Content Body** (`.bodha-text`): Maximum 3 concise sentences with embedded glossary terms (`[[id|term]]`).
  4. **Diagram Pane** (`.bodha-fig`): SVG interactive diagram explaining the concept visually.
  5. **Glossary Bridge** (`.bridge`): When a term is tapped, displays bilingual bridge card (native definition + English school term + pronunciation).
  6. **Worked Example Stepper**: "Next step" button revealing 1 step at a time with faded scaffolding.
  7. **Sutra Action**: "Keep this sutra" button saving rule into persistent storage.

---

### Screen 3: Darshana (Living Film Player)
- **Route**: `#film` (or `#film?k=M2`)
- **Captured Mockups**: `specs/002-lesson-engine/mockups/film-*.png`
- **Purpose**: Computed SVG animation demonstrating the dynamic concept over continuous time.
- **Key Elements**:
  1. **Stage View** (`.film-stage`): Time-computed SVG scene rendering tiles multiplying into rows and columns.
  2. **Ghost Outline**: When the user drags the model while paused, the scripted state remains visible as a faint outline (`--ghost`).
  3. **Beat Caption** (`.film-hint`): Closed caption displaying current narration text.
  4. **Control Bar** (`.film-bar`):
     - Play/Pause circular button (`button.play-btn`).
     - Bidirectional timeline scrubber (`input[type="range"].scrub`).
     - Beat jump steppers.

---

### Screen 4: Abhyasa (Rubber Rectangle Workbench)
- **Route**: `#rect` (or `#rect?k=M2`)
- **Captured Mockups**: `specs/002-lesson-engine/mockups/rect-*.png`
- **Purpose**: Physical manipulation of area and multiplication through elastic grid handles.
- **Key Elements**:
  1. **Grid Manipulative** (`.area-grid`): Interactive SVG grid with draggable corner handles, keyboard steppers, and row/column coordinate markers.
  2. **Linked Equation Pane**: Shows live multiplication expression ($W \times H = \text{Product}$) updating synchronously in the same frame.
  3. **Instruction Step Bar**: Step indicator transitioning from guided task to free exploration.
  4. **"What am I learning?" Link**: Reopens Bodha cards without discarding grid state.

---

### Screen 5: Spot the Mistake (Metacognitive Reflection)
- **Route**: `#mistake` (or `#mistake?k=M2`)
- **Captured Mockups**: `specs/002-lesson-engine/mockups/mistake-*.png`
- **Purpose**: Identify a common misconception in a pre-solved problem without negative marking.
- **Key Elements**:
  1. **Worked Solution**: Step-by-step problem showing the intentional error.
  2. **Choice Chips**: Clickable steps where the child pinpoints where the logic broke.
  3. **Explanation Reveal**: Constructive visual explanation highlighting why the error occurred using kumkum red strictly as a pointer ("look here").

---

### Screen 6: Explain It Back (Self-Explanation)
- **Route**: `#explain` (or `#explain?k=M2`)
- **Captured Mockups**: `specs/002-lesson-engine/mockups/explain-*.png`
- **Purpose**: Child formulates the rule in their own words or selects sentence stems.
- **Key Elements**:
  1. **Prompt**: "How would you explain this to a friend?"
  2. **Sentence Builders / Stem Selector**: Interactive tokens or voice note recorder allowing explanation synthesis.
  3. **Save to Notebook**: Action saving child's explanation alongside the model snapshot.

---

### Screen 7: A Good Place to Stop (Calm Conclusion)
- **Route**: `#stop` (or `#stop?k=M2`)
- **Captured Mockups**: `specs/002-lesson-engine/mockups/stop-*.png`
- **Purpose**: Calm session exit acknowledging progress and offering return to Ashram.
- **Key Elements**:
  1. **Sutra Summary Card**: Displays the kept aphorism.
  2. **Session Reflection**: Descriptive recap ("You explored 4 area models").
  3. **Return Button**: Primary button navigating back to Ashram courtyard (`#home`).

---

## 2. Deviations from EXPERIENCE.md

Per `DEV_HANDOFF.md` §2.4, the working prototype is the canonical baseline:
1. **Narration & Speech**: Prototype uses browser Web Speech API / synthesized audio fallback with on-screen captions; audio does not require external binary mp3 downloads.
2. **Mistake Screen Scaffolding**: Prototype presents 3 discrete step choices rather than free-form text input to suit 10-year-old accessibility.
3. **Ghost Outline Persistence**: In the prototype Living Film, ghost outline is retained only during pause state and clears when playback resumes to avoid visual clutter.
