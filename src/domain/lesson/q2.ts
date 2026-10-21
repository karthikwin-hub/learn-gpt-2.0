/**
 * Lesson Q2 definition: "A good citizen" (every right comes with a responsibility).
 */

import type { LessonData } from './types';

export const Q2_LESSON: LessonData = {
  knotId: 'Q2',
  stateKey: 'citizen',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['responsibility', 'price', 'secret'], expect: 'responsibility' },
    { tiles: ['cares', 'keeps', 'ignores'], expect: 'cares' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
