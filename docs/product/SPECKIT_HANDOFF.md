# Spec Kit handoff: building Gurukul

This document is for the agent (and the spec owner) who will build Gurukul in this repo using Spec Kit. **The step-by-step execution guide (phases, mockup fidelity, engine port, tests, integration gates) is [DEV_HANDOFF.md](DEV_HANDOFF.md); follow it.** It turns the concept into an ordered list of features, each with a ready-to-paste `/speckit.specify` brief. The product is called **Gurukul**; "Sutra" now names a subject thread and the one-line rule a child keeps (see [ADR 0002](../decisions/0002-gurukul-frame-and-subjects.md)). The internal `window.Sutra` namespace in the prototype keeps its old name.

The briefs are **drafts**. Each `spec.md` belongs to the spec owner and must be approved at gate G1 before any plan or code (constitution, principle I). The user-story and scenario IDs below (`US1-AS1` and so on) are suggestions so traceability can start early; the spec owner may renumber them.

Read these first, in this order:

1. [CONCEPT.md](CONCEPT.md): what Gurukul is and what it refuses to be.
2. [EXPERIENCE.md](EXPERIENCE.md): screens, lesson anatomy (including the Bodha step), interaction, visual system, language, accessibility.
3. [CURRICULUM.md](CURRICULUM.md): the 21 phase 1 maths concept threads and their misconceptions.
4. [CURRICULUM_PHASE2.md](CURRICULUM_PHASE2.md): every Class 5 maths, science and social studies chapter mapped to Shala, thread and knot, and the nine new playable lessons.
5. [RESEARCH.md](RESEARCH.md): the evidence behind each decision.
6. The prototype: open `design/prototype/index.html` in a browser (no build step). The panel on the left lists every screen and explains why each one works the way it does.
7. [ADR 0001](../decisions/0001-product-direction.md) and [ADR 0002](../decisions/0002-gurukul-frame-and-subjects.md): the product-direction decisions this handoff assumes.

## 1. How to use the prototype

The prototype is a **reference to re-implement**, not code to copy into `src/`. It is plain JavaScript with global objects so it can open from a file without a build; production code follows [ARCHITECTURE.md](../ARCHITECTURE.md) (TypeScript, pure domain modules, tests).

What *is* worth porting directly, after review:

| Prototype file | What to take | Future owner |
|---|---|---|
| `js/model/*.js` | The pure maths (area and partial products, column method, fair dealing, leftover fractions, rope rectangles, symmetry transforms, set regions, logic gates, kolam curve). Each was checked by hand; port with unit tests. | `src/domain/math/` |
| `js/model/number.js` | Place value with Indian and international grouping, equivalent fractions, rupees and paise. | `src/domain/math/` |
| `js/model/science.js` | Digestion order, the ramp's pretend roll distances, shadow length and materials. The numbers are illustrative; a science teacher must sign off the facts. | `src/domain/science/` |
| `js/model/world.js` | BCE/CE arithmetic with no year zero, Earth's spin and seasons, map directions and scale. | `src/domain/world/` |
| `js/model/curriculum.js` | Shalas (sections), threads, knots and cross-subject crossings for the Ashram, Shala and Jaal screens. | `src/domain/curriculum/` |
| `js/lessons/*.js` | Each lesson's data: Bodha cards, Prashna art, the mistake worked example and the explain-back template. | `src/domain/curriculum/` content |
| `js/i18n/` | Key names and English strings. Indic strings are drafts that need native-teacher review before use. | `src/domain/i18n/` |
| `js/manipulatives/*.js` | Interaction behaviour: drag plus keyboard plus stepper for every handle, ghosts of earlier states, linked panes. Re-implement, do not copy. | `src/ui/manipulatives/` |
| `js/screens/*.js` | Screen composition and the reviewer notes (the "why" of each screen). | `src/ui/components/` |
| `styles.css` | Design tokens (colours, type scale, Indic line height, night theme). | `src/ui/components/` (theme) |

## 2. Feature sequence

Build in this order. Each feature is independently testable and leaves the app usable.

