/**
 * Lesson R1 definition: "Light and shadows". Ported from design/prototype/js/lessons.
 */

import type { LessonData } from './types';

export const R1_LESSON: LessonData = {
  knotId: 'R1',
  stateKey: 'shadow',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['straight', 'curved', 'zigzag'], expect: 'straight' },
    { tiles: ['longer', 'shorter', 'gone'], expect: 'shorter' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
