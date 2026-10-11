# Mockups & Fidelity Protocol: 001 App shell, language switching and fonts

**Feature**: 001 App shell, language switching and fonts (The Gurukul Shell)  
**Target Viewports**: 390×844 and 360×740  
**Captured Mockups**: `specs/001-app-shell/mockups/` (21 reference images covering `opening`, `language`, `home`, `shala?s=ganita`, `shala?s=vijnana`, `shala?s=loka`, `jaal` in en, hi, ta)

---

## Route 1: `opening`

| Field | Content |
|---|---|
| **Route and params** | `opening` |
| **Prototype files** | `design/prototype/js/screens/opening.js`, `kolam-line.js`, `styles.css` |
| **Reviewer note** | *"The whole identity in four seconds: twelve dots, then one unbroken line weaves a kolam around them. It is a real mathematical construction (a mirror curve on a 3 × 4 grid), not clip art. Tap to skip. Later launches would skip it automatically."* |
| **Elements** | 1. Kolam canvas/SVG (`role="img"`, `opening.artLabel`): 3×4 dot grid with animated stroke drawing unbroken line.<br>2. Wordmark (`p.wordmark`, `app.name`): "Gurukul"<br>3. Tagline (`p.tagline`, `app.tagline`): Product motto.<br>4. Begin button (`button.btn.primary`, `opening.begin`): Tap to proceed immediately. |
| **Controls** | 1. Entire canvas tap: instantly completes stroke animation.<br>2. Begin button: invokes navigation to language selection or home. |
| **States** | `initial` $\to$ `animating` $\to$ `done` (wordmark and tagline opaque, Begin button focused). |
| **Accessibility** | Container has `aria-label`; reduced-motion completes drawing instantly with 0ms delay. |
| **Deviations** | None. |

---

## Route 2: `language`

| Field | Content |
|---|---|
| **Route and params** | `language` |
| **Prototype files** | `design/prototype/js/screens/language.js`, `design/prototype/js/i18n/*`, `styles.css` |
| **Reviewer note** | *"First run only. No account, no name, no age, no email. Each language is written in its own script, and tapping one switches the whole app immediately and speaks a sample. This choice can be changed at any time from the letter button in the top bar."* |
| **Elements** | 1. Heading (`h2.title`, `language.heading`): "Choose your language"<br>2. Subtitle (`p.muted`, `language.sub`): "You can change this anytime"<br>3. Radiogroup (`div.lang-cards`, `role="radiogroup"`): 5 cards (`en`, `hi`, `te`, `bn`, `ta`) with native script and tagline sample.<br>4. Continue button (`button.btn.primary.block`, `language.continue`): navigates to Ashram home. |
| **Controls** | - Card click: selects language, announces audio sample, updates chrome.<br>- Continue click: stores `gurukul:lang`, replaces route with `home`. |
| **States** | `initial` $\to$ `selected` (border highlight, radio state set). |
| **Accessibility** | Radiogroup semantic role, native script text, line-height $\ge 1.7$. |
| **Deviations** | None. |

---

## Route 3: `home` (The Ashram)

| Field | Content |
|---|---|
| **Route and params** | `home` |
| **Prototype files** | `design/prototype/js/screens/ashram.js`, `model/curriculum.js`, `styles.css` |
| **Reviewer note** | *"The Ashram: the home of Gurukul, a calm courtyard around a banyan drawn in thread line. One card per Shala (subject): Ganita, Vijnana and Loka, each in the child's script with the school subject beneath, and up to four pictures of models the child has built there. No greeting, no streak, no points. 'Remember this?' appears once the Pothi holds a sutra: the child recalls it before revealing it (retrieval practice). Guardrail: no deities, symbols or robed figures; the frame is secular."* |
| **Elements** | 1. Banyan SVG (`div.ashram-art`): line-art secular banyan tree.<br>2. Intro (`p.loom-intro`, `ashram.intro`): welcome sentence.<br>3. Continue card (conditional, `continue-card`): shows knot name and route.<br>4. Remember card (conditional, `card.remember`): recall question for kept sutras.<br>5. Three Shala Cards (`div.shala-list`):<br>   - Ganita card: kolam motif, thread count, explored thumbnail previews.<br>   - Vijnana card: leaf motif, thread count, explored thumbnail previews.<br>   - Loka card: globe motif, thread count, explored thumbnail previews.<br>6. Footer links: `home.toJaal` (opens `#jaal`), `home.notebook` (opens `#notebook`), `home.grownups`. |
| **Controls** | - Shala cards: navigate to `shala?s=ganita`, `shala?s=vijnana`, `shala?s=loka`.<br>- Jaal button: navigates to `jaal`.<br>- Remember card: reveals kept sutra on tap. |
| **Accessibility** | ARIA roles, clean heading hierarchy, all cards accessible via keyboard Tab. |
| **Deviations** | None. |

