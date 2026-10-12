/* English strings for the Ganita lessons in number and operations: N2 N4 N5 A1 A2 A3 D2 D4. */
export const dictionary: Record<string, string> = {
  /* N2 Roman Numerals */
  'prashna.N2.q': 'How do you write the number 4 in Roman numerals?',
  'prashna.N2.c1': 'IIII',
  'prashna.N2.c2': 'IV',
  'prashna.N2.c3': 'VI',
  'prashna.N2.a':
    'IV. In Roman numerals, a smaller symbol placed before a larger one subtracts: 5 - 1 = 4. Symbols are never repeated four times.',
  'bodha.N2.what':
    '[[roman|Roman numerals]] are an ancient system of writing numbers using seven letters: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000).',
  'bodha.N2.can':
    'You will be able to read and write Roman numerals, use additive and subtractive rules, and avoid repeating symbols.',
  'gloss.add': 'Put two amounts together to find how many there are in all.',
  'gloss.subtract': 'Take one amount away from another to find how many are left.',
  'bodha.N2.idea':
    'Roman numerals do not use place value. Putting a smaller symbol to the right [[add|adds]] it (VI = 5 + 1 = 6); putting it to the left [[subtract|subtracts]] it (IV = 5 - 1 = 4).',
  'bodha.N2.why':
    'Only I, X, C, M can repeat, and never more than three times. V, L, D are never repeated and never subtracted. There is no symbol for zero.',
  'bodha.N2.example': 'Write 24 and 45 in Roman numerals.',
  'bodha.N2.example1': '24 is 20 + 4: XX + IV = XXIV.',
  'bodha.N2.example2':
    '45 is 40 + 5. 40 is 50 - 10 (XL). So 45 is XL + V = XLV (never VL, because V is never subtracted).',
  'bodha.N2.where':
    'Clock dials, book chapter headings, monarch titles (King Charles III), and school classes (Class V).',
  'bodha.N2.sutra':
    'To the right adds, to the left subtracts, and no symbol repeats more than three times.',
  'gloss.roman': 'A number system from ancient Rome that uses seven letters without place value.',
  'gloss.roman.en': 'Roman numerals',
  'roman.title': 'Roman numerals',
  'roman.art': 'A stone slate showing Roman numeral tiles I, V, X, L, and C.',
  'roman.s1': 'Tap the stone tiles to explore how Roman symbols combine.',
  'roman.s1done':
    'Notice: placing a smaller symbol after adds to it; placing it before subtracts from it.',
  'roman.s2': 'Your turn: build target numbers on the stone slate.',
  'roman.s2build': 'Build {n} ({roman}):',
  'roman.s2done': 'You assembled {n} ({roman}) tile by tile.',
  'roman.s3': 'How should the number 40 be written?',
  'roman.s3done': 'Exactly! No symbol repeats four times, so 40 is written as 50 - 10: XL.',
  'roman.s3tryRepeat': 'Remember the rule: no symbol may be repeated more than three times.',
  'roman.s3try': 'Think of 50 (L) minus 10 (X): XL.',
  'mistake.N2.intro': 'Aman wrote 45 in Roman numerals. One step went wrong. Which one?',
  'mistake.N2.s1': '45 is 40 + 5.',
  'mistake.N2.s2': 'To make 40, subtract 5 from 50 (50 - 5).',
  'mistake.N2.s3': 'So 45 is written as VL.',
  'mistake.N2.s4': '45 = VL.',
  'mistake.N2.fine1': 'That is right: breaking 45 into tens and ones is correct.',
  'mistake.N2.fine4': 'This just writes down the earlier step. Look earlier.',
  'mistake.N2.found':
    'Here. The symbols V, L, D are never subtracted! To make 40, subtract X from L (XL). So 45 is XLV, not VL.',
  'explain.N2.s':
    'A smaller symbol before a larger one {0}. In Roman numerals, a symbol never repeats more than {1} times.',
  'explain.N2.subtracts': 'subtracts',
  'explain.N2.adds': 'adds',
  'explain.N2.multiplies': 'multiplies',
  'explain.N2.three': 'three',
  'explain.N2.five': 'five',
  'explain.N2.ten': 'ten',
  'explain.N2.hint':
    'Look at IV (5 - 1): does I add or subtract? How many times in a row can I or X appear?',
  'know.N2':
    'You can read and write Roman numerals using addition, subtraction, and the three-repetition rule.',

  /* N4 Fractions of a Collection */
  'prashna.N4.q': 'How many apples is 1/3 of a basket of 12 apples?',
  'prashna.N4.c1': '3 apples',
  'prashna.N4.c2': '4 apples',
  'prashna.N4.c3': '6 apples',
  'prashna.N4.a': '4 apples. To find 1/3 of 12, share 12 into 3 equal groups: 12 ÷ 3 = 4.',
  'bodha.N4.what':
    'A [[collection|collection]] of items can be divided into equal parts just like a single whole object.',
  'bodha.N4.can':
    'You will be able to find fractions of a collection and add fractions with equal denominators without adding the denominators.',
  'bodha.N4.idea':
    'The bottom number (denominator) tells you how many equal baskets to share into; the top number (numerator) tells you how many baskets to take.',
  'bodha.N4.why':
    'When adding like fractions, the size of each basket does not change—only the count of baskets is added together.',
  'bodha.N4.example': 'Find 2/3 of 18 marbles.',
  'bodha.N4.example1':
    'Step 1: Look at the denominator (3). Share 18 marbles into 3 equal baskets: 18 ÷ 3 = 6 marbles in each basket.',
  'bodha.N4.example2':
    'Step 2: Look at the numerator (2). Take 2 of those baskets: 2 × 6 = 12 marbles.',
  'bodha.N4.example3': 'Step 3: So 2/3 of 18 is 12 marbles.',
  'bodha.N4.where':
    'Sharing sweets with friends, calculating minutes in 3/4 of an hour, or knowing how many pages of a book you have finished.',
  'bodha.N4.sutra':
    'The bottom number groups the set into equal baskets; the top counts the baskets you take.',
  'gloss.collection': 'A group of distinct objects considered together as a single whole.',
  'gloss.collection.en': 'collection',
  'collection.title': 'Fractions of a collection',
  'collection.art': 'A tray with marbles sorted into equal rings.',
  'collection.s1': 'Share 12 items into equal rings.',
  'collection.s1done':
    '12 items shared into equal rings. Notice how the denominator decides the ring count.',
  'collection.s2': 'Tap rings to take fractions of 16 items.',
  'collection.s2done': 'You selected {num} of {den} rings: {total} items taken.',
  'collection.s3': 'Combine like fractions: 1/5 + 2/5.',
  'collection.s3done': 'The baskets are still fifths: 1/5 + 2/5 = 3/5.',
  'collection.s3wrong': '10 would mean cutting into 10 baskets. Our baskets are still fifths.',
  'mistake.N4.intro': 'Rahul added two like fractions. One step went wrong. Which one?',
  'mistake.N4.s1': 'Both fractions have fifths as their parts.',
  'mistake.N4.s2': 'Add the top numbers: 2 + 1 = 3.',
  'mistake.N4.s3': 'Add the bottom numbers: 5 + 5 = 10.',
  'mistake.N4.s4': 'So 2/5 + 1/5 = 3/10.',
  'mistake.N4.fine1': 'That is sound: identifying that both have the same denominator is true.',
  'mistake.N4.fine2': 'That is sound: numerators count the parts, so they are added.',
  'mistake.N4.fine4': 'This just writes down the earlier calculation. Look earlier.',
  'mistake.N4.found':
    'The parts are fifths; adding the amounts does not double the number of parts. The bottom number stays 5: 3/5.',
  'explain.N4.s':
    'When adding fractions with the same bottom number, the denominator {0} and only the numerators {1}.',
  'explain.N4.stays': 'stays',
  'explain.N4.changes': 'changes',
  'explain.N4.doubles': 'doubles',
  'explain.N4.add': 'add',
  'explain.N4.multiply': 'multiply',
  'explain.N4.subtract': 'subtract',
  'explain.N4.hint':
    'Look at the baskets: does combining two groups change the total size of each basket? Or do you just count how many baskets you took?',
  'know.N4':
    'A fraction of a collection divides the total items into equal baskets; when adding fractions with the same denominator, the denominator stays the same.',

  /* N5 Tenths and Hundredths */
  'prashna.N5.q': 'Which is longer: 0.4 cm or 0.09 cm?',
  'prashna.N5.c1': '0.09 cm (because 9 is greater than 4)',
  'prashna.N5.c2': '0.4 cm (4 tenths is 40 hundredths)',
  'prashna.N5.c3': 'They are the same length',
  'prashna.N5.a':
    '0.4 cm. 4 tenths equals 40 hundredths, which is much longer than 9 hundredths (0.09 cm).',
  'bodha.N5.what':
    '[[decimals|Decimals]] zoom into the space between whole numbers using steps of ten, like millimeter marks between centimeters.',
  'bodha.N5.can':
    'You will be able to read and compare tenths and hundredths, understand place value after the dot, and see why trailing zeroes do not change the size.',
  'bodha.N5.idea':
    'The decimal point separates wholes from parts. The first house counts tenths (strips of 10); the second house counts hundredths (single tiles).',
  'bodha.N5.why':
    'Each house to the right is ten times smaller. 5 tenths equals 50 hundredths, so 0.5 is much larger than 0.15.',
  'bodha.N5.example': 'Decompose 1.35 meters into its parts.',
  'bodha.N5.example1': 'Step 1: The whole number before the dot is 1 full meter.',
  'bodha.N5.example2': 'Step 2: The first digit after the dot is 3 tenths of a meter (30 cm).',
  'bodha.N5.example3':
    'Step 3: The second digit is 5 hundredths of a meter (5 cm): 1 m + 30 cm + 5 cm = 1.35 m.',
  'bodha.N5.where':
    'Clinical digital thermometers (37.2°C), Olympic sprint finish timers (9.58 s), and price tags in rupees and paise.',
  'bodha.N5.sutra':
    'Each step past the dot is ten times smaller: compare the tenths house first, not how many digits you see.',
  'gloss.decimals':
    'Numbers with a decimal point that represents fractions with denominators of 10, 100, or other powers of ten.',
  'gloss.decimals.en': 'decimals',
  'decimals.title': 'Tenths and hundredths',
  'decimals.art': 'A 10 by 10 base-ten grid showing shaded strips and tiles.',
  'decimals.s1': 'Shade strips of tenths and single hundredths.',
  'decimals.s1done': '{val} = {hundredths}/100: {tenths} tenths and {h} hundredths.',
  'decimals.s2': 'Compare two decimals side by side.',
  'decimals.s2done': '5 tenths is 50 hundredths; 50 is more than 15: 0.5 > 0.15.',
  'decimals.s3': 'Notice trailing zero conservation.',
  'decimals.s3done': '5 tenths and 50 hundredths cover the exact same space: 0.5 = 0.50.',
  'mistake.N5.intro': 'Priya compared 0.7 and 0.15. One step went wrong. Which one?',
  'mistake.N5.s1': 'We want to compare 0.7 and 0.15.',
  'mistake.N5.s2': 'Look at the numbers after the dot: 7 and 15.',
  'mistake.N5.s3': '15 is bigger than 7.',
  'mistake.N5.s4': 'So 0.15 is greater than 0.7.',
  'mistake.N5.fine1': 'That is sound: stating the two decimals to compare is clear.',
  'mistake.N5.fine3':
    '15 is indeed greater than 7 in whole numbers, but look at how she read the decimals.',
  'mistake.N5.fine4': 'This conclusion came from the wrong reading earlier. Look earlier.',
  'mistake.N5.found':
    '0.7 has 7 tenths (70 hundredths), while 0.15 has only 1 tenth. Compare the tenths house first.',
  'explain.N5.s':
    'The first digit after the dot counts {0}, and decimal size is decided by {1} not digit length.',
  'explain.N5.tenths': 'tenths',
  'explain.N5.hundredths': 'hundredths',
  'explain.N5.wholes': 'wholes',
  'explain.N5.place': 'place',
  'explain.N5.length': 'length',
  'explain.N5.zeros': 'zeros',
  'explain.N5.hint':
    'Look at the houses after the dot: what does the first house count? Does having more digits make a decimal bigger?',
  'know.N5':
    'In decimals, each place after the dot is ten times smaller: 0.5 has 5 tenths (50 hundredths), which is larger than 0.15.',

  /* A1 Big Sums and Regrouping */
  'prashna.A1.q': 'To solve 500 - 247, what must you do first?',
  'prashna.A1.c1': 'Subtract 0 from 7 to get 7',
  'prashna.A1.c2': 'Exchange 1 hundred for 10 tens',
  'prashna.A1.c3': 'Subtract 2 from 5 directly',
  'prashna.A1.a':
    'Exchange 1 hundred for 10 tens. You cannot take 7 from 0, and the tens house is empty, so you unbundle 1 hundred first.',
  'bodha.A1.what':
    '[[regrouping|Regrouping]] is unbundling or bundling numbers between place value houses when operating on large amounts.',
  'bodha.A1.can':
    'You will be able to subtract across zeroes without inverting digits and add multi-digit numbers with clear columnar carrying.',
  'bodha.A1.idea':
    'Each place value house is worth ten times the house to its right. 1 hundred is 10 tens; 1 ten is 10 ones.',
  'bodha.A1.why':
    'Unbundling changes the appearance of a number without changing its value: 500 = 400 + 90 + 10.',
  'bodha.A1.example': 'Calculate 40,005 - 18,347 step by step.',
  'bodha.A1.example1':
    'Step 1: Unbundle 1 ten-thousand from 40,000 all the way to the ones house: 40,005 becomes 30,000 + 9,000 + 900 + 90 + 15.',
  'bodha.A1.example2':
    'Step 2: Subtract column by column: 15 - 7 = 8 ones, 9 - 4 = 5 tens, 9 - 3 = 6 hundreds.',
  'bodha.A1.example3':
    'Step 3: 9 - 8 = 1 thousand, and 3 - 1 = 2 ten-thousands: the result is 21,658.',
  'bodha.A1.where':
    'Counting changes in city census populations, library book collections, and bank treasury deposits.',
  'bodha.A1.sutra':
    'When a house does not have enough, take one from the left and make ten in your house.',
  'gloss.regrouping': 'Rearranging place value amounts into tens or ones to add or subtract.',
  'gloss.regrouping.en': 'regrouping',
  'regroup.title': 'Big sums & regrouping',
  'regroup.art': 'A columnar bead board showing place value houses with unbundling arrows.',
  'regroup.s1': 'Unbundle 500 across zeroes into 4 hundreds, 9 tens, and 10 ones.',
  'regroup.s1done': '500 = 400 + 90 + 10: The value is conserved.',
  'regroup.s2': 'Subtract 247 from 500 column by column.',
  'regroup.s2done': '500 - 247 = 253.',
  'regroup.s3': 'Add 678 + 456 by bundling columns of ten.',
  'regroup.s3done': '678 + 456 = 1134.',
  'mistake.A1.intro': 'Dev solved 704 - 358. One step went wrong. Which one?',
  'mistake.A1.s1': 'We want to subtract 358 from 704.',
  'mistake.A1.s2': 'In the ones column: 4 is smaller than 8, so subtract 4 from 8 to get 4.',
  'mistake.A1.s3': 'In the tens column: subtract 0 from 5 to get 5.',
  'mistake.A1.s4': 'In the hundreds column: 7 - 3 = 4, so the answer is 454.',
  'mistake.A1.fine1': 'That is sound: stating the problem is clear.',
  'mistake.A1.fine3':
    'This step repeated the same inverted subtraction. Look earlier where it started.',
  'mistake.A1.fine4': 'This just wrote down the result from earlier errors. Look earlier.',
  'mistake.A1.found':
    'Here. You cannot flip subtraction when the top digit is smaller! 4 cannot give 8, so you must unbundle from the hundreds house: 14 - 8 = 6.',
  'explain.A1.s':
    'When the top digit is smaller, we {0} from the left house which gives {1} to our house.',
  'explain.A1.unbundle': 'unbundle',
  'explain.A1.add': 'add',
  'explain.A1.multiply': 'multiply',
  'explain.A1.ten': 'ten',
  'explain.A1.one': 'one',
  'explain.A1.hundred': 'hundred',
  'explain.A1.hint': 'Remember: does 1 bead from the left turn into 1 or 10 beads in your house?',
  'know.A1':
    'Regrouping unbundles 1 from the higher place into 10 in the lower place, making big subtraction and addition smooth without inverting digits.',

  /* A2 Estimate First & Mental Benchmarks */
  'prashna.A2.q': 'Buying 48 notebooks at ₹98 each costs approximately how much?',
  'prashna.A2.c1': 'About ₹500',
  'prashna.A2.c2': 'About ₹5,000',
  'prashna.A2.c3': 'About ₹50,000',
  'prashna.A2.a': 'About ₹5,000. Round 48 to 50, and round ₹98 to ₹100: 50 × 100 = 5,000.',
  'bodha.A2.what':
    '[[estimation|Estimation]] means replacing prickly numbers with friendly round neighbors to get quick mental guardrails.',
  'bodha.A2.can':
    'You will be able to round numbers to friendly benchmarks and catch wild order-of-magnitude calculation errors before making mistakes.',
  'bodha.A2.idea':
    'Instead of calculating exact figures first, round to the nearest ten or hundred: 48 becomes 50, 98 becomes 100.',
  'bodha.A2.why':
    'Friendly estimation catches tenfold slip-ups: 50 × 100 = 5,000 immediately exposes 47,040 or 470 as wild mistakes.',
  'bodha.A2.example': 'Estimate 392 + 514 before finding the exact sum.',
  'bodha.A2.example1': 'Step 1: Round 392 to the nearest hundred: 400.',
  'bodha.A2.example2': 'Step 2: Round 514 to the nearest hundred: 500.',
  'bodha.A2.example3':
    'Step 3: Friendly sum is 400 + 500 = 900. Exact sum is 906, very close to 900!',
  'bodha.A2.where':
    'Estimating bus travel fuel, market grocery bills before reaching the billing counter, and godown storage space.',
  'bodha.A2.sutra': 'Round to friendly numbers before you calculate to catch the wild mistake.',
  'gloss.estimation':
    'Finding a value close enough to the right answer using friendly round numbers.',
  'gloss.estimation.en': 'estimation',
  'estimate.title': 'Estimate first & benchmarks',
  'estimate.art': 'A magnetic number line with friendly benchmark snap points.',
  'estimate.s1': 'Snap prickly numbers to friendly benchmarks.',
  'estimate.s1done': '48 snaps to 50, and 392 snaps to 400.',
  'estimate.s2': 'Build a Safe Zone for 29 × 41.',
  'estimate.s2done': 'Safe zone: 30 × 40 = 1200.',
  'estimate.s3': 'Test proposed answers against the Safe Zone.',
  'estimate.s3done': '8190 is a wild error: it is outside the safe zone for 20 × 40 = 800.',
  'mistake.A2.intro': 'Meera calculated 21 × 39. One step went wrong. Which one?',
  'mistake.A2.s1': 'We want to multiply 21 and 39.',
  'mistake.A2.s2': 'Round 21 to 20, and round 39 to 40.',
  'mistake.A2.s3': 'Multiplying gives 20 × 40 = 800 as our estimate.',
  'mistake.A2.s4': 'Her written calculation gave 8190, and she accepted it as the final answer.',
  'mistake.A2.fine1': 'That is sound: stating the multiplication problem is clear.',
  'mistake.A2.fine2': 'Rounding to 20 and 40 is sound.',
  'mistake.A2.fine3': 'Estimating 800 is sound.',
  'mistake.A2.found':
    'Here. An answer of 8190 is more than 10 times larger than the estimate of 800! Always check against your estimate to catch wild errors.',
  'explain.A2.s': 'Rounding gives a quick {0} that helps us check answers {1} we calculate.',
  'explain.A2.estimate': 'estimate',
  'explain.A2.exact': 'exact',
  'explain.A2.zero': 'zero',
  'explain.A2.before': 'before',
  'explain.A2.after': 'after',
  'explain.A2.never': 'never',
  'explain.A2.hint':
    'Do we use friendly rounding before or after calculating to set our safety zone?',
  'know.A2':
    'Estimating with friendly benchmarks creates a safe zone to catch wild calculation mistakes before accepting answers.',

  /* D2 Division as Repeated Subtraction */
  'prashna.D2.q': 'If 20 laddoos are packed into boxes of 4, how many boxes can be packed?',
  'prashna.D2.c1': '5 boxes',
  'prashna.D2.c2': '16 boxes',
  'prashna.D2.c3': '4 boxes',
  'prashna.D2.a': '5 boxes. 20 − 4 − 4 − 4 − 4 − 4 = 0, so 5 equal groups of 4 are carved out.',
  'bodha.D2.what':
    '[[quotition|Quotition]] (repeated subtraction) means packing items into boxes of a fixed group size until zero remains.',
  'bodha.D2.can':
    'You will be able to see division as backward hops on a number line, packing equal groups and finding quotients with remainders.',
  'bodha.D2.idea':
    'Instead of sharing sweets one by one onto plates, you repeatedly carve out full boxes from the total.',
  'bodha.D2.why':
    'Multiplication hops forward on the number line; division hops backward toward zero: 20 − 4 − 4 − 4 − 4 − 4 = 0 (5 hops).',
  'bodha.D2.example': 'Calculate 18 ÷ 6 using repeated subtraction hops.',
  'bodha.D2.example1': 'Hop 1: Start at 18, take away 6 to reach 12 (1 group packed).',
  'bodha.D2.example2': 'Hop 2: From 12, take away 6 to reach 6 (2 groups packed).',
  'bodha.D2.example3':
    'Hop 3: From 6, take away 6 to reach 0. Exactly 3 groups formed: 18 ÷ 6 = 3.',
  'bodha.D2.where':
    'Cutting a 2-meter ribbon into 25 cm hair ribbons, and packing 10-tablet medicine blister strips.',
  'bodha.D2.sutra':
    'Division is repeated subtraction: count how many times the group fits before zero.',
  'gloss.quotition': 'Division by repeatedly removing equal groups of a fixed size.',
  'gloss.quotition.en': 'quotition',
  'quotition.title': 'Repeated subtraction & grouping',
  'quotition.art': 'A backward number line where equal groups are packed into boxes.',
  'quotition.s1': 'Hop backward by 4 from 20 to pack boxes.',
  'quotition.s1done': 'Packed 5 boxes of 4: 20 ÷ 4 = 5.',
  'quotition.s2': 'Pack 22 laddoos into boxes of 5 and identify the remainder.',
  'quotition.s2done': 'Packed 4 boxes of 5, with 2 remaining in reserve: 22 ÷ 5 = 4 R 2.',
  'quotition.s3': 'Compare sharing sweets on plates vs packing in boxes.',
  'quotition.s3done':
    '20 shared onto 4 plates gives 5 each; 20 packed in boxes of 4 makes 5 boxes.',
  'mistake.D2.intro': 'Sita calculated 15 ÷ 3. One step went wrong. Which one?',
  'mistake.D2.s1': 'We have 15 items and want to divide into groups of 3.',
  'mistake.D2.s2': 'Subtract 3 from 15 once: 15 − 3 = 12.',
  'mistake.D2.s3': 'She stopped here and wrote the answer is 12.',
  'mistake.D2.fine1': 'That is sound: identifying 15 items and groups of 3 is correct.',
  'mistake.D2.fine2': 'Subtracting 3 gives 12, which is correct for step 1.',
  'mistake.D2.found':
    'Here. Division is repeated subtraction until zero or leftover! 12 is the remainder after just 1 hop, not the quotient. She must keep hopping until zero to find 5 groups.',
  'explain.D2.s':
    'Quotitive division counts how many {0} can be formed by repeatedly {1} until zero.',
  'explain.D2.groups': 'groups',
  'explain.D2.plates': 'plates',
  'explain.D2.adds': 'adds',
  'explain.D2.subtracting': 'subtracting',
  'explain.D2.multiplying': 'multiplying',
  'explain.D2.halving': 'halving',
  'explain.D2.hint': 'Does quotition count groups by subtracting repeatedly or by adding?',
  'know.D2':
    'Division as repeated subtraction counts the number of equal groups that fit into a total before reaching zero.',

  /* D4 Long Division Algorithm */
  'prashna.D4.q': 'When dividing 615 by 3, what digit belongs in the tens house of the quotient?',
  'prashna.D4.c1': '0',
  'prashna.D4.c2': '1',
  'prashna.D4.c3': '2',
  'prashna.D4.a':
    '0. Since 3 does not fit into 1 ten (0 times), write 0 in the tens house before bringing down the 5 ones!',
  'bodha.D4.what':
    'The [[long-division|long division]] algorithm breaks large multi-digit sharing into simple columnar steps: divide, multiply, subtract, and bring down.',
  'bodha.D4.can':
    'You will be able to perform standard long division step by step and master the Zero Gate to prevent tenfold errors.',
  'bodha.D4.idea':
    'Work house by house from left to right. When a house cannot share, write zero before opening the next door.',
  'bodha.D4.why':
    'Omitting a quotient zero turns 204 into 24—cutting the answer by ten! The Zero Gate keeps every place value in its rightful house.',
  'bodha.D4.example': 'Calculate 612 ÷ 3 using long division.',
  'bodha.D4.example1':
    'Step 1: Hundreds house: 6 ÷ 3 = 2. Multiply 2 × 3 = 6, subtract 6 − 6 = 0. Bring down 1.',
  'bodha.D4.example2':
    'Step 2 (The Zero Gate): Tens house: 3 does not fit into 1. Write 0 in the quotient! Bring down 2.',
  'bodha.D4.example3':
    'Step 3: Ones house: 12 ÷ 3 = 4. Multiply 4 × 3 = 12, subtract 12 − 12 = 0. Quotient is 204.',
  'bodha.D4.where': 'Distributing panchayat scholarship funds and packing railway textbook crates.',
  'bodha.D4.sutra':
    'Divide, multiply, subtract, bring down: if a house cannot share, write zero before you open the next door.',
  'gloss.long-division':
    'A systematic algorithm to divide large numbers place value by place value.',
  'gloss.long-division.en': 'long division',
  'longdiv.title': 'The long division algorithm',
  'longdiv.art': 'A columnar long division frame showing the four-beat rhythm and the Zero Gate.',
  'longdiv.s1': 'Follow the four beats (Divide, Multiply, Subtract, Bring down) for 824 ÷ 4.',
  'longdiv.s1done': '824 ÷ 4 = 206 solved through systematic columnar sharing.',
  'longdiv.s2': 'Solve 612 ÷ 3 and guard the Zero Gate.',
  'longdiv.s2done': 'The Zero Gate guarded: 612 ÷ 3 = 204.',
  'longdiv.s3': 'Validate long division answers using inverse multiplication.',
  'longdiv.s3done': 'Verified: 204 × 3 = 612.',
  'mistake.D4.intro': 'Kabir divided 824 by 4 and got 26. One step went wrong. Which one?',
  'mistake.D4.s1': 'Divide hundreds: 8 ÷ 4 = 2. 2 hundreds placed in quotient.',
  'mistake.D4.s2':
    'Bring down 2 tens. Since 4 does not fit into 2, he pulled down 4 ones directly without writing 0.',
  'mistake.D4.s3': 'Divide 24 by 4 = 6, writing 26 as the final quotient.',
  'mistake.D4.fine1': 'That is sound: 8 ÷ 4 = 2 in the hundreds place is correct.',
  'mistake.D4.found':
    'Here. When 2 tens cannot be divided by 4, he MUST write 0 in the tens house! Without 0, 206 becomes 26—an error of nearly 180.',
  'mistake.D4.fine3':
    '24 ÷ 4 = 6 is mathematically true, but placing it immediately next to 2 created 26 instead of 206.',
  'explain.D4.s':
    'If a brought-down house cannot share, we write {0} in the quotient before opening the next {1}.',
  'explain.D4.zero': 'zero',
  'explain.D4.one': 'one',
  'explain.D4.ten': 'ten',
  'explain.D4.door': 'door',
  'explain.D4.wall': 'wall',
  'explain.D4.roof': 'roof',
  'explain.D4.hint':
    'What digit must be placed in the quotient house when the divisor cannot fit into the brought-down digit?',
  'know.D4':
    'Standard long division works place by place; writing zero for any house that cannot share prevents tenfold magnitude errors.',

  /* A3 Which Operation? */
  'prashna.A3.q':
    '5 children share 30 laddoos equally. Which mathematical model finds each child’s share?',
  'prashna.A3.c1': '30 ÷ 5',
  'prashna.A3.c2': '30 + 5',
  'prashna.A3.c3': '30 × 5',
  'prashna.A3.a':
    '30 ÷ 5. Sharing a whole into equal parts is partition division, so 30 ÷ 5 = 6 laddoos each.',
  'bodha.A3.what':
    '[[word-problems|Word problems]] tell human stories; mathematics captures the physical action hidden in the scene.',
  'bodha.A3.can':
    'You will be able to recognize the four root actions and choose the right mathematical operation without falling into keyword traps.',
  'bodha.A3.idea':
    'Look at the root action: joining groups is addition, comparing two heights is subtraction, repeating equal units is multiplication, and sharing is division.',
  'bodha.A3.why':
    'Keyword traps mislead: "How much more?" has the word "more", but it asks for the difference gap between two bars—requiring subtraction, not addition!',
  'bodha.A3.example': 'Three stories using 24 and 6, each needing a different operation.',
  'bodha.A3.example1': 'Story 1 (Replicate): 6 boxes with 24 pencils each → 24 × 6 = 144 pencils.',
  'bodha.A3.example2':
    'Story 2 (Compare): A 24 m tower and a 6 m pole; how much taller? → 24 − 6 = 18 m gap.',
  'bodha.A3.example3':
    'Story 3 (Partition): 24 sweets shared among 6 plates → 24 ÷ 6 = 4 sweets each.',
  'bodha.A3.where':
    'Planning buses for school excursions, comparing weather temperatures, and splitting market expenses.',
  'bodha.A3.sutra':
    'Look at the action in the scene: joining is plus, comparing is minus, repeating is multiply, sharing is divide.',
  'gloss.word-problems': 'Mathematical questions presented as everyday real-world stories.',
  'gloss.word-problems.en': 'word problems',
  'wordprob.title': 'Which operation? Action detective',
  'wordprob.art':
    'Tape diagrams illustrating the four root physical actions: Join, Compare, Repeat, and Share.',
  'wordprob.s1': 'Classify the physical root action in the scene.',
  'wordprob.s1done': 'Action identified: Replicate equal groups (Multiplication).',
  'wordprob.s2': 'Model comparison: find how much taller the 40 m pole is than the 15 m pole.',
  'wordprob.s2done': 'Comparison gap: 40 − 15 = 25 m difference.',
  'wordprob.s3': 'Assemble the mathematical equation from story quantities.',
  'wordprob.s3done': 'Equation assembled: 30 ÷ 5 = 6 equal shares.',
  'mistake.A3.intro':
    'Amit read: "A pole is 40 m tall. How much taller is it than a 15 m pole?" One step went wrong. Which one?',
  'mistake.A3.s1': 'Identify the numbers: 40 m and 15 m.',
  'mistake.A3.s2': 'He saw the word "more" and added: 40 + 15 = 55 m.',
  'mistake.A3.s3': 'He wrote: The taller pole is 55 m taller.',
  'mistake.A3.fine1': 'That is sound: identifying 40 m and 15 m is correct.',
  'mistake.A3.found':
    'Here. "How much taller" asks for the difference gap between the two poles! Adding gives 55 m, which is taller than both poles combined. He must subtract: 40 − 15 = 25 m.',
  'mistake.A3.fine3': '55 m answer is directly caused by the wrong addition in step 2.',
  'explain.A3.s': 'Comparing amounts means finding the {0} by {1} the smaller from the larger.',
  'explain.A3.difference': 'difference',
  'explain.A3.sum': 'sum',
  'explain.A3.product': 'product',
  'explain.A3.subtracting': 'subtracting',
  'explain.A3.adding': 'adding',
  'explain.A3.multiplying': 'multiplying',
  'explain.A3.hint':
    'Does comparing two heights find their sum by adding or their difference by subtracting?',
  'know.A3':
    'Word problems reflect physical actions: joining is plus, comparing is minus, repeating is multiply, and sharing is divide.',

  /* Spot-the-mistake equation lines: <s> struck, <r> highlighted. */
  'mistake.A1.eq': '704 - 358 = <r>454</r>',
  'mistake.A2.eq': '21 × 39 ≈ 800 (not <r>8190</r>)',
  'mistake.A3.eq': '40 - 15 = 25 (not <r>55</r>)',
  'mistake.D2.eq': '15 ÷ 3 = 5 (not <r>12</r> after 1 hop)',
  'mistake.D4.eq': '824 ÷ 4 = 206 (not <r>26</r>)',
  'mistake.N2.eq': '40 + 5 = <r>VL</r>',
  'mistake.N4.eq': '2/5 + 1/5 = <r>3/10</r>',
  'mistake.N5.eq': '0.7 (70 hundredths) > <r>0.15</r>',

  /* Shared bench chrome (number group) */
  'number.stepTab': 'Step {n}',
  'number.backBodha': '← Back to Bodha',
  'number.forwardMistake': 'Spot the Mistake →',

  /* Bodha / mistake figure labels */
  'figure.N2.rightAdds': 'Right adds, left subtracts',
  'figure.N2.noRepeat': 'At most three in a row',
  'figure.N2.chapter': 'Ch.',
  'figure.N4.denStays': 'Denominator stays 5',
  'figure.N4.fifthsStay': 'Parts stay fifths',
  'figure.N4.twoThirds': '2/3 of 18 = {result}',
  'figure.A2.wild': 'Ten times too big',
  'figure.A3.gap': '{n} m gap',
  'figure.A3.busPlan': 'Trip plan',
  'figure.D4.zeroGate': 'Write 0 in tens',
  'figure.D4.writeZero': '0 keeps place value',
  'figure.D2.stopEarly': '12 is not the answer',
  'figure.N5.gridTenths': 'Tenths strip',

  /* N2 roman bench */
  'roman.clearSlate': 'Clear slate',
  'roman.toBuild': 'Build numbers →',
  'roman.vldHint':
    'The symbols V, L, and D are never subtracted. Think of 50 (L) minus 10 (X): XL.',
  'roman.emptySlate': 'Empty slate',
  'roman.invalid': 'Not a valid Roman numeral',
  'roman.breakdown': '{parts} = {value}',

  /* N4 collection bench */
  'collection.stepTab': 'Step {n}',
  'collection.ringLabel': 'Ring {n}',
  'collection.ringAria': 'Ring {n} of {total}, contains {count} items. {state}',
  'collection.ringSelected': 'Selected',
  'collection.ringUnselected': 'Unselected',
  'collection.ringFraction': '1/{den} ({count} items)',
  'collection.partitionEq': '{total} ÷ {rings} = {per} items per group = 1/{rings} of {total}',
  'collection.ringsChoice': '{n} rings',
  'collection.nextSelect': 'Next: Select groups',
  'collection.fractionEq': '{num}/{den} of {total} = {num} × {per} = {taken} tokens',
  'collection.threeFourthsDone': '3 out of 4 equal baskets taken: 12 tokens in all.',
  'collection.tapRings': 'Tap rings to select or unselect them.',
  'collection.nextAdd': 'Next: Adding like fractions',
  'collection.likeSumEq': '{a} + {b} = {sum}',

  /* N5 decimals bench */
  'decimals.stepTab': 'Step {n}',
  'decimals.gridAria': '{label}: {shaded} hundredths shaded',
  'decimals.gridDefault': 'Hundred grid',
  'decimals.decompEq': '{val} = {hundredths}/100 = {tenths} tenths + {h} hundredths',
  'decimals.gridLabelTenths': '0.5 (50 hundredths)',
  'decimals.gridLabelHundredths': '0.15 (15 hundredths)',
  'decimals.gridLabelTrailing': '{val} (50 hundredths)',
  'decimals.compareEq': '0.5 > 0.15',
  'decimals.trailingEq': '{val} = 5/10 = 50/100',
  'decimals.nextCompare': 'Next: Compare decimals',
  'decimals.nextTrailing': 'Next: Trailing zeroes',
  'decimals.showHalf': 'Show 0.5',
  'decimals.addTrailing': 'Add trailing zero (0.50)',

  /* A1 regroup bench */
  'regroup.stepTab': 'Step {n}',
  'regroup.colH': 'Hundreds',
  'regroup.colT': 'Tens',
  'regroup.colO': 'Ones',
  'regroup.unbundleH': 'Unbundle 1 hundred → 10 tens',
  'regroup.unbundleT': 'Unbundle 1 ten → 10 ones',
  'regroup.reset500': 'Reset 500',
  'regroup.nextSubtract': 'Next: Subtract 500 - 247',
  'regroup.conservationEq': '{h} + {t} + {o} = {total}',
  'regroup.subtractEq': '500 - 247 = {result}',
  'regroup.columnStep': '{place}: {top} - {bottom} = {result}{extra}',
  'regroup.unbundledTag': ' (unbundled)',
  'regroup.nextAdd': 'Next: Adding with bundling',
  'regroup.addEq': '678 + 456 = {sum}',

  /* A2 estimate bench */
  'estimate.stepTab': 'Step {n}',
  'estimate.safeZoneAria': 'Safe zone range',
  'estimate.safeZoneLabel': 'Safe Zone: 1000 – 1400',
  'estimate.snapPrompt': 'Tap to snap prickly numbers to friendly benchmarks',
  'estimate.snapLine': '48 → {r48} (nearest 10) · 392 → {r392} (nearest 100)',
  'estimate.snap48': 'Snap 48 → 50',
  'estimate.snap392': 'Snap 392 → 400',
  'estimate.nextSafe': 'Next: Safe Zone builder',
  'estimate.productEq': '29 × 41 ≈ {a} × {b} = {est} (Safe zone: 1000 – 1400)',
  'estimate.nextWild': 'Next: Wild error radar',
  'estimate.checkPrompt': '21 × 39 (Estimate: 20 × 40 = 800)',
  'estimate.inZone':
    '819 is in the safe zone around 800 (exact: 21 × 39 = 819). Difference from sum check: {diff}.',
  'estimate.snapArrow': '48→50',

  /* A3 wordprob bench */
  'wordprob.tab1': '1. Action Detective',
  'wordprob.tab2': '2. Comparison Gap',
  'wordprob.tab3': '3. Equation Assembler',
  'wordprob.story1Title': 'Story Situation:',
  'wordprob.story1':
    'Radha buys 6 boxes of colored pencils. Each box contains 24 pencils. How many pencils does she have in total?',
  'wordprob.actionPrompt': 'What physical action is happening in this scene?',
  'wordprob.actionJoin': 'Join Collections',
  'wordprob.actionCompare': 'Compare Heights',
  'wordprob.actionReplicate': 'Replicate Equal Groups',
  'wordprob.actionPartition': 'Partition Shares',
  'wordprob.tapeReplicate': 'Tape Diagram: 6 equal boxes of 24 = 24 × 6 = 144 pencils',
  'wordprob.story2Title': 'Comparison Situation (Keyword Trap!):',
  'wordprob.story2':
    'A temple flagpole is 40 m tall. A garden lamp post is 15 m tall. How much more (taller) is the flagpole?',
  'wordprob.flagpole': 'Temple Flagpole: 40 m',
  'wordprob.lamppost': 'Lamp Post: 15 m',
  'wordprob.gapReveal': 'Difference Gap: 25 m ({eq})',
  'wordprob.gapHidden': '? Gap',
  'wordprob.gapDone': 'Gap Modeled: 40 - 15 = 25',
  'wordprob.gapBtn': 'Find Comparison Gap (Subtract)',
  'wordprob.story3Title': 'Partition Story:',
  'wordprob.story3': '5 children share 30 laddoos equally. How many laddoos does each child get?',
  'wordprob.equationDone': '30 ÷ 5 = {n} laddoos each',
  'wordprob.equationPending': 'Equation: [ ? ]',
  'wordprob.assembleDone': 'Assembled: 30 ÷ 5 = 6',
  'wordprob.assembleBtn': 'Assemble Partition Equation (30 ÷ 5)',

  /* D2 quotition bench */
  'quotition.tab1': '1. Group Pack (20 ÷ 4)',
  'quotition.tab2': '2. With Remainder (22 ÷ 5)',
  'quotition.tab3': '3. Sharing vs Grouping',
  'quotition.step1BannerDone': '20 ÷ 4 = 5 (5 boxes packed, 0 left)',
  'quotition.step1Banner': 'Total: {total} | Packed: {packed} boxes | Position: {pos}',
  'quotition.boxLabel': 'Box #{n} ({size})',
  'quotition.take4': 'Take group of 4 (−4)',
  'quotition.take5': 'Take group of 5 (−5)',
  'quotition.remainderTray': 'Remainder Tray (2 left over)',
  'quotition.remainderNote': '2 < 5, so no more full boxes can be packed!',
  'quotition.plate': 'Plate {n}',
  'quotition.plateShare': '5 laddoos',
  'quotition.boxHold': 'Box {n}',
  'quotition.boxHolds': 'holds 4',
  'quotition.modeSharing': 'Sharing (partition)',
  'quotition.modeGrouping': 'Grouping (quotition)',
  'quotition.step2BannerDone': '22 ÷ 5 = 4 R 2 (4 boxes packed, 2 remainder)',
  'quotition.dualitySharing': 'Partitive (Sharing): 20 ÷ 4 = 5 on each plate',
  'quotition.dualityGrouping': 'Quotitive (Grouping): 20 ÷ 4 = 5 boxes packed',
  'quotition.switchGrouping': 'Switch to Grouping Mode (Boxes of 4)',
  'quotition.switchSharing': 'Switch to Sharing Mode (4 Plates)',

  /* D4 longdiv bench */
  'longdiv.tab1': '1. Four-Beat Rhythm (824 ÷ 4)',
  'longdiv.tab2': '2. The Zero Gate (612 ÷ 3)',
  'longdiv.tab3': '3. Inverse Check',
  'longdiv.rhythmDone': '824 ÷ 4 = 206 (Complete!)',
  'longdiv.rhythmProgress': 'Dividing 824 by 4 · Column {col} of 3',
  'longdiv.beat1': '1. Divide',
  'longdiv.beat2': '2. Multiply',
  'longdiv.beat3': '3. Subtract',
  'longdiv.beat4': '4. Bring down',
  'longdiv.resetRhythm': 'Reset Rhythm',
  'longdiv.nextColumn': 'Next Column House →',
  'longdiv.zeroDone': '612 ÷ 3 = 204 (Zero Gate Guarded!)',
  'longdiv.zeroPrompt': 'Tens House Gate: 3 does not fit into 1 ten!',
  'longdiv.zeroExplain':
    '3 fits into 1 zero times! Wrote 0, brought down 2 ones to make 12 ÷ 3 = 4.',
  'longdiv.zeroAsk': 'Can 3 divide 1 ten? What digit must you write in the tens quotient house?',
  'longdiv.writeZero': 'Write 0',
  'longdiv.skipZero': 'Skip & pull down 2 directly (write nothing)',
  'longdiv.skipWarn':
    'Every house must share! If 3 cannot divide 1, write 0 before opening the next door!',
  'longdiv.omitWarn': 'Omitting 0 turns 204 into 24! You must write 0 in the tens house.',
  'longdiv.verifyDone': 'Verified: 204 × 3 = 612 (Inverse Multiplication)',
  'longdiv.verifyPrompt': 'Check quotient using inverse multiplication',
  'longdiv.inverseFormula': '(Quotient × Divisor) + Remainder = Dividend',
  'longdiv.verifyCalcDone': '(204 × 3) + 0 = 612 + 0 = 612 ✓',
  'longdiv.verifyCalc': '204 × 3 = ? (Does it equal 612?)',
  'longdiv.checkAgain': 'Check Again',
  'longdiv.verifyBtn': 'Verify (204 × 3)',
  'longdiv.sub8': '- 8 (2 × 4)',
  'longdiv.bring2': ' 02 (bring down 2)',
  'longdiv.sub0': '- 0 (0 × 4)',
  'longdiv.bring4': ' 24 (bring down 4)',
  'longdiv.sub24': '- 24 (6 × 4)',
  'longdiv.rem0': ' 00 (remainder)',
  'longdiv.sub6': '- 6 (2 × 3)',
  'longdiv.bring1': ' 01 (brought down 1)',
};
