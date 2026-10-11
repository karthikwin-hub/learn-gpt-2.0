# Learn GPT 2.0 (Gurukul) Constitution

<!-- Agentic Delivery Standard v1.0 (preset: agentic-delivery). Ratified for Learn GPT 2.0 -->

## Core Principles

### I. Specification Before Implementation
Features are built only from an approved spec.md (what and why, technology-agnostic) and plan.md (how). Bugs start from a reproduced, assessed cause. Chores may skip the spec but never verification. A discovery during implementation that changes intent flows back into spec.md (and is re-approved at G1) before code that depends on it is merged.
*Rationale: the spec is the agents' source of intent; code that outruns intent cannot be reviewed against anything.*

### II. Testable Requirements and Traceable Evidence (NON-NEGOTIABLE)
Every functional requirement (`FR-###`) and acceptance scenario (`US<n>-AS<m>`) is testable and is verified by an automated test that references its ID, or by documented manual verification marked `[VERIFY: manual]` with recorded evidence in `checks.md`. Acceptance scenarios are owned by the spec owner. Nobody — human or agent — weakens, skips or deletes tests or acceptance criteria to obtain a pass.

### III. Verification Before Done
Work is done only when `python3 scripts/harness/verify.py` passes on the final change, `check_traceability.py` reports nothing missing, `/speckit-converge` reports Converged, and an independent review (an agent or person that did not write the change) has no unresolved BLOCKER or MAJOR findings. "Done" without command output is not done.

### IV. Conceptual Explanatory Manipulatives Over Decorative Graphics
Gurukul exists to build deep intuition for 10-year-olds. Diagrams, models, and interactive elements MUST be active manipulatives that the child can change to see the concept: in mathematics (e.g., interactive Venn diagrams for set theory, area models for multiplication and division, dynamic geometric transformations, truth tables/logic circuits, place-value houses), in science (e.g., a ramp for friction fair tests, a lamp and stick for shadows, the food path for digestion) and in social studies (e.g., a timeline thread, the spinning and orbiting Earth, a map with directions and scale). Every lesson explains the concept first in short, learner-paced Bodha cards with a diagram, before practice (ADR-0002). Passive animations or decorative clutter are strictly prohibited. The UI must remain calm, focused, and free of gamified arcade noise.

### V. First-Class Multilingual Accessibility
English is the baseline interface, but the application must natively support seamless, zero-friction locale switching to Hindi, Telugu, Bengali, and Tamil. Content, labels, explanations, and voice prompts must preserve pedagogical accuracy across all supported languages.

### VI. Architecture Boundaries and Single Ownership
Each business domain has exactly one owning module (`docs/ARCHITECTURE.md`). Logic is never duplicated: a second use moves logic to its owner first. Presentation components display state and bind user interactions; they never compute mathematical domain logic. Domain code depends on contracts, not UI frameworks.

### VII. Child Privacy and Safety by Default
Zero tracking, zero ads, zero user data harvesting, and zero third-party telemetry. Storage of learning state must be local or end-to-end privacy compliant. All secrets and environment variables MUST be stored in Infisical under the project `learn_gpt`; never store, print, or commit raw secrets. External AI calls must be sanitized and protected behind server-side safety guardrails.

### VIII. Simplicity and Smallest Sufficient Change
Prefer existing code, standard platform APIs, and minimal dependencies. No speculative abstractions, layers, or flags. New dependencies require written justification in `plan.md` and approval at Gate G2.

### IX. Human Accountability (Gates G1–G4)
Humans approve the spec (G1), the design (G2), readiness to build (G3), and completion (G4). Humans merge, release, and approve changes to protected files (`constitution.md`, `AGENTS.md`, acceptance tests, CI, hooks). AI assistance is disclosed in every pull request.

### X. Continuous Harness Improvement
Every human correction becomes a candidate lesson with an example in `docs/agent-memory/lessons.md`. Recurring patterns are promoted to automated checks.

---

## Technology and Quality Standards
- **Target Audience**: 10-year-old learners (~Grade 5).
- **Subject Scope**: Class 5 Ganita (mathematics: numbers, operations, factors and multiples, geometry, measurement, data, patterns, logic and sets), Vijnana (science) and Loka (social studies: history, geography, civics), as mapped in `docs/product/CURRICULUM_PHASE2.md`. Phase 1 built mathematics (Geometry, Set Theory, Multiplication, Division, Logic); features 009–012 add the Gurukul shell, more Ganita, Vijnana and Loka.
- **Content accuracy**: science and social-studies facts, dates and misconceptions are reviewed by a subject teacher before their feature passes G1.
- **Supported Locales**: English (`en`), Hindi (`hi`), Telugu (`te`), Bengali (`bn`), Tamil (`ta`).
- **Verification Commands**: Configured in `harness.toml`.
- **Quality Gates**: G1 Spec Ready → G2 Design Ready → G3 Ready to Build → G4 Done.

---

## Governance
This constitution supersedes conflicting practices. Amendments require human review and approval.
Runtime guidance for agents lives in `AGENTS.md`; team standards live in `docs/standards/`.

**Version**: 1.1.0 | **Ratified**: 2026-10-11 | **Last Amended**: 2026-10-11 (scope widened to three subjects and Bodha-first lessons, approved by the product owner; ADR-0002, ADR-0003)
