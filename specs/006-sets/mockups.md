# Mockups & Element Inventory: Feature 006 Sets

Canonical mockups captured from `design/prototype/` at viewport `390x844` across English (`en`), Telugu (`te`), and Hindi (`hi`).

---

## 1. Inventory of Mockup Artifacts

| Screen Route | Viewport | Locales | Mockup Path |
|---|---|---|---|
| `#/sets` | 390x844 | en, te, hi | `specs/006-sets/mockups/sets-<lang>-390x844.png` |
| `#/sets?mode=guess` | 390x844 | en, te, hi | `specs/006-sets/mockups/sets_mode_guess-<lang>-390x844.png` |
| `#/bodha?k=S2` | 390x844 | en, te, hi | `specs/006-sets/mockups/bodha_k_S2-<lang>-390x844.png` |
| `#/bodha?k=S3` | 390x844 | en, te, hi | `specs/006-sets/mockups/bodha_k_S3-<lang>-390x844.png` |

---

## 2. Element Inventory: `#/sets`
- **Universe Courtyard Box**: `#yard` rect with rounded corners, universe mark `U` in top left.
- **Rings**:
  - Ring A: indigo rope stroke with draggable handle and rule pill (`yellow`).
  - Ring B: teal rope stroke with draggable handle and rule pill (`circle`).
- **12 Attribute Blocks**:
  - Shapes: circle, square, triangle.
  - Colors: yellow, green, black.
  - Sizes: big (13px), small (8px).
- **Regions & Placement**:
  - Hexagonal lattice placement points inside regions: `both`, `a`, `b`, `none`.
  - Homeless blocks placed above rings with kumkum outline when rings are apart.
- **Controls**:
  - Word chips: `and`, `or`, `not` (toggle highlight fill in SVG).
  - Arrange chips: `overlap`, `apart`, `inside`.
  - Counts card: `Both`, `A`, `B`, `None` tally with bold numbers.
  - Next button: `common.explain` -> `#/explain?k=S2`.

---

## 3. Element Inventory: `#/sets?mode=guess`
- Ring labels displayed as `?`.
- Mystery rule guess chips for Ring A and Ring B.
- Solved / would move feedback paragraph.
