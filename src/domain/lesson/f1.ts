/**
 * Lesson F1 definition: "Factors Make Rectangles"
 * (Visual factor pairs through rectangular grid geometry).
 */

import type { LessonData } from './types';

export const F1_LESSON: LessonData = {
  knotId: 'F1',
  stateKey: 'factors',
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
    { tiles: ['pairs', 'single', 'multiples'], expect: 'pairs' },
    { tiles: ['partner', 'remainder', 'product'], expect: 'partner' },
  ],
};
