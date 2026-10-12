import { describe, it, expect } from 'vitest';
import {
  evalGate,
  evaluateAndGate,
  evaluateOrGate,
  evaluateNotGate,
  generateTruthTable,
  getGateInputs,
  getMarbleRoute,
  getRowKey,
  isTableComplete,
} from './logic';

describe('domain/math/logic: Logic Gates and Marble Routing', () => {
  describe('pure gate evaluators', () => {
    it('evaluates evaluateAndGate', () => {
      expect(evaluateAndGate(false, false)).toBe(false);
      expect(evaluateAndGate(true, false)).toBe(false);
      expect(evaluateAndGate(false, true)).toBe(false);
      expect(evaluateAndGate(true, true)).toBe(true);
    });

    it('evaluates evaluateOrGate', () => {
      expect(evaluateOrGate(false, false)).toBe(false);
      expect(evaluateOrGate(true, false)).toBe(true);
      expect(evaluateOrGate(false, true)).toBe(true);
      expect(evaluateOrGate(true, true)).toBe(true);
    });

    it('evaluates evaluateNotGate', () => {
      expect(evaluateNotGate(false)).toBe(true);
      expect(evaluateNotGate(true)).toBe(false);
    });

    it('generates full truth tables', () => {
      const andTable = generateTruthTable('AND');
      expect(andTable).toHaveLength(4);
      expect(andTable[3]).toEqual({ inputs: [true, true], output: true });

      const orTable = generateTruthTable('or');
      expect(orTable).toHaveLength(4);
      expect(orTable[1]).toEqual({ inputs: [false, true], output: true });

      const notTable = generateTruthTable('NOT');
      expect(notTable).toHaveLength(2);
      expect(notTable[0]).toEqual({ inputs: [false], output: true });
      expect(notTable[1]).toEqual({ inputs: [true], output: false });
    });
  });
  describe('evalGate', () => {
    it('correctly evaluates AND gate truth table', () => {
      expect(evalGate('and', false, false)).toBe(false);
      expect(evalGate('and', false, true)).toBe(false);
      expect(evalGate('and', true, false)).toBe(false);
      expect(evalGate('and', true, true)).toBe(true);
    });

    it('correctly evaluates OR gate truth table', () => {
      expect(evalGate('or', false, false)).toBe(false);
      expect(evalGate('or', false, true)).toBe(true);
      expect(evalGate('or', true, false)).toBe(true);
      expect(evalGate('or', true, true)).toBe(true);
    });

    it('correctly evaluates NOT gate truth table', () => {
      expect(evalGate('not', false)).toBe(true);
      expect(evalGate('not', true)).toBe(false);
    });
  });

  describe('getGateInputs', () => {
    it('returns 4 combinations for binary gates and 2 for unary NOT', () => {
      expect(getGateInputs('and')).toHaveLength(4);
      expect(getGateInputs('or')).toHaveLength(4);
      expect(getGateInputs('not')).toHaveLength(2);
    });
  });

  describe('getMarbleRoute', () => {
    it('maps AND routes accurately to physical doors and basins', () => {
      expect(getMarbleRoute('and', false, false)).toEqual(['A', 'no']);
      expect(getMarbleRoute('and', false, true)).toEqual(['A', 'no']);
      expect(getMarbleRoute('and', true, false)).toEqual(['A', 'B', 'no']);
      expect(getMarbleRoute('and', true, true)).toEqual(['A', 'B', 'yes']);
    });

    it('maps OR routes accurately to physical doors and basins', () => {
      expect(getMarbleRoute('or', true, false)).toEqual(['A', 'yes']);
      expect(getMarbleRoute('or', false, true)).toEqual(['A', 'B', 'yes']);
      expect(getMarbleRoute('or', false, false)).toEqual(['A', 'B', 'no']);
    });

    it('maps NOT routes accurately to physical door A and basins', () => {
      expect(getMarbleRoute('not', true)).toEqual(['A', 'no']);
      expect(getMarbleRoute('not', false)).toEqual(['A', 'yes']);
    });
  });

  describe('isTableComplete', () => {
    it('detects incomplete vs complete truth table records', () => {
      const records: Record<string, boolean> = {};
      expect(isTableComplete('not', records)).toBe(false);

      records[getRowKey('not', false)] = true;
      expect(isTableComplete('not', records)).toBe(false);

      records[getRowKey('not', true)] = false;
      expect(isTableComplete('not', records)).toBe(true);
    });
  });
});
