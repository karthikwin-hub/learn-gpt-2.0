/**
 * Lesson L1 definition: "True for all?" (Truth, Negation and Counterexamples).
 */

import type { LessonData } from './types';

export const L1_LESSON: LessonData = {
  knotId: 'L1',
  stateKey: 'counterexample',
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
      '5 × 1 = 5 (equal) and 5 × 0 = 0 (smaller): a single <span class="r-txt">counterexample</span> disproves always',
  },
  explain: [
    { tiles: ['one', 'many', 'ten'], expect: 'one' },
    { tiles: ['false', 'true', 'proven'], expect: 'false' },
  ],
};
