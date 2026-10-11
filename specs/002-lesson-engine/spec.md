# Feature Specification: 002 Lesson engine, Bodha cards and Living Film player

**Feature**: `specs/002-lesson-engine`  
**Status**: Draft (Ready for Gate G1 review)  
**Authors**: Antigravity, Puja  
**Baseline Prototype**: `design/prototype/` (`#wonder`, `#bodha?k=M2`, `#film`, `#rect`, `#mistake`, `#explain`, `#stop`)  

---

## 1. Problem & Product Intent

In Gurukul (Learn GPT 2.0), children do not learn through rote memorisation, punitive quizzes, or endless gamification loops. Research for 10-year-olds favors:
1. **Prediction** (brief question that sparks curiosity without penalty).
2. **Explicit Understanding** (learner-paced Bodha cards with concrete visual models, worked examples whose scaffolding fades, and contextual Indian connections).
3. **Living Film** (dynamic, pauseable, interactive visual demonstration where children can manipulate the model while paused).
4. **Deliberate Practice** (workbench with linked representations between physical model and symbolic math).
5. **Metacognitive Reflection** (spotting a common misconception and explaining the idea in their own words).
6. **Calm Conclusion** (a natural stopping place and memorable sutra to keep).

Every concept thread runs this identical 7-stage pedagogical rhythm so children learn the routine once and spend their attention purely on mathematical and scientific concepts.

---

## 2. User Stories & Acceptance Scenarios

### Story US1 (P1): Universal 7-Stage Thread Flow
As a 10-year-old child,  
I want to navigate through a structured lesson (Prashna $\to$ Bodha $\to$ Film $\to$ Workbench $\to$ Mistake $\to$ Explain $\to$ Stop),  
So that I experience predictable, calm pedagogical progression from intuition to mastery.

- **US1-AS1 (Carry On State Retention)**:  
  Given a child is mid-thread at the workbench (`rect`),  
  When they navigate back to the Ashram or Shala,  
  Then the Continue card on the Ashram offers "carry on" returning them directly to the workbench with their model state intact.

- **US1-AS2 (Linear Progression without Film)**:  
  Given a knot without a Living Film,  
  When the child finishes the Bodha sutra card,  
  Then the flow transitions directly to the Workbench (`rect`).

- **US1-AS3 (Linear Progression with Film)**:  
  Given a knot with a Living Film (e.g. `M2`),  
  When the child finishes the Bodha sutra card,  
  Then the flow transitions to the Living Film player (`film`).

---

### Story US2 (P1): Living Film Player
As a child watching a dynamic concept demonstration,  
I want a player that pauses between short beats, lets me scrub in both directions, and allows me to drag the model while paused,  
So that I control the pace of learning and see how the model behaves at any instant.

- **US2-AS1 (Beat Pause)**:  
  Given a playing film,  
  When a narrative beat finishes,  
  Then playback pauses automatically and the beat's caption remains visible until the child taps Play.

- **US2-AS2 (Interactive Exploration During Pause)**:  
  Given a paused film after the model has appeared,  
  When the child drags the model's handle,  
  Then the active scene displays the child's modified model, while the scripted state remains visible as a faint outline (ghost).

- **US2-AS3 (Bidirectional Scrubber)**:  
  Given a film,  
  When the child drags the scrubber backward or forward,  
  Then the scene and model state update in real time to match that exact timestamp.

- **US2-AS4 (Reduced Motion Cut Mode)**:  
  Given `prefers-reduced-motion` is active or enabled,  
  When a film plays,  
  Then continuous smooth animations are replaced by clean step cuts between beat end states.

---

### Story US3 (P1): Narration, Captions & Sound Control
As a child learning in noisy environments or with sound muted,  
I want every spoken prompt and film line to be captioned in my language, with audio speed control,  
So that I never miss an explanation regardless of device audio status.

