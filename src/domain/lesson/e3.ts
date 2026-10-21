/**
 * Lesson E3 definition: "Mountains, plateaus, plains" (height and top together name a landform).
 */

import type { LessonData } from './types';

export const E3_LESSON: LessonData = {
  knotId: 'E3',
  stateKey: 'landforms',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['flat', 'pointed', 'frozen'], expect: 'flat' },
    { tiles: ['plains', 'mountains', 'glaciers'], expect: 'plains' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
