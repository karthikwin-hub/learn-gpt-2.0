/**
 * Lesson M3 definition: "Turn it around" (commutativity).
 */

import type { LessonData } from './types';

export const M3_LESSON: LessonData = {
  knotId: 'M3',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['turning', 'cutting', 'adding'], expect: 'turning' },
    { tiles: ['same', 'different', 'bigger'], expect: 'same' },
  ],
};
