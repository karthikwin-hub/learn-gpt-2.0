import type { Chapter } from '../types';

export const I2: Chapter = {
  knot: 'I2',
  title: 'The thread of time',
  intro:
    'Your birthday comes once a year. The school term starts in June or April. Diwali, Eid, Christmas and Pongal arrive in their own seasons. We keep track of all these with calendars. Historians use calendars too, to put events from long ago in order and to say how far apart they were. In this chapter you will learn how calendars work, how years are numbered before and after a starting point, and how to draw the thread of time called a timeline.',
  sections: [
    {
      heading: 'Days, months and years come from the sky',
      paras: [
        'The oldest clocks are in the sky. One [[day|day]] is the time the Earth takes to spin once, from one sunrise to the next. One month comes from the Moon: from one new moon to the next takes about 29 and a half days. One [[year|year]] is the time the Earth takes to travel once around the Sun, about 365 and a quarter days.',
        'A [[calendar|calendar]] is a way of fitting days into months and months into years so that people can plan. Farmers needed calendars to know when to sow; priests needed them for festivals; kings needed them for taxes and records.',
        'That extra quarter of a day each year is a nuisance. After four years it adds up to a whole day. So every fourth year we add one day, 29 February, and call it a [[leap|leap year]]. 2024 was a leap year; the next is 2028.',
      ],
      figure: 'E1:what',
      caption: 'The Earth spins once a day and travels round the Sun once a year.',
    },
    {
      heading: 'India has many calendars',
      paras: [
        'In school and in offices we use a calendar that starts the year on 1 January and follows the Sun. India also has its own national calendar, the Saka calendar, adopted in 1957. Its year begins on 1 Chaitra, which falls on 22 March in most years.',
        'Many festivals follow the Moon as well as the Sun, so their dates move a little from year to year: Holi, Diwali and Durga Puja do not fall on the same date every year. The Islamic calendar follows only the Moon. Its year is about 354 days long, so Eid comes about 11 days earlier each year and slowly travels through all the seasons.',
        'Different regions also welcome their new year on different days: Ugadi in Andhra Pradesh, Telangana and Karnataka, Gudi Padwa in Maharashtra, Puthandu in Tamil Nadu, and Pohela Boishakh in West Bengal, with Puthandu and Pohela Boishakh falling in mid-April.',
      ],
      didYouKnow:
        'The English word month comes from the word Moon, because months were first counted from one new moon to the next.',
    },
    {
      heading: 'Counting years from one starting point',
      paras: [
        'To number the years, a calendar needs a starting point. Most of the world today uses one starting point and counts the years after it as CE, which means Common Era: 1 CE, 2 CE, 3 CE, and on to 2026 CE. Years before it are counted backwards and called BCE, Before Common Era: 1 BCE, 2 BCE, 3 BCE and further back. Older books call these AD and BC.',
        'This is why a bigger BCE number is further in the past. The Harappan towns flourished around 2500 BCE, long before the emperor Ashoka, who ruled around 250 BCE. Both are before 1 CE. The mathematician Aryabhata wrote his famous book in 499 CE, and India became independent in 1947 CE.',
        'A [[timeline|timeline]] is a number line for years. Older events go on the left and newer ones on the right. The join between BCE and CE sits in the middle, like a knot on a thread.',
      ],
      figure: 'I2:what',
      caption: 'A thread of time from 3000 BCE to 2000 CE, with the knot where BCE meets CE.',
    },
    {
      heading: 'There is no year zero',
      paras: [
        'Here is a surprise. When the year numbers were set up, nobody used a year zero. The year just before 1 CE is 1 BCE. So when you count across the join, there is one year fewer than you might expect.',
        'How many years from 100 BCE to 100 CE? From 100 BCE back to 1 BCE is 99 years. From 1 BCE to 1 CE is just 1 year. From 1 CE to 100 CE is 99 years. That makes 99 + 1 + 99 = 199 years, not 200.',
        'Try a bigger one. From Ashoka, about 250 BCE, to Aryabhata, 499 CE: 249 years back to 1 BCE, 1 year across the join, then 498 years to 499 CE. That is 249 + 1 + 498 = 748 years.',
      ],
      figure: 'I2:why',
      caption: '3 BCE, 2 BCE, 1 BCE, then 1 CE, 2 CE, 3 CE, with no year zero between them.',
      didYouKnow:
        'Zero as a number was used by Indian mathematicians such as Brahmagupta, who wrote rules for it in 628 CE, long after the year numbers were fixed.',
    },
    {
      heading: 'Decades, centuries and millennia',
      paras: [
        'Long stretches of time have names. Ten years make a [[decade|decade]]. A hundred years make a [[century|century]]. A thousand years make a millennium.',
        'Centuries are counted from 1, not 0. The 1st century CE was the years 1 to 100. The 2nd century was 101 to 200. So 1947 is in the 20th century, which ran from 1901 to 2000, and today we live in the 21st century, which began in 2001. A quick way to find the century: take away the last two digits and add one, unless the year ends in 00.',
        'BCE centuries count backwards in the same way. The 3rd century BCE was the years 300 to 201 BCE, the time of Ashoka.',
      ],
      figure: 'I2:where',
      caption: 'The whole thread: five thousand years, from 3000 BCE to 2000 CE.',
    },
    {
      heading: 'Drawing your own timeline',
      paras: [
        'To draw a timeline, first choose a scale, just as a map has a scale. If 1 centimetre stands for 100 years, then 2,000 years need a line 20 centimetres long. Mark the years at equal gaps, then place each event at its year and write its name beside it.',
        'A timeline helps you see things that a list hides: that some events were close together and others were centuries apart, or that the Harappan towns are further from Ashoka than Ashoka is from us.',
      ],
      figure: 'I2:mistake.reveal',
      caption: 'Counting across the join: 1 BCE is followed straight by 1 CE.',
    },
  ],
  words: [
    { id: 'day', word: 'day', meaning: 'The time the Earth takes to spin once.' },
    { id: 'year', word: 'year', meaning: 'The time the Earth takes to go once around the Sun, about 365¼ days.' },
    { id: 'calendar', word: 'calendar', meaning: 'A way of arranging days into months and years.' },
    { id: 'leap', word: 'leap year', meaning: 'A year with one extra day, 29 February, every fourth year.' },
    { id: 'timeline', word: 'timeline', meaning: 'A line with years marked on it in order, like a number line.' },
    { id: 'decade', word: 'decade', meaning: 'Ten years.' },
    { id: 'century', word: 'century', meaning: 'A hundred years; the 1st century CE was the years 1 to 100.' },
  ],
  activity: {
    title: 'My family timeline',
    steps: [
      'Ask at home for the years of five family events: when a grandparent was born, when your parents married, when you were born, when you started school, and one more.',
      'Draw a line 20 centimetres long. Let 1 centimetre stand for 5 years, and mark the years at equal gaps.',
      'Put each event at its year, oldest on the left.',
      'Which two events are closest together? Which are furthest apart? Count the years between them.',
    ],
  },
  questions: [
    { q: 'Which is longer ago, 300 BCE or 200 BCE?', a: '300 BCE. BCE years count backwards, so a bigger BCE number is further in the past.' },
    { q: 'How many years are there from 50 BCE to 50 CE?', a: '99 years: 49 + 1 + 49, because there is no year zero.' },
    { q: 'In which century is the year 1947?', a: 'The 20th century, which ran from 1901 to 2000.' },
    { q: 'Why do we add 29 February every fourth year?', a: 'A year is about 365¼ days; the four quarters add up to one extra day.' },
    { q: 'Why does Eid come about 11 days earlier each year?', a: 'The Islamic calendar follows the Moon, and its year is about 354 days, shorter than the Sun year.' },
  ],
};
