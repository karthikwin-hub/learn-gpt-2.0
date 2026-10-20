/**
 * Lesson C8 definition: "Rivers of India" (downhill from source to mouth; snow-fed rivers flow all year).
 */

import type { LessonData } from './types';

export const C8_LESSON: LessonData = {
  knotId: 'C8',
  stateKey: 'rivers',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['higher', 'lower', 'older'], expect: 'higher' },
    { tiles: ['allyear', 'rainy', 'backwards'], expect: 'allyear' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
