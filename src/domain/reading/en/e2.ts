import type { Chapter } from '../types';

export const E2: Chapter = {
  knot: 'E2',
  title: 'Land, water, air and life',
  intro:
    'Astronauts who look down at the Earth from space say the same thing: it is blue. From up there you can see oceans, brown and green land, white swirls of cloud and a thin glowing line of air at the edge. Scientists divide the Earth into four parts that fit together: land, water, air and life. In this chapter you will meet all four, and learn why the water we can drink is far more precious than it looks.',
  sections: [
    {
      heading: 'The blue planet',
      paras: [
        'When you look at a globe, most of it is blue. That blue is water. About 71 parts in every 100 of the Earth’s surface are covered by water, and only 29 parts are land.',
        'The land is in seven large pieces called [[continent|continents]]: Asia, Africa, North America, South America, Antarctica, Europe and Australia. India is in Asia, the biggest continent. The water is in five great [[ocean|oceans]]: the Pacific, the Atlantic, the Indian, the Southern and the Arctic. The Indian Ocean is the only ocean named after a country.',
      ],
      figure: 'E2:prashna',
      caption: 'The Earth seen from space: mostly blue.',
    },
    {
      heading: 'Four domains',
      paras: [
        'The Earth has four [[domain|domains]]. The [[lithosphere|lithosphere]] is the solid land: rock, soil, mountains and the floor of the oceans. The [[hydrosphere|hydrosphere]] is all the water: oceans, rivers, lakes, ice, and water underground. The [[atmosphere|atmosphere]] is the blanket of air around the Earth. The [[biosphere|biosphere]] is everywhere that life is found.',
        'Every thing around you belongs to one of them. A pebble is lithosphere. A pond is hydrosphere. The wind is atmosphere. A sparrow, a mango tree and you are all part of the biosphere.',
      ],
      figure: 'E2:what',
      caption: 'Lithosphere, hydrosphere, atmosphere and biosphere.',
    },
    {
      heading: 'The land and the air',
      paras: [
        'The highest point on the land is the top of Mount Everest, 8,849 metres above the sea, on the border of Nepal and China. The deepest point is far under the Pacific Ocean, in the Mariana Trench, about 11,000 metres down. Even so, all of this is just a thin skin on the outside of the Earth.',
        'The air is mostly two gases: nitrogen, about 78 parts in 100, and oxygen, about 21 parts in 100. We breathe in the oxygen. The air also holds water vapour, which makes clouds and rain, and it acts like a blanket, keeping the Earth warm at night and shielding us from the harshest rays of the Sun.',
        'The air gets thinner as you go up. Half of all the air is within about five and a half kilometres of the ground. That is why climbers on Everest often carry bottles of oxygen.',
      ],
      figure: 'E2:idea',
      caption: 'Of 100 squares of the Earth’s surface, 71 are water and 29 are land.',
      didYouKnow:
        'If the Earth were the size of an apple, the air around it would be thinner than the apple’s skin.',
    },
    {
      heading: 'Life lives where they meet',
      paras: [
        'Life needs land, water and air together. A tree needs soil to stand in, water to drink and air to breathe. A fish needs water with air mixed into it. That is why the biosphere is a narrow zone where the other three meet, from the bottom of the sea to a few kilometres up into the sky.',
        'The seashore is a good place to see all four domains at once: rock and sand, the waves, the wind, and crabs, fish and seabirds.',
      ],
    },
    {
      heading: 'How much water can we use?',
      paras: [
        'There seems to be water everywhere, so why do towns run short of it in summer? Imagine sharing all the water on Earth into 100 drops.',
        '97 drops are salty, in the oceans and seas. We cannot drink salt water, and it kills crops. 2 drops are frozen, in the ice sheets of Antarctica and Greenland and in glaciers on high mountains. That leaves only about 1 drop in 100 that is [[fresh|fresh water]] we can use, in rivers, lakes and under the ground.',
        'All the people, farms and factories of the world share that 1 drop. In India, most of our fresh water comes from the monsoon rains, which fill rivers, lakes and wells, and soak into the ground.',
      ],
      figure: 'E2:example@2',
      caption: 'Take away the 97 salty drops: only 3 of 100 are left.',
    },
    {
      heading: 'Saving the one drop',
      paras: [
        'Because fresh water is so precious, every drop saved counts. Turn the tap off while brushing your teeth. Use a bucket instead of a hose to wash a scooter or a car. Fix dripping taps; one drip a second wastes thousands of litres in a year.',
        'Many places in India collect rain from rooftops and send it into tanks or into the ground. This is called rainwater harvesting. In Rajasthan, people have stored rainwater in stepwells and tanks for hundreds of years.',
      ],
      figure: 'E2:where',
      caption: 'About 1 drop in 100 is fresh water we can use.',
      didYouKnow:
        'Chennai made rooftop rainwater harvesting compulsory for buildings in 2003, and in the years after, the water under the ground in many parts of the city rose.',
    },
  ],
  words: [
    {
      id: 'continent',
      word: 'continent',
      meaning: 'One of the seven large pieces of land on Earth, such as Asia.',
    },
    {
      id: 'ocean',
      word: 'ocean',
      meaning: 'One of the five great bodies of salt water, such as the Indian Ocean.',
    },
    {
      id: 'domain',
      word: 'domain',
      meaning: 'One of the four parts of the Earth: land, water, air and life.',
    },
    { id: 'lithosphere', word: 'lithosphere', meaning: 'The solid land of rock and soil.' },
    { id: 'hydrosphere', word: 'hydrosphere', meaning: 'All the water on Earth.' },
    { id: 'atmosphere', word: 'atmosphere', meaning: 'The layer of air around the Earth.' },
    {
      id: 'biosphere',
      word: 'biosphere',
      meaning: 'The zone where life is found, where land, water and air meet.',
    },
    {
      id: 'fresh',
      word: 'fresh water',
      meaning: 'Water that is not salty, found in rivers, lakes and under the ground.',
    },
  ],
  activity: {
    title: 'One drop in a hundred',
    steps: [
      'Fill a bucket with 100 mugs of water, or a jug with 100 spoonfuls.',
      'Take out 97 into another bucket and add a spoon of salt: that is the ocean.',
      'Take out 2 more and put them in the freezer: that is the ice.',
      'Look at what is left: 1 part in 100. That is all the fresh water the world can use. Use it to water a plant.',
    ],
  },
  questions: [
    {
      q: 'Name the four domains of the Earth.',
      a: 'Lithosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).',
    },
    { q: 'How much of the Earth’s surface is water?', a: 'About 71 parts in every 100.' },
    {
      q: 'Which domain does a cloud belong to?',
      a: 'The hydrosphere, because it is made of water drops, floating in the atmosphere.',
    },
    { q: 'Of 100 drops of Earth’s water, how many are fresh water we can use?', a: 'About 1.' },
    {
      q: 'Why do climbers on Mount Everest carry oxygen?',
      a: 'The air is much thinner high up, so each breath has less oxygen.',
    },
  ],
};
