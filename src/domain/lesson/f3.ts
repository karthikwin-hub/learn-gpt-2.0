/**
 * Lesson F3 definition: "Divisibility Tests"
 * (Testing large numbers via last-digit rules, digit sums, and composite gates).
 */

import type { LessonData } from './types';

export const F3_LESSON: LessonData = {
  knotId: 'F3',
  stateKey: 'divisibility',
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
    { tiles: ['digits', 'factors', 'ends'], expect: 'digits' },
    { tiles: ['sum', 'remainder', 'product'], expect: 'sum' },
  ],
};
