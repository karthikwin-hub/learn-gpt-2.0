/**
 * Lesson E1 definition: "Spin and travel" (Earth rotation, day/night, axial tilt seasons).
 */

import type { LessonData } from './types';

export const E1_LESSON: LessonData = {
  knotId: 'E1',
  stateKey: 'earth',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 4 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['spins', 'stops', 'shrinks'], expect: 'spins' },
    { tiles: ['tilted', 'straight', 'broken'], expect: 'tilted' },
  ],
  mistake: {
    steps: 4,
    wrong: 2,
  },
};
