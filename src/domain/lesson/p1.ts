/**
 * Lesson P1 definition: "Growing Patterns (Figurate & Triangular Numbers)".
 */

import type { LessonData } from './types';

export const P1_LESSON: LessonData = {
  knotId: 'P1',
  stateKey: 'growing',
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
    { tiles: ['layer', 'border', 'corner'], expect: 'layer' },
    { tiles: ['sixteen', 'eight', 'twelve'], expect: 'sixteen' },
  ],
};
