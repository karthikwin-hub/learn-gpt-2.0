# Developer handoff: building Gurukul from the prototype to tested production code

This is the execution guide for the development agent (and the humans who approve its gates). Follow it in order. It tells you what to build, where each piece comes from in the prototype, which tests to write, which checks to run, and when to stop for a human. If a step here conflicts with `AGENTS.md` or the constitution, those win; stop and report the conflict.

**Product**: Gurukul, a calm learning app for Class 5 children (about age 10) in India, in English, Hindi, Telugu, Bengali and Tamil. Three subjects (Shalas): Ganita (maths), Vijnana (science), Loka (social studies). Every lesson runs: Prashna (question) → Bodha (concept explained) → optional Living Film → Workbench → Spot the mistake → Explain it back → A good place to stop, with the child's sentence and sutra kept in the Pothi (notebook).

---

## 0. Ten rules that are not optional

These exist because earlier builds went wrong in exactly these ways.

1. **Build from the mockups.** Every screen you build has a prototype screen in `design/prototype/`. Open it, record it (§5), and build the same elements, text keys, controls and states. Do not invent a new layout. If a story needs a screen the prototype does not have, stop: add the screen to the prototype in the same style first, get a human to approve it, then build it (§5.6).
2. **Use the prototype's engine and logic.** The lesson flow, the routing and state rules, the lesson data shape and every domain rule already exist and were checked by hand. Port them (§6, §7). Do not redesign the engine.
3. **Port the domain rules with their known values as tests first** (§8.2). A ported rule is done only when it reproduces every value in that table.
4. **Integration and regression tests run at the end of every feature, across all features built so far** (§9). A feature is not done if any earlier journey fails.
5. **Exercise the real UI in a browser** for every story (Playwright), in all five languages, and with reduced motion (§9.3). Unit tests alone never prove a screen works.
6. **String keys are the contract.** Keep every i18n key name from the prototype exactly (§6.5). Never hard-code display text.
7. **No logic in presentation.** Screens and manipulatives display values and bind input; every rule lives in its owning domain module (`docs/ARCHITECTURE.md`).
8. **Never weaken a test or acceptance criterion** to get green. Fix the code, or stop and ask.
9. **One feature per branch, one user story per session.** Keep `specs/<###>/progress.md` current so a fresh session can resume.
10. **Stop at every human gate** (§3.3). Confidence is not permission.

---

## 1. Read these first, in this order

| # | Document | Why |
|---|---|---|
| 1 | `AGENTS.md` (and `CLAUDE.md` if you are Claude Code) | How every task runs, gates, output contract |
| 2 | `.specify/memory/constitution.md` (v1.1.0) | What we build and refuse to build |
| 3 | `docs/ARCHITECTURE.md` and ADR-0003 | Module map and dependency rules |
| 4 | `docs/product/CONCEPT.md`, `EXPERIENCE.md` | Product intent, screen inventory, visual system, accessibility |
| 5 | `docs/product/CURRICULUM.md`, `CURRICULUM_PHASE2.md` | Every knot, its misconception and its lesson |
| 6 | `docs/product/SPECKIT_HANDOFF.md` | Feature order and the `/speckit.specify` brief for each feature |
| 7 | ADR-0001, ADR-0002 | Product direction and the Gurukul frame |
| 8 | `docs/standards/*` | Engineering principles, testing strategy, review checklist, definition of done, security |
| 9 | The prototype: open `design/prototype/index.html` in Chrome (no build step) | The left panel lists every screen; each screen's "Why it works" note is a requirement source |

`context/Visual Math Learning Platform.pdf` is the original brief; where it disagrees with the documents above, the documents above win.

---

## 2. Where things stand

### 2.1 What exists
- **Product docs and decisions**: complete for features 001–012 (above).
- **Prototype** (`design/prototype/`, about 11,000 lines, plain JavaScript, opens from a file): every screen for features 001–012, 18 lessons (9 maths from phase 1, 9 new across three subjects), the full lesson engine, all domain rules, and strings in five languages. Click-through tested at 390×844 in all five languages and with reduced motion: 0 console errors, 0 overflow, 0 raw keys.
- **Harness**: `python3 scripts/harness/verify.py` (checks in `harness.toml`), traceability and test-integrity checks, Spec Kit skills (`.github/skills/speckit-*`, `.claude/skills/`), role definitions (`.claude/agents/`, `.github/agents/`), CI workflow `.github/workflows/quality-gates.yml`.

### 2.2 What does not exist yet (you build it)
- No `package.json`, no `src/`, no `tests/`, no `specs/` folders.
- The Node checks in `harness.toml` (format, lint, typecheck, unit-tests, acceptance-tests, architecture-rules) are `enabled = false`.
- CI has no Node setup step.
- `docs/rules/*.md` (six rules documents named in ARCHITECTURE.md §3).
- Offline support (service worker), self-hosted fonts, a production build and deploy target.
- `.github/CODEOWNERS` still has placeholder handles (`@your-org/...`).

### 2.3 What the prototype does not cover (needs a mockup before build, rule 1)
| Item | Feature | What to do |
|---|---|---|
| M1 Equal groups, M3 Turn it around | 003 (P3) | Add mockups to the prototype using the Rubber Rectangle pattern; human approval; then build |
| D2 How many groups, D4 Missing side | 004 (P2) | Same: mockup first |
| G1 Angles, G3 Slide the top, G5 Fold a box | 005 (P2) | Same |
| S1 Sort by a rule | 006 (P2) | Same (a one-ring variant of the Sorting Courtyard) |
| L1 True for all, L3 If this then that, L4 What comes next | 007 (P2) | Same |
| Return questions (interleaved recall) | 008 US4 | The prototype has only the "Remember this?" sutra card on the Ashram. Mock up the Return screen first |
| Living Films for knots other than M2 | any | Not required (ADR-0002: film is optional). Do not build films unless a spec asks |
| Knots in CURRICULUM_PHASE2 with no bench | after 012 | Out of scope for 001–012; they appear on the Shalas as "coming" |

