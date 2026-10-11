/**
 * Lesson N2 definition: "Roman Numerals" (non-positional symbols, addition, subtraction, repetition limits).
 */

import type { LessonData } from './types';

export const N2_LESSON: LessonData = {
  knotId: 'N2',
  stateKey: 'roman',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 2 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
    eq: () => '40 + 5 = <span class="r-txt">VL</span>',
  },
  explain: [
    { tiles: ['subtracts', 'adds', 'multiplies'], expect: 'subtracts' },
    { tiles: ['three', 'five', 'ten'], expect: 'three' },
  ],
};
