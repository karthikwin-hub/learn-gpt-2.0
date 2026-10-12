/**
 * Primes and Composites domain model (Knot F2).
 *
 * Implements pure mathematical functions for primality testing,
 * Sieve of Eratosthenes, prime factorization, and number classification.
 */

export type NumberClassification = 'unit' | 'prime' | 'composite';

/**
 * Checks whether n is a prime number (has exactly two distinct factors: 1 and itself).
 */
export function isPrime(n: number): boolean {
  if (n <= 1 || !Number.isInteger(n)) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Checks whether n is a composite number (has more than two factors).
 * Notice: 1 is neither prime nor composite.
 */
export function isComposite(n: number): boolean {
  if (n <= 1 || !Number.isInteger(n)) return false;
  return !isPrime(n);
}

/**
 * Classifies an integer into 'unit' (1), 'prime', or 'composite'.
 */
export function categorizeNumber(n: number): NumberClassification {
  if (n === 1) return 'unit';
  if (isPrime(n)) return 'prime';
  return 'composite';
}

/**
 * Returns all prime numbers up to max using the Sieve of Eratosthenes.
 */
export function sievePrimesUpTo(max: number): number[] {
  if (max < 2) return [];
  const isP = new Uint8Array(max + 1);
  isP.fill(1);
  isP[0] = 0;
  isP[1] = 0;

  const limit = Math.floor(Math.sqrt(max));
  for (let p = 2; p <= limit; p++) {
    if (isP[p]) {
      for (let multiple = p * p; multiple <= max; multiple += p) {
        isP[multiple] = 0;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= max; i++) {
    if (isP[i]) primes.push(i);
  }
  return primes;
}

/**
 * Returns all composite multiples of factor up to max (excluding the prime factor itself).
 */
export function getMultiplesUpTo(factor: number, max: number): number[] {
  if (factor < 2) return [];
  const multiples: number[] = [];
  for (let m = factor * 2; m <= max; m += factor) {
    multiples.push(m);
  }
  return multiples;
}

/**
 * Decomposes positive integer n into its prime factors in ascending order.
 * e.g., primeFactorize(24) => [2, 2, 2, 3]
 */
export function primeFactorize(n: number): number[] {
  if (n <= 1 || !Number.isInteger(n)) return [];
  const factors: number[] = [];
  let current = n;

  while (current % 2 === 0) {
    factors.push(2);
    current /= 2;
  }

  let d = 3;
  while (d * d <= current) {
    if (current % d === 0) {
      factors.push(d);
      current /= d;
    } else {
      d += 2;
    }
  }

  if (current > 1) {
    factors.push(current);
  }

  return factors;
}
