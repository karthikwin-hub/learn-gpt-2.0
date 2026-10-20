/**
 * Lesson Q1 definition: "What is civics?" (three levels of government, and who chooses them).
 */

import type { LessonData } from './types';

export const Q1_LESSON: LessonData = {
  knotId: 'Q1',
  stateKey: 'govern',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['local', 'state', 'union'], expect: 'local' },
    { tiles: ['local', 'state', 'union'], expect: 'union' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
