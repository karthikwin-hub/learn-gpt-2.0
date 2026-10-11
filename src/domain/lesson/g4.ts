/**
 * Lesson G4 definition: "Kolam mirror & turn" (symmetry groups).
 */

import type { LessonData } from './types';

export const G4_LESSON: LessonData = {
  knotId: 'G4',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['folds', 'grows', 'hides'], expect: 'folds' },
    { tiles: ['only', 'without', 'never'], expect: 'without' },
  ],
};
