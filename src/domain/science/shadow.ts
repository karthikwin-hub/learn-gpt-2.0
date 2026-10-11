/**
 * Pure domain module for Light and Shadows (R1).
 * Governed by docs/rules/SCIENCE_RULES.md §1 & §2.
 */

export const STICK_HEIGHT = 1.5;

export type MaterialKind = 'opaque' | 'translucent' | 'transparent';
export type MaterialId = 'cardboard' | 'wax' | 'glass';

export const MATERIALS: Record<MaterialId, MaterialKind> = {
  cardboard: 'opaque',
  wax: 'translucent',
  glass: 'transparent',
};

/**
 * Calculates ground shadow length from a point light source using similar triangles.
 * Length = (stickH * dist) / (lampH - stickH).
 * Returns Infinity if lamp height <= stick height (no floor shadow).
 */
export function shadowLength(stickH: number, lampH: number, dist: number): number {
  if (lampH <= stickH) return Infinity;
  return (stickH * dist) / (lampH - stickH);
}

/**
 * Shadow opacity darkness from 0 (transparent) to 1 (full opaque).
 */
export function shadowDarkness(material: MaterialId): number {
  const kind = MATERIALS[material];
  if (!kind) throw new Error(`Unknown material: ${material}`);
  if (kind === 'opaque') return 1;
  if (kind === 'translucent') return 0.4;
  return 0.05;
}
