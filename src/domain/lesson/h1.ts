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
    eq: () =>
      'Multiply the icon count by the key scale: 3 icons × 10 bicycles = <span class="r-txt">30 bicycles</span>, not 3',
  },
  explain: [
    { tiles: ['key', 'title', 'border'], expect: 'key' },
    { tiles: ['twenty', 'nine', 'four'], expect: 'twenty' },
  ],
};
