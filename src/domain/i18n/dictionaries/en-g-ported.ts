/* English strings for the ported lessons (N1 N3 U1 B3 R1 K2, M5) and Phase 1 bench UI (046 ported group). */
export const dictionary: Record<string, string> = {
  'mistake.N1.eq': '<s>2,5000</s> → <r>2,05,000</r>',
  'mistake.N3.eq': '1/3 < <r>1/2</r>',
  'mistake.U1.eq': '₹0.45 < <r>₹0.50</r>',

  'mistake.M5.intro':
    'Meera worked out when two drummers first hit together. One step went wrong. Which one?',
  'mistake.M5.s1': 'Drummer A hits every 4 beats: 4, 8, 12, 16, 20, 24.',
  'mistake.M5.s2': 'Drummer B hits every 6 beats: 6, 12, 18, 24. So multiply 4 × 6 = 24.',
  'mistake.M5.s3': 'Check: 12 is in both lists before 24, so they first meet at 12.',
  'mistake.M5.fine1': 'That is right: those are the hits of the first drummer.',
  'mistake.M5.fine3': '12 is the first shared beat. Look earlier.',
  'mistake.M5.found':
    'The mistake was multiplying 4 × 6. The first time they meet is the smallest number in both lists: 12.',

  'place.increase': 'Increase {place}',
  'place.decrease': 'Decrease {place}',
  'place.chipBundle': '99,999 (bundle example)',
  'place.expandedLabel': 'Expanded',

  'money.exchange': 'Exchange 100p → ₹1',
  'money.paiseSummary': '{n} paise · (100p = ₹1)',
  'money.addDenom': 'Add {label}',
  'money.removeDenom': 'Remove {label}',
  'money.chipExchange': '₹1.50 (exchangeable)',

  'frac.chipHalf': '1/2 (half)',
  'frac.chipTwoFourths': '2/4 (two fourths)',
  'frac.chipThreeFourths': '3/4 (three fourths)',
  'frac.chipFourEighths': '4/8 (four eighths)',

  'ramp.rolledSay': 'Rolled {d}m on {surface}.',
  'ramp.fairSay': '{fair}: only the surface changed.',

  'balance.title': 'Two-pan balance',
  'balance.equilibrium': 'In equilibrium (equal mass)',
  'balance.leftHeavier': 'Left side is heavier',
  'balance.rightHeavier': 'Right side is heavier',
  'balance.readout': 'Left: {left}g {tare} · Right: {right}g',
  'balance.readoutTare': '(+{tare}g tare)',
  'balance.leftPan': 'Left pan',
  'balance.rightPan': 'Right pan',
  'balance.tareZero': 'Tare zero',
  'balance.reset': 'Reset (10g / 10g)',

  'seed.title': 'Seed and germination',
  'seed.stage': 'Stage: {stage}',
  'seed.germinateYes': 'Ready to germinate',
  'seed.germinateNo': 'Conditions not ready yet',
  'seed.conditionsTitle': 'Environmental conditions',
  'seed.water': '💧 Water',
  'seed.air': '💨 Air',
  'seed.warmth': '☀️ Warmth',
  'seed.timeLabel': 'Time:',
  'seed.day': 'Day {n}',
  'seed.statusReady': 'Day {n}: All conditions favorable for living growth.',
  'seed.statusHalt': 'Growth halted: Seed requires water, air, and warmth to germinate.',

  'share.eqDivide': '{total} ÷ {plates} = {each}',
  'share.eqRemainder': ' r {r}',
  'share.eqCheck': '{plates} × {each}{extra} = {total}',
  'share.eqEachPlus': '{each} + {frac}',

  'topbar.soundOn': 'Turn sound on',
  'topbar.soundOff': 'Turn sound off',
  'topbar.themeLight': 'Switch to light mode',
  'topbar.themeDark': 'Switch to dark mode',

  'sets.ringLabel': 'Ring {name}',

  'film.playIconLabel': 'Play',
  'film.pauseIconLabel': 'Pause',
  'mistake.B3.eq':
    'Food passes into the blood in the <r>small intestine</r>, not the <s>stomach</s>.',
  'mistake.K2.eq':
    '<s>Higher ramp and sand</s> together: change <r>only the floor</r>, keep the ramp the same.',
  'mistake.R1.eq': 'Torch lower → shadow <s>shorter</s> <r>longer</r>',
  'mistake.E1.eq':
    'June is hot: not <s>closest to the Sun</s> but <r>our half leans toward the Sun</r>.',
  'money.coins': 'Coins',
  'money.notes': 'Notes',
  'place.house.crores': 'Crores',
  'place.house.lakhs': 'Lakhs',
  'place.house.thousands': 'Thousands',
  'place.house.ones': 'Ones',
  'place.digit.tenCrores': 'Ten crores',
  'place.digit.crores': 'Crores',
  'place.digit.tenLakhs': 'Ten lakhs',
  'place.digit.lakhs': 'Lakhs',
  'place.digit.tenThousands': 'Ten thousands',
  'place.digit.thousands': 'Thousands',
  'place.digit.hundreds': 'Hundreds',
  'place.digit.tens': 'Tens',
  'place.digit.ones': 'Ones',
  'seed.part.coat.name': 'Seed coat (testa)',
  'seed.part.coat.role': 'Protects the tiny baby plant inside until conditions are right.',
  'seed.part.cotyledon.name': 'Cotyledon',
  'seed.part.cotyledon.role': 'Stored food that gives energy before the plant grows green leaves.',
  'seed.part.radicle.name': 'Radicle',
  'seed.part.radicle.role':
    'The first part to grow. It pushes down into the soil and becomes the root.',
  'seed.part.plumule.name': 'Plumule',
  'seed.part.plumule.role':
    'The baby shoot. It grows up toward the light and becomes the stem and first leaves.',
};
