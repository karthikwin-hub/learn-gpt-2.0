/**
 * C7 drawing: a schematic peninsula between the Arabian Sea and the Bay of Bengal, with the Western
 * Ghats along the west coast and the land tilting east. Each river is drawn as far as its water has run.
 */

import type { PlateauRiver } from '../../../domain/world/plateau';
import { t } from '../../../domain/i18n/core';
import { renderIndiaInset } from './india-map';
import { figArrow, figLine, figPath, figRect, figSvg, figText } from '../fig';

const SEA = '#BFDDEB';
const LAND = '#E4D3A8';
const GHATS = '#9C7C55';
const WATER = '#2F7FB0';

const PATH: Record<PlateauRiver, string> = {
  narmada: 'M236 40 Q150 36 64 48',
  tapi: 'M206 62 Q140 60 78 70',
  godavari: 'M110 84 Q178 92 248 118',
  krishna: 'M132 116 Q182 126 228 146',
  kaveri: 'M160 152 Q186 166 206 178',
};
const NAME_AT: Record<PlateauRiver, readonly [number, number]> = {
  narmada: [150, 32],
  tapi: [142, 56],
  godavari: [170, 84],
  krishna: [176, 116],
  kaveri: [178, 152],
};

export interface PlateauOptions {
  /** How far each river's water has run, 0 to 1; rivers left out are drawn faint. */
  run?: Partial<Record<PlateauRiver, number>>;
  rain?: boolean;
  /** Show the rift valleys of the west-flowing rivers. */
  rifts?: boolean;
  highlight?: PlateauRiver | null;
}

export function renderPlateau(o: PlateauOptions = {}): SVGSVGElement {
  const run = o.run ?? {};
  const flowing = (Object.keys(PATH) as PlateauRiver[]).filter((r) => (run[r] ?? 0) >= 1);
  const label = flowing.length
    ? flowing.map((r) => t(`plateau.flows.${r}`)).join(' ')
    : t('plateau.map');
  const s = figSvg(360, 210, label);
  s.appendChild(figRect(0, 0, 360, 210, { fill: SEA, stroke: 'none', rx: 12 }));
  s.appendChild(
    figPath('M30 10 L334 10 Q300 90 186 204 L180 204 Q90 110 30 10 Z', {
      fill: LAND,
      stroke: 'var(--ink-soft)',
      sw: 1,
    })
  );
  s.appendChild(figPath('M56 20 Q118 112 184 194', { stroke: GHATS, sw: 6, dash: '3 3' }));
  if (o.rifts) {
    for (const r of ['narmada', 'tapi'] as const) {
      s.appendChild(figPath(PATH[r], { stroke: GHATS, sw: 14, opacity: 0.35 }));
    }
  }
  s.appendChild(figText(66, 23, t('plateau.high'), { size: 10, weight: 700, anchor: 'start' }));
  s.appendChild(figText(306, 22, t('plateau.low'), { size: 10, weight: 700, anchor: 'end' }));
  s.appendChild(figArrow(120, 19, 250, 19));
  s.appendChild(figText(56, 170, t('plateau.sea.arabian'), { size: 11, weight: 700 }));
  s.appendChild(figText(262, 176, t('plateau.sea.bengal'), { size: 11, weight: 700 }));
  s.appendChild(renderIndiaInset({ zones: ['deccan'] }, 308, 150, 44));
  if (o.rain) {
    for (let i = 0; i < 6; i++) {
      const x = 48 + i * 22;
      const y = 30 + i * 30;
      s.appendChild(figLine(x + 10, y - 8, x + 6, y, { stroke: WATER, sw: 2 }));
    }
  }
  for (const r of Object.keys(PATH) as PlateauRiver[]) {
    const p = Math.max(0, Math.min(1, run[r] ?? 0));
    const hit = o.highlight === r;
    s.appendChild(figPath(PATH[r], { stroke: WATER, sw: 1, dash: '2 3', opacity: 0.6 }));
    if (p > 0) {
      const line = figPath(PATH[r], { stroke: WATER, sw: hit ? 4 : 3 });
      line.setAttribute('pathLength', '1');
      line.setAttribute('stroke-dasharray', `${p} 1`);
      s.appendChild(line);
    }
    const [x, y] = NAME_AT[r];
    s.appendChild(
      figText(x, y, t(`plateau.r.${r}`), {
        size: 10,
        weight: 700,
        color: hit ? 'var(--kumkum)' : 'var(--ink)',
      })
    );
  }
  return s;
}
