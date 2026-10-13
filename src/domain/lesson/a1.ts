/**
 * Lesson A1 definition: "Big Sums & Regrouping" (multi-digit columnar addition and subtraction with borrowing).
 */

import type { LessonData } from './types';

export const A1_LESSON: LessonData = {
  knotId: 'A1',
  stateKey: 'regroup',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  mistake: {
    steps: 4,
    wrong: 1,
  },
  explain: [
    { tiles: ['unbundle', 'add', 'multiply'], expect: 'unbundle' },
    { tiles: ['ten', 'one', 'hundred'], expect: 'ten' },
  ],
};
