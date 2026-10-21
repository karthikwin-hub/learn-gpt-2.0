# Checks — 048 Loka: real India maps and full chapters

<!-- Agentic Delivery Standard v1.0. One row per requirement/scenario.
     Verdict: PASS | FAIL | UNRESOLVED. Evidence = test name + command result, file path, screenshot or reviewer note.
     Missing evidence stays visible as UNRESOLVED — never delete a row to look complete. -->

Full verification: `python3 scripts/harness/verify.py` → 12/12 PASS at `786fa53` and again at `292ba65` (`.agent/last-verify.md`).

## Scenarios

| Requirement | Verdict | Evidence | Correction / follow-up |
|---|---|---|---|
| US1-AS1 C1 map from boundary data, 36 shapes, source caption | PASS | `tests/acceptance/048-maps.spec.ts` US1-AS1; `047-c1.spec.ts` US7-AS1 (updated with product-owner approval); `src/ui/diagrams/loka/india-map.test.ts` | — |
| US1-AS2 my state and found neighbours marked | PASS | `048-maps.spec.ts` US1-AS2 (Telangana in kumkum, Karnataka found after tapping) | — |
| US1-AS3 C9 festival states on the same map | PASS | `048-maps.spec.ts` US1-AS3 (Tamil Nadu, Punjab, Assam, Gujarat found; Kerala not) | — |
| US2-AS1..5 read the chapter, answers, words, text size, entry points, languages | PASS | `tests/acceptance/048-reading.spec.ts` | — |
| US3-AS1 all 18 chapters at both viewports | PASS | `tests/e2e/sweep/app-routes.spec.ts` "048 chapter sweep in en" (36 runs: parts, picture count, questions, no raw keys, no overflow, accessibility, no console errors) | — |
| Invariant: shapes and places in `src/domain/world/geo/` | PASS | `india-map.ts` (generated), `places.ts`, `zones.ts`, `shape.ts`; architecture-rules check | — |
| Invariant: external boundary never hand-edited | PASS | `scripts/geo/build_india_map.py` regenerates `india-map.ts` byte for byte from `STATE_BOUNDARY.shp` (data modified 2025-10-16); it stops on an unknown coordinate system, an unknown name, anything but 28 states and 8 UTs, or anything but 4 disputed areas | — |
| Invariant: zones approximate | PASS | Zones clipped to the outline and the map says "Shaded areas are approximate." (`india-map.test.ts`) | — |
| Invariant: chapter text in `src/domain/reading/`, each ≥1,000 words | PASS | `src/domain/reading/*.test.ts` | — |
| Invariant: no score, timer or praise | PASS | Read screen has "Show answer" only; `048-reading.spec.ts` US2-AS2 | — |
| Invariant: no new dependencies | PASS | `package.json` unchanged; the generator uses the Python standard library only | — |
| Places and zone labels land in the right region | PASS | `src/domain/world/geo/places.test.ts`; the 8 state capitals inside their state, neighbours touch, main rivers inside India (`india-map.test.ts`) | — |
| Every map, every language | PASS | Sweep: each C and E knot × en/hi/te/bn/ta × 360 and 390 px | — |
| Screenshot check | PASS | Read by eye: C1, C9, Tamil C1 benches; chapter maps for C1–C8 and E3 at 390 px; Telugu Bodha at 360 px. Label overlaps in C6 and C8 and a faint inset in C4 were found and fixed | — |
| Independent review | PASS | Reviewer subagent read the diff cold: gram sabha wording (Q1), the generator's disputed-area count and ADR status were fixed in `c789550`; others listed as skipped in the PR | — |
| Native-speaker review of hi/te/bn/ta | UNRESOLVED | Map words written by the agent, with no translation tool; pass the script checks only | Needs a native teacher per language, Telugu first. Bengali reviewer: confirm থর (Thar) |
| Teacher fact check | UNRESOLVED | Facts listed below | Needs a Class 5 social-studies teacher's sign-off |
| Boundary oddities | Reported | The data has four "DISPUTED (…)" areas; they are drawn as a neutral layer inside India's outline, not given to any state | Product owner to confirm this treatment |

## Teacher check

Each chapter's numbers, dates and claims, as written. Please tick or correct.

