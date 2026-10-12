/**
 * Lesson G5 definition: "Fold a box" (Cube nets & spatial visualization).
 */

import type { LessonData } from './types';

export const G5_LESSON: LessonData = {
  knotId: 'G5',
  stateKey: 'cubenet',
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
    wrong: 0,
    eq: () =>
      'A cube needs 6 faces without collisions; a 2 × 3 block <span class="r-txt">overlaps</span> and leaves two faces open',
  },
  explain: [
    { tiles: ['six', 'eight', 'four'], expect: 'six' },
    { tiles: ['overlap', 'touch', 'separate'], expect: 'overlap' },
  ],
};
