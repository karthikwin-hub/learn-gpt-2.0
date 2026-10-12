/**
 * Metric Units & Conversion Domain Logic (Length, Mass, Capacity).
 *
 * Core invariant:
 * - The metric system uses powers-of-10 place-value scaling:
 *   - kilo- (k) = 1,000 × base unit
 *   - base unit (metre m, gram g, litre L) = 1
 *   - centi- (c) = 1/100 = 0.01 × base unit
 *   - milli- (m) = 1/1,000 = 0.001 × base unit
 * - Converting from a larger unit to a smaller unit multiplies by powers of 10.
 * - Converting from a smaller unit to a larger unit divides by powers of 10.
 * - Mixed notation: 4 m 5 cm = 4 + 5/100 = 4.05 m (NOT 4.5 m, which is 4 m 50 cm).
 */

export type LengthUnit = 'km' | 'm' | 'cm' | 'mm';
export type MassUnit = 'kg' | 'g' | 'mg';
export type CapacityUnit = 'kL' | 'L' | 'mL';

export const LENGTH_FACTORS: Record<LengthUnit, number> = {
  km: 1000,
  m: 1,
  cm: 0.01,
  mm: 0.001,
};

export const MASS_FACTORS: Record<MassUnit, number> = {
  kg: 1000,
  g: 1,
  mg: 0.001,
};

export const CAPACITY_FACTORS: Record<CapacityUnit, number> = {
  kL: 1000,
  L: 1,
  mL: 0.001,
};

/**
 * Converts length between metric units.
 */
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  if (value < 0) return 0;
  const inMeters = value * LENGTH_FACTORS[from];
  const result = inMeters / LENGTH_FACTORS[to];
  return Math.round(result * 100000) / 100000;
}

/**
 * Converts mass between metric units.
 */
export function convertMass(value: number, from: MassUnit, to: MassUnit): number {
  if (value < 0) return 0;
  const inGrams = value * MASS_FACTORS[from];
  const result = inGrams / MASS_FACTORS[to];
  return Math.round(result * 100000) / 100000;
}

/**
 * Converts liquid capacity between metric units.
 */
export function convertCapacity(value: number, from: CapacityUnit, to: CapacityUnit): number {
  if (value < 0) return 0;
  const inLitres = value * CAPACITY_FACTORS[from];
  const result = inLitres / CAPACITY_FACTORS[to];
  return Math.round(result * 100000) / 100000;
}

/**
 * Combines metres and centimetres into decimal metres (e.g. 4 m 5 cm -> 4.05 m).
 */
export function parseMetersAndCentimeters(meters: number, centimeters: number): number {
  const m = Math.max(0, meters);
  const cm = Math.max(0, centimeters);
  return Math.round((m + cm / 100) * 100) / 100;
}

/**
 * Tests equality of two metric quantities with tolerance.
 */
export function areMetricQuantitiesEqual(
  valA: number,
  unitA: LengthUnit,
  valB: number,
  unitB: LengthUnit,
  tolerance = 1e-4
): boolean {
  const baseA = valA * LENGTH_FACTORS[unitA];
  const baseB = valB * LENGTH_FACTORS[unitB];
  return Math.abs(baseA - baseB) <= tolerance;
}
