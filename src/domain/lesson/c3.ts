/**
 * Lesson C3 definition: "Cities of India" (settlements grow where water, flat land and trade meet).
 */

import type { LessonData } from './types';

export const C3_LESSON: LessonData = {
  knotId: 'C3',
  stateKey: 'cities',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['flat', 'steep', 'frozen'], expect: 'flat' },
    { tiles: ['trade', 'hide', 'sleep'], expect: 'trade' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