### I1 · How we know about the past
- Ashoka's rock and pillar edicts are more than 2,200 years old; James Prinsep read the Brahmi script in 1837.
- Megasthenes described Pataliputra about 2,300 years ago.
- Harappa, Mohenjo-daro, Lothal and Dholavira flourished about 4,500 years ago; Dholavira became a World Heritage Site in 2021.
- Deeper layers are older; the National Museum, New Delhi, holds Harappan finds.

### I2 · The thread of time
- A lunar month is about 29½ days; a year about 365¼ days; a leap year adds 29 February.
- The Saka calendar was adopted in 1957; 1 Chaitra falls on 22 March in most years.
- The Islamic year is about 354 days, so Eid comes about 11 days earlier each year.
- Harappan towns around 2500 BCE; Ashoka around 250 BCE; Aryabhata's book 499 CE; Brahmagupta's rules for zero 628 CE.
- No year zero; 100 BCE to 100 CE is 199 years; 1947 is in the 20th century (1901–2000).

### Q1 · How we govern ourselves
- The Constitution came into force on 26 January 1950 (Republic Day).
- Every citizen aged 18 or over can vote.
- Gram panchayat headed by the sarpanch; the gram sabha is the village adults on the voters' list.
- Since 1993, one in three panchayat seats is kept for women.
- The leader of the largest group usually becomes Chief Minister (state) or Prime Minister (country).

### Q2 · Rights and responsibilities
- Free schooling for every child aged 6 to 14 became law in 2009.
- The voting age was lowered from 21 to 18 in 1989.
- The UN agreed children's rights in 1989; India joined in 1992.
- Childline 1098 is free.
- Swachh Bharat Mission began in 2014.

### Q3 · Pollution and us
- Namami Gange began in 2014.
- India banned many single-use plastic items from 1 July 2022.
- Around 2000, Delhi moved public buses and auto-rickshaws to CNG.
- Indore has been named India's cleanest city again and again since 2017.
- Boiling or filtering water kills or removes most germs.

### E1 · The Earth spins and travels
- The Earth is about 12,700 km across; the Sun about 15 crore km away; sunlight takes about 8 minutes.
- One spin about 24 hours; at the equator about 1,670 km an hour.
- One orbit about 365¼ days, at about 30 km a second.
- Tilt about 23½°; longest day around 21 June, shortest around 22 December; equinoxes around 21 March and 23 September.
- Eastern places see sunrise first because the Earth spins west to east.

### E2 · Four domains of the Earth
- About 71 parts in 100 of the surface is water, 29 land; Asia is the biggest continent.
- The Indian Ocean is the only ocean named after a country.
- Everest 8,849 m; the Mariana Trench about 11,000 m deep.
- Air is about 78 parts nitrogen and 21 parts oxygen in 100.
- Only about 1 drop in 100 of Earth's water is fresh water we can use.

### E3 · Landforms
- Mountains, plateaus, plains; valleys, hills, islands, deserts.
- India has more than a thousand islands, including the Andaman and Nicobar Islands and Lakshadweep.
- The Western Ghats are steep and continuous; the Eastern Ghats lower and broken by rivers.
- Map zones (Himalaya, northern plains, Thar, Deccan, Western Ghats) are approximate.

### E4 · Reading a map
- The Survey of India, which makes India's official maps, was set up in 1767.
- Scale examples: 1 square = 5 m, so 9 squares = 45 m; 3 squares of 10 m = 30 m.

### C1 · States and union territories
- India has 28 states and 8 union territories (map: Survey of India, data of 2025-10-16).
- Many state borders were redrawn by language in 1956.
- Six-digit PIN codes; Telangana and Andhra Pradesh begin with 5, Tamil Nadu and Kerala with 6.
- India has more than 700 districts.
- Nine coastal states: Gujarat, Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Odisha, West Bengal.
- Gujarat's capital is Gandhinagar; its biggest city is Ahmedabad.
- The "Chicken's Neck" in West Bengal joins the north-east to the rest of India.