| # | Feature | Depends on | Delivers |
|---|---|---|---|
| 001 | App shell, language switching and fonts | none | Opening, language choice, Loom, top bar, five languages, offline, night theme |
| 002 | Lesson engine, Bodha cards and Living Film player | 001 | The Prashna, Bodha, Film, Workbench, Mistake, Explain, Stop flow as a reusable engine; Bodha card engine with glossary; film player |
| 003 | Multiplication threads (M1–M5) | 002 | Rubber Rectangle, Two Drummers, and the first complete thread |
| 004 | Division threads (D1–D4) | 002, 003 | Fair Share Table, leftovers to fractions, missing side |
| 005 | Geometry threads (G1–G5) | 002 | Rope and Pegs, Kolam Mirror, angles, shear, nets |
| 006 | Set threads (S1–S3) | 002 | Sorting Courtyard, reverse sorting |
| 007 | Logic threads (L1–L4) | 002, 006 | Marble Machine, counterexamples, conditionals, patterns |
| 008 | Notebook, recall and grown-ups page | 002 (pages), 003 (first content) | Notebook (the Pothi), interleaved Return questions, grown-ups page (the Acharya corner), reset |
| 009 | Gurukul shell: Ashram, Shalas and Jaal | 001, 002 | Ashram home, one Shala loom per subject, the cross-subject Jaal, the Shravana/Manana/Nididhyasana step bar |
| 010 | Ganita expansion (N1, N3, U1) | 002, 009 | Place-value houses with lakh and crore, folding fraction strips, the rupee grid |
| 011 | Vijnana lessons (B3, K2, R1) | 002, 009 | Journey of a roti, the ramp fair test, the lamp and the stick |
| 012 | Loka lessons (I2, E1, E4) | 002, 009, 010 (large numbers) | Thread of time, spin and travel, courtyard from above |

**Run a round of testing with children after 002 and before 003** (section 5). Feature 003 is the most expensive to change once built. Features 009–012 can start after 008; they reuse the engine and add content, so a second round of testing (one Vijnana and one Loka lesson per language) should come before 011 and 012 are finished.

## 3. Briefs for `/speckit.specify`

Paste the block for a feature after `/speckit.specify`. Each brief states the user value, the stories, draft acceptance scenarios, and what is out of scope.

### 001 · App shell, language switching and fonts

```text
Feature 001: App shell, language switching and fonts for Gurukul, a calm learning app for 10-year-olds (see docs/product/CONCEPT.md, EXPERIENCE.md §2, §6 and §7, prototype screens #opening, #language, #home).

Note: 001 delivers the maths-only Loom as the first home so 002–008 can be built and tested; feature 009 replaces it with the Ashram and the three Shalas, and the Loom becomes the Ganita Shala.

Who and why: a child aged about 10 in India, often on a shared, low-cost Android phone, sometimes offline, who learns best in their home language. Parents rejected the previous app as not useful; children found it complex. The shell must be calm, readable and instantly switchable between English, Hindi, Telugu, Bengali and Tamil.

User stories:
US1 (P1) First run: the child opens the app, sees a short opening (one thread drawing a kolam), chooses a language from cards written in each language's own script, and lands on the Loom (home).
US2 (P1) Switch language anywhere: from any screen, the child taps the language button and the whole interface, including the current screen's state, re-renders in the chosen language without losing their place.
US3 (P2) The Loom: the child sees five domain threads (multiplying, sharing and dividing, shapes and space, sets, logic) with concept knots; nothing is locked; one suggested starting knot per domain; finished knots show a small picture of what the child built.
US4 (P2) Offline and shared phones: the app works with no network after first load and stores nothing that identifies the child.
US5 (P3) Night colours: a grown-up can switch to a darker theme.

Acceptance scenarios (draft):
US1-AS1 Given a first launch, When the opening finishes or the child taps Begin, Then the language screen shows five cards, each in its own script.
US1-AS2 Given the language screen, When the child taps Tamil and then Continue, Then the Loom appears in Tamil and the choice is remembered on the next launch.
US1-AS3 Given a returning child, When the app opens, Then it skips the language screen and goes to the Loom.
US2-AS1 Given a workbench with the child's model in a changed state, When the language is switched to Hindi, Then every label is in Hindi and the model is unchanged.
US2-AS2 Given any screen, When a string has no translation, Then the English string is shown and a warning is logged in development only.
US3-AS1 Given the Loom, When the child taps a knot that is not built yet, Then a short message says it is coming, and nothing breaks.
US4-AS1 Given the app has loaded once, When the network is off, Then every built screen still works.
US4-AS2 Given any use of the app, When local storage is inspected, Then it contains no name, age, email, device identifier or analytics data.
US5-AS1 Given night colours are on, When any screen is shown, Then text contrast meets WCAG AA.

Non-functional: Noto fonts for all five scripts with line height of at least 1.7 for Indic scripts; touch targets at least 48 px; works at 360 px width; full keyboard and screen-reader support; respects reduced-motion; no third-party scripts at runtime other than self-hosted fonts.

Out of scope: lessons, notebook, accounts, any network service.
```