### 2.4 Known differences between EXPERIENCE.md and the prototype
For features 001–012 **the prototype's behaviour is the baseline**, because it was built and tested. EXPERIENCE.md sometimes describes more. Record each difference in the feature's `mockups.md` under "Deviations" and ask the spec owner at G1 which to build. Known examples: EXPERIENCE describes a time scrubber and food breaking into pieces for `#digest` (the prototype uses a timed walk through five stops); steppers and an expanded form for `#place` (the prototype taps houses); a tape measure and results table for `#ramp` (the prototype leaves stopping markers). There may be others; find them while writing `mockups.md`.

---

## 3. How the work is organised

### 3.1 Phases
| Phase | Feature (Spec Kit) | Depends on | Brief |
|---|---|---|---|
| 0 | Foundation (chore, no spec) | none | §10 |
| 1 | 001 App shell, language switching and fonts | 0 | SPECKIT_HANDOFF §3 001 |
| 2 | 002 Lesson engine, Bodha cards and Living Film player | 001 | 002 |
| — | **Children's testing round 1** (humans) | 002 | SPECKIT_HANDOFF §5 |
| 3 | 003 Multiplication (M1–M5) | 002 | 003 |
| 4 | 004 Division (D1–D4) | 002, 003 | 004 |
| 5 | 005 Geometry (G1–G5) | 002 | 005 |
| 6 | 006 Sets (S1–S3) | 002 | 006 |
| 7 | 007 Logic (L1–L4) | 002, 006 | 007 |
| 8 | 008 Pothi, recall and Acharya corner | 002, 003 | 008 |
| 9 | 009 Gurukul shell: Ashram, Shalas, Jaal, stage bar | 001, 002 | 009 |
| 10 | 010 Ganita expansion (N1, N3, U1) | 002, 009 | 010 |
| — | **Children's testing round 2** (humans) | 010 | SPECKIT_HANDOFF §2 |
| 11 | 011 Vijnana (B3, K2, R1) | 002, 009 | 011 |
| 12 | 012 Loka (I2, E1, E4) | 002, 009, 010 | 012 |
| 13 | Release readiness | all | §12 |

Build in this order. Do not start a phase until the previous phase's exit gate (§9.5) is green and its PR is merged by a human. If a merge is pending at the end of your session, record it in `progress.md` and stop; do not stack more than one unmerged feature.

### 3.2 Branches and commits
- Phase 0: `chore/foundation`. Features: `feat/<###>-<short-name>` (for example `feat/003-multiplication`), always from the latest `main`.
- Conventional commits referencing the task: `feat(curriculum): T014 port lesson registry`.
- Refactor and behaviour change never share a commit (`refactor-safely` skill).
- Push your feature branch and open a **draft** PR when the feature's exit gate is green. Humans merge.

### 3.3 Human gates (stop and ask)
| Gate | When | What the human approves |
|---|---|---|
| Dependencies | Phase 0 and any later addition | Every npm package (`harness.toml` `ask_on_dependency_add = true`) |
| Protected files | Phase 0 | Changes to `harness.toml`, `.github/workflows/`, `.github/CODEOWNERS`, hooks, agent settings |
| G1 Spec | Each feature, after `/speckit.clarify` and `mockups.md` | spec.md, mockups.md, deviations |
| G2 Design | Each feature, after `/speckit.plan` | plan.md (port map, test plan, dependencies) |
| G3 Ready to build | Each feature, after acceptance tests are written and fail | Acceptance tests' intent (mandatory for P1 stories) |
| New mockup | Any time a screen is missing from the prototype | The new prototype screen |
| G4 Done | Each feature, after the exit gate | Evidence in checks.md, review findings, the PR |
| Merge, release, deploy | Always | Humans only |

---

## 4. Technology (decide at G2 of Phase 0; this is the recommendation)

**Vite + TypeScript (strict) + plain DOM and SVG, no UI framework.**
Why: the prototype is plain DOM and SVG, so every screen and manipulative ports one-to-one; the bundle stays small for low-cost Android phones (EXPERIENCE §11); no framework re-render model to fight with drag interactions. If a human prefers React at G2, record an ADR and keep the same module map.

Development dependencies to request at the Phase 0 gate (each needs a human yes; nothing else without asking):

| Package | Purpose |
|---|---|
| `vite`, `typescript` | Build and types |
| `vitest`, `jsdom` | Unit tests and DOM tests for manipulatives |
| `@playwright/test` | Browser journeys, mockup parity, five-language sweep |
| `@axe-core/playwright` | Accessibility assertions in the sweep |
| `eslint`, `typescript-eslint`, `prettier` | Lint and format checks in `harness.toml` |
| `dependency-cruiser` | `architecture-rules` check (ARCHITECTURE.md §4) |

