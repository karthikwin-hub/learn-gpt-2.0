# Mockups: 009 Gurukul Shell — Full Multi-Subject Ashram, Shalas & Jaal

Status: Captured & Baseline Established · Feature Branch: `feat/009-ashram-shell`

---

## 1. Baseline Prototype Artifacts

Captured directly from `design/prototype/index.html` across viewports and target Indic languages:

| View | Route | Lang | File |
|---|---|---|---|
| Ashram Courtyard | `#/home` | en | `specs/009-ashram-shell/mockups/home-en-390x844.png` |
| Ashram Courtyard | `#/home` | te | `specs/009-ashram-shell/mockups/home-te-390x844.png` |
| Ashram Courtyard | `#/home` | hi | `specs/009-ashram-shell/mockups/home-hi-390x844.png` |
| Shala Loom | `#/shala?s=ganita` | en | `specs/009-ashram-shell/mockups/shala_s=ganita-en-390x844.png` |
| Shala Loom | `#/shala?s=ganita` | te | `specs/009-ashram-shell/mockups/shala_s=ganita-te-390x844.png` |
| Shala Loom | `#/shala?s=ganita` | hi | `specs/009-ashram-shell/mockups/shala_s=ganita-hi-390x844.png` |
| Jaal Web | `#/jaal` | en | `specs/009-ashram-shell/mockups/jaal-en-390x844.png` |
| Jaal Web | `#/jaal` | te | `specs/009-ashram-shell/mockups/jaal-te-390x844.png` |
| Jaal Web | `#/jaal` | hi | `specs/009-ashram-shell/mockups/jaal-hi-390x844.png` |

---

## 2. Visual Expectations

### Ashram Courtyard (`#/home`)
- Peaceful Banyan tree drawn in thread SVG art.
- Subtitle: `A quiet place to understand. Choose a Shala.`
- Carry-on card: when a lesson was in progress, prominent resume card with knot name and arrow icon.
- Three Shala cards:
  - Ganita (Mathematics) with Kolam knot motif, thread count, and thread thumbnails.
  - Vijnana (Science) with leaf motif.
  - Loka (Social studies) with compass/globe motif.
- Bottom links: `Jaal: how subjects connect`, `My Pothi`, `Acharya corner · for grown-ups`.

### Shala Loom Screen (`#/shala?s=<section>`)
- Header: Section title and subtitle (`section.<id>`, `section.<id>.sub`).
- Threads with sinusoidal thread lines on the left.
- Knot circles:
  - Solid border for completed knots (`.done`).
  - Pulsing / accented ring for next available knot (`.next`).
  - Dashed outline for future / unbuilt knots (`.later`).
- Tapping an unbuilt knot displays a calm toast: `home.notInProto`.
- Jaal crossing tags: dashed pills linking to crossings (`.jaal-tag`).

### Jaal Web Screen (`#/jaal`)
- Triangle network SVG with three Shala nodes (Ganita, Vijnana, Loka).
- Interactive crossing arcs connecting pairs of knots.
- Selected crossing card displaying both connected knots and conceptual explanation.
- Clicking either knot button navigates to that knot's lesson or displays calm availability toast.
