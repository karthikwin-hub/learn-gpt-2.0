/**
 * Lesson N4 definition: "Fractions of a Collection" (partitioning sets, finding fractions of amounts, adding like fractions).
 */

import type { LessonData } from './types';

export const N4_LESSON: LessonData = {
  knotId: 'N4',
  stateKey: 'collection',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
  explain: [
    { tiles: ['stays', 'changes', 'doubles'], expect: 'stays' },
    { tiles: ['add', 'multiply', 'subtract'], expect: 'add' },
  ],
};
