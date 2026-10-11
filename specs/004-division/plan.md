# Implementation Plan: 004 Division threads (D1–D4) & Fair Share Table

<!-- Spec Kit standard. Status: Draft · Priority: P1 · Lane: Feature · Branch: feat/004-division -->

## 1. Port Map & Architectural Alignment
Per `docs/ARCHITECTURE.md` and `docs/rules/MATH_RULES.md`:

| Source in Prototype | Target in Production | Ownership & Responsibilities |
|---|---|---|
| `design/prototype/js/model/divide.js` | `src/domain/math/divide.ts` | **Domain Math**: Pure division algorithms (`share`, `dealSequence`, `leftoverFraction`, `factorPairs`, `gcd`). No DOM, no framework imports. |
| `design/prototype/js/manipulatives/fair-share.js` | `src/ui/manipulatives/fair-share.ts` | **UI Manipulative**: Pure SVG interactive component rendering pile, circular plates, animation tweens, remainder tray, and wedge cuts. |
| `design/prototype/js/screens/workbenches.js` (lines 133–230) | `src/ui/components/screens/share.ts` | **UI Screen**: Fair Share workbench workbench screen (`#share`), supporting `?mode=share` (D1) and `?mode=leftover` (D3), steppers, bar diagram, written equations card, and narrator speech. |
| `design/prototype/js/lessons/ganita-p1.js` (plates) | `src/ui/diagrams/share.ts` | **UI Diagrams**: Bodha SVG diagram generator for D1 and D3 cards. |
| `design/prototype/js/lessons/ganita-p1.js` (D1, D3) | `src/domain/lesson/d1.ts`, `d2.ts`, `d3.ts`, `d4.ts` | **Domain Lesson**: Lesson specifications registered in `registry.ts`. |
| `src/main.ts` | `src/main.ts` | Register `createShareScreen` into router. |

---

## 2. Invariants & Rules Checklist
- [x] **Zero runtime dependencies**: Pure TypeScript + DOM + SVG.
- [x] **Depcruise boundaries**: `domain/math` does not import UI; `domain/lesson` imports only types; UI components use plain domain models.
- [x] **Calm Pedagogy**: Zero stars, points, streaks, or chimes. Zero praise words (`banned-words.test.ts` enforced).
- [x] **Accessibility**: Drag/tap actions have equivalent accessible steppers.
- [x] **Language Equity**: Full string dictionary coverage across `en`, `hi`, `te`, `bn`, `ta`.

---

## 3. Test Strategy
1. **Unit Tests**:
   - `src/domain/math/divide.test.ts`: test `share(12, 4)`, `share(14, 4)`, `dealSequence(14, 4)`, `leftoverFraction(2, 4) == { 2/4 = 1/2 }`, `factorPairs(24)`.
2. **Acceptance Tests**:
   - `tests/acceptance/004-division.spec.ts`: test US1–US5 (dealing, remainder tray, fraction cutting, equations, bar visual, steppers, Bodha cards, language switching).
3. **Mockup Parity Tests**:
   - `tests/e2e/mockup/004-division.spec.ts`: compare `#share?mode=share`, `#share?mode=leftover`, `#bodha?k=D1`, `#bodha?k=D3` against 12 captured PNGs.
4. **User Journeys**:
   - `tests/e2e/journeys/004-journeys.spec.ts`: full journey J5 through D1 and D3; language switch persistence on `#share`.
5. **Quality Sensors**:
   - Run `python3 scripts/harness/verify.py` (11 sensors green).
