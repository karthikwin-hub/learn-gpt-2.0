/**
 * Lesson I2 definition: "Thread of time" (chronology, BCE/CE, no year zero).
 */

import type { LessonData } from './types';

export const I2_LESSON: LessonData = {
  knotId: 'I2',
  stateKey: 'timeline',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['longer', 'less', 'never'], expect: 'longer' },
    { tiles: ['a', 'no', 'one'], expect: 'no' },
  ],
  mistake: {
    steps: 4,
    wrong: 1,
    eq: () => '49 + 1 + 49 = <span class="r">99</span>',
  },
};
