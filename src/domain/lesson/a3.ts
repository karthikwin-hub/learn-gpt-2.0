/**
 * Lesson A3 definition: "Which Operation? (Word Problem Action Modeling)"
 * (The four root actions: Combine, Compare, Replicate, Partition, and busting keyword traps).
 */

import type { LessonData } from './types';

export const A3_LESSON: LessonData = {
  knotId: 'A3',
  stateKey: 'wordprob',
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
    { tiles: ['difference', 'sum', 'product'], expect: 'difference' },
    { tiles: ['subtracting', 'adding', 'multiplying'], expect: 'subtracting' },
  ],
};
