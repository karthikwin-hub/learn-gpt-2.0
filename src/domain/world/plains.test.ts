import { describe, expect, it } from 'vitest';
import { FLOODS_TO_FILL, SILT_CHAIN, isChainOrder, isFlatPlain, layersAfter } from './plains';

describe('the northern plains', () => {
  it('lays one layer of silt per flood until the low land is full', () => {
    expect(layersAfter(0)).toBe(0);
    expect(layersAfter(2)).toBe(2);
    expect(layersAfter(9)).toBe(FLOODS_TO_FILL);
    expect(isFlatPlain(3)).toBe(false);
    expect(isFlatPlain(4)).toBe(true);
  });

  it('runs from rain on the mountains to crops on the plain', () => {
    expect(SILT_CHAIN[0]).toBe('rain');
    expect(SILT_CHAIN[SILT_CHAIN.length - 1]).toBe('crops');
    expect(isChainOrder(['rain', 'pickup'])).toBe(true);
    expect(isChainOrder(['rain', 'flood'])).toBe(false);
  });

  it('fails fast on a part of a flood', () => {
    expect(() => layersAfter(1.5)).toThrow();
    expect(() => layersAfter(-1)).toThrow();
  });
});
