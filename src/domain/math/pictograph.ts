/**
 * Pictographs Domain Logic (Scaled Keys & Data Representation).
 *
 * Core invariants:
 * - A pictograph uses repeated icons to represent quantities.
 * - Each full icon represents a key scale factor (e.g. 1 icon = 5 books, or 1 icon = 10 items).
 * - A half icon represents exactly half of the key scale (e.g. half icon = 2.5 or key/2).
 * - Omitting the key multiplier is the core misconception (Anita trap: counting 3 icons as 3 items instead of 3 * 10 = 30).
 */

export interface IconBreakdown {
  full: number;
  half: number;
  remainder: number;
}

/**
 * Calculates total item count from full icons, half icons, and key scale factor.
 */
export function calculateTotalFromIcons(
  fullIcons: number,
  halfIcons: number,
  keyScale: number
): number {
  const f = Math.max(0, fullIcons);
  const h = Math.max(0, halfIcons);
  const scale = Math.max(1, keyScale);
  return f * scale + h * (scale / 2);
}

/**
 * Determines how many full and half icons are required to represent a given count.
 */
export function iconsRequiredForCount(count: number, keyScale: number): IconBreakdown {
  const safeCount = Math.max(0, count);
  const scale = Math.max(1, keyScale);

  const full = Math.floor(safeCount / scale);
  const rem = safeCount % scale;
  const halfUnit = scale / 2;

  let half = 0;
  let finalRem = rem;

  if (rem >= halfUnit) {
    half = 1;
    finalRem = rem - halfUnit;
  }

  return {
    full,
    half,
    remainder: Math.round(finalRem * 100) / 100,
  };
}

/**
 * Validates if all numbers in a dataset can be cleanly represented using full and half icons.
 */
export function validatePictographScale(dataCounts: number[], keyScale: number): boolean {
  if (dataCounts.length === 0 || keyScale <= 0) return false;
  const halfUnit = keyScale / 2;
  return dataCounts.every((c) => {
    const rem = ((c % keyScale) + keyScale) % keyScale;
    return rem === 0 || Math.abs(rem - halfUnit) < 1e-4;
  });
}
