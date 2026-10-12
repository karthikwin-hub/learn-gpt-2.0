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

  /* F1 Factors Make Rectangles */
  'prashna.F1.q': 'How many different rectangles can you build using 12 square tiles?',
  'prashna.F1.c1': '1',
  'prashna.F1.c2': '3',
  'prashna.F1.c3': '6',
  'prashna.F1.a':
    '3. 12 tiles can form 1×12, 2×6, and 3×4 rectangles! Each side gives a factor pair.',
  'bodha.F1.what':
    '[[factors|Factors]] are whole numbers that multiply together to make a product, like the side lengths of a rectangular tile mat.',
  'bodha.F1.can':
    'You will be able to arrange tiles into neat rectangles, discover factor pairs, and uncover square number symmetries.',
  'bodha.F1.idea':
    'Every solid rectangle with area N gives a factor pair: its length and width. No gaps and no loose tiles allowed!',
  'bodha.F1.why':
    'Factors always travel in pairs: if 3 divides 18 cleanly, its partner 6 comes along automatically because 3 × 6 = 18.',
  'bodha.F1.example': 'Find all factors of 20 by testing rectangular sides.',
  'bodha.F1.example1': '1 row of 20 tiles makes a long strip: 1 × 20 = 20.',
  'bodha.F1.example2': '2 rows of 10 tiles make a rectangle: 2 × 10 = 20.',
  'bodha.F1.example3':
    '4 rows of 5 tiles make a rectangle: 4 × 5 = 20. All factors: 1, 2, 4, 5, 10, 20.',
  'bodha.F1.where':
    'Arranging prayer hall seating mats, tiling bathroom floors, and packing chocolate trays.',
  'bodha.F1.sutra':
    'A factor divides with no leftover: the sides of every neat rectangle are factors.',
  'gloss.factors': 'Numbers that divide a given number completely without leaving any remainder.',
  'gloss.factors.en': 'factors',
  'factors.title': 'Factors make rectangles',
  'factors.art': 'A grid of tiles snapping into clean rectangles with rainbow factor pair arcs.',
  'factors.s1': 'Change row count to build solid rectangles from 12 tiles.',
  'factors.s1done': 'Discovered rectangle 3 × 4: 3 and 4 are factors of 12.',
  'factors.s2': 'Connect partner factors using rainbow pair arcs for 12.',
  'factors.s2done': 'All 6 factors discovered: (1, 12), (2, 6), (3, 4).',
  'factors.s3': 'Examine square number 16: notice the unique partner-shared factor.',
  'factors.s3done':
    'Square number 16 has an odd number of factors because 4 × 4 pairs with itself.',
  'mistake.F1.intro': 'Raju was asked to list all factors of 18. One step went wrong. Which one?',
  'mistake.F1.s1': 'He tried 1 and 2: 1 × 18 = 18, 2 × 9 = 18.',
  'mistake.F1.s2': 'He wrote the factor list: 1, 2, 3, 6.',
  'mistake.F1.s3': 'He concluded that 18 has exactly 4 factors.',
  'mistake.F1.fine1': 'That is sound: testing 1 and 2 produces valid rectangular factors.',
  'mistake.F1.found':
    'Here. Raju forgot the partner factors! 18 ÷ 2 is 9, and 18 ÷ 1 is 18. The full list is 1, 2, 3, 6, 9, 18.',
  'mistake.F1.fine3': 'Concluding 4 factors is wrong because 9 and 18 are missing from the list.',
  'explain.F1.s': 'Factors of a number always come in {0}: dividing by one factor reveals its {1}.',
  'explain.F1.pairs': 'pairs',
  'explain.F1.single': 'single',
  'explain.F1.multiples': 'multiples',
  'explain.F1.partner': 'partner',
  'explain.F1.remainder': 'remainder',
  'explain.F1.product': 'product',
  'explain.F1.hint': 'Do factors travel in pairs with a partner, or alone as single multiples?',
  'know.F1':
    'A factor divides a number with no leftover; factors come in pairs formed by the sides of neat rectangular arrangements.',

  /* F2 Primes & Composites */
  'prashna.F2.q': 'How many different rectangles can you build using 7 square tiles?',
  'prashna.F2.c1': 'Only 1 line',
  'prashna.F2.c2': '2 rectangles',
  'prashna.F2.c3': '4 rectangles',
  'prashna.F2.a':
    'Only 1 line. 7 tiles can only stretch into a single 1×7 line! It is stubborn and has no other factors.',
  'bodha.F2.what':
    '[[prime-numbers|Prime numbers]] are stubborn numbers that cannot be folded into neat multi-row mats—they only form a single straight line.',
  'bodha.F2.can':
    'You will be able to distinguish primes from composites, understand why 1 is special, and use the Sieve of Eratosthenes.',
  'bodha.F2.idea':
    'A prime number has *exactly two distinct factors*: 1 and itself. A composite number has more than two factors.',
  'bodha.F2.why':
    'Number 1 has only ONE factor (itself), so it is neither prime nor composite. Number 2 is the smallest prime and the only even prime!',
  'bodha.F2.example': 'Filter primes up to 30 using the Sieve of Eratosthenes.',
  'bodha.F2.example1': 'Cross out 1. Keep 2, cross out all even multiples of 2.',
  'bodha.F2.example2': 'Keep 3, cross out remaining multiples of 3 (9, 15, 21, 27).',
  'bodha.F2.example3':
    'Keep 5, cross out multiples of 5 (25). Survivors are primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.',
  'bodha.F2.where':
    'Securing online bank transfers with prime cryptography, and 13- and 17-year cicada lifecycle emergence.',
  'bodha.F2.sutra':
    'A prime makes only a single straight line: exactly two factors, one and itself.',
  'gloss.prime-numbers':
    'Whole numbers greater than 1 that have exactly two factors: 1 and the number itself.',
  'gloss.prime-numbers.en': 'prime numbers',
  'primes.title': 'Primes & composites sieve',
  'primes.art': 'A 1–50 grid revealing glowing golden primes as composite multiples are filtered.',
  'primes.s1': 'Test stubborn numbers: try to fold 7 tiles into multiple rows.',
  'primes.s1done': '7 cannot fold into equal rows: 7 is prime (1 × 7 only).',
  'primes.s2': 'Filter multiples of 2, 3, and 5 to uncover primes on the 1–50 board.',
  'primes.s2done': 'Sieve complete: 15 primes discovered between 1 and 50.',
  'primes.s3': 'Decompose composite numbers into prime factor trees.',
  'primes.s3done': '24 decomposed into prime leaves: 2 × 2 × 2 × 3.',
  'mistake.F2.intro':
    'Arjun claims 9 is a prime number because it is odd. One step went wrong. Which one?',
  'mistake.F2.s1': 'He noticed that 9 cannot be divided by 2 (it is odd).',
  'mistake.F2.s2': 'He concluded that 9 has no factors other than 1 and 9.',
  'mistake.F2.s3': 'He declared that 9 is a prime number.',
  'mistake.F2.fine1': 'That is sound: 9 is indeed an odd number that cannot be halved.',
  'mistake.F2.found':
    'Here. Being odd does not make a number prime! 9 has 3 as a factor: 3 × 3 = 9. Its factors are 1, 3, 9, making it composite.',
  'mistake.F2.fine3': 'Calling 9 prime is directly caused by ignoring factor 3 in step 2.',
  'explain.F2.s': 'A prime number has exactly {0} factors; the number 1 is neither prime nor {1}.',
  'explain.F2.two': 'two',
  'explain.F2.three': 'three',
  'explain.F2.one': 'one',
  'explain.F2.composite': 'composite',
  'explain.F2.prime': 'prime',
  'explain.F2.odd': 'odd',
  'explain.F2.hint': 'Does a prime have two factors or three, and what is 1 called?',
  'know.F2':
    'A prime number has exactly two factors (1 and itself); composite numbers have more than two, and 1 is neither.',

  /* F3 Divisibility Tests */
  'prashna.F3.q': 'Is 5,232 divisible by 3 without performing long division?',
  'prashna.F3.c1': 'Yes',
  'prashna.F3.c2': 'No',
  'prashna.F3.c3': 'Only if ending in 3',
  'prashna.F3.a':
    'Yes. 5 + 2 + 3 + 2 = 12. Since 12 is divisible by 3 (12 ÷ 3 = 4), 5,232 divides by 3 cleanly!',
  'bodha.F3.what':
    '[[divisibility|Divisibility tests]] are mental math shortcuts that reveal whether a huge number divides cleanly without doing long division.',
  'bodha.F3.can':
    'You will be able to test divisibility for 2, 3, 5, 6, 9, and 10 and understand the secret place-value logic behind them.',
  'bodha.F3.idea':
    'Two rule families: Last-digit checks (2, 5, 10 inspect the units place) and Digit-sum checks (3 and 9 sum all digits).',
  'bodha.F3.why':
    'Why the 3-rule works: Every ten is 9+1, every hundred is 99+1. The 9s and 99s already divide by 3; you only need to sum the leftover 1s from each house!',
  'bodha.F3.example': 'Test 5,232 for divisibility by 3, 9, and 6.',
  'bodha.F3.example1': 'Digit sum: 5 + 2 + 3 + 2 = 12. 12 ÷ 3 = 4, so it divides by 3!',
  'bodha.F3.example2': 'Test for 9: 12 ÷ 9 leaves remainder 3, so it does NOT divide by 9.',
  'bodha.F3.example3':
    'Test for 6: It is even (ends in 2) AND divides by 3, so it passes both gates for 6!',
  'bodha.F3.where':
    'Verifying ISBN book barcodes, checking computer bank account checksums, and splitting warehouse shipments.',
  'bodha.F3.sutra': 'For 2, 5, 10 check the last digit; for 3 and 9 add all digits together.',
  'gloss.divisibility':
    'The property of an integer dividing cleanly into another with zero remainder.',
  'gloss.divisibility.en': 'divisibility',
  'divisibility.title': 'Divisibility test scanner',
  'divisibility.art':
    'A multi-digit scanner highlighting units place and balancing digit sums on a scale.',
  'divisibility.s1': 'Scan last digits to test divisibility by 2, 5, and 10.',
  'divisibility.s1done': 'Last digit inspected: 5,232 ends in 2 (divisible by 2, but not 5 or 10).',
  'divisibility.s2': 'Unfold and sum digits to test divisibility by 3 and 9.',
  'divisibility.s2done': 'Digit sum 5 + 2 + 3 + 2 = 12: divides by 3, but not by 9.',
  'divisibility.s3': 'Test composite divisor 6 through the dual-gate filter.',
  'divisibility.s3done':
    'Passes both gates (even + digit sum divides by 3): 5,232 is divisible by 6.',
  'mistake.F3.intro':
    'Mona claims 43 is divisible by 3 because it ends in 3. One step went wrong. Which one?',
  'mistake.F3.s1': 'She inspected the units digit of 43 and saw 3.',
  'mistake.F3.s2': 'She concluded that ending in 3 means 43 divides by 3.',
  'mistake.F3.s3': 'She wrote that 43 ÷ 3 has no remainder.',
  'mistake.F3.fine1': 'That is sound: 43 does indeed have 3 in the units place.',
  'mistake.F3.found':
    'Here. Ending in 3 is a trap! Divisibility by 3 requires adding the digits: 4 + 3 = 7. 7 is not divisible by 3, so 43 is not divisible by 3.',
  'mistake.F3.fine3': 'Writing zero remainder is false because 43 ÷ 3 = 14 with remainder 1.',
  'explain.F3.s': 'For 3 and 9, we must add all the {0} together to test their {1}.',
  'explain.F3.digits': 'digits',
  'explain.F3.factors': 'factors',
  'explain.F3.ends': 'ends',
  'explain.F3.sum': 'sum',
  'explain.F3.remainder': 'remainder',
  'explain.F3.product': 'product',
  'explain.F3.hint': 'Do 3 and 9 inspect the last digit or do they add all digits to test the sum?',
  'know.F3':
    'For 2, 5, and 10, inspect the last digit; for 3 and 9, sum all digits; for 6, pass both 2 and 3.',

  /* F4 Common Factors & HCF */
  'prashna.F4.q':
    'What is the largest measuring cup that can measure both 12 L and 18 L of milk exactly?',
  'prashna.F4.c1': '2 L',
  'prashna.F4.c2': '6 L',
  'prashna.F4.c3': '12 L',
  'prashna.F4.a':
    '6 L. 6 divides both 12 (2 cups) and 18 (3 cups) with zero leftover! It is their Highest Common Factor (HCF).',
  'bodha.F4.what':
    'The [[hcf|Highest Common Factor (HCF)]] is the greatest number that divides two or more numbers completely without leaving any remainder.',
  'bodha.F4.can':
    'You will be able to find common factors using Venn diagrams, measure lengths with shared tile units, and reduce fractions in one step.',
  'bodha.F4.idea':
    'List the factors of both numbers. The intersection contains their common factors; the largest number in the intersection is their HCF.',
  'bodha.F4.why':
    'The HCF is the largest tile size that fits both beams without cutting. A 6 m piece fits twice into 12 m and 3 times into 18 m!',
  'bodha.F4.example': 'Find the HCF of 16 and 24.',
  'bodha.F4.example1': 'Factors of 16: 1, 2, 4, 8, 16.',
  'bodha.F4.example2': 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.',
  'bodha.F4.example3':
    'Shared factors: 1, 2, 4, 8. The greatest shared factor is 8: HCF(16, 24) = 8.',
  'bodha.F4.where':
    'Cutting fabric or wood without waste, tiling floor grids, and simplifying fractions.',
  'bodha.F4.sutra':
    'The highest common factor is the greatest shared divisor that fits both without leftover.',
  'gloss.hcf': 'The largest positive integer that divides two or more numbers without a remainder.',
  'gloss.hcf.en': 'highest common factor',
  'hcf.title': 'Common factors & HCF',
  'hcf.art': 'A two-ring Venn diagram showing overlapping factors and dual-beam tile alignment.',
  'hcf.s1': 'Sort factors of 12 and 18 into the overlapping Venn rings.',
  'hcf.s1done': 'Shared intersection: 1, 2, 3, 6. The largest shared factor is 6.',
  'hcf.s2': 'Fit measuring tile lengths (2, 3, 6) across beams of length 12 and 18.',
  'hcf.s2done': 'Tile size 6 fits both 12 and 18 with zero gap: 6 is the HCF.',
  'hcf.s3': 'Simplify the fraction 12/18 in one step by dividing numerator and denominator by 6.',
  'hcf.s3done': '12/18 simplified by HCF(6) yields 2/3.',
  'mistake.F4.intro':
    'Tarun was asked to find the HCF of 8 and 12. One step went wrong. Which one?',
  'mistake.F4.s1': 'He tested 2 and found that 2 divides both 8 and 12.',
  'mistake.F4.s2': 'He stopped here and declared that HCF(8, 12) = 2.',
  'mistake.F4.s3': 'He wrote the answer as 2.',
  'mistake.F4.fine1': 'That is sound: 2 is indeed a common factor of 8 and 12.',
  'mistake.F4.found':
    'Here. 2 is a common factor, but it is NOT the highest! 4 also divides both 8 and 12 (8 ÷ 4 = 2, 12 ÷ 4 = 3). The true HCF is 4.',
  'mistake.F4.fine3': 'Writing 2 as the final answer is wrong because 4 is larger.',
  'explain.F4.s':
    'The HCF is the {0} factor that divides both numbers evenly without leaving any {1}.',
  'explain.F4.largest': 'largest',
  'explain.F4.smallest': 'smallest',
  'explain.F4.equal': 'equal',
  'explain.F4.remainder': 'remainder',
  'explain.F4.multiple': 'multiple',
  'explain.F4.factor': 'factor',
  'explain.F4.hint': 'Is HCF the largest common factor or smallest, and does it leave a remainder?',
  'know.F4':
    'The Highest Common Factor is the largest shared divisor that fits both numbers with zero remainder.',

  /* G1 */
  'prashna.G1.q':
    'Two clocks show 3 o’clock: a giant tower clock and a tiny wristwatch. Which clock’s hands make a bigger angle?',
  'prashna.G1.c1': 'The giant tower clock',
  'prashna.G1.c2': 'The tiny wristwatch',
  'prashna.G1.c3': 'Both angles are exactly the same',
  'prashna.G1.a':
    'Both angles are exactly the same! An angle measures how far the hands turn (a quarter turn, 90°), not how long the hands are.',
  'bodha.G1.what':
    'An [[angle|angle]] measures the amount of turn between two lines meeting at a point called the vertex.',
  'bodha.G1.can':
    'You will be able to measure turns, recognize right angles and straight angles, and see that arm length never changes an angle.',
  'bodha.G1.idea':
    'Imagine an arm fixed at one end, turning like the hand of a clock. As it sweeps around, it traces out an angle.',
  'bodha.G1.why':
    'The length of the arms does not change how far you turned. A door opening a crack turns the same amount whether the door is giant or tiny!',
  'bodha.G1.example': 'Three turns on a clock face:',
  'bodha.G1.example1': 'Quarter turn from 12 to 3: 90° (a square corner or right angle).',
  'bodha.G1.example2': 'Half turn from 12 to 6: 180° (a straight line or straight angle).',
  'bodha.G1.example3': 'Full turn from 12 all the way around back to 12: 360° (a full circle).',
  'bodha.G1.where': 'Opening doors, scissors blades, sun shadows, roof slopes, and clock hands.',
  'bodha.G1.sutra': 'An angle is how far you turn, not how long the arms are.',
  'gloss.angle': 'The measure of turn between two rays sharing a common vertex.',
  'gloss.angle.en': 'angle',
  'angles.title': 'Angles as turns',
  'angles.art':
    'A rotating ray sweeping an arc from a vertex, with adjustable arm length and angle readout.',
  'angles.s1': 'Turn the ray to 90° to make a quarter turn (right angle).',
  'angles.s1done': 'Quarter turn made: 90° creates a crisp square corner.',
  'angles.s2': 'Stretch the arm length from short to long. Notice the angle does not change.',
  'angles.s2done': 'The angle stayed at 90°! Longer arms do not make a bigger angle.',
  'angles.s3': 'Compare the giant clock and the tiny watch at 3 o’clock side by side.',
  'angles.s3done': 'Both hands turn exactly 1/4 of a full circle: both are 90°.',
  'mistake.G1.intro': 'Tarun was comparing two angles. One step went wrong. Which one?',
  'mistake.G1.s1': 'He saw a giant door open a small crack of 15°.',
  'mistake.G1.s2': 'He saw a small pencil box lid open wide at 60°.',
  'mistake.G1.s3':
    'He declared that the giant door made a larger angle because the door was bigger.',
  'mistake.G1.fine1': 'Sound observation: the door opened by 15°.',
  'mistake.G1.fine2': 'Sound observation: the box lid opened by 60°.',
  'mistake.G1.found':
    'Here! The pencil box lid opened 60°, which is four times wider than 15°. Angle is amount of turn, not the size of the object.',
  'explain.G1.s':
    'An angle measures the amount of {0}, not how long the arms are. A quarter turn is a {1} angle.',
  'explain.G1.turn': 'turn',
  'explain.G1.length': 'length',
  'explain.G1.weight': 'weight',
  'explain.G1.right': 'right',
  'explain.G1.straight': 'straight',
  'explain.G1.zero': 'zero',
  'explain.G1.hint':
    'Does an angle measure turn or length, and what kind of angle is a quarter turn?',
  'know.G1': 'An angle is how far you turn, not how long the arms are.',

  /* G2 */
  'prashna.G2.q':
    'A 24-metre rope fences a rectangular vegetable garden. Does changing the shape of the rectangle change how much ground it holds?',
  'prashna.G2.c1': 'No, 24 metres of rope always holds the exact same area',
  'prashna.G2.c2': 'Yes, squarer shapes hold more ground (a square holds the most)',
  'prashna.G2.c3': 'Yes, longer thin shapes hold more ground',
  'prashna.G2.a':
    'Yes! The same 24 m perimeter can hold as little as 11 m² (11 × 1) or as much as 36 m² (6 × 6 square). A square encloses the most area!',
  'mistake.G2.intro':
    'Neha was comparing two gardens fenced with 24 metres of rope. One step went wrong. Which one?',
  'mistake.G2.s1': 'Garden A is 10 m by 2 m: perimeter is 10 + 2 + 10 + 2 = 24 m (area = 20 m²).',
  'mistake.G2.s2': 'Garden B is 6 m by 6 m: perimeter is 6 + 6 + 6 + 6 = 24 m (area = 36 m²).',
  'mistake.G2.s3':
    'She said both gardens hold the same amount of ground because both fences are 24 m long.',
  'mistake.G2.fine1': 'Sound calculation: 10 by 2 gives perimeter 24 m and area 20 m².',
  'mistake.G2.fine2': 'Sound calculation: 6 by 6 gives perimeter 24 m and area 36 m².',
  'mistake.G2.found':
    'Here! Both fences are 24 m, but Garden B holds 36 m² while Garden A holds only 20 m². Same perimeter does NOT mean same area!',
};
