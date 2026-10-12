import { describe, it, expect } from 'vitest';
import { getLesson } from './registry';

describe('Lesson registry', () => {
  it('retrieves M2 lesson with 6 cards', () => {
    const m2 = getLesson('M2');
    expect(m2).not.toBeNull();
    expect(m2?.cards).toHaveLength(6);
    expect(m2?.cards[0]?.key).toBe('what');
    expect(m2?.cards[3]?.key).toBe('example');
    expect(m2?.cards[5]?.key).toBe('sutra');
  });

  it('retrieves M4 lesson with mistake and explain data', () => {
    const m4 = getLesson('M4');
    expect(m4).not.toBeNull();
    expect(m4?.mistake).toBeDefined();
    expect(m4?.mistake?.steps).toBe(4);
    expect(m4?.mistake?.wrong).toBe(1);
    expect(m4?.explain).toHaveLength(3);
  });

  it('retrieves Loka lessons (I2, E1, E4)', () => {
    const i2 = getLesson('I2');
    expect(i2).not.toBeNull();
    expect(i2?.cards).toHaveLength(6);
    expect(i2?.explain).toHaveLength(2);
    expect(i2?.mistake?.steps).toBe(4);

    const e1 = getLesson('E1');
    expect(e1).not.toBeNull();
    expect(e1?.cards).toHaveLength(6);
    expect(e1?.explain).toHaveLength(2);

    const e4 = getLesson('E4');
    expect(e4).not.toBeNull();
    expect(e4?.cards).toHaveLength(6);
    expect(e4?.explain).toHaveLength(2);
  });

  it('retrieves N2 Roman Numerals lesson', () => {
    const n2 = getLesson('N2');
    expect(n2).not.toBeNull();
    expect(n2?.cards).toHaveLength(6);
    expect(n2?.explain).toHaveLength(2);
    expect(n2?.mistake?.steps).toBe(4);
    expect(n2?.mistake?.wrong).toBe(2);
  });

  it('retrieves N4 Fractions of a Collection lesson', () => {
    const n4 = getLesson('N4');
    expect(n4).not.toBeNull();
    expect(n4?.cards).toHaveLength(6);
    expect(n4?.explain).toHaveLength(2);
    expect(n4?.mistake?.steps).toBe(4);
    expect(n4?.mistake?.wrong).toBe(2);
  });

  it('retrieves N5 Tenths and Hundredths lesson', () => {
    const n5 = getLesson('N5');
    expect(n5).not.toBeNull();
    expect(n5?.cards).toHaveLength(6);
    expect(n5?.explain).toHaveLength(2);
    expect(n5?.mistake?.steps).toBe(4);
    expect(n5?.mistake?.wrong).toBe(1);
  });

  it('retrieves A1 Big Sums and Regrouping lesson', () => {
    const a1 = getLesson('A1');
    expect(a1).not.toBeNull();
    expect(a1?.cards).toHaveLength(6);
    expect(a1?.explain).toHaveLength(2);
    expect(a1?.mistake?.steps).toBe(4);
    expect(a1?.mistake?.wrong).toBe(1);
  });

  it('retrieves A2 Estimate First lesson', () => {
    const a2 = getLesson('A2');
    expect(a2).not.toBeNull();
    expect(a2?.cards).toHaveLength(6);
    expect(a2?.explain).toHaveLength(2);
    expect(a2?.mistake?.steps).toBe(4);
    expect(a2?.mistake?.wrong).toBe(3);
  });

  it('retrieves D2 Repeated Subtraction lesson', () => {
    const d2 = getLesson('D2');
    expect(d2).not.toBeNull();
    expect(d2?.cards).toHaveLength(6);
    expect(d2?.explain).toHaveLength(2);
    expect(d2?.mistake?.steps).toBe(3);
    expect(d2?.mistake?.wrong).toBe(2);
  });

  it('retrieves D4 Long Division Algorithm lesson', () => {
    const d4 = getLesson('D4');
    expect(d4).not.toBeNull();
    expect(d4?.cards).toHaveLength(6);
    expect(d4?.explain).toHaveLength(2);
    expect(d4?.mistake?.steps).toBe(3);
    expect(d4?.mistake?.wrong).toBe(1);
  });

  it('retrieves A3 Which Operation lesson', () => {
    const a3 = getLesson('A3');
    expect(a3).not.toBeNull();
    expect(a3?.cards).toHaveLength(6);
    expect(a3?.explain).toHaveLength(2);
    expect(a3?.mistake?.steps).toBe(3);
    expect(a3?.mistake?.wrong).toBe(1);
  });

  it('retrieves F1 Factors Make Rectangles lesson', () => {
    const f1 = getLesson('F1');
    expect(f1).not.toBeNull();
    expect(f1?.cards).toHaveLength(6);
    expect(f1?.explain).toHaveLength(2);
    expect(f1?.mistake?.steps).toBe(3);
    expect(f1?.mistake?.wrong).toBe(1);
  });

  it('retrieves F2 Primes & Composites lesson', () => {
    const f2 = getLesson('F2');
    expect(f2).not.toBeNull();
    expect(f2?.cards).toHaveLength(6);
    expect(f2?.explain).toHaveLength(2);
    expect(f2?.mistake?.steps).toBe(3);
    expect(f2?.mistake?.wrong).toBe(1);
  });

  it('retrieves F3 Divisibility Tests lesson', () => {
    const f3 = getLesson('F3');
    expect(f3).not.toBeNull();
    expect(f3?.cards).toHaveLength(6);
    expect(f3?.explain).toHaveLength(2);
    expect(f3?.mistake?.steps).toBe(3);
    expect(f3?.mistake?.wrong).toBe(1);
  });
});
