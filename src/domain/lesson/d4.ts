/**
 * Lesson D4 definition: "The Long Division Algorithm & The Zero Gate"
 * (House-by-house sharing, four-beat rhythm: divide, multiply, subtract, bring down, mandatory quotient zeroes).
 */

import type { LessonData } from './types';

export const D4_LESSON: LessonData = {
  knotId: 'D4',
  stateKey: 'longdiv',
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
    { tiles: ['zero', 'one', 'ten'], expect: 'zero' },
    { tiles: ['door', 'wall', 'roof'], expect: 'door' },
  ],
};
