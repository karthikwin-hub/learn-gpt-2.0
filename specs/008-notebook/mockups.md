# Mockups: 008 Pothi (Notebook), Recall & Grown-ups (Acharya Corner)

Status: Captured & Baseline Established · Feature Branch: `feat/008-notebook`

---

## 1. Baseline Prototype Artifacts

Captured directly from `design/prototype/index.html` across viewports and target Indic languages:

| View | Route | Lang | File |
|---|---|---|---|
| Notebook | `#/notebook` | en | `specs/008-notebook/mockups/notebook-en-390x844.png` |
| Notebook | `#/notebook` | te | `specs/008-notebook/mockups/notebook-te-390x844.png` |
| Notebook | `#/notebook` | hi | `specs/008-notebook/mockups/notebook-hi-390x844.png` |
| Grown-ups Hold | `#/grownups` | en | `specs/008-notebook/mockups/grownups-en-390x844.png` |
| Grown-ups Hold | `#/grownups` | te | `specs/008-notebook/mockups/grownups-te-390x844.png` |
| Grown-ups Hold | `#/grownups` | hi | `specs/008-notebook/mockups/grownups-hi-390x844.png` |

---

## 2. Visual Expectations

### Notebook Screen (`#/notebook`)
- Title: Notebook / Pothi (`notebook.title`).
- Introductory subtitle explaining the notebook replaces badges and points (`notebook.intro`).
- Kept Sutras section (if any sutras are kept): clickable sutra cards with knot badge and sutra quote.
- Notebook Pages section (newest pages first):
  - Page entry showing small model thumbnail SVG (`thumb`), knot label (`knot.<thread>.t`), date badge, and the child's reconstructed sentence (`sutra`).
  - Tapping a notebook page re-opens the workbench with the saved model state (`model`).
  - Empty state displays a calm sample card (M4 tens room) with `notebook.empty` and a link button to return to the Shala Loom.

### Grown-ups Acharya Corner (`#/grownups`)
- Locked State:
  - Title: For grown-ups (`grown.heading`).
  - Prompt: Hold both dots for 2 seconds (`grown.holdPrompt`).
  - Two circular interactive touch dots (`.hold-dot`).
  - Progress bar filling during hold duration (`.progress-ring` or `.progress-bar`).
  - Explanatory note: Why a two-finger hold instead of math questions (`grown.holdWhy`).
- Unlocked State:
  - Recent activity card: This week's explored ideas (`grown.week`) showing child's own sentences.
  - Link button: Open full Notebook (`grown.openNotebook`).
  - Pedagogy card: How Sutra teaches (`grown.howTitle` with 4 principles).
  - Privacy card: Privacy guarantee (`grown.privacyTitle` with 4 guarantees confirming 100% on-device storage, zero telemetry).
  - Together card: Exploring together (`grown.together`).
  - Settings card:
    - Language switcher chips.
    - Voice speed chips (slow 0.8x vs normal 0.92x).
    - Captions toggle chips (on / off).
    - Night mode toggle chips (day / night).
    - Reset / Erase everything button (`grown.reset` requiring two taps to confirm).
