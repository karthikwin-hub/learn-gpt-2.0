/**
 * Lesson P1 definition: "Growing Patterns (Figurate & Triangular Numbers)".
 */

import type { LessonData } from './types';

export const P1_LESSON: LessonData = {
  knotId: 'P1',
  stateKey: 'growing',
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
      'A square of side 5 has 5 rows of 5 tiles: 5 × 5 = <span class="r-txt">25 tiles</span>, not 10',
  },
  explain: [
    { tiles: ['layer', 'border', 'corner'], expect: 'layer' },
    { tiles: ['sixteen', 'eight', 'twelve'], expect: 'sixteen' },
  ],
};
