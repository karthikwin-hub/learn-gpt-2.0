/**
 * Lesson L3 definition: "If this, then that" (Conditionals & Converse Fallacy).
 */

import type { LessonData } from './types';

export const L3_LESSON: LessonData = {
  knotId: 'L3',
  stateKey: 'conditional',
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
    { tiles: ['forward', 'reverse', 'opposite'], expect: 'forward' },
    { tiles: ['not', 'always', 'certainly'], expect: 'not' },
  ],
};
