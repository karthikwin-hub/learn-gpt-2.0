/**
 * Lesson C5 definition: "The northern plains" (rivers carried silt down; floods laid it in layers).
 */

import type { LessonData } from './types';

export const C5_LESSON: LessonData = {
  knotId: 'C5',
  stateKey: 'plains',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['rivers', 'winds', 'people'], expect: 'rivers' },
    { tiles: ['good', 'useless', 'salty'], expect: 'good' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
