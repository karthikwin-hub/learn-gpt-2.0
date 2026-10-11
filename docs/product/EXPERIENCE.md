# Gurukul: experience design

> Status: draft for product review (2026-10-11; phase 2 update) · Phone first (portrait, 360–430 px wide), adapting up to tablet and laptop.
> The clickable prototype at [`design/prototype/index.html`](../../design/prototype/index.html) is the visual reference for this document. Screen IDs below (`#home`, `#bodha`, …) match the prototype's routes. The product frame (Gurukul, Shalas, Bodha) is defined in [CONCEPT.md §4–5](CONCEPT.md#4-the-big-idea-a-modern-gurukul).

---

## 1. Information architecture

```mermaid
flowchart TD
  opening["#opening: thread draws a kolam"] --> lang["#language: first run only"]
  lang --> home["#home: the Ashram"]
  home --> shala["#shala: one subject, its threads and knots"]
  home --> jaal["#jaal: threads that cross subjects"]
  home --> pothi["#notebook: the Pothi"]
  home --> acharya["#grownups: Acharya corner, behind a grown-up check"]
  shala --> prashna["#prashna: question and guess"]
  prashna --> bodha["#bodha: the idea explained"]
  bodha --> film["#film: Living Film, some lessons"]
  bodha --> bench["Workbench: one model per knot"]
  film --> bench
  bench --> mistake["#mistake: spot the mistake"]
  mistake --> explain["#explain: explain it back"]
  explain --> stop["#stop: a good place to stop"]
  stop --> home
  bench -.->|"What am I learning?"| bodha
```

There are **four places**: the **Ashram** (where you choose a subject), a **Shala** (where you choose a knot), a **lesson** (where you learn), and the **Pothi** (what you made). Jaal is a view of the Ashram; the Acharya corner sits outside the child's path. There is no bottom tab bar; children tap bottom-edge controls by accident (RESEARCH C13).

### 1.1 The Ashram (home)

A calm courtyard drawn in thread: a banyan tree at the centre whose roots run to three **Shala** cards (Ganita, Vijnana, Loka).

- Each Shala card shows its name in the child's script, the school subject beneath, a small motif (kolam dots, a leaf, a globe), and up to four thumbnails of models the child has built there. No percentages, no stars.
- **Remember this?** If the Pothi holds a sutra from an earlier session, a quiet card asks the child to recall it before revealing it (retrieval practice, RESEARCH C10). It is always skippable.
- **Continue**: a card for the unfinished lesson, if there is one. No greeting banner, no name, no streak.
- Small links to **Jaal**, the **Pothi** and the **Acharya corner**.

### 1.2 A Shala

The subject's threads (sutras) are woven down the screen, each headed by its name and meaning ("Sankhya · Numbers"). Each concept is a **knot**.

- Knots the child has completed are **filled with a tiny thumbnail of the model they built**. Progress is shown by the child's own work.
- Dashed knots are in the curriculum but not yet built in the prototype. Knots that cross into another subject carry a small Jaal mark.
- Threads cross where ideas connect; tapping a crossing explains the connection in one spoken sentence.
- **Nothing is locked.** A soft "start here" glow marks the suggested next knot on each thread.

### 1.3 Jaal (the web)

The three Shalas as three points of a triangle, joined by curved threads. Each cross-subject link is a thread you can tap: it opens a card naming the two knots and one sentence about how they connect, with buttons to open either knot.

### 1.4 The stage bar

Inside a lesson, a slim bar under the top bar shows the three movements, **Shravana · Manana · Nididhyasana**, with the current one filled and the current step named beneath ("Bodha: understand the idea"). On workbenches it holds a **"What am I learning?"** button that reopens Bodha for the same knot. The bar never shows a score or a count of remaining screens.

### 1.2 Global chrome

The top bar, about 56 dp, contains only:

- **Back** (left): always visible, always one step back. Never exits the app without confirmation.
- **Title** of the current place, in the current language, wrapping onto two lines if needed (never truncated).
- **Language** (right): a button showing the current script's first letter (`A`, `अ`, `అ`, `অ`, `அ`). One tap opens a sheet with the five languages, each written in its own script. Switching is **instant and in place**; the lesson, the model's state and the film position are kept.
- **Sound** (right): narration on or off.

---

## 2. Screen inventory

