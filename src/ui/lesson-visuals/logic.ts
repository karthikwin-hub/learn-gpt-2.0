/**
 * Pictures for Ganita sets & logic knots S1 S2 S3 L1 L2 L3.
 */

import { t } from '../../domain/i18n/core';
import { figRect, figSvg, figText } from '../diagrams/fig';
import {
  renderL1Counterexample,
  renderL1Mistake,
  renderL1Prashna,
  renderL2Gate,
  renderL2Mistake,
  renderL2Prashna,
  renderL2TruthTable,
  renderL3Implication,
  renderL3Mistake,
  renderL3NestedRings,
  renderL3Prashna,
} from '../diagrams/logic';
import {
  renderS1Mistake,
  renderS1Prashna,
  renderS1SingleRing,
  renderS2Mistake,
  renderS2Multiples,
  renderS2Prashna,
  renderS2Rings,
  renderS3Guess,
  renderS3Mistake,
  renderS3Prashna,
} from '../diagrams/sets';
import type { CardKey, LessonVisuals, VisualsTable } from './types';

const CARD_KEYS: CardKey[] = ['what', 'idea', 'why', 'example', 'where'];

function slateWhere(s: SVGSVGElement, captionKey: string): void {
  s.appendChild(
    figRect(8, 8, 344, 184, {
      rx: 10,
      fill: 'var(--paper-sunk)',
      stroke: 'var(--thread-soft)',
      sw: 2,
    })
  );
  s.appendChild(
    figText(180, 100, t(captionKey), { size: 13, color: 'var(--ink-soft)', anchor: 'middle' })
  );
}

function s1Cards(card: CardKey, step: number): SVGSVGElement {
  if (card === 'what' || card === 'idea') return renderS1SingleRing(0);
  if (card === 'why') {
    const s = figSvg(360, 200, t('bodha.S1.why'));
    s.appendChild(figText(180, 90, t('figure.S1.noBetween'), { size: 14, color: 'var(--indigo)' }));
    return s;
  }
  if (card === 'example') return renderS1SingleRing(Math.min(step, 2));
  const s = figSvg(360, 200, t('bodha.S1.where'));
  slateWhere(s, 'figure.S1.whereCaption');
  return s;
}

function s2Cards(card: CardKey, step: number): SVGSVGElement {
  if (card === 'what') return renderS2Rings(0, false);
  if (card === 'idea') return renderS2Multiples(0, true);
  if (card === 'why') return renderS2Rings(0, true);
  if (card === 'example') return renderS2Multiples(Math.min(step + 1, 3), false);
  const s = figSvg(360, 200, t('bodha.S2.where'));
  slateWhere(s, 'figure.S2.whereCaption');
  return s;
}

function s3Cards(card: CardKey, step: number): SVGSVGElement {
  if (card === 'what' || card === 'idea') return renderS3Guess(0);
  if (card === 'why') return renderS2Rings(0, true);
  if (card === 'example') return renderS3Guess(Math.min(step, 2));
  const s = figSvg(360, 200, t('bodha.S3.where'));
  slateWhere(s, 'figure.S3.whereCaption');
  return s;
}

function l1Cards(card: CardKey, step: number): SVGSVGElement {
  if (card === 'what' || card === 'idea' || card === 'why') {
    return renderL1Counterexample(card === 'why' ? 2 : card === 'idea' ? 1 : 0);
  }
  if (card === 'example') return renderL1Counterexample(Math.min(step + 1, 2));
  const s = figSvg(360, 200, t('bodha.L1.where'));
  slateWhere(s, 'figure.L1.whereCaption');
  return s;
}

function l2Cards(card: CardKey, step: number): SVGSVGElement {
  if (card === 'what') return renderL2Gate(0, 'and');
  if (card === 'idea') return renderL2Gate(2, 'and');
  if (card === 'why') return renderL2Gate(0, 'or');
  if (card === 'example') return renderL2TruthTable(Math.min(step + 1, 3));
  const s = figSvg(360, 200, t('bodha.L2.where'));
  slateWhere(s, 'figure.L2.whereCaption');
  return s;
}

function l3Cards(card: CardKey, step: number): SVGSVGElement {
  if (card === 'what' || card === 'idea') return renderL3NestedRings(step >= 1 ? 1 : 0);
  if (card === 'why') return renderL3NestedRings(2);
  if (card === 'example') {
    return step >= 2 ? renderL3Implication(2) : renderL3Implication(step);
  }
  const s = figSvg(360, 200, t('bodha.L3.where'));
  slateWhere(s, 'figure.L3.whereCaption');
  return s;
}

function withCards(fn: (card: CardKey, step: number) => SVGSVGElement): LessonVisuals['cards'] {
  const cards: LessonVisuals['cards'] = {};
  for (const key of CARD_KEYS) {
    cards[key] = (step: number) => fn(key, step);
  }
  return cards;
}

export const LOGIC: VisualsTable = {
  S1: {
    prashna: renderS1Prashna,
    cards: withCards(s1Cards),
    mistake: renderS1Mistake,
  },
  S2: {
    prashna: renderS2Prashna,
    cards: withCards(s2Cards),
    mistake: renderS2Mistake,
  },
  S3: {
    prashna: renderS3Prashna,
    cards: withCards(s3Cards),
    mistake: renderS3Mistake,
  },
  L1: {
    prashna: renderL1Prashna,
    cards: withCards(l1Cards),
    mistake: renderL1Mistake,
  },
  L2: {
    prashna: renderL2Prashna,
    cards: withCards(l2Cards),
    mistake: renderL2Mistake,
  },
  L3: {
    prashna: renderL3Prashna,
    cards: withCards(l3Cards),
    mistake: renderL3Mistake,
  },
};
