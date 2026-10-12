/**
 * Lesson N5 definition: "Tenths and Hundredths" (decimal place value, comparing decimals, trailing zeros).
 */

import type { LessonData } from './types';

export const N5_LESSON: LessonData = {
  knotId: 'N5',
  stateKey: 'decimals',
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
    wrong: 1,
    eq: () => '0.7 (70 hundredths) > <span class="r-txt">0.15</span>',
  },
  explain: [
    { tiles: ['tenths', 'hundredths', 'wholes'], expect: 'tenths' },
    { tiles: ['place', 'length', 'zeros'], expect: 'place' },
  ],
};