- **US3-AS1 (Muted Captions Parity)**:  
  Given sound is turned off,  
  When a film or lesson stage plays,  
  Then every spoken line is visible as a caption in the child's chosen language.

- **US3-AS2 (Speech Rate Toggle)**:  
  Given narration is active,  
  When the child switches between normal and slower speech mode,  
  Then the playback rate adjusts accordingly without audio distortion.

---

### Story US4 (P2): Workbench Linked Representations & Step Fading
As a learner on the workbench,  
I want the physical manipulative, the symbolic equation, and any secondary views to update simultaneously in the same frame,  
So that I connect physical actions to mathematical rules without cognitive overload.

- **US4-AS1 (Simultaneous Representation Update)**:  
  Given the Rubber Rectangle workbench (`rect`),  
  When the child resizes the grid by dragging a handle, stepping with buttons, or pressing arrow keys,  
  Then the visual grid, the row/column counts, and the multiplication product update in the exact same render frame.

- **US4-AS2 (Scaffold Fading)**:  
  Given workbench steps,  
  When moving from step 1 to later steps,  
  Then assistive visual guides fade progressively from guided demonstration ("watch me") to independent exploration ("your turn").

---

### Story US5 (P2): Calm Pedagogical Feedback & Zero Gamification
As a child learning without stress,  
I want feedback that describes concrete reality rather than praising, scoring, or judging me,  
So that I build intrinsic curiosity and resilience.

- **US5-AS1 (Descriptive Reality Feedback)**:  
  Given any child interaction or answer,  
  When feedback is displayed,  
  Then it describes what happened (e.g. "That makes 24 tiles") and contains zero praise words ("great", "good job", "smart"), points, stars, streaks, or timer pressure.

- **US5-AS2 (Non-Punitive Color Invariant)**:  
  Given an incorrect selection or unexpected input,  
  When feedback is shown,  
  Then red is never used to signal error or failure; kumkum red is reserved strictly for focal indicators ("look here").

---

### Story US6 (P1): Bodha Cards Engine & Glossary Bridge
As a child beginning a new knot,  
I want 5 to 6 concise, visual cards with step-by-step worked examples, cultural context, and bilingual glossary links,  
So that I understand the core idea deeply before attempting the workbench.

- **US6-AS1 (Prashna to Bodha Gate)**:  
  Given a Prashna answered with any prediction choice,  
  When the child taps Continue,  
  Then the first Bodha card for that knot opens before any film or workbench.

- **US6-AS2 (Step-by-Step Worked Example Reveal)**:  
  Given the worked example card,  
  When the child taps Next Step,  
  Then exactly one incremental step is revealed and read aloud, and Continue is only highlighted after all steps are displayed.

- **US6-AS3 (Bilingual Glossary Bridge Card)**:  
  Given a Bodha card containing a tagged key term (e.g. `[[area|क्षेत्रफल]]`),  
  When the child taps the term,  
  Then a glossary bridge card opens showing the everyday explanation in the current Indic language, the English school term, and audio pronunciation.

- **US6-AS4 (In-Workbench Bodha Recall)**:  
  Given the child is active on the workbench,  
  When they tap "What am I learning?",  
  Then that knot's Bodha cards open for reference, and Back returns to the workbench with model state intact.

- **US6-AS5 (Sutra Retention)**:  
  Given the final sutra card of Bodha,  
  When the child taps "Keep this sutra",  
  Then the sutra is saved in persistent storage under `gurukul:sutras` in the child's current language.

---

## 3. Non-Functional Requirements
- **Performance**: Living Film and workbench run at 60 fps on low-end Android mobile devices (360×740 viewport).
- **Data-Driven Decoupling**: Film scripts and Bodha cards are pure data structures; translators and curriculum designers edit string dictionaries and scene timing configs without touching rendering code.
- **Accessibility**: All interactive elements (steppers, handles, cards) support keyboard navigation (`Tab`, arrows, `Enter`, `Space`) with visible high-contrast focus rings and zero axe-core violations.
