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

  it('retrieves F4 Common Factors & HCF lesson', () => {
    const f4 = getLesson('F4');
    expect(f4).not.toBeNull();
    expect(f4?.cards).toHaveLength(6);
    expect(f4?.explain).toHaveLength(2);
    expect(f4?.mistake?.steps).toBe(3);
    expect(f4?.mistake?.wrong).toBe(1);
  });

  it('retrieves G1 Angles as turns lesson', () => {
    const g1 = getLesson('G1');
    expect(g1).not.toBeNull();
    expect(g1?.cards).toHaveLength(6);
    expect(g1?.explain).toHaveLength(2);
    expect(g1?.mistake?.steps).toBe(3);
    expect(g1?.mistake?.wrong).toBe(2);
    expect(g1?.stateKey).toBe('angles');
  });

  it('retrieves G2 Rope and pegs lesson', () => {
    const g2 = getLesson('G2');
    expect(g2).not.toBeNull();
    expect(g2?.cards).toHaveLength(6);
    expect(g2?.explain).toHaveLength(2);
    expect(g2?.mistake?.steps).toBe(3);
    expect(g2?.mistake?.wrong).toBe(2);
    expect(g2?.stateKey).toBe('rope');
  });

  it('retrieves G3 Slide the top lesson', () => {
    const g3 = getLesson('G3');
    expect(g3).not.toBeNull();
    expect(g3?.cards).toHaveLength(6);
    expect(g3?.explain).toHaveLength(2);
    expect(g3?.mistake?.steps).toBe(3);
    expect(g3?.mistake?.wrong).toBe(1);
    expect(g3?.stateKey).toBe('shear');
  });

  it('retrieves G4 Kolam Mirror lesson', () => {
    const g4 = getLesson('G4');
    expect(g4).not.toBeNull();
    expect(g4?.cards).toHaveLength(6);
    expect(g4?.explain).toHaveLength(2);
    expect(g4?.mistake?.steps).toBe(3);
    expect(g4?.mistake?.wrong).toBe(1);
    expect(g4?.stateKey).toBe('kolam');
  });

  it('retrieves G5 Fold a Box lesson', () => {
    const g5 = getLesson('G5');
    expect(g5).not.toBeNull();
    expect(g5?.cards).toHaveLength(6);
    expect(g5?.explain).toHaveLength(2);
    expect(g5?.mistake?.steps).toBe(3);
    expect(g5?.mistake?.wrong).toBe(0);
    expect(g5?.stateKey).toBe('cubenet');
  });

  it('retrieves G6 Circles lesson', () => {
    const g6 = getLesson('G6');
    expect(g6).not.toBeNull();
    expect(g6?.cards).toHaveLength(6);
    expect(g6?.explain).toHaveLength(2);
    expect(g6?.mistake?.steps).toBe(3);
    expect(g6?.mistake?.wrong).toBe(1);
    expect(g6?.stateKey).toBe('circle');
  });

  it('retrieves G7 Tangrams lesson', () => {
    const g7 = getLesson('G7');
    expect(g7).not.toBeNull();
    expect(g7?.cards).toHaveLength(6);
    expect(g7?.explain).toHaveLength(2);
    expect(g7?.mistake?.steps).toBe(3);
    expect(g7?.mistake?.wrong).toBe(1);
    expect(g7?.stateKey).toBe('tangram');
  });

  it('retrieves G8 Views from Above lesson', () => {
    const g8 = getLesson('G8');
    expect(g8).not.toBeNull();
    expect(g8?.cards).toHaveLength(6);
    expect(g8?.explain).toHaveLength(2);
    expect(g8?.mistake?.steps).toBe(3);
    expect(g8?.mistake?.wrong).toBe(1);
    expect(g8?.stateKey).toBe('views');
  });

  it('retrieves U2 Metric Units lesson', () => {
    const u2 = getLesson('U2');
    expect(u2).not.toBeNull();
    expect(u2?.cards).toHaveLength(6);
    expect(u2?.explain).toHaveLength(2);
    expect(u2?.mistake?.steps).toBe(3);
    expect(u2?.mistake?.wrong).toBe(1);
    expect(u2?.stateKey).toBe('metric');
  });

  it('retrieves U3 Timeclock lesson', () => {
    const u3 = getLesson('U3');
    expect(u3).not.toBeNull();
    expect(u3?.cards).toHaveLength(6);
    expect(u3?.explain).toHaveLength(2);
    expect(u3?.mistake?.steps).toBe(3);
    expect(u3?.mistake?.wrong).toBe(1);
    expect(u3?.stateKey).toBe('timeclock');
  });

  it('retrieves H1 Pictographs lesson', () => {
    const h1 = getLesson('H1');
    expect(h1).not.toBeNull();
    expect(h1?.cards).toHaveLength(6);
    expect(h1?.explain).toHaveLength(2);
    expect(h1?.mistake?.steps).toBe(3);
    expect(h1?.mistake?.wrong).toBe(1);
    expect(h1?.stateKey).toBe('pictograph');
  });

  it('retrieves H2 Bar Graphs lesson', () => {
    const h2 = getLesson('H2');
    expect(h2).not.toBeNull();
    expect(h2?.cards).toHaveLength(6);
    expect(h2?.explain).toHaveLength(2);
    expect(h2?.mistake?.steps).toBe(3);
    expect(h2?.mistake?.wrong).toBe(1);
    expect(h2?.stateKey).toBe('bargraph');
  });

  it('retrieves L4 Sequences lesson', () => {
    const l4 = getLesson('L4');
    expect(l4).not.toBeNull();
    expect(l4?.cards).toHaveLength(6);
    expect(l4?.explain).toHaveLength(2);
    expect(l4?.mistake?.steps).toBe(3);
    expect(l4?.mistake?.wrong).toBe(1);
    expect(l4?.stateKey).toBe('sequences');
  });

  it('retrieves P1 Growing Patterns lesson', () => {
    const p1 = getLesson('P1');
    expect(p1).not.toBeNull();
    expect(p1?.cards).toHaveLength(6);
    expect(p1?.explain).toHaveLength(2);
    expect(p1?.mistake?.steps).toBe(3);
    expect(p1?.mistake?.wrong).toBe(1);
    expect(p1?.stateKey).toBe('growing');
  });

  it('retrieves S1 Single Set lesson', () => {
    const s1 = getLesson('S1');
    expect(s1).not.toBeNull();
    expect(s1?.cards).toHaveLength(6);
    expect(s1?.explain).toHaveLength(2);
    expect(s1?.mistake?.steps).toBe(3);
    expect(s1?.mistake?.wrong).toBe(1);
    expect(s1?.stateKey).toBe('singleset');
  });

  it('retrieves S2 Two Rings lesson', () => {
    const s2 = getLesson('S2');
    expect(s2).not.toBeNull();
    expect(s2?.cards).toHaveLength(6);
    expect(s2?.explain).toHaveLength(2);
    expect(s2?.mistake?.steps).toBe(3);
    expect(s2?.mistake?.wrong).toBe(1);
    expect(s2?.stateKey).toBe('sets');
  });

  it('retrieves S3 Guess the Rules lesson', () => {
    const s3 = getLesson('S3');
    expect(s3).not.toBeNull();
    expect(s3?.cards).toHaveLength(6);
    expect(s3?.explain).toHaveLength(2);
    expect(s3?.mistake?.steps).toBe(3);
    expect(s3?.mistake?.wrong).toBe(1);
    expect(s3?.stateKey).toBe('sets');
  });
});
