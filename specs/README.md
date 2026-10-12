# Specifications (`specs/`)

This directory contains feature specifications, implementation plans, task checklists, progress handoffs, and verification evidence for Gurukul features (001–045), adhering to the Agentic Delivery Standard.

---

## Directory Conventions
Each feature resides in its own folder: `specs/<###-feature-name>/` (e.g., `specs/001-app-shell/`).

### Required Files per Feature:
1. **`spec.md`**: What and why (technology-agnostic user stories and acceptance scenarios `US<n>-AS<m>`). Approved by human at **Gate G1**.
2. **`mockups.md`**: Visual fidelity protocol mapping prototype routes, elements, controls, states, linked panes, and approved deviations (DEV_HANDOFF.md §5). Approved at **Gate G1**.
3. **`plan.md`**: Technical design, port map, engine utilization, domain unit tests, test plan, and dependencies. Approved at **Gate G2**.
4. **`tasks.md`**: Ordered task sequence containing `[mockup]`, `[test-acceptance]`, `[test-unit]`, `[port-domain]`, `[port-ui]`, `[i18n]`, `[test-parity]`, `[test-journey]`, `[regression]`, `[a11y]`, and `[evidence]`.
5. **`progress.md`**: Session handoff document copied from `docs/templates/progress-template.md`. Kept up-to-date across agent sessions.
6. **`checks.md`**: Traceability and verification evidence table copied from `docs/templates/checks-template.md`. Every FR and AS mapped to passing test output.

---

## Templates Reference
- **Progress Tracking**: [docs/templates/progress-template.md](../docs/templates/progress-template.md)
- **Checks & Evidence**: [docs/templates/checks-template.md](../docs/templates/checks-template.md)
