# Feature Specification: 046 Remediation of lessons 001–045 to the Gurukul standard

**Status:** Approved (product owner, chat of 12 Oct 2026: "consider you already have my approvals needed for implementation of these fixes"). New features are frozen until this is merged.
**Source:** Review of `main` at `ee6e54e` (see `docs/reports/REMEDIATION_046.md`).

## 1. Why

Every harness check passed on `main`, but the lessons did not meet the standard set by the reference prototype (`design/prototype/`) and `docs/product/DEV_HANDOFF.md`:

- 29 lessons (013–045) had no Hindi, Telugu, Bengali or Tamil text; only 1,222 of 2,561 strings existed outside English.
- Prashna screens showed no picture; Bodha cards for 30+ lessons had no figure; three logic lessons showed a figure from a different topic; no lesson had a Spot-the-mistake picture.
- N1, N3, U1, B3, R1 and K2 had no lesson entry, so Bodha borrowed M2's card layout.
- Benches contained about 250 hard-coded English strings and several `innerHTML` blocks.
- Explain-it-back accepted any sentence: the prototype's gentle hint was not ported.
- The "mockup-parity" and "sweep" checks only exercised the prototype's home screen, so none of the above could fail a check.

## 2. The lesson standard (what "done" means for every playable knot)

A lesson reaches the standard when, in all five languages:

1. Its Prashna shows one picture and one real question with three choices.
2. Its Bodha has six cards; every card except the sutra shows a figure that illustrates that card, and the worked-example figure changes with each step.
3. Its bench is a manipulative whose values come from the domain model, with all visible text from the dictionaries.
4. Its Spot-the-mistake reveals a picture of the mistake and a translated equation line.
5. Its Explain-it-back offers the gentle hint when the sentence does not match the model, and still lets the child keep their own sentence.
6. Every visible string is in the child's language (proper nouns, numerals and unit symbols excepted) and contains no praise, score or streak words.

## 3. User stories and acceptance scenarios

### User Story 1: A child sees every lesson in their own language

1. **Given** any playable knot and any of hi, te, bn, ta, **When** the child opens its Prashna, Bodha (every card), bench, Spot-the-mistake and Explain screens, **Then** no English sentence, raw key, placeholder or `[[` token is visible.
2. **Given** the dictionaries, **When** they are checked, **Then** every English key exists in hi, te, bn and ta, is written in that language's script, and keeps the same placeholders and glossary term ids.
3. **Given** the dictionaries in all five languages, **When** they are scanned, **Then** no value contains a praise, score or streak word.

### User Story 2: Every lesson explains with pictures

1. **Given** any playable knot with a Prashna, **When** the Prashna opens, **Then** a picture is shown.
2. **Given** any lesson, **When** the child steps through Bodha, **Then** every card except the sutra shows a figure, and the example figure differs between its first and last step.
3. **Given** any lesson with a Spot-the-mistake, **When** the child taps the wrong step, **Then** a picture and a translated equation line are revealed.

### User Story 3: Every lesson can be completed end to end

1. **Given** any playable knot, **When** the child goes Prashna → Bodha → bench → Spot-the-mistake → Explain → stop, **Then** each screen renders for that knot (never another knot's content) and the Pothi gains a page for it.
2. **Given** an Explain sentence that does not match the model, **When** the child taps Keep, **Then** the knot's hint is shown once, and a second tap keeps the sentence.

### User Story 4: The checks catch these problems

1. **Given** the harness, **When** `python3 scripts/harness/verify.py` runs, **Then** it runs the app-level sweep, the every-lesson journey, the existing journeys and the mockup specs, and the static UI-text scan.

## 4. Functional requirements

- **FR-001** The UI layer contains no hard-coded user-visible English and no `innerHTML`/`html:` with sentences; a test scans `src/ui`.
- **FR-002** Lesson pictures (Prashna art, Bodha card figures, mistake pictures) are supplied by one UI-side registry keyed by knot, computed from domain functions.
- **FR-003** A knot without lesson data fails visibly (no silent fallback to M2 or M4 content).
- **FR-004** Glossary term ids may contain hyphens.
- **FR-005** Mistake equation lines come from the dictionaries (`mistake.<K>.eq`) using a safe markup (`<s>…</s>` struck, `<r>…</r>` highlighted) rendered without `innerHTML`.
- **FR-006** Highest common factor has one owner in `src/domain/math`.
- **FR-007** Storage failures are reported (not silently swallowed); router step params are validated; screens clear their timers on navigation.
- **FR-008** New benches honour reduced motion and are operable by keyboard.

## 5. Out of scope

- New knots or features (frozen).
- Native-teacher and subject-teacher review (human; after this lands). All non-English text remains a draft until then.
- Phase 1 lessons that the prototype never gave a Spot-the-mistake (M2, D1, D3) keep their current flow.
