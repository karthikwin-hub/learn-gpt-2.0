/**
 * Registry mapping knot IDs to their lesson data, cards, and metadata.
 */

import { D1_LESSON } from './d1';
import { D2_LESSON } from './d2';
import { D3_LESSON } from './d3';
import { D4_LESSON } from './d4';
import { G1_LESSON } from './g1';
import { G2_LESSON } from './g2';
import { G3_LESSON } from './g3';
import { G4_LESSON } from './g4';
import { G5_LESSON } from './g5';
import { S1_LESSON } from './s1';
import { S2_LESSON } from './s2';
import { S3_LESSON } from './s3';
import { L1_LESSON } from './l1';
import { L2_LESSON } from './l2';
import { L3_LESSON } from './l3';
import { L4_LESSON } from './l4';
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
  G1: G1_LESSON,
  G2: G2_LESSON,
  G3: G3_LESSON,
  G4: G4_LESSON,
  G5: G5_LESSON,
  S1: S1_LESSON,
  S2: S2_LESSON,
  S3: S3_LESSON,
  L1: L1_LESSON,
  L2: L2_LESSON,
  L3: L3_LESSON,
  L4: L4_LESSON,
};

export function getLesson(knotId: string): LessonData | null {
  return LESSONS[knotId] || null;
}

export function registerLesson(lesson: LessonData): void {
  LESSONS[lesson.knotId] = lesson;
}
