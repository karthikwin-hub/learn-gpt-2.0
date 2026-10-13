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
  },
  explain: [
    { tiles: ['both', 'neither', 'one'], expect: 'both' },
    { tiles: ['outside', 'between', 'inside'], expect: 'outside' },
  ],
};
