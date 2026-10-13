/**
 * Lesson A2 definition: "Estimate First & Mental Benchmarks" (friendly rounding, order-of-magnitude guardrails, wild error checks).
 */

import type { LessonData } from './types';

export const A2_LESSON: LessonData = {
  knotId: 'A2',
  stateKey: 'estimate',
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
    wrong: 3,
  },
  explain: [
    { tiles: ['estimate', 'exact', 'zero'], expect: 'estimate' },
    { tiles: ['before', 'after', 'never'], expect: 'before' },
  ],
};
