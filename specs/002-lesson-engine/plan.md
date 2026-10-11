# Implementation Plan: 002 Lesson engine, Bodha cards and Living Film player

**Feature**: `specs/002-lesson-engine`  
**Status**: Draft (Ready for Gate G2 review)  
**Authors**: Antigravity, Puja  
**Baseline Prototype**: `design/prototype/` (`#wonder`, `#bodha?k=M2`, `#film`, `#rect`, `#mistake`, `#explain`, `#stop`)  

---

## 1. Prototype → Production Port Map

| Prototype File | Production Target | Module Type & Port Rules |
|---|---|---|
| `js/model/multiply.js` | `src/domain/math/multiply.ts` | Domain math: pure functions with strict types (`area`, `splitTensOnes`, `partialProducts`, `columnMethod`, `multiples`, `gcd`, `lcm`). Zero DOM/UI imports. Unit tests in `multiply.test.ts`. |
| `js/screens/wonder.js` & `prashna.js` | `src/ui/components/screens/prashna.ts` | Screen: data-driven Prashna prediction screen supporting M2 courtyard art and generic 3-choice questions. Commits guess to `gurukul:guess:<knotId>` without grading. |
| `js/screens/bodha.js` | `src/ui/components/screens/bodha.ts` | Screen: Bodha cards engine. Progress beads, A−/A+ text sizing, regex `TERM` parser for `[[id|term]]`, glossary bridge card with `tIn('en', ...)`, step-by-step worked example reveal, "Keep this sutra" action, navigation via `afterBodha(knot)`. |
| `js/screens/film.js` | `src/ui/components/screens/film.ts` | Screen: Living Film player. Pure time-computed SVG scene over beats, Play/Pause, bidirectional scrubber, paused model drag with ghost outline, reduced-motion cut mode, synchronized captions. |
| `js/screens/workbenches.js` (`rect` only) | `src/ui/components/screens/workbenches.ts` | Screen: hosts `rect` (Abhyasa Rubber Rectangle), live synchronized equation pane ($W \times H = P$), step fading from "watch me" to "your turn", "What am I learning?" Bodha reopen link. |
| `js/screens/mistake.js` | `src/ui/components/screens/mistake.ts` | Screen: Spot the mistake. 4-step pre-solved problem with 1 erroneous step, visual explanation reveal with kumkum red pointer, zero punitive scoring. |
| `js/screens/explain.js` | `src/ui/components/screens/explain.ts` | Screen: Explain it back. Sentence builder with word tiles, interactive blanks, save notebook page to storage. |
| `js/screens/stop.js` | `src/ui/components/screens/stop.ts` | Screen: A good place to stop. Calm exit naming what was learned, sutra recap, child's sentence display, return to Ashram (`#home`). |
| `js/lessons/fig.js` | `src/ui/diagrams/fig.ts` | Diagram helper: `F` SVG builders (`svg`, `text`, `rect`, `line`, `circle`, `path`, `arrow`, `grid`, `tappable`). |
| `js/lessons/ganita-p1.js` (M2 data) | `src/domain/lesson/m2.ts` | Lesson definition: cards for idea, why, example with 3 steps, sutra, Prashna question data, mistake data, explain template. |
| `js/voice.js` | `src/ui/components/voice/voice.ts` | Voice controller: Web Speech API synthesis behind `Voice` interface, sound on/off toggle, speech rate toggle, caption banner controller. |
| `js/manipulatives/area-grid.js` | `src/ui/manipulatives/area-grid.ts` | Manipulative: interactive Rubber Rectangle SVG grid with draggable corner handles, keyboard navigation, ghost trails, coordinate markers. |
| (new) | `src/domain/lesson/banned-words.ts` | Domain rulebook: banned praise/scoring words list across all 5 languages (`en`, `hi`, `te`, `bn`, `ta`) implementing US5-AS1. |
| `styles.css` (lesson parts) | `src/ui/components/theme/lesson.css` | Component styles: Bodha cards, Living Film controls, Rubber Rectangle grid, mistake choices, sentence builder, stop screen. |

---

## 2. Engine Utilization & Extensions

Feature 002 builds upon the foundational architecture delivered in Feature 001 and extends it:
1. **Router & Navigation State** (`src/ui/components/app/router.ts`):
   - Registers the 7 new lesson routes: `prashna`, `wonder`, `bodha`, `film`, `rect`, `mistake`, `explain`, `stop`.
   - Connects `enterThread(knotId, route, params)`: updates `gurukul:continue` in storage so Ashram Continue card restores exact knot, route, and model state (US1-AS1).
2. **Curriculum Model** (`src/domain/curriculum/curriculum.ts`):
   - Utilizes `afterBodha(knot)`: routes knots with films (`M2`) to `film`, and knots without films directly to `rect` / workbench (US1-AS2, US1-AS3).
3. **i18n & Banned Feedback** (`src/domain/i18n/core.ts`):
   - Uses `t()`, `tIn()` for bilingual glossary bridge cards.
   - Evaluates feedback text against `src/domain/lesson/banned-words.ts` to enforce zero praise/points/stars/streaks (US5-AS1).
4. **Storage & Privacy** (`src/persistence/storage.ts`):
   - Persists `gurukul:guess:<knotId>`, `gurukul:sutras`, `gurukul:pages`, `gurukul:sound`, `gurukul:voiceRate`. All keys strictly prefixed with `gurukul:`.
