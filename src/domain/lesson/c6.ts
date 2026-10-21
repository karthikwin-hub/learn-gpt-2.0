/**
 * Lesson C6 definition: "The Thar Desert" (dry, not always hot; sand heats and cools fast).
 */

import type { LessonData } from './types';

export const C6_LESSON: LessonData = {
  knotId: 'C6',
  stateKey: 'desert',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['rain', 'sunlight', 'wind'], expect: 'rain' },
    { tiles: ['fast', 'never', 'slowly'], expect: 'fast' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
