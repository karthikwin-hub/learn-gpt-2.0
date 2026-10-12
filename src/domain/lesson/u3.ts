/**
 * Lesson U3 definition: "Time: 24-Hour Clock & Duration (Railway Time)".
 */

import type { LessonData } from './types';

export const U3_LESSON: LessonData = {
  knotId: 'U3',
  stateKey: 'timeclock',
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
    { tiles: ['sixty', 'twenty-four', 'hundred'], expect: 'sixty' },
    { tiles: ['20:00', '08:00', '18:00'], expect: '20:00' },
  ],
};
