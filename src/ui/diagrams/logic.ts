/**
 * Bodha diagram generators for Logic knots L1–L3.
 */

import { t } from '../../domain/i18n/core';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from './fig';
import { getGateInputs, type GateType } from '../../domain/math/logic';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const LEAF = 'var(--leaf)';
const INK_SOFT = 'var(--ink-soft)';

/** L1: universal claim vs one counterexample. */
export function renderL1Counterexample(step: number): SVGSVGElement {
  const s = figSvg(360, 180, t('figure.L1.title'));
  s.appendChild(figText(90, 36, t('figure.L1.examples'), { size: 12, color: IND }));
  [4, 24, 44].forEach((n, i) => {
    s.appendChild(
      figCircle(60 + i * 36, 70, 14, { fill: 'var(--paper-raised)', stroke: LEAF, sw: 2 })
    );
    s.appendChild(figText(60 + i * 36, 70, String(n), { size: 11 }));
  });
  if (step >= 1) {
    s.appendChild(
      figCircle(260, 70, 16, { fill: 'var(--paper-sunk)', stroke: 'var(--kumkum)', sw: 2.5 })
    );
    s.appendChild(figText(260, 70, '14', { size: 12, weight: 700, color: 'var(--kumkum)' }));
    s.appendChild(figText(260, 98, t('figure.L1.remainder'), { size: 10, color: 'var(--kumkum)' }));
  }
  if (step >= 2) {
    s.appendChild(
      figText(180, 145, t('figure.L1.oneDisproves'), { size: 13, color: IND, weight: 600 })
    );
  }
  return s;
}

/** L2: truth table mini-grid (AND / OR / NOT). */
export function renderL2TruthTable(step: number): SVGSVGElement {
  const cols =
    step >= 2
      ? ['A', 'B', t('gate.and'), t('gate.or'), `${t('gate.not')} A`]
      : step >= 1
        ? ['A', t('gate.not')]
        : ['A', 'B', t('gate.and'), t('gate.or')];
  const s = figSvg(360, 30 + 28 * (step >= 1 ? 2 : 4), cols.join(' '));
  const w = 320 / cols.length;
  cols.forEach((c, i) => {
    s.appendChild(figText(20 + w * (i + 0.5), 14, c, { size: 11, color: INK_SOFT }));
  });
  const rows: string[][] =
    step >= 2
      ? [
          [
            t('logic.open'),
            t('logic.shut'),
            step >= 3 ? t('logic.no') : '…',
            step >= 2 ? t('logic.yes') : '…',
            step >= 3 ? t('logic.no') : '…',
          ],
        ]
      : step >= 1
        ? [
            [t('logic.open'), t('logic.no')],
            [t('logic.shut'), t('logic.yes')],
          ]
        : getGateInputs('and').map((inp) => {
            const a = inp[0] ? t('logic.open') : t('logic.shut');
            const b = inp[1] ? t('logic.open') : t('logic.shut');
            const andY = inp[0] && inp[1] ? t('logic.yes') : t('logic.no');
            const orY = inp[0] || inp[1] ? t('logic.yes') : t('logic.no');
            return [a, b, andY, orY];
          });
  rows.forEach((r, j) => {
    r.forEach((v, i) => {
      const yes = v === t('logic.yes');
      s.appendChild(
        figText(20 + w * (i + 0.5), 42 + j * 28, v, {
          size: 12,
          color: yes ? LEAF : v === t('logic.open') ? IND : 'var(--ink)',
        })
      );
    });
  });
  return s;
}

