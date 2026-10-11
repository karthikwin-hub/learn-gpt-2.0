/**
 * Lesson D4 definition: "Missing side and factor pairs".
 */

import type { LessonData } from './types';

export const D4_LESSON: LessonData = {
  knotId: 'D4',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['side', 'corner', 'line'], expect: 'side' },
    { tiles: ['area', 'perimeter', 'volume'], expect: 'area' },
  ],
};
