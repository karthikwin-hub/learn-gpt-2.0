/**
 * Lesson C2 definition: "Farms of India" (every crop has its season: kharif, rabi, zaid).
 */

import type { LessonData } from './types';

export const C2_LESSON: LessonData = {
  knotId: 'C2',
  stateKey: 'farms',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['kharif', 'rabi', 'zaid'], expect: 'kharif' },
    { tiles: ['zaid', 'kharif', 'rabi'], expect: 'rabi' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
