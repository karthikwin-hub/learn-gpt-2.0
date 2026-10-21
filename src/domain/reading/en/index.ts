import type { Chapter } from '../types';
import { I1 } from './i1';
import { I2 } from './i2';
import { Q1 } from './q1';
import { Q2 } from './q2';
import { Q3 } from './q3';

export const CHAPTERS_EN: Readonly<Record<string, Chapter>> = { I1, I2, Q1, Q2, Q3 };
