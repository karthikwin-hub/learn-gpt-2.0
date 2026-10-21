import type { Chapter } from '../types';

export const C5: Chapter = {
  knot: 'C5',
  title: 'The northern plains',
  intro:
    'South of the Himalaya lies a vast, flat land, so level that you can look across fields to the edge of the sky. It is green with wheat in winter and rice in the rains, and it is crowded with villages, towns and some of India’s biggest cities. This land was built by rivers, grain by grain. In this chapter you will learn how the northern plains were made, why their soil is so rich, and why so many people live there.',
  sections: [
    {
      heading: 'A land between mountain and plateau',
      paras: [
        'The northern [[plain|plains]] stretch between the Himalaya in the north and the Deccan plateau in the south. They are about 2,400 kilometres long and 240 to 320 kilometres wide, and they run from Punjab in the west, through Haryana, Uttar Pradesh and Bihar, to West Bengal and Assam in the east.',
        'Three great river systems flow across them: the Indus in the west, the Ganga in the middle and the Brahmaputra in the east. That is why they are also called the Indo-Gangetic plains.',
      ],
      figure: 'C5:what',
      caption: 'A flat plain of silt, with crops and a house.',
    },
    {
      heading: 'Built by rivers',
      paras: [
        'Every monsoon, heavy rain falls on the Himalaya. It washes soil and crumbs of rock off the steep slopes into the rivers, which turn brown and muddy. This fine soil carried by a river is called [[silt|silt]].',
        'When a river leaves the mountains and reaches low land, it slows down. When it [[flood|floods]], its water spreads out over the land and slows down even more, and the silt sinks and settles. When the flood goes, a thin new layer of silt is left behind.',
        'Flood after flood, for many thousands of years, layer on layer, the silt filled up the low land in front of the mountains, until it became a deep, flat plain. In places the silt is hundreds of metres deep.',
      ],
      figure: 'C5:example@1',
      caption: 'Rain on the mountains; the river carries silt down to the low land.',
    },
    {
      heading: 'Layer on layer',
      paras: [
        'Soil made of silt brought by rivers is called [[alluvium|alluvial soil]]. It is soft, deep and full of the food that plants need, and it holds water well. It is easy to plough because it has no big stones.',
        'Farmers have two words for it. Bhangar is the older alluvium on higher ground, beyond the reach of floods. Khadar is the new alluvium near the rivers, renewed by floods almost every year and the richest of all.',
      ],
      figure: 'C5:idea',
      caption: 'Layers of silt in the low land: 2 of 4.',
      didYouKnow:
        'Rivers do not only wash soil away; they also bring it. The Ganga and the Brahmaputra carry so much silt that they have built the largest delta in the world, where India and Bangladesh meet the sea.',
    },
    {
      heading: 'Doabs and five rivers',
      paras: [
        'Many rivers cross the plains, and the land between two rivers that join is called a [[doab|doab]], from the Persian words for two waters. The land between the Ganga and the Yamuna, in Uttar Pradesh, is a famous doab, among the most fertile land in India.',
        'The name Punjab comes from Persian too: panj means five and ab means water. It is the land of five rivers: the Jhelum, the Chenab, the Ravi, the Beas and the Sutlej, all of which flow into the Indus.',
      ],
    },
    {
      heading: 'The food bowl of India',
      paras: [
        'With rich soil, flat land and rivers that flow all year, the northern plains have some of the best farmland in the world. Fields of wheat, rice and sugarcane cover Punjab, Haryana, Uttar Pradesh, Bihar and West Bengal. Farmers also grow pulses, mustard, potatoes and vegetables.',
        'Canals carry river water to fields far from the rivers, and tube wells pump water from under the ground, so farmers can grow two or even three crops a year.',
      ],
      figure: 'C5:prashna',
      caption: 'Layers of silt in the low land: 4 of 4.',
    },
    {
      heading: 'Many people, and some floods',
      paras: [
        'Because farming is easy, the plains have had many people for thousands of years. About 4 in every 10 Indians live in the states of the northern plains. Great cities stand here: Delhi, Lucknow, Kanpur, Patna, Kolkata and many more. Flat land also makes it easy to build roads and railways, so the plains are criss-crossed by them.',
        'But living by rivers has a cost. In a heavy monsoon, rivers can burst their banks and flood villages. The Kosi in Bihar changes its course so often and floods so badly that it has been called the sorrow of Bihar. People build embankments and watch for flood warnings, and the same floods also bring the next layer of fresh silt.',
      ],
    },
    {
      heading: 'On the map of India',
      paras: [
        'On a map of India, the northern plains are the wide band of low land just south of the Himalaya. Follow the Ganga across it with your finger: from Haridwar through Uttar Pradesh and Bihar to West Bengal. In the west, the plains spread into Punjab and Haryana; in the east, the Brahmaputra carries them up into Assam.',
      ],
    },
  ],
  words: [
    { id: 'plain', word: 'plain', meaning: 'Low, flat land, often made of river silt.' },
    { id: 'silt', word: 'silt', meaning: 'Fine soil carried and dropped by a river.' },
    {
      id: 'flood',
      word: 'flood',
      meaning: 'When a river overflows its banks and spreads water over the land.',
    },
    { id: 'alluvium', word: 'alluvial soil', meaning: 'Rich soil made of silt brought by rivers.' },
    { id: 'doab', word: 'doab', meaning: 'The land between two rivers that meet.' },
  ],
  activity: {
    title: 'Make silt settle',
    steps: [
      'Fill a clear bottle with water and add two spoons of soil from a garden.',
      'Shake it hard: this is a muddy monsoon river.',
      'Stand it on a shelf and do not touch it. Look after 10 minutes, after an hour, and the next day.',
      'Which settles first, the heavy grains or the fine ones? Draw the layers you see.',
    ],
  },
  questions: [
    { q: 'What is silt?', a: 'Fine soil carried and dropped by a river.' },
    {
      q: 'How did the northern plains form?',
      a: 'Rivers carried silt down from the Himalaya and dropped it, flood after flood, layer on layer.',
    },
    {
      q: 'Why is the soil of the plains good for farming?',
      a: 'It is soft, deep, full of plant food, holds water and has no big stones.',
    },
    { q: 'What does Punjab mean?', a: 'Five waters: the land of five rivers.' },
    {
      q: 'Name three crops grown on the northern plains.',
      a: 'Wheat, rice and sugarcane, among others.',
    },
  ],
};
