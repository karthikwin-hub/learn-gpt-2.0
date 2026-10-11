import { describe, it, expect } from 'vitest';
import {
  createEmptyDrawer,
  calculateTotalPaise,
  formatRupees,
  canExchangePaiseToRupee,
  exchangePaiseToRupee,
  modifyDrawer,
} from './money';

describe('money domain module (U1 Rupee & Paise Grid)', () => {
  describe('calculateTotalPaise and formatRupees', () => {
    it('calculates empty drawer as 0 and formats as ₹0.00', () => {
      const drawer = createEmptyDrawer();
      expect(calculateTotalPaise(drawer)).toBe(0);
      expect(formatRupees(0)).toBe('₹0.00');
    });

    it('calculates and formats mixed coins and notes correctly', () => {
      let drawer = createEmptyDrawer();
      drawer = modifyDrawer(drawer, 'p50', 1); // 50p
      drawer = modifyDrawer(drawer, 'r1', 2); // ₹2
      drawer = modifyDrawer(drawer, 'r50', 1); // ₹50
      drawer = modifyDrawer(drawer, 'r100', 1); // ₹100

      // Total = 10000 + 5000 + 200 + 50 = 15250 paise
      expect(calculateTotalPaise(drawer)).toBe(15250);
      expect(formatRupees(15250)).toBe('₹152.50');
    });
  });

  describe('exchangePaiseToRupee', () => {
    it('detects when 100 paise can be exchanged into ₹1', () => {
      let drawer = createEmptyDrawer();
      drawer = modifyDrawer(drawer, 'p50', 1);
      expect(canExchangePaiseToRupee(drawer)).toBe(false);

      drawer = modifyDrawer(drawer, 'p50', 1); // now 2 of 50p
      expect(canExchangePaiseToRupee(drawer)).toBe(true);
    });

    it('exchanges two 50p coins for one ₹1 coin preserving total value', () => {
      let drawer = createEmptyDrawer();
      drawer = modifyDrawer(drawer, 'p50', 2);
      const initialTotal = calculateTotalPaise(drawer);
      expect(initialTotal).toBe(100);

      const result = exchangePaiseToRupee(drawer);
      expect(result.exchanged).toBe(true);
      expect(result.drawer['p50']).toBe(0);
      expect(result.drawer['r1']).toBe(1);
      expect(calculateTotalPaise(result.drawer)).toBe(initialTotal);
    });

    it('does not exchange if fewer than two 50p coins exist', () => {
      let drawer = createEmptyDrawer();
      drawer = modifyDrawer(drawer, 'p50', 1);
      const result = exchangePaiseToRupee(drawer);
      expect(result.exchanged).toBe(false);
      expect(result.drawer['p50']).toBe(1);
    });
  });
});
