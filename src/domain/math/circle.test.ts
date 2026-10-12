import { describe, it, expect } from 'vitest';
import {
  diameterFromRadius,
  radiusFromDiameter,
  chordLength,
  isChordDiameter,
  circumference,
  circleArea,
  compareChordToDiameter,
} from './circle';

describe('circle domain logic', () => {
  it('calculates diameter from radius and vice-versa', () => {
    expect(diameterFromRadius(5)).toBe(10);
    expect(diameterFromRadius(0)).toBe(0);
    expect(diameterFromRadius(-4)).toBe(0);

    expect(radiusFromDiameter(10)).toBe(5);
    expect(radiusFromDiameter(0)).toBe(0);
    expect(radiusFromDiameter(-8)).toBe(0);
  });

  it('calculates chord length correctly with Pythagoras', () => {
    // radius 5, distance 0 -> diameter 10
    expect(chordLength(5, 0)).toBe(10);

    // radius 5, distance 3 -> half chord 4 -> full chord 8
    expect(chordLength(5, 3)).toBe(8);

    // radius 5, distance -3 (negative offset) -> 8
    expect(chordLength(5, -3)).toBe(8);

    // radius 5, distance 5 (tangent point) -> 0
    expect(chordLength(5, 5)).toBe(0);

    // radius 5, distance > 5 (outside circle) -> 0
    expect(chordLength(5, 6)).toBe(0);

    // negative or zero radius -> 0
    expect(chordLength(0, 0)).toBe(0);
    expect(chordLength(-5, 2)).toBe(0);
  });

  it('checks if a chord is a diameter', () => {
    expect(isChordDiameter(0)).toBe(true);
    expect(isChordDiameter(0.00001)).toBe(true);
    expect(isChordDiameter(0.1)).toBe(false);
    expect(isChordDiameter(2)).toBe(false);
  });

  it('calculates circumference and circle area', () => {
    expect(circumference(5)).toBeCloseTo(31.4159, 3);
    expect(circumference(0)).toBe(0);
    expect(circumference(-2)).toBe(0);

    expect(circleArea(5)).toBeCloseTo(78.5398, 3);
    expect(circleArea(0)).toBe(0);
    expect(circleArea(-3)).toBe(0);
  });

  it('compares chord to diameter', () => {
    const comp1 = compareChordToDiameter(5, 0);
    expect(comp1.radius).toBe(5);
    expect(comp1.diameter).toBe(10);
    expect(comp1.chordLength).toBe(10);
    expect(comp1.isDiameter).toBe(true);
    expect(comp1.differenceFromDiameter).toBe(0);

    const comp2 = compareChordToDiameter(5, 3);
    expect(comp2.chordLength).toBe(8);
    expect(comp2.isDiameter).toBe(false);
    expect(comp2.differenceFromDiameter).toBe(2);
  });
});