| ID | Screen | Purpose | Key elements |
|---|---|---|---|
| `#opening` | Opening thread | Identity in 4 seconds | Five dots; one line weaves a kolam around them, then grows into the banyan of the Ashram. Skippable by tap; skipped automatically on later launches |
| `#language` | Choose language | First run only | Five large cards, each language in its own script with a spoken sample on tap. No account, no name, no age gate |
| `#home` | The Ashram | Choose a subject | Banyan courtyard, three Shala cards, Remember this?, Continue card, links to Jaal, Pothi and Acharya corner |
| `#shala` | A Shala | Choose what to learn | The subject's threads and knots, crossings, start-here glows |
| `#jaal` | Jaal | See how subjects connect | Three Shala points, cross-subject threads, a card per link |
| `#prashna` | Prashna | Activate curiosity and commit to a prediction | One illustrated scene, one question, three choices; the guess is remembered and revealed in Bodha |
| `#bodha` | Bodha | Explain the concept clearly before practice | Five or six cards with text and a live diagram, worked example revealed step by step, tappable key words, read aloud, text size, "Keep this sutra" |
| `#wonder` | Wonder (M2) | The phase 1 version of Prashna, with a slider guess | One illustrated scene, one question, a slider, then Bodha |
| `#film` | Living Film | Direct, beautiful explanation | Scene canvas, beat dots (4–6), a scrubber, play/pause, "hold the scene" affordance, optional captions |
| `#rect` | Rubber Rectangle | Multiplication as area; distributive law | Draggable corner handle, unit tiles, "cut with the thread" tool, linked equation and column method |
| `#share` | Fair Share Table | Partitive division and remainders | Pile of laddoos, plates (add or remove), deal one-by-one or all at once, remainder tray, "cut the leftovers" |
| `#rope` | Rope and Pegs | Perimeter versus area | A rope of fixed length on four pegs; drag one corner; live readout of sides, perimeter and area; ghost history of tried rectangles |
| `#kolam` | Kolam Mirror | Reflection versus rotation symmetry | Dot grid; finger drawing; symmetry order (1, 2, 4, 8); mirror or rotate toggle; clear and undo |
| `#drums` | Two Drummers | Common multiples (LCM) | Two rhythm rings with adjustable beat counts; play; meeting beats marked on a shared line |
| `#sets` | Sorting Courtyard | Venn diagrams, and/or/not | Objects with properties; two rope rings with rule chips; objects walk to regions; region counts; "Which rules made this?" mode |
| `#logic` | Marble Machine | AND / OR / NOT as cause and effect | Two input switches (A, B), a gate slot, marble drop, output basins, a truth table that fills one row per try |
| `#place` | Place-value houses (N1) | Lakh and crore; each place is ten of the one on its right | Columns from ones to crores with bead stacks and steppers; ten beads bundle into the next house; Indian and international commas; expanded form |
| `#fractions` | Folding strips (N3) | Fractions as equal parts; equivalence and comparison | Two paper strips; fold into 2–12 equal parts; tap parts to shade; equal shaded lengths are joined by a leaf-green line |
| `#money` | The rupee grid (U1) | Decimals through rupees and paise | Rupee squares of 10 strips × 10 paise; steppers for rupees, 10-paise strips and paise; ₹ amount, paise and place chart; side-by-side compare |
| `#digest` | Journey of a roti (B3) | Digestion and absorption | Body silhouette with the food path drawn as a thread; time scrubber; organs light up; food breaks into pieces; nutrients pass into the blood |
| `#ramp` | The ramp test (K2) | Friction and fair testing | Side view: ramp of 1–3 books, four floor surfaces, toy car, tape measure, results table, ghost stopping points |
| `#shadow` | The lamp and the stick (R1) | Light travels straight; shadows | Side view: draggable lamp, stick, light rays as thread, shadow length readout, opaque / translucent / transparent materials |
| `#timeline` | Thread of time (I2) | BCE / CE, order of events, years between | One thread from 3000 BCE to 2100 CE; event cards to hang in order; the 1 BCE / 1 CE join; years-between tool |
| `#earth` | Spin and travel (E1) | Day and night; seasons | Spin view: Earth from above the North Pole with India marked; travel view: Earth round the Sun with a fixed tilt |
| `#map` | Courtyard from above (E4) | Maps: direction, symbols, scale | Grid map of the Ashram with a legend and compass; N/E/S/W step buttons draw a path; scale chips convert squares to metres |
| `#mistake` | Spot the mistake | Diagnose a believable error | A worked solution with one wrong step; tap the step; the model shows why |
| `#explain` | Explain it back | Self-explanation | Sentence builder with word tiles in the current language, plus an optional voice recording kept on device |
| `#stop` | A good place to stop | Calm closure | What you now know (one line), your sentence, the lesson's sutra, a thumbnail of your model, "Back to the Ashram" |
| `#notebook` | Pothi | The child's own work | Sutras kept; pages with model thumbnail, their sentence and date; tap to reopen the model exactly as they left it |
| `#grownups` | Acharya corner | Reassure and inform the parent or teacher | What was learned (plain language), the Pothi, how Gurukul teaches, privacy statement, language, text size, reset. Behind a simple grown-up check |

