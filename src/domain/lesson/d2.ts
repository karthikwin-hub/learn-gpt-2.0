/**
 * Lesson D2 definition: "How many groups" (quotative division).
 */

import type { LessonData } from './types';

export const D2_LESSON: LessonData = {
  knotId: 'D2',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['groups', 'numbers', 'shares'], expect: 'groups' },
    { tiles: ['subtract', 'add', 'double'], expect: 'subtract' },
  ],
};
