/**
 * Lesson G8 definition: "Views from Above (Top, Front, Side Views & Jaal E4 <-> G8)".
 */

import type { LessonData } from './types';

export const G8_LESSON: LessonData = {
  knotId: 'G8',
  stateKey: 'views',
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
    { tiles: ['map', 'shadow', 'mirror'], expect: 'map' },
    { tiles: ['height', 'perimeter', 'weight'], expect: 'height' },
  ],
};
