# Research synthesis: what the evidence tells us to build

> Status: draft for product review · Date: 2026-10-11 · Inputs: `context/Visual Math Learning Platform.pdf` (the "context PDF"), a review of the failed v1 app at `../learn-gpt`, and new desk research listed in [Sources](#sources).
>
> Every finding is written as **claim → source → what we do because of it**. Where the evidence is weak, mixed, or comes from adults rather than children, we say so. Treat those items as hypotheses to test with children, not as settled facts.

---

## 1. Why the first app failed

| What v1 did | Why it hurt learning | Evidence |
|---|---|---|
| One app for ages 3–15 across nine subjects ("Tiny Tots", "Junior", "Scholar") | Children's abilities change sharply every two years; one interface for all of them suits none of them | NN/g recommends designing for narrow bands, at minimum 3–5, 6–8 and 9–12 [S9][S10] |
| Streaks, XP, badges, a mascot ("Sparky"), confetti, pentatonic success chimes, unlockable themes | Extrinsic rewards move motivation from curiosity to collecting rewards, and decorative extras pull attention away from the idea | Context PDF §"Deconstructing Extrinsic Gamification"; Mayer's coherence principle (d = 0.70) [S1] |
| Maths explained through AI-written text and labelled pictures (`src/pages/Diagrams.tsx` places hotspots over images) | A picture you cannot change cannot show *why*. Children read a fact; they never test it | Context PDF §"Cognitive Load Theory": passive media lacks germane load |
| An AI chat box ("Ask Sparky anything") | A blank prompt asks a 10-year-old to know what they don't know. It also brings privacy, accuracy and moderation risk | v1's own BRD lists "Passive Prompt Mentality: blank search bars confuse children" |
| Feedback document is a copy of the requirements document | No real observation of children was recorded, so nobody knew where they got lost | `../learn-gpt/docs/review/Learn GPT_feedback.docx` |

**Consequence:** v2 is for **one age band (about 9–11, centred on Grade 5)**, **one subject (mathematics)**, uses **no extrinsic game mechanics**, and puts a **manipulable model at the centre of every screen**. We test with real children before building past the first domain.

---

## 2. How 10-year-olds think

**C1. Ten-year-olds can reason logically about things they can see and handle, and struggle when symbols arrive with nothing concrete behind them.**
Source: Piaget's concrete operational stage (reversibility, decentration, conservation) as summarised in the context PDF.
→ Every symbol in the app appears *attached to* an object the child is manipulating. The equation is a live readout of the model, never a separate exercise.

**C2. Concrete, pictorial and symbolic forms work best shown together, not as a one-way staircase.**
Source: Bruner's enactive/iconic/symbolic modes; Concrete-Pictorial-Abstract (CPA) practice (context PDF §"Representational Interlacing").
→ Each workbench shows three linked panes: the object (tiles, laddoos, rope), a picture form (bar, number line, grid), and the written form. Dragging any one updates the other two.

**C3. A concept shown in only one form gets confused with that form.** If multiplication is only ever "rows of dots", children cannot recognise it as area or scaling.
Source: Dienes' perceptual variability principle; Skemp's relational versus instrumental understanding (context PDF).
→ Every concept has **at least three "lenses"** (for multiplication: equal groups, area, and jumps on a number line). The curriculum names them for every thread.

**C4. Children who can run backwards through a change understand it more deeply.**
Source: reversibility (context PDF).
→ Every transformation is reversible by dragging back, and the Living Film scrubber runs both ways. Division is introduced as the same rectangle as multiplication with one side hidden.

---

## 3. Instruction order: teach first, but let them predict

**C5. For older students, struggling with a problem *before* instruction improves conceptual understanding and transfer.** A meta-analysis of 53 studies (166 comparisons) found g = 0.36, rising to 0.37–0.58 when done faithfully.
Source: Sinha & Kapur 2021 [S4].

**C6. For children in grades 2–5 the effect reverses: instruction first worked better.** A study of 228 fifth graders found no benefit from delaying instruction.
Source: Sinha & Kapur 2021 (age moderator) [S4]; a boundary-conditions study with fifth graders [S5].
→ We do **not** build open-ended "discover it yourself" lessons for this age. Each thread opens with a **very short Wonder** (under one minute) in which the child commits to a prediction. That activates prior knowledge and creates a question in their mind. The **Living Film then teaches directly**, and the Workbench follows. The research PDF's pure-discovery microworld stance is moderated here on purpose.

**C7. Studying worked examples, including *incorrect* ones, and answering self-explanation prompts improves Grade 5 maths, with larger gains for lower-attaining children.** A year-long randomised study (n = 527) found transfer to algebra driven by conceptual understanding.
Source: Booth et al. / MathByExample [S6][S7].
→ Workbench steps fade from **fully worked → partly worked → independent**. Every thread includes **"Spot the mistake"**: a believable wrong solution to diagnose. Every thread ends with **"Explain it back"**.

---

## 4. Motion, animation and video

**C8. Fleeting animation overloads working memory; learners must hold earlier frames in their heads to make sense of later ones.**
Source: Sweller's transient information effect (context PDF §"Cognitive Load Theory"; Cambridge Handbook ch. 21).
→ No auto-playing video. Our **Living Films** are rendered live by the app, child-paced, scrubbable both ways, and leave **ghost outlines** of earlier states on screen.

**C9. Mayer's multimedia principles, with median effect sizes** [S1][S2]:

| Principle | d | How Sutra applies it |
|---|---|---|
| Temporal contiguity: narration at the same time as the graphic | 1.30 | Narration lines are bound to film beats, not a separate audio track |
| Redundancy: don't print what is being spoken | 0.87 | Key terms appear *on* the object, not as subtitles. Captions are on by default for now, because the prototype relies on device voices, which are unreliable in Indic languages; grown-ups can turn them off. Once recorded narration exists, test turning captions off by default while audio plays |
| Spatial contiguity: words next to the thing they describe | 0.79 | Labels sit on the edges of the shape and the parts of the equation, not in a legend |
| Personalization: conversational tone | 0.79 | Narration says "you" and "let's"; it never lectures |
| Voice: human voice beats machine voice | 0.74 | Final narration is recorded by human voice artists in each language. The prototype uses a synthetic voice as a stand-in only |
| Modality: spoken beats printed words alongside graphics | 0.72 | Explanations are spoken; on-screen text is minimal |
| Coherence: remove extraneous material | 0.70 | No background music, mascots, decorative illustration or celebration animation |
| Segmenting: learner-paced chunks | 0.70 | Films are 4–6 beats; the child taps to continue |
| Signaling: highlight what matters | 0.46 | The thread glows on the part being discussed; everything else dims |
| Pre-training: names before the explanation | 0.46 | The Wonder screen names the key objects ("this is one tile") before the film |
| Embodiment: a gesturing guide helps | 0.36 | A *hand*, not a character, demonstrates gestures (drag here, cut here) |

**Caveat:** Mayer notes these principles were established mainly with adults and adolescents and need testing with young children [S3]. A 2025 study of pauses in children's video suggests effects can depend on working-memory capacity [S8]. → We let the **child control pace** instead of imposing fixed pauses, and we include film pacing in the child-testing plan.

---

## 5. Memory: making it stick

**C10. Retrieval practice and spacing help maths learning, with small-to-medium effects that are clearer in controlled studies than in classrooms.** Mixing problem types (interleaving) adds about g = 0.34.
Source: Murray et al. 2025 meta-analysis [S11]; Brunmair & Richter 2019 cited therein.
**Counter-evidence:** a fourth-grade study found no reliable spacing or worked-example effect after eight weeks [S12].
→ A light **Return** step: when a child opens a new thread, the app first asks two short recall questions from *earlier, different* threads, illustrated with the child's own notebook drawing. It is cheap to build and low-risk, and we will not oversell it.

---

## 6. Motivation without game mechanics

**C11. Points, streaks, timers, leaderboards and scarcity are dark patterns for children. They raise anxiety and shift behaviour to guessing and gaming the system.**
Source: context PDF §"Dark Patterns"; arXiv 2506.23017 on deceptive design awareness in children.
→ Banned: points, streaks, badges, lives, timers, leaderboards, locked content, notifications that nag.

**C12. Intrinsic motivation comes from agency, visible competence and curiosity.**
Source: Papert's microworlds; Bret Victor's explorable explanations [S13]; Smart Interface Design Patterns on children [S9].
→ We motivate with: **(a)** a model that *responds*, so correctness is visible; **(b)** things the child *makes* that they keep in a **Notebook**; **(c)** genuinely puzzling Wonder questions; and **(d)** beauty, from kolam and rangoli symmetry to Indian rhythm cycles.

---

## 7. Designing for children aged 9–11

**C13. Interface guidance for children** [S9][S10][S14]:
- Target a narrow age band; don't patronise 10-year-olds with toddler visuals.
- Large tap targets (NN/g suggests about 2 cm; Smart Interface Design Patterns about 75 px); generous spacing; **avoid primary buttons at the very bottom edge**, which children hit by accident.
- Feedback on every action.
- Place tools **on the object** they act on, not in a distant toolbar.
- Pair icons with labels; keep reading level low.
- Children cannot tell ads from content, so have none.
- Parents are the toughest reviewers; design for them too.

→ Touch targets of at least 48 dp visually, with 56 dp hit areas on manipulative handles. Controls sit in the upper-middle "thumb arc". Text uses short sentences and roughly Grade 3 reading level in every language.

---

## 8. India-specific context

**C14. Most Indian children use a shared phone, usually their mother's.** 72% of children have smartphone access; 68% shared, 4% dedicated; the mother's phone in 48% of cases. Access rises from 67% in grades 1–5.
Source: Bharat Survey for EdTech 2025 [S15]; ASER 2024 [S16].
→ **Phone first, portrait, offline-first, small download, no account, no login.** Sessions are short (10–15 minutes) because the phone goes back to its owner. Must run smoothly on low-cost Android devices.

**C15. The national Grade 5 textbook is NCERT's *Maths Mela* (NCF-SE 2023).** Chapters include Angles as Turns, Shapes and Patterns, Symmetrical Designs, Grandmother's Quilt, The Dairy Farm, Coconut Farm, Animal Jumps, Data Through Pictures, and Fractions. Hindi edition: *Ganit Mela*.
Source: NCERT [S17].
→ The curriculum maps every thread to a *Maths Mela* chapter, so parents see school relevance. We go *deeper* than the textbook on each idea; we don't replace it.

**C16. Mother-tongue explanation plus a bridge to formal English terms supports learning (NEP 2020).**
Source: context PDF §"Bilingual Register Architecture".
→ **Three registers** on every key term: an everyday phrase in the child's language, the regional maths term (e.g. क्षेत्रफल, பரப்பளவு), and the English term with its symbol.

**C17. Indic scripts need specific typography:** taller line height (at least 1.6), no clipping of matras, Noto families, no hairline weights, and 15–35% longer strings than English.
Source: context PDF §"Typographic Engineering"; UX4G.
→ Flexible layouts only; no fixed-height text boxes; ellipses are never used for learning content; every screen is tested in all five languages.

**C18. Indian mathematics and design traditions offer authentic, beautiful contexts:**
- **Kolam**: dots (*pulli*) and a single continuous line around them. It maps directly to symmetry and graph theory (dots as vertices, Euler circuits), and teachers find it approachable once restructured as a "kolam map" [S18][S19].
- **Sulba Sutras**: altar geometry with rope (*sulba*) and pegs.
- **Lilavati** (Bhaskara II, c. 1150 CE): verse puzzles about bees, lotuses and peacocks, traditionally addressed to his daughter [S20].
- **Tala**: rhythm cycles in Indian music. Two cycles realign at their least common multiple.

→ These give Sutra its visual identity (one thread) and many of its Wonder questions. They are used respectfully and accurately, never as exotic decoration.

**C19. India's DPDP Act 2023 requires verifiable parental consent for processing children's data and bans tracking, behavioural monitoring and targeted advertising aimed at children.**
Source: context PDF §"Regulatory Compliance".
→ No accounts, no analytics SDKs, no telemetry. All progress stays on the device. Nothing in phase 1 needs consent because nothing is collected.

---

## 9. Learning in an age of AI: our position

AI can now produce an answer to almost any school maths question. What it cannot do is give a child an *intuition*: the felt sense of why 23 × 14 is four rectangles, or why a square fences the most ground. The skills that keep their value are reasoning, explaining, spotting a wrong argument, and transferring an idea to a new situation. So Sutra:

- trains **explanation** (Explain it back) and **error detection** (Spot the mistake) explicitly;
- uses **no generative AI with children in phase 1**: no chat, no generated lessons. Diagnostic hints are deterministic and authored, based on what the child's action reveals;
- leaves room for **authoring-time AI** (drafting translations or problem variants) that humans review before shipping. This is an open decision; see `SPECKIT_HANDOFF.md`.

---

## 10. What remains uncertain (test before scaling)

1. Whether Living Film pacing suits 10-year-olds, and how long each beat should be.
2. Whether three-register terms help or overload children in each language.
3. Whether Return recall questions are welcome or feel like a test.
4. Performance of physics-like manipulatives on the cheapest Android phones in use.
5. Whether parents value the Notebook and Grown-ups page more than "progress metrics".

---

## Sources

- **[S1]** Mayer, R. E. (2017). Using multimedia for e-learning. *J. Computer Assisted Learning*, 33. https://onlinelibrary.wiley.com/doi/10.1111/jcal.12197
- **[S2]** Mayer, R. E. (2021). Evidence-based principles for how to design effective instructional videos. *JARMAC*. https://www.sciencedirect.com/science/article/abs/pii/S2211368121000231
- **[S3]** Mayer, R. E. (2024). Commentary on multimedia principles for young children's screen learning. *JARMAC*. https://psycnet.apa.org/manuscript/2024-34881-001.pdf
- **[S4]** Sinha, T., & Kapur, M. (2021). When problem solving followed by instruction works: Evidence for productive failure. *Review of Educational Research*. https://journals.sagepub.com/doi/full/10.3102/00346543211019105
- **[S5]** Probing boundary conditions of Productive Failure with fifth graders (2019). https://pmc.ncbi.nlm.nih.gov/articles/PMC6435728/
- **[S6]** Improving 5th grade mathematics knowledge with worked examples and self-explanation prompts (2024). *J. Experimental Education*. https://www.tandfonline.com/doi/full/10.1080/00220973.2024.2306384
- **[S7]** Hallinen, Booth et al. Don't just do it, explain it: a 5th grade worked examples curriculum. ISLS. https://repository.isls.org/bitstream/1/782/1/436.pdf
- **[S8]** Pinelli, M., & Cojean, S. (2025). A working memory reversal effect on design principles? Evidence on pauses in video among children. *Education and Information Technologies*, 30(13), 18955–18973. https://doi.org/10.1007/s10639-025-13545-1
- **[S9]** Smart Interface Design Patterns: A practical guide to design for children. https://smart-interface-design-patterns.com/articles/design-guidelines-children/
- **[S10]** Nielsen Norman Group: Children's UX, usability issues in designing for young people. https://www.nngroup.com/articles/childrens-websites-usability-issues/
- **[S11]** Murray et al. (2025). Meta-analytic review of spacing and retrieval practice for mathematics learning. *Educational Psychology Review*. http://aidanhorner.org/papers/Murrayetal_EdPsychReview_2025.pdf
- **[S12]** Krauspe, J., Ebersbach, M., Ludwig, A., & Scharf, F. (2025). Do worked examples boost the spacing effect on lasting learning? *Learning and Instruction*, 97, 102103 (213 fourth graders, long multiplication). https://doi.org/10.1016/j.learninstruc.2025.102103
- **[S13]** Victor, B. (2011). Up and down the ladder of abstraction. https://worrydream.com/LadderOfAbstraction/
- **[S14]** O'Sullivan, S. (2025). On designing for children. https://shaneosullivan.wordpress.com/2025/07/28/on-designing-for-children/
- **[S15]** Central Square Foundation (2025). Bharat Survey for EdTech (BaSE). https://www.edtechbase.centralsquarefoundation.org/BaSE%20Report%202025.pdf
- **[S16]** ASER Centre (2025). Annual Status of Education Report 2024 (Rural), national findings. https://asercentre.org/aser-2024/ (PDF: https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf; the site files 2024 reports under a 2022 folder)
- **[S17]** NCERT (2025). *Maths Mela*, Grade 5. https://www.ncert.nic.in/textbook/pdf/eemm1ps.pdf
- **[S18]** Making kolam accessible through representational restructuration. Bridges 2026. https://archive.bridgesmathart.org/2026/bridges2026-545.pdf
- **[S19]** Bluebird newsletter 45: Kolam and circuits (AI Math Circles). https://aimathcircles.org/wp-content/uploads/2023/02/Bluebird-Newsletter-Issue-45_Kolam-and-Circuits.pdf
- **[S20]** Problems and solutions from Bhaskaracharya's Lilavati. https://r2.gauravtiwari.org/wp-content/uploads/2026/02/bhaskaracharyas-lilavati.pdf
- Context PDF: *Architecture of an Explorable Mathematics Microworld* (`context/Visual Math Learning Platform.pdf`), including its citations on Piaget, Bruner, Dienes, Skemp, Sweller, Mayer, Papert, Turing Tumble, Noto/UX4G typography, NEP 2020 and the DPDP Act 2023.
