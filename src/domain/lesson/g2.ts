/**
 * Lesson G2 definition: "Rope and pegs" (perimeter versus area).
 */

import type { LessonData } from './types';

export const G2_LESSON: LessonData = {
  knotId: 'G2',
  stateKey: 'rope',
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
    { tiles: ['thin', 'square', 'long'], expect: 'square' },
    { tiles: ['rope', 'area', 'perimeter'], expect: 'area' },
  ],
};
