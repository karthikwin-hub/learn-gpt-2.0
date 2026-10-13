/**
 * Lesson H2 definition: "Bar Graphs (Axes, Scale Intervals & Jaal B1 <-> H2)".
 */

import type { LessonData } from './types';

export const H2_LESSON: LessonData = {
  knotId: 'H2',
  stateKey: 'bargraph',
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
    { tiles: ['scale', 'color', 'width'], expect: 'scale' },
    { tiles: ['width', 'height', 'color'], expect: 'width' },
  ],
};
