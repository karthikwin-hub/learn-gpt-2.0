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
  },
  explain: [
    { tiles: ['turn', 'length', 'weight'], expect: 'turn' },
    { tiles: ['right', 'straight', 'zero'], expect: 'right' },
  ],
};