---

## 3. Lesson anatomy in detail

| Step | Length | Design rules | Evidence |
|---|---|---|---|
| **Prashna** (Wonder) | under 1 min | One question. One image. A prediction the child must commit to. Never graded: the guess is simply remembered and revealed in Bodha ("You guessed 'less'. Let's see."). Names the key objects (pre-training) | RESEARCH C6, C9 (pre-training) |
| **Bodha** | 2–4 min | Five or six cards (§3.2). At most three short sentences per card, one diagram, one idea. The child moves on when ready. Key words are tappable. Every card is read aloud | C6, C7, C9, C20–C22 |
| **Living Film** (Darshana, some lessons) | 3–4 min | 4–6 beats of 20–40 s. Narration bound to beats. Tap to continue between beats. Scrub both ways. Pause turns the scene interactive. Ghosts persist. Highlight the part being spoken about; dim the rest | C8, C9 |
| **Workbench** | 4–6 min | Step 1 fully worked (the hand demonstrates). Step 2 half done. Step 3 the child alone. A free "play" mode is always available | C7 |
| **Spot the mistake** | 1–2 min | One believable error drawn from the thread's target misconception | C7 |
| **Explain it back** | 1–2 min | Sentence builder: "When I ___, the ___ stays the same because ___". Tiles in the current language. Optional voice note | C7 |
| **A good place to stop** | 15 s | No score. One line naming the idea, the child's sentence, the sutra, and their model thumbnail | C11, C12 |
| **Return** (next session) | 1 min | "Remember this?" on the Ashram: recall a kept sutra before it is revealed; in the full app, two recall prompts from different threads answered on a mini model; skippable | C10 |

### 3.2 Bodha anatomy

| Card | Purpose | Rules |
|---|---|---|
| **What we are learning** | Name the idea and the goal | One plain sentence about the idea, one "You will be able to…" line. Reveals the Prashna guess if there was one, without judging it |
| **The idea** | Explain the concept | Up to three sentences. Key words marked for tapping. The diagram shows exactly what the text says, highlighted in the colour code (signalling) |
| **Why it works** | Give the reason, not just the rule | Up to three sentences and a diagram that shows the cause |
| **A worked example** | Model the thinking | Two to five steps revealed one tap at a time; the diagram updates with each step; the final step states the answer |
| **Where you see it** | Connect to daily life in India | Up to three sentences; a real, checkable example (prices, maps, festivals, food, the sky) |
| **The sutra** | One rule to keep | A single memorable line in large type. "Keep this sutra" saves it to the Pothi. The next button goes to the workbench (or the film) |

Further rules:

- **Segmented and learner-paced**: one card at a time, Back and Next, a dot per card; no autoplay to the next card.
- **Read aloud**: each card's text is narrated when it opens; "Hear it again" replays it. Captions are not shown for Bodha because the text is already on screen.
- **Key words**: a tapped word opens a small bridge card with the everyday meaning in the child's language and the English school term. In English, it shows the plain meaning only.
- **Text size**: A− and A+ on the Bodha screen (three sizes), remembered on the device.
- **Reading level**: written for a Class 4–5 reader; short words, one idea per sentence, no idioms. Translators keep the same simplicity.
- **Always reachable**: "What am I learning?" on every workbench reopens Bodha at the same knot; Back returns to the model unchanged.

### 3.1 Feedback rules

- **Right** is shown by the model working: the share comes out even, the rectangle's area matches, the marble reaches the basin. The narrator may *describe* what happened ("Every plate has 3; nothing is left"), but never praises.
- **Wrong** is shown by the model too: the leftover sits on the table, the marble falls into the other basin. After two attempts, a **specific hint about the idea** appears, written for the misconception the move reveals. Example: if a child enters 23 + 14 in the area task, the hint is "Count one row. How many rows are there?"
- Hints never say "wrong", "try again" or show a red cross. Kumkum red is used only to point attention, never to judge.

