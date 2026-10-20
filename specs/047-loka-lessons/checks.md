# Checks — 047 Loka lessons (I1, Q1–Q3, E2, E3, C1–C9)

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

Full verification: `python3 scripts/harness/verify.py` → 12/12 PASS at `96899e7` (`.agent/last-verify.md`).

## Scenarios

Each knot's three scenarios are tests named with their IDs in `tests/acceptance/047-<knot>.spec.ts`, run at 390×844 and 360×740. These specs run in English; the other four languages are covered by the sweep (US16-AS2).

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1..3 I1 `#dig` | PASS | `047-i1.spec.ts` | — |
| US2-AS1..3 Q1 `#govern` | PASS | `047-q1.spec.ts` | — |
| US3-AS1..3 Q2 `#citizen` | PASS | `047-q2.spec.ts` | — |
| US4-AS1..3 Q3 `#river` | PASS | `047-q3.spec.ts`, plus a regression test: coming back to step 2 starts with every cause on | Fixed in `96899e7` (reviewer finding) |
| US5-AS1..3 E2 `#domains` | PASS | `047-e2.spec.ts` | — |
| US6-AS1..3 E3 `#landforms` | PASS | `047-e3.spec.ts` | — |
| US7-AS1..3 C1 `#states` | PASS | `047-c1.spec.ts` | — |
| US8-AS1..3 C2 `#farms` | PASS | `047-c2.spec.ts` | — |
| US9-AS1..3 C3 `#cities` | PASS | `047-c3.spec.ts` | — |
| US10-AS1..3 C4 `#himalaya` | PASS | `047-c4.spec.ts` | — |
| US11-AS1..3 C5 `#plains` | PASS | `047-c5.spec.ts` | — |
| US12-AS1..3 C6 `#desert` | PASS | `047-c6.spec.ts` | — |
| US13-AS1..3 C7 `#plateau` | PASS | `047-c7.spec.ts` | — |
| US14-AS1..3 C8 `#rivers` | PASS | `047-c8.spec.ts` | — |
| US15-AS1..3 C9 `#unity` | PASS | `047-c9.spec.ts` | — |
| US16-AS1 | PASS | `tests/e2e/journeys/046-every-lesson.spec.ts` (each knot Prashna → Pothi page, and the explain-back hint) | — |
| US16-AS2 | PASS | `tests/e2e/sweep/app-routes.spec.ts` (each knot × en/hi/te/bn/ta × both viewports); `src/domain/i18n/dictionaries.test.ts` (key parity, script, placeholders) | — |
| US16-AS3 | PASS | `tests/e2e/sweep/keyboard.spec.ts` (each bench); `tween` honours reduced motion (`src/ui/util/dom.ts`) | — |
| Traceability | PASS | `scripts/harness/check_traceability.py`: no 047 scenario missing a test | — |
| Screenshot sweep | PASS | Every knot's Prashna, three bench steps and mistake at 390 px in Bengali and 360 px in Telugu, read by eye; C9 greeting cards enlarged and the Tamil C9 title shortened as a result | — |
| Independent review | PASS | Reviewer subagent read the diff cold: 1 major (Q3 step-2 restore) fixed in `96899e7`; minors listed as skipped in the PR | — |
| Native-speaker review of hi/te/bn/ta | UNRESOLVED | Written directly by the agent, with no translation tool; passes the script checks only | Needs a native teacher per language, Telugu first. Hindi and Telugu use the textbook loanword for "delta" in C7; confirm it |
| Teacher fact check | UNRESOLVED | Facts listed below | Needs a Class 5 social-studies teacher's sign-off |

## Teacher check

Please mark each line right, wrong or "simplify differently". Figures are rounded as a Class 5 book would round them.

**I1 Clues from the past.** Sources are archaeological (coin, inscription, pot, seal) or literary (manuscript, diary); an inscription counts as archaeological here because it is dug up. In an undisturbed dig, deeper is older: seal, pot, inscription, coin.

