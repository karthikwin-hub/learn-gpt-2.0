/**
 * Lesson U1 definition: "Rupees and paise (money as decimals)". Ported from design/prototype/js/lessons.
 */

import type { LessonData } from './types';

export const U1_LESSON: LessonData = {
  knotId: 'U1',
  stateKey: 'money',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['tenths', 'hundredths', 'ones'], expect: 'tenths' },
    { tiles: ['p5', 'p50', 'p500'], expect: 'p50' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
