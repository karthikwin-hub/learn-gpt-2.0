/**
 * Q2 drawings: a public park with and without care, and rights paired with their responsibilities.
 */

import { dutyFor, type Right } from '../../../domain/world/citizenship';
import { t } from '../../../domain/i18n/core';
import { svg } from '../../util/dom';
import { figArrow, figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';

const FLOWERS = ['var(--thread)', 'var(--indigo)', 'var(--teal)', 'var(--thread)', 'var(--indigo)'];

/** One park scene drawn in a 170 x 130 box, placed at (x, y) and scaled by `s`. */
function park(x: number, y: number, s: number, cared: boolean, hot: boolean): SVGGElement {
  const g = svg('g') as SVGGElement;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
  g.appendChild(figRect(0, 0, 170, 130, { fill: 'var(--teal-soft)', stroke: 'none', rx: 10 }));
  g.appendChild(figRect(0, 72, 170, 58, { fill: 'var(--leaf-soft)', stroke: 'none', rx: 0 }));
  g.appendChild(figRect(22, 52, 8, 30, { fill: '#8A6A4A', stroke: 'none', rx: 1 }));
  g.appendChild(figCircle(26, 40, 20, { fill: 'var(--leaf)', stroke: 'none' }));
  g.appendChild(
    figPath('M62 98 Q90 84 118 98 Q90 110 62 98 Z', { fill: '#8A6A4A', stroke: 'none' })
  );
  FLOWERS.forEach((c, i) => {
    const fx = 70 + i * 10;
    const top = cared ? 82 : 92;
    g.appendChild(figLine(fx, 98, fx, top, { stroke: 'var(--leaf)', sw: 1.5 }));
    if (cared) g.appendChild(figCircle(fx, top, 4, { fill: c, stroke: 'none' }));
  });
  if (hot) {
    g.appendChild(
      figPath('M56 98 Q90 70 124 98 Q90 118 56 98 Z', {
        fill: 'none',
        stroke: 'var(--kumkum)',
        sw: 2.5,
      })
    );
  }
  g.appendChild(figRect(128, 88, 34, 5, { fill: '#8A6A4A', stroke: 'none', rx: 1 }));
  g.appendChild(figLine(132, 93, 132, 104, { stroke: 'var(--ink-soft)', sw: 2 }));
  g.appendChild(figLine(158, 93, 158, 104, { stroke: 'var(--ink-soft)', sw: 2 }));
  if (cared) {
    g.appendChild(figRect(128, 78, 34, 5, { fill: '#8A6A4A', stroke: 'none', rx: 1 }));
  } else {
    g.appendChild(figLine(128, 84, 150, 74, { stroke: '#8A6A4A', sw: 5 }));
  }
  g.appendChild(figRect(40, 96, 12, 16, { fill: 'var(--ink-soft)', stroke: 'none', rx: 2 }));
  if (!cared) {
    for (const [lx, ly, r] of [
      [14, 118, 20],
      [60, 120, -15],
      [100, 116, 30],
      [124, 122, 0],
      [150, 114, -30],
    ] as const) {
      const bit = figRect(lx, ly, 8, 5, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)' });
      bit.setAttribute('transform', `rotate(${r} ${lx + 4} ${ly + 2})`);
      g.appendChild(bit);
    }
  }
  return g;
}

/** One park, full width. `hot` rings the flower bed. */
export function renderPark(cared: boolean, hot = false): SVGSVGElement {
  const s = figSvg(360, 220, t(cared ? 'citizen.parkCared' : 'citizen.parkUncared'));
  s.appendChild(park(44, 6, 1.6, cared, hot));
  return s;
}

/** The cared-for park beside the uncared-for one; `shown` is how many of the two are drawn. */
export function renderParks(shown = 2): SVGSVGElement {
  const panels = (
    [
      [true, t('citizen.n.cared')],
      [false, t('citizen.n.uncared')],
    ] as const
  ).slice(0, shown);
  const s = figSvg(
    360,
    168,
    panels.length ? panels.map(([, name]) => name).join(', ') : t('citizen.art')
  );
  panels.forEach(([cared, name], i) => {
    const x = 8 + i * 176;
    s.appendChild(park(x, 6, 1, cared, false));
    s.appendChild(figText(x + 85, 154, name, { size: 12, weight: 700 }));
  });
  return s;
}

/** Rights in the order given, each with its responsibility beneath. */
export function renderPairs(rights: readonly Right[], highlight?: Right | null): SVGSVGElement {
  const label = rights.length
    ? rights.map((r) => `${t(`citizen.right.${r}`)}: ${t(`citizen.duty.${dutyFor(r)}`)}`).join('; ')
    : t('citizen.pairsArt');
  const s = figSvg(360, 212, label);
  for (let i = 0; i < 4; i++) {
    const y = 6 + i * 51;
    const r = rights[i];
    const hot = r !== undefined && r === highlight;
    s.appendChild(
      figRect(8, y, 344, 45, {
        fill: r ? 'var(--paper-raised)' : 'var(--paper-sunk)',
        stroke: hot ? 'var(--kumkum)' : 'var(--hair)',
        sw: hot ? 2.5 : 1,
        rx: 10,
      })
    );
    if (!r) continue;
    s.appendChild(
      figText(20, y + 17, t(`citizen.right.${r}`), { size: 13, anchor: 'start', weight: 700 })
    );
    s.appendChild(figArrow(22, y + 33, 36, y + 33, 'var(--teal)'));
    s.appendChild(
      figText(42, y + 35, t(`citizen.duty.${dutyFor(r)}`), {
        size: 12,
        anchor: 'start',
        weight: 500,
        color: 'var(--ink-soft)',
      })
    );
  }
  return s;
}
