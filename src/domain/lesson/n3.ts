/**
 * Lesson N3 definition: "Equal parts (fractions)". Ported from design/prototype/js/lessons.
 */

import type { LessonData } from './types';

export const N3_LESSON: LessonData = {
  knotId: 'N3',
  stateKey: 'fractions',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['equal', 'big', 'any'], expect: 'equal' },
    { tiles: ['bigger', 'same', 'smaller'], expect: 'same' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
