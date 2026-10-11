/**
 * Lesson S3 definition: "Mystery rules & subsets".
 */

import type { LessonData } from './types';

export const S3_LESSON: LessonData = {
  knotId: 'S3',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['or', 'and', 'butnot'], expect: 'and' },
    { tiles: ['also', 'always', 'not'], expect: 'not' },
  ],
};
