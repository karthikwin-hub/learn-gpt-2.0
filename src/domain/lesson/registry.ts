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
import { G6_LESSON } from './g6';
import { G7_LESSON } from './g7';
import { G8_LESSON } from './g8';
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
import { I2_LESSON } from './i2';
import { E1_LESSON } from './e1';
import { E4_LESSON } from './e4';
import { N2_LESSON } from './n2';
import { N4_LESSON } from './n4';
import { N5_LESSON } from './n5';
import { A1_LESSON } from './a1';
import { A2_LESSON } from './a2';
import { A3_LESSON } from './a3';
import { F1_LESSON } from './f1';
import { F2_LESSON } from './f2';
import { F3_LESSON } from './f3';
import { F4_LESSON } from './f4';
import { U2_LESSON } from './u2';
import { U3_LESSON } from './u3';
import { H1_LESSON } from './h1';
import { H2_LESSON } from './h2';
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
  G6: G6_LESSON,
  G7: G7_LESSON,
  G8: G8_LESSON,
  S1: S1_LESSON,
  S2: S2_LESSON,
  S3: S3_LESSON,
  L1: L1_LESSON,
  L2: L2_LESSON,
  L3: L3_LESSON,
  L4: L4_LESSON,
  I2: I2_LESSON,
  E1: E1_LESSON,
  E4: E4_LESSON,
  N2: N2_LESSON,
  N4: N4_LESSON,
  N5: N5_LESSON,
  A1: A1_LESSON,
  A2: A2_LESSON,
  A3: A3_LESSON,
  F1: F1_LESSON,
  F2: F2_LESSON,
  F3: F3_LESSON,
  F4: F4_LESSON,
  U2: U2_LESSON,
  U3: U3_LESSON,
  H1: H1_LESSON,
  H2: H2_LESSON,
};

export function getLesson(knotId: string): LessonData | null {
  return LESSONS[knotId] || null;
}

export function registerLesson(lesson: LessonData): void {
  LESSONS[lesson.knotId] = lesson;
}
