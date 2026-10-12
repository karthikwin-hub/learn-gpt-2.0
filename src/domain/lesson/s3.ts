/**
 * Lesson S3 definition: "Mystery rules & subsets".
 */

import type { LessonData } from './types';

export const S3_LESSON: LessonData = {
  knotId: 'S3',
  stateKey: 'sets',
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
      'A rule must fit every item in the ring: circles are inside, so the rule cannot be <span class="r-txt">triangles</span>',
  },
  explain: [
    { tiles: ['every', 'one', 'some'], expect: 'every' },
    { tiles: ['revised', 'accepted', 'ignored'], expect: 'revised' },
  ],
};
