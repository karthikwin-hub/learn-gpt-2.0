/**
 * Lesson H1 definition: "Pictographs (Scaled Keys & Data Representation)".
 */

import type { LessonData } from './types';

export const H1_LESSON: LessonData = {
  knotId: 'H1',
  stateKey: 'pictograph',
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
    wrong: 1,
  },
  explain: [
    { tiles: ['key', 'title', 'border'], expect: 'key' },
    { tiles: ['twenty', 'nine', 'four'], expect: 'twenty' },
  ],
};
