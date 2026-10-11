# Implementation Plan: 001 App shell, language switching and fonts

**Feature**: 001 App shell, language switching and fonts (The Gurukul Shell)  
**Gate**: G2 (Technical Design Approval)  
**Spec**: [specs/001-app-shell/spec.md](spec.md)  
**Mockups Protocol**: [specs/001-app-shell/mockups.md](mockups.md)  
**Governing Standard**: [docs/product/DEV_HANDOFF.md](../../docs/product/DEV_HANDOFF.md) §11.2, [AGENTS.md](../../AGENTS.md)

---

## 1. Port Map: Prototype → Production

| Prototype File | Production Destination | What Changes / Ports |
|---|---|---|
| `js/util.js` (`store`, `el`, `svg`) | `src/persistence/storage.ts`, `src/ui/util/dom.ts` | Typed with `gurukul:` namespace prefix; DOM helper functions in strict TypeScript |
| `js/i18n/core.js` | `src/domain/i18n/core.ts` | Strict typed translation dictionary, placeholder replacement, missing key warning, duplicate key checks |
| `js/i18n/*.js` (30 dictionary files) | `src/domain/i18n/dictionaries/*` | Port all string keys across 5 languages (`en`, `hi`, `te`, `bn`, `ta`) for core, gurukul, bodha, ganita, vijnana, loka |
| `js/model/curriculum.js` | `src/domain/curriculum/curriculum.ts`, `index.ts` | Full curriculum model: all 3 Shalas (Ganita, Vijnana, Loka), all 18 threads, all 74 knots, and 10 JAAL links |
| `js/router.js` | `src/ui/components/app/router.ts` | Hash router (`#/<screen>?<params>`), in-memory state keying, history depth, cleanup lifecycle |
| `js/app.js` (chrome parts) | `src/ui/components/chrome/topbar.ts`, `language-sheet.ts` | Topbar with language glyph, back button, sound toggle; accessible modal sheet |
| `js/screens/opening.js`, `kolam-line.js` | `src/ui/components/screens/opening.ts`, `src/ui/diagrams/kolam-curve.ts` | 3×4 dot kolam curve with tap-to-skip and reduced-motion instant completion |
| `js/screens/language.js` | `src/ui/components/screens/language.ts` | 5 language cards in native scripts (`en`, `hi`, `te`, `bn`, `ta`), selection state, continue button |
| `js/screens/ashram.js` | `src/ui/components/screens/ashram.ts`, `src/ui/diagrams/banyan.ts` | Ashram screen (`#home`): secular banyan tree line art, 3 Shala cards, continue card, remember card, Jaal button |
| `js/screens/shala.js` | `src/ui/components/screens/shala.ts` | Reusable Shala component rendering any subject (`shala?s=ganita`, `vijnana`, `loka`), wave SVG spine, knot status dots, unbuilt toast |
| `js/screens/jaal.js` | `src/ui/components/screens/jaal.ts`, `src/ui/diagrams/jaal-web.ts` | Jaal screen (`#jaal`): triangle SVG, 10 cross-subject curved links, detail cards, navigation to knots |
| `styles.css` (tokens, shell, ashram, shala, jaal) | `src/ui/components/theme/tokens.css`, `shell.css`, `shala.css`, `jaal.css` | Modularized CSS using design tokens, night mode contrast |
| *(new)* | `public/sw.js`, `src/ui/util/register-sw.ts` | Lightweight service worker for offline cache |

---

## 2. Engine & Architecture Alignment

### 2.1 Routing & State Keys
- **Hash format**: `#/<screen>?<key>=<value>`
- **State Key**: `<screen>` + (`:<mode>` if present) + (`:<k>` if present)
- State survives language switches in memory under the state key: switching languages re-renders the active screen passing the preserved state object.
- **In-app history**: Track depth; at depth 0, Back returns to `home` (Ashram).

### 2.2 Screen Lifecycle Interface
```ts
export interface ScreenMeta {
  id: string;
  title?: string | ((params: Record<string, string>) => string);
  hideBack?: boolean;
  hideTopbar?: boolean;
  full?: boolean;
  render(view: HTMLElement, state: Record<string, unknown>, params: Record<string, string>): (() => void) | void;
}
```

