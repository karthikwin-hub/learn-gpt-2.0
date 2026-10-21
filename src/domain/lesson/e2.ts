/**
 * Lesson E2 definition: "Land, water, air and life" (the four domains, and how little water is fresh).
 */

import type { LessonData } from './types';

export const E2_LESSON: LessonData = {
  knotId: 'E2',
  stateKey: 'domains',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['air', 'fire', 'metal'], expect: 'air' },
    { tiles: ['one', 'ten', 'seventyOne'], expect: 'one' },
  ],
  mistake: {
    steps: 4,
    wrong: 1,
  },
};
