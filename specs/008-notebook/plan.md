# Plan: 008 Pothi (Notebook), Recall & Grown-ups (Acharya Corner)

Status: Complete · Branch: `feat/008-notebook`

---

## 1. Architectural Strategy & Module Ownership
1. **Domain (`src/domain/curriculum/recall.ts`)**:
   - Pure domain logic for spaced review selection (`generateReturnQuestions`).
   - Takes immutable history array: `Array<{ knotId: string, timestamp: number, reviewCount?: number }>`.
   - Never imports UI or persistence. Fully tested in `src/domain/curriculum/recall.test.ts`.
2. **Persistence (`src/persistence/pothi.ts`)**:
   - Clean typed persistence layer for notebook pages, sutras, voice notes, and settings.
   - Types: `NotebookPage`, `KeptSutra`.
   - Methods: `getPages()`, `addPage()`, `getKeptSutras()`, `toggleKeptSutra()`, `clearAll()`.
3. **Thumbnail Rendering Engine (`src/ui/components/notebook/thumbs.ts`)**:
   - Generates compact 48x48 SVG thumbnails for models across all threads:
     - `M4`: Rectangle with tens cuts and rooms.
     - `M5`: Two drummers rhythm timeline.
     - `D1` / `D3`: Fair share plates and laddoos with remainder knife cut.
     - `G2`: Rope and pegs rectangle.
     - `G4`: Kolam symmetry mirror.
     - `S2` / `S3`: Sets Venn circles (overlap, apart, inside).
     - `L2`: Logic marble gate dots.
4. **Notebook Screen (`src/ui/components/screens/notebook.ts`)**:
   - Renders Pothi list (newest first).
   - Re-reads sentences in active language via tile keys.
   - Restores workbench state on card click.
5. **Grown-ups Screen (`src/ui/components/screens/grownups.ts`)**:
   - Robust two-finger hold handler with animation frame progress.
   - Unlocked view with weekly sentence list, pedagogy, privacy principles, and two-tap reset.

---

## 2. Risk & Invariant Guardrails
- **DPDP Act 2023**: Zero PII, zero network requests, 100% localStorage.
- **Calm UI**: Zero stars, streaks, points, praises.
- **Strict Accessibility**: All buttons, cards, and hold dots have accessible aria-labels and keyboard compatibility.
