import type { Chapter } from '../types';

export const C6: Chapter = {
  knot: 'C6',
  title: 'The Thar desert',
  intro:
    'In the west of India lies a land of golden sand dunes, thorny bushes, camels and painted forts. It is the Thar, India’s great desert. Its afternoons can be hot enough to cook an egg on a stone, and its winter nights cold enough to need a thick quilt. In this chapter you will learn why the Thar is dry, why its days and nights are so different, and how people, plants and animals have learned to live there.',
  sections: [
    {
      heading: 'Where is the Thar?',
      paras: [
        'The Thar, also called the Great Indian Desert, covers most of western Rajasthan and reaches into Gujarat, Punjab and Haryana, and across the border into Pakistan. Its towns include Jaisalmer, Bikaner, Barmer and Jodhpur.',
        'A [[desert|desert]] is a place that gets very little rain. In the driest parts of the Thar, less than 15 centimetres of rain falls in a whole year. Mumbai gets more than that in a few rainy days.',
        'Why so dry? The monsoon winds reach the Thar last and weakest, after dropping most of their rain elsewhere. And the Aravalli hills lie parallel to the winds, so they do not stop the clouds and make them rain.',
      ],
      figure: 'C6:prashna',
      caption: 'Summer, 3 in the afternoon: Thar 45 °C, seaside town 34 °C.',
    },
    {
      heading: 'Sand and dunes',
      paras: [
        'Not all of the Thar is sand; there is rock, gravel and scrub as well. But much of it is covered with [[dune|dunes]], hills of sand piled up by the wind. Some dunes are more than 100 metres high. Strong winds can move them, slowly changing the shape of the land.',
        'In summer, hot winds called loo blow across the desert, and dust storms can turn the sky orange.',
      ],
      didYouKnow:
        'India’s highest temperature on record, 51 °C, was measured at Phalodi in the Thar on 19 May 2016.',
    },
    {
      heading: 'Hot days, cold nights',
      paras: [
        'Sand heats up fast in the sun and cools down fast at night. And the dry, clear air of the desert has no clouds to hold the heat in, so at night it escapes into the sky. That is why a desert day and night are so different.',
        'On a summer day in the Thar, it might be 25 °C at 6 in the morning and 45 °C at 3 in the afternoon, so hot that the sand burns bare feet. In a town by the sea, water warms and cools slowly, so the same day might only go from 27 °C to 34 °C.',
        'In winter the desert can be cold. The same dawn may be only 5 °C. So a desert is always dry, but it is not always hot.',
      ],
      figure: 'C6:idea',
      caption: 'In one summer day the Thar swings 20 °C; the seaside town only 7 °C.',
    },
    {
      heading: 'People of the desert',
      paras: [
        'People in the desert wear loose clothes that cover them from head to toe. This keeps off the burning sun and hot wind by day, and keeps them warm at night. Bright turbans and colourful skirts and veils are famous across the Thar.',
        'Houses have thick walls of stone and mud and small windows, so they stay cool by day and warm at night. Every drop of rain is saved: many homes keep rainwater in a covered underground tank called a [[kund|kund]].',
        'The [[camel|camel]] is called the ship of the desert. It can walk for days without drinking, its wide feet do not sink in sand, and it can carry people and heavy loads. At the Pushkar fair, thousands of camels are traded.',
      ],
      figure: 'C6:example@3',
      caption: 'In winter, the same dawn is only about 5 °C.',
    },
    {
      heading: 'Plants and animals',
      paras: [
        'Desert plants are good at saving water. Cactus stores water in its thick stem. Thorny bushes have small leaves or spines that lose little water. The khejri tree has very long roots that reach water far underground, and its pods are cooked as a vegetable.',
        'Desert animals stay out of the midday heat. Many hide in burrows by day and come out at night. The Thar is home to the blackbuck, the chinkara gazelle, the desert fox and the great Indian bustard, a large bird that is now very rare.',
      ],
      didYouKnow:
        'In 1730, in the village of Khejarli near Jodhpur, Amrita Devi and hundreds of Bishnoi villagers gave their lives to stop khejri trees from being cut down. The Bishnoi still protect trees and animals today.',
    },
    {
      heading: 'Water for the desert',
      paras: [
        'The Indira Gandhi Canal, one of the longest canals in India, carries water from the rivers of Punjab hundreds of kilometres into the Thar. Where its water reaches, green fields of wheat, cotton and mustard now grow on land that was once sand.',
        'The desert is also a place of history and beauty. The golden fort of Jaisalmer, built of yellow sandstone, is still lived in after more than 850 years.',
      ],
      figure: 'C6:why',
      caption: 'Winter midnight: Thar 12 °C, seaside town 23 °C.',
    },
    {
      heading: 'On the map of India',
      paras: [
        'On a map of India, the Thar lies in the far west, mostly in Rajasthan, along the border with Pakistan. The Aravalli hills run across Rajasthan to the east of it, from south-west to north-east.',
      ],
      figure: 'map:thar',
      caption: 'The Thar desert, mostly in western Rajasthan.',
    },
  ],
  words: [
    { id: 'desert', word: 'desert', meaning: 'A place that gets very little rain.' },
    { id: 'dune', word: 'dune', meaning: 'A hill of sand piled up by the wind.' },
    { id: 'kund', word: 'kund', meaning: 'A covered underground tank that stores rainwater.' },
    {
      id: 'camel',
      word: 'camel',
      meaning: 'A desert animal that can go for days without water; the ship of the desert.',
    },
  ],
  activity: {
    title: 'Sand and water in the sun',
    steps: [
      'Fill one bowl with dry sand and another with water. Put both in the sun for an hour.',
      'Feel them carefully, or measure with a thermometer if you have one. Which is hotter?',
      'Bring both into the shade. After half an hour, which has cooled more?',
      'Explain why the desert swings so much more than the seaside.',
    ],
  },
  questions: [
    {
      q: 'Why is the Thar so dry?',
      a: 'The monsoon winds reach it last and weakest, and the Aravalli hills do not stop the clouds.',
    },
    {
      q: 'Why are desert nights so cold?',
      a: 'Sand cools fast, and the dry, clear air lets the heat escape into the sky.',
    },
    {
      q: 'Is a desert always hot?',
      a: 'No. It is always dry, but winter nights and mornings can be cold.',
    },
    { q: 'What is a kund?', a: 'A covered underground tank that stores rainwater.' },
    { q: 'How do desert houses stay cool?', a: 'Thick walls of stone and mud and small windows.' },
  ],
};