### 002 · Lesson engine, Bodha cards and Living Film player

```text
Feature 002: Lesson engine, Bodha cards and Living Film player (see EXPERIENCE.md §3, §4 and §5, RESEARCH.md §3 and §4, ADR 0002, prototype screens #wonder, #bodha?k=M2, #film, #rect, #mistake, #explain, #stop).

Who and why: research for this age favours brief prediction, then explicit teaching with worked examples whose help fades, then self-explanation and retrieval. Every concept thread runs the same shape so children learn the routine once and spend attention on the maths.

User stories:
US1 (P1) Thread flow: a thread runs Prashna (one question and a guess, formerly the Wonder), Bodha (the concept explained), a Living Film where the knot has one, Workbench, Spot the mistake, Explain it back, then A good place to stop. Knots without a film go from Bodha straight to the workbench; their Bodha diagrams and the workbench's "Show me" demo do the film's job (ADR 0002). In the prototype only M2 has a film. The child can leave at any point and the Loom offers "carry on" to the exact step.
US6 (P1) Bodha cards: before trying anything, the child reads five or six learner-paced cards: what we are learning, the idea, why it works, a worked example revealed step by step, where you see it in India, and the sutra (a one-line rule to keep). Each card has at most three short sentences and a diagram; key words open a glossary with the everyday meaning and the English school term; each card can be read aloud. A "What am I learning?" link on every workbench reopens Bodha.
US2 (P1) Living Film player: a film is a scene computed from time, not a video file. It is narrated, split into short beats, stops after each beat until the child presses play, scrubs both ways, and when paused the child can grab the model and change it; the scripted state stays visible as a faint outline.
US3 (P1) Narration and captions: every film line and spoken prompt is captioned; captions are on by default (revisit once recorded narration exists, see RESEARCH.md C9 redundancy); narration speed can be slower or normal; sound can be turned off and everything still works.
US4 (P2) Workbench steps: a workbench shows numbered steps that fade from "watch me" to "your turn", with linked representations (the model, the equation, and at least one other view) updating together.
US5 (P2) Feedback rules: the app describes what happened ("that makes 24 tiles"), never praises or scores, never uses red for wrong; kumkum red marks only "look here".

Acceptance scenarios (draft):
US1-AS1 Given a child mid-thread at the workbench, When they go back to the Loom, Then a "carry on" card returns them to the workbench with their model as they left it.
US2-AS1 Given a playing film, When a beat ends, Then playback stops and the beat's line stays visible until play is pressed.
US2-AS2 Given a paused film after the model has appeared, When the child drags the model's handle, Then the scene shows the child's model and the scripted model remains as an outline.
US2-AS3 Given a film, When the child drags the scrubber backwards, Then the scene shows exactly the state for that time.
US2-AS4 Given reduced motion is set, When a film plays, Then movement is replaced by cuts between beat end states.
US3-AS1 Given sound is off, When a film plays, Then every line appears as a caption in the current language.
US4-AS1 Given a workbench, When the model changes by drag, keyboard or stepper, Then the equation and every linked pane update in the same frame.
US5-AS1 Given any child action, When feedback is shown, Then it contains no praise words, points, stars or streaks (checked against a banned-word list per language).
US6-AS1 Given a Prashna answered with any choice, When the child continues, Then the first Bodha card for that knot appears before the film or workbench.
US6-AS6 Given the sutra card of a knot with no film, When the child continues, Then the workbench opens; for a knot with a film, the film opens.
US6-AS2 Given the worked-example card, When the child taps Next step, Then exactly one more step appears and is read aloud; Next stays available but is not the main button until every step is shown.
US6-AS3 Given a card with a key word in a language other than English, When the child taps it, Then a glossary card shows the word, its meaning in the current language and the English school term, and the meaning is read aloud.
US6-AS4 Given any workbench, When the child taps "What am I learning?", Then that knot's Bodha opens and Back returns to the workbench with the model unchanged.
US6-AS5 Given the sutra card, When the child keeps it, Then the sutra appears in the Pothi under "Sutras I keep" in whichever language is current.

Non-functional: films run at 60 fps on a low-end Android phone; a film's script is data (beats, timings, narration keys), so translators never touch code; Bodha cards are data (string keys plus a diagram function), so every lesson uses the same engine.

Out of scope: specific maths content beyond one sample thread (M2) used to test the engine; Bodha text for other knots (it ships with each content feature).
```