### C2 · Farms and seasons
- Nearly half of India's workers work on farms.
- India grows the most milk and pulses in the world; India and China are the two biggest growers of rice and of wheat.
- The monsoon reaches Kerala around 1 June and spreads over about six weeks.
- 2023 was the International Year of Millets.
- In the 1960s India often did not grow enough grain.
- Rice states: West Bengal, Uttar Pradesh, Punjab, Odisha, Andhra Pradesh, Telangana; wheat: Uttar Pradesh, Punjab, Haryana, Madhya Pradesh; cotton on the Deccan black soil; tea in Assam and Darjeeling; coffee in Karnataka and Kerala.

### C3 · Villages, towns and cities
- Census 2011: about 69 in 100 Indians lived in villages.
- Varanasi is one of the oldest continuously lived-in cities.
- Mumbai's seven islands were joined by filling land from the 1700s onwards.
- Chandigarh was designed in the 1950s by Le Corbusier.
- Delhi on the Yamuna; Kolkata on the Hooghly; Hyderabad and Bengaluru on the Deccan.

### C4 · The Himalaya
- About 2,400 km long, from Jammu and Kashmir and Ladakh to Arunachal Pradesh.
- Everest 8,849 m (Nepal–China border); Kangchenjunga 8,586 m, India's highest peak (Sikkim–Nepal border).
- The Indian plate met Asia about 50 million years ago.
- Shivalik about 1,000 m; Himachal about 3,500–4,500 m; Himadri about 6,000 m on average.
- Temperature falls about 6.5 °C per 1,000 m; water freezes at about 5,000 m above a 32 °C plain.
- Siachen is one of the longest glaciers outside the polar regions.
- Hill towns about 2,000 m up; Tenzing Norgay and Edmund Hillary climbed Everest in 1953.

### C5 · The northern plains
- About 2,400 km long and 240–320 km wide, from Punjab to West Bengal and Assam.
- Khadar (new alluvium, renewed by floods) and bhangar (older alluvium on higher ground); the Ganga–Yamuna doab.
- The Ganga–Brahmaputra delta is the largest in the world.
- About 4 in 10 Indians live in the states of the northern plains.

### C6 · The Thar desert
- Covers most of western Rajasthan, reaching Gujarat, Punjab, Haryana and Pakistan.
- The driest parts get less than 15 cm of rain a year; some dunes are over 100 m high.
- India's highest recorded temperature: 51 °C at Phalodi, 19 May 2016.
- A summer day might go from 25 °C to 45 °C; a seaside town from 27 °C to 34 °C.
- The Khejarli sacrifice of Amrita Devi and the Bishnois, 1730.
- The Indira Gandhi Canal brings Punjab's river water into the Thar.
- Jaisalmer fort has been lived in for more than 850 years.

### C7 · The Deccan plateau
- The Western Ghats run about 1,600 km from Gujarat to Kerala; UNESCO World Heritage Site in 2012.
- Anamudi, 2,695 m, in Kerala, is south India's highest peak.
- The Godavari, about 1,465 km, is the longest river of the peninsula.
- Godavari, Krishna and Kaveri flow east to the Bay of Bengal; Narmada and Tapi flow west.
- Jog Falls on the Sharavathi drops about 253 m.

### C8 · The Ganga
- More than 2,500 km from the Gangotri glacier to the Sundarbans.
- Gaumukh about 4,000 m; Haridwar about 300 m; the Gangotri glacier about 30 km long.
- The Yamuna joins at Prayagraj (Sangam, Kumbh Mela); then Varanasi and Patna.
- Tributaries: Yamuna, Ghaghara, Gandak, Kosi from the north; Son from the south.
- In Bangladesh the river is called the Padma; the Hooghly flows past Kolkata.
- The Ganges river dolphin is India's National Aquatic Animal.
- More than 40 crore people live in the Ganga basin.

### C9 · Unity in diversity
- The Constitution lists 22 scheduled languages.
- A rupee note's back panel shows its value in 15 languages besides Hindi and English.
- Main languages by state as listed in the chapter (Telugu in Andhra Pradesh and Telangana, Bengali in West Bengal and Tripura, and so on).
- Classical dances: Kuchipudi from Andhra Pradesh (named after its village), Odissi from Odisha, Manipuri from Manipur, Sattriya from Assam.
- January harvest festivals: Pongal, Lohri, Bihu, Uttarayan.
