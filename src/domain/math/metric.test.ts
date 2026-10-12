import { describe, it, expect } from 'vitest';
import {
  convertLength,
  convertMass,
  convertCapacity,
  parseMetersAndCentimeters,
  areMetricQuantitiesEqual,
} from './metric';

describe('metric conversion domain logic', () => {
  it('converts length units accurately', () => {
    expect(convertLength(1, 'm', 'cm')).toBe(100);
    expect(convertLength(250, 'cm', 'm')).toBe(2.5);
    expect(convertLength(5, 'km', 'm')).toBe(5000);
    expect(convertLength(1200, 'm', 'km')).toBe(1.2);
    expect(convertLength(15, 'cm', 'mm')).toBe(150);
    expect(convertLength(0, 'm', 'cm')).toBe(0);
    expect(convertLength(-10, 'm', 'cm')).toBe(0);
  });

  it('converts mass units accurately', () => {
    expect(convertMass(1, 'kg', 'g')).toBe(1000);
    expect(convertMass(4500, 'g', 'kg')).toBe(4.5);
    expect(convertMass(2.5, 'kg', 'g')).toBe(2500);
    expect(convertMass(500, 'mg', 'g')).toBe(0.5);
    expect(convertMass(0, 'kg', 'g')).toBe(0);
  });

  it('converts capacity units accurately', () => {
    expect(convertCapacity(1, 'L', 'mL')).toBe(1000);
    expect(convertCapacity(500, 'mL', 'L')).toBe(0.5);
    expect(convertCapacity(2.5, 'L', 'mL')).toBe(2500);
    expect(convertCapacity(0, 'L', 'mL')).toBe(0);
  });

  it('correctly parses mixed metres and centimetres without Sonia decimal trap', () => {
    // 4 m 5 cm is 4.05 m, NOT 4.5 m!
    expect(parseMetersAndCentimeters(4, 5)).toBe(4.05);

    // 4 m 50 cm is 4.5 m
    expect(parseMetersAndCentimeters(4, 50)).toBe(4.5);

    // 3 m 25 cm is 3.25 m
    expect(parseMetersAndCentimeters(3, 25)).toBe(3.25);
  });

  it('tests equality of metric quantities across different units', () => {
    expect(areMetricQuantitiesEqual(2.5, 'm', 250, 'cm')).toBe(true);
    expect(areMetricQuantitiesEqual(1, 'km', 1000, 'm')).toBe(true);
    expect(areMetricQuantitiesEqual(2, 'm', 250, 'cm')).toBe(false);
  });
});
