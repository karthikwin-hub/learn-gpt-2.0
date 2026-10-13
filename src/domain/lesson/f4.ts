/**
 * Lesson F4 definition: "Common Factors & HCF"
 * (Venn diagram factor intersection, tile measuring, and fraction reduction).
 */

import type { LessonData } from './types';

export const F4_LESSON: LessonData = {
  knotId: 'F4',
  stateKey: 'hcf',
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
    { tiles: ['largest', 'smallest', 'equal'], expect: 'largest' },
    { tiles: ['remainder', 'multiple', 'factor'], expect: 'remainder' },
  ],
};