### 003 · Multiplication threads (M1–M5)

```text
Feature 003: Multiplication threads M1–M5 (CURRICULUM.md §3 multiplication; prototype #wonder, #film, #rect, #mistake, #drums).

Who and why: children often treat multiplication as repeated adding facts to memorise and break two-digit multiplication by forgetting cross terms (23 × 14 = 200 + 12). Seeing multiplication as area makes the column method visible.

User stories:
US1 (P1) M2 Multiplication is area: Wonder asks how many tiles cover a courtyard; the film builds it row by row; the child makes their own floor.
US2 (P1) M4 Cut the rectangle: on the Rubber Rectangle the child stretches a grid to 23 × 14, cuts it at the tens into four rooms, sees each room's product and folds the rooms into the written column method; then does 17 × 12 alone.
US3 (P1) M4 Spot the mistake: the child finds the wrong step in a worked example that forgot two rooms and sees the missing rooms outlined.
US4 (P2) M5 Two drummers: two rhythms play on one beat line; the child predicts where they first meet and sees common multiples marked; 4 and 6 meet at 12, not 24.
US5 (P3) M1 Equal groups and M3 Turn it around, using the same engine.

Acceptance scenarios (draft):
US2-AS1 Given a 23 × 14 grid, When the child cuts at the tens, Then four rooms show 200, 30, 80 and 12 and their sum 322.
US2-AS2 Given the cut grid, When the child folds into the column, Then each column line lights up together with its strip of rooms.
US2-AS3 Given step 3, When the child makes 17 × 12 by any input method, Then the rooms 100, 70, 20 and 14 and the total 204 are shown.
US3-AS1 Given the mistake screen, When the child taps a correct step, Then a line explains why that step follows, without saying "wrong".
US3-AS2 Given the mistake screen, When the child taps the wrong step, Then the four-room picture appears with 30 and 80 outlined.
US4-AS1 Given drummers every 4 and 6 beats, When the rhythm plays, Then beat 12 is ringed as the first meeting and beat 24 as the next.

Out of scope: times-table drills, timed quizzes.
```

### 004 · Division threads (D1–D4)

```text
Feature 004: Division threads D1–D4 (CURRICULUM.md §4; prototype #share?mode=share and #share?mode=leftover).

Who and why: children think sharing can be unequal, that division always "comes out", and that leftovers are thrown away. Dealing by hand, round and round, is how they already share.

User stories:
US1 (P1) D1 Fair share: the child deals laddoos onto plates one round at a time or all at once; the written forms show division and the multiplication it undoes.
US2 (P1) D3 Leftovers: what cannot complete a round waits in a leftover tray; the child can cut leftovers into equal pieces so each plate gets a fraction more.
US3 (P2) D2 How many groups (grouping rather than sharing).
US4 (P2) D4 Missing side: a rectangle with known area and one side; find the other; links back to multiplication.

Acceptance scenarios (draft):
US1-AS1 Given 12 laddoos and 4 plates, When all are dealt, Then each plate holds 3, the tray is empty, and "12 ÷ 4 = 3" and "4 × 3 = 12" are shown.
US2-AS1 Given 14 laddoos and 4 plates, When all are dealt, Then each plate holds 3 and 2 wait in the tray, with "14 ÷ 4 = 3 r 2".
US2-AS2 Given 2 leftovers and 4 plates, When the child cuts the leftovers, Then each plate receives 2/4 = 1/2 more and the written form shows it.
US1-AS2 Given any total from 2 to 30 and 2 to 6 plates, When dealing finishes, Then plates are equal and the remainder is less than the number of plates.

Out of scope: long division algorithm, decimals.
```

### 005 · Geometry threads (G1–G5)

