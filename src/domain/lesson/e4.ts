/**
 * Lesson E4 definition: "Courtyard from above" (maps, scale, direction, symbols).
 */

import type { LessonData } from './types';

export const E4_LESSON: LessonData = {
  knotId: 'E4',
  stateKey: 'map',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['above', 'side', 'inside'], expect: 'above' },
    { tiles: ['ground', 'colour', 'time'], expect: 'ground' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
    eq: () => '10 + 10 + 10 = 3 × 10 = 30 m',
  },
};
