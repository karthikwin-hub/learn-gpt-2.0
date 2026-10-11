# Mockups & Visual Fidelity Protocol: 003 Multiplication Threads (M1–M5)

**Feature**: `specs/003-multiplication`  
**Status**: Draft (Ready for Gate G1 review)  
**Reference Prototype**: `design/prototype/` (`#wonder`, `#film`, `#rect`, `#drums`, `#mistake`, `#bodha?k=M4`, `#bodha?k=M5`)  
**Target Viewports**: 390×844 (iOS reference) and 360×740 (Android baseline)  
**Languages Captured**: English (`en`), Bengali (`bn` - Indic rotation for 003), Hindi (`hi`) in `specs/003-multiplication/mockups/` (21 PNGs)  

---

## 1. Screen-by-Screen Visual Inventory

### Screen 1: Prashna — Courtyard Prediction (M2 Wonder)
- **Route**: `#wonder?k=M2`
- **Captured Mockups**: `specs/003-multiplication/mockups/wonder-*.png`
- **Purpose**: Low-stakes estimation of courtyard tiles before formal concept instruction.
- **Key Visual Elements**:
  1. **Top Bar**: Back navigation (`←`), knot title, theme button, audio toggle, language switcher.
  2. **Scenario Title & Card** (`.wonder-q`): Clean typography: "How many tiles will cover this courtyard?"
  3. **Visual Courtyard Scene** (`.wonder-art`): SVG illustration showing a courtyard framed by 6 tiles across and 4 tiles down.
  4. **Guess Input** (`.guess-box`): Accessible range slider or stepper to select prediction without penalty.
  5. **Action Button** (`button.btn.primary`): "See how it works", seamlessly transitioning to Darshana (Living Film).

---

### Screen 2: Bodha — Cut the Rectangle Cards (M4 Bodha)
- **Route**: `#bodha?k=M4`
- **Captured Mockups**: `specs/003-multiplication/mockups/bodha_k_M4-*.png`
- **Purpose**: Learner-paced progression through 6 conceptual cards explaining how cutting into tens and ones avoids the cross-term trap.
- **Key Visual Elements**:
  1. **Progress Beads** (`.bodha-dots`): 6 beads marking card progress (past cards soft, active card filled in `--thread`).
  2. **Stage Bar**: Highlights current stage (`shravana`).
  3. **Card Header & Text** (`.bodha-text`): Concise explanation (e.g. "To multiply big numbers like 23 × 14, we cut the rectangle into easy pieces") with tappable glossary terms (`[[room|rooms]]`).
  4. **Interactive SVG Rooms Diagram** (`.bodha-fig`):
     - Card 1 (What): Uncut $23 \times 14$ grid outline.
     - Card 2 (Idea): Cut into 4 colored rooms ($20 \times 10, 3 \times 10, 20 \times 4, 3 \times 4$).
     - Card 3 (Why): Shows partial products $200 + 30 + 80 + 12 = 322$.
     - Card 4 (Example): Worked example for $17 \times 12$ revealed one step at a time ($100, 70, 20, 14 \to 204$).
  5. **Glossary Bridge Card**: Tapping a term reveals native definition, English school term, and pronunciation.
  6. **Sutra Retention**: Card 6 includes "Keep this sutra" button saving the aphorism into persistent storage.

---

### Screen 3: Bodha — Two Drummers Cards (M5 Bodha)
- **Route**: `#bodha?k=M5`
- **Captured Mockups**: `specs/003-multiplication/mockups/bodha_k_M5-*.png`
- **Purpose**: Concept cards explaining multiples and common multiples as overlapping tala cycles.
- **Key Visual Elements**:
  1. **Progress Beads** (`.bodha-dots`): 6 beads.
  2. **Card Content**: Explains how drummers beating every 3 and 4 beats hit together on multiples in both lists.
  3. **SVG Beat Line Diagram** (`.bodha-fig`):
     - Beat marks 1 to 12.
     - Indigo dots for Drummer A ($3, 6, 9, 12$).
     - Teal dots for Drummer B ($4, 8, 12$).
     - Thread outline enclosing beat 12 as the common meeting point.
  4. **Worked Example Stepper**: Steps through multiples of 4 ($4, 8, 12, 16, 20, 24$), multiples of 6 ($6, 12, 18, 24$), and highlights 12 as the first meeting (LCM).

