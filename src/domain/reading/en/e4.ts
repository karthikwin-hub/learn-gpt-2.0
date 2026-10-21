import type { Chapter } from '../types';

export const E4: Chapter = {
  knot: 'E4',
  title: 'Reading a map',
  intro:
    'How do you find a friend’s house in a new part of town? How does a pilot know where to fly, or a phone know which way to send you? The answer is a map. A map lets you hold a whole street, a whole state or the whole world in your hands. In this chapter you will learn the three keys that unlock every map: direction, symbols and scale.',
  sections: [
    {
      heading: 'What is a map?',
      paras: [
        'A [[map|map]] is a drawing of a place as seen from above, made smaller by the same amount everywhere. Imagine you are a bird flying over your school. You would see the tops of buildings, the shape of the playground and the lines of paths. A map draws what the bird sees.',
        'A [[globe|globe]] is a model of the Earth, round like the Earth itself. It shows the shapes of countries truly, but you cannot fold it into your pocket, and it is too small to show your street. A map is flat, so it can show any place in as much detail as you need.',
      ],
      figure: 'E4:prashna',
      caption: 'A courtyard seen from above: a gate, a well, a tree, a tulsi plant and a house.',
    },
    {
      heading: 'The first key: direction',
      paras: [
        'There are four main [[direction|directions]]: north, south, east and west. On most maps north is at the top. Then east is on the right, south at the bottom, and west on the left. A small arrow marked N on the map shows which way north is.',
        'Between them are four more: north-east, south-east, south-west and north-west. With eight directions you can describe any way to go.',
        'Outside, you can find north with a [[compass|compass]], whose magnetic needle always points north and south. At night, the Pole Star stays still in the northern sky while other stars wheel around it. In the morning, the Sun rises roughly in the east.',
      ],
      didYouKnow:
        'Sailors from India crossed the Arabian Sea and the Bay of Bengal for thousands of years, finding their way by the stars, the winds and the colour of the sea.',
    },
    {
      heading: 'The second key: symbols',
      paras: [
        'A map cannot draw every brick and leaf, so it uses [[symbol|symbols]]: small signs that stand for real things. A cross might be a hospital, a line of short crossbars a railway, a blue line a river.',
        'Colours are symbols too. Blue is used for water. Green often shows low, flat land and forests. Yellow and brown show higher land, and the darkest brown the highest mountains.',
        'Every map has a box called the [[legend|legend]] or key, which lists its symbols and what they mean. Always read the legend first.',
      ],
    },
    {
      heading: 'The third key: scale',
      paras: [
        'A map shrinks everything by the same amount, so shapes stay true and distances can be worked out. The [[scale|scale]] tells you how much. It might say 1 centimetre = 1 kilometre, or show a little ruler with distances marked on it.',
        'To find a real distance, measure on the map and multiply by the scale. On the courtyard map, each square is 5 metres. The walk from the gate to the well is 9 squares, so it is 9 × 5 = 45 metres.',
        'Be careful: multiply, do not add. If each square is 10 metres, 3 squares are 3 × 10 = 30 metres, not 3 + 10.',
      ],
      figure: 'E4:example@3',
      caption: 'Gate to well: 9 squares × 5 m = 45 m.',
    },
    {
      heading: 'Kinds of maps',
      paras: [
        'Different maps show different things. A [[physical|physical map]] shows the land itself: mountains, plateaus, plains, rivers and seas. A political map shows the boundaries of countries and states, and their capitals and cities. A thematic map shows one theme, such as rainfall, crops, forests or roads.',
        'An atlas is a book of maps. A small drawing made from memory, without an exact scale, is a sketch; the drawing a builder uses for one house, with a large scale, is a plan.',
        'India’s official maps are made by the Survey of India, which was set up in 1767. Its surveyors once measured the whole country, step by careful step, over many decades. Today satellites help them.',
      ],
      figure: 'E4:mistake.reveal',
      caption: '3 squares of 10 m each: 3 × 10 = 30 m.',
      didYouKnow:
        'Mount Everest is named after George Everest, who led the Survey of India. Its height was first measured by surveyors working from India, including Radhanath Sikdar, in 1852.',
    },
    {
      heading: 'Maps all around us',
      paras: [
        'Once you know the three keys, you will find maps everywhere: the map on a phone, the metro map at a station, the route map at a bus stand, the school atlas, the map of your state on the classroom wall. Each one has a direction, symbols and a scale, even if it hides them a little.',
      ],
    },
  ],
  words: [
    {
      id: 'map',
      word: 'map',
      meaning: 'A drawing of a place seen from above, made smaller by the same amount everywhere.',
    },
    { id: 'globe', word: 'globe', meaning: 'A round model of the Earth.' },
    {
      id: 'direction',
      word: 'direction',
      meaning: 'North, south, east, west, and the four between them.',
    },
    {
      id: 'compass',
      word: 'compass',
      meaning: 'A tool whose magnetic needle points north and south.',
    },
    {
      id: 'symbol',
      word: 'symbol',
      meaning: 'A small sign on a map that stands for a real thing.',
    },
    { id: 'legend', word: 'legend', meaning: 'The box on a map that explains its symbols.' },
    { id: 'scale', word: 'scale', meaning: 'How much a map is shrunk, such as 1 cm = 1 km.' },
    {
      id: 'physical',
      word: 'physical map',
      meaning: 'A map of the land itself: mountains, plains, rivers and seas.',
    },
  ],
  activity: {
    title: 'Map your room',
    steps: [
      'Measure your room by walking heel to toe. Count how many of your feet long and wide it is.',
      'On squared paper, let 1 square stand for 1 of your feet. Draw the walls.',
      'Add the door, window, bed and cupboard, using a simple symbol for each. Make a legend.',
      'Draw an arrow for north. Then give the map to someone and see if they can find a hidden coin with it.',
    ],
  },
  questions: [
    { q: 'On most maps, which direction is at the top?', a: 'North.' },
    { q: 'What are the three keys to reading a map?', a: 'Direction, symbols and scale.' },
    { q: 'On a map, 1 square is 5 m. How long is a path of 6 squares?', a: '6 × 5 = 30 m.' },
    { q: 'What colour is used for water on most maps?', a: 'Blue.' },
    { q: 'Which map would you use to find the capital of a state?', a: 'A political map.' },
  ],
};
