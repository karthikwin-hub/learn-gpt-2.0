/**
 * Lesson S2 definition: "Two rings" (Venn union & intersection).
 */

import type { LessonData } from './types';

export const S2_LESSON: LessonData = {
  knotId: 'S2',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['or', 'and', 'butnot'], expect: 'and' },
    { tiles: ['also', 'always', 'not'], expect: 'not' },
  ],
};
