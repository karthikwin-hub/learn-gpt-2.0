/**
 * Lesson M4 definition: "Cut the rectangle" (distributive law).
 */

import type { LessonData } from './types';

export const M4_LESSON: LessonData = {
  knotId: 'M4',
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
    { tiles: ['rows', 'tens', 'halves'], expect: 'tens' },
    { tiles: ['room', 'digit', 'row'], expect: 'room' },
    { tiles: ['multiply', 'subtract', 'add'], expect: 'add' },
  ],
};
