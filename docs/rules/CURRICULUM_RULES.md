# Curriculum Domain Rules

**Owning Module**: `src/domain/curriculum/`  
**Owner**: Core Team + Spec Owner  
**Governing Invariant**: INV-1 (Single Domain Ownership)  
**Reference Sources**: [docs/product/CONCEPT.md](../product/CONCEPT.md), [docs/product/CURRICULUM.md](../product/CURRICULUM.md), [docs/product/CURRICULUM_PHASE2.md](../product/CURRICULUM_PHASE2.md), [docs/product/DEV_HANDOFF.md](../product/DEV_HANDOFF.md) §6.3, ADR-0002

---

## 1. Domain Scope & Responsibilities
`src/domain/curriculum/` owns the structural definitions of the learning hierarchy, lesson progression rules, knot registry, and static lesson data:
- **Hierarchy**:
  - 3 Shalas (Sections): Ganita (Mathematics), Vijnana (Science), Loka (Social Studies).
  - Threads: Thematic learning paths within a Shala.
  - Knots: Individual conceptual learning units (e.g., `M2`, `M4`, `B3`, `I2`).
  - Jaal: Inter-subject thematic crossings connecting knots across different Shalas.
- **Lesson Step Progression Order**:
  - `firstStep(knot)` $\to$ Prashna (initial query & prediction) if defined $\to$ Bodha (conceptual explanation cards) $\to$ `afterBodha(knot)` (Living Film if knot has one, otherwise Workbench) $\to$ Workbench $\to$ Spot the mistake $\to$ Explain it back $\to$ Stop (reflection & sutra retention).
- **Static Content Registry**:
  - String key references and diagram identifiers for every knot.
  - Worked example reveal sequence steps.
  - Mistake problem specifications (which step is incorrect and corresponding visual representation).
  - Explain-back completion sentence templates and expected tile placements.

---

## 2. Invariant Rules
- **Pure Data Representation**: Lesson registry contains only string key identifiers and diagram tokens—NEVER hardcoded translated strings or inline SVG/DOM elements.
- **Playability Rule**: `playable(knot) = Boolean(knot.start || knot.bench)`. An unplayable knot renders a calm "coming soon" message without raising runtime errors.
- **Card Completeness**: Every active lesson definition must specify exactly 6 Bodha cards (What, Idea, Why, Worked Example, Where in India, Sutra to keep).
- **Cross-Subject Links**: Every link in `JAAL` must reference valid knot identifiers in both endpoints.

---

## 3. Dependency Constraints
- May import `src/domain/math/index.ts`, `src/domain/science/index.ts`, and `src/domain/world/index.ts` to reference domain types/rules.
- May NOT import UI components, presentation layers, DOM APIs, or persistence engines.