/** L2: Marble Gate cross section (AND / OR). */
export function renderL2Gate(step: number, type: GateType = 'and'): SVGSVGElement {
  const title = type === 'and' ? t('gate.and') : t('gate.or');
  const s = figSvg(360, 190, `${t('figure.L2.gate')}: ${title}`);

  s.appendChild(figPath('M158 10 L180 30 L202 10', { fill: 'none', stroke: 'var(--ink)', sw: 3 }));
  s.appendChild(figLine(180, 30, 180, 65, { stroke: 'var(--hair)', sw: 8 }));

  s.appendChild(figCircle(180, 75, 18, { fill: 'var(--paper-raised)', stroke: IND, sw: 2 }));
  s.appendChild(figText(150, 75, 'A', { color: IND }));
  s.appendChild(figLine(166, 65, 166, 85, { stroke: IND, sw: 4 }));
  s.appendChild(figLine(194, 65, 194, 85, { stroke: IND, sw: 4 }));

  if (type === 'and') {
    s.appendChild(figLine(180, 93, 180, 122, { stroke: 'var(--hair)', sw: 8 }));
    s.appendChild(figCircle(180, 132, 18, { fill: 'var(--paper-raised)', stroke: TEAL, sw: 2 }));
    s.appendChild(figText(150, 132, 'B', { color: TEAL }));
    s.appendChild(figLine(166, 122, 166, 142, { stroke: TEAL, sw: 4 }));
    s.appendChild(figLine(194, 122, 194, 142, { stroke: TEAL, sw: 4 }));

    s.appendChild(
      figPath('M70 160 Q70 182 92 182 Q114 182 114 160', {
        fill: 'var(--paper-sunk)',
        stroke: LEAF,
        sw: 2,
      })
    );
    s.appendChild(figText(92, 172, t('logic.yes'), { size: 12, color: LEAF }));

    s.appendChild(
      figPath('M246 160 Q246 182 268 182 Q290 182 290 160', {
        fill: 'var(--paper-sunk)',
        stroke: INK_SOFT,
        sw: 2,
      })
    );
    s.appendChild(figText(268, 172, t('logic.no'), { size: 12, color: INK_SOFT }));

    s.appendChild(figLine(180, 150, 92, 160, { stroke: 'var(--hair)', sw: 6 }));
    s.appendChild(figLine(198, 75, 268, 160, { stroke: 'var(--hair)', sw: 6 }));

    if (step === 0) {
      s.appendChild(figCircle(180, 20, 8, { fill: 'var(--ink)' }));
    } else if (step === 1) {
      s.appendChild(figCircle(180, 105, 8, { fill: 'var(--ink)' }));
    } else {
      s.appendChild(figCircle(92, 168, 8, { fill: 'var(--ink)' }));
    }
  } else {
    s.appendChild(figLine(180, 93, 110, 150, { stroke: 'var(--hair)', sw: 8 }));
    s.appendChild(figLine(198, 75, 250, 105, { stroke: 'var(--hair)', sw: 8 }));
    s.appendChild(figCircle(250, 115, 18, { fill: 'var(--paper-raised)', stroke: TEAL, sw: 2 }));
    s.appendChild(figText(280, 115, 'B', { color: TEAL }));

    s.appendChild(
      figPath('M90 150 Q90 176 112 176 Q134 176 134 150', {
        fill: 'var(--paper-sunk)',
        stroke: LEAF,
        sw: 2,
      })
    );
    s.appendChild(figText(112, 165, t('logic.yes'), { size: 12, color: LEAF }));

    s.appendChild(
      figPath('M250 150 Q250 176 272 176 Q294 176 294 150', {
        fill: 'var(--paper-sunk)',
        stroke: INK_SOFT,
        sw: 2,
      })
    );
    s.appendChild(figText(272, 165, t('logic.no'), { size: 12, color: INK_SOFT }));

    if (step >= 1) {
      s.appendChild(figCircle(112, 160, 8, { fill: 'var(--ink)' }));
    } else {
      s.appendChild(figCircle(180, 20, 8, { fill: 'var(--ink)' }));
    }
  }

  return s;
}

/** L3: nested subset rings (P ⊆ Q). */
export function renderL3NestedRings(step: number): SVGSVGElement {
  const s = figSvg(360, 200, t('figure.L3.nested'));
  s.appendChild(figCircle(180, 105, 78, { fill: 'var(--paper-sunk)', stroke: TEAL, sw: 2.5 }));
  s.appendChild(figCircle(180, 110, 42, { fill: 'var(--indigo-soft)', stroke: IND, sw: 2.5 }));
  s.appendChild(figText(180, 52, 'Q', { size: 13, color: TEAL }));
  s.appendChild(figText(180, 108, 'P', { size: 13, color: IND }));
  if (step >= 1) {
    s.appendChild(
      figText(260, 130, t('figure.L3.counterCat'), { size: 11, color: 'var(--kumkum)' })
    );
  }
  if (step >= 2) {
    s.appendChild(figText(180, 175, t('figure.L3.forwardOnly'), { size: 12, color: IND }));
  }
  return s;
}