**Q1 What is civics?** Three levels: local (streetlights, garbage), state (police, a state highway), union (rupee notes and coins, the army). The sarpanch is elected locally, the MLA for the state, the MP for the union.

**Q2 A good citizen.** Rights paired with duties: free school from 6 to 14 with going to school and learning; a clean place to live with putting rubbish in the bin; using parks, buses and roads with taking care of public things; voting at 18 with choosing carefully.

**Q3 Pollution and us.** Factory smoke and waste dirty air and water; sewage dirties water; burning leaves dirties air; plastic on the bank dirties land and water; trucks and horns dirty the air and make noise. Green bin for wet waste (peel, tea leaves, dry leaves), blue for dry (bottle, newspaper, tin can).

**E2 The four domains.** About 71 of every 100 parts of the Earth's surface are water. Of 100 drops of the Earth's water, about 97 are salt, 2 are ice and 1 is fresh water we can use.

**E3 Landforms.** A landform is named by height and top together: a mountain is high with a peak, a plateau is high and flat-topped (the Deccan), a plain is low and flat. Most people live and farm on plains.

**C1 The states of India.** 28 states and 8 union territories. Capitals used: Amaravati (Andhra Pradesh), Sri Vijaya Puram (Andaman and Nicobar Islands), Dehradun (Uttarakhand), Srinagar and Jammu (Jammu and Kashmir). Himachal Pradesh and Uttar Pradesh are not shown as touching. Main language per state is one choice each; please check the list. The map is a schematic grid, not to scale and not a political outline.

**C2 Farms of India.** Kharif sown June–July with the monsoon (rice), rabi October–December in the cool winter (wheat), zaid March–April in the short hot summer.

**C3 Cities of India.** A city grows where water, flat land and trade routes meet. Why each grew: Kolkata, a river port near the sea; Mumbai, a deep, safe harbour; Delhi, a river where old roads across the plains meet; Bengaluru, cool air on a high plateau (about 900 m).

**C4 The Himalaya.** Air cools about 6.5 °C for every 1,000 m climbed. Shivalik about 1,000 m, Himachal about 4,000 m, Himadri about 6,000 m. From 32 °C on the plains, freezing is first reached around 5,000 m. Shimla, Mussoorie and Darjeeling are about 2,000 m.

**C5 The northern plains.** Floods spread silt from the Himalaya layer on layer; river systems Indus, Ganga and Brahmaputra; states on the plain include Punjab, Uttar Pradesh, Bihar and West Bengal.

**C6 The Thar Desert.** Rounded day ranges: Thar summer 25–45 °C, winter 5–25 °C; coast summer 27–34 °C, winter 20–30 °C. Jaisalmer and Bikaner as Thar towns. Khejri names: జమ్మి (te), শমী (bn), வன்னி (ta).

**C7 The peninsular plateau.** The Deccan tilts east. The Godavari rises about 80 km from the Arabian Sea coast and runs nearly 1,500 km to the Bay of Bengal. The Krishna rises at Mahabaleshwar and crosses Maharashtra, Karnataka, Telangana and Andhra Pradesh. The Narmada and Tapi flow west in rift valleys; the Narmada reaches the sea near Bharuch.

**C8 Rivers of India.** Ganga heights, rounded: Gangotri 4,000 m, Haridwar 300 m, Prayagraj 100 m, Varanasi 80 m, Patna 50 m, Sundarbans 0 m. The Yamuna joins at Prayagraj. Snow-fed rivers flow all year; rain-fed rivers fall low in April.

**C9 Unity in diversity.** 22 scheduled languages. Pongal (Tamil Nadu), Lohri (Punjab), Bihu (Assam) and Uttarayan (Gujarat) fall in mid-January and celebrate the harvest and the Sun's turn north. The Bihu shown is the January one (Magh Bihu). The rupee note's language panel lists 15 languages. Greetings: नमस्ते (Hindi), வணக்கம் (Tamil), নমস্কার (Bengali), ਸਤ ਸ੍ਰੀ ਅਕਾਲ (Punjabi), నమస్కారం (Telugu).
