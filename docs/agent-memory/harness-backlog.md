# Harness backlog — rules waiting to become sensors

<!-- Agentic Delivery Standard v1.0 · tier: SEED. "Gates, not promises": every prose rule that matters should end up as a check. -->

| Rule (source) | Current form | Target sensor | Owner | Status |
|---|---|---|---|---|
| [e.g. No pricing maths in templates (INV-3)] | AGENTS.md prose | dependency rule: templates may not import domain calculators | [name] | backlog |
| Translated strings are in the right script, with the same keys and placeholders as English (lessons.md, 2026-10-11) | candidate lesson; a temporary checker was used outside the repo | `scripts/harness` check over `design/prototype/js/i18n/` (later `src/domain/i18n/`): key parity, `{placeholder}` and `[[id]]` parity, and each value mostly in its language's script | unassigned | backlog |
