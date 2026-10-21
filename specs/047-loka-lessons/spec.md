# Feature Specification: 047 Loka Shala — the fifteen remaining social studies lessons

<!-- Spec Kit standard. Status: Approved (product owner approved the plan on 20 Oct 2026) · Priority: P1 · Lane: Feature · Branch: feat/047-loka-lessons -->

## 1. Problem

The Loka (social studies) Shala lists 18 knots, but only I2, E1 and E4 (feature 012) can be played. The other fifteen (I1, Q1–Q3, E2, E3, C1–C9; `docs/product/CURRICULUM_PHASE2.md` §5) show as planned. A child who opens Loka finds three lessons and fifteen closed doors.

Each knot is built as a full seven-stage lesson to the same standard as the Ganita lessons 013–045 after the 046 remediation: Prashna with a picture, six Bodha cards with figures (the example figure changes per step), a three-step workbench, Spot the mistake with a picture, Explain back, the Pothi page, all five languages, keyboard operation and reduced motion.

## 2. Decisions (product owner, 20 Oct 2026)

- All five languages ship together. Translations are written directly in the target script (no translation API, site or library) and are **drafts until a native speaker reviews them**.
- C1 is India-wide with a "my state" picker that shows the chosen state's capital, language and neighbours.
- No political outline of India is traced. C1 uses a schematic tile map labelled "not to scale"; the geography lessons use cross-sections and schematic diagrams.
- Feature freeze lifted for this work; the branch ends in a draft PR that the product owner merges.

## 3. Lessons

Each entry: the misconception, the Prashna (correct choice in bold), the bench steps (route), the Spot-the-mistake, the Explain-back sentence. Bodha card text is in `src/domain/i18n/dictionaries/en-l-<thread>.ts`; facts and rules in `src/domain/world/<topic>.ts`.

