/**
 * Pure domain module for Indian place-value numeral system (N1).
 * Supports decomposition and formatting up to 10 Crores (99,99,99,999).
 */

export interface PlaceDigit {
  id: string;
  name: string;
  multiplier: number;
  digit: number;
}

export interface PlaceHouse {
  id: 'crores' | 'lakhs' | 'thousands' | 'ones';
  name: string;
  value: number;
  digits: PlaceDigit[];
}

export interface PlaceDecomposition {
  total: number;
  formatted: string;
  houses: PlaceHouse[];
  expandedTerms: string[];
}

/**
 * Formats a non-negative integer using standard Indian numbering comma placement.
 * e.g., 100000 -> "1,00,000", 12345678 -> "1,23,45,678"
 */
export function formatIndianNumeral(n: number): string {
  if (!Number.isFinite(n) || n < 0) return '0';
  const integerPart = Math.floor(n);
  const str = integerPart.toString();
  if (str.length <= 3) return str;

  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);

  // Group rest by pairs of 2 from right to left
  const pairs: string[] = [];
  let rem = rest;
  while (rem.length > 2) {
    pairs.unshift(rem.slice(-2));
    rem = rem.slice(0, -2);
  }
  if (rem.length > 0) {
    pairs.unshift(rem);
  }

  return `${pairs.join(',')},${lastThree}`;
}

/**
 * Decomposes an integer into its Indian place-value houses and expanded terms.
 */
export function decomposePlaceValue(n: number): PlaceDecomposition {
  const safe = Math.max(0, Math.min(999999999, Math.floor(n || 0)));
  const s = safe.toString().padStart(9, '0');

  const tc = parseInt(s.charAt(0), 10);
  const c = parseInt(s.charAt(1), 10);
  const tl = parseInt(s.charAt(2), 10);
  const l = parseInt(s.charAt(3), 10);
  const tth = parseInt(s.charAt(4), 10);
  const th = parseInt(s.charAt(5), 10);
  const h = parseInt(s.charAt(6), 10);
  const t = parseInt(s.charAt(7), 10);
  const o = parseInt(s.charAt(8), 10);

  const houses: PlaceHouse[] = [
    {
      id: 'crores',
      name: 'Crore',
      value: tc * 10 + c,
      digits: [
        { id: 'tenCrores', name: 'Ten Crores', multiplier: 100000000, digit: tc },
        { id: 'crores', name: 'Crores', multiplier: 10000000, digit: c },
      ],
    },
    {
      id: 'lakhs',
      name: 'Lakh',
      value: tl * 10 + l,
      digits: [
        { id: 'tenLakhs', name: 'Ten Lakhs', multiplier: 1000000, digit: tl },
        { id: 'lakhs', name: 'Lakhs', multiplier: 100000, digit: l },
      ],
    },
    {
      id: 'thousands',
      name: 'Thousand',
      value: tth * 10 + th,
      digits: [
        { id: 'tenThousands', name: 'Ten Thousands', multiplier: 10000, digit: tth },
        { id: 'thousands', name: 'Thousands', multiplier: 1000, digit: th },
      ],
    },
    {
      id: 'ones',
      name: 'Ones',
      value: h * 100 + t * 10 + o,
      digits: [
        { id: 'hundreds', name: 'Hundreds', multiplier: 100, digit: h },
        { id: 'tens', name: 'Tens', multiplier: 10, digit: t },
        { id: 'ones', name: 'Ones', multiplier: 1, digit: o },
      ],
    },
  ];

  const expandedTerms: string[] = [];
  for (const house of houses) {
    for (const d of house.digits) {
      if (d.digit > 0) {
        expandedTerms.push(formatIndianNumeral(d.digit * d.multiplier));
      }
    }
  }

  return {
    total: safe,
    formatted: formatIndianNumeral(safe),
    houses,
    expandedTerms: expandedTerms.length > 0 ? expandedTerms : ['0'],
  };
}

/**
 * Adjusts a specific place-value house or digit in a total.
 */
export function adjustDigit(current: number, multiplier: number, delta: number): number {
  const currentTotal = Math.max(0, Math.floor(current || 0));
  const currentDigit = Math.floor((currentTotal / multiplier) % 10);
  const nextDigit = (currentDigit + delta + 10) % 10;
  const diff = (nextDigit - currentDigit) * multiplier;
  return Math.max(0, Math.min(999999999, currentTotal + diff));
}
