/**
 * Lesson D3 definition: "Leftovers and remainders".
 */

import type { LessonData } from './types';

export const D3_LESSON: LessonData = {
  knotId: 'D3',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['hide', 'cut', 'keep'], expect: 'cut' },
    { tiles: ['whole', 'plate', 'fraction'], expect: 'fraction' },
  ],
  mistakeFrom: 'M4',
};
