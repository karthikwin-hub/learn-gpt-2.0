import type { Chapter } from '../types';

export const E3: Chapter = {
  knot: 'E3',
  title: 'Mountains, plateaus and plains',
  intro:
    'If you travel across India by train, the land outside the window keeps changing. Flat fields stretch to the sky; then the line climbs onto high, flat land; far to the north, snowy peaks rise into the clouds. These shapes of the land are called landforms. In this chapter you will learn the three big landforms, how to tell them apart, and why each one shapes how people live.',
  sections: [
    {
      heading: 'Shapes of the land',
      paras: [
        'A [[landform|landform]] is a natural shape of the land. The three biggest are mountains, [[plateau|plateaus]] and [[plain|plains]]. Two questions tell them apart. How high is the land? And what is the shape of its top?',
        'High land with a peaked top and steep sides is a [[mountain|mountain]]. High land with a wide, flat top is a plateau, like a table. Low, flat land is a plain.',
        'Heights are measured from the level of the sea. A place 1,000 metres above sea level is one kilometre higher than the beach.',
      ],
      figure: 'E3:what',
      caption: 'A mountain, a plateau and a plain.',
    },
    {
      heading: 'Mountains',
      paras: [
        'India has the highest mountains in the world: the Himalaya, which runs for about 2,400 kilometres along the north of the country. Its name means home of snow. Mount Everest, the highest peak on Earth at 8,849 metres, is in the Himalaya in Nepal. The highest peak in India is Kangchenjunga, 8,586 metres, in Sikkim.',
        'Mountains are cold, because the air gets cooler as you climb. Their slopes are steep, so farming and building are hard, and few people live high up. But mountains matter to everyone: their snow and glaciers feed great rivers such as the Ganga and the Brahmaputra, and they hold back cold winds from the north.',
        'India has older, lower mountains too: the Aravalli hills in Rajasthan are among the oldest mountains in the world, worn down over a very long time.',
      ],
      figure: 'C4:what',
      caption: 'The Himalaya rises in three ranges, each higher than the last.',
    },
    {
      heading: 'Plateaus',
      paras: [
        'A plateau is high, like a mountain, but its top is wide and mostly flat. The edges of a plateau are often steep, like the sides of a table.',
        'The Deccan Plateau covers most of southern India, between the Western Ghats and the Eastern Ghats. Long ago, huge flows of lava spread over this land and hardened into dark rock. That rock has slowly broken down into black soil, which is very good for growing cotton.',
        'The Chota Nagpur Plateau, in Jharkhand and nearby states, is rich in [[mineral|minerals]] such as coal and iron. Plateaus often have waterfalls where rivers drop off their edges.',
      ],
      figure: 'E3:prashna',
      caption: 'High land with a flat top, like a table: a plateau.',
      didYouKnow:
        'Many people call the Deccan a mountain because it is high. But height alone does not decide: the top does. High with a flat top makes it a plateau.',
    },
    {
      heading: 'Plains',
      paras: [
        'A plain is low, flat land. Most plains are made by rivers. When rivers flood, they spread fine soil called silt over the land. Layer after layer, over thousands of years, the silt builds up into a deep, soft, rich plain.',
        'The great Northern Plains of India, along the Indus, the Ganga and the Brahmaputra, are among the largest and most fertile plains in the world. Narrow coastal plains also run along the edge of the sea on both sides of the peninsula.',
      ],
      figure: 'C5:what',
      caption: 'A flat plain of silt, with crops and a house.',
    },
    {
      heading: 'Why most people live on plains',
      paras: [
        'Plains are the easiest land to live on. The soil is rich, the fields are flat and easy to plough, water is close by in rivers and wells, and roads and railways are easy to build. That is why most people in the world live and farm on plains, and why many of the biggest cities in India, such as Delhi, Kolkata, Lucknow and Patna, stand on plains.',
        'Each landform shapes how people live. In the mountains, people build terraced fields like steps on the slopes, keep sheep and yaks, and welcome tourists. On plateaus, people mine minerals and grow cotton and millets. On plains, people grow wheat, rice and sugarcane, and towns and factories crowd together.',
      ],
    },
    {
      heading: 'Other landforms',
      paras: [
        'Between mountains lie [[valley|valleys]], low land often with a river at the bottom, such as the Kashmir Valley. Small, rounded mountains are called hills. Land surrounded by water on all sides is an island: India has more than a thousand, including the Andaman and Nicobar Islands and Lakshadweep. And dry land with very little rain, like the Thar in Rajasthan, is a desert.',
        'The Deccan Plateau has raised edges. Along the west coast run the Western Ghats, a long wall of steep, forested hills that catch the monsoon rain. Along the east run the Eastern Ghats, lower and broken into pieces by rivers flowing to the Bay of Bengal.',
      ],
    },
  ],
  words: [
    { id: 'landform', word: 'landform', meaning: 'A natural shape of the land, such as a mountain, plateau or plain.' },
    { id: 'mountain', word: 'mountain', meaning: 'High land with a peaked top and steep sides.' },
    { id: 'plateau', word: 'plateau', meaning: 'High land with a wide, flat top.' },
    { id: 'plain', word: 'plain', meaning: 'Low, flat land, often made of river silt.' },
    { id: 'mineral', word: 'mineral', meaning: 'A useful material dug from the ground, such as coal or iron.' },
    { id: 'valley', word: 'valley', meaning: 'Low land between hills or mountains, often with a river.' },
  ],
  activity: {
    title: 'Landforms in a tray',
    steps: [
      'Take a tray and some damp sand or clay.',
      'Build a tall peak with steep sides: a mountain. Build a high block with a flat top: a plateau. Smooth one corner flat and low: a plain.',
      'Pour a little water slowly onto the mountain top. Where does it run? Where does the sand it carries settle?',
      'Look at a map of India in your atlas and find one mountain range, one plateau and one plain.',
    ],
  },
  questions: [
    { q: 'What two things tell a mountain, a plateau and a plain apart?', a: 'How high the land is, and the shape of its top.' },
    { q: 'Is the Deccan a mountain or a plateau? Why?', a: 'A plateau: it is high, but its top is wide and mostly flat.' },
    { q: 'Which is the highest peak in India?', a: 'Kangchenjunga, 8,586 metres, in Sikkim.' },
    { q: 'Why do most people live on plains?', a: 'The soil is rich, the land is flat to farm, water is close, and roads are easy to build.' },
    { q: 'Which soil of the Deccan is good for cotton?', a: 'Black soil, formed from old lava rock.' },
  ],
};
