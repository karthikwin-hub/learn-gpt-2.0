/**
 * Lesson Q3 definition: "Pollution and us" (clear is not always clean; causes, and wet and dry waste).
 */

import type { LessonData } from './types';

export const Q3_LESSON: LessonData = {
  knotId: 'Q3',
  stateKey: 'river',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['polluted', 'frozen', 'sweet'], expect: 'polluted' },
    { tiles: ['composted', 'thrown', 'hidden'], expect: 'composted' },
  ],
  mistake: {
    steps: 4,
    wrong: 1,
  },
};
