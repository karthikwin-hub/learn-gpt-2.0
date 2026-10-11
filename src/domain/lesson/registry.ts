/**
 * Registry mapping knot IDs to their lesson data, cards, and metadata.
 */

import { D1_LESSON } from './d1';
import { D2_LESSON } from './d2';
import { D3_LESSON } from './d3';
import { D4_LESSON } from './d4';
import { M1_LESSON } from './m1';
import { M2_LESSON } from './m2';
import { M3_LESSON } from './m3';
import { M4_LESSON } from './m4';
import { M5_LESSON } from './m5';
import type { LessonData } from './types';

const LESSONS: Record<string, LessonData> = {
  M1: M1_LESSON,
  M2: M2_LESSON,
  M3: M3_LESSON,
  M4: M4_LESSON,
  M5: M5_LESSON,
  D1: D1_LESSON,
  D2: D2_LESSON,
  D3: D3_LESSON,
  D4: D4_LESSON,
};

export function getLesson(knotId: string): LessonData | null {
  return LESSONS[knotId] || null;
}

export function registerLesson(lesson: LessonData): void {
  LESSONS[lesson.knotId] = lesson;
}
