/**
 * Lesson M2 definition: "Multiplication is area".
 */

import type { FilmBeat, LessonData } from './types';

export const M2_BEATS: FilmBeat[] = [
  { s: 0, e: 6, k: 'film.m2.b1' },
  { s: 6, e: 13, k: 'film.m2.b2' },
  { s: 13, e: 21, k: 'film.m2.b3' },
  { s: 21, e: 28, k: 'film.m2.b4' },
  { s: 28, e: 36, k: 'film.m2.b5' },
];

export const M2_LESSON: LessonData = {
  knotId: 'M2',
  cards: [
    { key: 'what' },
    { key: 'idea' },
    { key: 'why' },
    { key: 'example', steps: 3 },
    { key: 'where' },
    { key: 'sutra' },
  ],
  explain: [
    { tiles: ['rows', 'tens', 'halves'], expect: 'rows' },
    { tiles: ['tiles', 'dots', 'lines'], expect: 'tiles' },
    { tiles: ['area', 'perimeter', 'shape'], expect: 'area' },
  ],
  mistakeFrom: 'M4',
};
