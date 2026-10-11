# Plan: 009 Gurukul Shell — Full Multi-Subject Ashram, Shalas & Jaal

Status: Complete · Branch: `feat/009-ashram-shell`

---

## 1. Architectural Strategy & Module Ownership
1. **Curriculum Domain (`src/domain/curriculum/curriculum.ts`)**:
   - Holds immutable specification of 3 Shalas (`ganita`, `vijnana`, `loka`), 18 threads, 74 knots, 10 Jaal crossings.
   - Pure helpers: `findSection`, `findKnot`, `placeOf`, `playable`, `firstStep`, `afterBodha`, `knotsIn`, `jaalFor`.
2. **Ashram Screen (`src/ui/components/screens/ashram.ts`)**:
   - Renders courtyard with Banyan tree SVG art, 3 Shala entry portals, Continue card, Pothi link, Grown-ups link.
3. **Shala Screen (`src/ui/components/screens/shala.ts`)**:
   - Renders subject loom with sinusoidal thread line SVG, knot states (done, next, later), Jaal tags, and calm toast for unbuilt knots.
4. **Jaal Screen (`src/ui/components/screens/jaal.ts`)**:
   - Renders triangular multi-subject network SVG with interactive crossing curves and details card.
5. **Stage Bar (`src/ui/components/chrome/stage-bar.ts`)**:
   - Renders accessible 3-stage breadcrumbs with "What am I learning?" Bodha recall button.

---

## 2. Risk & Invariant Guardrails
- 0 gamification elements: zero score, stars, badges, streaks.
- 100% on-device state persistence: `gurukul:continue`, `gurukul:done`, `gurukul:sutras`.
- Accessible SVG elements with proper `aria-hidden` and `aria-label` tags.