---

### Screen 4: Darshana — Living Film (M2 Floor)
- **Route**: `#film?k=M2`
- **Captured Mockups**: `specs/003-multiplication/mockups/film-*.png`
- **Purpose**: Continuous visual time demonstration of tiles multiplying into rows and stacking into total area.
- **Key Visual Elements**:
  1. **Film Stage** (`.film-stage`): Time-computed SVG canvas rendering unit tiles, row filling, and factor labels.
  2. **Bidirectional Timeline Scrubber** (`input[type="range"].scrub`): Allows continuous scrubbing forward and backward.
  3. **Play/Pause Control** (`button.play-btn`): Auto-pauses at the end of each narrative beat.
  4. **Beat Caption** (`.film-hint`): Subtitles narration in the child's chosen language.
  5. **Interactive Exploration on Pause**: Dragging the corner handle while paused shows the live altered model alongside faint ghost outlines (`--ghost`).

---

### Screen 5: Abhyasa — Rubber Rectangle Workbench (M4 Workbench)
- **Route**: `#rect?k=M4`
- **Captured Mockups**: `specs/003-multiplication/mockups/rect-*.png`
- **Purpose**: Guided and independent manipulation of the area grid, cutting at tens, and folding into the column method.
- **Key Visual Elements**:
  1. **Interactive Area Grid** (`.area-grid`): SVG canvas with draggable bottom-right handle and ghost trails of previous sizes.
  2. **Accessible Numeric Steppers**: Across (1–30) and Down (1–20) stepper buttons with proper `aria-label`.
  3. **Synchronized Equation** (`.eq`): Real-time formula ($23 \times 14 = 322$) updating in the exact same frame as handle movement.
  4. **Step Guidance Bar**:
     - Step 1: Hand demonstrates stretching to $23 \times 14$.
     - Step 2: "Cut at the tens" button splits grid into 4 rooms; "Fold into column" button animates strips into column algorithm.
     - Step 3: Independent exploration prompt: "Now make $17 \times 12$ yourself".
  5. **Parts Card** (`.card`): Displays list of room equations ($20 \times 10 = 200$, $3 \times 10 = 30$, $20 \times 4 = 80$, $3 \times 4 = 12$) and column layout with animated highlighting.
  6. **"What am I learning?" Link**: Reopens Bodha cards without resetting current grid state.

---

### Screen 6: Abhyasa — Two Drummers Workbench (M5 Workbench)
- **Route**: `#drums`
- **Captured Mockups**: `specs/003-multiplication/mockups/drums-*.png`
- **Purpose**: Sound and visual simulation of two rhythm cycles meeting on a shared timeline.
- **Key Visual Elements**:
  1. **Question Prompt**: "One drummer hits every [a] beats, the other every [b]. On which beat do they first hit together?"
  2. **Prediction Stepper**: "My guess" stepper input (range 1–72) to encourage active hypothesis before listening.
  3. **Dual Rhythm Rings**:
     - Drummer A ring (Indigo, cycle $a$ with rotating hand and pulse dot).
     - Drummer B ring (Teal, cycle $b$ with rotating hand and pulse dot).
  4. **Multi-Row Beat Line**: Numbered timeline showing individual ticks; hit dots in indigo and teal appear on respective beats.
  5. **Meeting Marker**: Beats where both hit are enclosed in a prominent thread ring with the beat number emphasized.
  6. **Lists of Hits Card**: Shows chronological list of hits for each drummer, highlighting shared common multiples.
  7. **Play/Stop Control**: Toggle button that drives real-time audio tones (low tone for A, high tone for B) synchronized with visual pulses.
  8. **Try 4 & 6 Prompt**: Calm suggestion encouraging testing 4 & 6 to discover meeting at 12 rather than 24.

