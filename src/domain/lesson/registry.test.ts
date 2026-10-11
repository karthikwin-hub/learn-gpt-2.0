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
});
