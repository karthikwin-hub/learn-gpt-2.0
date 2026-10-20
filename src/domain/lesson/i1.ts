/**
 * Lesson I1 definition: "Clues from the past" (sources of history, layers of a dig).
 */

import type { LessonData } from './types';

export const I1_LESSON: LessonData = {
  knotId: 'I1',
  stateKey: 'dig',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['older', 'newer', 'wetter'], expect: 'older' },
    { tiles: ['archaeological', 'literary', 'imaginary'], expect: 'archaeological' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