---

### Screen 7: Spot the Mistake (M4 Mistake Screen)
- **Route**: `#mistake?k=M4`
- **Captured Mockups**: `specs/003-multiplication/mockups/mistake-*.png`
- **Purpose**: Error detection in a worked example that omitted cross terms ($23 \times 14 = 200 + 12 = 212$).
- **Key Visual Elements**:
  1. **Introductory Context**: "Someone solved $23 \times 14$ like this. Find which step went wrong."
  2. **Worked Steps List** (`.work-steps`): 4 numbered step buttons:
     - Step 1: $20 \times 10 = 200$
     - Step 2: $3 \times 4 = 12$, so $23 \times 14 = 200 + 12 = 212$ (Faulty step)
     - Step 3: Check with repeated addition
     - Step 4: Compare with $20 \times 14$
  3. **Fine Step Feedback**: Tapping a valid step marks it as checked (`.fine`) and gives a positive explanation without buzzer or penalty.
  4. **Error Reveal**: Tapping Step 2 marks it (`.found`) and renders the 4-room diagram with missing rooms $30$ and $80$ outlined in kumkum dashed stroke.
  5. **Next Navigation**: "Explain it back" button enabled once the misconception is uncovered.

---

### Screen 8: M1 Equal Groups & M3 Turn It Around (Extensions)
- **Pattern**: Built using the Rubber Rectangle manipulative engine per `DEV_HANDOFF.md` §2.3.
- **M1 (Equal groups)**: Loose bunches grouped into rows/columns with array readout and skip-counting line.
- **M3 (Turn it around)**: Draggable rotation handle or "Turn" button rotating an $a \times b$ grid $90^\circ$ to $b \times a$, visually maintaining identical tile area.

---

## 2. Visual Fidelity & Responsive Matrix

| Route | Desktop / Tablet | Mobile (390×844) | Compact (360×740) | Contrast / Night Mode |
|---|---|---|---|---|
| `#wonder` | Centered art, side controls | Stacked column, centered canvas | Scaled SVG canvas, snug spacing | Day: `--paper`, Night: `--night-bg` |
| `#bodha?k=M4` | Card max-width 640px | Full width card, 16px margins | 12px margins, scaled SVG text | Soft fills: `--leaf-soft`, `--indigo-soft` |
| `#bodha?k=M5` | Card max-width 640px | Full width card, dual dials | Snug beat dots, readable text | Accessible colors: `--indigo`, `--teal` |
| `#film` | Aspect ratio constrained | Full width stage, bottom bar | Snug controls, auto-pausing | Day & night contrast compliant |
| `#rect` | Side-by-side grid & parts | Stacked canvas, steppers, card | 320px SVG viewBox, touch handles | `--kumkum` for focus, `--thread` for cut |
| `#drums` | Dual dials side-by-side | Dual dials side-by-side (96px/264px) | Snug dial radii (58px), wrapping rows | Ringed markers in `--thread` |
| `#mistake` | Two-column steps and art | Stacked steps then diagram reveal | Snug button padding, 14px font | Kumkum dashed outline on omitted rooms |

---

## 3. Deviations & Clarifications from Prototype

1. **Audio Synthesis Architecture**: The prototype in `design/prototype/js/voice.js` used Web Audio oscillators for drum tones (`tone('low')`, `tone('high')`). In our production app, `src/ui/components/voice/voice.ts` handles synthesized audio tones alongside Web Speech narration, with complete caption parity when audio is muted.
2. **Accessible Steppers as First-Class Citizens**: The prototype relied primarily on pointer dragging for `#rect`. In production, accessible numeric steppers (`colStep`, `rowStep`, `aStep`, `bStep`, `guessStep`) are rendered prominently so children using keyboards or assistive tech have 100% feature parity.
3. **M1 & M3 Delivery via Rubber Rectangle Engine**: In alignment with `DEV_HANDOFF.md` §2.3, M1 and M3 utilize the core Rubber Rectangle area-grid manipulative, offering array grouping and $90^\circ$ rotation without needing separate standalone screen engines.
