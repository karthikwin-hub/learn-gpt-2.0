/**
 * Lesson G3 definition: "Mirror lines".
 */

import type { LessonData } from './types';

export const G3_LESSON: LessonData = {
  knotId: 'G3',
  stateKey: 'shear',
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
    eq: () => 'Area is 6 × 4 = <span class="r-txt">24 cm²</span>, not 6 × 5 = 30 cm²',
  },
  explain: [
    { tiles: ['area', 'perimeter', 'slant'], expect: 'area' },
    { tiles: ['perpendicular', 'slanted', 'corner'], expect: 'perpendicular' },
  ],
};