### US1 · I1 Clues from the past (`#dig`)
- Misconception: the past is only stories; whatever is found first is the oldest.
- Prashna: a coin near the top of a dig and a pot much deeper; which is probably older? **The pot.**
- Bench: (1) dig down through four layers; (2) sort six clues into archaeological sources (coin, inscription, seal, pot) and literary sources (manuscript, traveller's diary); an inscription is writing but an archaeological source; (3) order the four dug finds oldest first (deepest first).
- Mistake: Meera says the coin in the top layer is oldest because it was found first.
- Explain: "Deeper layers of soil are usually {older}. Coins and inscriptions are {archaeological} sources."
- **US1-AS1** Tapping "Dig down" reveals four layers and the say line explains deeper is older.
- **US1-AS2** Placing the inscription in literary sources gives the gentle reason; all six sorted shows the done line.
- **US1-AS3** Tapping a find that is not the deepest left gives the hint; the order seal, pot, inscription, coin is accepted and the way to Spot the mistake appears.

### US2 · Q1 What is civics? (`#govern`)
- Misconception: the Prime Minister runs everything.
- Prashna: the streetlight on your village lane is broken; who should fix it? **The gram panchayat.**
- Bench: (1) watch the three levels nest: local (gram panchayat or municipality), state, union; (2) sort six jobs (streetlight, garbage, police, state highway, rupee notes, army) to their level; (3) match whom grown-ups elect (ward member and sarpanch, MLA, MP) to each level.
- Mistake: Arjun writes to the Prime Minister about the lane's light.
- Explain: "A broken streetlight is a job for the {local} government. The rupee is a job for the {union} government."
- **US2-AS1** "Show the levels" reveals the three nested levels.
- **US2-AS2** A job placed at the wrong level gets its reason; all six placed shows the done line.
- **US2-AS3** Matching sarpanch, MLA and MP to their levels completes the bench.

### US3 · Q2 A good citizen (`#citizen`)
- Misconception: rights are mine; responsibilities belong to someone else.
- Prashna: everyone may use the public park; may you pick its flowers? **No: using it means caring for it.**
- Bench: (1) watch the same park with and without care; (2) pair four rights with their responsibilities (education 6–14, clean surroundings, public property, voting at 18); (3) three situations, choose what a good citizen does.
- Mistake: Kavya reasons that the park is everyone's, so the flowers are hers.
- Explain: "Every right comes with a {responsibility}. A good citizen uses public things and {cares for} them."
- **US3-AS1** "Show the park" shows the cared-for and the uncared-for park.
- **US3-AS2** A wrong pair gets a hint; four right pairs show the done line.
- **US3-AS3** Choosing the careful action in all three situations completes the bench.

### US4 · Q3 Pollution and us (`#river`)
- Misconception: clear water is clean; pollution you cannot see is not there.
- Prashna: a stream looks completely clear; is it safe to drink? **Not always.**
- Bench: (1) watch a river village through a day as five causes switch on and air, water, land and noise readings rise; (2) switch causes off until all four are clean; (3) sort six waste items into the green (wet) and blue (dry) bins.
- Mistake: Rahul burns leaves to clean the yard.
- Explain: "Clear water can still be {polluted}. Leaves are better {composted} than burnt."
- **US4-AS1** "Show the day" switches every cause on and the readings rise.
- **US4-AS2** Switching every cause off makes all four readings clean.
- **US4-AS3** Wet and dry sorting: a wrong bin gets a reason; all six sorted completes the bench.

### US5 · E2 Land, water, air and life (`#domains`)
- Misconception: most of the Earth is land; most water can be drunk.
- Prashna: of 100 equal parts of the Earth's surface, about how many are water? **About 71.**
- Bench: (1) watch a 100-square Earth fill: 71 water, 29 land; (2) sort eight things into lithosphere, hydrosphere, atmosphere and biosphere; (3) a jug of 100 drops: pour out the salty 97 and the frozen 2; how many are left to use? **About 1** (71 gets the reason).
- Mistake: Nisha says that because most of the surface is water, most water is good to drink.
- Explain: "Life is found where land, water and {air} meet. Only about {1} drop in 100 of the Earth's water is fresh and ready to use."
- **US5-AS1** "Fill the Earth" shows 71 water squares and 29 land squares.
- **US5-AS2** A thing placed in the wrong domain gets its reason; all eight placed shows the done line.
- **US5-AS3** After pouring out salt water and ice, 71 gets the reason and 1 completes the bench.

### US6 · E3 Mountains, plateaus, plains (`#landforms`)
- Misconception: anything high is a mountain.
- Prashna: land high above the sea with a wide flat top like a table? **A plateau.**
- Bench: (1) watch a cross-section rise from the sea: plain, plateau, mountain; (2) set height (low/high) and top (flat/peaked) to make a plateau, then a mountain, then a plain; (3) where do most people live and farm? **Plains**, with a reason for each choice.
- Mistake: Leela calls the Deccan a mountain because it is high.
- Explain: "A plateau is high land with a {flat} top. Most people live on {plains}, where farming is easiest."
- **US6-AS1** "Raise the land" shows the three labelled landforms.
- **US6-AS2** The two controls name the landform; making the three asked for in turn shows the done line.
- **US6-AS3** Choosing plains completes the bench; the others get their reason.

### US7 · C1 The states of India (`#states`)
- Misconception: a state's capital is always its biggest city.
- Prashna: Ahmedabad is Gujarat's biggest city; is it the capital? **No, Gandhinagar.**
- Bench: (1) watch the schematic tile map of 28 states and 8 union territories appear (not to scale); (2) choose "my state" and see its capital, main language and neighbours; (3) tap every neighbour of the chosen state (an island territory has none, and the bench says so).
- Mistake: Jai says Ahmedabad is the capital because a capital is always the biggest city.
- Explain: "India has 28 {states} and 8 union territories. A capital is where the state's {government} works."
- **US7-AS1** "Show India" shows 36 tiles, states and union territories marked differently, and a not-to-scale note.
- **US7-AS2** Choosing Telangana shows Hyderabad, Telugu, and its four neighbours.
- **US7-AS3** Tapping a non-neighbour gets a reason; tapping all neighbours completes the bench.

### US8 · C2 Farms of India (`#farms`)
- Misconception: any crop can be grown at any time.
- Prashna: which crop is sown when the monsoon arrives in June: rice or wheat? **Rice.**
- Bench: (1) watch the year wheel turn through kharif, rabi and zaid; (2) sow six crops in their seasons; (3) three fields in July, November and April: choose the crop for each.
- Mistake: Gopal sows wheat in June with the rain.
- Explain: "Rice is a {kharif} crop, sown with the monsoon. Wheat is a {rabi} crop, sown in winter."
- **US8-AS1** "Turn the year" shows the three seasons and their months.
- **US8-AS2** A crop sown in the wrong season gets its reason; six right shows the done line.
- **US8-AS3** Rice for July, wheat for November and watermelon for April completes the bench.

### US9 · C3 Cities of India (`#cities`)
- Misconception: cities grow anywhere, by chance.
- Prashna: why did so many old Indian cities grow beside rivers or the sea? **Water, farming and boats for trade.**
- Bench: (1) watch settlements grow over time on a schematic land; (2) try six sites; each reports water, flat land and ways to travel, and grows to village, town or city; find a site with all three; (3) match Kolkata, Mumbai, Delhi and Bengaluru to the reason each grew.
- Mistake: Zoya builds on a dry hilltop far from water and roads.
- Explain: "Cities grow where there is water, {flat} land and ways to {trade}."
- **US9-AS1** "Let time pass" grows the settlements.
- **US9-AS2** A site missing something says what; the site with all three becomes a city.
- **US9-AS3** Four right matches complete the bench; a wrong one gets a hint.

### US10 · C4 The Himalaya (`#himalaya`)
- Misconception: higher up is closer to the Sun, so warmer.
- Prashna: climbing a high mountain, does it get warmer or colder? **Colder.**
- Bench: (1) watch a climb from the plains through the Shivalik, Himachal and Himadri with a thermometer; (2) climb in 1,000 m steps to find where it freezes (about 5,000 m with 32 °C on the plains); (3) order the three ranges from the plains upward.
- Mistake: Ravi packs only a T-shirt for a 4,000 m trek.
- Explain: "The higher you climb, the {colder} it gets. The highest range of the Himalaya is the {Himadri}."
- **US10-AS1** "Climb" shows the three ranges and the falling temperature.
- **US10-AS2** Climbing to the freezing height shows the done line.
- **US10-AS3** Shivalik, Himachal, Himadri in order completes the bench; out of order gets the hint.

### US11 · C5 The northern plains (`#plains`)
- Misconception: the soil was always there; rivers only wash soil away.
- Prashna: where did the soil of the Ganga plains come from? **Rivers carried it down from the mountains.**
- Bench: (1) watch rain carry silt down a river; (2) send floods until silt layers fill the low land into a flat plain (four floods); (3) put the five links of the chain in order (rain, river picks up soil, flood spreads it, new layer, crops grow).
- Mistake: Om says rivers only wash soil away, so river land is poor.
- Explain: "The northern plains were built by {rivers} that dropped silt. This soil is {good} for farming."
- **US11-AS1** "Let it rain" shows silt moving down the river.
- **US11-AS2** Four floods fill the plain and show the done line.
- **US11-AS3** The chain in order completes the bench; a wrong link gets the hint.

### US12 · C6 The Thar Desert (`#desert`)
- Misconception: deserts are always hot.
- Prashna: is a winter night in the Thar warm or cold? **Cold, near freezing.**
- Bench: (1) watch a day pass with two thermometers, the Thar and a seaside town; (2) choose the season and the hour to find the coldest Thar time (winter, before dawn, about 5 °C); (3) match four desert things to how they help (camel's wide feet, khejri's deep roots, kund stores rain, thick mud walls).
- Mistake: Kabir says hot days mean hot nights.
- Explain: "A desert gets very little {rain}. Sand heats up fast and cools down {fast}."
- **US12-AS1** "Run the day" shows the big Thar swing and the small seaside swing.
- **US12-AS2** Finding a winter Thar hour at 6 °C or below shows the done line.
- **US12-AS3** Four right matches complete the bench.

### US13 · C7 The peninsular plateau (`#plateau`)
- Misconception: rivers flow to the nearest sea.
- Prashna: the Godavari begins about 80 km from the Arabian Sea; which sea does it reach? **The Bay of Bengal.**
- Bench: (1) watch rain on the Western Ghats run east across the tilted Deccan; (2) for the Godavari, Krishna and Kaveri choose the sea, then see the water run; (3) the Narmada and Tapi: choose the sea, and see them run west through rift valleys.
- Mistake: Sana says the Godavari flows west because Nashik is near the Arabian Sea.
- Explain: "The Deccan plateau slopes down to the {east}. Rivers flow {downhill}, not to the nearest sea."
- **US13-AS1** "Pour the rain" shows water running east.
- **US13-AS2** Choosing the Arabian Sea for an east-flowing river gets the reason; three right shows the done line.
- **US13-AS3** Both west-flowing rivers right completes the bench.

### US14 · C8 Rivers of India (`#rivers`)
- Misconception: rivers flow "down the map", south.
- Prashna: which is higher, a river's source or its mouth? **The source.**
- Bench: (1) watch the Ganga drawn from the Gangotri glacier to the Sundarbans with heights; (2) tap the places in the order the water passes them; (3) compare a year of water in a snow-fed and a rain-fed river: in April, which still flows? **The snow-fed one.**
- Mistake: Tara says the bottom of the map is downhill, so rivers flow south.
- Explain: "A river's source is {higher} than its mouth. A snow-fed river flows {all year}."
- **US14-AS1** "Follow the river" shows the six places and their heights.
- **US14-AS2** A place out of order gets the downhill hint; the right order shows the done line.
- **US14-AS3** Choosing the snow-fed river for April completes the bench.

### US15 · C9 Unity in diversity (`#unity`)
- Misconception: India has one language, and different languages share nothing.
- Prashna: Pongal, Lohri, Bihu and Uttarayan all come in mid-January; what do they celebrate? **The harvest and the Sun.**
- Bench: (1) watch the mid-January festivals light up across states; (2) match four festivals to their states; (3) match five greetings, each in its own script, to their language.
- Mistake: Rohan says people who speak different languages share nothing, so Pongal and Lohri have nothing in common.
- Explain: "India has {22} scheduled languages. Different festivals can celebrate the {same} harvest."
- **US15-AS1** "Light up January" shows the festivals and the shared harvest.
- **US15-AS2** Four festivals matched to their states show the done line.
- **US15-AS3** Five greetings matched to their languages complete the bench.

### US16 · Every new lesson end to end, in every language
- **US16-AS1** Each of the fifteen knots opens from the Loka Shala and runs Prashna → Bodha → bench → mistake → explain → stop, and its Pothi page appears (covered by `tests/e2e/journeys/046-every-lesson.spec.ts`).
- **US16-AS2** Every screen of each knot has no raw keys, no English on translated screens and no horizontal overflow, in en/hi/te/bn/ta at both viewports (covered by `tests/e2e/sweep/app-routes.spec.ts`).
- **US16-AS3** Every bench control is reachable by keyboard and benches render under reduced motion (covered by `tests/e2e/sweep/keyboard.spec.ts` and the reduced-motion sweep).

## 4. Invariants

- Every fact and rule (layers, levels, pairs, causes, bins, domains, landform classification, states and neighbours, seasons, site needs, temperature with height, flood layers, desert temperatures, river directions, river course heights, festivals and greetings) lives in `src/domain/world/`, with unit tests. Screens and pictures display those values.
- The neighbour list is symmetric (tested).
- No score, timer or praise word; kumkum only marks "look here".
- No new dependencies.

## 5. Facts needing a teacher's sign-off

See `checks.md` §Teacher check: capitals (Amaravati for Andhra Pradesh, Sri Vijaya Puram for the Andaman and Nicobar Islands), neighbours including enclaves of Puducherry, main languages per state, the 71/97/2/1 water figures, 6.5 °C per 1,000 m, crop seasons, Thar temperatures and rainfall, river heights, festival names and states.
