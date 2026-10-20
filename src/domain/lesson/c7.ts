/**
 * Lesson C7 definition: "The peninsular plateau" (the Deccan tilts east; rivers flow downhill).
 */

import type { LessonData } from './types';

export const C7_LESSON: LessonData = {
  knotId: 'C7',
  stateKey: 'plateau',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['east', 'west', 'north'], expect: 'east' },
    { tiles: ['downhill', 'uphill', 'sideways'], expect: 'downhill' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
