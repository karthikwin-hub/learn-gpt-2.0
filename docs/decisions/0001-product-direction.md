# ADR-0001: Product direction for Sutra (Learn GPT 2.0)

- **Status**: Proposed
- **Date**: 2026-10-11 · **Deciders**: product owner (to accept) · **Related**: docs/product/CONCEPT.md, docs/product/SPECKIT_HANDOFF.md

## Context
The first Learn GPT app was rejected: parents did not find it useful and children found it uninteresting and complex (docs/product/RESEARCH.md §1). The replacement is for 10-year-olds in India, starting with maths (geometry, sets, multiplication, division, logic) in English, Hindi, Telugu, Bengali and Tamil. It must be free, calm, and deep enough that children actually learn.

Forces:
- Research for this age favours brief prediction, then explicit teaching with fading worked examples, self-explanation, retrieval and interleaving (RESEARCH.md §3 to §5).
- Animation helps only when it is segmented, learner-paced and tied to a model the child can act on (RESEARCH.md §4).
- Many children use a shared, low-cost Android phone, often with weak or no data (RESEARCH.md §8).
- The constitution requires active manipulatives over decoration, first-class multilingual support, and child privacy by default.

## Options considered
1. **Gamified practice app** (points, streaks, mascot, levels): familiar and cheap to build; but it is what failed before, rewards speed over understanding, and parents distrust it. Costly to reverse once children expect rewards.
2. **Video lessons plus quizzes**: easy to produce; but passive, large downloads on poor networks, and each language needs re-recorded video. Medium cost to reverse.
3. **Calm microworld with Living Films and manipulatives** (Sutra): every idea drawn by one thread the child can hold; films are scenes computed from data, so they scrub, pause into a live model, and translate by swapping text. Higher design effort per concept.
4. **Do nothing / repair the first app**: rejected by both audiences; its structure is the problem.

## Decision
We choose **option 3, the calm microworld**, with these commitments:
- **Phone first**, portrait, 360 px upwards; adapt up to tablets and desktop, not down.
- **No game mechanics and no mascot**: no points, stars, streaks, badges, leaderboards, timers or praise. Progress is a notebook of the child's own sentences and pictures of their models.
- **Living Films instead of video files**: films are code-and-data scenes with narration keys, segmented into beats, scrubbable, and pausable into the model itself.
- **The prototype in `design/prototype/` is a reference to re-implement, not code to copy into `src/`**. Production code follows docs/ARCHITECTURE.md; only the pure maths in `js/model/` and the string keys are candidates to port, with tests.
- **No accounts and no telemetry**; everything is stored on the device.
- **No generative AI for children in phase 1** (open for review; see SPECKIT_HANDOFF.md §4).

## Consequences
- Positive: one reusable lesson engine (feature 002) carries every concept; films cost little bandwidth and translate cheaply; nothing about the child leaves the phone; parents see learning, not screen time.
- Negative / risks and mitigations:
  - A calm app may read as boring to some children. Mitigation: test with about 5 children per language before feature 003 and measure understanding, not engagement.
  - Each concept needs careful design (film beats, manipulative, misconception). Mitigation: CURRICULUM.md specifies all 21 threads up front; the engine keeps per-thread work to data and one manipulative.
  - Indic translations are drafts. Mitigation: native-teacher review before any child sees them.
  - Device text-to-speech in Indic languages is uneven. Mitigation: recorded human narration is recommended.
- Follow-ups: product owner accepts or amends this ADR; decide the name, the AI question and narration voices (SPECKIT_HANDOFF.md §4); add a banned-feedback-words check per language when feature 002 lands.
