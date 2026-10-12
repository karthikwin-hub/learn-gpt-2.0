/**
 * Lesson G1 definition: "Angles as turns".
 */

import type { LessonData } from './types';

export const G1_LESSON: LessonData = {
  knotId: 'G1',
  stateKey: 'angles',
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
    eq: () =>
      'A pencil box lid open wide (60°) has a <span class="r-txt">larger angle</span> than a giant door open a crack (15°)',
  },
  explain: [
    { tiles: ['turn', 'length', 'weight'], expect: 'turn' },
    { tiles: ['right', 'straight', 'zero'], expect: 'right' },
  ],
};
