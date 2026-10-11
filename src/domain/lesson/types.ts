/**
 * Core type definitions for Gurukul lesson engine and Bodha cards.
 */

export type LessonStage = 'shravana' | 'manana' | 'nididhyasana';

export type LessonStep =
  'prashna' | 'bodha' | 'darshana' | 'abhyasa' | 'mistake' | 'explain' | 'stop';

export type BodhaCardKey = 'what' | 'idea' | 'why' | 'example' | 'where' | 'sutra';

export interface BodhaCard {
  key: BodhaCardKey;
  steps?: number;
  fig?: (step: number, state?: unknown) => SVGElement | null;
}

export interface PrashnaData {
  art?: () => SVGElement;
  questionKey?: string;
  choices?: string[];
  answerKey?: string;
}

export interface MistakeData {
  steps: number;
  wrong: number;
  picture?: (reveal: boolean) => unknown;
  eq?: () => string;
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
  prashna?: PrashnaData;
  mistake?: MistakeData;
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
