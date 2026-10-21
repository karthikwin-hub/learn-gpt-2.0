import type { Chapter } from '../types';

export const C3: Chapter = {
  knot: 'C3',
  title: 'Where people settle',
  intro:
    'Why is your town where it is? Why not ten kilometres to the left, or on top of the nearest hill? Every village, town and city began when people chose a place to live, and they chose for good reasons. In this chapter you will learn what people need from a place, how a village can grow into a town and a town into a city, and why some places stay almost empty.',
  sections: [
    {
      heading: 'What is a settlement?',
      paras: [
        'A [[settlement|settlement]] is a place where people live together: a village, a town or a city. A hamlet is a tiny group of houses. A [[village|village]] is a little bigger, and most people there farm. A town has shops, offices and a market, and many people do work other than farming. A city is very large, with lakhs of people.',
        'India has more than six lakh villages. When the census counted India in 2011, about 69 in every 100 Indians lived in villages.',
      ],
      figure: 'C3:example@0',
      caption: 'A land seen from above: hills, a river, a lake, two roads and some sand.',
    },
    {
      heading: 'Three needs',
      paras: [
        'People settle where they can meet their needs. Three things matter most. Water, to drink and to farm with. Flat land, for fields and houses. And ways to travel and [[trade|trade]], such as a river, the sea or a road.',
        'With one of these, people can make a village. With two, a town can grow. Where all three meet, a city can grow.',
        'Look at the land in the picture. Where would you build your first house? Not on the dry hilltop, with no water. Not in the steep valley, with no room for fields. The river bank, with water, flat land and a river to travel on, is the best place.',
      ],
      figure: 'C3:why',
      caption: 'Nobody on the dry hilltop; a city on the river bank.',
    },
    {
      heading: 'From village to city',
      paras: [
        'Imagine a river bank, long ago. A few families settle there for the water, and farm the flat land: a village.',
        'Boats come along the river and a road passes nearby, bringing traders. People come to buy and sell grain, cloth and pots. A market grows, then shops and workshops: a town.',
        'More roads arrive, a bridge is built, then a railway station, schools, hospitals and factories. People come from far away for work. The town spreads in all directions: a city.',
      ],
      figure: 'C3:example@2',
      caption: 'Boats and a road bring traders, and the village becomes a town.',
    },
    {
      heading: 'Cities on rivers and coasts',
      paras: [
        'Many of India’s oldest cities stand on rivers. Varanasi, on the Ganga, is one of the oldest cities in the world where people have lived without a break. Patna, once called Pataliputra, was the capital of great empires, where the Son river meets the Ganga. The Harappan towns, over 4,500 years ago, grew beside the Indus and its rivers.',
        'Other cities grew by the sea, where ships could come and go. [[port|Ports]] such as Mumbai, Chennai, Kochi and Visakhapatnam trade with the whole world. Kolkata grew on the Hooghly, a branch of the Ganga close to the sea.',
        'Some towns grew where roads meet, or at railway junctions where trains change lines. Hill towns such as Shimla and Ooty grew because they were cool in summer.',
      ],
      figure: 'C3:example@3',
      caption: 'More roads, a bridge and work for many: a city.',
      didYouKnow:
        'Mumbai began as seven small islands. From the 1700s onwards, the gaps between them were filled in with land to make one big island city.',
    },
    {
      heading: 'Places that stay empty',
      paras: [
        'Some places have very few people. The highest mountains are too cold and steep. The driest parts of the Thar desert have little water. Thick forests and swamps are hard to clear and travel through.',
        'But people are clever. In the desert, families store rainwater in covered tanks. In the hills, they cut terraced fields into the slopes. Where a canal or a road arrives, new villages often appear.',
      ],
    },
    {
      heading: 'Cities today',
      paras: [
        'India’s cities keep growing, because people come for work, schools and hospitals. Delhi, Mumbai and Kolkata each have more than a crore people in and around them. Big cities need huge amounts of water, electricity, buses and trains, and places to put their waste.',
        'Planners now try to help towns grow well: with parks, clean water, good buses and safe roads. Some cities were planned from the start. Chandigarh was designed in the 1950s by the architect Le Corbusier, divided into neat sectors, each with its own market and school.',
      ],
    },
    {
      heading: 'On the map of India',
      paras: [
        'Put the big cities on a map of India and a pattern appears. Delhi stands on the Yamuna. Kolkata is on the Hooghly near the sea. Mumbai and Chennai are on the coast. Hyderabad and Bengaluru, on the high Deccan, grew where old trade roads met, and both built large lakes and tanks to store water.',
        'Now look at the places with few dots: the high Himalaya, the dry west of Rajasthan, and the thick forests of the north-east. The map of where people live follows the map of water and flat land.',
      ],
    },
  ],
  words: [
    {
      id: 'settlement',
      word: 'settlement',
      meaning: 'A place where people live: a village, a town or a city.',
    },
    { id: 'village', word: 'village', meaning: 'A small settlement where most people farm.' },
    { id: 'trade', word: 'trade', meaning: 'Buying and selling goods.' },
    {
      id: 'port',
      word: 'port',
      meaning: 'A town or city by the sea or a river where ships load and unload.',
    },
  ],
  activity: {
    title: 'Why is my town here?',
    steps: [
      'Ask an older person in your family how your town or village looked when they were young.',
      'On a map or atlas, find your town. Is it near a river, the sea, a road or a railway?',
      'Which of the three needs, water, flat land and ways to travel, does your town have?',
      'Draw your town and mark the oldest part. Is it near water?',
    ],
  },
  questions: [
    { q: 'What is a settlement?', a: 'A place where people live: a village, a town or a city.' },
    {
      q: 'What three things help a settlement grow?',
      a: 'Water, flat land, and ways to travel and trade.',
    },
    {
      q: 'Why is nobody living on the dry hilltop?',
      a: 'There is no water and no flat land for fields.',
    },
    {
      q: 'Why did cities such as Mumbai and Chennai grow by the sea?',
      a: 'Ships could come and go, so they became ports for trade.',
    },
    { q: 'Name one old city on the Ganga.', a: 'Varanasi or Patna.' },
  ],
};
