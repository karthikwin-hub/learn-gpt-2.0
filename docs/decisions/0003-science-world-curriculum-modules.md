# ADR-0003: Owning modules for science, world and curriculum

- **Status**: Accepted (product owner, 2026-10-11)
- **Date**: 2026-10-11 · **Deciders**: product owner · **Related**: ADR-0002, docs/ARCHITECTURE.md, docs/product/DEV_HANDOFF.md, docs/product/SPECKIT_HANDOFF.md

## Context
ADR-0002 widened Gurukul from maths to three subjects (Ganita, Vijnana, Loka) and made every lesson data-driven (Prashna, Bodha cards, mistake, explain-back template). The architecture map had only `src/domain/math/` and `src/domain/i18n/`. Without an owner, science rules (digestion order, friction, shadow length), social-studies rules (BCE/CE with no year zero, Earth's spin and seasons, map scale) and the curriculum structure (Shalas, threads, knots, crossings, lesson content) would land in the maths module or in screens, which breaks INV-1 (one owner per domain) and INV-3 (no business logic in presentation).

The prototype already separates them: `js/model/science.js`, `js/model/world.js`, `js/model/curriculum.js` and the lesson data in `js/lessons/*.js`.

## Options considered
1. **Fold everything into `src/domain/math/`.** No new folders, but "math" would own digestion and history; reviewers could not tell where a rule belongs.
2. **One `src/domain/content/` module for all subjects.** Fewer folders, but mixes pure rules with lesson content and grows without a boundary.
3. **Three new pure domain modules: `science`, `world`, `curriculum`** (chosen), mirroring the prototype and the subject split.

## Decision
- `src/domain/science/` owns Vijnana rules: digestion order and absorption, friction and the fair-test rule, shadow geometry and light materials. Pure functions and data only.
- `src/domain/world/` owns Loka rules: signed years and years-between with no year zero, centuries, event chronology, Earth's spin hour and seasons, map directions, walking, blocking and scale.
- `src/domain/curriculum/` owns the structure and lesson content contracts: Shalas, threads, knots, crossings (Jaal), the lesson step order (Prashna, Bodha, optional film, workbench, mistake, explain, stop), and each lesson's data (Bodha card keys and diagram ids, Prashna choices, mistake steps and wrong index, explain-back template). It references string keys, never translated text.
- `src/domain/math/` keeps maths rules, including place value, fractions and rupees/paise (`number`).
- All four are pure: no framework, DOM, storage or i18n runtime imports. `curriculum` may import the other three only to name which rule a lesson uses; the subject modules never import `curriculum`. `science` and `world` may import `math` through its public index for shared maths; they never import each other.
- Each module gets a rules document under `docs/rules/` (created in DEV_HANDOFF Phase 0).

## Consequences
- Positive: every rule has one home; the dependency-cruiser check can enforce the boundaries; porting from the prototype is file-for-file.
- Negative: three more folders and rules documents to keep current. Mitigation: rules documents are short and point to CURRICULUM_PHASE2.md for the facts.
- Follow-ups: update ARCHITECTURE.md (done with this ADR); add dependency-cruiser rules in Phase 0; science and social-studies facts need teacher sign-off before features 011 and 012 (ADR-0002).
