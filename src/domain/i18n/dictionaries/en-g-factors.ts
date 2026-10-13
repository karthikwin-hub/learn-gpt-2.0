/* English strings for the Ganita lessons in factors and multiplication: F1 F2 F3 F4 M1 M3. */
export const dictionary: Record<string, string> = {
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
  /* M1 Multiplication Foundations: Equal Groups & Commutative Rotation */
  'prashna.M1.q':
    'You have 3 baskets with 8 apples each, and your friend has 8 baskets with 3 apples each. Who has more apples?',
  'prashna.M1.c1': 'You have more',
  'prashna.M1.c2': 'Your friend has more',
  'prashna.M1.c3': 'Both have the exact same total (24 apples)',
  'prashna.M1.a':
    'Both have 24 apples! 3 groups of 8 and 8 groups of 3 contain the exact same total: 3 × 8 = 8 × 3 = 24.',
  'bodha.M1.what':
    'Multiplication means putting together [[mult|equal groups]]: 4 bunches of 5 coconuts each.',
  'bodha.M1.can':
    'You will be able to arrange equal bunches into arrays and see that turning them around keeps the total unchanged.',
  'bodha.M1.idea':
    'Line the bunches up into straight rows and columns: an array forms! 4 rows of 5 is written 4 × 5.',
  'bodha.M1.why':
    'Now [[turn|spin the rectangle]] 90°: 4 rows of 5 turns into 5 rows of 4! No squares were added or removed.',
  'bodha.M1.example': 'Building and rotating an array of apples:',
  'bodha.M1.example1': 'Step 1: Build 3 rows of 8: 3 × 8 = 24 apples in total.',
  'bodha.M1.example2': 'Step 2: Rotate the array by 90°: it becomes 8 rows of 3.',
  'bodha.M1.example3': 'Step 3: 8 × 3 = 24 apples. Commutative symmetry preserves the product!',
  'bodha.M1.where': 'Egg cartons, pill blister packs, window panes, and planting orchard trees.',
  'bodha.M1.sutra':
    "Turning the rectangle doesn't change the squares: rows times columns is the same both ways.",
  'rect.rotate': 'Rotate Array (90°)',
  'mistake.M1.intro': 'Varun is calculating apple totals and makes a multiplication claim:',
  'mistake.M1.s1': 'He writes: 8 baskets of 3 apples gives 8 × 3 = 24.',
  'mistake.M1.s2': 'He claims that knowing 8 × 3 does not help with 3 × 8, calculating 3 × 8 = 38.',
  'mistake.M1.s3': 'He concludes that changing group order completely changes the calculation.',
  'mistake.M1.fine1': 'Sound step: 8 × 3 = 24 is calculated correctly.',
  'mistake.M1.fine3': 'Step 3 fails because of the mistake made in Step 2.',
  'mistake.M1.found':
    'Here! Rotating 8 × 3 by a quarter turn creates 3 × 8 with the exact same 24 squares! a × b always equals b × a. Commutativity makes 3 × 8 = 24!',
  'explain.M1.s':
    'Multiplication means combining equal groups into rows and {0}. Rotating a rectangular array by ninety degrees proves that a × b is {1} b × a.',
  'explain.M1.columns': 'columns',
  'explain.M1.diagonals': 'diagonals',
  'explain.M1.circles': 'circles',
  'explain.M1.equal to': 'equal to',
  'explain.M1.greater than': 'greater than',
  'explain.M1.less than': 'less than',
  'explain.M1.hint':
    'Think about how turning a rectangle swaps rows and columns without losing any squares.',
  'know.M1':
    "Turning the rectangle doesn't change the squares: rows times columns is the same both ways.",

  /* Spot-the-mistake equation lines: <s> struck, <r> highlighted. */
  'mistake.F1.eq': 'Factors of 18: 1, 2, 3, 6, <r>9, 18</r> (never forget the partners!)',
  'mistake.F2.eq': '9 is composite: 3 × 3 = 9 (has <r>3 factors</r>: 1, 3, 9)',
  'mistake.F3.eq': '43: digit sum 4 + 3 = 7 (not divisible by 3; ending in 3 is a <r>trap!</r>)',
  'mistake.F4.eq': 'Factors of 8 and 12 share 1, 2, and <r>4</r>: HCF is 4, not 2',
  'mistake.M1.eq':
    'Rotating 8 × 3 by a quarter turn creates 3 × 8 with the exact same <r>24 squares</r>: a × b = b × a',

  /* M3 Turn it around (commutativity follow-up) */
  'bodha.M3.what':
    'When you [[turn|turn a rectangle]] of equal squares, the rows and columns swap places but the total count stays the same.',
  'bodha.M3.can':
    'You will be able to spin any array and see that a × b and b × a name the same pile of squares.',
  'bodha.M3.idea':
    'Picture 3 rows of 8 squares. Turn the whole mat a quarter turn: now it is 8 rows of 3 — same 24 squares.',
  'bodha.M3.why':
    'Rotation moves squares, it does not add or remove any. That is why 3 × 8 and 8 × 3 always match.',
  'bodha.M3.example': 'Turn a 3 × 8 apple array and read the new rows and columns.',
  'bodha.M3.example1': 'Start with 3 rows of 8: 3 × 8 = 24.',
  'bodha.M3.example2': 'Turn the mat 90°: it becomes 8 rows of 3.',
  'bodha.M3.example3': '8 × 3 = 24 — the same total after turning.',
  'bodha.M3.where': 'Spinning a rangoli grid, turning a woven mat, or flipping a tile tray.',
  'bodha.M3.sutra': 'Turn the rectangle: rows and columns swap, the square count does not.',
  'explain.M3.s':
    'After {0} an array, its rows and columns swap; the total stays the {1} because no squares were added or removed.',
  'explain.M3.turning': 'turning',
  'explain.M3.cutting': 'cutting',
  'explain.M3.adding': 'adding',
  'explain.M3.same': 'same',
  'explain.M3.different': 'different',
  'explain.M3.bigger': 'bigger',
  'explain.M3.hint':
    'Does turning the mat change how many squares fit inside, or only how we read rows and columns?',
  'know.M3': 'Turn the rectangle: rows and columns swap, the square count does not.',
  'rect.turn': 'Turn it around',
  'rect.M1.guide': 'Equal bunches line up into rows. Rotate to test commutativity.',
  'rect.M1.rotateSay': '{a} × {b} = {c} × {d} = {n}',
  'rect.M3.rotateSay': '{a} × {b} = {c} × {d} = {n}',

  'bench.nextStep': 'Continue',

  /* F1 bench UI (acceptance strings preserved) */
  'factors.tab1': '1. Tile Snapper (N=12)',
  'factors.tab2': '2. Rainbow Pairs',
  'factors.tab3': '3. Square Symmetry (N=16)',
  'factors.statusSolid': 'Solid Rectangle! {rows} × {cols} = {total}',
  'factors.statusBroken': '{rows} rows leaves {rem} loose tile(s) — Not a rectangle!',
  'factors.rowsLabel': 'Rows: {n}',
  'factors.rowAria': '{n} rows',
  'factors.pairsHeading': 'Factors of 12 discovered so far:',
  'factors.toRainbow': 'Go to Rainbow Pairs →',
  'factors.rainbowHint':
    'Every factor connects to its partner across the center! Click a pair to illuminate its rainbow link:',
  'factors.factorAria': 'Factor {n}',
  'factors.showAll': 'Show All Pairs',
  'factors.toSquare': 'Go to Square Symmetry →',
  'factors.squarePerfect': '4 × 4 = 16: A Perfect Square Mat! 4 pairs with itself.',
  'factors.squareRect': '{rows} × {cols} = {total}',
  'factors.rowChoice': '{n} rows',
  'factors.factorList': 'All Factors of 16: [{list}]',
  'factors.oddRule':
    'Notice: 16 has exactly 5 factors (an ODD number) because the middle partner 4 is not counted twice!',

  /* F2 bench UI */
  'primes.tab1': '1. Stubborn Prime Test',
  'primes.tab2': '2. Sieve of Eratosthenes (1–50)',
  'primes.tab3': '3. Prime Factor Tree',
  'primes.chooseTiles': 'Choose tiles to test:',
  'primes.tilesChoice': '{n} tiles',
  'primes.statusSolid': 'Solid Rectangle! {rows} × {cols} = {total} (Composite!)',
  'primes.statusBroken': 'Broken! {rows} rows leaves {rem} loose tile(s).',
  'primes.foldLabel': 'Try folding {n} into rows:',
  'primes.rowChoice': '{n} row(s)',
  'primes.verdictPrime':
    'Stubborn Prime! {n} only forms a single straight 1 × {n} line. It has exactly two factors: 1 and {n}.',
  'primes.verdictComposite': '{n} is Composite! It can fold into multiple rows without leftovers.',
  'primes.toSieve': 'Go to Sieve of Eratosthenes →',
  'primes.sieveCross1': 'Cross out 1 (Unit)',
  'primes.sieveFilter2': 'Filter 2s',
  'primes.sieveFilter3': 'Filter 3s',
  'primes.sieveFilter5': 'Filter 5s',
  'primes.sieveReveal': 'Reveal All 15 Primes',
  'primes.sieveSummary':
    'Primes between 1 and 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (15 primes total).',
  'primes.toTree': 'Go to Prime Factor Tree →',
  'primes.treeBranch': '↓ branches split into prime building blocks ↓',
  'primes.factorization': 'Prime Factorization: {n} = {parts}',

  /* F3 bench UI */
  'divisibility.tab1': '1. Last-Digit Gate (2, 5, 10)',
  'divisibility.tab2': '2. Digit-Sum Beam (3, 9)',
  'divisibility.tab3': '3. Dual Gate for 6',
  'divisibility.unitsBadge': 'Units digit is {d}',
  'divisibility.testDiv': 'Test ÷ {d}',
  'divisibility.verdictPass': 'Passes! {n} is divisible by {d}. ({reason})',
  'divisibility.verdictFail': 'Fails! {n} is NOT divisible by {d}. ({reason})',
  'divisibility.toSum': 'Go to Digit-Sum Beam →',
  'divisibility.sumLine': 'Digit Sum: {expr}',
  'divisibility.placeValueNote':
    'Every 10 leaves +1 loose from 9; every 100 leaves +1 from 99. Adding the digits checks all loose leftovers!',
  'divisibility.test3': 'Divisible by 3? (Sum {sum})',
  'divisibility.test9': 'Divisible by 9? (Sum {sum})',
  'divisibility.yes3': 'YES (divides by 3)',
  'divisibility.no3': 'NO (remainder)',
  'divisibility.yes9': 'YES (divides by 9)',
  'divisibility.no9': 'NO (remainder)',
  'divisibility.toGate6': 'Go to Dual Gate for 6 →',
  'divisibility.gate2Title': 'Gate 2 (Even)',
  'divisibility.gate3Title': 'Gate 3 (Sum / 3)',
  'divisibility.gatePass': 'PASS',
  'divisibility.gateFail': 'FAIL',
  'divisibility.gate6Open': 'Unlocked! {n} is divisible by 6 (Passes both 2 and 3).',
  'divisibility.gate6Shut': 'Blocked! {n} is NOT divisible by 6 (Both gates must pass).',

  /* F4 bench UI */
  'hcf.tab1': '1. Venn Factor Rings',
  'hcf.tab2': '2. Dual-Beam Tile Fitting',
  'hcf.tab3': '3. One-Step Fraction Reducer',
  'hcf.onlyA': 'Only {n}',
  'hcf.commonTitle': 'Common Factors',
  'hcf.resultBanner': 'Common Factors: {list} → Highest Common Factor is {hcf}',
  'hcf.toTiles': 'Go to Dual-Beam Tile Fitting →',
  'hcf.tileChoice': 'Tile {n}',
  'hcf.beamA': 'Beam A (12 m):',
  'hcf.beamB': 'Beam B (18 m):',
  'hcf.remainderPiece': '+{rem}',
  'hcf.fitHcf': 'Tile {t} is the HCF! Fits both 12 and 18 with ZERO gaps: 12 = 2 × 6, 18 = 3 × 6.',
  'hcf.fitCommon': 'Tile {t} fits both, but a LARGER tile also fits!',
  'hcf.fitBad': 'Tile {t} leaves leftovers on 18 (remainder {rem}) — Not a common factor!',
  'hcf.toFraction': 'Go to One-Step Fraction Reducer →',
  'hcf.fracOpDone': '÷ 6  =',
  'hcf.fracOpAsk': '÷ HCF(6) ?',
  'hcf.reduceBtn': 'Divide by HCF (6)',
  'hcf.fracDone':
    'Reduced in a single clean leap: 12 ÷ 6 = 2 and 18 ÷ 6 = 3 → 2/3 is in lowest terms!',
  'hcf.fracHint':
    'Dividing numerator and denominator by their HCF guarantees simplest form in ONE step.',
  'divisibility.reason.even': 'last digit {last} is even (0, 2, 4, 6, 8)',
  'divisibility.reason.odd': 'last digit {last} is odd',
  'divisibility.reason.ends05': 'last digit is {last}: it ends in 0 or 5',
  'divisibility.reason.notEnds05': 'last digit is {last}: it must end in 0 or 5',
  'divisibility.reason.ends0': 'last digit is 0',
  'divisibility.reason.notEnds0': 'last digit is {last}: it must end in 0',
  'divisibility.reason.sumDivides': 'digit sum {expr}, and {sum} ÷ {d} = {q}',
  'divisibility.reason.sumNotDivides': 'digit sum {expr}, and {sum} does not divide by {d}',
  'divisibility.reason.bothGates':
    'passes both gates: even (ends in {last}) and digit sum {sum} divides by 3',
  'divisibility.reason.failGate2': 'stops at gate 2: it ends in {last}, which is odd',
  'divisibility.reason.failGate3': 'stops at gate 3: digit sum {sum} does not divide by 3',
};
