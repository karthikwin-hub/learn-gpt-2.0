/* English strings for the Ganita lessons in measures, data and patterns: U2 U3 H1 H2 L4 P1. */
export const dictionary: Record<string, string> = {
  /* U2 */
  'prashna.U2.q': 'Which is longer: 250 centimetres or 2 metres?',
  'prashna.U2.c1': '2 metres',
  'prashna.U2.c2': '250 centimetres (which is 2.5 metres)',
  'prashna.U2.c3': 'They are the exact same length',
  'prashna.U2.a':
    '250 cm equals 2.5 m (or 2 m 50 cm), which is strictly longer than 2 metres (200 cm) by 50 cm!',
  'bodha.U2.what':
    'We measure length in metres, mass in grams, and liquid capacity in litres using standard metric units.',
  'bodha.U2.can': 'Use the metric ladder to convert length, mass and capacity.',
  'bodha.U2.idea':
    'Prefixes tell the power of 10: Kilo means 1000 times bigger; Centi means 100 times smaller; Milli means 1000 times smaller.',
  'bodha.U2.why':
    'Because the metric ladder steps by 10s, converting units is just moving the decimal dot left or right!',
  'bodha.U2.example': 'Converting on the metric ladder:',
  'bodha.U2.example1':
    'Step 1: 1 metre = 100 centimetres (shift dot two places right: multiply by 100).',
  'bodha.U2.example2': 'Step 2: 3 m 25 cm = 3.25 m = 325 cm.',
  'bodha.U2.example3': 'Step 3: 4500 g = 4.5 kg (shift dot three places left: divide by 1000).',
  'bodha.U2.where':
    'Cloth merchants, milk packets (500 mL), medicine bottles (5 mL), sack of rice (25 kg), road distances (km).',
  'bodha.U2.sutra':
    'Kilo is a thousand, centi a hundredth, milli a thousandth; shift the dot by powers of ten.',
  'metric.title': 'Metric Conversion Ladder',
  'metric.lead': 'Slide between metric units and watch place values shift by powers of 10.',
  'metric.length': 'Length (m)',
  'metric.mass': 'Mass (g)',
  'metric.capacity': 'Capacity (L)',
  'metric.ladder': 'Conversion Ladder',
  'metric.steps': 'Ladder Steps',
  'metric.unit_km': 'Kilometres (km)',
  'metric.unit_m': 'Metres (m)',
  'metric.unit_cm': 'Centimetres (cm)',
  'metric.unit_mm': 'Millimetres (mm)',
  'metric.unit_kg': 'Kilograms (kg)',
  'metric.unit_g': 'Grams (g)',
  'metric.unit_mg': 'Milligrams (mg)',
  'metric.unit_kL': 'Kilolitres (kL)',
  'metric.unit_L': 'Litres (L)',
  'metric.unit_mL': 'Millilitres (mL)',
  'metric.factor_up': '÷ 10 (move dot left)',
  'metric.factor_down': '× 10 (move dot right)',
  'metric.comparator': 'Dual Balance Comparator',
  'metric.compare_equal': 'Both quantities are equal!',
  'metric.compare_greater': 'Left side is larger',
  'metric.compare_smaller': 'Right side is larger',
  'metric.reset': 'Reset',
  'mistake.U2.intro': 'Sonia wants to convert 4 metres and 5 centimetres into decimal metres:',
  'mistake.U2.s1': 'She writes that 1 metre = 100 centimetres.',
  'mistake.U2.s2': 'She notes 5 centimetres and writes down 4.5 metres.',
  'mistake.U2.s3': 'She concludes that 4 m 5 cm is equal to 4.5 m.',
  'mistake.U2.fine1': 'Sound step: 1 metre is indeed 100 centimetres.',
  'mistake.U2.fine3': 'Step 3 fails because of the decimal misconception in Step 2.',
  'mistake.U2.found':
    'Here! 5 cm is 5 hundredths of a metre (0.05 m), not 5 tenths! 4.5 m is 4 m 50 cm. 4 m 5 cm must be written as 4.05 m.',
  'explain.U2.s':
    'One metre contains exactly {0} centimetres. To convert grams into kilograms, we {1} by one thousand.',
  'explain.U2.one hundred': 'one hundred',
  'explain.U2.one thousand': 'one thousand',
  'explain.U2.ten': 'ten',
  'explain.U2.divide': 'divide',
  'explain.U2.multiply': 'multiply',
  'explain.U2.subtract': 'subtract',
  'explain.U2.hint':
    'Recall how many hundredths are in a whole metre, and what operation turns smaller units into larger units.',
  'know.U2':
    'Kilo is a thousand, centi a hundredth, milli a thousandth; shift the dot by powers of ten.',

  /* U3 */
  'prashna.U3.q':
    'A train ticket shows departure at 21:30. In 12-hour clock time, when does the train leave?',
  'prashna.U3.c1': '9:30 in the morning (AM)',
  'prashna.U3.c2': '9:30 at night (PM)',
  'prashna.U3.c3': '11:30 at night',
  'prashna.U3.a':
    '21:30 is 12 hours past 9:30, so 21 - 12 = 9 hours past noon: 9:30 PM (at night)!',
  'bodha.U3.what':
    'The 24-hour clock counts straight from 00:00 at midnight through 23:59, eliminating AM and PM mistakes.',
  'bodha.U3.can': 'Read railway clocks, convert to 12-hour time, and bridge durations easily.',
  'bodha.U3.idea':
    'For times past noon (12:00), subtract 12 to find the PM time: 15:00 is 3 PM, 21:30 is 9:30 PM.',
  'bodha.U3.why': 'Time rolls in 60s, not 100s! When minutes reach 60, they roll into 1 full hour.',
  'bodha.U3.example': 'Calculate duration from 09:45 to 12:15:',
  'bodha.U3.example1': 'Step 1: Bridge to next hour 10:00 (15 min).',
  'bodha.U3.example2': 'Step 2: 10:00 to 12:00 is 2 whole hours.',
  'bodha.U3.example3': 'Step 3: 12:00 to 12:15 is 15 min. Total duration = 2 hours 30 min.',
  'bodha.U3.where':
    'Railway timetables, flight boarding passes, digital watches, hospital charts, and sundials.',
  'bodha.U3.sutra':
    'Time rolls in 60s, not 100s; the 24-hour clock counts straight through the day.',
  'timeclock.title': '24-Hour Clock & Duration (Railway Time)',
  'timeclock.lead':
    'Rotate the dual-dial clock, compare 12-hr and 24-hr railway time, and bridge elapsed durations in base 60.',
  'timeclock.hours': 'Hours',
  'timeclock.minutes': 'Minutes',
  'timeclock.railway_time': '24-Hour Railway Time',
  'timeclock.standard_time': '12-Hour Clock Time',
  'timeclock.step1': '1. Dual Clock Dial',
  'timeclock.step2': '2. Base-60 Minute Roll',
  'timeclock.step3': '3. Hour Bridging Timeline',
  'timeclock.reset': 'Reset',
  'timeclock.start_time': 'Departure / Start',
  'timeclock.end_time': 'Arrival / End',
  'timeclock.duration': 'Total Elapsed Duration',
  'mistake.U3.intro':
    'Rohan wants to add 25 minutes to 14:50 to find when his afternoon science class ends:',
  'mistake.U3.s1': 'He sets his starting time as 14 hours and 50 minutes.',
  'mistake.U3.s2': 'He adds 50 + 25 directly as digits and writes 14:75.',
  'mistake.U3.s3': 'He concludes that class ends at 14:75.',
  'mistake.U3.fine1': 'Sound step: 14:50 correctly records 2:50 PM.',
  'mistake.U3.fine3': 'Step 3 fails because of the invalid base-10 time in Step 2.',
  'mistake.U3.found':
    'Here! Time rolls in base 60, not base 10! There is no such time as 14:75. 50 min + 10 min rolls to 15:00; adding the remaining 15 min gives 15:15 (3:15 PM).',
  'explain.U3.s':
    "One hour contains {0} minutes, not one hundred. In 24-hour railway time, eight o'clock in the evening is written as {1}.",
  'explain.U3.sixty': 'sixty',
  'explain.U3.twenty-four': 'twenty-four',
  'explain.U3.hundred': 'hundred',
  'explain.U3.20:00': '20:00',
  'explain.U3.08:00': '08:00',
  'explain.U3.18:00': '18:00',
  'explain.U3.hint':
    'Recall how many minutes roll into a full hour, and what you get by adding 12 to 8 PM.',
  'know.U3': 'Time rolls in 60s, not 100s; the 24-hour clock counts straight through the day.',

  /* H1 */
  'prashna.H1.q':
    'In a school library pictograph, 1 book symbol stands for 5 books. If there are 4 book symbols on the shelf row, how many books does that mean?',
  'prashna.H1.c1': '4 books',
  'prashna.H1.c2': '9 books',
  'prashna.H1.c3': '20 books',
  'prashna.H1.a': 'Each book symbol represents 5 books! 4 symbols × 5 books = 20 books in total.',
  'bodha.H1.what':
    'A pictograph shows counts and quantities using pictures instead of long lists of numbers.',
  'bodha.H1.can':
    'Read scaled pictograph keys, decode full and half symbols, and tally survey data.',
  'bodha.H1.idea':
    'The key tells what one picture is worth: 1 tree icon might stand for 10 real trees.',
  'bodha.H1.why':
    'Drawing 50 trees is too slow; drawing 5 tree icons with a key of 10 is fast, neat, and clear!',
  'bodha.H1.example': 'Key: 1 book icon = 4 students.',
  'bodha.H1.example1': 'Step 1: Notice the key: 1 book icon stands for 4 students.',
  'bodha.H1.example2': 'Step 2: 3 full book icons = 3 × 4 = 12 students.',
  'bodha.H1.example3':
    'Step 3: Half a book icon = half of 4 = 2 students. Total for 3½ icons = 12 + 2 = 14 students.',
  'bodha.H1.where':
    'Newspaper charts, museum displays, crop harvest reports, and traffic survey posters.',
  'bodha.H1.sutra': 'The key tells what one picture is worth; multiply the pictures by the key.',
  'pictograph.title': 'Pictographs (Scaled Keys & Data Representation)',
  'pictograph.lead':
    'Stamp symbols across survey rows, scale by key factors (2, 5, or 10), and decode fractional half-icons.',
  'pictograph.key_scale': 'Key Scale',
  'pictograph.one_symbol_equals': '1 Symbol =',
  'pictograph.items': 'items',
  'pictograph.full_icon': '+ Full Symbol',
  'pictograph.half_icon': '+ Half Symbol',
  'pictograph.clear_row': 'Clear Row',
  'pictograph.category': 'Category',
  'pictograph.symbols': 'Symbols Displayed',
  'pictograph.total_count': 'Calculated Total',
  'pictograph.step1': '1. Fruit Harvest Survey',
  'pictograph.step2': '2. Scale Multiplier Explorer',
  'pictograph.step3': '3. Half-Icon Fractional Tally',
  'pictograph.reset': 'Reset',
  'mistake.H1.intro':
    'Anita is reading a bicycle shop sales report pictograph where the key states: 1 icon = 10 bicycles:',
  'mistake.H1.s1': 'She looks at Tuesday sales and counts 3 bicycle symbols.',
  'mistake.H1.s2': 'She ignores the key and writes down that only 3 bicycles were sold.',
  'mistake.H1.s3': 'She announces that Tuesday was a very slow day with only 3 sales.',
  'mistake.H1.fine1': 'Sound step: counting 3 bicycle symbols on the chart is accurate.',
  'mistake.H1.fine3':
    'Step 3 fails because she forgot to multiply by the key scale factor in Step 2.',
  'mistake.H1.found':
    'Here! You must multiply the icon count by the key scale! 1 symbol is worth 10 bicycles. 3 symbols × 10 = 30 bicycles, not 3!',
  'explain.H1.s':
    'Every symbol in a pictograph stands for the amount specified in the {0}. If one apple symbol stands for five apples, then four symbols represent {1} apples.',
  'explain.H1.key': 'key',
  'explain.H1.title': 'title',
  'explain.H1.border': 'border',
  'explain.H1.twenty': 'twenty',
  'explain.H1.nine': 'nine',
  'explain.H1.four': 'four',
  'explain.H1.hint':
    'Remember what tells you the value of one symbol, and multiply that scale by 4.',
  'know.H1': 'The key tells what one picture is worth; multiply the pictures by the key.',

  /* H2 */
  'prashna.H2.q':
    'A bar reaches line 4 on an axis marked in steps of 10 (0, 10, 20, 30, 40). What value does the bar represent?',
  'prashna.H2.c1': '4',
  'prashna.H2.c2': '14',
  'prashna.H2.c3': '40',
  'prashna.H2.a': 'Each line on the axis counts by 10! Line 4 corresponds to 4 × 10 = 40, not 4!',
  'bodha.H2.what':
    'A bar graph uses rectangles of equal width to compare amounts across different categories.',
  'bodha.H2.can':
    'Read scaled axis intervals, compare bar heights, and graph nutrition data (Jaal B1).',
  'bodha.H2.idea':
    'The height or length of each bar matches the count: taller bar means greater amount.',
  'bodha.H2.why':
    'The side axis has a scale: always check the step size! If the axis goes by 5s (0, 5, 10, 15), line 3 means 15.',
  'bodha.H2.example': 'Reading a bar graph:',
  'bodha.H2.example1': 'Step 1: Check category (e.g. Mango).',
  'bodha.H2.example2': 'Step 2: Follow top of bar horizontally to vertical axis.',
  'bodha.H2.example3': 'Step 3: Axis shows 25, so 25 children chose Mango.',
  'bodha.H2.where':
    'Cricket match run rates, daily rainfall records, sports scores, and nutrient intake (Vijnana B1).',
  'bodha.H2.sutra': 'The height of the bar tells the count; always read the scale on the side.',
  'bargraph.title': 'Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2)',
  'bargraph.lead':
    'Adjust bar heights, switch axis scale intervals (1, 2, 5, 10), and view nutritional food intake bars.',
  'bargraph.axis_scale': 'Axis Step Scale',
  'bargraph.step_size': 'Step:',
  'bargraph.orientation': 'Orientation',
  'bargraph.vertical': 'Vertical',
  'bargraph.horizontal': 'Horizontal',
  'bargraph.step1': '1. Standard Bar Graph',
  'bargraph.step2': '2. Axis Scale Multipliers',
  'bargraph.step3': '3. Jaal B1 Food Nutrient Intake',
  'bargraph.reset': 'Reset',
  'mistake.H2.intro':
    'Vikram is reading a sports equipment bar graph with an axis marked in steps of 5 (0, 5, 10, 15):',
  'mistake.H2.s1': 'He looks at the football bar and sees it reaches grid mark 3.',
  'mistake.H2.s2':
    'He ignores the axis numbers and writes down that only 3 footballs are in stock.',
  'mistake.H2.s3': 'He announces that the school needs to order more footballs immediately.',
  'mistake.H2.fine1': 'Sound step: observing the bar reaching mark 3 is accurate.',
  'mistake.H2.fine3': 'Step 3 fails because he counted grid lines instead of reading axis values.',
  'mistake.H2.found':
    'Here! The axis steps by 5s (0, 5, 10, 15). Grid line 3 corresponds to 3 × 5 = 15 footballs, not 3!',
  'explain.H2.s':
    'The height of a bar represents its count according to the {0} on the axis. All bars in a graph must have equal {1} and start from the same baseline.',
  'explain.H2.scale': 'scale',
  'explain.H2.color': 'color',
  'explain.H2.width': 'width',
  'explain.H2.height': 'height',
  'explain.H2.hint':
    'Check what sets the value of grid marks, and what property must remain identical across all bars.',
  'know.H2': 'The height of the bar tells the count; always read the scale on the side.',

  /* L4 */
  'prashna.L4.q': 'What comes next in the sequence: 3, 7, 11, 15, ___?',
  'prashna.L4.c1': '18',
  'prashna.L4.c2': '19',
  'prashna.L4.c3': '20',
  'prashna.L4.a':
    'The difference between terms is always +4 (7-3=4, 11-7=4, 15-11=4). So the next term is 15 + 4 = 19!',
  'bodha.L4.what':
    'A sequence is a train of numbers where every step follows the exact same mathematical rule.',
  'bodha.L4.can':
    'Find difference ladders, test pattern operations, and predict future terms without guessing.',
  'bodha.L4.idea':
    'Build a difference ladder: subtract each number from the next to uncover the hidden jump between steps.',
  'bodha.L4.why':
    'Once you know the jump (e.g. add 4 each time), you can predict any future number without guessing!',
  'bodha.L4.example': 'Finding what comes next:',
  'bodha.L4.example1': 'Step 1: Write terms: 3, 7, 11, 15.',
  'bodha.L4.example2': 'Step 2: Difference ladder: 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4 (Rule: +4).',
  'bodha.L4.example3': 'Step 3: Next term is 15 + 4 = 19.',
  'bodha.L4.where':
    'Calendar days (add 7 for next Monday), bus schedules, tile borders, and spiral shells.',
  'bodha.L4.sutra': 'Find what connects one step to the next: the rule tells you what comes next.',
  'sequences.title': 'What Comes Next? (Sequence Rules & Difference Ladders)',
  'sequences.lead':
    'Inspect difference ladders, test pattern operations (+, -, ×), and calculate distant sequence terms.',
  'sequences.difference_ladder': 'Difference Ladder',
  'sequences.terms': 'Sequence Terms',
  'sequences.rule': 'Rule:',
  'sequences.next_term': 'Next Term:',
  'sequences.distant_predictor': 'Distant Term Predictor',
  'sequences.step1': '1. Arithmetic Ladders (+4, +5, -3)',
  'sequences.step2': '2. Doubling Tree vs Adding Trap',
  'sequences.step3': '3. Distant Term Predictor (10th Term)',
  'sequences.reset': 'Reset',
  'mistake.L4.intro': 'Gita is looking at the doubling sequence: 2, 4, 8, 16, ___:',
  'mistake.L4.s1': 'She notices that 4 is 2 × 2, 8 is 4 × 2, and 16 is 8 × 2.',
  'mistake.L4.s2': 'She forgets the doubling rule and adds the previous difference (16 + 8 = 24).',
  'mistake.L4.s3': 'She concludes that the next number in the train must be 24.',
  'mistake.L4.fine1': 'Sound observation: the sequence doubles at every step.',
  'mistake.L4.fine3':
    'Step 3 fails because she switched operations from multiplying by 2 to adding 8.',
  'mistake.L4.found':
    'Here! The sequence multiplies by 2 at each step. The next term is 16 × 2 = 32, not 24!',
  'explain.L4.s':
    'To find what comes next in a sequence, we discover the unchanging {0} between steps. In the sequence 5, 10, 15, 20, the rule is to add {1} at every step.',
  'explain.L4.rule': 'rule',
  'explain.L4.guess': 'guess',
  'explain.L4.color': 'color',
  'explain.L4.five': 'five',
  'explain.L4.ten': 'ten',
  'explain.L4.two': 'two',
  'explain.L4.hint':
    'Think about what invariant connects every term, and how much is added from 5 to 10 to 15.',
  'know.L4': 'Find what connects one step to the next: the rule tells you what comes next.',

  /* P1 */
  'prashna.P1.q':
    'In a dot triangle, row 1 has 1 dot, row 2 has 2 dots, row 3 has 3 dots. How many total dots are in a 4-row triangle?',
  'prashna.P1.c1': '7 dots',
  'prashna.P1.c2': '10 dots',
  'prashna.P1.c3': '12 dots',
  'prashna.P1.a':
    'Add every row layer: 1 + 2 + 3 + 4 = 10 dots! Each new row adds its row number of dots.',
  'bodha.P1.what':
    'Growing patterns are shapes made of dots or tiles that expand stage by stage according to a geometric rule.',
  'bodha.P1.can':
    'Build triangular dot stacks, expand square tile grids, and track layer-by-layer growth.',
  'bodha.P1.idea':
    'In a dot triangle, each new stage adds a whole new bottom row: stage 1 has 1; stage 2 adds 2 (total 3); stage 3 adds 3 (total 6).',
  'bodha.P1.why':
    'Square patterns grow by adding an L-shaped border around the previous square: 1, 4, 9, 16, 25 (each stage n has n × n dots).',
  'bodha.P1.example': 'Building growing shapes:',
  'bodha.P1.example1': 'Step 1: Stage 1 = 1 dot.',
  'bodha.P1.example2': 'Step 2: Stage 2 = 1 + 2 = 3 dots; Stage 3 = 1 + 2 + 3 = 6 dots.',
  'bodha.P1.example3': 'Step 3: Stage 4 = 1 + 2 + 3 + 4 = 10 dots.',
  'bodha.P1.where':
    'Kolam border expansions, staircases, brick pyramid construction, and pinecones.',
  'bodha.P1.sutra': 'Each new stage adds a new layer; see how the shape grows to find the count.',
  'growing.title': 'Growing Patterns (Figurate & Triangular Numbers)',
  'growing.lead':
    'Step through stages, watch new layers glow, and contrast triangular sums with square grids.',
  'growing.pattern_type': 'Pattern Type',
  'growing.triangular': 'Dot Triangle',
  'growing.square': 'Square Grid',
  'growing.stage': 'Stage:',
  'growing.new_layer': 'New Layer Added:',
  'growing.total_dots': 'Total Count:',
  'growing.step1': '1. Dot Triangle Layers (1, 3, 6, 10)',
  'growing.step2': '2. Square Gnomon Grid (1, 4, 9, 16, 25)',
  'growing.step3': '3. Growth Table & Misconception Lab',
  'growing.reset': 'Reset',
  'mistake.P1.intro':
    'Amit is looking at a square tile pattern growing stage by stage (1, 4, 9, 16...):',
  'mistake.P1.s1':
    'He counts that Stage 1 has 1 tile, Stage 2 has 4 tiles, and Stage 3 has 9 tiles.',
  'mistake.P1.s2': 'To predict Stage 5, he multiplies the stage number by 2 (5 × 2 = 10).',
  'mistake.P1.s3': 'He claims that Stage 5 will have 10 tiles.',
  'mistake.P1.fine1': 'Accurate observation: counting the earlier stages is sound.',
  'mistake.P1.fine3':
    'Step 3 fails because square tile growth is quadratic (n × n), not linear multiplication (n × 2).',
  'mistake.P1.found': 'Here! A square of side 5 has 5 rows of 5 tiles = 5 × 5 = 25 tiles, not 10!',
  'explain.P1.s':
    'In a growing pattern, each stage adds a new {0} of tiles or dots. A square pattern of side length four contains {1} total tiles.',
  'explain.P1.layer': 'layer',
  'explain.P1.border': 'border',
  'explain.P1.corner': 'corner',
  'explain.P1.sixteen': 'sixteen',
  'explain.P1.eight': 'eight',
  'explain.P1.twelve': 'twelve',
  'explain.P1.hint':
    'Think about what geometric element expands each stage, and compute 4 × 4 for the square.',
  'know.P1': 'Each new stage adds a new layer; see how the shape grows to find the count.',

  /* Spot-the-mistake equation lines: <s> struck, <r> highlighted. */
  'mistake.H1.eq':
    'Multiply the icon count by the key scale: 3 icons × 10 bicycles = <r>30 bicycles</r>, not 3',
  'mistake.H2.eq':
    'Multiply the line height by the axis step: 3 grid lines × 5 units = <r>15 units</r>, not 3',
  'mistake.L4.eq': 'The rule is multiplying by 2: next term is 16 × 2 = <r>32</r>, not 24',
  'mistake.P1.eq': 'A square of side 5 has 5 rows of 5 tiles: 5 × 5 = <r>25 tiles</r>, not 10',
  'mistake.U2.eq':
    '1 metre has 100 cm, so 5 cm is 0.05 m; 4 m 5 cm is <r>4.05 m</r>, not 4.5 m (which is 4 m 50 cm)',
  'mistake.U3.eq':
    'Minutes roll at 60 (50 min + 10 min = 60 min -> 15:00); remaining 15 min gives <r>15:15</r>, not 14:75',

  /* Bench UI (U2 metric) */
  'metric.tab1': '1. Length Ladder',
  'metric.tab2': '2. Mass & Capacity',
  'metric.tab3': '3. Dual Balance',
  'metric.lengthFeedback':
    'Converting {val} {unit}. Notice how decimal places shift by powers of 10!',
  'metric.massCapacityFeedback':
    'Explore mass (grams) and capacity (litres). Both scale by powers of 10!',
  'metric.valueLabel': 'Value: {val}',
  'metric.baseUnit': 'Base Unit:',
  'metric.ladderRule':
    'Rule: Moving down the ladder (larger to smaller unit) shifts the decimal dot right (multiply). Moving up (smaller to larger) shifts the dot left (divide).',
  'metric.ladder_km_mult': '1000 m',
  'metric.ladder_m_mult': '1 m (Base)',
  'metric.ladder_cm_mult': '1/100 m',
  'metric.ladder_mm_mult': '1/1000 m',
  'metric.massToggle': 'Mass (g, kg, mg)',
  'metric.capacityToggle': 'Capacity (L, mL, kL)',
  'metric.massLabel': 'Mass: {val} {unit}',
  'metric.capacityLabel': 'Capacity: {val} {unit}',
  'metric.preset_cm_m': '250 cm vs 2 m',
  'metric.preset_m_decimal': '4 m 5 cm vs 4.05 m',
  'metric.preset_kg_g': '1.5 kg vs 1500 g',
  'metric.preset_mL_L': '750 mL vs 0.75 L',
  'metric.base_metres': 'metres',
  'metric.base_grams': 'grams',
  'metric.base_litres': 'litres',
  'metric.compareBalanced':
    'Balanced! {leftVal} {leftUnit} equals {rightVal} {rightUnit} ({leftBase} {base}).',
  'metric.compareLeftGreater':
    '{leftVal} {leftUnit} ({leftBase} {base}) is larger than {rightVal} {rightUnit} ({rightBase} {base})!',
  'metric.compareRightGreater':
    '{rightVal} {rightUnit} ({rightBase} {base}) is larger than {leftVal} {leftUnit} ({leftBase} {base})!',
  'metric.decimalTrap':
    'Careful with decimals: 4 m 5 cm is 4.05 m (5 hundredths). 4.5 m means 4 m 50 cm (5 tenths)!',
  'metric.convReadout': '{conv} {unit}',
  'metric.deltaPlus': '+{d}',
  'metric.deltaMinus': '{d}',

  /* Bench UI (U3 timeclock) */
  'timeclock.tab1': '1. Dual Clock Dial',
  'timeclock.tab2': '2. Base-60 Minute Roll',
  'timeclock.tab3': '3. Hour Bridging Timeline',
  'timeclock.dualFeedback': '24-Hour Railway Time: {t24} is equivalent to Standard Clock: {t12}.',
  'timeclock.railwayPill': 'Railway Time (24h)',
  'timeclock.standardPill': '12-Hour Clock',
  'timeclock.hourLabel': 'Hour (0-23): {h}',
  'timeclock.minuteLabel': 'Minute (0-59): {m}',
  'timeclock.deltaHourPlus': '+{h}h',
  'timeclock.deltaHourMinus': '{h}h',
  'timeclock.deltaMinPlus': '+{m}m',
  'timeclock.deltaMinMinus': '{m}m',
  'timeclock.presetTrain': 'Train Ticket (21:30)',
  'timeclock.presetSchool': 'Morning School (08:30)',
  'timeclock.presetNoon': 'Noon (12:00)',
  'timeclock.presetMidnight': 'Midnight (00:00)',
  'timeclock.rollFeedback': 'Adding {add} minutes to {start}: Time rolls in base 60!',
  'timeclock.rollStep1': '1. Direct minute addition:',
  'timeclock.rollStep1eq': '{a} min + {b} min = {sum} min',
  'timeclock.rollStep2': '2. Roll at 60 (Base 60):',
  'timeclock.rollStep2eq': '{sum} min = +{hrs} hr and {rem} min remaining',
  'timeclock.rollStep3': '3. Correct Clock Time:',
  'timeclock.rohanTrap':
    "Rohan's Mistake Trap: Adding digits base-10 gives 14:75. But minutes stop at 59! There is NO such time as 14:75. The true time is {correct}.",
  'timeclock.rohanTrapBtn': 'Rohan Trap (+25 min)',
  'timeclock.addMin': '+{m} min',
  'timeclock.bridgeFeedback': 'Elapsed duration from {start} to {end} is {dur}.',
  'timeclock.hopLine': 'Hop {n}: {from} ➔ {to}',
  'timeclock.hopMinutes': '+{m} min',
  'timeclock.presetsTitle': 'Journey Timetable Presets:',
  'timeclock.presetMorning': '09:45 to 12:15 (Morning Intercity)',
  'timeclock.presetExpress': '14:50 to 18:20 (Express)',
  'timeclock.presetOvernight': '21:30 to 06:15 (Overnight Sleeper)',

  /* Bench UI (H1 pictograph) */
  'pictograph.tab1': '1. Fruit Survey Chart',
  'pictograph.tab2': '2. Scale Multiplier Explorer',
  'pictograph.tab3': '3. Half-Icon Fractional Tally',
  'pictograph.keyFeedback': 'Key: 1 symbol represents {key} items. Multiply symbols by the key!',
  'pictograph.keyBanner': 'Key: 1 Symbol = {key} Fruits',
  'pictograph.scaleBtn': 'Scale: {sc}',
  'pictograph.rowTotal': '{total} fruits',
  'pictograph.noSymbols': 'No symbols stamped yet',
  'pictograph.clear': 'Clear',
  'pictograph.grandTotal': 'Survey Grand Total:',
  'pictograph.grandTotalVal': '{total} Fruits',
  'pictograph.scaleFeedback': '{icons} symbols with key {key} represents {total} items total.',
  'pictograph.scaleEq': '{icons} icons × Key {key} =',
  'pictograph.scaleResult': '{total} Items',
  'pictograph.anitaTrap':
    "Anita's Mistake Trap: Anita counted 3 bicycle icons where 1 icon = 10 bicycles. She wrote 3 instead of 30!",
  'pictograph.halfFeedback':
    '{full} full and {half} half icons with key {key}: total = {total} items.',
  'pictograph.addFull': '+ Full',
  'pictograph.addHalf': '+ Half',
  'pictograph.fruitMango': 'Mangoes',
  'pictograph.fruitApple': 'Apples',
  'pictograph.fruitBanana': 'Bananas',
  'pictograph.iconsLabel': 'Icons:',
  'pictograph.keyShort': 'Key:',
  'pictograph.keyOneEquals': '1 = {sc}',
  'pictograph.rowName': '{name} ({symbol})',
  'pictograph.addFullSymbol': '+ 1 {symbol} (+{key})',
  'pictograph.addHalfSymbol': '+ ½ {symbol} (+{half})',
  'pictograph.halfKeyFeedback':
    'Key: 1 book icon = {key} students. A half icon = {half} students. Total = {total} students.',
  'pictograph.halfStep1': 'Step 1: Key: 1 book icon = {key} students. Half icon = {half} students.',
  'pictograph.halfStep2': 'Step 2: {full} full icons = {full} × {key} = {fullTotal} students.',
  'pictograph.halfStep3': 'Step 3: {halfCount} half icon = {halfTotal} students.',
  'pictograph.halfStepTotal':
    'Total for {full}½ icons = {fullTotal} + {halfTotal} = {total} students',
  'pictograph.presetHalf1': '3½ icons (Key 4) → 14',
  'pictograph.presetHalf2': '2½ icons (Key 10) → 25',
  'pictograph.presetHalf3': '4 icons (Key 5) → 20',
  'pictograph.fullIconChar': '📚',
  'pictograph.halfIconChar': '½📚',

  /* Bench UI (H2 bargraph) */
  'bargraph.tab1': '1. Standard Bar Graph',
  'bargraph.tab2': '2. Scale Multipliers',
  'bargraph.tab3': '3. Jaal B1 Food Intake',
  'bargraph.axisFeedback':
    'Axis step interval is {step}. Each grid mark increases by {step} units.',
  'bargraph.axisStepLabel': 'Axis Step: {step} units / mark',
  'bargraph.stepBtn': 'Step {st}',
  'bargraph.barLabel': '{category}: {value} ({grid} grid marks)',
  'bargraph.lineDown': '-1 line',
  'bargraph.lineUp': '+1 line',
  'bargraph.readFeedback':
    'A bar reaching grid mark {mark} on an axis with step {step} represents {value} units.',
  'bargraph.lineMark': 'Line Mark {mark} × Step {step} =',
  'bargraph.unitsVal': '{val} Units',
  'bargraph.vikramTrap':
    "Vikram's Mistake Trap: Vikram looked at footballs on line mark 3 with step 5 and wrote 3 instead of 15!",
  'bargraph.lineMarkLabel': 'Line Mark:',
  'bargraph.lineN': 'Line {m}',
  'bargraph.axisStepShort': 'Axis Step:',
  'bargraph.jaalLink':
    'Jaal Link (Vijnana B1 Digestion ↔ Ganita H2 Bar Graphs): Daily food intake by nutrient group.',
  'bargraph.verticalBars': 'Vertical Bars',
  'bargraph.horizontalBars': 'Horizontal Bars',
  'bargraph.jaalNote':
    'Vijnana B1 Connection: A balanced diet requires proteins, carbohydrates, vitamins and minerals.',
  'bargraph.foodRice': 'Rice & Roti',
  'bargraph.foodDal': 'Dal & Pulses',
  'bargraph.foodGreens': 'Greens & Veggies',
  'bargraph.foodMilk': 'Milk & Curd',
  'bargraph.readFeedbackEq':
    'A bar reaching grid mark {mark} on an axis with step {step} represents {mark} × {step} = {val}!',
  'bargraph.vikramTrapLong':
    "Vikram's Mistake Trap: Vikram looked at footballs on line mark 3 with axis step 5, and thought there were only 3 footballs! But 3 grid marks × 5 units = 15 footballs! Always read the side axis scale.",
  'bargraph.jaalFeedbackShort':
    'Jaal Link (Vijnana B1 Digestion ↔ Ganita H2 Bar Graphs): Daily nutrient intake comparison.',
  'bargraph.foodRow': '{category} ({nutrient})',
  'bargraph.foodCount': '{count}g',
  'bargraph.jaalNoteLong':
    'Vijnana B1 Connection: A balanced diet requires proteins, carbs, and vitamins in proportion. Bar graphs help dieticians visualize whether food intake is balanced!',

  /* Bench UI (L4 sequences) */
  'sequences.tab1': '1. Arithmetic Ladders (+4, +5, -3)',
  'sequences.tab2': '2. Doubling Tree vs Adding Trap',
  'sequences.tab3': '3. Distant Term Predictor (10th Term)',
  'sequences.arithFeedback':
    'The difference between every term is constant ({diff}). The next term is {last} + {diff} = {next}!',
  'sequences.nonArithFeedback': 'Differences are not uniform. Check the steps carefully.',
  'sequences.diffJumps': 'Difference Ladder Jumps: [{jumps}]',
  'sequences.nextLabel': 'Next = {next}',
  'sequences.appendStep': '+ Append Next Step',
  'sequences.removeStep': '- Remove Last Step',
  'sequences.doublingFeedback':
    'Differences change (+2, +4, +8), but the multiplier is constant (×2)! The next term is 16 × 2 = {next}!',
  'sequences.diffLadderNotArith':
    'Difference Ladder: +{d1}, +{d2}, +{d3} (Not an arithmetic jump!)',
  'sequences.multLadderInvariant':
    'Multiplier Ladder: 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16 (Invariant Rule: ×2)',
  'sequences.gitaTrapLong':
    "Gita's Mistake Trap: Gita noticed 16 and added 8 to guess 24! But 8 was just the previous jump. The invariant rule is multiplying by 2 at every step: 16 × 2 = 32!",
  'sequences.diffLadderSample': 'Difference Ladder: +{d1}, +{d2}, +{d3}…',
  'sequences.multLadderSample':
    'Multiplier Ladder: 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16 (Invariant ×2)',
  'sequences.distantFeedback': 'Predicting term #{n} without writing every step: {formula}',
  'sequences.baseSequence': 'Base Sequence: 3, 7, 11, 15... (Starts at 3, jump is +4)',
  'sequences.termDown': '-1 Term',
  'sequences.termUp': '+1 Term',
  'sequences.termLabel': 'Term #{n}',
  'sequences.formulaLine': 'Formula: 3 + ({n} - 1) × 4 = 3 + {nm1} × 4',
  'sequences.termResult': 'Term #{n} = {val}',

  /* Bench UI (P1 growing) */
  'growing.tab1': '1. Dot Triangle Layers',
  'growing.tab2': '2. Square Gnomon Grid',
  'growing.tab3': '3. Growth Table & Lab',
  'growing.triFeedbackLong':
    'Stage {stage} adds a bottom row of {added} dots! Total dots = {sum} = {total}!',
  'growing.stageDown': '-1 Stage',
  'growing.stageTitle': 'Stage {stage} Triangle',
  'growing.stageUp': '+1 Stage',
  'growing.bottomRow': 'Bottom Row Added: +{added} dots',
  'growing.totalDotsLabel': 'Total: {total} Dots',
  'growing.sqFeedbackBorder':
    'A square of side {side} has {side} × {side} = {total} tiles! The added outer L-shaped border has {gnomon} tiles!',
  'growing.sideDown': '-1 Side',
  'growing.sideTitle': 'Side {side} Square ({side} × {side})',
  'growing.sideUp': '+1 Side',
  'growing.gnomonLabel': 'Added L-Gnomon: +{gnomon} tiles',
  'growing.totalTilesLabel': 'Total: {total} Tiles',
  'growing.contrastNote':
    'Contrast: triangular numbers grow by +n at each stage; square numbers reach n × n by adding the odd numbers 1, 3, 5, 7…',
  'growing.amitTrapLong':
    "Amit's Mistake Trap: Amit looked at Stage 5 and computed 5 × 2 = 10! But a square is a 2D shape with 5 rows and 5 columns: 5 × 5 = 25 tiles, not 10!",
  'growing.tableStage': 'Stage (n)',
  'growing.tableTri': 'Triangle T_n',
  'growing.tableSq': 'Square n²',
  'growing.tableAmit': "Amit's Guess (2n)",
  'growing.tableRowStage': 'Stage {n}',
  'sequences.preset.prashna-add4': 'Add-4 train',
  'sequences.preset.fives-pattern': 'Fives ladder',
  'sequences.preset.doubling-geom': 'Doubling tree',
  'sequences.preset.countdown-sub3': 'Countdown steps',
  'bargraph.cat.footballs': 'Footballs',
  'bargraph.cat.cricketBats': 'Cricket bats',
  'bargraph.cat.rackets': 'Rackets',
  'bargraph.cat.helmets': 'Helmets',
  'timeclock.dur.hm': '{h} hr {m} min',
  'timeclock.dur.h': '{h} hr',
  'timeclock.dur.m': '{m} min',
  'timeclock.hop.bridge': 'Bridge {m} min to the next whole hour',
  'timeclock.hop.leap': 'Leap {h} whole hours',
  'timeclock.hop.rest': 'Add the last {m} min to arrive',
};