```text
Feature 005: Geometry threads G1–G5 (CURRICULUM.md §5; prototype #rope and #kolam).

Who and why: children assume shapes with the same perimeter have the same area, and that every symmetrical pattern has a mirror line. The Sulba Sutras built geometry with rope and pegs; kolam is drawn at Indian thresholds every morning.

User stories:
US1 (P1) G2 Rope and pegs: with a fixed rope, the child pulls the corner peg; the perimeter stays constant while the area changes; every rectangle tried adds a bar to an "area hill"; the square holds the most.
US2 (P1) G4 Kolam mirror: the child draws one stroke and it repeats by the chosen symmetry (1, 2, 4 or 8), as mirror-and-turn or turn only; the readout names mirror lines and the smallest turn.
US3 (P2) G1 Angles as turns, G3 Slide the top, G5 Fold a box.

Acceptance scenarios (draft):
US1-AS1 Given a 24 m rope, When the child moves the peg through every width, Then the perimeter always reads 24 m and the largest area is 36 m² at 6 by 6.
US1-AS2 Given a 20 m rope, When the square is reached, Then the app states that a 5 by 5 square holds 25 m², the most of all.
US2-AS1 Given order 4 and turn only, When the child draws, Then the pattern has no mirror lines and matches itself after a 90° turn.
US2-AS2 Given order 4 and mirror, When the child draws, Then the readout says 4 mirror lines and 90° turns.
US2-AS3 Given a first visit, When the screen opens, Then a demonstrating hand draws one stroke before the child's turn.

Out of scope: formulas for area of circles or triangles.
```

### 006 · Set threads (S1–S3)

```text
Feature 006: Set threads S1–S3 (CURRICULUM.md §6; prototype #sets?mode=sort and #sets?mode=guess).

Who and why: children think an object that fits two rules must go in one group. A courtyard where blocks walk to where their rules put them makes overlap, union and outside visible.

User stories:
US1 (P1) S2 Two rings: the child changes each ring's rule and watches blocks move; "and", "or" and "not" light up their regions with counts; pulling the rings apart leaves blocks that belong to both with nowhere to stand; one ring inside the other shows a subset.
US2 (P1) S3 Which rules made this: rules are hidden; the child picks a rule for each ring; blocks that would have to move are outlined until the sort matches.
US3 (P2) S1 Sort by a rule.

Acceptance scenarios (draft):
US1-AS1 Given rules yellow and circle, When the rings overlap, Then the counts for both, only A, only B and neither add up to 12.
US1-AS2 Given rules yellow and circle, When the rings are pulled apart, Then the blocks that are both yellow and circles are outlined as having nowhere to stand.
US1-AS3 Given "and" is chosen, When the courtyard updates, Then only the overlap is lit and the sentence names the count.
US2-AS1 Given hidden rules green and big, When the child chooses green and big, Then the rule labels are revealed and no block moves.
US2-AS2 Given hidden rules, When the child's rules would move some blocks, Then exactly those blocks are outlined and the count is stated.

Out of scope: three-set diagrams, formal set notation beyond { } in the notebook.
```

### 007 · Logic threads (L1–L4)

```text
Feature 007: Logic threads L1–L4 (CURRICULUM.md §7; prototype #logic).

Who and why: children read "or" as "only one" and think many examples prove a rule. A marble machine makes AND, OR and NOT physical, and every try leaves a row in the truth table.

User stories:
US1 (P1) L2 Marble gates: the child opens or shuts doors and drops a marble; it follows the route the gate allows and lands in YES or NO; each try fills one truth-table row that stays.
US2 (P1) L2 Mystery machine: the machine is covered; the child fills the table and then names the hidden gate.
US3 (P2) L1 True for all, L3 If this then that, L4 What comes next.

Acceptance scenarios (draft):
US1-AS1 Given the AND gate, When every combination of doors has been tried, Then the table shows YES only for open/open and a rule sentence appears.
US1-AS2 Given the OR gate with both doors open, When a marble drops, Then it lands in YES.
US1-AS3 Given the NOT gate, When door A is shut, Then the marble lands in YES.
US2-AS1 Given a hidden gate and a full table, When the child names the correct gate, Then the cover lifts and the gate is shown.
US2-AS2 Given a hidden gate, When the child names a wrong gate, Then they are asked to check the table against that gate, without a score.

Out of scope: gate circuits with more than two inputs.
```

### 008 · Notebook, recall and grown-ups page

