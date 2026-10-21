/**
 * Lesson C9 definition: "Unity in diversity" (22 scheduled languages; one harvest, many festivals).
 */

import type { LessonData } from './types';

export const C9_LESSON: LessonData = {
  knotId: 'C9',
  stateKey: 'unity',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['22', '2', '1000'], expect: '22' },
    { tiles: ['same', 'wrong', 'missing'], expect: 'same' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
