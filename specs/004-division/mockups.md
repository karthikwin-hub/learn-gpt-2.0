# Mockups Protocol: 004 Division threads (D1–D4)

This protocol documents the visual and structural fidelity requirements for Feature 004 screens against canonical prototype mockups captured in `specs/004-division/mockups/`.

---

## Screen Inventory

### 1. Fair Share Workbench (`#share?mode=share`)
- **Captured Mockups**:
  - `specs/004-division/mockups/share_mode_share-en-390x844.png`
  - `specs/004-division/mockups/share_mode_share-ta-390x844.png`
  - `specs/004-division/mockups/share_mode_share-hi-390x844.png`
- **Key Elements**:
  - Step guide (1): "{a} laddoos on {b} plates, share equally so each plate gets the same."
  - Central SVG container ($360 \times 360$):
    - Top recessed pile box (`var(--paper-sunk)`) containing $n$ laddoos in 10-column rows.
    - $b$ circular plates (`r=50`, double-ringed) arranged dynamically (1 row for $\le 3$ plates, 2 rows for $\ge 4$ plates).
    - Laddoos rendered with warm golden thread circles and spice specks.
  - Action buttons: "Share one round" (`share.round`, `.btn.thread`), "Share all" (`share.all`, `.btn.quiet`), and "Start again" (`common.reset`).
  - Accessible steppers for Laddoos (2–30) and Plates (2–6).
  - Written equations card:
    - Before done: "{n} of {total} shared"
    - After done: "$12 \div 4 = 3$" and "$4 \times 3 = 12$".
  - Bar diagram card: horizontal partitioned rectangle showing equal segments labeled with group size.
  - Next button: "Explain it back" (`common.explain`).

---

### 2. Remainder Fair Share Workbench (`#share?mode=leftover`)
- **Captured Mockups**:
  - `specs/004-division/mockups/share_mode_leftover-en-390x844.png`
  - `specs/004-division/mockups/share_mode_leftover-ta-390x844.png`
  - `specs/004-division/mockups/share_mode_leftover-hi-390x844.png`
- **Key Elements**:
  - Step guide (1): "{a} laddoos on {b} plates. What happens to the ones left over?"
  - Bottom dashed remainder tray (`rx=17`, `stroke-dasharray="5 4"`) labeled "Leftover" / "மீதி" / "बचे हुए".
  - When dealt: remaining laddoos animate into the remainder tray.
  - Written card: "$14 \div 4 = 3 \text{ r } 2$" with kumkum accent, and "$4 \times 3 + 2 = 14$".
  - "Cut remainder into {n} pieces" button (`share.cut`):
    - On click: leftover laddoos animate into $n$ circular pie wedges, flying onto each plate.
    - Card updates: "Each plate gets: $3 + 2/4 = 3 + 1/2$".

---

### 3. Bodha Cards for D1 (`#bodha?k=D1`)
- **Captured Mockups**:
  - `specs/004-division/mockups/bodha_k_D1-en-390x844.png`
  - `specs/004-division/mockups/bodha_k_D1-ta-390x844.png`
  - `specs/004-division/mockups/bodha_k_D1-hi-390x844.png`
- **Cards**:
  - `what`: Sharing equally.
  - `idea`: 4 plates with 3 laddoos each.
  - `why`: 4 plates with equation $4 \times 3 = 12$.
  - `example`: 5 friends sharing 15 mangoes ($5 \times 3 = 15$).

---

### 4. Bodha Cards for D3 (`#bodha?k=D3`)
- **Captured Mockups**:
  - `specs/004-division/mockups/bodha_k_D3-en-390x844.png`
  - `specs/004-division/mockups/bodha_k_D3-ta-390x844.png`
  - `specs/004-division/mockups/bodha_k_D3-hi-390x844.png`
- **Cards**:
  - `what`: Leftovers and remainders.
  - `idea`: 4 plates with 3 each + 2 in remainder tray ($14 \div 4 = 3 \text{ r } 2$).
  - `why`: Cut leftovers into halves ($3 + \frac{1}{2}$).
  - `example`: 7 rotis between 2 children ($7 \div 2 = 3\frac{1}{2}$).
