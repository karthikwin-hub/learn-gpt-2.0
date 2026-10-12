/**
 * Lesson S1 definition: "Sort by a Rule (Single Set & Universe of Discourse)".
 */

import type { LessonData } from './types';

export const S1_LESSON: LessonData = {
  knotId: 'S1',
  stateKey: 'singleset',
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
    { tiles: ['rule', 'guess', 'color'], expect: 'rule' },
    { tiles: ['outside', 'halfway', 'above'], expect: 'outside' },
  ],
};
