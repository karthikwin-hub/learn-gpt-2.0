# Feature Specification: 034 Time: 24-Hour Clock & Duration (Railway Time) (Knot U3)

<!-- Spec Kit standard. Status: Draft (Ready for Review) · Priority: P1 · Lane: Feature · Branch: feat/034-time-duration -->

## 1. Problem & Pedagogical Intent

### 1.1 The Mathematical Challenge for 10-Year-Olds
In Class 5 Mathematics (Mana strand), children explore **Time: 24-Hour Clock & Duration (Railway Time)**.
Children routinely encounter the core conceptual trap:
> **Core Misconception**: Treating time as base 10 (e.g. 10:45 + 0:30 = 10:75; or 2 hours 45 min = 2.45 hours).

### 1.2 Pedagogical Solution in Gurukul
Feature 034 delivers a tactile 7-stage learning journey for Knot **U3 (Time: 24-Hour Clock & Duration (Railway Time))**:
- **Prashna (Opening Wonder)**: A train ticket shows departure at 21:30. In 12-hour clock time, when does the train leave?
  - Options:
  - A) 9:30 in the morning (AM)
  - B) 9:30 at night (PM)
  - C) 11:30 at night
  - Correct: Choice B.
- **Bodha (6 Structured Cards)**:
1. **What (`what`)**: The 24-hour clock counts straight from 00:00 at midnight through 23:59, eliminating AM and PM mistakes.
2. **Idea (`idea`)**: For times past noon (12:00), subtract 12 to find the PM time: 15:00 is 3 PM, 21:30 is 9:30 PM.
3. **Why (`why`)**: Time rolls in 60s, not 100s! When minutes reach 60, they roll into 1 full hour.
4. **Example (`example`)**: Calculate duration from 09:45 to 12:15: Step 1: Bridge to 10:00 (15 min). Step 2: 10:00 to 12:00 (2 hours). Step 3: 12:00 to 12:15 (15 min). Total = 2 hours 30 min.
5. **Where (`where`)**: Railway timetables, flight boarding passes, digital watches, hospital charts, and sundials.
6. **Sutra (`sutra`)**: Time rolls in 60s, not 100s; the 24-hour clock counts straight through the day.
- **Interactive Workbench (`#timeclock`)**:
  - Concentric dual clock dial (inner 12-hour dial, outer 24-hour dial). Interactive hour and minute hands. Timeline bridge ribbon allowing child to hop to nearest hour then accumulate total elapsed duration.
- **Spot the Mistake**:
  - Learner: Rohan.
  - Claim: Calculates 14:50 + 25 minutes by adding digits to get 14:75.
  - Error: Step 2 (treating minutes as base 10 instead of base 60).
  - Kumkum Focus: The invalid minutes ':75' highlighted in kumkum with base-60 roll reminder.
  - Correction: Minutes reset at 60. 50 min + 10 min = 60 min (rolls to 15:00); remaining 15 min gives 15:15.
- **Explain Back (Word-Tile Cloze)**:
  - Cloze 1: "One hour contains ___ minutes, not one hundred." (Tiles: ['sixty', 'twenty-four', 'hundred'], expected: `sixty`).
  - Cloze 2: "In 24-hour railway time, eight o'clock in the evening is written as ___." (Tiles: ['20:00', '08:00', '18:00'], expected: `20:00`).
- **Pothi (Notebook)**: Sutra permanently stamped: *"Time rolls in 60s, not 100s; the 24-hour clock counts straight through the day."*

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Shala Loom Discovery
- **US1-AS1**: Knot `U3` on the `mana` thread appears as an active playable knot and navigates to `/#/prashna?k=U3`.

### Story US2 (P1): Prashna Wonder & Bodha Concept Cards
- **US2-AS1**: Prashna poses "A train ticket shows departure at 21:30. In 12-hour clock time, when does the train leave?" and accepts choice "B".
- **US2-AS2**: Bodha renders all 6 structured cards with worked examples and stamps the Sutra.

### Story US3 (P1): Interactive Manipulative Workbench (`#timeclock`)
- **US3-AS1**: Workbench operates with reversible touch and keyboard-operable controls.
- **US3-AS2**: Explores core concept: A day has 24 hours. The 24-hour railway clock counts from 00:00 to 23:59 without AM/PM ambiguity. Elapsed time rolls in groups of 60 minutes, not base 10 (1 hour = 60 minutes). Bridging through whole hours avoids calculation errors.
- **US3-AS3**: Maintains calm aesthetics with zero timers, scores, or gamification traps.

### Story US4 (P1): Spot the Mistake & Explain Back
- **US4-AS1**: Spot the mistake highlights Rohan's error in Kumkum (`--kumkum`) without punitive sounds.
- **US4-AS2**: Explain back validates synthesis tiles `sixty` and `20:00`.

### Story US5 (P1): Responsive Mobile Viewports & Accessibility
- **US5-AS1**: Tested on 360px and 390px mobile viewports with all touch targets $\ge 44$px.
