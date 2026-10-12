import { describe, expect, it } from 'vitest';
import {
  isPrime,
  isComposite,
  categorizeNumber,
  sievePrimesUpTo,
  getMultiplesUpTo,
  primeFactorize,
} from './primes';

describe('domain/math/primes', () => {
  it('correctly identifies primes and handles edge cases', () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(13)).toBe(true);
    expect(isPrime(15)).toBe(false);
    expect(isPrime(29)).toBe(true);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(-5)).toBe(false);
  });

  it('correctly identifies composites, noting that 1 is neither', () => {
    expect(isComposite(1)).toBe(false);
    expect(isComposite(2)).toBe(false);
    expect(isComposite(4)).toBe(true);
    expect(isComposite(9)).toBe(true);
    expect(isComposite(15)).toBe(true);
  });

  it('categorizes numbers into unit, prime, or composite', () => {
    expect(categorizeNumber(1)).toBe('unit');
    expect(categorizeNumber(2)).toBe('prime');
    expect(categorizeNumber(7)).toBe('prime');
    expect(categorizeNumber(9)).toBe('composite');
    expect(categorizeNumber(12)).toBe('composite');
  });

  it('generates primes up to max with the Sieve of Eratosthenes', () => {
    expect(sievePrimesUpTo(10)).toEqual([2, 3, 5, 7]);
    expect(sievePrimesUpTo(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  it('computes multiples to filter during sieving', () => {
    expect(getMultiplesUpTo(2, 10)).toEqual([4, 6, 8, 10]);
    expect(getMultiplesUpTo(3, 15)).toEqual([6, 9, 12, 15]);
  });

  it('computes prime factor trees', () => {
    expect(primeFactorize(12)).toEqual([2, 2, 3]);
    expect(primeFactorize(24)).toEqual([2, 2, 2, 3]);
    expect(primeFactorize(7)).toEqual([7]);
    expect(primeFactorize(1)).toEqual([]);
  });
});
