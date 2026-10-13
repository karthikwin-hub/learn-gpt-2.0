/**
 * Lesson L2 definition: "Marble gates" (AND, OR, NOT and Truth Tables).
 */

import type { LessonData } from './types';

export const L2_LESSON: LessonData = {
  knotId: 'L2',
  stateKey: 'logic',
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
    { tiles: ['both', 'one', 'neither'], expect: 'both' },
    { tiles: ['one', 'both', 'neither'], expect: 'one' },
  ],
};
