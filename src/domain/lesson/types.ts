/**
 * Core type definitions for Gurukul lesson engine and Bodha cards.
 */

export type LessonStage = 'shravana' | 'manana' | 'nididhyasana';

export type LessonStep =
  'prashna' | 'bodha' | 'darshana' | 'abhyasa' | 'mistake' | 'explain' | 'stop';

export type BodhaCardKey = 'what' | 'idea' | 'why' | 'example' | 'where' | 'sutra';

/* Pictures live in src/ui/lesson-visuals; text lives in the dictionaries. Lesson data holds plain values only. */
export interface BodhaCard {
  key: BodhaCardKey;
  steps?: number;
}

/* Strings: mistake.<K>.intro, .s1….s<steps>, .fine<n>, .found, .eq (<s> struck, <r> highlighted). */
export interface MistakeData {
  steps: number;
  wrong: number;
}

export interface ExplainBlank {
  tiles: string[];
  expect: string;
}

export type ExplainTemplate = ExplainBlank[];

export interface LessonData {
  knotId: string;
  content?: string;
  cards: BodhaCard[];
  mistake?: MistakeData;
  /** Phase 1 lessons without their own Spot-the-mistake use this knot's (the prototype's flow). */
  mistakeFrom?: string;
  explain?: ExplainTemplate;
  stateKey?: string;
}

export interface FilmBeat {
  s: number;
  e: number;
  k: string;
}

export interface ThreadContinueState {
  knot: string;
  route: string;
  params?: Record<string, string> | null;
}
