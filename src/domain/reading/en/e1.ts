import type { Chapter } from '../types';

export const E1: Chapter = {
  knot: 'E1',
  title: 'The Earth spins and travels',
  intro:
    'Every morning the Sun seems to rise in the east, climb across the sky and set in the west. For thousands of years people thought the Sun was going around the Earth. But it is the Earth that moves, and it makes two movements at once. It spins like a top, and it travels in a huge loop around the Sun. In this chapter you will see how these two movements give us day and night, the year, and the seasons.',
  sections: [
    {
      heading: 'Our home in space',
      paras: [
        'The Earth is a ball of rock about 12,700 kilometres across. It is one of eight planets that travel around the Sun. The Sun is a star, a giant ball of burning gas, so big that more than a million Earths could fit inside it.',
        'The Sun is about 15 crore kilometres away. Sunlight, the fastest thing there is, takes about 8 minutes to reach us. Without its light and warmth there would be no plants, no animals and no people.',
      ],
      figure: 'E1:what',
      caption: 'The Earth seen from above the North Pole, with the Sun to the left: noon in India.',
    },
    {
      heading: 'Spinning: day and night',
      paras: [
        'The Earth spins around an imaginary line through its middle, from the North Pole to the South Pole. This line is called its [[axis|axis]]. The spin is called [[rotation|rotation]]. The Earth makes one full turn in about 24 hours, and that is one day.',
        'At any moment, only half the Earth faces the Sun. On that half it is day. The other half faces away, into dark space, and there it is night. As the Earth turns, places move from the light half to the dark half and back again.',
        'The Earth spins from west to east. That is why the Sun appears in the east in the morning. The Sun is not moving across the sky: we are being carried towards it, past it, and away from it.',
      ],
      figure: 'E1:example@0',
      caption: '6 in the morning: India turns into sunlight, and the Sun rises.',
    },
    {
      heading: 'Following India through one spin',
      paras: [
        'Imagine you are standing in India and watch for one whole day. At about 6 in the morning, India turns into the sunlight: sunrise. At noon, India faces the Sun straight on, and the Sun is highest in the sky. At about 6 in the evening, India turns away: sunset. At midnight, India faces straight away from the Sun. Then the turn carries it round to sunrise again.',
        'Because the Earth turns west to east, places in the east of India meet the Sun first. The Sun rises in Arunachal Pradesh nearly two hours before it rises in Gujarat. But all of India uses the same clock time, Indian Standard Time, so that trains and offices keep to one timetable.',
      ],
      figure: 'E1:idea',
      caption: 'Midnight in India: our side of the Earth faces away from the Sun.',
      didYouKnow:
        'At the equator, the spinning Earth carries you along at about 1,670 kilometres an hour, faster than an aeroplane. You do not feel it, because the air and everything around you move with you.',
    },
    {
      heading: 'Travelling: the year',
      paras: [
        'While it spins, the Earth also travels around the Sun along a path called its [[orbit|orbit]]. This journey is called [[revolution|revolution]]. One trip takes about 365 and a quarter days, and that is one year.',
        'The orbit is enormous. To go around it once in a year, the Earth rushes along at about 30 kilometres every second.',
        'Because a year is a quarter of a day longer than 365 days, we add an extra day, 29 February, every four years. That year is called a leap year.',
      ],
    },
    {
      heading: 'The tilt: why we have seasons',
      paras: [
        'The Earth’s axis is not straight up and down. It is tilted, by about 23 and a half degrees, and it always points the same way in space as the Earth travels. So for part of the year the northern half of the Earth leans towards the Sun, and for part of the year it leans away.',
        'In June, the northern half, where India is, leans towards the Sun. The Sun climbs high in the sky, days are long and nights are short, and the ground soaks up more heat: it is summer. Around 21 June we have our longest day.',
        'In December, the northern half leans away. The Sun stays lower, days are short, and it is winter. Around 22 December we have our shortest day. Twice a year, around 21 March and 23 September, neither half leans towards the Sun, and day and night are almost equal everywhere.',
      ],
      figure: 'E1:why',
      caption: 'In June the northern half leans toward the Sun: summer in India.',
    },
    {
      heading: 'Not because we are closer',
      paras: [
        'Many people think summer comes because the Earth is closer to the Sun. It is not so. The Earth is actually closest to the Sun in early January, during our winter. Seasons come from the tilt, not the distance.',
        'Here is the proof: when India has summer, Australia, in the southern half, has winter. In Australia, children celebrate Christmas in the hot summer and go to the beach.',
        'In India we often speak of six seasons, or ritus: Vasanta (spring), Grishma (summer), Varsha (the rains), Sharad (autumn), Hemanta (before winter) and Shishira (winter). The weather office counts four: winter, summer, the monsoon and the season after the monsoon.',
      ],
      figure: 'E1:mistake.reveal',
      caption: 'In January the Earth is closest to the Sun, yet it is winter in India.',
    },
  ],
  words: [
    { id: 'axis', word: 'axis', meaning: 'An imaginary line from the North Pole to the South Pole that the Earth spins around.' },
    { id: 'rotation', word: 'rotation', meaning: 'The Earth’s spin, once in about 24 hours.' },
    { id: 'orbit', word: 'orbit', meaning: 'The path the Earth follows around the Sun.' },
    { id: 'revolution', word: 'revolution', meaning: 'One trip of the Earth around the Sun, about 365¼ days.' },
  ],
  activity: {
    title: 'Day and night with a torch',
    steps: [
      'In a dark room, ask someone to hold a torch still: that is the Sun.',
      'Hold a ball or an orange, and stick a small paper dot on it for India.',
      'Turn the ball slowly from west to east (anticlockwise when seen from the top). Watch India move into the light, across it, and into the dark.',
      'Now tilt the ball a little and walk it around the torch, keeping the tilt pointing the same way. When does the top half get the most light?',
    ],
  },
  questions: [
    { q: 'Why do we have day and night?', a: 'The Earth spins; the half facing the Sun has day and the half facing away has night.' },
    { q: 'How long does the Earth take to go once around the Sun?', a: 'About 365¼ days: one year.' },
    { q: 'Why does the Sun rise in Arunachal Pradesh before Gujarat?', a: 'The Earth spins from west to east, so eastern places turn into the sunlight first.' },
    { q: 'Is it summer in India because the Earth is closest to the Sun?', a: 'No. The Earth is closest in January. Summer comes when our half leans toward the Sun.' },
    { q: 'When India has summer, what season does Australia have?', a: 'Winter, because the southern half is leaning away from the Sun.' },
  ],
};
