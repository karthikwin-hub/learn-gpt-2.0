/**
 * Bodha and mistake diagram generators for Sets knots S1–S3.
 */

import { t } from '../../domain/i18n/core';
import { figCircle, figPath, figRect, figSvg, figText } from './fig';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const LEAF = 'var(--leaf)';

function vennPair(title: string): SVGSVGElement {
  const s = figSvg(360, 200, title);
  s.appendChild(figCircle(140, 100, 74, { fill: 'var(--indigo-soft)', stroke: IND, sw: 2.5 }));
  s.appendChild(figCircle(220, 100, 74, { fill: 'var(--teal-soft)', stroke: TEAL, sw: 2.5 }));
  return s;
}

/** S1: single membership ring with optional step (square in, then triangle/circle out). */
export function renderS1SingleRing(step: number): SVGSVGElement {
  const s = figSvg(360, 200, t('figure.S1.ringTitle'));
  s.appendChild(
    figRect(20, 30, 320, 150, {
      rx: 12,
      fill: 'var(--paper-sunk)',
      stroke: 'var(--thread-soft)',
      sw: 1.5,
    })
  );
  s.appendChild(
    figCircle(180, 105, 62, {
      fill: 'rgba(37, 99, 235, 0.08)',
      stroke: IND,
      sw: 3,
    })
  );
  s.appendChild(figText(180, 52, t('figure.S1.inside'), { size: 12, color: IND }));
  if (step >= 0) {
    s.appendChild(
      figRect(168, 88, 24, 24, { fill: '#E2B93B', stroke: 'var(--ink)', sw: 1, rx: 2 })
    );
  }
  if (step >= 1) {
    s.appendChild(
      figPath('M70 150 L 86 122 L 102 150 Z', { fill: TEAL, stroke: 'var(--ink)', sw: 1 })
    );
    s.appendChild(figText(86, 168, '3', { size: 11, color: 'var(--ink-soft)' }));
  }
  if (step >= 2) {
    s.appendChild(figCircle(290, 140, 14, { fill: 'none', stroke: 'var(--ink)', sw: 2 }));
    s.appendChild(figText(290, 168, '0', { size: 11, color: 'var(--ink-soft)' }));
  }
  return s;
}

/** S2 (spec 040): multiples of 2 and 3 — numbers in Venn regions. */
export function renderS2Multiples(step: number, labels: boolean): SVGSVGElement {
  const s = vennPair(t('figure.S2.multiplesTitle'));
  s.appendChild(figText(88, 22, `A: ${t('figure.S2.mult2')}`, { color: IND, size: 12 }));
  s.appendChild(figText(248, 22, `B: ${t('figure.S2.mult3')}`, { color: TEAL, size: 12 }));
  if (labels) {
    s.appendChild(figText(180, 132, t('sets.wAnd'), { size: 12, color: LEAF }));
    s.appendChild(
      figText(28, 186, t('sets.wNot'), {
        size: 11,
        color: 'var(--ink-soft)',
        anchor: 'start',
      })
    );
  }
  s.appendChild(figText(95, 95, '4', { size: 16, weight: 700, color: IND }));
  if (step >= 1) {
    s.appendChild(figText(265, 95, '9', { size: 16, weight: 700, color: TEAL }));
  }
  if (step >= 2) {
    s.appendChild(figText(172, 98, '6', { size: 15, weight: 700 }));
  }
  if (step >= 3) {
    s.appendChild(figText(188, 112, '12', { size: 15, weight: 700, color: LEAF }));
  }
  return s;
}

/** S3 / legacy blocks: two attribute rings (yellow × circle). */
export function renderS2Rings(step: number, labels: boolean): SVGSVGElement {
  const s = vennPair(`${t('rule.yellow')}, ${t('rule.circle')}`);
  s.appendChild(figText(96, 18, `A: ${t('rule.yellow')}`, { color: IND }));
  s.appendChild(figText(266, 18, `B: ${t('rule.circle')}`, { color: TEAL }));
  s.appendChild(figCircle(180, 100, 11, { fill: '#E2B93B', stroke: 'var(--ink)', sw: 1 }));
  if (labels) {
    s.appendChild(figText(180, 130, t('sets.wAnd'), { size: 12, color: LEAF }));
    s.appendChild(
      figText(40, 186, t('sets.wNot'), {
        size: 12,
        color: 'var(--ink-soft)',
        anchor: 'start',
      })
    );
  }
  if (step >= 1) {
    s.appendChild(figCircle(250, 90, 11, { fill: '#4E8A3E', stroke: 'var(--ink)', sw: 1 }));
  }
  if (step >= 2) {
    s.appendChild(figRect(98, 82, 22, 22, { fill: '#E2B93B', stroke: 'var(--ink)', sw: 1, rx: 1 }));
  }
  if (step >= 3) {
    s.appendChild(
      figPath('M320 178 L 334 154 L 348 178 Z', {
        fill: 'var(--ink)',
        stroke: 'var(--ink)',
        sw: 1,
      })
    );
  }
  return s;
}

