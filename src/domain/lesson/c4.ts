/**
 * Lesson C4 definition: "The Himalaya" (colder as you climb; three ranges from the plains upward).
 */

import type { LessonData } from './types';

export const C4_LESSON: LessonData = {
  knotId: 'C4',
  stateKey: 'himalaya',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['colder', 'warmer', 'wetter'], expect: 'colder' },
    { tiles: ['himadri', 'shivalik', 'himachal'], expect: 'himadri' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