```text
Feature 008: Notebook, interleaved recall and grown-ups page (EXPERIENCE.md §3 and §10, RESEARCH.md §5 and §6; prototype #explain, #stop, #notebook, #grownups).

Who and why: points and badges were rejected; children keep what they explain. Remembering again later, mixed with other ideas, is what makes learning last. Parents want to see learning, not screen time.

User stories:
US1 (P1) Explain it back: at the end of a thread, the child completes one sentence from word tiles; if it does not match the model, a gentle hint points back to the model and the child may keep their own sentence; an optional voice note stays in memory only.
US2 (P1) Notebook: each kept sentence becomes a page with a small picture of the child's model; pages are newest first and re-read in any language; tapping a page reopens the workbench as it was.
US3 (P1) A good place to stop: after keeping a page, the app names what the child now knows, shows their sentence, and offers the Loom or the notebook; no score, no streak, no "come back tomorrow".
US4 (P2) Return: on a later visit, one or two quick questions mix earlier threads before new work.
US5 (P2) Grown-ups page: behind a two-finger hold, a grown-up sees this week's sentences, how Gurukul teaches, the privacy promise, and settings (language, narration speed, captions, night colours, erase everything with a second confirming tap).

Acceptance scenarios (draft):
US1-AS1 Given an incomplete sentence, When the child fills every gap, Then "Hear it" and "Keep in my notebook" appear.
US1-AS2 Given a sentence that does not match the model, When the child taps Keep, Then a hint appears and the button becomes "Keep it as it is", which saves the sentence unchanged.
US1-AS3 Given a recorded voice note, When the app is closed, Then no audio remains anywhere on the device.
US2-AS1 Given a page kept in English, When the language is switched to Bengali, Then the page's sentence is shown in Bengali.
US2-AS2 Given a page, When it is tapped, Then the workbench opens with the saved model state.
US5-AS1 Given the grown-ups page, When only one finger holds one dot on a touch screen, Then it does not open.
US5-AS2 Given "Erase everything", When it is tapped once, Then nothing is erased and the button asks for a second tap.

Out of scope: accounts, cloud sync, sharing pages outside the device.
```

### 009 · Gurukul shell: Ashram, Shalas and Jaal

```text
Feature 009: Gurukul shell (see ADR 0002, CONCEPT.md, EXPERIENCE.md, CURRICULUM_PHASE2.md §1–§6; prototype screens #home (the Ashram), #shala?s=ganita, #shala?s=vijnana, #shala?s=loka, #jaal).

Who and why: parents asked for more than maths, and children need to see how ideas connect. Gurukul is a calm, open-air school: one learner, one patient voice, understanding before marks. The shell must hold three subjects without becoming a busy menu.

User stories:
US1 (P1) Ashram home: the child lands in a quiet courtyard with three Shalas (Ganita, Vijnana, Loka), the Jaal and the Pothi; a "carry on" card returns to the last step.
US2 (P1) Shala loom: each Shala shows its threads (sutras) with knots; nothing is locked; playable knots open at Prashna; mapped but unbuilt knots say they are coming.
US3 (P1) Step bar: every lesson screen shows where the child is in Shravana (Prashna, Bodha, Darshana), Manana (Abhyasa, Spot the mistake) and Nididhyasana (Explain back, Pothi).
US4 (P2) Jaal: a web shows dashed crossings between subjects (for example shadows and the Earth's motions, map scale and measurement, timelines and large numbers); picking a crossing explains the link, and each knot in the web opens its lesson.
US5 (P2) Names: the app name, Shala names, thread names and step names appear in all five languages, using the draft glossary in CURRICULUM_PHASE2.md §2.

Acceptance scenarios (draft):
US1-AS1 Given a returning child mid-lesson, When the Ashram opens, Then a carry-on card names the knot and step and returns to it with the model as it was.
US2-AS1 Given the Vijnana Shala, When the child taps a knot that is not built, Then a short message says it is coming and nothing breaks.
US2-AS2 Given any Shala, When the child taps a playable knot, Then its first step opens (the Prashna, where the knot has one).
US3-AS1 Given any lesson screen, When it renders, Then the step bar marks the current stage, and a screen reader announces it as a labelled navigation list with the current item marked.
US4-AS1 Given the Jaal, When the child picks the shadows–Earth crossing, Then the link is highlighted and explained in one sentence, read aloud.
US4-AS2 Given the Jaal, When the child taps a playable knot, Then its lesson opens; an unbuilt knot says it is coming.
US5-AS1 Given Telugu is chosen, When the Ashram shows, Then the app name reads గురుకులం and every Shala name is in Telugu.

Guardrails: secular and inclusive (no religious iconography); the teacher is a voice, not a mascot; no points, streaks or locks.

Out of scope: lesson content (010–012), accounts, teacher dashboards.
```

