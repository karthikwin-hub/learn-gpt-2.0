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
    { tiles: ['plates', 'total', 'remainder'], expect: 'plates' },
    { tiles: ['fractions', 'mistakes', 'zeros'], expect: 'fractions' },
  ],
};
