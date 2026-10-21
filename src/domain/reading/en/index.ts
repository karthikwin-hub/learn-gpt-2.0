import type { Chapter } from '../types';
import { C1 } from './c1';
import { C2 } from './c2';
import { C3 } from './c3';
import { C4 } from './c4';
import { C5 } from './c5';
import { C6 } from './c6';
import { C7 } from './c7';
import { C8 } from './c8';
import { C9 } from './c9';
import { E1 } from './e1';
import { E2 } from './e2';
import { E3 } from './e3';
import { E4 } from './e4';
import { I1 } from './i1';
import { I2 } from './i2';
import { Q1 } from './q1';
import { Q2 } from './q2';
import { Q3 } from './q3';

export const CHAPTERS_EN: Readonly<Record<string, Chapter>> = {
  I1,
  I2,
  Q1,
  Q2,
  Q3,
  E1,
  E2,
  E3,
  E4,
  C1,
  C2,
  C3,
  C4,
  C5,
  C6,
  C7,
  C8,
  C9,
};
