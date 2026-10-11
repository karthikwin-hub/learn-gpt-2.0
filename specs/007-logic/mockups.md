# Mockups & Element Inventory: Feature 007 Logic

Canonical mockups captured from `design/prototype/` at viewport `390x844` across English (`en`), Telugu (`te`), and Hindi (`hi`).

---

## 1. Inventory of Mockup Artifacts

| Screen Route | Viewport | Locales | Mockup Path |
|---|---|---|---|
| `#/logic` | 390x844 | en, te, hi | `specs/007-logic/mockups/logic-<lang>-390x844.png` |
| `#/bodha?k=L2` | 390x844 | en, te, hi | `specs/007-logic/mockups/bodha_k_L2-<lang>-390x844.png` |

---

## 2. Element Inventory: `#/logic`
- **Gate Selection Chips**:
  - `and` (AND / మరియు)
  - `or` (OR / లేదా)
  - `not` (NOT / కాదు)
  - `mystery` (Mystery / రహస్యం)
- **Marble Machine (SVG Manipulative)**:
  - Hopper at top ($x=180, y=26$).
  - Track network paths (thick neutral tracks).
  - Door A (indigo) and Door B (teal) with circular nodes and door opening lines.
  - Basins: YES basin ($x=86, y=318$) in leaf green, NO basin ($x=274, y=318$) in soft ink.
  - Dropped marble circle with animated travel along routed path.
  - Path residue drawn after run.
  - Marble counters in each basin showing accumulated marbles.
  - Mystery cover (`rect` with dotted stroke and large `?` text).
- **Controls**:
  - Door A toggle button (`A: open` / `A: shut`).
  - Door B toggle button (`B: open` / `B: shut`) (hidden in NOT gate).
  - Drop marble button (`logic.drop`).
  - Next button (`common.explain` -> `#/explain?k=L2`).
- **Dynamic Truth Table Card**:
  - Table showing columns `A`, `B` (for AND/OR), and `Marble` (outcome).
  - Rows for each input combination: empty rows show `?`, completed rows show `yes` / `no` with green/soft styles.
  - Active rule revelation note when all rows are completed.
  - In mystery mode: gate guessing chips (`and`, `or`, `not`) appear upon table completion with calm feedback.
