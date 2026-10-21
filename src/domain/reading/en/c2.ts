import type { Chapter } from '../types';

export const C2: Chapter = {
  knot: 'C2',
  title: 'Crops and seasons',
  intro:
    'The rice in your lunch, the wheat in your roti and the dal in your bowl were all grown by a farmer somewhere in India, at just the right time of year. Farmers do not sow whatever they like whenever they like. They follow the seasons, because every crop needs its own mix of water and warmth. In this chapter you will learn India’s three crop seasons, which crops grow in each, and how the farming year shapes our food and festivals.',
  sections: [
    {
      heading: 'Farming in India',
      paras: [
        'Nearly half of all working people in India work on farms. India grows more milk and pulses than any other country, and is second only to China for rice and wheat.',
        'A [[crop|crop]] is a plant grown on purpose for food, cloth or other uses. What a farmer can grow depends on the soil, the water and above all the season.',
      ],
    },
    {
      heading: 'Three crop seasons',
      paras: [
        'Indian farmers grow crops in three [[crop-season|crop seasons]]. The [[kharif|kharif]] season begins with the monsoon: crops are sown in June and July and harvested around October. The [[rabi|rabi]] season is the cool winter: crops are sown from October to December and harvested in March and April. The [[zaid|zaid]] season is a short summer season between the two, in March, April and May.',
        'The words come from Arabic: kharif means autumn, when the monsoon crops are harvested, and rabi means spring, when the winter crops are harvested.',
      ],
      figure: 'C2:what',
      caption:
        'Kharif sown in June and July, rabi from October to December, zaid in March and April.',
    },
    {
      heading: 'Kharif: crops of the rain',
      paras: [
        'The monsoon reaches Kerala around 1 June and spreads across India over the next six weeks. As the rain fills the fields, farmers plant the kharif crops: rice, cotton, maize, soybean, groundnut, and millets such as jowar and bajra.',
        'Rice needs a great deal of water. Young rice plants grow in fields flooded with water, called paddy fields. In July, in much of India, you can see farmers bent over these watery fields, pushing seedlings into the mud one by one. The rice is cut in October.',
      ],
      figure: 'C2:example@1',
      caption: 'July: the monsoon fills the field, and rice is planted.',
      didYouKnow:
        'India asked the world to celebrate millets, and the United Nations named 2023 the International Year of Millets. Millets such as ragi, jowar and bajra need little water and are full of goodness.',
    },
    {
      heading: 'Rabi: crops of the cool winter',
      paras: [
        'After the monsoon, the soil stays damp, and the days grow cool and dry. Now farmers sow the rabi crops: wheat, mustard, gram (chana), barley and peas. These crops do not like heavy rain; they need cool days to grow and warm, sunny days to ripen.',
        'Where there is not enough water left in the soil, farmers water the fields from wells, canals and tube wells. In March and April, the wheat turns golden and is harvested. The yellow flowers of mustard fields in winter are one of the most beautiful sights of the northern plains.',
      ],
      figure: 'C2:example@2',
      caption: 'November: the soil is damp and the days are cool, so wheat is sown.',
    },
    {
      heading: 'Zaid: a quick summer crop',
      paras: [
        'Between the rabi harvest and the monsoon, some farmers grow a short zaid crop where water is available. Watermelon, muskmelon, cucumber and vegetables love the summer heat and grow fast. That is why the markets fill with watermelons in April and May.',
      ],
      figure: 'C2:example@3',
      caption: 'April: after the wheat is cut, watermelon grows in the summer heat.',
    },
    {
      heading: 'The wrong season',
      paras: [
        'A crop sown in the wrong season gets too much water or too little, or the wrong warmth, and the harvest fails. Wheat sown in June would rot in the monsoon rain. Rice sown in winter would not get enough water or warmth. Farmers follow the seasons so that one field can feed a family through the year.',
        'When the monsoon comes late or brings too little rain, the kharif crop suffers, and prices in the market rise. This is why the whole country watches the monsoon forecast each year.',
      ],
      figure: 'C2:mistake.reveal',
      caption: 'June suits rice, not wheat.',
    },
    {
      heading: 'Harvest festivals',
      paras: [
        'Many festivals come when a harvest is brought in. In mid-January, Pongal in Tamil Nadu, Lohri in Punjab, Magh Bihu in Assam and Makar Sankranti in many states celebrate the winter harvest. In April, Baisakhi in Punjab marks the wheat harvest. Onam in Kerala, in August or September, is a harvest festival too.',
        'In the 1960s, India often did not grow enough grain to feed everyone. Scientists such as M. S. Swaminathan helped farmers use better seeds, water and fertiliser. This change, called the Green Revolution, started in Punjab and Haryana, and India became able to feed itself.',
      ],
    },
    {
      heading: 'On the map of India',
      paras: [
        'Different crops grow best in different parts of India. Rice grows across the wet east and south and along the rivers: in West Bengal, Uttar Pradesh, Punjab, Odisha, Andhra Pradesh and Telangana. Wheat grows in the cooler north-west: Uttar Pradesh, Punjab, Haryana and Madhya Pradesh.',
        'Cotton likes the black soil of the Deccan, in Gujarat, Maharashtra and Telangana. Tea grows on the rainy hill slopes of Assam and Darjeeling in West Bengal, and coffee in the hills of Karnataka and Kerala.',
      ],
      figure: 'map:rice',
      caption: 'Some of the states where rice grows, and the tea hills of Darjeeling.',
    },
  ],
  words: [
    {
      id: 'crop',
      word: 'crop',
      meaning: 'A plant grown on purpose for food, cloth or other uses.',
    },
    {
      id: 'crop-season',
      word: 'crop season',
      meaning: 'The time of year when certain crops are sown and grown.',
    },
    {
      id: 'kharif',
      word: 'kharif',
      meaning: 'The monsoon crop season: sown in June and July, cut around October.',
    },
    {
      id: 'rabi',
      word: 'rabi',
      meaning: 'The winter crop season: sown from October to December, cut in March and April.',
    },
    { id: 'zaid', word: 'zaid', meaning: 'A short summer crop season between rabi and kharif.' },
  ],
  activity: {
    title: 'A kitchen crop calendar',
    steps: [
      'With an adult, list ten foods in your kitchen: rice, wheat flour, dal, mustard oil, peanuts, and so on.',
      'For each, find out which crop it comes from.',
      'Sort the crops into kharif, rabi and zaid.',
      'Draw a circle with twelve months and mark when each crop is sown and harvested.',
    ],
  },
  questions: [
    { q: 'Name India’s three crop seasons.', a: 'Kharif, rabi and zaid.' },
    { q: 'Why is rice a kharif crop?', a: 'It needs a lot of water, which the monsoon brings.' },
    {
      q: 'When is wheat sown and when is it harvested?',
      a: 'Sown from October to December; harvested in March and April.',
    },
    {
      q: 'What would happen to wheat sown in June?',
      a: 'It would get too much rain and warmth, and the harvest would fail.',
    },
    {
      q: 'Name a harvest festival celebrated in mid-January.',
      a: 'Pongal, Lohri, Magh Bihu or Makar Sankranti.',
    },
  ],
};
