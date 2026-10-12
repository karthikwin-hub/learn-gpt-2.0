/**
 * Lesson M1 definition: "Equal groups and arrays".
 */

import type { LessonData } from './types';

export const M1_LESSON: LessonData = {
  knotId: 'M1',
  stateKey: 'rect',
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
      'Rotating 8 × 3 by a quarter turn creates 3 × 8 with the exact same <span class="r-txt">24 squares</span>: a × b = b × a',
  },
  explain: [
    { tiles: ['columns', 'diagonals', 'circles'], expect: 'columns' },
    { tiles: ['equal to', 'greater than', 'less than'], expect: 'equal to' },
  ],
};
