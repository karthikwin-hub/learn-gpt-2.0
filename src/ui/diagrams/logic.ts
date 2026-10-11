/**
 * Bodha diagram generators for Logic knots (L1–L4).
 * Marble run cross-sections, logic gates, quantifiers, and implication dominos.
 */

import { t } from '../../domain/i18n/core';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from './fig';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const LEAF = 'var(--leaf)';
const INK_SOFT = 'var(--ink-soft)';

/**
 * L1: True/False and Negation inverter.
 */
export function renderL1Negation(): SVGSVGElement {
  const s = figSvg(360, 160, 'Negation: NOT');
  // Input node
  s.appendChild(figCircle(80, 80, 16, { fill: 'var(--paper-raised)', stroke: IND, sw: 2 }));
  s.appendChild(figText(80, 80, 'A', { color: IND }));
  // Line to NOT inverter triangle
  s.appendChild(figLine(96, 80, 160, 80, { stroke: 'var(--ink)', sw: 3 }));
  // Inverter triangle
  s.appendChild(
    figPath('M160 50 L220 80 L160 110 Z', {
      fill: 'var(--paper-sunk)',
      stroke: 'var(--ink)',
      sw: 2.5,
    })
  );
  // Bubble
  s.appendChild(figCircle(226, 80, 6, { fill: 'none', stroke: 'var(--ink)', sw: 2 }));
  // Output line and node
  s.appendChild(figLine(232, 80, 280, 80, { stroke: 'var(--ink)', sw: 3 }));
  s.appendChild(figCircle(296, 80, 16, { fill: 'var(--paper-raised)', stroke: LEAF, sw: 2 }));
  s.appendChild(figText(296, 80, 'NOT A', { size: 10, color: LEAF }));
  return s;
}

/**
 * L2: Marble Gate cross section (AND / OR).
 */
export function renderL2Gate(step: number, type: 'and' | 'or' = 'and'): SVGSVGElement {
  const title = type === 'and' ? t('gate.and') : t('gate.or');
  const s = figSvg(360, 190, `Marble Gate: ${title}`);

  // Hopper at top
  s.appendChild(figPath('M158 10 L180 30 L202 10', { fill: 'none', stroke: 'var(--ink)', sw: 3 }));
  // Track vertical
  s.appendChild(figLine(180, 30, 180, 65, { stroke: 'var(--hair)', sw: 8 }));

  // Door A node
  s.appendChild(figCircle(180, 75, 18, { fill: 'var(--paper-raised)', stroke: IND, sw: 2 }));
  s.appendChild(figText(150, 75, 'A', { color: IND }));
  // Door A opening lines
  s.appendChild(figLine(166, 65, 166, 85, { stroke: IND, sw: 4 }));
  s.appendChild(figLine(194, 65, 194, 85, { stroke: IND, sw: 4 }));

  if (type === 'and') {
    // Track from A to B
    s.appendChild(figLine(180, 93, 180, 122, { stroke: 'var(--hair)', sw: 8 }));
    // Door B node
    s.appendChild(figCircle(180, 132, 18, { fill: 'var(--paper-raised)', stroke: TEAL, sw: 2 }));
    s.appendChild(figText(150, 132, 'B', { color: TEAL }));
    s.appendChild(figLine(166, 122, 166, 142, { stroke: TEAL, sw: 4 }));
    s.appendChild(figLine(194, 122, 194, 142, { stroke: TEAL, sw: 4 }));

    // Basin YES (bottom left) and NO (bottom right)
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

    // Route lines to basins
    s.appendChild(figLine(180, 150, 92, 160, { stroke: 'var(--hair)', sw: 6 }));
    s.appendChild(figLine(198, 75, 268, 160, { stroke: 'var(--hair)', sw: 6 }));

    // Animated/Step marble:
    if (step === 0) {
      s.appendChild(figCircle(180, 20, 8, { fill: 'var(--ink)' }));
    } else if (step === 1) {
      s.appendChild(figCircle(180, 105, 8, { fill: 'var(--ink)' }));
    } else {
      s.appendChild(figCircle(92, 168, 8, { fill: 'var(--ink)' }));
    }
  } else {
    // OR gate branch
    s.appendChild(figLine(180, 93, 110, 150, { stroke: 'var(--hair)', sw: 8 }));
    s.appendChild(figLine(198, 75, 250, 105, { stroke: 'var(--hair)', sw: 8 }));

    s.appendChild(figCircle(250, 115, 18, { fill: 'var(--paper-raised)', stroke: TEAL, sw: 2 }));
    s.appendChild(figText(280, 115, 'B', { color: TEAL }));

    // Basins
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

/**
 * L3: All vs Some visual quantifiers.
 */
export function renderL3Quantifiers(): SVGSVGElement {
  const s = figSvg(360, 160, 'Quantifiers: All vs Some');
  // Left: ALL (ring with all items colored)
  s.appendChild(figCircle(100, 80, 56, { fill: 'var(--paper-sunk)', stroke: IND, sw: 2 }));
  s.appendChild(figText(100, 36, 'ALL', { size: 13, color: IND }));
  for (let i = 0; i < 5; i++) {
    const ang = (i * 2 * Math.PI) / 5;
    const px = 100 + Math.cos(ang) * 28;
    const py = 85 + Math.sin(ang) * 28;
    s.appendChild(figCircle(px, py, 6, { fill: LEAF }));
  }

  // Right: SOME (ring with only some items colored)
  s.appendChild(figCircle(260, 80, 56, { fill: 'var(--paper-sunk)', stroke: TEAL, sw: 2 }));
  s.appendChild(figText(260, 36, 'SOME', { size: 13, color: TEAL }));
  for (let i = 0; i < 5; i++) {
    const ang = (i * 2 * Math.PI) / 5;
    const px = 260 + Math.cos(ang) * 28;
    const py = 85 + Math.sin(ang) * 28;
    s.appendChild(figCircle(px, py, 6, { fill: i < 2 ? LEAF : 'var(--ghost)' }));
  }
  return s;
}

/**
 * L4: Implication (If P then Q domino chain).
 */
export function renderL4Implication(): SVGSVGElement {
  const s = figSvg(360, 140, 'Implication: If P then Q');
  // Dominos falling to the right
  const dominos = [
    { x: 70, y: 35, rot: 30, label: 'P' },
    { x: 130, y: 45, rot: 45, label: '' },
    { x: 190, y: 55, rot: 55, label: '' },
    { x: 260, y: 70, rot: 70, label: 'Q' },
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
  return s;
}
