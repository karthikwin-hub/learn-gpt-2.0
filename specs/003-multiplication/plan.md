# Implementation Plan: 003 Multiplication threads (M1–M5)

**Feature**: `specs/003-multiplication`  
**Status**: Ready for Implementation (Gate G2)  
**Authors**: Antigravity, Puja  
**Baseline Prototype**: `design/prototype/` (`#wonder`, `#film`, `#rect`, `#drums`, `#mistake`, `#bodha?k=M4`, `#bodha?k=M5`)  

---

## 1. Prototype → Production Port Map

| Prototype Source File | Production Target File | Port Rules & Responsibilities |
|---|---|---|
| `js/manipulatives/drums.js` | `src/ui/manipulatives/drums.ts` | Two Drummers SVG manipulative: dual rhythm rings (Indigo & Teal), hand rotation, pulse dot animations, multi-row beat timeline, thread ring at LCM beats, and audio tones (`low` for A, `high` for B). Zero external libraries. |
| `js/screens/workbenches.js` (`drums`) | `src/ui/components/screens/drums.ts` | Two Drummers workbench screen: route `#drums`, prediction guess stepper, A & B rhythm steppers (2–9), play/stop toggle, lists of hits card with common multiples highlight, Try 4 & 6 prompt, and calm audio-visual feedback. |
| `js/screens/workbenches.js` (`rect`) | `src/ui/components/screens/rect.ts` | Rubber Rectangle workbench: route `#rect`, 3-step scaffold fading (Step 1 demo, Step 2 cut & fold, Step 3 independent 17 × 12), partial products 4-room card, column method folding strip animation, and ghost clear button. |
| `js/manipulatives/area-grid.js` | `src/ui/manipulatives/area-grid.ts` | Extended Rubber Rectangle: handles `setCut(true)` rendering thread lines at tens ($ta, tb$), `focusStrip(i)` for column folding highlights, ghost rectangles, and keyboard steppers. |
| `js/lessons/ganita-p1.js` (M4, M5) | `src/domain/lesson/m4.ts` & `src/domain/lesson/m5.ts` | Lesson definitions: M4 (Cut rectangle) and M5 (Two drummers) Bodha cards, mistake data, and explain templates. Pure data decoupled from UI types. |
| `js/lessons/ganita-p1.js` (diagrams) | `src/ui/diagrams/tiles.ts` & `src/ui/diagrams/drums.ts` | SVG diagram renderers for Bodha cards: 4-room partial products diagram (M4) and beat timeline dots diagram (M5). |
| `js/screens/mistake.js` (M4 mistake) | `src/ui/components/screens/mistake.ts` | Spot the Mistake screen: 4-step working with step 2 error ($23 \times 14 = 200 + 12 = 212$), kumkum dashed outline on omitted rooms 30 & 80, and non-punitive explanations. |
| `js/model/multiply.js` | `src/domain/math/multiply.ts` | Domain math: pure functions with 100% unit test coverage (`area`, `splitTensOnes`, `partialProducts`, `columnMethod`, `lcm`, `multiples`). (Already implemented & verified). |
| `js/i18n/*.js` | `src/domain/i18n/locales/*.ts` | Multilingual string dictionaries for `drums.*`, `rect.*`, `mistake.m4.*`, `bodha.M4.*`, `bodha.M5.*` across `en`, `hi`, `te`, `bn`, `ta`. |

---

## 2. Engine Utilization & Extensions

Feature 003 heavily utilizes and extends the core engines delivered in Features 001 and 002:

1. **Lesson Engine Reuse** (`src/domain/lesson/` & `src/ui/components/screens/`):
   - M4 and M5 seamlessly execute through the universal 7-stage engine (`bodha.ts`, `film.ts`, `mistake.ts`, `explain.ts`, `stop.ts`).
   - M4 routes from Bodha card 6 directly to `#rect`.
   - M5 routes from Bodha card 6 directly to `#drums`.
2. **Router Extensions** (`src/ui/components/app/router.ts` & `app.ts`):
   - Registers route `drums` (`src/ui/components/screens/drums.ts`).
   - Ensures `enterThread('M5', 'drums')` and `enterThread('M4', 'rect')` persist current route and state to `gurukul:continue`.
3. **Audio Synthesis Controller** (`src/ui/components/voice/voice.ts`):
   - Reuses Web Audio oscillator tone generator (`tone('low')`, `tone('high')`) with caption synchronization when muted.