/** S3 guess: red shapes inside ring A (hypothesis testing). */
export function renderS3Guess(step: number): SVGSVGElement {
  const s = vennPair(t('figure.S3.guessTitle'));
  s.appendChild(figText(100, 20, 'A', { color: IND, size: 13, weight: 700 }));
  s.appendChild(figText(260, 20, 'B', { color: TEAL, size: 13, weight: 700 }));
  const red = '#c0392b';
  if (step >= 0) {
    s.appendChild(
      figPath('M118 88 L 132 62 L 146 88 Z', { fill: red, stroke: 'var(--ink)', sw: 1 })
    );
  }
  if (step >= 1) {
    s.appendChild(figRect(168, 78, 20, 20, { fill: red, stroke: 'var(--ink)', sw: 1, rx: 1 }));
    s.appendChild(figText(178, 130, t('figure.S3.hypothesisRed'), { size: 11, color: IND }));
  }
  if (step >= 2) {
    s.appendChild(
      figPath('M208 92 L 220 72 L 232 92 L 220 98 Z', { fill: red, stroke: 'var(--ink)', sw: 1 })
    );
    s.appendChild(figText(180, 168, t('figure.S3.confirmed'), { size: 12, color: LEAF }));
  }
  return s;
}

export function renderS1Mistake(reveal: boolean): SVGSVGElement {
  const s = renderS1SingleRing(0);
  if (reveal) {
    s.appendChild(figCircle(168, 175, 18, { fill: 'none', stroke: 'var(--kumkum)', sw: 3 }));
    s.appendChild(figText(168, 175, '15', { size: 14, weight: 700, color: 'var(--kumkum)' }));
    s.appendChild(
      figText(180, 192, t('figure.S1.mistake15'), { size: 11, color: 'var(--kumkum)' })
    );
  }
  return s;
}

export function renderS2Mistake(reveal: boolean): SVGSVGElement {
  const s = renderS2Multiples(3, true);
  if (reveal) {
    s.appendChild(figCircle(180, 100, 22, { fill: 'none', stroke: 'var(--kumkum)', sw: 3 }));
    s.appendChild(figText(180, 100, '12', { size: 16, weight: 700, color: 'var(--kumkum)' }));
  } else {
    s.appendChild(figText(110, 95, '12', { size: 16, color: 'var(--ink-soft)' }));
  }
  return s;
}

export function renderS3Mistake(reveal: boolean): SVGSVGElement {
  const s = renderS2Rings(1, false);
  if (reveal) {
    s.appendChild(figCircle(250, 90, 20, { fill: 'none', stroke: 'var(--kumkum)', sw: 3 }));
    s.appendChild(
      figText(250, 118, t('figure.S3.notTriangles'), { size: 10, color: 'var(--kumkum)' })
    );
  }
  return s;
}

export function renderS1Prashna(): SVGSVGElement {
  const s = figSvg(360, 180, t('prashna.S1.q'));
  s.appendChild(figCircle(180, 90, 55, { fill: 'rgba(37, 99, 235, 0.06)', stroke: IND, sw: 2.5 }));
  s.appendChild(figText(180, 90, '5', { size: 14, color: IND }));
  s.appendChild(figText(280, 130, '34', { size: 22, weight: 700, color: 'var(--kumkum)' }));
  s.appendChild(figText(280, 152, t('figure.S1.outside'), { size: 11, color: 'var(--ink-soft)' }));
  return s;
}

export function renderS2Prashna(): SVGSVGElement {
  const s = vennPair(t('prashna.S2.q'));
  s.appendChild(figCircle(180, 100, 14, { fill: '#c0392b', stroke: 'var(--ink)', sw: 1.5 }));
  s.appendChild(figText(180, 128, t('figure.S2.redRound'), { size: 11, color: LEAF }));
  return s;
}

export function renderS3Prashna(): SVGSVGElement {
  const s = renderS2Rings(0, true);
  s.appendChild(figText(180, 168, '?', { size: 18, weight: 700, color: 'var(--ink-soft)' }));
  return s;
}
