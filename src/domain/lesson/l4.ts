/**
 * Lesson L4 definition: "What Comes Next? (Sequence Rules & Difference Ladders)".
 */

import type { LessonData } from './types';

export const L4_LESSON: LessonData = {
  knotId: 'L4',
  stateKey: 'sequences',
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
      'The rule is multiplying by 2: next term is 16 × 2 = <span class="r-txt">32</span>, not 24',
  },
  explain: [
    { tiles: ['rule', 'guess', 'color'], expect: 'rule' },
    { tiles: ['five', 'ten', 'two'], expect: 'five' },
  ],
};
