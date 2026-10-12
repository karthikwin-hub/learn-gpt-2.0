import { describe, it, expect } from 'vitest';
import {
  evaluateConditional,
  isConverseValid,
  testImplicationSubset,
  findConverseCounterexamples,
  getConditionalStatement,
  PRESET_CONDITIONALS,
} from './conditional';

describe('domain/math/conditional: Implication and Converse Fallacy', () => {
  describe('evaluateConditional', () => {
    it('evaluates truth table for material conditional P -> Q', () => {
      expect(evaluateConditional(true, true)).toBe(true);
      expect(evaluateConditional(true, false)).toBe(false);
      expect(evaluateConditional(false, true)).toBe(true);
      expect(evaluateConditional(false, false)).toBe(true);
    });
  });

  describe('isConverseValid', () => {
    it('detects converse fallacy when items satisfy Q without P', () => {
      const animalItems = [
        { name: 'Dog', p: true, q: true },
        { name: 'Cat', p: false, q: true },
        { name: 'Bird', p: false, q: false },
      ];
      expect(isConverseValid(animalItems)).toBe(false);
    });

    it('validates biconditional where Q always implies P', () => {
      const numbersEndingIn0 = [
        { name: '10', p: true, q: true },
        { name: '20', p: true, q: true },
        { name: '25', p: false, q: false },
      ];
      expect(isConverseValid(numbersEndingIn0)).toBe(true);
    });
  });

  describe('testImplicationSubset', () => {
    it('validates subset containment P ⊆ Q', () => {
      const dogs = ['Labrador', 'Beagle'];
      const fourLegged = ['Labrador', 'Beagle', 'Cat', 'Cow'];
      expect(testImplicationSubset(dogs, fourLegged)).toBe(true);
    });

    it('rejects when premise elements exist outside conclusion set', () => {
      const birds = ['Parrot', 'Penguin'];
      const fourLegged = ['Cat', 'Cow', 'Dog'];
      expect(testImplicationSubset(birds, fourLegged)).toBe(false);
    });
  });

  describe('PRESET_CONDITIONALS & getConditionalStatement', () => {
    it('loads all preset statements and retrieves by id', () => {
      expect(PRESET_CONDITIONALS).toHaveLength(4);
      const dogsStmt = getConditionalStatement('dogs-legs');
      expect(dogsStmt.converseTrue).toBe(false);
      expect(dogsStmt.counterexamples).toContain('Cat');

      const squaresStmt = getConditionalStatement('squares-4sides');
      expect(squaresStmt.converseTrue).toBe(false);
      expect(findConverseCounterexamples(squaresStmt)).toContain('Rectangle');

      const div10Stmt = getConditionalStatement('div-10-ends-0');
      expect(div10Stmt.converseTrue).toBe(true);
      expect(findConverseCounterexamples(div10Stmt)).toHaveLength(0);
    });

    it('throws error for unknown statement ID', () => {
      expect(() => getConditionalStatement('unknown-id')).toThrowError(/Unknown conditional/);
    });
  });
});
