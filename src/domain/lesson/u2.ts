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
  },
  explain: [
    { tiles: ['one hundred', 'one thousand', 'ten'], expect: 'one hundred' },
    { tiles: ['divide', 'multiply', 'subtract'], expect: 'divide' },
  ],
};