No runtime dependencies are needed. Fonts: download the Noto Sans, Noto Sans Devanagari, Telugu, Bengali and Tamil `woff2` files (SIL Open Font License) into `public/fonts/` and declare them in CSS; do not load Google Fonts at runtime in production (constitution VII; the prototype's Google Fonts link is prototype-only). Offline: a small hand-written service worker that caches the built assets; no plugin.

---

## 5. Mockup fidelity protocol (do this for every feature)

### 5.1 Before planning: write `specs/<###>/mockups.md`
For each prototype route in the feature (the route list per feature is in §11):

1. Open `design/prototype/index.html#/<route>` in Chromium at **390×844** and **360×740**.
2. Capture screenshots in **English and one Indic language** (rotate: 001 hi, 002 te, 003 bn, 004 ta, 005 hi, …) at each state: initial, after each workbench step, done. Save to `specs/<###>/mockups/<route>-<lang>-<state>.png`. Use a Playwright script (`tests/e2e/tools/capture-mockups.ts`, written in Phase 0) so captures are repeatable.
3. Fill in this table per route:

| Field | Content |
|---|---|
| Route and params | e.g. `share?mode=leftover` |
| Prototype files | screen, manipulative, model, lesson data, string files |
| Reviewer note | Copy the screen's `note` text from the prototype source verbatim; it states the design intent |
| Elements | Every visible element in order: role, i18n key, purpose |
| Controls | Every control: i18n key, input methods (tap, drag, keyboard keys, stepper), result |
| States | initial → step 1 → step 2 → step 3 → done, with what is shown in each |
| Narration and captions | The keys spoken at each state |
| Linked panes | Which readouts update with the model (they must update in the same frame) |
| Accessibility | Roles, labels, keyboard path, reduced-motion behaviour |
| Deviations | Any difference you propose from the prototype, or between the prototype and EXPERIENCE.md, with a reason. Empty unless the spec owner approves |

4. The spec owner approves `mockups.md` at G1 together with spec.md.

### 5.2 While building
- Port the styles from `design/prototype/styles.css` as design tokens first (Phase 1): colours, type scale, Indic line height, spacing, night theme, focus ring. Screens use tokens, never raw colours.
- Keep the same DOM structure where you can (same headings, same order, same button labels by key). This is what the parity test compares.
- Give the screen root `data-route="<route>"` and every lesson control `data-key="<i18n key>"` so tests can find them in any language.

### 5.3 Mockup parity test (automated, required)
For each route, add `tests/e2e/mockup/<route>.spec.ts`:
1. Load the prototype route (`file://.../design/prototype/index.html#/<route>`) and the app route, both at 390×844, same language.
2. Drive both through the same states with the same scripted actions.
3. At each state, collect the visible text of the main view (`#view` in the prototype, `[data-route]` in the app), split into trimmed lines.
4. Assert: every prototype line appears in the app, except lines listed under "Deviations" in `mockups.md`. Run in all five languages.
5. Save side-by-side screenshots (prototype left, app right) to `specs/<###>/evidence/parity/` for the reviewer and the human. No pixel diff is required; the reviewer compares them by eye and records the result in checks.md.

### 5.4 Reviewer check
The independent reviewer opens the side-by-side images and confirms: same elements, same order, same controls, same colour roles (kumkum red only for "look here"), no extra decoration. Any mismatch not in "Deviations" is a MAJOR finding.

### 5.5 Not ported
The prototype's left "review" panel, its `REVIEW_NAV`, and the reviewer notes UI are review tools. Do not build them into the app. The notes become requirements text in mockups.md.

### 5.6 Missing mockups
If a story needs a screen the prototype lacks (§2.3): add it to `design/prototype/` in the same style and conventions (a screen file, strings in `en-*.js`, a REVIEW_NAV entry, a `note`), run it in the browser, take screenshots, and stop for human approval. Only then write its spec and build it.

---

## 6. The engine to port (from the prototype)

### 6.1 Routing and state
- Hash routes: `#/<screen>?<key>=<value>`. Keep the same route names and params (`mode`, `k`, `s`) so mockups, tests and deep links match.
- **State key** for each screen instance: `<screen>` + (`:<mode>` if present) + (`:<k>` if present). Screen state lives in memory under that key, so a language switch re-renders in place without losing the model (feature 001 US2). Source: `js/router.js` `render()`.
- Back: in-app history depth; at depth 0, Back goes to `home`.
- On every route change: stop narration, run the previous screen's cleanup, render, then insert the stage bar if the screen declares a stage.

### 6.2 Screen metadata
Each screen declares (source: every `Sutra.screens.*` object):

```ts
interface ScreenMeta {
  id: string;                 // route name
  title?: string;             // i18n key for the top bar
  stage?: 'shravana' | 'manana' | 'nididhyasana';
  step?: 'prashna' | 'bodha' | 'darshana' | 'abhyasa' | 'mistake' | 'explain' | 'stop';
  bench?: boolean;            // workbench: shows "What am I learning?" (opens bodha?k=<current knot>)
  hideBack?: boolean; hideTopbar?: boolean; full?: boolean;
  render(view: HTMLElement, state: Record<string, unknown>, params: Record<string, string>): (() => void) | void;
}
```

### 6.3 Curriculum and lesson registry (`src/domain/curriculum/`)
Source: `js/model/curriculum.js`, `js/lessons/*.js`.

```ts
interface Knot {
  id: string;                                   // e.g. 'M4', 'B3'
  prashna?: boolean;                            // starts at prashna?k=<id>
  start?: Route;                                // custom first step (M2 starts at 'wonder')
  bench?: Route;                                // workbench route; a knot is playable if it has start or bench
  afterBodha?: Route;                           // e.g. M2 → film; otherwise the bench
}
interface Thread { id: string; crossing?: string; knots: Knot[] }
interface Section { id: 'ganita' | 'vijnana' | 'loka'; threads: Thread[] }
interface JaalLink { id: string; a: string; b: string }   // cross-subject link between two knots

interface Lesson {
  stateKey: string;                             // state key of its bench, used by Pothi thumbnails
  prashna?: { art: DiagramId };                 // question picture; text keys prashna.<k>.q|c1..3|a
  cards: BodhaCard[];                           // what, idea, why, example (n steps), where, sutra
  explain: { tiles: string[]; expect: string }[];     // one entry per gap {0}, {1}, …; keys explain.<k>.<tile>
  mistake: { steps: number; wrong: number; picture: DiagramId; eq?: string };
  thumb: DiagramId;                             // Pothi thumbnail from the saved model
}
interface BodhaCard { key: 'what'|'idea'|'why'|'example'|'where'|'sutra'; steps?: number; fig: DiagramId }
```
Rules to keep: `playable(knot) = !!(start || bench)`; `firstStep` = start, else `prashna?k=<id>` if prashna, else the bench; `afterBodha(knot) = afterBodha || bench`; a knot that is not playable shows a calm "coming" message (`home.notInProto`). Lesson content is data: string keys and diagram ids, never translated text. Diagrams are drawn in `src/ui/` from the diagram id and the model.

### 6.4 Persistence keys (`src/persistence/`)
Prefix every key (the prototype uses `sutra-proto:`; production uses `gurukul:`). Store nothing that identifies the child.

| Key | Value | Written by |
|---|---|---|
| `lang` | `en` \| `hi` \| `te` \| `bn` \| `ta` | language screen, language button |
| `continue` | `{ knot, route, params }` | every lesson screen on entry (`ui.enterThread`) |
| `guess:<knot>` | chosen Prashna index | Prashna |
| `m2guess` | slider guess | Wonder (M2) |
| `sutras` | knot ids kept | Bodha sutra card |
| `pages` | `[{ id, thread, route, params, fills, model, date }]` | Explain it back |
| `done` | knot ids completed | Explain it back |
| `textSize`, `theme`, `captions`, `sound`, `voiceRate` | settings | Bodha, Acharya corner, top bar |

Voice notes are kept in memory only and never written to storage (feature 008 US1-AS3).

### 6.5 Strings (`src/domain/i18n/`)
- Port every file in `design/prototype/js/i18n/` to typed dictionaries: one module per language per area (`en`, `en-gurukul`, `en-bodha`, `en-ganita`, `en-vijnana`, `en-loka`, and the same for `hi`, `te`, `bn`, `ta`). Keep every key name and every `{placeholder}`.
- Behaviour to keep (`js/i18n/core.js`): duplicate keys throw at load; a missing key falls back to English and warns in development only; `t(key, vars)` fills `{name}` placeholders; `tIn(lang, key)` reads another language (used for the English school term in the glossary).
- Glossary markup `[[id|words]]` appears only in Bodha strings and becomes a tappable term (`gloss.<id>`, and `gloss.<id>.en` in English only).
- Conventions: `bodha.<knot>.what|can|idea|why|example|example1..N|where|sutra`; `prashna.<knot>.q|c1|c2|c3|a`; `mistake.<knot>.intro|s1..sN|fine<i>|found` (M4 uses prefix `m4`); `explain.<knot>.s` with `{0}{1}` plus tile keys and `hint`; `know.<knot>`.
- All non-English strings are drafts until native-teacher review; keep the "Draft translation" header comment in each file.

### 6.6 Lesson flow per knot
`firstStep` → Prashna (guess stored) → Bodha (the "what" card reveals the guess and the answer; worked example revealed one step per tap; sutra can be kept) → `afterBodha` (film or bench) → bench: step 1 "Show me" demo, step 2 build task, step 3 independent task → `ui.next(t('bench.toMistake'), 'mistake')` → Spot the mistake (tapping a correct step explains why it follows; tapping the wrong step reveals the picture) → Explain it back (fill tiles; mismatch shows a hint and "Keep it as it is"; keeping writes a page) → Stop (what you now know, your sentence, the sutra, Back to the Ashram).

### 6.7 Narration, motion, feedback
- Narration: `voice.say(text, opts)` with captions on by default; stopped on every route change. Production narration voices are an open decision (SPECKIT_HANDOFF §4); build a `Voice` interface with the device speech engine as the first adapter.
- Reduced motion: movement becomes cuts between end states; timed demos without movement keep their reading pace (lesson learned in B3).
- Feedback: describe what happened; never praise, score, or use red for wrong. Build a banned-word list per language (002 US5-AS1) and test it.

---

## 7. Prototype → production port map

| Prototype | Production | Port rule |
|---|---|---|
| `js/model/multiply.js`, `divide.js`, `geometry.js`, `kolam.js`, `sets.js`, `logic.js`, `number.js` | `src/domain/math/<same>.ts` + `index.ts` | Port function by function with types; tests from §8.2 first |
| `js/model/science.js` | `src/domain/science/` | Same |
| `js/model/world.js` | `src/domain/world/` | Same |
| `js/model/curriculum.js`, `js/lessons/*.js` (data parts) | `src/domain/curriculum/` | Data and rules only; diagram drawing moves to `src/ui/` |
| `js/lessons/fig.js` (`F` helpers), diagram parts of `js/lessons/*.js` | `src/ui/diagrams/` | Re-implement with the same visuals |
| `js/manipulatives/*.js` | `src/ui/manipulatives/` | Re-implement; same inputs (drag + keyboard + stepper for every handle), ghosts, linked panes |
| `js/screens/*.js` | `src/ui/components/screens/` | Re-implement from mockups.md; logic calls into domain |
| `js/router.js`, `js/app.js` (not REVIEW_NAV), `js/ui.js`, `js/util.js` | `src/ui/components/app/` | Same behaviour (§6.1, §6.2) |
| `js/voice.js` | `src/ui/components/voice/` behind a `Voice` interface | Same behaviour |
| `js/i18n/*` | `src/domain/i18n/` | Keys verbatim (§6.5) |
| `styles.css` | `src/ui/components/theme/` tokens + component CSS | Tokens first |

---

## 8. Test portfolio

### 8.1 Folders and commands
| Level | Folder | Command | Runs in |
|---|---|---|---|
| Unit (domain) | `src/domain/**/*.test.ts` | `npx vitest run` | `verify --fast` |
| Unit (manipulatives, DOM) | `src/ui/**/*.test.ts` (jsdom) | `npx vitest run` | `verify --fast` |
| Acceptance (US<n>-AS<m>) | `tests/acceptance/<###>/*.spec.ts` (Playwright) | `npx playwright test tests/acceptance` | full verify |
| Mockup parity | `tests/e2e/mockup/` | `npx playwright test tests/e2e/mockup` | full verify |
| Journeys (integration, cross-feature) | `tests/e2e/journeys/` | `npx playwright test tests/e2e/journeys` | full verify, every feature |
| Five-language sweep | `tests/e2e/sweep/` | `npx playwright test tests/e2e/sweep` | full verify |
| i18n parity and script purity | `src/domain/i18n/*.test.ts` | `npx vitest run` | `verify --fast` |
| Architecture rules | `.dependency-cruiser.cjs` | `npx depcruise src` | full verify |

In Phase 0, point the `acceptance-tests` check in `harness.toml` at Playwright, and add checks for mockup parity, journeys and the sweep (human approval, §3.3). Name every acceptance test with its ID: `test('US2-AS1: …')`.

### 8.2 Known values each domain port must reproduce (unit tests)
These were checked by hand in the prototype. Write them as tests before porting.

| Module | Input | Expected |
|---|---|---|
| multiply (rooms) | 23 × 14 cut at tens | rooms 200, 30, 80, 12; total 322 |
| multiply (rooms) | 17 × 12 | rooms 100, 70, 20, 14; total 204 |
| multiply (LCM) | 4 and 6; 3 and 4 | 12; 12 (next meeting of 4 and 6: 24) |
| divide | 12 ÷ 4; 14 ÷ 4 | 3 r 0; 3 r 2 |
| divide (leftovers) | 2 left over, 4 plates, cut | each plate gets 2/4 = 1/2 more |
| divide (any) | totals 2–30, plates 2–6 | plates equal; remainder < plates |
| geometry (rope) | 24 m rope, all widths | perimeter always 24; max area 36 at 6 × 6 |
| geometry (rope) | 20 m rope | 5 × 5 = 25 is the maximum |
| kolam | order 4, turn only | no mirror lines; matches after 90° |
| kolam | order 4, mirror | 4 mirror lines; 90° turns |
| sets | rules yellow and circle, 12 blocks | both + only A + only B + neither = 12 |
| logic | AND, OR, NOT, all inputs | AND YES only for open/open; OR YES if any open; NOT shut → YES |
| number | `addOne(digits(99999, 7))` | 100000; bundled 0–4; last 5; Indian `1,00,000`, international `100,000` |
| number | `addAt(digits(9000000, 7), 6)` | `full: true`, digits unchanged |
| number | 305200 | Indian `3,05,200`; international `305,200` |
| number | fractions | 1/2 = 2/4 = 3/6; 3/4 = 6/8; compare(1/3, 1/2) = -1 |
| number | `parseRupees('4.5')`, `('0.45')`, `('12.50')` | 450, 45, 1250 paise; ₹0.5 > ₹0.45 |
| science | organ order | mouth, pipe, stomach, small, large; most absorbed in small |
| science | `rollDistance(1, s)` for tile, wood, rug, sand | 6.0, 3.8, 1.9, 1.2 (pretend metres) |
| science | `shadowLength(1.5, 2.5, 3)`; lamp ≤ stick | 4.5; Infinity |
| science | darkness | cardboard (opaque) darkest; glass (transparent) lightest |
| world | `yearsBetween(-250, 499)`, `(-100, 100)`, `(-50, 50)` | 748, 199, 99 |
| world | `signed(0, …)` | throws (no year zero) |
| world | `centuryCE(1947)`, `(100)`, `(101)` | 20, 1, 2 |
| world | `hourAt(0)`, `(90)`, `(180)`, `(270)` | 12, 18, 0, 6 |
| world | `northernSeason(5)`, `(11)` | summer, winter |
| world | `realDistance(9, 5)`; `isBlocked(4, 3)`, `(0, 0)`, `(8, 0)` | 45; true, false, true |
| world | E4 sample walk N,N,N,E,N,E,E,E,E from the gate | ends at the well; 9 squares |
| curriculum | every lesson | has 6 cards (E1 example has 4 steps); every key it names exists in `en` |

### 8.3 i18n tests (required from Phase 1)
- Key parity: every key in each `en-*` file exists in the matching `hi/te/bn/ta-*` file, except `gloss.*.en` (English only).
- Placeholder parity: the same `{names}` in every translation.
- Glossary parity: the same `[[id|…]]` ids in Bodha strings.
- Script purity: each non-English value is mostly in its script (Devanagari for hi, Telugu for te, Bengali for bn, Tamil for ta; digits, punctuation, ₹, ×, the danda, AND/OR/NOT, A/B and glossary ids allowed). Fail when Latin letters outnumber native letters in any value longer than six letters.
- No duplicate keys across a language's files.
These encode `docs/agent-memory/lessons.md` (2026-10-11).

---

## 9. Integration testing between phases (required)

### 9.1 Journeys (`tests/e2e/journeys/`)
Each journey runs in a real browser at 390×844. Add each journey in the feature named; from then on it runs at the end of **every** later feature.

| ID | Added in | Steps | Asserts |
|---|---|---|---|
| J1 First run | 001 | Clear storage → open app → opening (tap to skip) → language: tap Tamil → Continue | Home appears in Tamil; reload skips language and opening |
| J2 Language switch keeps state | 001, extended in every feature | Open each built workbench, change its model (drag or stepper), switch to Hindi | Every label in Hindi; model unchanged; switch back to English, still unchanged |
| J3 Full lesson M2 | 002 | wonder (slider guess) → bodha (all cards, all example steps) → film (play to end) → rect → mistake → explain → stop | Each step reachable only by its button; stage bar (after 009) shows the right stage; stop shows the sentence |
| J4 Leave and carry on | 002 | Start any lesson, change the bench model, go Home, tap Continue | Returns to the same route with the same model |
| J5 Every lesson end to end | each content feature (003–012) | For each lesson, from its `firstStep` (§6.3): Prashna if it has one → Bodha (for phase 1 benches without a Prashna, open it with "What am I learning?") → bench (all steps) → mistake (tap every fine step, then the wrong one) → explain (expected tiles) → stop | Pothi gets a page; Ashram Continue points to it |
| J6 Pothi reopens the model | 008 | Finish a lesson, open Pothi, tap the page | Bench opens with the saved model |
| J7 Sutra kept in any language | 002 + 008 | Keep a sutra in English, switch to Bengali, open Pothi | Sutra listed in Bengali |
| J8 Acharya corner and reset | 008 | Two-finger hold opens; one finger does not; Erase needs two taps | After erase: no `gurukul:` keys remain |
| J9 Offline | Phase 13 (and 001 for the shell) | Load once, go offline (Playwright `context.setOffline(true)`), reload, run J3 | Everything works |
| J10 Cross-subject | 009, extended in 010–012 | Ashram → each Shala → Jaal → pick each crossing → open each playable knot | Each opens its first step; unbuilt knots say "coming" |

Use these data for J5 (from the prototype click-through):

| Lesson | Bench route | Mistake: wrong step | Explain: expected tiles |
|---|---|---|---|
| N1 | `place` | 2 | `ten`, `two` |
| N3 | `fractions` | 2 | `equal`, `same` |
| U1 | `money` | 2 | `tenths`, `p50` |
| B3 | `digest` | 2 | `blood`, `small` |
| K2 | `ramp` | 1 | `more`, `sooner`, `one` |
| R1 | `shadow` | 2 | `straight`, `shorter` |
| I2 | `timeline` | 1 | `longer`, `no` |
| E1 | `earth` | 2 | `spins`, `tilted` |
| E4 | `map` | 2 | `above`, `ground` |

For the phase 1 lessons (M2, M4, M5, D1, D3, G2, G4, S2/S3, L2) read the wrong step and expected tiles from `js/lessons/ganita-p1.js` and `js/screens/explain.js`, and record them in the feature's test data file.

### 9.2 Five-language sweep (`tests/e2e/sweep/`)
For every built route × `en, hi, te, bn, ta`, at 360×740 and 390×844:
- no uncaught exception and no `console.error`;
- no horizontal overflow (`document.scrollingElement.scrollWidth <= innerWidth`, and no element's right edge beyond the viewport);
- no raw key visible (a regex for dotted lowercase keys such as `bodha.M2.idea`);
- no unfilled `{placeholder}` and no raw `[[`;
- `@axe-core/playwright`: no serious or critical violations;
- every interactive element reachable by Tab, with a visible focus ring.
Run the whole sweep a second time with `reducedMotion: 'reduce'`.

### 9.3 Browser rules for every story
Before ticking a story, open it in the browser (Playwright headed or a screenshot run) and try to break it: empty input, double tap, refresh mid-step, Back button, language switch mid-step, rotate to landscape. Record what you tried in checks.md.

### 9.4 Regression rule
At the end of every feature, run all journeys, all mockup parity tests and the sweep for **every route built so far**, not only the new ones. A failure in an earlier feature blocks this feature's exit gate. Fix the cause (start with the `reproduce-bug` skill); never skip or loosen the old test.

### 9.5 Feature exit gate (all must pass, with output recorded in checks.md)
```bash
python3 scripts/harness/verify.py --fast
npx vitest run
npx playwright test tests/acceptance/<###>
npx playwright test tests/e2e/mockup
npx playwright test tests/e2e/journeys
npx playwright test tests/e2e/sweep
npx depcruise src
python3 scripts/harness/check_traceability.py --write
python3 scripts/harness/verify.py
python3 scripts/harness/sdd_status.py --feature specs/<###>-<name>
```
Then: `/speckit.converge` reports Converged; an independent `reviewer` subagent (fresh context, never the implementer) reviews the diff, the parity images and checks.md, with no open BLOCKER or MAJOR finding; the `verifier` maps every FR and scenario to evidence. Then stop for G4.

---

## 10. Phase 0: foundation (chore lane)

Goal: an empty but fully wired app that every later feature builds on. No product behaviour yet.

| # | Task | Done when |
|---|---|---|
| 0.1 | Ask for dependency approval (§4) with this table | Human says yes |
| 0.2 | `npm init`; add the approved dev dependencies; `tsconfig.json` (strict, `noUncheckedIndexedAccess`); `vite.config.ts`; scripts: `dev`, `build`, `preview`, `test`, `e2e` | `npm run build` produces `dist/` |
| 0.3 | Folder skeleton per ARCHITECTURE.md §2, each domain with `index.ts` | Folders exist |
| 0.4 | `.dependency-cruiser.cjs` encoding ARCHITECTURE.md §4 (domain imports no ui/persistence/DOM; curriculum may import math, science, world; science and world may import math only via its index, never each other) | `npx depcruise src` passes; a deliberately bad import in a scratch branch fails |
| 0.5 | ESLint (no `any`, no unused), Prettier config | Both pass |
| 0.6 | Playwright config: Chromium, 390×844 and 360×740 projects, a `prototype` base URL using `file://` to `design/prototype/index.html`, an `app` base URL from `vite preview` | A smoke test opens both |
| 0.7 | `tests/e2e/tools/capture-mockups.ts` (route, language, states → PNG) | Captures `#home` of the prototype in en and ta |
| 0.8 | Sweep and journey test scaffolds with the helpers from §9 (overflow, raw key, placeholder, console, axe) | Run green against the prototype as a sanity check (the prototype must pass its own sweep) |
| 0.9 | Write `docs/rules/MATH_RULES.md`, `SCIENCE_RULES.md`, `WORLD_RULES.md`, `CURRICULUM_RULES.md`, `MANIPULATIVE_RULES.md`, `I18N_RULES.md`: one page each, listing the rules the module owns and pointing to CURRICULUM*.md for facts | Files exist and are linked from ARCHITECTURE.md |
| 0.10 | Propose (do not merge) the protected-file changes: enable `format`, `lint`, `typecheck`, `unit-tests`, `acceptance-tests` (Playwright), `architecture-rules` in `harness.toml`; add mockup, journeys and sweep checks; add Node setup and Playwright install to `.github/workflows/quality-gates.yml`; replace CODEOWNERS placeholders with the handles a human gives you | Human approves the PR |
| 0.11 | Self-hosted Noto fonts in `public/fonts/` with `@font-face`; line height ≥ 1.7 for Indic | Fonts load offline |
| 0.12 | Create `specs/` and copy `docs/templates/progress-template.md` and `checks-template.md` conventions into a README in `specs/` | Ready for 001 |

Exit: `python3 scripts/harness/verify.py` passes with the new checks enabled; draft PR `chore/foundation`; human merges.

---

## 11. Feature playbook (repeat for 001 to 012)

### 11.1 The steps, every time
1. **Start the session** with the `session-handoff` skill. Read `specs/<###>/progress.md` if it exists. Create `feat/<###>-<name>` from `main`.
2. **Specify**: run `/speckit.specify` with the feature's brief from SPECKIT_HANDOFF §3, pasted verbatim, followed by: "Mockups: <routes from §11.2>. Reference implementation: <files from §11.2>. Follow docs/product/DEV_HANDOFF.md."
3. **Clarify**: run `/speckit.clarify`. Answer from the docs; ask the human only what the docs do not settle.
4. **Mockups**: write `specs/<###>/mockups.md` and capture screenshots (§5.1).
5. **G1**: stop. The human approves spec.md and mockups.md (including deviations).
6. **Plan**: run `/speckit.plan`. plan.md must contain these sections, or G2 is refused:
   - Port map: each prototype file → production file (§7), and what changes.
   - Engine use: which parts of §6 the feature uses or extends.
   - Domain tests: the rows of §8.2 that apply, plus any new ones.
   - Test plan: acceptance tests per scenario ID; mockup parity routes; journeys added or extended (§9.1); sweep routes.
   - Dependencies: "none" or a justified request.
   - Risks and deviations.
7. **G2**: stop for approval.
8. **Tasks**: run `/speckit.tasks`. tasks.md must include, per user story, these task kinds (check before moving on: every kind appears):
   - `[mockup]` capture states for the story's routes;
   - `[test-acceptance]` acceptance tests for every scenario (written by the `test-designer` role, failing first);
   - `[test-unit]` domain tests from §8.2 for the rules touched;
   - `[port-domain]`, `[port-ui]` implementation tasks;
   - `[i18n]` port the story's string keys in five languages and pass §8.3;
   - `[test-parity]` mockup parity spec for each route;
   - `[test-journey]` add or extend journeys;
   - `[regression]` run all journeys, parity and sweep for every route built so far;
   - `[a11y]` keyboard path, labels, reduced motion checked in the sweep;
   - `[evidence]` checks.md rows filled.
9. **G3**: write the acceptance tests first (`write-acceptance-tests` skill), confirm they fail for the right reason, and stop for the human to skim them.
10. **Implement**: `/speckit.implement`, one task at a time, smallest change, run the task's Verify command, tick it, commit. Port domain code before the UI that uses it. Keep `progress.md` current.
11. **Exit gate**: run §9.5 in full. Fix failures at the cause. Two failed attempts at the same step: stop, write it in progress.md, re-plan.
12. **Review**: launch the `reviewer` and then the `verifier` subagents. Fix BLOCKER and MAJOR findings, re-run the exit gate.
13. **G4**: push the branch, open a draft PR using `.github/pull_request_template.md` and the output contract, with evidence and AI disclosure. Stop. A human merges.

### 11.2 Per-feature specifics

#### 001 App shell, language switching and fonts
- **Mockup routes**: `opening`, `language`, `home` (build the home as the **Ganita Shala loom** rendered by the Shala component from curriculum data; 009 wraps it in the Ashram), `shala?s=ganita`.
- **Reference files**: `index.html`, `styles.css`, `js/util.js`, `js/i18n/*`, `js/router.js`, `js/app.js` (top bar, language button, sound and theme; not REVIEW_NAV), `js/ui.js`, `js/screens/opening.js`, `language.js`, `shala.js`, `js/model/curriculum.js` (Ganita section, `playable`, `firstStep`, `findKnot`).
- **Build**: tokens and theme (night colours), router and state keys (§6.1), screen meta (§6.2), i18n runtime and **all** dictionaries (§6.5; port all keys now, so later features only use them), persistence with the `gurukul:` prefix, the language screen, the opening, the Shala loom component, a service worker for the shell.
- **Unit tests**: router parse and state key; i18n fallback and placeholders; §8.3 parity tests over all dictionaries; curriculum `playable`/`firstStep`.
- **Journeys**: J1, J2 (shell only), J9 (shell offline).
- **Watch**: the language must switch without losing state (US2-AS1); missing keys fall back to English (US2-AS2).

#### 002 Lesson engine, Bodha cards and Living Film player
- **Mockup routes**: `wonder`, `bodha?k=M2`, `film`, `rect` (as the sample bench), `mistake`, `explain`, `stop`.
- **Reference files**: `js/screens/wonder.js`, `prashna.js`, `bodha.js`, `film.js`, `mistake.js`, `explain.js`, `stop.js`, `workbenches.js` (rect only), `js/lessons/fig.js`, `js/lessons/ganita-p1.js` (M2 data), `js/voice.js`, `js/manipulatives/area-grid.js`, `js/model/multiply.js`.
- **Build**: the lesson registry and flow (§6.3, §6.6), the Bodha card engine (cards from data, worked example step reveal, glossary bridge card with `tIn('en', …)`, text size, read aloud, keep sutra, "What am I learning?" from benches), the film player (beats, scrubber, pause and hold, reduced-motion cuts), the generic mistake and explain screens, narration with captions, the banned-praise list.
- **Journeys**: J3, J4, J7 (keep sutra; the Pothi list arrives in 008, so assert the stored key here).
- **Watch**: Prashna/Bodha are generic, so build them data-driven now even though only M2 uses them in 002.

#### 003 Multiplication
- **Mockup routes**: `wonder`, `film`, `rect`, `drums`, `mistake` (M4), `bodha?k=M4`, `bodha?k=M5`.
- **Reference**: `workbenches.js` (rect, drums), `manipulatives/area-grid.js`, `drums.js`, `model/multiply.js`, `lessons/ganita-p1.js` (M2, M4, M5), M4 mistake in `screens/mistake.js` (prefix `m4`).
- **Domain tests**: multiply rows of §8.2. **Journeys**: J5 for M2, M4, M5; extend J2. M1 and M3 need mockups first (§2.3).

#### 004 Division
- **Mockup routes**: `share?mode=share`, `share?mode=leftover`, `bodha?k=D1`, `bodha?k=D3`.
- **Reference**: `workbenches.js` (share), `manipulatives/fair-share.js`, `model/divide.js`, `lessons/ganita-p1.js` (D1, D3).
- **Journeys**: J5 for D1, D3. D2 and D4 need mockups first.

#### 005 Geometry
- **Mockup routes**: `rope`, `kolam`, `bodha?k=G2`, `bodha?k=G4`.
- **Reference**: `workbenches.js` (rope, kolam), `manipulatives/rope.js` (rope, areaHill), `kolam-mirror.js`, `kolam-line.js`, `model/geometry.js`, `model/kolam.js`, `lessons/ganita-p1.js` (G2, G4).
- **Journeys**: J5 for G2, G4. G1, G3, G5 need mockups first.

#### 006 Sets
- **Mockup routes**: `sets?mode=sort`, `sets?mode=guess`, `bodha?k=S2`.
- **Reference**: `workbenches.js` (sets), `manipulatives/courtyard.js`, `model/sets.js`, `lessons/ganita-p1.js` (S2, S3).
- **Journeys**: J5 for S2 and S3. S1 needs a mockup first.

#### 007 Logic
- **Mockup routes**: `logic`, `bodha?k=L2`.
- **Reference**: `workbenches.js` (logic), `manipulatives/marbles.js`, `model/logic.js`, `lessons/ganita-p1.js` (L2).
- **Journeys**: J5 for L2. L1, L3, L4 need mockups first.

#### 008 Pothi, recall and Acharya corner
- **Mockup routes**: `explain`, `stop`, `notebook`, `grownups`, and the Ashram's "Remember this?" card (`home`).
- **Reference**: `js/screens/explain.js` (pages, voice notes in memory), `stop.js`, `notebook.js` (thumbnails via `Lesson.thumb`, "Sutras I keep"), `grownups.js`.
- **Journeys**: J6, J7, J8; extend J5 to assert the page and thumbnail for every lesson built so far. Return questions (US4) need a mockup first.

#### 009 Gurukul shell
- **Mockup routes**: `home` (Ashram), `shala?s=ganita`, `shala?s=vijnana`, `shala?s=loka`, `jaal`, and the stage bar on every lesson route.
- **Reference**: `js/screens/ashram.js`, `shala.js`, `jaal.js`, `js/ui.js` (`stageBar`, `openKnot`, `enterThread`), `js/model/curriculum.js` (all sections, `JAAL`), `js/i18n/*-gurukul.js`.
- **Build**: the Ashram replaces the 001 home and reuses the Shala loom; stage bar inserted by the router for screens with `stage`.
- **Journeys**: J10; re-run J1–J8 (the home changed, so every journey that starts at home must still pass).

#### 010 Ganita expansion
- **Mockup routes**: `prashna?k=N1`, `bodha?k=N1`, `place`; `prashna?k=N3`, `bodha?k=N3`, `fractions`; `prashna?k=U1`, `bodha?k=U1`, `money`; `mistake`, `explain`, `stop` for each.
- **Reference**: `model/number.js`, `manipulatives/ganita-p2.js`, `lessons/ganita-p2.js`, `screens/lessons-ganita.js`, `i18n/*-ganita.js`.
- **Domain tests**: number rows of §8.2. **Journeys**: J5 for N1, N3, U1; J10 opens them from the Ganita Shala.

#### 011 Vijnana
- **Precondition**: a science teacher has signed off the facts (human gate before G1).
- **Mockup routes**: `prashna`, `bodha`, bench, `mistake`, `explain`, `stop` for B3 (`digest`), K2 (`ramp`), R1 (`shadow`).
- **Reference**: `model/science.js`, `manipulatives/vijnana.js`, `lessons/vijnana.js`, `screens/lessons-vijnana.js`, `i18n/*-vijnana.js`.
- **Watch**: ramp distances are labelled pretend; the B3 demo keeps its reading pace under reduced motion; R1 has one material chip row.
- **Journeys**: J5 for B3, K2, R1; J10 opens them from the Vijnana Shala and the shadows–Earth Jaal link (the Earth end becomes playable in 012).

#### 012 Loka
- **Precondition**: a social-studies teacher has signed off the dates and facts.
- **Mockup routes**: the full flow for I2 (`timeline`), E1 (`earth`), E4 (`map`).
- **Reference**: `model/world.js`, `manipulatives/loka.js`, `lessons/loka.js`, `screens/lessons-loka.js`, `i18n/*-loka.js`.
- **Watch**: no year zero anywhere (the timeline's join is "1 BCE | 1 CE"); seasons come from the tilt, not distance; the map's scale multiplies.
- **Journeys**: J5 for I2, E1, E4; J10 complete across all three Shalas and every Jaal link.

---

## 12. Phase 13: release readiness (after 012)

| # | Task | Done when |
|---|---|---|
| 13.1 | Run every check in §9.5 for the whole app | All green |
| 13.2 | J9 offline across all lessons | Pass |
| 13.3 | Performance on a low-end Android profile (Playwright CPU throttling ×4, Slow 4G for first load) | Films at 60 fps target recorded; first load and lesson open times recorded in checks.md |
| 13.4 | Bundle size report (`vite build` output) | Recorded; no runtime third-party requests (verify in the network log) |
| 13.5 | Privacy check: storage contains only the keys in §6.4; no network calls after load | Evidence in checks.md |
| 13.6 | Accessibility: sweep with axe in five languages, keyboard-only run of J3 and J5, screen-reader spot check (TalkBack or NVDA) of one lesson | Evidence recorded |
| 13.7 | Final reviewer and verifier pass over the whole app | No BLOCKER/MAJOR |
| 13.8 | Stop. Humans decide hosting and deploy (a static site), translation sign-off and the second children's round | — |

---

## 13. What only humans can unblock

| Item | Needed before | Owner |
|---|---|---|
| Dependency approval (§4) and protected-file PR (Phase 0.10) | Phase 0 exit | Tech lead |
| CODEOWNERS handles | Phase 0 exit | Tech lead |
| Children's testing round 1 (SPECKIT_HANDOFF §5) | Starting 003 | Product owner |
| Native-teacher review of Hindi, Telugu, Bengali and Tamil strings | Release; ideally before 009 | Product owner |
| Science teacher sign-off (B3, K2, R1 facts) | 011 G1 | Product owner |
| Social-studies teacher sign-off (I2 dates, E1, E4) | 012 G1 | Product owner |
| Board alignment (CBSE/NCERT or state board) | 010 G1 | Product owner |
| Narration voices (device speech or recorded) | 002 G2 | Product owner |
| Trademark and app-store check for "Gurukul" | Release | Product owner |
| Hosting and deployment | Release | Tech lead |
| ADR-0002 status from Proposed to Accepted | 009 G1 | Product owner |

---

## 14. Session protocol (every session)

1. Start: `session-handoff` skill; read `progress.md`, the last commits, and `python3 scripts/harness/sdd_status.py`.
2. Restate the one story you will do this session and its done condition.
3. Work task by task (§11.1 step 10). Run `python3 scripts/harness/verify.py --fast` after each change.
4. Before stopping: update `progress.md` (done, in progress, next action, blockers), commit, push the feature branch.
5. End with the output contract from `AGENTS.md` §12.

If you were corrected by a human, add a candidate lesson (`capture-lesson` skill).

---

## 15. Common failure modes to avoid

| Failure | Prevention in this guide |
|---|---|
| Built new screens instead of the mockups | Rule 1, §5 (mockups.md at G1, automated parity test, reviewer image check) |
| Re-invented the lesson flow or logic | Rule 2, §6, §7 port map, §8.2 known values |
| No integration testing between phases | Rule 4, §9.1 journeys, §9.4 regression rule, §9.5 exit gate |
| Only unit tests; UI never opened | Rule 5, §9.2 sweep, §9.3 browser rules |
| Translations broken or romanised | §8.3 tests from Phase 1 |
| Logic drifting into screens | Rule 7, dependency-cruiser in Phase 0 |
| Tests loosened to pass | Rule 8, `test-integrity` check, protected `tests/acceptance/` |
| Work lost between sessions | Rule 9, §14 |
| Scope creep (films, extra knots) | §2.3, §2.4: only with a spec and an approved mockup |
