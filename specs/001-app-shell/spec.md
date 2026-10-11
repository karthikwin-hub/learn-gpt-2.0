# Feature Specification: 001 App shell, language switching and fonts

**Feature ID**: 001  
**Product**: Gurukul (Learn GPT 2.0)  
**References**:
- [docs/product/CONCEPT.md](../../docs/product/CONCEPT.md)
- [docs/product/EXPERIENCE.md](../../docs/product/EXPERIENCE.md)
- [docs/product/CURRICULUM_PHASE2.md](../../docs/product/CURRICULUM_PHASE2.md)
- [docs/product/DEV_HANDOFF.md](../../docs/product/DEV_HANDOFF.md)
- Prototype routes: `#opening`, `#language`, `#home` (Ashram), `#shala?s=ganita`, `#shala?s=vijnana`, `#shala?s=loka`, `#jaal`

---

## 1. Why and Who
A child aged about 10 in India, often accessing the app on a shared, low-cost Android phone, sometimes offline, who learns best in their home language (English, Hindi, Telugu, Bengali, Tamil).

The shell must be calm, tactile, instantly responsive, readable across Indic scripts, and embody the complete Gurukul worldview: learning across mathematics (Ganita), science (Vijnana), and social studies (Loka), interconnected by thematic crossings (Jaal).

---

## 2. User Stories

### US1 (P1) First run experience
As a child opening Gurukul for the first time,  
I want to see a serene opening animation (unbroken kolam line) and choose my home language from native-script cards,  
So that I feel welcomed in my own language and arrive at the Ashram without complex onboarding.

### US2 (P1) Zero-loss language switching anywhere
As a child or parent using the app,  
I want to switch language at any moment from any screen using the topbar language button,  
So that the entire interface, including the current screen's state, re-renders in the chosen language without losing my place.

### US3 (P1) The Ashram (Home)
As a child entering Gurukul,  
I want to land in the calm courtyard of the Ashram under the banyan tree,  
So that I can see the three Shalas (Ganita, Vijnana, Loka), resume where I left off, practice retrieval ("Remember this?"), and navigate to the cross-subject Jaal.

### US4 (P2) Ganita Shala (Mathematics Loom)
As a child exploring mathematics,  
I want to view all 8 threads of Ganita (Numbers, Operations, Factors, Geometry, Measurement, Data, Patterns, Logic & Sets),  
So that I can see the 42 knots, start at recommended knots, and see unbuilt knots marked calmly as coming soon.

### US5 (P2) Vijnana Shala (Science Loom)
As a child exploring science,  
I want to view all 6 threads of Vijnana (Human Body, Living World, Materials, Light & Shadows, Measurement, Forces),  
So that I can see the 14 knots and see cross-subject links marked with "also in".

### US6 (P2) Loka Shala (Social Studies Loom)
As a child exploring the human world,  
I want to view all 4 threads of Loka (History, Civics, Geography, Heritage & Society),  
So that I can see the 18 knots and understand how human society, time, and the Earth connect.

### US7 (P2) Jaal (Cross-Subject Web)
As a child discovering how knowledge connects,  
I want to explore the Jaal screen showing Ganita, Vijnana, and Loka linked by curved threads,  
So that I can discover the 10 cross-subject connections (e.g., shadows as clocks, maps as scale grids, timelines as number lines) and navigate directly to either subject's knot.

### US8 (P2) Privacy & offline capability
As a family sharing a phone with intermittent internet connectivity,  
I want the app to function offline and never collect personal data or telemetry,  
So that the child's learning is private, safe, and always available.

### US9 (P3) Night colours
As a grown-up or child learning in the evening,  
I want to toggle a night palette with comfortable contrast,  
So that screen glare is minimized in dim lighting.

---

## 3. Acceptance Scenarios

### US1: First Run
- **US1-AS1**: Given a first launch with no saved language preference, When the app opens, Then the opening screen is shown with an option to skip/begin, followed by the language selection screen displaying 5 language cards each in its native script (English, हिन्दी, తెలుగు, বাংলা, தமிழ்).
- **US1-AS2**: Given the language selection screen, When the child selects a language (e.g., Tamil) and taps Continue, Then the Ashram home appears in Tamil and the preference is stored in local storage under `gurukul:lang`.
- **US1-AS3**: Given a returning child who has previously chosen a language, When the app opens, Then it skips the opening and language picker and directly opens the Ashram in their chosen language.

### US2: Language Switching
- **US2-AS1**: Given any screen (Ashram, Shala, or Jaal) with user state, When the user taps the topbar language button and chooses another language (e.g., Hindi), Then every label updates to Hindi and the state is preserved in place.
- **US2-AS2**: Given any screen in a non-English language, When a translation key is missing in that language, Then the English text is displayed as fallback and a development-only warning is logged.

### US3: The Ashram
- **US3-AS1**: Given the Ashram screen, When rendered, Then it displays the banyan tree line art, cards for Ganita, Vijnana, and Loka with their thread counts and explored thumbnail counts, and buttons to open Jaal and the notebook.
- **US3-AS2**: Given a child with a saved in-progress knot, When viewing the Ashram, Then a Continue card appears showing the knot name, and tapping it navigates directly to that knot.
- **US3-AS3**: Given saved sutras in storage, When viewing the Ashram, Then a "Remember this?" retrieval card asks the child to recall the sutra before revealing it.

### US4: Ganita Shala
- **US4-AS1**: Given the Ganita Shala (`#shala?s=ganita`), When viewed, Then all 8 threads (`sankhya`, `ganana`, `guna`, `rekha`, `mana`, `ankana`, `krama`, `tarka`) render with their 42 knots.
- **US4-AS2**: Given any knot on the Shala, When an unbuilt knot (e.g., N2) is tapped, Then a calm toast displays `home.notInProto` ("Coming soon") without error.

### US5: Vijnana Shala
- **US5-AS1**: Given the Vijnana Shala (`#shala?s=vijnana`), When viewed, Then all 6 threads (`sharira`, `jiva`, `padartha`, `prakasha`, `mapana`, `bala`) render with their 14 knots.
- **US5-AS2**: Given knots linked to other subjects (e.g., R1), When rendered, Then an "also in" tag indicates the crossing subject.

### US6: Loka Shala
- **US6-AS1**: Given the Loka Shala (`#shala?s=loka`), When viewed, Then all 4 threads (`itihasa`, `nagarika`, `bhugola`, `bharata`) render with their 18 knots.

### US7: Jaal
- **US7-AS1**: Given the Jaal screen (`#jaal`), When viewed, Then a triangular SVG diagram connects Ganita, Vijnana, and Loka with 10 curved links.
- **US7-AS2**: Given a selected Jaal link (e.g., `shadowClock`), When tapped, Then the link detail card displays its explanation sentence and buttons to open both connected knots (R1 and E1).

### US8: Offline & Privacy
- **US8-AS1**: Given the app has loaded once, When device network connectivity is disconnected, Then all shell screens and Shalas remain fully functional.
- **US8-AS2**: Given any interaction with the app, When browser local storage is inspected, Then all keys use the `gurukul:` prefix and contain no personal identifiable information (no name, age, phone, location, email, device ID, or analytics).

### US9: Night Theme
- **US9-AS1**: Given the topbar theme toggle, When night mode is enabled, Then dark background tokens are applied and contrast ratios meet or exceed WCAG AA standards.
