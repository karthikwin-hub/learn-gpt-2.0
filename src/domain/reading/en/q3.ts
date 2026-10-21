import type { Chapter } from '../types';

export const Q3: Chapter = {
  knot: 'Q3',
  title: 'Pollution and us',
  intro:
    'Take a deep breath. The air you breathe, the water you drink and the soil your food grows in are shared by everyone. When something harmful gets into them, everyone suffers, even people far away from where it started. In this chapter you will learn the four kinds of pollution, where each comes from, and the many things families, schools and towns can do about them.',
  sections: [
    {
      heading: 'What is pollution?',
      paras: [
        '[[pollution|Pollution]] is anything harmful that gets into the air, water, land or our ears and spoils them for living things. The harmful things are called [[pollutant|pollutants]]: smoke, dust, chemicals, sewage, plastic and too much noise.',
        'Some pollution is easy to see, like black smoke or a heap of garbage. Some is hidden. Water can look perfectly clear and still carry germs that make people ill.',
      ],
      figure: 'Q3:what',
      caption: 'Clear water under a microscope can be full of tiny germs.',
    },
    {
      heading: 'Air pollution',
      paras: [
        'Air is polluted by smoke from vehicles, factories and power stations, by dust from building work, and by burning things in the open: leaves, garbage and the stubble left in fields after harvest. Fireworks add a great deal of smoke in a single night.',
        'Dirty air makes people cough and makes asthma worse. In winter, cold, still air can trap smoke close to the ground for days, so many cities in northern India have their worst air in November and December.',
        'Towns measure their air every day and give it a number called the [[aqi|Air Quality Index]]. A low number means clean air; a high number means people, especially children and older people, should stay indoors.',
      ],
      figure: 'Q3:idea',
      caption: 'With every cause at work, the air and water are very dirty.',
    },
    {
      heading: 'Water pollution',
      paras: [
        'Rivers and lakes are polluted when dirty water from homes, called [[sewage|sewage]], flows into them without being cleaned, when factories pour out waste, and when plastic and garbage are thrown in. Chemicals from farms also wash off fields into rivers when it rains.',
        'Polluted water harms fish and plants and spreads illnesses such as diarrhoea and typhoid. Cities build sewage treatment plants to clean dirty water before it goes back into the river. In 2014 India began the Namami Gange programme to clean the Ganga and the towns along it.',
      ],
      didYouKnow:
        'Clean-looking water is not always safe. Boiling water, or using a filter, kills or removes most germs.',
    },
    {
      heading: 'Land pollution',
      paras: [
        'Land is polluted by garbage dumped in heaps, by plastic that does not rot, and by chemicals poured on the ground. Plastic can stay in the soil for hundreds of years, blocking drains and harming cows and other animals that eat it by mistake.',
        'The best way to stop land pollution is to sort waste at home. Wet waste that rots, such as peels, tea leaves and dry leaves, goes in the green bin. It can be turned into [[compost|compost]] that feeds plants. Dry waste, such as paper, bottles and tins, goes in the blue bin, so that it can be [[recycle|recycled]] into new things.',
      ],
      figure: 'Q3:where',
      caption: 'Green bin for wet waste, blue bin for dry waste.',
      didYouKnow:
        'From 1 July 2022, India banned many single-use plastic items, such as plastic plates, cups, straws and earbuds with plastic sticks.',
    },
    {
      heading: 'Noise pollution',
      paras: [
        'Noise pollution is sound so loud, or so constant, that it harms us: honking horns, loudspeakers, firecrackers, machines and aeroplanes. Loudness is measured in units called decibels.',
        'Too much noise makes it hard to sleep, study and think, and very loud sound can damage hearing for life. Many towns mark quiet zones near hospitals and schools, where honking is not allowed.',
      ],
    },
    {
      heading: 'Places that changed',
      paras: [
        'Pollution can be beaten. Around the year 2000, Delhi changed all its public buses and auto-rickshaws from diesel and petrol to a cleaner gas called CNG, and the air on its roads became cleaner for some years.',
        'Indore, in Madhya Pradesh, was once as messy as many cities. Its people started sorting waste at every home, and the city collected wet and dry waste separately every day. Indore has been named India’s cleanest city again and again since 2017.',
        'In many villages, schoolchildren have planted trees along roads, cleaned ponds and taught their families to stop burning leaves. Change often starts with one class.',
      ],
    },
    {
      heading: 'What we can do',
      paras: [
        'Pollution is made by people, so people can reduce it. The three Rs help: reduce what you use, reuse what you can, and recycle the rest.',
        'At home: sort waste into green and blue bins, carry a cloth bag to the market, fix dripping taps and switch off lights and fans. On the road: walk or cycle for short trips, share rides, and ask drivers not to honk without need. In the community: never burn leaves or garbage, plant trees, and join a clean-up of a park or riverbank.',
        'Each of these is small. But a city is made of lakhs of families, and when each family does a small thing, the air, water and land of the whole city change.',
      ],
      figure: 'Q3:mistake',
      caption: 'With most causes switched off, the readings are nearly clean.',
    },
  ],
  words: [
    { id: 'pollution', word: 'pollution', meaning: 'Harmful things getting into the air, water, land or our ears.' },
    { id: 'pollutant', word: 'pollutant', meaning: 'A harmful thing that pollutes, such as smoke, sewage or plastic.' },
    { id: 'aqi', word: 'Air Quality Index', meaning: 'A daily number that tells how clean or dirty the air is.' },
    { id: 'sewage', word: 'sewage', meaning: 'Dirty water from toilets, kitchens and bathrooms.' },
    { id: 'compost', word: 'compost', meaning: 'Rich soil made from wet waste that has rotted.' },
    { id: 'recycle', word: 'recycle', meaning: 'To turn used things, such as paper or tins, into new things.' },
  ],
  activity: {
    title: 'A week of waste',
    steps: [
      'Put two containers in your kitchen, one marked green for wet waste and one marked blue for dry waste.',
      'For one week, help your family sort every bit of waste into the right one.',
      'Each evening, note roughly how full each container is.',
      'At the end of the week: which filled faster? How many plastic things could your family have avoided?',
    ],
  },
  questions: [
    { q: 'Name the four kinds of pollution.', a: 'Air, water, land and noise pollution.' },
    { q: 'Why can clear-looking water still be unsafe to drink?', a: 'It can carry germs too small to see.' },
    { q: 'Which bin do banana peels and dry leaves go in?', a: 'The green bin, for wet waste that rots.' },
    { q: 'Why is burning leaves a bad idea?', a: 'The smoke pollutes the air that everyone breathes.' },
    { q: 'What are the three Rs?', a: 'Reduce, reuse and recycle.' },
  ],
};
