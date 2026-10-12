/**
 * Lesson U2 definition: "Metres, Grams and Litres (Metric Conversion Ladder)".
 */

import type { LessonData } from './types';

export const U2_LESSON: LessonData = {
  knotId: 'U2',
  stateKey: 'metric',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  mistake: {
    steps: 3,
    wrong: 1,
    eq: () =>
      '1 metre has 100 cm, so 5 cm is 0.05 m; 4 m 5 cm is <span class="r-txt">4.05 m</span>, not 4.5 m (which is 4 m 50 cm)',
  },
  explain: [
    { tiles: ['one hundred', 'one thousand', 'ten'], expect: 'one hundred' },
    { tiles: ['divide', 'multiply', 'subtract'], expect: 'divide' },
  ],
};
