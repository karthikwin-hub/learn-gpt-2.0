/**
 * Lesson G7 definition: "Tangrams: Geometric Dissection & Area Conservation".
 */

import type { LessonData } from './types';

export const G7_LESSON: LessonData = {
  knotId: 'G7',
  stateKey: 'tangram',
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
      'Height does not determine area; rearranging the same 7 pieces leaves total area <span class="r-txt">strictly equal</span>',
  },
  explain: [
    { tiles: ['unchanged', 'larger', 'smaller'], expect: 'unchanged' },
    { tiles: ['square', 'circle', 'hexagon'], expect: 'square' },
  ],
};
