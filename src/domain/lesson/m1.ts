/**
 * Lesson M1 definition: "Equal groups and arrays".
 */

import type { LessonData } from './types';

export const M1_LESSON: LessonData = {
  knotId: 'M1',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['equal', 'unequal', 'random'], expect: 'equal' },
    { tiles: ['multiply', 'subtract', 'divide'], expect: 'multiply' },
  ],
};