5. **Topbar Chrome** (`src/ui/components/chrome/topbar.ts`):
   - Adds interactive Sound toggle button (`#btn-sound`) with state reflection and caption bar `#caption` with `aria-live="polite"`.

---

## 3. Domain Unit Tests (Known Values from DEV_HANDOFF.md §8.2)

The implementation of `src/domain/math/multiply.ts` must reproduce these exact mathematical facts checked in unit tests (`src/domain/math/multiply.test.ts`):

| Function / Module | Input | Expected Output | Verification Standard |
|---|---|---|---|
| `partialProducts` | `cols = 23, rows = 14` cut at tens | Four rooms: `(20, 10, 200)`, `(3, 10, 30)`, `(20, 4, 80)`, `(3, 4, 12)`; sum `322` | DEV_HANDOFF.md §8.2 line 310 |
| `partialProducts` | `cols = 17, rows = 12` cut at tens | Four rooms: `(10, 10, 100)`, `(7, 10, 70)`, `(10, 2, 20)`, `(7, 2, 14)`; sum `204` | DEV_HANDOFF.md §8.2 line 311 |
| `lcm` | `4` and `6` | `12` | DEV_HANDOFF.md §8.2 line 312 |
| `lcm` | `3` and `4` | `12` | DEV_HANDOFF.md §8.2 line 312 |
| `multiples` | `4`, up to `24` | `[4, 8, 12, 16, 20, 24]` | Prototype multiply.js |
| `columnMethod` | `cols = 23, rows = 14` | Lines: ones `92` ($23 \times 4$), tens `230` ($23 \times 10$), total `322` | Prototype multiply.js |
| `splitTensOnes` | `23` | `{ tens: 20, ones: 3 }` | Prototype multiply.js |
| `bannedWords` | Feedback strings in all 5 languages | 0 occurrences of banned praise/scoring terms | US5-AS1 |

---

## 4. Test Plan

### 4.1 Acceptance Tests (`tests/acceptance/002-lesson-engine.spec.ts`)
Encodes the 15 acceptance scenarios with their exact IDs:
- `US1-AS1`: Child mid-thread at workbench returns to Ashram; Continue card resumes exact workbench step and model state.
- `US1-AS2`: Sutra card on knot without film routes directly to workbench.
- `US1-AS3`: Sutra card on knot with film (`M2`) routes to `film`.
- `US2-AS1`: Living Film pauses at end of each beat, maintaining visible caption until Play is tapped.
- `US2-AS2`: Dragging paused model shows modified model while keeping scripted state as faint outline.
- `US2-AS3`: Bidirectional scrubbing updates scene and model in real time.
- `US2-AS4`: Reduced motion cut mode replaces smooth tweens with clean step cuts.
- `US3-AS1`: When sound is off, every spoken line appears as an on-screen caption in current language.
- `US3-AS2`: Narration rate toggle adjusts speech speed without distortion.
- `US4-AS1`: Dragging, stepping, or keyboarding Rubber Rectangle updates grid and equation in the same frame.
- `US4-AS2`: Workbench step indicators fade scaffold from guided demonstration to free exploration.
- `US5-AS1`: All displayed feedback is purely descriptive with zero praise words, points, stars, or streaks.
- `US5-AS2`: Mistake screen uses kumkum red solely as a focal pointer; no punitive red for errors.
- `US6-AS1`: Prashna committed guess leads immediately to Bodha card 1.
- `US6-AS2`: Worked example card reveals exactly 1 step per tap with progressive text and diagram updates.
- `US6-AS3`: Tapping key term in Indic language reveals bilingual glossary bridge card with English school term.
- `US6-AS4`: "What am I learning?" link on workbench opens Bodha cards and Back returns without losing state.
- `US6-AS5`: "Keep this sutra" saves aphorism to `gurukul:sutras` storage.

### 4.2 Mockup Parity Tests (`tests/e2e/mockup/002-lesson.spec.ts`)
Verifies visible elements, text, and layout against the 21 captured mockups in `specs/002-lesson-engine/mockups/` across `wonder`, `bodha?k=M2`, `film`, `rect`, `mistake`, `explain`, and `stop`.

### 4.3 End-to-End User Journeys (`tests/e2e/journeys/002-journeys.spec.ts`)
- `J3`: Full lesson walkthrough from Prashna (`#wonder`) through Bodha, Film, Workbench (`#rect`), Mistake, Explain, to Stop (`#stop`).
- `J4`: Living Film pause, drag model, scrub, and caption verification.
- `J7`: Sutra retention journey — keeping sutra on Bodha card reflects in Ashram remember card and persistent storage.

### 4.4 Five-Language Sweep & Accessibility
- Runs across all 7 new lesson routes in `en`, `hi`, `te`, `bn`, `ta`.
- Zero raw keys, zero text truncation, zero axe-core accessibility violations.
- Full verification second pass with `prefers-reduced-motion: reduce`.

### 4.5 Architecture Rules
- Verifies with `npx depcruise src`:
  - `src/domain/math/` has zero UI/DOM imports.
  - `src/domain/lesson/` imports only from domain math and i18n, never UI components.
  - `src/ui/` components access domain models through typed boundaries.

---

## 5. Dependencies
- **Explicit Statement**: **None beyond Phase 0**.
- Zero runtime npm packages; pure Vite + TypeScript + DOM/SVG.