4. **Calm Feedback Enforcement** (`src/domain/lesson/banned-words.ts`):
   - Validates all narration, reveal texts, and guidance to ensure zero evaluative praise words across all 5 languages.
5. **Zero New Dependencies Statement**:
   - Zero runtime npm packages added. The implementation uses pure DOM, SVG, Web Audio, and TypeScript.

---

## 3. Domain Unit Tests (§8.2 Known Values)

All mathematical functions in `src/domain/math/multiply.ts` are verified in `multiply.test.ts`:

| Function | Input | Expected Output | Verification Status |
|---|---|---|---|
| `partialProducts` | `23 × 14` cut at tens | Four rooms: 200, 30, 80, 12; total 322 | **PASS** (`multiply.test.ts`) |
| `partialProducts` | `17 × 12` cut at tens | Four rooms: 100, 70, 20, 14; total 204 | **PASS** (`multiply.test.ts`) |
| `lcm` | `4` and `6` | `12` (next meeting `24`) | **PASS** (`multiply.test.ts`) |
| `lcm` | `3` and `4` | `12` | **PASS** (`multiply.test.ts`) |
| `multiples` | `4`, up to `24` | `[4, 8, 12, 16, 20, 24]` | **PASS** (`multiply.test.ts`) |
| `columnMethod` | `23 × 14` | Lines: ones `92`, tens `230`, total `322` | **PASS** (`multiply.test.ts`) |
| `splitTensOnes` | `23` | `{ tens: 20, ones: 3 }` | **PASS** (`multiply.test.ts`) |

---

## 4. Test Plan

### 4.1 Acceptance Tests (`tests/acceptance/003-multiplication.spec.ts`)
Encodes the 14 acceptance scenarios:
- `US1-AS1`: Courtyard guess transitions to Living Film ($6 \times 4 = 24$) and workbench.
- `US1-AS2`: Target floor stretching displays 18 unit squares.
- `US2-AS1`: $23 \times 14$ grid cut at tens renders 4 rooms with partial products $200, 30, 80, 12$ (sum 322).
- `US2-AS2`: Column folding animates horizontal strips in sync with calculation lines.
- `US2-AS3`: Independent step $17 \times 12$ displays rooms $100, 70, 20, 14$ and total 204.
- `US3-AS1`: Tapping valid step in M4 mistake explains why it follows without saying "wrong".
- `US3-AS2`: Tapping faulty step in M4 mistake displays 4 rooms with 30 & 80 outlined in kumkum.
- `US3-AS3`: Explain back completes sentence: "I cut the rectangle into tens and ones and added every room".
- `US4-AS1`: Two Drummers play rhythm hits, pulse dials, and mark beat line.
- `US4-AS2`: Drummers at 4 and 6 beats ring beat 12 as first meeting and beat 24 as next.
- `US4-AS3`: Prediction guess stepper and list of hits highlight common multiples.
- `US5-AS1`: M1 equal groups arrange into rectangular arrays.
- `US5-AS2`: M3 commutative rotation preserves total square count.
- `US6-AS1`: Zero banned praise words or punitive alerts across all screens.
- `US6-AS2`: Full 5-language script purity and string parity for M1–M5.

### 4.2 Mockup Parity Tests (`tests/e2e/mockup/003-multiplication.spec.ts`)
Asserts layout, visibility, and contrast against baseline mockups in `specs/003-multiplication/mockups/` for `#rect`, `#drums`, `#mistake?k=M4`, `#bodha?k=M4`, and `#bodha?k=M5`.

### 4.3 End-to-End User Journeys (`tests/e2e/journeys/003-journeys.spec.ts`)
- `J5 (M4)`: Full lesson M4 (Bodha $\to$ Rect workbench with cut & fold $\to$ Mistake $\to$ Explain $\to$ Stop).
- `J5 (M5)`: Full lesson M5 (Bodha $\to$ Drums workbench with rhythm play $\to$ Explain $\to$ Stop).
- `J2 (Extended)`: Language switching on `#rect` and `#drums` preserves model state without resetting.

### 4.4 Five-Language Sweep & Accessibility
- Runs across all multiplication routes in `en`, `hi`, `te`, `bn`, `ta`.
- Zero raw keys, zero console errors, zero text overflow, and zero axe-core violations.
