import { describe, it, expect } from 'vitest';
import {
  normalizeAngle,
  classifyAngle,
  turnFraction,
  angleTypeLabel,
  getAngleInfo,
  isArmLengthInvariant,
  arcCoordinates,
} from './angles';

describe('src/domain/math/angles', () => {
  it('normalizes angles within [0, 360]', () => {
    expect(normalizeAngle(0)).toBe(0);
    expect(normalizeAngle(90)).toBe(90);
    expect(normalizeAngle(450)).toBe(90);
    expect(normalizeAngle(-90)).toBe(270);
  });

  it('classifies angles into standard geometric categories', () => {
    expect(classifyAngle(0)).toBe('zero');
    expect(classifyAngle(45)).toBe('acute');
    expect(classifyAngle(90)).toBe('right');
    expect(classifyAngle(135)).toBe('obtuse');
    expect(classifyAngle(180)).toBe('straight');
    expect(classifyAngle(270)).toBe('reflex');
    expect(classifyAngle(360)).toBe('full');
  });

  it('calculates turn fractions correctly', () => {
    expect(turnFraction(90)).toEqual({ num: 1, den: 4, label: '1/4 turn (Quarter turn)' });
    expect(turnFraction(180)).toEqual({ num: 1, den: 2, label: '1/2 turn (Half turn)' });
    expect(turnFraction(270)).toEqual({ num: 3, den: 4, label: '3/4 turn (Three-quarter turn)' });
    expect(turnFraction(360)).toEqual({ num: 1, den: 1, label: 'Full turn' });
    expect(turnFraction(45)).toEqual({ num: 1, den: 8, label: '1/8 turn' });
  });

  it('provides calm human-readable labels', () => {
    expect(angleTypeLabel('right')).toContain('Quarter turn / Right angle');
    expect(angleTypeLabel('straight')).toContain('Half turn / Straight angle');
  });

  it('computes full angle information package', () => {
    const info = getAngleInfo(90);
    expect(info.degrees).toBe(90);
    expect(info.type).toBe('right');
    expect(info.turnFraction.num).toBe(1);
    expect(info.turnFraction.den).toBe(4);
  });

  it('proves arm length invariance (pedagogical core)', () => {
    // 90° with 60px arm vs 90° with 180px arm
    expect(isArmLengthInvariant(90, 60, 90, 180)).toBe(true);
    // 45° vs 90°
    expect(isArmLengthInvariant(45, 100, 90, 100)).toBe(false);
    // Invalid arm length
    expect(isArmLengthInvariant(90, 0, 90, 100)).toBe(false);
  });

  it('generates SVG arc path coordinates', () => {
    const arc90 = arcCoordinates(100, 100, 50, 90);
    expect(arc90).toContain('M 150 100');
    expect(arc90).toContain('A 50 50');

    const arcFull = arcCoordinates(100, 100, 50, 360);
    expect(arcFull).toContain('A 50 50 0 1 0');

    expect(arcCoordinates(100, 100, 50, 0)).toBe('');
  });
});
