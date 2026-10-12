/**
 * Mathematics domain module for Gurukul.
 */

export * from './kolam';
export * from './multiply';
export * from './divide';
export * from './geometry';
export * from './sets';
export * from './logic';
export * from './numbers';
export {
  simplifyFraction,
  areFractionsEquivalent,
  generateStripRows,
  findEquivalentSegments,
  type StripFraction,
  type FractionSegment,
  type FractionStripRow,
} from './fractions';
export * from './money';
export * from './roman';
export {
  partitionSet,
  fractionOfSet,
  addLikeFractions,
  isLikeFractionSum,
  formatFraction,
  type CollectionFraction,
  type SetPartition,
} from './collection';
export * from './decimals';
export * from './regroup';
export * from './estimate';
export * from './quotition';
export * from './longdiv';
export * from './wordprob';
export * from './factors';
export * from './primes';
