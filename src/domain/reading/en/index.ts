import type { Chapter } from '../types';
import { I1 } from './i1';
import { I2 } from './i2';
import { E1 } from './e1';
import { E2 } from './e2';
import { E3 } from './e3';
import { E4 } from './e4';
import { Q1 } from './q1';
import { Q2 } from './q2';
import { Q3 } from './q3';

export const CHAPTERS_EN: Readonly<Record<string, Chapter>> = { I1, I2, Q1, Q2, Q3, E1, E2, E3, E4 };
