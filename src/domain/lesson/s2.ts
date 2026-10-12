/**
 * Lesson S2 definition: "Two rings" (Venn union & intersection).
 */

import type { LessonData } from './types';

export const S2_LESSON: LessonData = {
  knotId: 'S2',
  stateKey: 'sets',
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
      '12 is a multiple of both 4 and 3 (4 × 3 = 12): it belongs in the <span class="r-txt">overlap</span> region',
  },
  explain: [
    { tiles: ['both', 'neither', 'one'], expect: 'both' },
    { tiles: ['outside', 'between', 'inside'], expect: 'outside' },
  ],
};
