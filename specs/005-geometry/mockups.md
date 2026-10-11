# Mockups Protocol: 005 Geometry threads (G1–G5)

Visual and structural fidelity requirements for Feature 005 screens against prototype mockups captured in `specs/005-geometry/mockups/`.

---

## Screen Inventory

### 1. Rope and Pegs Workbench (`#rope`)
- **Captured Mockups**:
  - `specs/005-geometry/mockups/rope-en-390x844.png`
  - `specs/005-geometry/mockups/rope-hi-390x844.png`
  - `specs/005-geometry/mockups/rope-te-390x844.png`
- **Key Elements**:
  - Step guide (1): "Change the width of a {p} m rope rectangle..."
  - Central SVG canvas ($360 \times 330$):
    - $12 \times 12$ square grid with light dots/hairlines.
    - Diagonal dashed guide line ($w + h = \frac{P}{2}$).
    - 3 black pegs at $[0,0]$, $[w,0]$, $[0,h]$ and 1 draggable circular handle at $[w,h]$.
    - Thick rope outline (`sw=6`, `var(--thread)`) with inner stitched dashed line.
    - Ghost outlines for previously tried widths.
    - Live dimension and area labels ($w\text{m}$, $h\text{m}$, $\text{area}$).
  - Equations card:
    - Perimeter equation: $w + h + w + h = 24\text{m}$.
    - "Perimeter never changes; the rope is always 24 m."
    - Area equation: $\text{Area} = w \times h = \text{area}\text{m}^2$.
  - Stepper for width and chips for rope length ($24\text{m}, 20\text{m}$).
  - Area hill card: vertical bar chart showing area for each tried width.

---

### 2. Kolam Mirror & Turn Workbench (`#kolam`)
- **Captured Mockups**:
  - `specs/005-geometry/mockups/kolam-en-390x844.png`
  - `specs/005-geometry/mockups/kolam-hi-390x844.png`
  - `specs/005-geometry/mockups/kolam-te-390x844.png`
- **Key Elements**:
  - Step guide (1): "Draw with one stroke..."
  - Dark square drawing canvas (`var(--ground)`) with rice-white threshold dots and dashed mirror/turn guide lines.
  - Readout describing symmetry group:
    - Mirror mode: "{n} mirror lines, turn through {deg}°".
    - Turn mode: "Turn through {deg}°".
  - Order chips: $1, 2, 4, 8$.
  - Mode chips: "Mirror lines" vs "Turn only".
  - Action buttons: "Undo" (`common.undo`) and "Clear" (`common.clear`).
  - Challenge card: "Draw a pinwheel: 4-way turn symmetry without any mirror line."

---

### 3. Bodha Cards for G2 (`#bodha?k=G2`)
- **Captured Mockups**:
  - `specs/005-geometry/mockups/bodha_k_G2-en-390x844.png`
  - `specs/005-geometry/mockups/bodha_k_G2-hi-390x844.png`
  - `specs/005-geometry/mockups/bodha_k_G2-te-390x844.png`
- **Cards**:
  - `idea`: 2 rectangles using same rope: $11 \times 1$ and $6 \times 6$.
  - `why`: Areas displayed inside: $11\text{m}^2$ and $36\text{m}^2$.
  - `example`: Comparing $8 \times 2$ ($16\text{m}^2$) and $5 \times 5$ ($25\text{m}^2$).

---

### 4. Bodha Cards for G4 (`#bodha?k=G4`)
- **Captured Mockups**:
  - `specs/005-geometry/mockups/bodha_k_G4-en-390x844.png`
  - `specs/005-geometry/mockups/bodha_k_G4-hi-390x844.png`
  - `specs/005-geometry/mockups/bodha_k_G4-te-390x844.png`
- **Cards**:
  - `idea`: 4-petal flower with 2 mirror lines and 90° turn arc.
  - `why`: 4-petal flower with 90° turn arc only (no mirror lines).
