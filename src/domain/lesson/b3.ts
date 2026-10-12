/**
 * Lesson B3 definition: "The journey of food (digestion)". Ported from design/prototype/js/lessons.
 */

import type { LessonData } from './types';

export const B3_LESSON: LessonData = {
  knotId: 'B3',
  stateKey: 'digest',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['blood', 'air', 'bones'], expect: 'blood' },
    { tiles: ['stomach', 'small', 'mouth'], expect: 'small' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