/** L3: implication domino chain P → Q. */
export function renderL3Implication(step: number): SVGSVGElement {
  const s = figSvg(360, 140, t('figure.L3.implication'));
  const dominos = [
    { x: 70, y: 35, rot: 30, label: 'P' },
    { x: 130, y: 45, rot: 45, label: '' },
    { x: 190, y: 55, rot: 55, label: '' },
    { x: 260, y: 70, rot: step >= 2 ? 90 : 70, label: 'Q' },
  ];
  dominos.forEach((d) => {
    const rect = figRect(d.x, d.y, 14, 52, {
      fill: 'var(--paper-raised)',
      stroke: 'var(--ink)',
      sw: 2,
    });
    rect.setAttribute('rx', '3');
    rect.setAttribute('transform', `rotate(${d.rot} ${d.x + 7} ${d.y + 26})`);
    s.appendChild(rect);
    if (d.label) {
      s.appendChild(figText(d.x + 7, d.y - 12, d.label, { size: 14, color: IND }));
    }
  });
  s.appendChild(figLine(30, 125, 330, 125, { stroke: 'var(--ink)', sw: 2 }));
  if (step >= 1) {
    s.appendChild(figText(180, 118, t('figure.L3.ifThen'), { size: 11, color: TEAL }));
  }
  return s;
}

export function renderL1Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 160, t('mistake.L1.intro'));
  s.appendChild(figText(100, 60, '3 × 4 = 12', { size: 14 }));
  if (reveal) {
    s.appendChild(figText(220, 50, '5 × 1 = 5', { size: 13, color: 'var(--kumkum)' }));
    s.appendChild(figText(220, 78, '5 × 0 = 0', { size: 13, color: 'var(--kumkum)' }));
    s.appendChild(
      figText(180, 130, t('figure.L1.mistakeMult'), { size: 12, color: 'var(--kumkum)' })
    );
  }
  return s;
}

export function renderL2Mistake(reveal: boolean): SVGSVGElement {
  const s = renderL2Gate(1, 'or');
  if (reveal) {
    s.appendChild(
      figText(180, 12, t('figure.L2.bothOpen'), { size: 11, color: LEAF, weight: 600 })
    );
  }
  return s;
}

export function renderL3Mistake(reveal: boolean): SVGSVGElement {
  const s = renderL3NestedRings(1);
  if (reveal) {
    s.appendChild(
      figRect(230, 115, 52, 28, {
        rx: 4,
        fill: 'none',
        stroke: 'var(--kumkum)',
        sw: 2.5,
      })
    );
    s.appendChild(
      figText(256, 132, t('figure.L3.rectNotSquare'), { size: 10, color: 'var(--kumkum)' })
    );
  }
  return s;
}

export function renderL1Prashna(): SVGSVGElement {
  const s = figSvg(360, 160, t('prashna.L1.q'));
  s.appendChild(figText(180, 70, '14 ÷ 4', { size: 18, weight: 700 }));
  s.appendChild(figText(180, 98, t('figure.L1.remainder2'), { size: 13, color: 'var(--kumkum)' }));
  return s;
}

export function renderL2Prashna(): SVGSVGElement {
  return renderL2Gate(1, 'and');
}

export function renderL3Prashna(): SVGSVGElement {
  return renderL3NestedRings(0);
}

/** @deprecated Use renderL1Counterexample — kept for grep compatibility. */
export function renderL1Negation(): SVGSVGElement {
  return renderL1Counterexample(0);
}

/** @deprecated Use renderL3NestedRings. */
export function renderL3Quantifiers(): SVGSVGElement {
  return renderL3NestedRings(0);
}

/** @deprecated Use renderL3Implication. */
export function renderL4Implication(): SVGSVGElement {
  return renderL3Implication(0);
}
