# ADR-0002: Gurukul frame, Bodha before practice, and three subjects

- **Status**: Proposed (the product name was decided by the product owner on 2026-10-11; the rest needs acceptance)
- **Date**: 2026-10-11 · **Deciders**: product owner · **Related**: ADR-0001, docs/product/CONCEPT.md, docs/product/CURRICULUM_PHASE2.md, docs/product/SPECKIT_HANDOFF.md

## Context
Product review of the phase 1 prototype (ADR-0001) gave two pieces of feedback:
1. Children are sent straight to "try it" without being told what they are learning. Concepts need a deeper explanation, and text is acceptable and needed for it.
2. Phase 1 covered five maths topics. The product must cover the child's whole Class 5 year: more maths, plus science and social studies (chapter lists in docs/topics/).

The product owner also asked for a cultural frame: a modern gurukul, with Sutra as the threads that build understanding and each subject as a named section. The product owner chose **Gurukul** as the product name.

Forces:
- For children in grades 2–5, explicit instruction before practice works better than discovery first (RESEARCH C6); text-plus-picture explanations work when segmented, signalled and learner-paced (C9, C20).
- Science and history concepts are often blocked by strong everyday misconceptions (C21) that need to be named and refuted, not just practised around (C22).
- A gurukul frame can carry religious or exclusionary connotations if handled carelessly; the app is for every child in five language communities.
- Building every chapter as a full interactive lesson is not feasible before child testing.

## Options considered
1. **Keep phase 1's flow and add more workbenches.** Cheapest; ignores the main feedback.
2. **Add a text explanation as a separate "Learn" tab.** Easy to build, but it separates explanation from practice, and children skip tabs.
3. **Add Bodha as a step inside every lesson, between the question and the workbench, and reachable from the workbench** (chosen). Keeps one lesson engine; every lesson gets the same anatomy.
4. **Video explanations.** Rejected in ADR-0001 (bandwidth, translation cost, passivity).

For the frame: (a) keep "Sutra" alone; (b) **Gurukul with Sanskrit-rooted section names localised per language** (chosen); (c) English-only section names.

For scope: (i) build every chapter; (ii) **map every chapter, build nine new representative lessons (three per subject) in the prototype** (chosen); (iii) map only.

## Decision
- **Name and frame**: the product is **Gurukul**. The home is the **Ashram**; subjects are **Shalas**: **Ganita** (mathematics), **Vijnana** (science) and **Loka** (social studies). A **sutra** is both a thread (a strand of a subject) and the one-line rule each lesson ends with. The notebook is the **Pothi**; the grown-ups page is the **Acharya corner**.
- **Guardrails**: secular and inclusive: no religious iconography or ritual; every child belongs; the teacher is a voice, never a mascot or guru avatar. ADR-0001's no-game, no-praise and privacy commitments stand unchanged.
- **Lesson flow**: every lesson follows **Shravana** (Prashna, Bodha, optional Living Film), **Manana** (workbench, Spot the mistake) and **Nididhyasana** (Explain it back, Pothi, a good place to stop). A stage bar shows the movement.
- **Bodha** is a required step in every lesson: five or six cards (what, idea, why, worked example, where, sutra), at most three sentences each, with a diagram, narration, tappable key words and adjustable text size. "What am I learning?" on every workbench reopens it.
- **Scope**: CURRICULUM_PHASE2.md maps every Class 5 chapter in the three subjects to a thread and a knot. The prototype makes nine new lessons playable (place value, fractions, money and decimals; digestion, friction, light and shadows; timelines, Earth's motions, maps) and adds Bodha to the nine phase 1 lessons.
- **Section names are localised**, with the school subject shown beneath, and are drafts for teacher review.

## Consequences
- Positive: one lesson anatomy for every subject; children can always say what they are learning; parents see the school syllabus covered; the curriculum map lets Spec Kit features be cut per thread.
- Negative / risks and mitigations:
  - **More text** could feel like a textbook. Mitigation: three sentences per card, a diagram on every card, narration, learner pacing; test reading load with children before feature 009.
  - **The frame may read as religious** to some families. Mitigation: visual guardrails in EXPERIENCE.md §6.4; test the Ashram screen with families of different faiths and languages; Tamil and other names follow the child's language.
  - **Science and social studies need subject experts.** Mitigation: every lesson's facts and misconceptions are cited in CURRICULUM_PHASE2.md and RESEARCH.md; a Class 5 science teacher and a social studies teacher review before build.
  - **Translation volume roughly triples.** Mitigation: the i18n tables are split per language and per section; drafts are labelled; native-teacher review stays a gate.
  - **Board differences**: the chapter lists come from one school's Class 5 books. Mitigation: the knot map is data; a state board variant can reorder or add knots without engine changes.
- Follow-ups: product owner accepts or amends this ADR; trademark and app-store search for "Gurukul"; subject-teacher review of the nine new lessons; add the Bodha anatomy to feature 002's spec.