### 010 · Ganita expansion (N1, N3, U1)

```text
Feature 010: Ganita expansion: lakh and crore, equal parts, rupees and paise (CURRICULUM_PHASE2.md §3 and §7; prototype #place, #fractions, #money).

Who and why: Class 5 children misread large numbers when Indian and international commas differ, think a fraction with bigger numbers is bigger, and think ₹0.45 is more than ₹0.5 because 45 > 5.

User stories:
US1 (P1) N1 Place-value houses: beads go into houses; ten beads in a house bundle into one bead in the next house to the left; the number always shows with both Indian (1,00,000) and international (100,000) commas, so lakh and million read as two ways of grouping one number.
US2 (P1) N3 Folding strips: the child folds equal strips into halves, quarters and eighths and lines them up to find equal parts (1/2 = 2/4 = 4/8, 3/4 = 6/8).
US3 (P1) U1 The rupee grid: a rupee is 100 small squares; strips are 10 paise; the child builds amounts and compares them place by place.
US4 (P1) Each lesson has Bodha, Spot the mistake (one believable wrong idea) and Explain back.

Acceptance scenarios (draft):
US1-AS1 Given 99,999 in the houses, When one bead is added to the ones, Then every house bundles in turn and the display reads 1,00,000 (Indian) and 100,000 (international).
US1-AS2 Given the build step, When the child makes 3,05,200, Then the zero houses stay empty and the readouts show 3,05,200 and 305,200.
US2-AS1 Given a quarters strip and an eighths strip, When three quarters are shaded, Then six eighths line up with them and "3/4 = 6/8" is shown.
US3-AS1 Given ₹0.5 and ₹0.45, When the child compares, Then the first places after the point (5 strips and 4 strips) decide it and ₹0.5 = 50 paise is shown.
US4-AS1 Given the U1 mistake screen, When the child taps "45 > 5, so ₹0.45 is more", Then the rupee grid shows 50 squares against 45.

Out of scope: operations on decimals, fractions of a set (N4), Roman numerals (N2).
```

### 011 · Vijnana lessons (B3, K2, R1)

```text
Feature 011: Vijnana lessons: journey of a roti, the ramp test, the lamp and the stick (CURRICULUM_PHASE2.md §4 and §7; prototype #digest, #ramp, #shadow).

Who and why: children commonly believe food goes into the blood from the stomach, change several things at once in an experiment, and think a lower light makes a shorter shadow. Each lesson targets one of these known misconceptions with a model the child can change.

User stories:
US1 (P1) B3 Journey of a roti: a bite of food travels mouth, food pipe, stomach, small intestine, large intestine; the child orders the stops and finds where most food passes into the blood.
US2 (P1) K2 The ramp test: the same car rolls from a ramp onto tiles, wood, rug or sand; changing only the floor is called a fair test; changing two things at once is named as unfair; the child ranks floors by friction.
US3 (P1) R1 The lamp and the stick: raising or moving the lamp changes the shadow's length along straight rays; sticks of cardboard, wax paper and glass show opaque, translucent and transparent.
US4 (P1) Each lesson has Bodha, Spot the mistake and Explain back; measurements are labelled as pretend and the child is invited to try a real version at home.

Acceptance scenarios (draft):
US1-AS1 Given the order step, When the child taps the stops in the right order, Then the path is drawn and the five names are read in order.
US1-AS2 Given the absorb step, When the child taps the stomach, Then the app says food passes through but most does not go into the blood there, without "wrong".
US2-AS1 Given a run on tiles, When the child changes only the floor and rolls again, Then the app names it a fair test and shows both markers.
US2-AS2 Given a run, When the child changes both height and floor before rolling, Then the app explains it cannot tell which change made the difference.
US3-AS1 Given the lamp higher than the stick, When the lamp is raised further, Then the shadow shortens and its length is shown in metres.
US3-AS2 Given the material step, When the child chooses glass, Then the shadow is almost invisible and the word transparent is shown.

Before G1: a primary science teacher signs off every fact and number (see open decisions).

Out of scope: dissection imagery, real measurements from device sensors.
```

### 012 · Loka lessons (I2, E1, E4)

