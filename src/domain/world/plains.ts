/**
 * The northern plains (C5): rivers carry silt down from the Himalaya, and each flood spreads a new
 * layer of it over the low land. Layer on layer, the floods built a flat, fertile plain. Rivers do not
 * only wash soil away; they also bring it.
 */

export type SiltLink = 'rain' | 'pickup' | 'flood' | 'layer' | 'crops';

/** Cause to effect, from rain on the mountains to crops on the plain. */
export const SILT_CHAIN: readonly SiltLink[] = ['rain', 'pickup', 'flood', 'layer', 'crops'];

/** How many floods the drawing needs to fill its low land to a flat plain. */
export const FLOODS_TO_FILL = 4;

/** The layers of silt after some floods; the low land holds no more than it can. */
export function layersAfter(floods: number): number {
  if (!Number.isInteger(floods) || floods < 0)
    throw new Error(`Floods must be a whole number, got ${floods}`);
  return Math.min(floods, FLOODS_TO_FILL);
}

export function isFlatPlain(floods: number): boolean {
  return layersAfter(floods) === FLOODS_TO_FILL;
}

/** True when `order` follows the chain from its start so far. */
export function isChainOrder(order: readonly SiltLink[]): boolean {
  return order.every((l, i) => SILT_CHAIN[i] === l);
}
