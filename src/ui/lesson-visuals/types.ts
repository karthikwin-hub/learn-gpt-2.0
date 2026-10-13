import type { BodhaCardKey } from '../../domain/lesson/types';

export type CardKey = Exclude<BodhaCardKey, 'sutra'>;

/**
 * The pictures of one lesson. Every figure is drawn from domain values and dictionary text;
 * it never computes a rule itself.
 *   prashna: the one picture beside the Prashna question.
 *   cards: one figure per Bodha card except the sutra; `step` is the worked-example step (0 = none shown).
 *   mistake: the Spot-the-mistake picture; `reveal` is true once the wrong step is found.
 */
export interface LessonVisuals {
  prashna?: () => SVGSVGElement;
  cards?: Partial<Record<CardKey, (step: number) => SVGSVGElement | null>>;
  mistake?: (reveal: boolean) => SVGSVGElement;
}

export type VisualsTable = Record<string, LessonVisuals>;
