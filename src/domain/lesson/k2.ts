/**
 * Lesson K2 definition: "Friction on a ramp". Ported from design/prototype/js/lessons.
 */

import type { LessonData } from './types';

export const K2_LESSON: LessonData = {
  knotId: 'K2',
  stateKey: 'ramp',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['more', 'less', 'no'], expect: 'more' },
    { tiles: ['sooner', 'later', 'never'], expect: 'sooner' },
    { tiles: ['one', 'two', 'every'], expect: 'one' },
  ],
  mistake: {
    steps: 4,
    wrong: 1,
  },
};
