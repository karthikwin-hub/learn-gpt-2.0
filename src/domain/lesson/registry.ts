/**
 * Registry mapping knot IDs to their lesson data, cards, and metadata.
 */

import { M2_LESSON } from './m2';
import { M4_LESSON } from './m4';
import type { LessonData } from './types';

const LESSONS: Record<string, LessonData> = {
  M2: M2_LESSON,
  M4: M4_LESSON,
};

export function getLesson(knotId: string): LessonData | null {
  return LESSONS[knotId] || null;
}

export function registerLesson(lesson: LessonData): void {
  LESSONS[lesson.knotId] = lesson;
}
