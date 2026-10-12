/**
 * Lesson N1 definition: "Lakh and crore (Indian place value)". Ported from design/prototype/js/lessons.
 */

import type { LessonData } from './types';

export const N1_LESSON: LessonData = {
  knotId: 'N1',
  stateKey: 'place',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['two', 'ten', 'hundred'], expect: 'ten' },
    { tiles: ['one', 'two', 'three'], expect: 'two' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