---

## Route 4: `shala?s=ganita` (Ganita Shala)

| Field | Content |
|---|---|
| **Route and params** | `shala?s=ganita` |
| **Prototype files** | `design/prototype/js/screens/shala.js`, `model/curriculum.js` |
| **Reviewer note** | *"A Shala (hall): one subject. Each thread is a sutra, a strand of the subject, with its concept knots. Nothing is locked; a turmeric dot only suggests where to start. Finished knots show a tiny picture of the model the child built, not a star. Dashed knots are in the full curriculum (docs/product/CURRICULUM_PHASE2.md) but not in this prototype. A small 'also in' tag marks knots that cross into another subject (see Jaal)."* |
| **Elements** | 8 Mathematics Threads: `sankhya` (5 knots), `ganana` (11 knots), `guna` (5 knots), `rekha` (8 knots), `mana` (3 knots), `ankana` (2 knots), `krama` (2 knots), `tarka` (6 knots). Total: 33 knots. |
| **Controls** | Tapping knot opens first step if playable, or shows toast `home.notInProto` if coming soon. |
| **Deviations** | None. |

---

## Route 5: `shala?s=vijnana` (Vijnana Shala)

| Field | Content |
|---|---|
| **Route and params** | `shala?s=vijnana` |
| **Prototype files** | `design/prototype/js/screens/shala.js`, `model/curriculum.js` |
| **Reviewer note** | Same Shala component, rendering Science threads. |
| **Elements** | 6 Science Threads: `sharira` (Body, 4 knots), `jiva` (Living, 3 knots), `padartha` (Materials, 2 knots), `prakasha` (Light, 2 knots), `mapana` (Measurement, 1 knot), `bala` (Forces, 2 knots). Total: 16 knots. Knots B3, R1, K2 marked playable. Crossing tags on R1, B1, etc. |
| **Controls** | Knot click handling, crossing tags, back button to Ashram. |
| **Deviations** | None. |

---

## Route 6: `shala?s=loka` (Loka Shala)

| Field | Content |
|---|---|
| **Route and params** | `shala?s=loka` |
| **Prototype files** | `design/prototype/js/screens/shala.js`, `model/curriculum.js` |
| **Reviewer note** | Same Shala component, rendering Social Studies threads. |
| **Elements** | 4 Social Studies Threads: `itihasa` (History, 2 knots), `nagarika` (Civics, 3 knots), `bhugola` (Geography, 4 knots), `bharata` (Heritage, 9 knots). Total: 25 knots. Knots I2, E1, E4 marked playable. |
| **Controls** | Knot click handling, back button to Ashram. |
| **Deviations** | None. |

---

## Route 7: `jaal` (Cross-Subject Web)

| Field | Content |
|---|---|
| **Route and params** | `jaal` |
| **Prototype files** | `design/prototype/js/screens/jaal.js`, `model/curriculum.js` |
| **Reviewer note** | *"Jaal (the web). Ideas do not stay inside subjects: a shadow is a clock for the turning Earth; a map's scale is measuring; a timeline is a number line for years. Each curved thread is one link between two knots in different Shalas. Tap a thread, or a link in the list, to hear the connection and open either knot."* |
| **Elements** | 1. Triangle SVG diagram with Ganita, Vijnana, Loka nodes and 10 curved connecting threads.<br>2. Detail card (`section.card.jaal-detail`): explains the connection sentence (`jaal.<id>`).<br>3. Knot buttons: open either knot connected by the link.<br>4. List of all 10 links (`div.jaal-list`). |
| **Controls** | Tap curve or list item to select link; tap knot button to open knot in its Shala. |
| **Deviations** | None. |
