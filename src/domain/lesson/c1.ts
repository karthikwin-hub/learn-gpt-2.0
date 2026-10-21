/**
 * Lesson C1 definition: "The states of India" (a capital is where the government works, not always the
 * biggest city).
 */

import type { LessonData } from './types';

export const C1_LESSON: LessonData = {
  knotId: 'C1',
  stateKey: 'states',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['states', 'cities', 'rivers'], expect: 'states' },
    { tiles: ['government', 'market', 'army'], expect: 'government' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
