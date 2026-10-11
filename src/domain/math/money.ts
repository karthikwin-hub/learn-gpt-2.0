/**
 * Pure domain module for Indian currency and exchange grid (U1).
 * Supports coins and notes: 100 paise = ₹1.
 */

export interface Denomination {
  id: string;
  label: string;
  valueInPaise: number;
  type: 'coin' | 'note';
}

export const DENOMINATIONS: Denomination[] = [
  { id: 'p50', label: '50p', valueInPaise: 50, type: 'coin' },
  { id: 'r1', label: '₹1', valueInPaise: 100, type: 'coin' },
  { id: 'r2', label: '₹2', valueInPaise: 200, type: 'coin' },
  { id: 'r5', label: '₹5', valueInPaise: 500, type: 'coin' },
  { id: 'r10', label: '₹10', valueInPaise: 1000, type: 'coin' },
  { id: 'r20', label: '₹20', valueInPaise: 2000, type: 'note' },
  { id: 'r50', label: '₹50', valueInPaise: 5000, type: 'note' },
  { id: 'r100', label: '₹100', valueInPaise: 10000, type: 'note' },
  { id: 'r500', label: '₹500', valueInPaise: 50000, type: 'note' },
];

export type MoneyDrawer = Record<string, number>;

/**
 * Creates an empty money drawer with 0 for all denominations.
 */
export function createEmptyDrawer(): MoneyDrawer {
  const d: MoneyDrawer = {};
  for (const denom of DENOMINATIONS) {
    d[denom.id] = 0;
  }
  return d;
}

/**
 * Calculates total value of a drawer in paise.
 */
export function calculateTotalPaise(drawer: MoneyDrawer): number {
  let total = 0;
  for (const denom of DENOMINATIONS) {
    const count = drawer[denom.id] || 0;
    total += count * denom.valueInPaise;
  }
  return total;
}

/**
 * Formats a paise total as a standard Rupee string.
 * e.g., 50 -> "₹0.50", 100 -> "₹1.00", 15250 -> "₹152.50"
 */
export function formatRupees(paise: number): string {
  const safe = Math.max(0, Math.floor(paise || 0));
  const rs = Math.floor(safe / 100);
  const ps = safe % 100;
  return `₹${rs}.${ps.toString().padStart(2, '0')}`;
}

/**
 * Checks if at least two 50p coins exist to exchange for ₹1.
 */
export function canExchangePaiseToRupee(drawer: MoneyDrawer): boolean {
  return (drawer['p50'] || 0) >= 2;
}

/**
 * Exchanges two 50 paise coins for one ₹1 coin, preserving total value.
 */
export function exchangePaiseToRupee(drawer: MoneyDrawer): {
  drawer: MoneyDrawer;
  exchanged: boolean;
} {
  if (!canExchangePaiseToRupee(drawer)) {
    return { drawer: { ...drawer }, exchanged: false };
  }
  const next = { ...drawer };
  next['p50'] = (next['p50'] || 0) - 2;
  next['r1'] = (next['r1'] || 0) + 1;
  return { drawer: next, exchanged: true };
}

/**
 * Adds or removes count of a denomination safely without negative counts.
 */
export function modifyDrawer(drawer: MoneyDrawer, denomId: string, delta: number): MoneyDrawer {
  const next = { ...drawer };
  const cur = next[denomId] || 0;
  next[denomId] = Math.max(0, cur + delta);
  return next;
}
