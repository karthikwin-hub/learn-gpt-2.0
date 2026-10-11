# Manipulative Rules

**Owning Module**: `src/ui/manipulatives/`  
**Owner**: Core Team  
**Governing Invariant**: INV-1 (Single Domain Ownership)  
**Reference Sources**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) Principle IV, [docs/product/EXPERIENCE.md](../product/EXPERIENCE.md), [docs/product/DEV_HANDOFF.md](../product/DEV_HANDOFF.md) §7

---

## 1. Domain Scope & Responsibilities
`src/ui/manipulatives/` owns the interactive, tactile digital manipulatives (microworlds) through which learners manipulate concepts:
- Area Grid (multiplication as area, partial products)
- Fair Share Table & Plate Fraction Partitions (division and remainders)
- Rope & Pegs (fixed perimeter geometry and optimization)
- Kolam Symmetries (turn and mirror patterns)
- Two Drummers (beat lines and multiples)
- Sorting Courtyard & Marbles (sets and logic gates)
- Place Value Houses & Bundles (Indian and international number scales)
- Fraction Strips & Rupee Grids (fractions and decimals)
- Digestion Path (human digestive tract)
- Friction Ramp (surface rolling fair test)
- Lamp & Stick (light, shadow length, and opacity)
- Timeline Thread (chronology and intervals without year 0)
- Earth & Sun (rotation, diurnal cycles, and axial tilt seasons)
- Courtyard Map (compass navigation and distance scaling)

---

## 2. Invariant Rules
- **Concrete-Pictorial-Abstract (CPA)**: Manipulatives must make the underlying mathematical/scientific structure concrete and tactile.
- **Multiple Input Modes**: Every interactive handle must support:
  1. Pointer drag (mouse / touch)
  2. Keyboard control (Arrow keys with step increments)
  3. Stepper controls (`+` / `-` buttons)
- **Visual Residue**: Prior states or ghosted outlines must remain faintly visible during manipulation to offload working memory.
- **Synchronized Linked Panes**: Model state changes must update all linked representations (equations, area meters, readouts) in the exact same render frame.
- **Presentation Only**: Manipulatives capture gestures and display values; they delegate all computational rules to `src/domain/`.
- **Accessibility & Motion**: Must provide WCAG AA contrast, 48px touch targets, and instant state cut alternatives when `prefers-reduced-motion` is enabled.
