/**
 * Bar Graphs Domain Logic (Axes, Scale Intervals & Jaal B1 <-> H2).
 *
 * Core invariants:
 * - A bar graph uses bars of equal width to represent frequencies or amounts across categories.
 * - The axis has a step interval (e.g. 1, 2, 5, 10).
 * - A bar's value is: (grid mark position) * (step interval).
 * - Reading grid line index directly without multiplying by step size is the core misconception
 *   (Vikram trap: reading line 3 as 3 instead of 3 * 5 = 15).
 * - Jaal Link B1 <-> H2 connects food categories (grains, pulses, vegetables, dairy) to bar frequencies.
 */

export interface FoodIntakeItem {
  category: string;
  nutrient: string;
  count: number;
}

export const FOOD_INTAKE_DATASET: FoodIntakeItem[] = [
  { category: 'Rice & Roti', nutrient: 'Carbohydrates', count: 35 },
  { category: 'Dal & Pulses', nutrient: 'Proteins', count: 25 },
  { category: 'Greens & Veggies', nutrient: 'Vitamins & Fibre', count: 30 },
  { category: 'Milk & Curd', nutrient: 'Calcium', count: 20 },
];

/**
 * Calculates actual value from grid mark position and axis step interval.
 */
export function readBarValue(gridMark: number, stepInterval: number): number {
  const mark = Math.max(0, gridMark);
  const step = Math.max(1, stepInterval);
  return Math.round(mark * step * 100) / 100;
}

/**
 * Generates axis tick values starting from 0 in steps of stepInterval up to at least maxValue.
 */
export function generateAxisTicks(maxValue: number, stepInterval: number): number[] {
  const step = Math.max(1, stepInterval);
  const targetMax = Math.max(step, Math.ceil(maxValue / step) * step);
  const ticks: number[] = [];
  let current = 0;
  while (current <= targetMax) {
    ticks.push(current);
    current += step;
  }
  return ticks;
}

/**
 * Interpolates bar grid height (in grid line units) for a given value on a scale.
 */
export function interpolateBarHeight(value: number, stepInterval: number): number {
  const v = Math.max(0, value);
  const step = Math.max(1, stepInterval);
  return Math.round((v / step) * 100) / 100;
}
