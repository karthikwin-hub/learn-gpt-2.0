/* English strings for the phase 2 Ganita lessons: N1 lakh and crore, N3 equal parts, U1 rupees and paise. */
export const dictionary: Record<string, string> = {
  'bench.toMistake': 'Spot the mistake',

  /* N1 */
  'prashna.N1.q':
    'A stadium holds 1,00,000 people. Is that more than a million, less, or the same?',
  'prashna.N1.c1': 'More than a million',
  'prashna.N1.c2': 'Less than a million',
  'prashna.N1.c3': 'The same',
  'prashna.N1.a': 'Less. 1,00,000 is one lakh. A million is ten lakh: 10,00,000.',
  'bodha.N1.what':
    'Every number, however big, is written with the same ten digits. Where a digit stands, its [[place|place]], gives its value.',
  'bodha.N1.can':
    'You will be able to read and write numbers up to crores, the Indian way and the international way.',
  'bodha.N1.idea':
    'Each house holds up to 9 beads. When a house gets 10, they bundle into 1 bead in the next house on the left.',
  'bodha.N1.why':
    'So each place is worth ten of the place on its right. Commas group the places so we can read them. India groups the last three digits, then [[period|pairs]]: thousands, lakhs, crores.',
  'bodha.N1.example': 'Read 12,34,567.',
  'bodha.N1.example1': '12 sits in the lakhs: twelve lakh.',
  'bodha.N1.example2': '34 sits in the thousands: thirty-four thousand.',
  'bodha.N1.example3':
    '567 is five hundred and sixty-seven. Together: twelve lakh, thirty-four thousand, five hundred and sixty-seven.',
  'bodha.N1.where':
    'India has about 140 crore people. Houses are priced in lakhs. Other countries write one lakh as 100,000 and ten lakh as one million.',
  'bodha.N1.sutra': 'Each place is worth ten of the place on its right.',
  'gloss.place': 'Where a digit stands in a number: ones, tens, hundreds and so on.',
  'gloss.place.en': 'place value',
  'gloss.period': 'A group of places read together, like the thousands or the lakhs.',
  'gloss.period.en': 'period (Indian place-value system)',
  'pv.ones': 'ones',
  'pv.tens': 'tens',
  'pv.hundreds': 'hundreds',
  'pv.thousands': 'thousands',
  'pv.tenThousands': 'ten thousands',
  'pv.lakhs': 'lakhs',
  'pv.tenLakhs': 'ten lakhs',
  'pv.crores': 'crores',
  'pv.short.ones': 'O',
  'pv.short.tens': 'T',
  'pv.short.hundreds': 'H',
  'pv.short.thousands': 'Th',
  'pv.short.tenThousands': 'TTh',
  'pv.short.lakhs': 'L',
  'pv.short.tenLakhs': 'TL',
  'pv.short.crores': 'Cr',
  'pv.addBead': 'Add a bead to the {place} house',
  'place.title': 'Place-value houses',
  'place.indian': 'Indian way',
  'place.intl': 'International way',
  'place.s1': 'Watch: the houses show 99,999. Add one more bead and see every house bundle.',
  'place.addOne': 'Add one bead',
  'place.s1done':
    'Ten ones made a ten, ten tens a hundred, and so on, all the way to one lakh: 1,00,000.',
  'place.s2': 'Your turn: build 3,05,200. Tap a house to add a bead.',
  'place.s2done': 'That is 3,05,200: three lakh, five thousand, two hundred.',
  'place.s3': 'Now: how is 4,50,000 written the international way?',
  'place.s3done':
    'Same number, different commas: India writes 4,50,000 and the international way is 450,000.',
  'place.s3try':
    'Count three digits from the right for the first comma, then keep going in threes.',
  'mistake.N1.intro':
    'Asha wrote “two lakh five thousand” in numbers. One step went wrong. Which one?',
  'mistake.N1.s1': 'Two lakh means a 2 in the lakhs house.',
  'mistake.N1.s2': 'Five thousand means a 5 in the thousands house.',
  'mistake.N1.s3': 'So I write 2 and then 5000 next to it: 2,5000.',
  'mistake.N1.s4': 'The other houses have no beads.',
  'mistake.N1.fine1': 'That is right: the lakhs house holds the 2.',
  'mistake.N1.fine2': 'That is right too: the thousands house holds the 5.',
  'mistake.N1.fine4':
    'True: ten thousands, hundreds, tens and ones are empty, so they each need a 0. Look earlier.',
  'mistake.N1.found':
    'Here. Asha put the digits side by side instead of into their houses. Empty houses need zeros: 2,05,000.',
  'explain.N1.s':
    'Each place is worth {0} times the place on its right. In India, after the thousands, commas come every {1} digits.',
  'explain.N1.two': 'two',
  'explain.N1.ten': 'ten',
  'explain.N1.hundred': 'a hundred',
  'explain.N1.one': 'one',
  'explain.N1.three': 'three',
  'explain.N1.hint':
    'Look at the houses: how many beads bundle into one? And how are the lakhs grouped?',
  'know.N1':
    'Each place is worth ten of the place on its right, and you can read lakhs and crores the Indian way and the international way.',

  /* N3 */
  'prashna.N3.q': 'Ravi eats 1/2 of a roti. Mini eats 2/4 of a roti the same size. Who ate more?',
  'prashna.N3.c1': 'Ravi',
  'prashna.N3.c2': 'Mini',
  'prashna.N3.c3': 'They ate the same',
  'prashna.N3.a': 'The same. Two quarters cover exactly the same part of the roti as one half.',
  'frac.ravi': 'Ravi: 1/2',
  'frac.mini': 'Mini: 2/4',
  'bodha.N3.what':
    'A [[fraction|fraction]] names part of one whole that has been cut into equal parts.',
  'bodha.N3.can':
    'You will be able to read fractions, find fractions that are equal, and compare them.',
  'bodha.N3.idea':
    'Cut a strip into 4 equal parts and shade 3. That is 3/4. The bottom number, the [[denominator|denominator]], counts the parts. The top number counts the parts you take.',
  'bodha.N3.why':
    'The parts must be equal. If one part is bigger, “one of four parts” stops meaning the same amount, and the fraction no longer tells the truth.',
  'bodha.N3.example': 'Fold a strip in half, then fold again.',
  'bodha.N3.example1': 'One fold: 2 equal parts. Shade one: 1/2.',
  'bodha.N3.example2': 'Fold again: each half becomes 2 quarters. The same shading is now 2/4.',
  'bodha.N3.example3': 'Fold once more: 4/8. The shaded amount never changed: 1/2 = 2/4 = 4/8.',
  'bodha.N3.where':
    'Half a litre of milk, a quarter kilo of tomatoes, half an hour. More parts means smaller parts: 1/4 of a roti is less than 1/2.',
  'bodha.N3.sutra':
    'Cut the whole into equal parts: the bottom number counts the parts, the top counts the ones you take.',
  'gloss.fraction': 'A number for part of a whole, like 1/2 or 3/4.',
  'gloss.fraction.en': 'fraction',
  'gloss.denominator':
    'The bottom number of a fraction: how many equal parts the whole is cut into.',
  'gloss.denominator.en': 'denominator',
  'frac.unequal': 'Not equal parts: this is not two halves.',
  'frac.part': 'Part {n} of {d}',
  'frac.title': 'Folding strips',
  'frac.s1':
    'Watch: fold one strip in half and shade one part. Fold the other in half, then in half again.',
  'frac.fold': 'Fold the strips',
  'frac.s1done': 'Half and two quarters line up exactly: 1/2 = 2/4.',
  'frac.s2':
    'Your turn: shade 3/4 on the top strip, then shade the same amount in eighths. Tap a part to shade up to it.',
  'frac.s2done': 'Three quarters is six eighths: 3/4 = 6/8. Each quarter folded into two eighths.',
  'frac.s3': 'Which is bigger, 2/3 or 3/4?',
  'frac.same': 'The same',
  'frac.s3done': '3/4 reaches further along the strip than 2/3, so 3/4 is bigger.',
  'frac.s3try': 'Look at where each shaded part ends on the strip.',
  'mistake.N3.intro':
    'Kiran compared 1/3 and 1/2 of the same roti. One step went wrong. Which one?',
  'mistake.N3.s1': 'Both fractions are parts of the same roti.',
  'mistake.N3.s2': '1/3 means the roti is cut into 3 equal parts and I take 1.',
  'mistake.N3.s3': '3 is bigger than 2, so 1/3 is bigger than 1/2.',
  'mistake.N3.s4': 'So a third of a roti is more than half a roti.',
  'mistake.N3.fine1': 'That is right: comparing only makes sense for the same whole.',
  'mistake.N3.fine2': 'That is right: three equal parts, one taken.',
  'mistake.N3.fine4': 'This line only follows the one before. Look earlier.',
  'mistake.N3.found':
    'Here. More parts means each part is smaller. Cut into 3, each piece is smaller than a half: 1/3 is less than 1/2.',
  'explain.N3.s':
    'The bottom number tells how many {0} parts the whole is cut into. When I fold each part in two, the fraction looks different but the amount stays {1}.',
  'explain.N3.equal': 'equal',
  'explain.N3.big': 'big',
  'explain.N3.any': 'different',
  'explain.N3.bigger': 'bigger',
  'explain.N3.same': 'the same',
  'explain.N3.smaller': 'smaller',
  'explain.N3.hint':
    'Look at the strips: are the parts the same size? Did the shading grow when you folded?',
  'know.N3':
    'A fraction counts equal parts of one whole, and folding each part in two makes an equal fraction, like 3/4 = 6/8.',

  /* U1 */
  'prashna.U1.q': 'A pencil costs ₹4.5 and an eraser costs ₹4.25. Which costs more?',
  'prashna.U1.c1': 'The pencil',
  'prashna.U1.c2': 'The eraser',
  'prashna.U1.c3': 'They cost the same',
  'prashna.U1.a': 'The pencil. ₹4.5 is ₹4.50: 50 paise is more than 25 paise.',
  'money.pencil': 'pencil',
  'money.eraser': 'eraser',
  'bodha.U1.what':
    'In ₹3.75, the dot, the [[decimal|decimal point]], separates whole rupees from parts of a rupee.',
  'bodha.U1.can':
    'You will be able to read rupees and paise, change between them, and compare amounts.',
  'bodha.U1.idea':
    'Picture one rupee as a square of 100 small squares. Each small square is 1 paisa. Each column of 10 is 10 paise, a tenth of a rupee.',
  'bodha.U1.why':
    'Place value carries on after the dot. The first place is tenths, the second is [[hundredth|hundredths]]: each place is a tenth of the place on its left.',
  'bodha.U1.example': 'What is ₹3.75?',
  'bodha.U1.example1': '3 whole rupees.',
  'bodha.U1.example2': '7 tenths: 7 columns of 10 paise, which is 70 paise.',
  'bodha.U1.example3': '5 hundredths: 5 more paise. Altogether 300 + 70 + 5 = 375 paise.',
  'bodha.U1.where':
    'Bills, petrol prices and run rates in cricket. ₹0.5 and ₹0.50 are the same: 50 paise. A longer number after the dot is not always bigger.',
  'bodha.U1.sutra': 'After the dot, each place is a tenth of the place on its left.',
  'gloss.decimal': 'The dot that separates whole ones from parts of one.',
  'gloss.decimal.en': 'decimal point',
  'gloss.hundredth': 'One of 100 equal parts of a whole: 1 paisa is a hundredth of a rupee.',
  'gloss.hundredth.en': 'hundredth',
  'money.paise': 'paise',
  'money.title': 'The rupee grid',
  'money.chart': 'Rupees . tenths hundredths',
  'money.s1': 'Watch: ₹1.25 built from one rupee, two strips of 10 paise and five single paise.',
  'money.showMe': 'Build ₹1.25',
  'money.s1done': '₹1.25 is 1 rupee, 2 tenths and 5 hundredths: 125 paise.',
  'money.s2': 'Your turn: build ₹2.50.',
  'money.addRupee': '+ ₹1',
  'money.addStrip': '+ 10 paise',
  'money.addSquare': '+ 1 paisa',
  'money.s2done': '₹2.50 is 2 rupees and 5 strips: 250 paise. You can also write it as ₹2.5.',
  'money.s3': 'Which is more: ₹0.5 or ₹0.45?',
  'money.s3done':
    'Compare place by place: 5 tenths is more than 4 tenths, so ₹0.5 is more. ₹0.5 is 50 paise.',
  'money.s3try':
    'Look at the first place after the dot: how many strips of 10 paise does each have?',
  'mistake.U1.intro':
    'Neha compared two toffee prices, ₹0.5 and ₹0.45. One step went wrong. Which one?',
  'mistake.U1.s1': '₹0.5 means 5 tenths of a rupee.',
  'mistake.U1.s2': '₹0.45 means 4 tenths and 5 hundredths.',
  'mistake.U1.s3': '45 is bigger than 5, so ₹0.45 is more.',
  'mistake.U1.s4': 'So the ₹0.45 toffee costs more.',
  'mistake.U1.fine1': 'That is right: 5 strips of 10 paise.',
  'mistake.U1.fine2': 'That is right: 4 strips and 5 single paise.',
  'mistake.U1.fine4': 'This line only follows the one before. Look earlier.',
  'mistake.U1.found':
    'Here. Neha compared 45 with 5, but ₹0.5 is 50 paise. Compare place by place: 5 tenths is more than 4 tenths.',
  'explain.U1.s':
    'The first digit after the dot counts {0} of a rupee. ₹0.5 is the same as {1} paise.',
  'explain.U1.tenths': 'tenths',
  'explain.U1.hundredths': 'hundredths',
  'explain.U1.ones': 'ones',
  'explain.U1.p5': '5',
  'explain.U1.p50': '50',
  'explain.U1.p500': '500',
  'explain.U1.hint': 'Look at the grid: what is one strip worth? How many strips make ₹0.5?',
  'know.U1':
    'After the dot, each place is a tenth of the place on its left, so you can read, change and compare rupees and paise.',

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
  'roman.s2done': 'Well done! You assembled {n} ({roman}) tile by tile.',
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
    'Step 2: Subtract column by column: 15 - 7 = 8 ones, 90 - 40 = 50 tens, 900 - 300 = 600 hundreds.',
  'bodha.A1.example3':
    'Step 3: 9,000 - 8,000 = 1,000 thousands, and 30,000 - 10,000 = 20,000: result is 21,658.',
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
};
