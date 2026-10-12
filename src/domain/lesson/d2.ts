/**
 * Lesson D2 definition: "Division as Repeated Subtraction / Equal Jumps" (quotitive grouping, backward number line hops, remainders).
 */

import type { LessonData } from './types';

export const D2_LESSON: LessonData = {
  knotId: 'D2',
  stateKey: 'quotition',
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
    wrong: 2,
  },
  explain: [
    { tiles: ['groups', 'plates', 'adds'], expect: 'groups' },
    { tiles: ['subtracting', 'multiplying', 'halving'], expect: 'subtracting' },
  ],
};
