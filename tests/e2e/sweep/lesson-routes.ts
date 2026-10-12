import {
  SECTIONS,
  playable,
  firstStep,
  afterBodha,
  type Knot,
} from '../../../src/domain/curriculum';
import { getLesson } from '../../../src/domain/lesson/registry';
import type { LessonData } from '../../../src/domain/lesson/types';

export const LANGUAGES = ['en', 'hi', 'te', 'bn', 'ta'] as const;
export type Lang = (typeof LANGUAGES)[number];

export interface PlayableLesson {
  knot: Knot;
  lesson: LessonData | null;
  first: string;
  bench: string;
}

export function url(route: string, params?: Record<string, string> | null): string {
  const query = params && Object.keys(params).length ? `?${new URLSearchParams(params)}` : '';
  return `/#/${route}${query}`;
}

export function playableLessons(): PlayableLesson[] {
  return SECTIONS.flatMap((s) => s.threads.flatMap((th) => th.knots))
    .filter((k) => playable(k))
    .map((knot) => {
      const first = firstStep(knot);
      const bench = afterBodha(knot);
      return {
        knot,
        lesson: getLesson(knot.id),
        first: url(first.route, first.params),
        bench: bench ? url(bench.route, bench.params) : url('home'),
      };
    });
}