---

## 4. Interaction language

| Pattern | Rule |
|---|---|
| **Handles** | Round, 28 dp visible, 56 dp hit area, a soft turmeric ring. They grow slightly while held. One handle per degree of freedom |
| **The thread as a tool** | The glowing line is also the cutting, wrapping and connecting tool. "Cut" mode turns the finger into a thread that snaps to meaningful positions (tens, halves) |
| **Snapping** | Values snap to whole units with a light haptic tick (where supported). Continuous mode is available only where the maths is continuous |
| **Ghosts** | When a model changes, the previous state stays as a 25% ink outline for the rest of the step. "Clear ghosts" is always available |
| **Linked panes** | Object, picture and symbol panes update in the same frame. Tapping a number in the equation highlights its part in the model, and the reverse |
| **Undo** | Every manipulative has undo and reset. No destructive action without undo |
| **Multi-touch** | Ignored except for two-finger pinch on Jaal. Stray touches never break a model |
| **Rotation** | Portrait is the designed layout. Landscape on phones shows the model larger with panes alongside |

---

## 5. Motion language

Motion exists to **explain change**, never to decorate.

| Motion | Spec |
|---|---|
| Ink draws itself | Strokes reveal along their length, 400–900 ms, ease-out. Used when a new shape or symbol appears |
| Spring | Dragged objects follow the finger 1:1; on release they settle with a critically damped spring (no bounce, no wobble) |
| Fold and unfold | Pieces move along curved paths at 600–900 ms, so the eye can follow where each piece goes |
| Walk to region | Objects in the Sorting Courtyard move to their region one by one, staggered by 60 ms, so the child can watch each decision |
| Dim and highlight | Non-focus elements fade to 35% over 250 ms during narration of a focus element |
| Screen change | 220 ms cross-fade. No sliding carousels, no zoom-bursts |
| Banned | Confetti, particle bursts, screen shake, bouncing buttons, idle animations, parallax |
| Reduced motion | When `prefers-reduced-motion` is set, ink draws instantly, folds become cross-fades, and walks become instant placement with a brief outline pulse |

Frame budget: 60 fps on a low-cost Android phone (about ₹8,000 class). Manipulatives use SVG for fewer than about 300 elements and Canvas above that.

---

## 6. Visual system

### 6.1 Colour

The canvas is warm handmade paper. **Colour carries mathematical meaning only**: the first factor is always indigo, the second always teal, and so on, across every screen.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F6F1E7` | Background (day) |
| `paper-raised` | `#FFFBF3` | Cards, sheets |
| `paper-sunk` | `#ECE4D4` | Wells, trays, inactive areas |
| `ink` | `#1F2430` | Text, primary strokes |
| `ink-soft` | `#5B6170` | Secondary text |
| `ghost` | `#1F243040` | Previous states (25% ink) |
| `thread` | `#E0A030` | The thread, handles, focus (turmeric) |
| `indigo` | `#3E4C9A` | First quantity / set A / first factor |
| `teal` | `#0F7C80` | Second quantity / set B / second factor |
| `leaf` | `#4E8A3E` | Third quantity / result region |
| `kumkum` | `#C2412D` | Attention pointer only, never "wrong" |
| `night` | `#171A21` | Background (night mode); paper tokens invert, meaning colours brighten 10% |

All text meets WCAG AA (4.5:1) on `paper` and `night`. Meaning is never carried by colour alone; position, label or pattern always backs it up.

### 6.2 Typography

- **Families:** Noto Sans and Noto Serif, with the matching script family for each language: Devanagari (Hindi), Telugu, Bengali, Tamil. Production self-hosts subsetted fonts; the prototype loads them from Google Fonts for convenience only.
- **Scale (px at 1×):** caption 14 · body 17 · lead 20 · title 24 · display 32. Nothing below 14.
- **Weights:** 400 / 500 / 600. No weights below 400; thin strokes break Indic glyphs on cheap screens.
- **Line height:** 1.45 for Latin; **at least 1.65 for Indic scripts**, set per locale with `:lang()`.
- **Never truncate** learning content. Containers grow; rows wrap; toolbars stack vertically when text expands.
- Numerals: Western Arabic numerals (0–9) in all languages, matching school textbooks. Regional numerals are an open question for teachers to review.

### 6.3 Layout

