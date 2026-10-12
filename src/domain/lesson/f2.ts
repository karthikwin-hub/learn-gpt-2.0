/**
 * Lesson F2 definition: "Primes & Composites"
 * (Indivisible numbers, sieve filtering, and prime factor trees).
 */

import type { LessonData } from './types';

export const F2_LESSON: LessonData = {
  knotId: 'F2',
  stateKey: 'primes',
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
    { tiles: ['two', 'three', 'one'], expect: 'two' },
    { tiles: ['composite', 'prime', 'odd'], expect: 'composite' },
  ],
};
