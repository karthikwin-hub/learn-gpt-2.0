# Sutra: product concept

> Working name: **Sutra** (see [name options](#9-name-options)) · Product: Learn GPT 2.0 · Phase 1: mathematics for 10-year-olds · Status: draft for product review (2026-10-11)
>
> Companion documents: [RESEARCH.md](RESEARCH.md) (evidence) · [EXPERIENCE.md](EXPERIENCE.md) (screens, motion, visual system) · [CURRICULUM.md](CURRICULUM.md) (what is taught) · [SPECKIT_HANDOFF.md](SPECKIT_HANDOFF.md) (how to build it) · prototype: [`design/prototype/index.html`](../../design/prototype/index.html)

---

## 1. One line

**Every idea is something you can hold.**

Sutra is a free, calm, phone-first maths companion for 10-year-olds. Each concept is a living model the child holds, stretches, cuts and turns, and the maths appears as the model changes. No points, no mascot, no noise: only the idea, made tangible and beautiful, in the child's own language.

## 2. The problem

Children today can get any answer from a machine in a second. What they can't get from a machine is **intuition**: a felt understanding of *why* 23 × 14 = 322, *why* a square fences the most ground, *why* "A and B" is stricter than "A or B".

Most maths apps for children fall into one of two traps:

1. **Game skins**: points, streaks and cartoon rewards wrapped around drill. Children chase the reward and not the idea, and parents see a game.
2. **Pictures of explanations**: a diagram, a short animation or a paragraph of text. The child watches; nothing they do changes anything. Understanding stays shallow.

Learn GPT v1 fell into both. Parents rejected it as not useful, and children found it uninteresting and complicated after a while. [RESEARCH.md §1](RESEARCH.md#1-why-the-first-app-failed) has the detailed failure analysis.

## 3. Who it is for

| | |
|---|---|
| **Primary: the child, about 9–11 (Grade 5)** | Can reason about things they can see; struggles when symbols arrive with nothing behind them. Uses a parent's phone for 10–20 minutes at a time. May think best in Telugu, Hindi, Bengali or Tamil, while school uses English terms. |
| **Secondary: the parent** | Wants something that genuinely helps, is not a game, is safe and free, and doesn't need setting up. Decides in about 30 seconds whether to hand over the phone. |
| **Tertiary: the teacher** (later phase) | May project a manipulative in class. Not designed for in phase 1, but nothing in phase 1 should prevent it. |

Personas used in design reviews:

- **Meera, 10, Vijayawada.** Uses her mother's phone after school. Thinks in Telugu, learns maths terms in English at school. Quick with mental sums, lost on fractions and area.
- **Arjun, 10, Kolkata.** English-medium school; grandmother helps with homework in Bengali. Loves drawing, dislikes timed tests.
- **Sunita, Meera's mother.** Uninstalled two "learning games" that kept sending notifications. Will keep an app that she can see is teaching.

## 4. The big idea: one thread

A single glowing **thread** draws everything in Sutra. It is the edge of a shape, the grid line of a multiplication field, the rope ring of a Venn diagram, the track of a marble logic machine. The child pulls it, and the maths changes.

The thread is rooted in Indian mathematical tradition:

- **Sulba Sutras** (c. 800–200 BCE). Altar geometry made with *sulba*, meaning rope, and pegs. Our geometry is literally rope and pegs.
- **Kolam**. Dots (*pulli*) with one continuous line woven around them, drawn at thresholds every morning across South India. Symmetry and graph theory, as daily art.
- **Lilavati** (Bhaskara II, c. 1150 CE). Maths written as verse puzzles about bees, lotuses and peacocks, traditionally addressed to his daughter.
- **Sutra** itself means both *thread* and *a short rule that holds a big idea*. Every thread a child completes ends with them writing their own sutra: one sentence, in their own words.

The thread gives the app a **single, unmistakable visual signature**. Every screen is the same paper, ink and thread, so the identity comes from the maths and not from decoration.

## 5. Principles

1. **Hold, then name.** Every symbol grows out of an object the child is manipulating. The equation is the *shadow* of the model, updated live.
2. **One idea, many faces.** Every concept appears in at least three linked representations (lenses). Change one, and the others follow.
3. **Teach clearly, after a moment of wonder.** A short prediction first, then direct, beautiful explanation, then hands-on building. For this age, teaching first beats pure discovery ([RESEARCH C6](RESEARCH.md#3-instruction-order-teach-first-but-let-them-predict)).
4. **Motion you can hold.** Explanations are Living Films: child-paced, scrubbable, and grabbable at any frame, leaving ghost traces of what came before.
5. **The model tells the truth.** Correctness is visible: the rectangle closes, the share comes out even, the marble lands in the right basin. No "Great job!", no stars, no chimes.
6. **Mistakes are material.** Every thread includes a believable wrong answer to diagnose. Wrong moves get a gentle, specific hint about the idea, never a red cross.
7. **Your language, and a bridge.** Five languages, switchable instantly mid-lesson. Each key term is given as an everyday phrase, the regional maths term, and the English term with its symbol.
8. **Respect the child's time.** Sessions of 10–15 minutes ending at a natural stopping point. No feeds, no notifications, no streaks.
9. **Private by construction.** No accounts, no analytics, no ads, no network calls needed to learn. Everything lives on the device.
10. **Beauty is not decoration.** The wow comes from the mathematics: symmetry blooming from one stroke, two rhythms meeting, a rectangle that folds into the written column method.

## 6. Signature moments

Each of these is designed to make an adult stop and say "oh". Each is also a complete lesson, not a trick.

| Moment | What the child does | What they understand |
|---|---|---|
| **The opening thread** | Watches one line of light weave a kolam around five dots, then unravel into the home map | "This is a place of patterns." Sets the tone in 4 seconds |
| **Living Film: the tiled courtyard** | Scrubs a narrated film where a courtyard floor fills with tiles, rows become groups, groups become area, and area becomes 6 × 4 | Multiplication *is* area, not just repeated adding |
| **Rubber Rectangle** | Drags a corner to 23 × 14, slices it with the thread at the tens, and watches the four pieces fold into the written column method | Why long multiplication works (the distributive law), seen rather than told |
| **Rope and Pegs** | Stretches a 24-unit rope over four pegs into thin and fat rectangles | Perimeter stays the same while area changes; the square encloses the most |
| **Kolam Mirror** | Draws one stroke; it blooms into 2-, 4- or 8-fold symmetry. Toggles mirror or rotation | The difference between reflection and rotation symmetry, made gorgeous |
| **Two Drummers** | Sets two tala cycles (3 and 4 beats) and hears where they clap together | Common multiples and LCM as rhythm |
| **Fair Share Table** | Deals 14 laddoos onto 4 plates; the leftover 2 stay on the table, then get cut in half | Division, remainders, and the doorway to fractions |
| **Sorting Courtyard** | Drops rope rings with rules ("red", "round") and watches objects walk to their regions | Sets, overlap (and), union (or), and outside (not) |
| **Which rules made this?** | Sees a finished sort and has to guess the hidden rules | Reasoning backwards from evidence |
| **Marble Machine** | Places AND, OR and NOT gates, drops marbles, and watches a truth table write itself, one row per try | Logic as visible cause and effect |

## 7. The shape of a session

One **thread** is one concept, about 10–15 minutes:

1. **Wonder** (under a minute). A striking question; the child commits to a guess. *"How many tiles cover this courtyard? Guess before you count."*
2. **Living Film** (3–4 minutes). Narrated, 4–6 beats, child-paced, grabbable.
3. **Workbench** (4–6 minutes). The manipulative, with steps that fade from fully worked to independent.
4. **Spot the mistake**. A believable wrong solution to fix.
5. **Explain it back**. The child builds a sentence, or records one in their own words, to keep.
6. **Notebook**. Their model and their sentence are saved as a page they can revisit.
7. **A good place to stop**. A calm close that names what they now know.
8. **Return** (next session). Two quick recalls from earlier, different threads, shown with the child's own drawings.

## 8. What we will not do

- No points, coins, XP, stars, badges, streaks, lives, levels to unlock, or leaderboards.
- No mascot or cartoon character. A demonstrating *hand* is the only guide.
- No confetti, success chimes or "Awesome!" pop-ups.
- No timers or speed rounds.
- No push notifications.
- No chatbot, and no AI-generated content shown to children in phase 1.
- No accounts, logins, analytics, ads or third-party trackers.
- No subjects beyond maths in phase 1, and no ages outside about 9–11.
- No video files: every explanation is a live, grabbable scene.
- No truncated text, and no layouts that only work in English.

## 9. Name options

| Name | Meaning | For | Against |
|---|---|---|---|
| **Sutra** (recommended) | Thread; a short rule | Ties the visual identity, the Indian tradition and the "write your own rule" ending together | Can carry religious or other connotations for some audiences; check trademark |
| **Pulli** | The dots of a kolam | Warm, unique, and the starting point of every pattern | Tamil-specific; less obvious in the north |
| **Dhaaga** | Thread (Hindi/Urdu) | Plain and friendly | Hindi-specific |
| **Rekha** | Line | Pan-Indian, simple | Common personal name |
| **Learn GPT 2.0** | Existing brand | Continuity | Suggests an AI chatbot, which this deliberately is not |

The decision is open; see `SPECKIT_HANDOFF.md`. All documents use "Sutra" as the working name.

## 10. What success looks like

Measured in research sessions with consenting families, never through in-app telemetry:

- A child can **explain** a concept in their own words after one thread, not just answer a question.
- A child can **transfer**: solve a problem in a context they haven't seen (e.g. area of an L-shaped room after Rubber Rectangle).
- A child **chooses** to open a second thread without being told to.
- A parent, shown the app for 60 seconds, says some version of "this is actually teaching".
- Every screen works in all five languages without clipped or broken text.
