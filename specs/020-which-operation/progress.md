# Progress: 020 Which Operation? (Knot A3)

## Session Context
- Scope: Fully playable 7-stage lesson for Knot A3 (Word Problem Physical Schema Models) with dedicated `#wordprob` action workbench.

## State of Work
- **Spec Kit Documentation**:
  - `spec.md`, `plan.md`, `tasks.md`, `checks.md`, `traceability.md` authored.
- **Domain & Tests**:
  - `src/domain/math/wordprob.ts` & `src/domain/math/wordprob.test.ts` (5/5 passing).
  - Exported through `src/domain/math/index.ts`.
- **Lesson & Curriculum**:
  - `src/domain/lesson/a3.ts` authored with 7 stages (Prashna, Bodha, Mistake, Practice, Workbench, Explain, Sutra).
  - Registered in `src/domain/lesson/registry.ts`.
  - Bound as playable in `src/domain/curriculum/curriculum.ts` (27 total playable knots).
- **Interactive Workbench**:
  - `src/ui/components/screens/wordprob.ts` mounted at `#wordprob` with schema action buttons, tape diagram comparison, and equation assembler.
- **Acceptance Tests**:
  - `tests/acceptance/020-which-operation.spec.ts` (18/18 passing across 360px and 390px mobile viewports).
- **Verification**:
  - All 11 sensors running via `verify.py`.

