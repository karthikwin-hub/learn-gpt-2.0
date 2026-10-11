/**
 * Lesson L2 definition: "Marble gates" (AND, OR, NOT and Truth Tables).
 */

import type { LessonData } from './types';

export const L2_LESSON: LessonData = {
  knotId: 'L2',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['both', 'no', 'one'], expect: 'both' },
    { tiles: ['least', 'every', 'one'], expect: 'least' },
  ],
};