```text
Feature 012: Loka lessons: thread of time, spin and travel, courtyard from above (CURRICULUM_PHASE2.md §5 and §7; prototype #timeline, #earth, #map).

Who and why: children count a year zero between BCE and CE, believe summer happens because the Earth is closer to the Sun, and add a map's scale instead of multiplying by it.

User stories:
US1 (P1) I2 Thread of time: a thread unrolls from 3000 BCE to 2000 CE with a knot at the BCE/CE join and no year zero; the child hangs six events in order and counts the years between two of them.
US2 (P1) E1 Spin and travel: the Earth seen from above the North Pole spins and India moves through day and night; on the orbit view the tilted axis shows why India has summer in June and winter in December.
US3 (P1) E4 Courtyard from above: a courtyard tips flat into a map with north at the top, symbols and a scale; the child walks from the gate to the well with N, E, S and W and works out the real distance.
US4 (P1) Each lesson has Bodha, Spot the mistake and Explain back.

Acceptance scenarios (draft):
US1-AS1 Given the count step, When the child answers 748 for 250 BCE to 499 CE, Then the three parts 249 + 1 + 498 are shown.
US1-AS2 Given the count step, When the child answers 749, Then the app says that counts a year zero.
US2-AS1 Given the spin view, When the child turns the Earth until India is on the far side, Then the hour reads night (for example 00:00).
US2-AS2 Given the orbit view, When the child moves to December, Then India shows winter and the app says the tilt causes it, not the distance.
US3-AS1 Given the walk step, When the child presses a direction into a wall or the house, Then the walker does not move and the app says something is in the way.
US3-AS2 Given a 9-square walk at 1 square = 5 m, When the child answers 14, Then the app says that adds the scale and asks them to multiply; 45 m is accepted.

Before G1: a teacher confirms the event dates and the "about" labels; dates must match the chosen board's textbook.

Out of scope: political maps and borders, real GPS.
```

## 4. Open decisions (need a human)

| Decision | Options | Recommendation |
|---|---|---|
| **Product name: trademark check** | Gurukul alone; Gurukul with a distinguishing subtitle; another name | The name is decided: Gurukul (ADR 0002). It is a common word that many schools and apps already use, so run a trademark and app-store search before release; a subtitle may be needed. |
| **Board alignment** | CBSE/NCERT Class 5; a state board; both | The phase 2 map follows the books in `docs/topics/`. Confirm which board(s) the first schools use before features 010–012, because chapter order and some dates differ. |
| **Science and history sign-off** | A primary science teacher and a social-studies teacher; a school partner | Required before G1 for features 011 and 012: every fact, number and date in the Bodha cards and lessons (the ramp distances are deliberately pretend). |
| **Generative AI for children** | None in phase 1; an on-device or server model for hints later; a grown-up-only assistant | None in phase 1 (RESEARCH.md §9). The constitution allows AI only behind server-side guardrails; revisit after children's testing, with a safety review. |
| **Narration voices** | Device text-to-speech; one recorded human voice per language | Recorded human voices. Device text-to-speech for Telugu, Bengali and Tamil depends on which voices each phone has installed, so quality is unpredictable (check on the phones children actually use). Budget about 300 lines per language for phase 1. |
| **Translation review** | Agency, freelance teachers, school partners | Native-speaking primary teachers per language (maths, science and social studies), using the key-term tables in CURRICULUM.md §8 and CURRICULUM_PHASE2.md §2. All prototype strings outside English are drafts. |
| **Hosting** | Static site with offline caching; app-store wrapper later | Static progressive web app first: no accounts, no server, cheapest to run and to keep private. |

## 5. Testing with children before feature 003

Do this after 002 is built (or with this prototype if 002 slips), before investing in content.

- **Who**: about 5 children per language (25 in total), aged 9 to 11, from a mix of schools, on the kinds of phones they actually use. Parent consent and a trusted adult present; no recordings of faces.
- **What**: one full thread (M2 into M4) and one free choice from the Loom.
- **How**: think-aloud ("tell me what you're thinking"), with the observer silent except for neutral prompts.
- **Measure understanding, not engagement**: a two-question concept check before and after (for example, "Is 23 × 14 more or less than 23 × 10 + 23 × 4? Why?") and whether the child can explain the area picture in their own words a day later.
- **Also watch for**: words children stumble on in each language, whether they find the language button, whether they try to drag films while paused, where they stop, and whether the calm tone reads as boring.
- **Ask parents**: would you let your child use this, and what would you want to see on the grown-ups page?
- **Output**: a short findings note per language in `docs/product/research/`, and changes to the specs before G1 for feature 003.