### 2.3 Persistence Keys
- `gurukul:lang`: Active language (`en` | `hi` | `te` | `bn` | `ta`).
- `gurukul:theme`: Theme preference (`day` | `night`).
- `gurukul:sound`: Audio narration toggle (`true` | `false`).
- Zero child-identifying data or analytics.

### 2.4 Curriculum Model
All 3 Shalas, 18 threads, 74 knots, and 10 Jaal links from `design/prototype/js/model/curriculum.js`.
- **Ganita**: 8 threads, 33 knots.
- **Vijnana**: 6 threads, 16 knots.
- **Loka**: 4 threads, 25 knots.
- **Jaal**: 10 cross-subject links.

---

## 3. Test Plan

### 3.1 Domain Unit Tests (`src/domain/**/*.test.ts`)
1. **Router & State**: Hash parsing, param extraction, unique state key generation.
2. **i18n Runtime**: Key lookup, placeholder interpolation, fallback to English, duplicate key prevention.
3. **i18n Parity & Script Purity**: §8.3 tests across all 30 dictionary files for all 5 languages.
4. **Complete Curriculum**:
   - All 3 sections exist with 18 threads total.
   - Total 74 knots registered without duplicates.
   - Exactly 18 knots report `playable() === true`.
   - All 10 JAAL links reference valid knots in both endpoints.
   - `firstStep` returns appropriate route.
5. **Persistence**: `gurukul:` namespace prefix, zero PII.

### 3.2 Acceptance Tests (`tests/acceptance/001-app-shell.spec.ts`)
- `US1-AS1`: Opening plays (or skips), leads to language selection with 5 cards.
- `US1-AS2`: Selecting Tamil and Continue opens Ashram in Tamil, writes `gurukul:lang="ta"`.
- `US1-AS3`: Returning reload skips opening & language selection, lands on Ashram.
- `US2-AS1`: Language button in topbar opens sheet; switching updates all text across Ashram, Shala, and Jaal with state preserved.
- `US2-AS2`: Missing key falls back to English.
- `US3-AS1`: Ashram renders banyan tree, 3 Shala cards (Ganita, Vijnana, Loka), and link to Jaal.
- `US4-AS1`: Ganita Shala renders all 8 threads (33 knots); unbuilt knots display calm toast.
- `US5-AS1`: Vijnana Shala renders all 6 threads (16 knots); crossing tags indicate other subjects.
- `US6-AS1`: Loka Shala renders all 4 threads (25 knots).
- `US7-AS1`: Jaal screen renders triangle diagram and detail card for all 10 links.
- `US8-AS1`: Shell loads and operates offline.
- `US8-AS2`: Local storage contains only `gurukul:*` keys and 0 PII.
- `US9-AS1`: Night theme toggle applies dark contrast meeting WCAG AA.

### 3.3 Journeys (`tests/e2e/journeys/`)
- **J1 First run**: Fresh storage $\to$ opening (skip) $\to$ language (Tamil) $\to$ Ashram in Tamil $\to$ reload skips opening.
- **J2 Language switch keeps state**: Open Ganita Shala $\to$ switch to Hindi $\to$ Shala in Hindi $\to$ navigate to Vijnana Shala $\to$ switch back to English.
- **J9 Shell offline**: Load once $\to$ `context.setOffline(true)` $\to$ reload $\to$ Ashram, Shalas, and Jaal functional.
- **J10 Cross-subject entry**: Ashram $\to$ each Shala $\to$ Jaal $\to$ pick each link $\to$ verify navigation.

### 3.4 Mockup Parity & Sweep
- **Parity**: `tests/e2e/mockup/001-shell.spec.ts` comparing trimmed text lines between prototype and app for `opening`, `language`, `home`, `shala?s=ganita`, `shala?s=vijnana`, `shala?s=loka`, and `jaal`.
- **Sweep**: 5 languages × 2 viewports (390×844, 360×740) + reduced motion pass.

---

## 4. Dependencies
**None**. Zero new runtime dependencies; zero new dev dependencies.

---

## 5. Risks and Deviations
- **Deviations**: **Zero deviations** from prototype.
