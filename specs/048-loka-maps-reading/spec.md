# Feature Specification: 048 Loka — real maps of India and full chapters to read

<!-- Spec Kit standard. Status: Approved (product owner approved the plan on 21 Oct 2026) · Priority: P1 · Lane: Feature · Branch: feat/048-loka-maps-reading (stacked on feat/047-loka-lessons) -->

## 1. Problem

Product-owner feedback on 047, across all Loka chapters:

- There is no map of India. C1 and the other India chapters draw India as a grid of equal squares, which does not look like India and cannot show where the Himalaya, the Thar, the Deccan or the rivers are.
- There is too little to read. Each chapter gives the child about 190–250 words over six short Bodha cards; a Class 5 chapter on the same topic is well over a thousand words. Children who like this subject want to read much more.

## 2. Decisions (product owner, 21 Oct 2026)

- Map data: openly available state boundaries that follow the official Survey of India boundary, simplified once into a file stored in the repo (ADR-0004). No new runtime library. This supersedes 047 §2 "No political outline of India is traced".
- The real map is used in every India chapter (C1–C9) and in E3 where it fits.
- Reading: a new "Read the chapter" section per chapter, about 1,000–1,500 words, with headings, maps and pictures, "Did you know?" boxes, words to know, a try-at-home activity and check-yourself questions with answers the child reveals. The hands-on lesson stays 10–15 minutes.
- English first for teacher review; hi/te/bn/ta later, as drafts, once the English is approved. Until then the reading entry is hidden in those languages.
- All 18 Loka chapters, including I2, E1 and E4.

## 3. User stories and acceptance scenarios

### US1 · A real map of India
- **US1-AS1** The C1 bench shows India drawn from the boundary data: one shape per state and union territory, with the caption "Boundaries: Survey of India".
- **US1-AS2** Choosing "my state" in C1 marks that state on the map; each neighbour the child finds is marked too.
- **US1-AS3** The C9 bench lights the four festival states on the same map.

### US2 · Read the chapter
- **US2-AS1** A Loka chapter card in the Shala offers "Read the chapter", which opens the chapter: its title, section headings and at least one map or picture.
- **US2-AS2** Tapping "Show answer" under a check-yourself question reveals the answer; nothing is scored.
- **US2-AS3** A word to know in the text opens its meaning, and the text-size buttons make the text larger.
- **US2-AS4** The end of Bodha and the Stop screen of a Loka lesson offer "Read the chapter".
- **US2-AS5** In Hindi, Telugu, Bengali and Tamil, no "Read the chapter" entry is shown until that language has the chapter.

### US3 · Every chapter is there
- **US3-AS1** Each of the 18 Loka chapters opens at `#read?k=<knot>` in English at both viewports, with no raw keys and no horizontal overflow.

## 4. Invariants

- Map shapes, rivers, zones and place positions live in `src/domain/world/geo/`; the drawing only displays them.
- The external boundary is the Survey of India one and is never edited by hand. Terrain zones are drawn by hand and labelled approximate.
- Chapter content lives in `src/domain/reading/`; the screen only displays it. Each English chapter has at least 1,000 words (tested).
- No score, timer or praise word in the reading.
- No new dependencies.

## 5. Facts needing a teacher's sign-off

All chapter text, figures and questions: see `checks.md` §Teacher check, chapter by chapter.
