import type { Chapter } from '../types';

export const Q1: Chapter = {
  knot: 'Q1',
  title: 'How we govern ourselves',
  intro:
    'Somebody fixes the streetlight in your lane. Somebody runs the bus to your school, prints the money in your pocket and guards the border of the country. Who are these somebodies, who chooses them, and who tells them what to do? The study of how people live and decide things together is called civics. In this chapter you will see that in India the answer starts with you.',
  sections: [
    {
      heading: 'Why we need rules and a government',
      paras: [
        'Imagine a cricket match with no rules. One side says a catch is out, the other says it is not, and the game ends in a quarrel. Rules let everyone play fairly. A whole country is like a very large game with more than a hundred crore players, so it needs rules too. The rules of a country are called [[law|laws]].',
        'Some jobs are too big for any one family: building roads, running hospitals, keeping water clean, keeping people safe. The group of people chosen to make laws and do these jobs for everyone is the [[government|government]].',
        '[[civics|Civics]] is the study of how this works: who makes the rules, who carries them out, and what each of us must do so that it works well.',
      ],
      figure: 'Q1:prashna',
      caption: 'A village lane at dusk with a broken streetlight. Whose job is it to fix it?',
    },
    {
      heading: 'The book of rules for India',
      paras: [
        'India’s most important book of rules is the [[constitution|Constitution]]. It says how the government is chosen, what it may and may not do, and what rights every citizen has. It was written by an assembly of leaders from all over India after independence. Dr B. R. Ambedkar led the committee that drafted it.',
        'The Constitution came into force on 26 January 1950. That is why we celebrate Republic Day every year on 26 January. India became a republic: a country whose head is chosen, not born into the job.',
        'In India the people choose their government. This is called a [[democracy|democracy]]. Every citizen aged 18 or over can vote, whether rich or poor, man or woman, in a city or a village.',
      ],
      didYouKnow:
        'The original Constitution was written by hand, in beautiful lettering, and decorated by artists. It is kept safe in the library of Parliament in New Delhi.',
    },
    {
      heading: 'Three levels, one inside another',
      paras: [
        'India is very big, so its government works at three [[level|levels]], like three circles one inside another.',
        'The local government looks after your village, town or city. The state government looks after a whole state, such as Kerala or Punjab. The union government, also called the central government, looks after all of India.',
        'Each level has its own jobs. A broken streetlight or an overflowing garbage bin is a job for the local government. The police and state highways are jobs for the state government. The army, the railways, passports and the rupee are jobs for the union government, because the whole country shares them.',
      ],
      figure: 'Q1:what',
      caption: 'Local inside state, state inside union.',
    },
    {
      heading: 'Local government: the closest to you',
      paras: [
        'In a village, the local government is the gram [[panchayat|panchayat]]. Its members are elected by the villagers, and its head is the sarpanch. The panchayat looks after village roads, wells, drains, streetlights and the cleanliness of the village. All the adults of the village whose names are on the voters’ list together form the gram sabha, which meets to discuss what the village needs.',
        'In a town there is a municipality, and in a big city a municipal corporation. People elect councillors, one for each ward, and the corporation is led by a mayor. They look after water supply, garbage, parks, markets and local roads.',
      ],
      didYouKnow:
        'Since 1993, one in every three seats in panchayats has been kept for women. Many states now keep half the seats for women.',
    },
    {
      heading: 'State and union government',
      paras: [
        'Each state has a legislative assembly, the Vidhan Sabha. Its members, called MLAs (Members of the Legislative Assembly), are elected by the people of the state. The leader of the largest group usually becomes the Chief Minister.',
        'For the whole country, the people elect MPs (Members of Parliament) to the Lok Sabha in New Delhi. The leader of the largest group usually becomes the Prime Minister. The President of India is the head of the country, and the army, the navy and the air force answer to the President.',
        'Elections for these are held at least once every five years. If people are not happy with what their representatives did, they can choose someone else next time. That is the power of a vote.',
      ],
    },
    {
      heading: 'Where do you fit in?',
      paras: [
        'You may think government is only for grown-ups. But the roads you walk on, the school you go to, the clean water you drink and the clock tower in your town all come from decisions made by people your family voted for.',
        'When you grow up and vote, choose carefully. Until then, you can learn how things work, speak up politely when something needs fixing, and look after the things we all share.',
      ],
    },
  ],
  words: [
    {
      id: 'civics',
      word: 'civics',
      meaning: 'The study of how people govern themselves and live together.',
    },
    { id: 'law', word: 'law', meaning: 'A rule made for everyone in a country.' },
    {
      id: 'government',
      word: 'government',
      meaning: 'The people chosen to make laws and do the shared jobs of a place.',
    },
    {
      id: 'constitution',
      word: 'Constitution',
      meaning: 'India’s most important book of rules, in force since 26 January 1950.',
    },
    {
      id: 'democracy',
      word: 'democracy',
      meaning: 'A way of governing in which the people choose their government by voting.',
    },
    {
      id: 'level',
      word: 'level of government',
      meaning: 'Local, state or union: each looks after a bigger area than the one before.',
    },
    {
      id: 'panchayat',
      word: 'panchayat',
      meaning: 'The elected local government of a village, led by the sarpanch.',
    },
  ],
  activity: {
    title: 'Who looks after my street?',
    steps: [
      'Walk down your street or lane with an adult and list ten things you see that someone looks after: a streetlight, a bin, a tap, a bus stop, a road sign, a school.',
      'For each, guess the level of government: local, state or union.',
      'Ask an adult at home whether your guess is right, and who you would tell if it broke.',
      'Find out the name of your sarpanch or ward councillor, your MLA and your MP.',
    ],
  },
  questions: [
    {
      q: 'What is a government?',
      a: 'The people chosen to make laws and do the shared jobs of a place.',
    },
    {
      q: 'Which level of government should fix a broken streetlight in a village?',
      a: 'The local government: the gram panchayat.',
    },
    {
      q: 'Why is Republic Day on 26 January?',
      a: 'Because the Constitution came into force on 26 January 1950.',
    },
    {
      q: 'Who elects the MP, and where does an MP work?',
      a: 'The voters of a constituency elect the MP, who works in the Lok Sabha in New Delhi.',
    },
    { q: 'At what age can a citizen of India vote?', a: 'At 18.' },
  ],
};
