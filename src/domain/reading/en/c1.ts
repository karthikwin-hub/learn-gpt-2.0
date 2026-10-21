import type { Chapter } from '../types';

export const C1: Chapter = {
  knot: 'C1',
  title: 'States of India',
  intro:
    'Look at the last line of your home address. Before the PIN code, it names a state. India is one country, but it is so big and so varied that it is divided into smaller parts, each with its own government, capital and often its own main language. In this chapter you will learn what states and union territories are, how they came to be drawn, and how to find your own state and its neighbours.',
  sections: [
    {
      heading: 'One country, many parts',
      paras: [
        'India has more than 140 crore people, more than any other country. No single office could look after the schools, roads, hospitals and police of so many people. So India is divided into 28 [[state|states]] and 8 [[union-territory|union territories]].',
        'Each state has its own elected government, led by a Chief Minister, and its own legislative assembly. The city where the state government works is the state’s [[capital|capital]]. Hyderabad is the capital of Telangana, Chennai of Tamil Nadu, Kolkata of West Bengal, Mumbai of Maharashtra and Bengaluru of Karnataka.',
      ],
      figure: 'C1:what',
      caption: 'India’s 28 states and 8 union territories.',
    },
    {
      heading: 'States and union territories',
      paras: [
        'A state looks after many of its own matters, such as schools, police, hospitals and roads, from its capital. A union territory is looked after mostly by the Union government in New Delhi.',
        'The eight union territories are Delhi, Jammu and Kashmir, Ladakh, Chandigarh, Puducherry, Lakshadweep, the Andaman and Nicobar Islands, and Dadra and Nagar Haveli and Daman and Diu. Some are small islands far out at sea; some are cities; Delhi, the national capital, has its own elected assembly too.',
        'Chandigarh is unusual: it is a union territory, and it is also the capital of two states, Punjab and Haryana.',
      ],
      didYouKnow:
        'The newest state is Telangana, formed on 2 June 2014. The newest union territory is Ladakh, formed on 31 October 2019.',
    },
    {
      heading: 'Why the borders are where they are',
      paras: [
        'When India became independent in 1947, its parts had been drawn by the British for their own convenience, and many princely states had their own rulers. People wanted states in which those who spoke one language could be governed in their own language.',
        'In 1953, after a long struggle and the fast of Potti Sriramulu, Andhra State was formed for Telugu speakers. In 1956 a new law redrew much of the map so that, as far as possible, people who speak one language share a state. That is why Tamil is the main language of Tamil Nadu, Kannada of Karnataka, Malayalam of Kerala and Bengali of West Bengal.',
        'The map has kept changing since then. Maharashtra and Gujarat were made from Bombay State in 1960; Punjab, Haryana and Himachal Pradesh were redrawn in 1966; Chhattisgarh, Jharkhand and Uttarakhand were formed in 2000.',
      ],
      figure: 'C1:idea',
      caption: 'Telangana, with its capital, Hyderabad.',
    },
    {
      heading: 'Big and small',
      paras: [
        'States come in very different sizes. Rajasthan is the largest by area: it is bigger than many countries. Uttar Pradesh has the most people, more than 20 crore. Goa is the smallest state by area, and Sikkim has the fewest people.',
        'The biggest city of a state is not always its capital. Ahmedabad is the biggest city in Gujarat, but the capital is Gandhinagar, a city built for the purpose. Mumbai is both the capital and the biggest city of Maharashtra.',
      ],
      figure: 'C1:mistake.reveal',
      caption: 'Gujarat: its capital is Gandhinagar, though Ahmedabad is bigger.',
    },
    {
      heading: 'Your state and its neighbours',
      paras: [
        'Every state shares borders with others. Telangana, for example, has four [[neighbour|neighbours]]: Maharashtra, Chhattisgarh, Andhra Pradesh and Karnataka. Neighbours share rivers, roads, railways and trade. A bus from Hyderabad to Bengaluru crosses from Telangana into Andhra Pradesh and then into Karnataka.',
        'Some states have a coastline on the sea; others are far inland. Some share a border with another country: India’s neighbours include Pakistan, China, Nepal, Bhutan, Bangladesh and Myanmar, and across the sea, Sri Lanka and the Maldives.',
        'Knowing your state tells you which government runs your school and your roads, which language most shop names are written in, and which states are next door.',
      ],
      figure: 'C1:why',
      caption: 'Telangana and its four neighbours.',
    },
    {
      heading: 'Addresses and PIN codes',
      paras: [
        'A letter finds its way because the address narrows down, line by line: house, street, town, district, state. Since 15 August 1972, every post office area also has a six-digit [[pin|PIN code]]. The first digit shows the region of India, so a letter can be sorted quickly. PIN codes in Telangana and Andhra Pradesh begin with 5, and in Tamil Nadu and Kerala with 6.',
        'Each state is divided into [[district|districts]], and each district into smaller blocks or tehsils. India has more than 700 districts.',
      ],
    },
    {
      heading: 'On the map of India',
      paras: [
        'On a map of India, find your own state first, then trace its border with your finger and name each neighbour you touch. Nine states have a coastline: Gujarat, Maharashtra, Goa, Karnataka and Kerala on the Arabian Sea, and Tamil Nadu, Andhra Pradesh, Odisha and West Bengal on the Bay of Bengal.',
        'Notice how the states of the north-east, Assam, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura and Meghalaya, are joined to the rest of India by a narrow strip of land in West Bengal, sometimes called the Chicken’s Neck.',
      ],
      figure: 'map:coast',
      caption: 'The nine coastal states, from Gujarat round to West Bengal.',
    },
  ],
  words: [
    {
      id: 'state',
      word: 'state',
      meaning: 'A part of India with its own elected government and capital.',
    },
    {
      id: 'union-territory',
      word: 'union territory',
      meaning: 'A part of India looked after mostly by the Union government.',
    },
    {
      id: 'capital',
      word: 'capital',
      meaning: 'The city where a state or country’s government works.',
    },
    {
      id: 'neighbour',
      word: 'neighbour state',
      meaning: 'A state that shares a border with another.',
    },
    {
      id: 'district',
      word: 'district',
      meaning: 'A smaller part of a state, with its own offices.',
    },
    {
      id: 'pin',
      word: 'PIN code',
      meaning: 'A six-digit number that tells the post office where a letter should go.',
    },
  ],
  activity: {
    title: 'My state card',
    steps: [
      'Take a card and write the name of your state at the top.',
      'Write its capital, its main language, and your district.',
      'Ask at home for your PIN code. What is its first digit?',
      'In an atlas, find your state and list all the states and countries that touch it. Which one would you like to visit first?',
    ],
  },
  questions: [
    {
      q: 'How many states and union territories does India have?',
      a: '28 states and 8 union territories.',
    },
    { q: 'What is the capital of Telangana?', a: 'Hyderabad.' },
    {
      q: 'Is the capital of a state always its biggest city? Give an example.',
      a: 'No. Gujarat’s capital is Gandhinagar, but its biggest city is Ahmedabad.',
    },
    {
      q: 'Why were many state borders redrawn in 1956?',
      a: 'So that people who speak one language could, as far as possible, share a state.',
    },
    {
      q: 'Which city is the capital of two states?',
      a: 'Chandigarh, the capital of Punjab and Haryana.',
    },
  ],
};
