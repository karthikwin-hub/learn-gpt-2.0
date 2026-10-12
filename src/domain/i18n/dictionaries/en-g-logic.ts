/* English strings for the Ganita lessons in sets and logic: S1 S3 L1 L3 L2, and the S2 Prashna and mistake. */
export const dictionary: Record<string, string> = {
  /* S1 */
  'prashna.S1.q': 'If the sorting ring rule is "Multiples of 5", where does the number 34 belong?',
  'prashna.S1.c1': 'Inside the ring',
  'prashna.S1.c2': 'Outside the ring',
  'prashna.S1.c3': 'On the line',
  'prashna.S1.a':
    '34 is not a multiple of 5 (34 ÷ 5 leaves a remainder of 4). Every item must either fit the rule or stay outside!',
  'bodha.S1.what':
    'A set is a collection of objects that all obey a clear, exact rule (like "even numbers" or "yellow shapes").',
  'bodha.S1.can':
    'Test items against set rules, sort objects inside or outside a boundary ring, and eliminate in-between guessing.',
  'bodha.S1.idea':
    'A single ring on the floor splits the whole world into two: things that fit go INSIDE; everything else stays OUTSIDE.',
  'bodha.S1.why':
    'Every object must be tested against the rule: it either fits or it does not. There is no in-between!',
  'bodha.S1.example': 'Sorting by a rule:',
  'bodha.S1.example1':
    'Step 1: Rule: "Shapes with 4 sides". Square has 4 sides -> Inside the ring.',
  'bodha.S1.example2': 'Step 2: Triangle has 3 sides -> Outside the ring.',
  'bodha.S1.example3': 'Step 3: Circle has 0 straight sides -> Outside the ring.',
  'bodha.S1.where':
    'Library book categories, kitchen spice organization, recycling bins, and animal classification.',
  'bodha.S1.sutra': 'A rule divides everything: it belongs inside or it stays outside.',
  'singleset.title': 'Sort by a Rule (Single Set & Universe of Discourse)',
  'singleset.lead':
    'Choose a sorting rule, test items against it, and observe the clean partition into inside and outside.',
  'singleset.active_rule': 'Active Rule:',
  'singleset.inside_ring': 'Inside the Ring (Rule Matches)',
  'singleset.outside_ring': 'Outside the Ring (Universe U)',
  'singleset.step1': '1. Multiples of 5 Ring',
  'singleset.step2': "2. Ending in 5 (Kunal's Trap)",
  'singleset.step3': '3. Four-Sided Shapes Ring',
  'singleset.reset': 'Reset',
  'mistake.S1.intro': 'Kunal is testing numbers with the ring rule: "Numbers ending in 5":',
  'mistake.S1.s1': 'He tests 25 and puts it inside the ring because 25 ends in 5.',
  'mistake.S1.s2': 'He looks at 15 and leaves it outside because 15 is also divisible by 3.',
  'mistake.S1.s3': 'He claims that 15 does not belong inside the ring.',
  'mistake.S1.fine1': 'Accurate step: 25 ends in 5 and belongs inside.',
  'mistake.S1.fine3': 'Step 3 fails because he invented an extra condition not in the rule.',
  'mistake.S1.found':
    'Here! The rule only asks if the number ends in 5. 15 ends in 5, so it belongs inside the ring regardless of other properties!',
  'explain.S1.s':
    'A set is a collection of objects defined by an exact {0}. Every object tested against the rule must be either inside the ring or {1} it.',
  'explain.S1.rule': 'rule',
  'explain.S1.guess': 'guess',
  'explain.S1.color': 'color',
  'explain.S1.outside': 'outside',
  'explain.S1.halfway': 'halfway',
  'explain.S1.above': 'above',
  'explain.S1.hint':
    'Think about what mathematical condition defines a set, and where objects go if they fail the test.',
  'know.S1': 'A rule divides everything: it belongs inside or it stays outside.',

  /* S2 */
  'prashna.S2.q':
    'A ball is both RED and ROUND. In two sorting rings labelled "Red Things" and "Round Things", where does it go?',
  'prashna.S2.c1': 'In the Red ring only',
  'prashna.S2.c2': 'In the Round ring only',
  'prashna.S2.c3': 'In the shared middle overlap between both rings',
  'prashna.S2.a':
    'The shared middle overlap belongs to BOTH rings at once! A red round ball satisfies both rules, so it sits right in the lens.',
  'mistake.S2.intro': 'Pooja is sorting 12 with rules: "Multiples of 4" and "Multiples of 3":',
  'mistake.S2.s1': 'She notes 12 is a multiple of 4 (4 × 3 = 12).',
  'mistake.S2.s2': 'She places 12 in the "Multiples of 4" ring only.',
  'mistake.S2.s3': 'She concludes 12 does not need to be in the overlap.',
  'mistake.S2.fine1': 'Accurate observation: 12 is indeed a multiple of 4.',
  'mistake.S2.fine3':
    'Step 3 fails because 12 is also a multiple of 3, so it belongs in the overlap of both rings.',
  'mistake.S2.found':
    'Here! 12 is a multiple of both 4 and 3 (4 × 3 = 12). It must be placed in the central overlap region!',

  /* S3 */
  'prashna.S3.q':
    'All items in Ring A are green shapes; all in Ring B are circles. The middle overlap has green circles. Can the rule for Ring A be "All shapes"?',
  'prashna.S3.c1': 'Yes, because green shapes are shapes',
  'prashna.S3.c2': 'No, because non-green shapes are left outside Ring A',
  'prashna.S3.c3': "It doesn't matter",
  'prashna.S3.a':
    'A rule must explain what is excluded too! If the rule were "All shapes", non-green shapes could not be left outside Ring A.',
  'bodha.S3.what':
    'Sometimes you see objects already sorted into rings, but the labels are hidden: you must guess the rules!',
  'bodha.S3.can':
    'Inspect items inside and outside each ring, test hypothesis rules against every block, and discover the hidden criteria.',
  'bodha.S3.idea':
    'Inspect all objects in a region: find what they share in common AND check that nothing outside shares it.',
  'bodha.S3.why':
    'Scientific reasoning works this way: look at the evidence, form a hypothesis, and test it against all items.',
  'bodha.S3.example': 'Guessing the rule from clues:',
  'bodha.S3.example1':
    'Step 1: Ring A contains red triangle, red square, and red star. Hypothesis: "Red".',
  'bodha.S3.example2': 'Step 2: Check outside: no red things outside.',
  'bodha.S3.example3': 'Step 3: Rule A is confirmed: "Red"!',
  'bodha.S3.where':
    'Detective work, medical diagnosis from symptoms, debugging computer programs, and scientific discovery.',
  'bodha.S3.sutra': 'Look at what is inside and what was left out: the rule must fit all of them.',
  'mistake.S3.intro':
    'Aman looks at Ring A containing 3 triangles and 2 circles and guesses the rule is "Triangles":',
  'mistake.S3.s1': 'He counts 3 triangles inside Ring A.',
  'mistake.S3.s2': 'He concludes that the rule for Ring A must be "Triangles".',
  'mistake.S3.s3': 'He ignores the 2 circles that are also sitting inside Ring A.',
  'mistake.S3.fine1': 'Accurate observation: there are indeed 3 triangles inside.',
  'mistake.S3.fine3': 'Step 3 fails because every object in the ring must follow the rule.',
  'mistake.S3.found':
    'Here! A rule must fit ALL items in the ring. Since circles are also inside, the rule cannot be "Triangles"!',
  'explain.S3.s':
    'To discover a hidden rule, you must find a property shared by {0} item inside the ring. If an item inside violates your guess, your hypothesis must be {1}.',
  'explain.S3.every': 'every',
  'explain.S3.one': 'one',
  'explain.S3.some': 'some',
  'explain.S3.revised': 'revised',
  'explain.S3.accepted': 'accepted',
  'explain.S3.ignored': 'ignored',
  'explain.S3.hint':
    'Think about whether rules can have exceptions in a set, and what you must do when a counter-example is found.',
  'know.S3': 'Look at what is inside and what was left out: the rule must fit all of them.',

  /* L1 */
  'prashna.L1.q':
    'Someone says: "Every number that ends in 4 can be shared equally by 4 friends without remainder." Is this statement true?',
  'prashna.L1.c1': 'Yes, because 4, 24, and 44 all divide by 4',
  'prashna.L1.c2': 'No, because 14 ends in 4 but leaves a remainder of 2',
  'prashna.L1.c3': 'Yes, all numbers ending in 4 divide by 4',
  'prashna.L1.a':
    '14 ends in 4, but 14 ÷ 4 = 3 with a remainder of 2! A single counterexample proves that the rule is NOT always true.',
  'bodha.L1.what':
    'A universal statement says something is ALWAYS true for all numbers or objects.',
  'bodha.L1.can':
    'Test universal claims across multiple numbers, spot disproving counterexamples, and distinguish positive examples from proof.',
  'bodha.L1.idea':
    'To prove a statement FALSE, you do not need a hundred reasons: you only need ONE single counterexample!',
  'bodha.L1.why':
    'Seeing a thousand white swans does not prove all swans are white; spotting one black swan proves the rule wrong.',
  'bodha.L1.example': 'Testing a universal claim:',
  'bodha.L1.example1':
    'Step 1: Statement: "All prime numbers are odd." Test 3, 5, 7, 11 (all odd).',
  'bodha.L1.example2': 'Step 2: But 2 is a prime number, and 2 is even!',
  'bodha.L1.example3': 'Step 3: The single number 2 disproves the entire claim!',
  'bodha.L1.where': 'Scientific laws, safety rules, mathematics proofs, and legal arguments.',
  'bodha.L1.sutra':
    'A thousand examples cannot prove "always", but one counterexample disproves it.',
  'counterexample.title': 'True for All? (Universal Claims & Counterexamples)',
  'counterexample.lead':
    'Test universal statements across numbers and search for a single counterexample that disproves the claim.',
  'counterexample.claim': 'Universal Claim:',
  'counterexample.status_holds': 'Holds for all tested items',
  'counterexample.status_disproved': 'Disproved by counterexample!',
  'counterexample.test_item': 'Test Candidate',
  'counterexample.reset': 'Reset',
  'mistake.L1.intro':
    'Rahul claims: "Multiplying any two numbers always makes a strictly bigger number":',
  'mistake.L1.s1': 'He checks 3 × 4 = 12, noting 12 is bigger than 3 and 4.',
  'mistake.L1.s2': 'He lists 5 × 6 = 30 and claims the rule must hold for all numbers.',
  'mistake.L1.s3': 'He ignores boundary numbers like 1 and 0.',
  'mistake.L1.fine1': 'Accurate calculation: 3 × 4 is indeed 12.',
  'mistake.L1.fine3': 'Step 3 fails because boundary cases can serve as counterexamples.',
  'mistake.L1.found':
    'Here! 5 × 1 = 5 (equal) and 5 × 0 = 0 (smaller). A single counterexample disproves "always"!',
  'explain.L1.s':
    'To disprove a claim that says "always", you only need to find {0} counterexample. Even if a hundred examples work, a single exception proves the claim is {1}.',
  'explain.L1.one': 'one',
  'explain.L1.many': 'many',
  'explain.L1.ten': 'ten',
  'explain.L1.false': 'false',
  'explain.L1.true': 'true',
  'explain.L1.proven': 'proven',
  'explain.L1.hint':
    'Think about how many exceptions are needed to break a rule that claims to be true for all.',
  'know.L1': 'A thousand examples cannot prove "always", but one counterexample disproves it.',

  /* L2 */
  'prashna.L2.q':
    'In a track with an AND gate, Switch A is OPEN and Switch B is CLOSED. Can a marble roll all the way through?',
  'prashna.L2.c1': 'Yes, because Switch A is open',
  'prashna.L2.c2': 'No, because an AND gate requires BOTH switches to be open',
  'prashna.L2.c3': 'It depends on marble speed',
  'prashna.L2.a':
    'An AND gate requires BOTH switches in series to be open for the marble to pass. Since Switch B is closed, the marble stops!',
  'bodha.L2.what':
    'Logic gates are decision points that allow or block paths based on truth rules: AND, OR, NOT.',
  'bodha.L2.can':
    'Test switch combinations on AND, OR, and NOT gates, trace marble paths, and build truth tables.',
  'bodha.L2.idea':
    'AND is like two switches in a row (series): BOTH must be open for electricity or a marble to pass.',
  'bodha.L2.why':
    'OR is like two parallel tracks: if EITHER path is open (or both!), the marble passes freely.',
  'bodha.L2.example': 'Testing marble gates:',
  'bodha.L2.example1': 'Step 1: AND gate with A open and B shut: path is blocked (Output: NO).',
  'bodha.L2.example2':
    'Step 2: OR gate with A open and B shut: marble rolls through track A (Output: YES).',
  'bodha.L2.example3': 'Step 3: NOT gate with A open: inverts truth to shut (Output: NO).',
  'bodha.L2.where':
    'Light switches on staircases, search engines, railway signals, and computer microchips.',
  'bodha.L2.sutra': 'AND needs both; OR needs at least one; NOT flips the answer.',
  'logic.title': 'Marble Gates (Boolean Logic: AND, OR, NOT)',
  'logic.lead':
    'Set switches and drop a marble to explore how AND, OR, and NOT gates direct pathways.',
  'mistake.L2.intro': 'Sneha is testing an OR gate when Switch A is OPEN and Switch B is OPEN:',
  'mistake.L2.s1': 'She observes that both switches are in the OPEN position.',
  'mistake.L2.s2':
    'She believes OR means exclusive choice ("only one switch or the other, but not both").',
  'mistake.L2.s3': 'She claims the marble will be blocked because having both open is not allowed.',
  'mistake.L2.fine1': 'Sound observation: both switches are indeed open.',
  'mistake.L2.fine3': 'Step 3 fails because of the exclusive OR misconception in Step 2.',
  'mistake.L2.found':
    'Here! In logic and mathematics, OR is inclusive: it is true if A is open, B is open, OR BOTH are open! When both switches are open, the marble passes freely.',
  'explain.L2.s':
    'An AND gate allows a marble to pass only when {0} switches are on. An OR gate allows a marble to pass if at least {1} switch is on.',
  'explain.L2.both': 'both',
  'explain.L2.one': 'one',
  'explain.L2.neither': 'neither',
  'explain.L2.hint':
    'Recall how series (AND) and parallel (OR) tracks behave when switches are open.',
  'know.L2': 'AND needs both; OR needs at least one; NOT flips the answer.',

  /* L3 */
  'prashna.L3.q':
    'Statement: "If an animal is a dog, it has 4 legs." If you see an animal with 4 legs, is it definitely a dog?',
  'prashna.L3.c1': 'Yes, all 4-legged animals are dogs',
  'prashna.L3.c2': 'No, it could be a cat, cow, or tiger',
  'prashna.L3.c3': 'Only if it barks',
  'prashna.L3.a':
    'Many animals have 4 legs (cats, cows, tigers)! The rule "If dog then 4 legs" does NOT mean that every 4-legged animal is a dog (the converse fallacy).',
  'bodha.L3.what':
    'A conditional statement connects a cause to an effect: "IF this happens, THEN that follows." (P ⟹ Q).',
  'bodha.L3.can':
    'Test conditional statements, visualize nested subset rings, and spot the converse fallacy.',
  'bodha.L3.idea':
    'Direction matters! If A happens, B is guaranteed. But B can happen for completely different reasons!',
  'bodha.L3.why':
    'Think of nested rings: "Dogs" is a small ring inside the giant ring of "Four-legged animals."',
  'bodha.L3.example': 'Forward truth vs Reverse fallacy:',
  'bodha.L3.example1':
    'Step 1: Statement: "If a number is divisible by 10, it ends in 0." (Always true!).',
  'bodha.L3.example2':
    'Step 2: Reverse: "If a number ends in 0, it divides by 100." (False! 70 ends in 0 but does not divide by 100).',
  'bodha.L3.example3':
    'Step 3: Turning an implication backwards creates a new statement that might be false!',
  'bodha.L3.where':
    'Game rules ("If you roll a 6, you roll again"), doctor advice, and science experiments.',
  'bodha.L3.sutra':
    'If A then B tells the forward direction; turning it backwards is not always true.',
  'conditional.title': 'If This, Then That (Conditionals & Converse Fallacy)',
  'conditional.lead':
    'Explore implication rules (P ⟹ Q), test whether reversing the statement holds, and discover nested subsets.',
  'conditional.forward_statement': 'Forward Statement (P ⟹ Q):',
  'conditional.reverse_statement': 'Reverse Statement / Converse (Q ⟹ P):',
  'conditional.reverse_button': 'Test Reverse Statement',
  'conditional.forward_button': 'Test Forward Statement',
  'conditional.valid_forward': 'Forward statement is ALWAYS TRUE',
  'conditional.invalid_converse': 'Converse is FALSE (Converse Fallacy!)',
  'conditional.valid_biconditional': 'Converse is also TRUE (Biconditional)',
  'conditional.counterexamples': 'Counterexamples Disproving Converse:',
  'conditional.nested_subsets': 'Nested Subset Visualizer (P ⊆ Q)',
  'conditional.inner_ring': 'Inner Set P (Premise)',
  'conditional.outer_ring': 'Outer Set Q (Conclusion)',
  'conditional.reset': 'Reset',
  'mistake.L3.intro': 'Farhan is discussing 4-sided shapes and makes a geometric argument:',
  'mistake.L3.s1': 'He states: "If a shape is a square, it has 4 sides."',
  'mistake.L3.s2': 'He reverses the rule: "Therefore, any shape with 4 sides must be a square."',
  'mistake.L3.s3': 'He concludes that a rectangle must also be called a square.',
  'mistake.L3.fine1': 'Sound rule: all squares do have 4 sides.',
  'mistake.L3.fine3': 'Step 3 fails because of the converse fallacy committed in Step 2.',
  'mistake.L3.found':
    'Here! Having 4 sides does not guarantee being a square! Rectangles, kites, and trapezoids also have 4 sides without being squares. Reversing an implication is not valid!',
  'explain.L3.s':
    'A conditional statement tells what happens in the {0} direction. Reversing an "If A then B" statement is {1} automatically true.',
  'explain.L3.forward': 'forward',
  'explain.L3.reverse': 'reverse',
  'explain.L3.opposite': 'opposite',
  'explain.L3.not': 'not',
  'explain.L3.always': 'always',
  'explain.L3.certainly': 'certainly',
  'explain.L3.hint': 'Recall why nested rings allow one direction but not always the reverse.',
  'know.L3': 'If A then B tells the forward direction; turning it backwards is not always true.',

  /* Spot-the-mistake equation lines: <s> struck, <r> highlighted. */
  'mistake.L1.eq':
    '5 × 1 = 5 (equal) and 5 × 0 = 0 (smaller): a single <r>counterexample</r> disproves always',
  'mistake.L2.eq':
    'OR is inclusive: if both switches are open, the marble rolls freely through <r>both parallel paths</r>',
  'mistake.L3.eq':
    'Having 4 sides does not guarantee being a square: rectangles, kites, and trapezoids also have <r>4 sides</r> without being squares',
  'mistake.S1.eq':
    'The rule only asks if the number ends in 5: 15 ends in 5, so it belongs <r>inside</r> the ring',
  'mistake.S2.eq':
    '12 is a multiple of both 4 and 3 (4 × 3 = 12): it belongs in the <r>overlap</r> region',
  'mistake.S3.eq':
    'A rule must fit every item in the ring: circles are inside, so the rule cannot be <r>triangles</r>',

  'explain.S2.both': 'both',
  'explain.S2.neither': 'neither',
  'explain.S2.one': 'one',
  'explain.S2.outside': 'outside',
  'explain.S2.between': 'between',
  'explain.S2.inside': 'inside',

  /* Bench & figure strings (sets-logic group) */
  'singleset.feedback':
    'Rule: "{rule}". {inside} items belong INSIDE the ring; {outside} stay OUTSIDE in Universe U.',
  'singleset.universe': 'Universe of Discourse (U)',
  'singleset.partition': '{inside} In / {outside} Out',
  'singleset.insideLabel': '● Inside: {rule}',
  'singleset.outsideLabel': '○ Outside the Ring (Fails the Rule):',
  'singleset.kunalTrap':
    'Kunal\'s Mistake Trap: Kunal saw 15 and left it outside because 15 is divisible by 3! But the rule is only: "Numbers ending in 5". 15 ends in 5, so it MUST go inside! Don\'t invent extra exclusion rules.',
  'singleset.testItem': 'Test an item:',
  'singleset.addItem': '+ Add {label}',
  'singleset.rule.multiples-of-5.name': 'Multiples of 5',
  'singleset.rule.multiples-of-5.desc': 'Numbers that divide evenly by 5 (0, 5, 10, 15, 20...)',
  'singleset.rule.ends-in-5.name': 'Numbers Ending in 5',
  'singleset.rule.ends-in-5.desc': 'Numbers whose last digit is 5 (5, 15, 25, 35...)',
  'singleset.rule.four-sides.name': 'Four-Sided Shapes',
  'singleset.rule.four-sides.desc':
    'Geometric figures with exactly 4 straight sides (quadrilaterals)',
  'singleset.item.rhombus': 'Rhombus',
  'singleset.item.pentagon': 'Pentagon',
  'singleset.item.num-5': '5',
  'singleset.item.num-15': '15',
  'singleset.item.num-20': '20',
  'singleset.item.num-34': '34',
  'singleset.item.num-42': '42',
  'singleset.item.num-35': '35',
  'singleset.item.num-49': '49',
  'singleset.item.shape-square': 'Square',
  'singleset.item.shape-triangle': 'Triangle',
  'singleset.item.shape-rect': 'Rectangle',
  'singleset.item.shape-circle': 'Circle',

  'counterexample.preset.ends-in-4-div-4': '1. Divisible by 4 Claim',
  'counterexample.preset.primes-are-odd': '2. All Primes Odd Claim',
  'counterexample.preset.mult-makes-bigger': "3. Multiply Bigger (Rahul's Trap)",
  'counterexample.claim.ends-in-4-div-4.statement': 'Every number ending in 4 is divisible by 4',
  'counterexample.claim.primes-are-odd.statement': 'All prime numbers are odd',
  'counterexample.claim.mult-makes-bigger.statement':
    'Multiplying a number by another always makes it bigger (5 × b > 5)',
  'counterexample.claim.ends-in-4-div-4.explanation':
    '14 ends in 4, but 14 ÷ 4 leaves a remainder of 2.',
  'counterexample.claim.primes-are-odd.explanation': '2 is a prime number, but it is even.',
  'counterexample.claim.mult-makes-bigger.explanation':
    '5 × 1 = 5 (equal, not bigger) and 5 × 0 = 0 (smaller).',
  'counterexample.feedback.holds':
    'Testing Claim: "{claim}". All tested items satisfy the condition so far.',
  'counterexample.feedback.disproved':
    'DISPROVED: Counterexample found at {n}! "{claim}" is FALSE.',
  'counterexample.claimLabel': 'Universal Claim: "{claim}"',
  'counterexample.statusHolds': 'Status: Testing Holds',
  'counterexample.statusDisproved': 'Status: Conclusively Disproved',
  'counterexample.testedHeading': 'Tested Domain Elements & Outcomes:',
  'counterexample.found': 'Counterexample Found: {n}!',
  'counterexample.rahulTrap':
    "Rahul's Mistake Trap: Rahul checked 3 × 4 = 12 and 5 × 6 = 30 and claimed multiplication ALWAYS makes a number bigger. But 5 × 1 = 5 (equal) and 5 × 0 = 0 (smaller)! A single counterexample destroys the claim that it is always true.",
  'counterexample.testCandidate': 'Test counterexample candidate:',
  'counterexample.testButton': 'Test {n}',
  'counterexample.chipOk': '{n} ✓',
  'counterexample.chipFail': '{n} ✗',

  'conditional.presetGroup': 'Conditional statements',
  'conditional.preset.dogs-legs': '1. Dogs & 4 Legs',
  'conditional.preset.squares-4sides': "2. Squares & 4 Sides (Farhan's Trap)",
  'conditional.preset.div-10-ends-0': '3. Divisible by 10 & Ends in 0',
  'conditional.preset.rain-wet': '4. Rain & Wet Ground',
  'conditional.ifThenForward': 'IF {premise}, THEN {conclusion}.',
  'conditional.ifThenConverse': 'IF {premise}, THEN {conclusion}.',
  'conditional.outerRingLabel': 'Outer Ring: {label}',
  'conditional.innerRingLabel': 'Inner Ring: {label}',
  'conditional.farhanTitle': "Farhan's Mistake Trap:",
  'conditional.farhanBody':
    'Farhan argues: "All squares have 4 sides, so any 4-sided shape must be a square." But rectangles, rhombuses, and kites also have 4 sides!',
  'conditional.counterMark': '✗ {item}',
  'conditional.data.dogs-legs.premise': 'An animal is a dog',
  'conditional.data.dogs-legs.conclusion': 'It has 4 legs',
  'conditional.data.dogs-legs.conversePremise': 'An animal has 4 legs',
  'conditional.data.dogs-legs.converseConclusion': 'It is a dog',
  'conditional.data.dogs-legs.outerRingLabel': 'Four-legged animals',
  'conditional.data.dogs-legs.innerRingLabel': 'Dogs',
  'conditional.data.dogs-legs.innerItems.lab': 'Labrador',
  'conditional.data.dogs-legs.innerItems.beagle': 'Beagle',
  'conditional.data.dogs-legs.innerItems.poodle': 'Poodle',
  'conditional.data.dogs-legs.outerItems.cat': 'Cat',
  'conditional.data.dogs-legs.outerItems.cow': 'Cow',
  'conditional.data.dogs-legs.outerItems.tiger': 'Tiger',
  'conditional.data.dogs-legs.outerItems.horse': 'Horse',
  'conditional.data.dogs-legs.counter.cat': 'Cat',
  'conditional.data.dogs-legs.counter.cow': 'Cow',
  'conditional.data.dogs-legs.counter.tiger': 'Tiger',
  'conditional.data.dogs-legs.counter.horse': 'Horse',
  'conditional.data.squares-4sides.premise': 'A shape is a square',
  'conditional.data.squares-4sides.conclusion': 'It has 4 sides',
  'conditional.data.squares-4sides.conversePremise': 'A shape has 4 sides',
  'conditional.data.squares-4sides.converseConclusion': 'It is a square',
  'conditional.data.squares-4sides.outerRingLabel': 'Four-sided shapes (Quadrilaterals)',
  'conditional.data.squares-4sides.innerRingLabel': 'Squares',
  'conditional.data.squares-4sides.innerItems.s2': 'Square (2×2)',
  'conditional.data.squares-4sides.innerItems.s5': 'Square (5×5)',
  'conditional.data.squares-4sides.outerItems.rect': 'Rectangle',
  'conditional.data.squares-4sides.outerItems.trap': 'Trapezoid',
  'conditional.data.squares-4sides.outerItems.rhombus': 'Rhombus',
  'conditional.data.squares-4sides.outerItems.kite': 'Kite',
  'conditional.data.squares-4sides.counter.rect': 'Rectangle',
  'conditional.data.squares-4sides.counter.trap': 'Trapezoid',
  'conditional.data.squares-4sides.counter.rhombus': 'Rhombus',
  'conditional.data.squares-4sides.counter.kite': 'Kite',
  'conditional.data.div-10-ends-0.premise': 'A number is divisible by 10',
  'conditional.data.div-10-ends-0.conclusion': 'It ends in 0',
  'conditional.data.div-10-ends-0.conversePremise': 'A number ends in 0',
  'conditional.data.div-10-ends-0.converseConclusion': 'It is divisible by 10',
  'conditional.data.div-10-ends-0.outerRingLabel': 'Numbers ending in 0',
  'conditional.data.div-10-ends-0.innerRingLabel': 'Multiples of 10',
  'conditional.data.div-10-ends-0.innerItems.10': '10',
  'conditional.data.div-10-ends-0.innerItems.20': '20',
  'conditional.data.div-10-ends-0.innerItems.50': '50',
  'conditional.data.div-10-ends-0.innerItems.100': '100',
  'conditional.data.rain-wet.premise': 'It rains outside',
  'conditional.data.rain-wet.conclusion': 'The courtyard ground is wet',
  'conditional.data.rain-wet.conversePremise': 'The courtyard ground is wet',
  'conditional.data.rain-wet.converseConclusion': 'It rained outside',
  'conditional.data.rain-wet.outerRingLabel': 'Wet courtyard ground',
  'conditional.data.rain-wet.innerRingLabel': 'Rain today',
  'conditional.data.rain-wet.innerItems.rain': 'Rain shower',
  'conditional.data.rain-wet.counter.hose': 'Garden hose',
  'conditional.data.rain-wet.counter.sprinkler': 'Water sprinkler',
  'conditional.data.rain-wet.counter.bucket': 'Bucket splash',

  'figure.S1.ringTitle': 'Single sorting ring',
  'figure.S1.inside': 'Inside the ring',
  'figure.S1.outside': 'Outside',
  'figure.S1.noBetween': 'Inside or outside — no in-between',
  'figure.S1.mistake15': '15 ends in 5 → inside',
  'figure.S1.whereCaption': 'Libraries, kitchens, recycling bins',
  'figure.S2.multiplesTitle': 'Multiples of 2 and 3',
  'figure.S2.mult2': 'Multiples of 2',
  'figure.S2.mult3': 'Multiples of 3',
  'figure.S2.redRound': 'Red and round → both rings',
  'figure.S2.whereCaption': 'Filters, symptoms, team rosters',
  'figure.S3.guessTitle': 'Guess the hidden rules',
  'figure.S3.hypothesisRed': 'Hypothesis: red',
  'figure.S3.confirmed': 'Rule fits every item inside',
  'figure.S3.notTriangles': 'Circles break "triangles"',
  'figure.S3.whereCaption': 'Detectives, doctors, debugging',
  'figure.L1.title': 'Universal claim test',
  'figure.L1.examples': 'Examples that fit',
  'figure.L1.remainder': 'remainder 2',
  'figure.L1.oneDisproves': 'One counterexample disproves "always"',
  'figure.L1.remainder2': 'remainder 2',
  'figure.L1.mistakeMult': '×1 and ×0 break "always bigger"',
  'figure.L1.whereCaption': 'Science, safety, maths proofs',
  'figure.L2.gate': 'Marble gate',
  'figure.L2.bothOpen': 'OR: both open → marble passes',
  'figure.L2.whereCaption': 'Stairs, signals, chips',
  'figure.L3.nested': 'Nested sets P ⊆ Q',
  'figure.L3.counterCat': 'Cat: 4 legs, not a dog',
  'figure.L3.forwardOnly': 'Forward direction only',
  'figure.L3.implication': 'If P then Q',
  'figure.L3.ifThen': 'If … then …',
  'figure.L3.rectNotSquare': 'Rectangle ≠ square',
  'figure.L3.whereCaption': 'Game rules, doctors, experiments',
};
