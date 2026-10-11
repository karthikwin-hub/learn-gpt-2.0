/**
 * Lesson M4 definition: "Cut the rectangle" (distributive law).
 */

import type { LessonData } from './types';

export const M4_LESSON: LessonData = {
  knotId: 'M4',
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
    wrong: 1,
    eq: () =>
      '200 + <span style="color:var(--kumkum)">30</span> + <span style="color:var(--kumkum)">80</span> + 12 = <span class="r-txt">322</span>',
  },
  explain: [
    { tiles: ['rows', 'tens', 'halves'], expect: 'tens' },
    { tiles: ['room', 'digit', 'row'], expect: 'room' },
    { tiles: ['multiply', 'subtract', 'add'], expect: 'add' },
  ],
};