- Phone: one column. Model on top (55–65% of height), linked panes below, controls in the upper-middle "thumb arc", none touching the bottom 24 dp.
- Tablet and laptop: model on the left, panes on the right (the context PDF's split layout).
- Spacing unit 8 dp; generous margins (20 dp phone, 32 dp tablet).

### 6.4 Imagery

Flat ink and paper illustration, drawn in the same thread line. Real Indian contexts: courtyards, kolam thresholds, laddoos and plates, autos, coconut farms, tala and tabla, rotis, rupee coins, the Thar and the Himalaya. No characters with faces. Photographs only in Prashna scenes, where they make a question real.

The **Ashram** is drawn, not decorated: a banyan in thread line, a swept courtyard, slates and palm-leaf books. It must read as a calm place of learning, not a temple: **no deities, no religious symbols, no saffron-robed figures, no Sanskrit chanting**. Each Shala has one small motif drawn from its subject (kolam dots for Ganita, a leaf and a drop for Vijnana, a globe line for Loka), never a mascot.

---

## 7. Language and voice

- **Switcher:** always in the top bar. Five languages, each named in its own script. Instant switch that keeps all state. Narration restarts the current sentence in the new language.
- **Three registers for key terms.** When a key term first appears in a thread, it shows as a small "bridge card" attached to the model:
  1. everyday phrase in the child's language, e.g. Telugu *"ఎంత జాగా"* ("how much space");
  2. regional maths term: *వైశాల్యం*;
  3. English term with symbol: **Area** = length × breadth.
  Long-press any key term to hear it in English as well.
- **Narration:** written for listening, in short sentences. Recorded by human voice artists, one per language, in a warm, unhurried register. The prototype uses the device's speech synthesis as a placeholder.
- **Translation process:** English source, then translation by a native-speaking primary maths teacher, review by a second teacher, then on-device screenshot review of every screen. All prototype translations are **drafts** pending this process.

---

## 8. Sound

- **Default:** narration on; no music.
- **Functional sounds only**, quiet and short: a soft tick when a value snaps, a wooden tock when a marble lands. They can be turned off independently of narration.
- **Two Drummers** is the one place sound *is* the maths: the beats are the content, so it carries a visual equivalent for deaf or muted use.

---

## 9. Accessibility

- Touch targets of at least 48 dp; handles 56 dp.
- Every manipulative has a **step-button alternative** (+1 / −1 per dimension) for children who can't drag precisely, and full keyboard support on laptops.
- Screen-reader labels describe the model state, e.g. "Rectangle, 6 rows of 4, 24 tiles".
- Captions are available for all narration in all languages.
- Reduced motion is honoured (§5).
- Colour is never the only carrier of meaning (§6.1).
- No time pressure anywhere.

---

## 10. Acharya corner (grown-ups page)

Reached by a small "Acharya corner · for grown-ups" link on the Ashram, behind a simple check (for example "Hold the two dots at the same time for 2 seconds"), which stops a 10-year-old briefly without needing a PIN or account.

Contents:

1. **What your child explored this week**, in plain language: "Explored why long multiplication works by cutting a rectangle into four parts". No minutes, no scores, no comparisons.
2. **Their Pothi**: the same pages the child sees, including their own sentences and (if recorded) voice notes.
3. **How Gurukul teaches**: a 30-second explanation and the principle "no games, no ads, no tracking".
4. **Privacy**: "Everything stays on this phone. We collect nothing."
5. **Settings**: language, narration voice speed, night mode, reset all data (with confirmation and undo window).

---

## 11. Offline, size and performance

- Works fully offline after first load (installable web app; Android packaging later if needed).
- Initial download under 3 MB without narration; narration downloaded per language on demand, about 2–4 MB per domain.
- Living Films are scene descriptions plus audio, not video files: about 50 KB of scene data per film plus narration.
- Cold start under 2 s on a low-cost Android phone; interaction latency under 16 ms.

---

## 12. Empty, error and edge states

| State | Behaviour |
|---|---|
| First launch | Opening thread, then language choice, then the Ashram; inside each Shala, "start here" glows |
| No progress yet | The Pothi shows one sample page labelled "Your pages will appear here", drawn in ghost ink |
| Narration file missing (offline before download) | Captions turn on automatically; a quiet note says narration will download when online |
| App interrupted mid-thread | On return, the Continue card restores the exact step and model state |
| Phone rotated mid-drag | The drag is cancelled safely; the model keeps its last valid state |
| Storage full | Pothi saving pauses with a plain-language note in the Acharya corner; learning still works |
