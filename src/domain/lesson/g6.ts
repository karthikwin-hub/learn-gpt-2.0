/**
 * Lesson G6 definition: "Circles: Centre, Radius, Diameter".
 */

import type { LessonData } from './types';

export const G6_LESSON: LessonData = {
  knotId: 'G6',
  stateKey: 'circle',
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
      'A diameter must pass directly through the centre; a chord away from the centre is <span class="r-txt">shorter</span> than 2 × radius',
  },
  explain: [
    { tiles: ['radius', 'diameter', 'chord'], expect: 'radius' },
    { tiles: ['twice', 'half', 'equal to'], expect: 'twice' },
  ],
};
