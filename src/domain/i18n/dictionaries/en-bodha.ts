/* English Bodha text for the phase 1 Ganita lessons. [[id|words]] marks a tappable key word (gloss.<id>). */
export const dictionary: Record<string, string> = {
  'bodha.M2.what': 'Multiplying can count the squares that cover a [[rect|rectangle]].',
  'bodha.M2.can':
    'You will be able to find how many tiles cover a floor without counting them one by one.',
  'bodha.M2.idea':
    'A floor 6 tiles across and 4 tiles down has 4 rows. Each row has 6 tiles. So the floor has 6 × 4 tiles.',
  'bodha.M2.why':
    'Every row is the same size, so we can count rows instead of tiles: 6, 12, 18, 24. Counting equal rows like this is [[mult|multiplying]].',
  'bodha.M2.example': 'How many tiles cover a floor 5 across and 3 down?',
  'bodha.M2.example1': 'One row has 5 tiles.',
  'bodha.M2.example2': 'There are 3 rows, so count by fives: 5, 10, 15.',
  'bodha.M2.example3': '5 × 3 = 15 tiles.',
  'bodha.M2.where':
    'Tiles on a floor, seats in a cinema hall, eggs in a tray and stamps on a sheet are all rows of the same size.',
  'bodha.M2.sutra': 'Multiplying counts the squares that cover a rectangle: rows times columns.',

  'bodha.M4.what': 'To multiply big numbers like 23 × 14, we cut the rectangle into easy pieces.',
  'bodha.M4.can':
    'You will be able to multiply two-digit numbers and see why the column method works.',
  'bodha.M4.idea':
    'Cut 23 into 20 and 3, and 14 into 10 and 4. The rectangle becomes four [[room|rooms]]. Each room is an easy multiplication.',
  'bodha.M4.why':
    'Cutting does not add or remove any squares. So the four rooms together are exactly the whole rectangle: 200 + 30 + 80 + 12 = 322.',
  'bodha.M4.example': 'Work out 17 × 12 with rooms.',
  'bodha.M4.example1': 'Cut 17 into 10 and 7, and 12 into 10 and 2.',
  'bodha.M4.example2': 'The rooms are 10 × 10 = 100, 7 × 10 = 70, 10 × 2 = 20 and 7 × 2 = 14.',
  'bodha.M4.example3': 'Add the rooms: 100 + 70 + 20 + 14 = 204.',
  'bodha.M4.where':
    'Shopkeepers do this in their heads: 12 pens at ₹23 is 12 × 20 plus 12 × 3. The column method in your book is the same rooms, written in lines.',
  'bodha.M4.sutra': 'Cut big numbers into tens and ones, multiply every room, then add the rooms.',

  'bodha.M5.what':
    'When two things repeat at different speeds, sometimes they happen together. We can find when.',
  'bodha.M5.can':
    'You will be able to find the first time two rhythms meet: the smallest [[lcm|common multiple]].',
  'bodha.M5.idea':
    'A drummer who hits every 3 beats hits on 3, 6, 9, 12. These are the [[multiple|multiples]] of 3. A drummer who hits every 4 beats hits on 4, 8, 12.',
  'bodha.M5.why':
    'They hit together on a beat that is in both lists. The first one is the smallest number in both times tables: 12.',
  'bodha.M5.example': 'Drummers hit every 4 and every 6 beats. When do they first meet?',
  'bodha.M5.example1': 'Multiples of 4: 4, 8, 12, 16, 20, 24.',
  'bodha.M5.example2': 'Multiples of 6: 6, 12, 18, 24.',
  'bodha.M5.example3': 'The first number in both lists is 12, not 4 × 6 = 24.',
  'bodha.M5.where':
    'Two buses that leave every 15 and every 20 minutes, festival drums with different tala cycles, and two jobs that repeat on different days.',
  'bodha.M5.sutra': 'Two rhythms first meet at the smallest number in both times tables.',

  'bodha.D1.what':
    'Sharing fairly means every group gets the same amount. That is [[divide|dividing]].',
  'bodha.D1.can': 'You will be able to share a total equally and check the answer by multiplying.',
  'bodha.D1.idea':
    'To share 12 laddoos on 4 plates, give one to each plate, again and again, until none are left. Each plate gets 3.',
  'bodha.D1.why':
    'Dividing undoes multiplying. 4 plates with 3 each is 4 × 3 = 12, the total we started with.',
  'bodha.D1.example': 'Share 15 mangoes among 5 friends.',
  'bodha.D1.example1': 'Give one mango to each friend: 5 are used.',
  'bodha.D1.example2': 'Keep going round: after 3 rounds all 15 are used.',
  'bodha.D1.example3': 'Each friend gets 3. Check: 5 × 3 = 15.',
  'bodha.D1.where':
    'Sharing sweets at a birthday, splitting a bill, and putting the same number of children in each team.',
  'bodha.D1.sutra': 'Sharing fairly means every group gets the same; multiply to check.',

  'bodha.D3.what':
    'Sometimes a total does not share out evenly. The ones left over are the [[remainder|remainder]].',
  'bodha.D3.can':
    'You will be able to share with a remainder, and cut the leftovers into fractions.',
  'bodha.D3.idea':
    'Share 14 laddoos on 4 plates: each plate gets 3, and 2 are left over. We write 14 ÷ 4 = 3 remainder 2.',
  'bodha.D3.why':
    'The 2 leftovers can be cut. Cut each one into 2 halves: that makes 4 halves, one more for every plate. So each plate gets 3 and a half.',
  'bodha.D3.example': 'Share 7 rotis between 2 children.',
  'bodha.D3.example1': 'Each child gets 3 rotis, and 1 is left.',
  'bodha.D3.example2': 'Cut the last roti into 2 equal halves.',
  'bodha.D3.example3': 'Each child gets 3 and a half rotis: 3½.',
  'bodha.D3.where':
    'Leftover rotis, a chocolate bar shared among friends, and a ribbon cut into equal pieces.',
  'bodha.D3.sutra':
    'Leftovers are not thrown away: cut them into equal pieces and they become fractions.',

  'bodha.G2.what':
    '[[perimeter|Perimeter]] is the length around a shape. [[area|Area]] is the space inside it.',
  'bodha.G2.can': 'You will be able to see that the same perimeter can hold different areas.',
  'bodha.G2.idea':
    'Peg a rope 24 metres long as a rectangle. A thin 11 by 1 rectangle and a 6 by 6 square use the same rope.',
  'bodha.G2.why':
    'The rope only fixes the distance around. Inside, the thin one holds 11 square metres and the square holds 36.',
  'bodha.G2.example': 'With a 20-metre rope, which holds more ground: 8 by 2, or 5 by 5?',
  'bodha.G2.example1': 'Both use 20 metres: 8 + 2 + 8 + 2 = 20 and 5 + 5 + 5 + 5 = 20.',
  'bodha.G2.example2': '8 by 2 holds 8 × 2 = 16 square metres.',
  'bodha.G2.example3': '5 by 5 holds 25 square metres: the square holds more.',
  'bodha.G2.where':
    'Fencing a garden with a fixed length of wire, a frame around a photo, and the boundary of a playground.',
  'bodha.G2.sutra': 'The same rope can hold different amounts of ground; a square holds the most.',

  'bodha.G4.what':
    'Symmetry means a pattern matches itself after a move. There are two kinds: [[mirror|mirror]] and [[turn|turn]].',
  'bodha.G4.can': 'You will be able to tell mirror symmetry from turn symmetry in a kolam.',
  'bodha.G4.idea':
    'A mirror line folds the pattern onto itself, like closing a book. A turn spins it around the centre until it matches again.',
  'bodha.G4.why':
    'They are different moves, so a pattern can have one without the other. A pinwheel matches after a quarter turn, but has no mirror line.',
  'bodha.G4.example': 'Look at a pinwheel pattern.',
  'bodha.G4.example1': 'Fold it along any line: the halves do not match. There is no mirror line.',
  'bodha.G4.example2': 'Turn it a quarter turn (90°): it matches itself.',
  'bodha.G4.example3': 'So it has turn symmetry, but no mirror symmetry.',
  'bodha.G4.where':
    'Kolams and rangolis at doorways, carved jali windows, flowers, and the blades of a fan.',
  'bodha.G4.sutra':
    'A mirror line folds a pattern onto itself; a turn spins it onto itself. They are different.',

  'bodha.S2.what':
    'A [[set|set]] is a group of things that follow a rule. Some things belong to two sets at once.',
  'bodha.S2.can': 'You will be able to sort with two rings and use the words and, or and not.',
  'bodha.S2.idea':
    'Ring A holds yellow blocks. Ring B holds circles. A yellow circle belongs in both, so the rings overlap and it sits in the middle.',
  'bodha.S2.why':
    'The middle is “yellow and circle”. Anywhere inside the rings is “yellow or circle”. Outside both is “not yellow and not circle”.',
  'bodha.S2.example': 'Where does each block go?',
  'bodha.S2.example1': 'A green circle is a circle but not yellow: ring B only.',
  'bodha.S2.example2': 'A yellow square is yellow but not a circle: ring A only.',
  'bodha.S2.example3': 'A black triangle is neither: outside both rings.',
  'bodha.S2.where':
    'Children who like cricket and children who like football, and the ones who like both. Foods that are sweet, foods that are fried, and foods that are both.',
  'bodha.S2.sutra': 'Where two rings overlap, a thing belongs to both sets at once.',

  'bodha.L2.what':
    'The logic words AND, OR and NOT can be built as machines that answer YES or NO.',
  'bodha.L2.can': 'You will be able to predict what AND, OR and NOT machines do with any doors.',
  'bodha.L2.idea':
    'An AND machine says YES only when door A and door B are both open. An OR machine says YES when at least one door is open.',
  'bodha.L2.why':
    'A NOT machine flips the answer: open gives NO, shut gives YES. You can check any machine with a [[truth|truth table]] of every try.',
  'bodha.L2.example': 'Door A is open and door B is shut.',
  'bodha.L2.example1': 'AND needs both open: the answer is NO.',
  'bodha.L2.example2': 'OR needs at least one open: the answer is YES.',
  'bodha.L2.example3': 'NOT on door A flips “open” to NO.',
  'bodha.L2.where':
    'A lift moves only if the door is shut AND a button is pressed. “You may go out if it is NOT raining.”',
  'bodha.L2.sutra': 'AND needs both, OR needs at least one, NOT flips the answer.',

  'gloss.rect': 'A flat shape with four straight sides and four square corners.',
  'gloss.rect.en': 'rectangle',
  'gloss.mult': 'Adding equal groups quickly: 6 × 4 means 4 groups of 6.',
  'gloss.mult.en': 'multiplication (×)',
  'gloss.room': 'One piece of the cut rectangle: a smaller, easy multiplication.',
  'gloss.room.en': 'partial product',
  'gloss.lcm': 'The smallest number that is in both times tables.',
  'gloss.lcm.en': 'lowest common multiple (LCM)',
  'gloss.multiple': 'A number in a times table: 3, 6, 9 and 12 are multiples of 3.',
  'gloss.multiple.en': 'multiple',
  'gloss.divide': 'Sharing a total into equal groups.',
  'gloss.divide.en': 'division (÷)',
  'gloss.remainder': 'What is left over when a total does not share equally.',
  'gloss.remainder.en': 'remainder (r)',
  'gloss.perimeter': 'The distance all the way around a shape.',
  'gloss.perimeter.en': 'perimeter',
  'gloss.area': 'How much flat space a shape covers, counted in squares.',
  'gloss.area.en': 'area (square units)',
  'gloss.mirror': 'A line that folds a pattern so both halves match.',
  'gloss.mirror.en': 'line of symmetry (reflection)',
  'gloss.turn': 'Spinning a pattern around its centre until it matches.',
  'gloss.turn.en': 'rotational symmetry',
  'gloss.set': 'A group of things that all follow the same rule.',
  'gloss.set.en': 'set',
  'gloss.truth': 'A table with every possible input and the answer for each.',
  'gloss.truth.en': 'truth table',
};
