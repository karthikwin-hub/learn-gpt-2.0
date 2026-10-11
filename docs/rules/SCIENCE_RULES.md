# Science Domain Rules (Vijnana)

**Owning Module**: `src/domain/science/`  
**Owner**: Core Team + Science Teacher Reviewer  
**Governing Invariant**: INV-1 (Single Domain Ownership)  
**Reference Sources**: [docs/product/CURRICULUM_PHASE2.md](../product/CURRICULUM_PHASE2.md), [docs/product/DEV_HANDOFF.md](../product/DEV_HANDOFF.md) §8.2, ADR-0002, ADR-0003

---

## 1. Domain Scope & Responsibilities
`src/domain/science/` owns all scientific simulations, models, and validations for Class 5 Vijnana.
It contains pure logic and models:
- **Digestion & Nutrition (B3 `digest`)**:
  - The human digestive tract sequence: mouth $\to$ food pipe (oesophagus) $\to$ stomach $\to$ small intestine $\to$ large intestine.
  - Nutrients and water absorption mechanics (most nutrients absorbed in small intestine; water absorbed in large intestine).
- **Forces & Friction (K2 `ramp`)**:
  - Controlled fair testing: keeping ramp angle and release position constant while varying surface textures.
  - Relative rolling distance order: Tile (lowest friction) > Wood > Rug > Sand (highest friction). Distances are explicitly marked as pretend/model metres.
- **Light & Shadows (R1 `shadow`)**:
  - Rectilinear propagation of light.
  - Shadow geometry: shadow length proportional to stick height and distance from light source ($\text{shadowLength}(h, d, L) = \frac{h \times d}{L - h}$ for lamp height $L > h$; $\infty$ if $L \le h$).
  - Material transparency levels: Opaque (darkest shadow) > Translucent (faint shadow) > Transparent (no visible shadow).

---

## 2. Invariant Known Values
Every implementation of these scientific rules must pass the test cases in `DEV_HANDOFF.md` §8.2:

| Concept | Scenario | Expected Invariant |
|---|---|---|
| Organ order | Full digestive tract sequence | mouth $\to$ pipe $\to$ stomach $\to$ small $\to$ large |
| Nutrient absorption | Absorption distribution | Most absorbed in small intestine |
| Ramp roll distance | $h=1\text{ m}$, surface textures | Tile (6.0), Wood (3.8), Rug (1.9), Sand (1.2) pretend metres |
| Shadow geometry | Stick 1.5m, dist 2.5m, lamp 3.0m | Shadow length = 4.5m |
| Shadow geometry | Lamp height $\le$ stick height | Shadow length = $\infty$ (cannot form floor shadow) |
| Shadow darkness | Material comparison | Cardboard (opaque) darkest, Glass (transparent) lightest |

---

## 3. Dependency Constraints
- May NOT import UI or DOM packages.
- May import `src/domain/math/index.ts` for pure mathematical utilities if needed.
- May NOT import `src/domain/world/` or `src/domain/curriculum/`.
- All factual science rules require human sign-off from a qualified science teacher prior to Gate G1.
