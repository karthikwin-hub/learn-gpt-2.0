import { describe, it, expect } from 'vitest';
import { subtractWithRegrouping, addWithRegrouping, verifyConservation } from './regroup';

describe('domain/math/regroup', () => {
  describe('subtractWithRegrouping', () => {
    it('subtracts across zeroes (500 - 247 = 253) with cascading unbundling', () => {
      const res = subtractWithRegrouping(500, 247);
      expect(res.difference).toBe(253);

      // Column 0 (ones): 10 - 7 = 3 (unbundled from hundreds through tens)
      expect(res.steps[0]?.topDigit).toBe(10);
      expect(res.steps[0]?.bottomDigit).toBe(7);
      expect(res.steps[0]?.resultDigit).toBe(3);
      expect(res.steps[0]?.unbundled).toBe(true);

      // Column 1 (tens): 9 - 4 = 5
      expect(res.steps[1]?.topDigit).toBe(9);
      expect(res.steps[1]?.bottomDigit).toBe(4);
      expect(res.steps[1]?.resultDigit).toBe(5);

      // Column 2 (hundreds): 4 - 2 = 2
      expect(res.steps[2]?.topDigit).toBe(4);
      expect(res.steps[2]?.bottomDigit).toBe(2);
      expect(res.steps[2]?.resultDigit).toBe(2);
    });

    it('handles multiple zeroes: 40005 - 18347 = 21658', () => {
      const res = subtractWithRegrouping(40005, 18347);
      expect(res.difference).toBe(21658);
    });

    it('throws when top is smaller than bottom', () => {
      expect(() => subtractWithRegrouping(247, 500)).toThrow();
    });
  });

  describe('addWithRegrouping', () => {
    it('adds with carrying: 678 + 456 = 1134', () => {
      const res = addWithRegrouping(678, 456);
      expect(res.sum).toBe(1134);

      // Ones: 8 + 6 = 14 -> res 4, carry 1
      expect(res.steps[0]?.resultDigit).toBe(4);
      expect(res.steps[0]?.carryOut).toBe(1);

      // Tens: 7 + 5 + 1 = 13 -> res 3, carry 1
      expect(res.steps[1]?.resultDigit).toBe(3);
      expect(res.steps[1]?.carryOut).toBe(1);

      // Hundreds: 6 + 4 + 1 = 11 -> res 1, carry 1
      expect(res.steps[2]?.resultDigit).toBe(1);
      expect(res.steps[2]?.carryOut).toBe(1);
    });
  });

  describe('verifyConservation', () => {
    it('proves that 500 == 4 hundreds + 9 tens + 10 ones', () => {
      const original = verifyConservation({ hundreds: 5, tens: 0, ones: 0 });
      const unbundled = verifyConservation({ hundreds: 4, tens: 9, ones: 10 });
      expect(original).toBe(500);
      expect(unbundled).toBe(500);
      expect(original).toBe(unbundled);
    });
  });
});
