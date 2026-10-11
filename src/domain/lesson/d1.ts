/**
 * Lesson D1 definition: "Fair share" (partitive division).
 */

import type { LessonData } from './types';

export const D1_LESSON: LessonData = {
  knotId: 'D1',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['same', 'different', 'more'], expect: 'same' },
    { tiles: ['multiply', 'subtract', 'add'], expect: 'multiply' },
  ],
};
