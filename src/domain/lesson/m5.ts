/**
 * Lesson M5 definition: "Two drummers" (multiples and LCM).
 */

import type { LessonData } from './types';

export const M5_LESSON: LessonData = {
  knotId: 'M5',
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
    { tiles: ['both', 'first', 'only'], expect: 'both' },
    { tiles: ['smallest', 'largest', 'total'], expect: 'smallest' },
  ],
};
