/**
 * I1 drawings: a dig through layers of soil, and a shelf of clues sorted by kind.
 */

import { DIG_LAYERS, DUG, layerOf, type ClueId } from '../../../domain/world/sources';
import { t } from '../../../domain/i18n/core';
import { svg } from '../../util/dom';
import { figArrow, figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';

const SOIL = ['#DCC495', '#C9A46A', '#A97F4C', '#87603A'];
const TOP = 44;
const BAND = 40;

/** A small picture of one clue centred on (x, y). */
export function clueIcon(id: ClueId, x: number, y: number): SVGGElement {
  const g = svg('g') as SVGGElement;
  if (id === 'coin') {
    g.appendChild(figCircle(x, y, 11, { fill: 'var(--thread)', stroke: 'var(--ink)', sw: 1.5 }));
    g.appendChild(figCircle(x, y, 6, { stroke: 'var(--ink)', sw: 1 }));
  } else if (id === 'inscription') {
    g.appendChild(
      figRect(x - 18, y - 12, 36, 24, { fill: '#A7A29A', stroke: 'var(--ink)', rx: 2 })
    );
    for (const dy of [-6, 0, 6]) {
      g.appendChild(figLine(x - 12, y + dy, x + 12, y + dy, { stroke: 'var(--ink)', sw: 1.2 }));
    }
  } else if (id === 'pot') {
    g.appendChild(
      figPath(
        `M${x - 6} ${y - 13} L${x + 6} ${y - 13} L${x + 4} ${y - 9} Q${x + 16} ${y - 2} ${x + 9} ${y + 12} L${x - 9} ${y + 12} Q${x - 16} ${y - 2} ${x - 4} ${y - 9} Z`,
        { fill: '#B35C4A', stroke: 'var(--ink)', sw: 1.5 }
      )
    );
    g.appendChild(figPath(`M${x + 2} ${y - 6} l-4 7 l5 4 l-3 6`, { stroke: 'var(--ink)', sw: 1 }));
  } else if (id === 'seal') {
    g.appendChild(
      figRect(x - 12, y - 12, 24, 24, { fill: '#EFE3C6', stroke: 'var(--ink)', rx: 2 })
    );
    g.appendChild(
      figPath(
        `M${x - 7} ${y + 5} q2 -9 9 -8 q5 1 6 6 M${x - 4} ${y + 5} v3 M${x + 5} ${y + 4} v4`,
        {
          stroke: 'var(--ink)',
          sw: 1.2,
        }
      )
    );
    g.appendChild(figLine(x - 7, y - 7, x - 3, y - 7, { stroke: 'var(--ink)', sw: 1.2 }));
    g.appendChild(figLine(x + 1, y - 7, x + 6, y - 7, { stroke: 'var(--ink)', sw: 1.2 }));
  } else if (id === 'manuscript') {
    g.appendChild(figRect(x - 26, y - 7, 52, 14, { fill: '#E3C98A', stroke: 'var(--ink)', rx: 6 }));
    g.appendChild(figCircle(x - 15, y, 2, { fill: 'var(--ink)' }));
    g.appendChild(figLine(x - 8, y - 2, x + 20, y - 2, { stroke: 'var(--ink-soft)', sw: 1 }));
    g.appendChild(figLine(x - 8, y + 2, x + 16, y + 2, { stroke: 'var(--ink-soft)', sw: 1 }));
  } else {
    g.appendChild(
      figRect(x - 13, y - 15, 26, 30, {
        fill: 'var(--indigo-soft)',
        stroke: 'var(--indigo)',
        sw: 2,
      })
    );
    g.appendChild(figLine(x - 8, y - 15, x - 8, y + 15, { stroke: 'var(--indigo)', sw: 2 }));
    g.appendChild(figLine(x - 3, y - 6, x + 8, y - 6, { stroke: 'var(--indigo)', sw: 1 }));
    g.appendChild(figLine(x - 3, y, x + 8, y, { stroke: 'var(--indigo)', sw: 1 }));
  }
  return g;
}

export interface DigOptions {
  /** How many layers have been dug, from the top (0..4). */
  revealed: number;
  /** The finds to show (default: every dug find). */
  finds?: readonly ClueId[];
  /** Show "laid down last / first" beside the layers. */
  ages?: boolean;
  /** Finds already put in order, numbered 1.. beside them. */
  order?: readonly ClueId[];
  highlight?: ClueId | null;
  /** A short note beside a find, in kumkum ("look here"). */
  notes?: Partial<Record<ClueId, string>>;
}

export function renderDig(o: DigOptions): SVGSVGElement {
  const finds = o.finds || DUG;
  const shown = finds.filter((id) => layerOf(id) <= o.revealed);
  const s = figSvg(
    360,
    TOP + DIG_LAYERS * BAND + 16,
    shown.length
      ? t('clues.digArtFinds', { finds: shown.map((id) => t(`clues.c.${id}`)).join(', ') })
      : t('clues.digArt')
  );
  const x0 = o.ages ? 70 : 40;
  s.appendChild(figLine(x0, TOP, x0 + 280, TOP, { stroke: 'var(--leaf)', sw: 3 }));
  for (const x of [20, 80, 160, 230, 270].map((d) => x0 + d)) {
    s.appendChild(
      figPath(`M${x} ${TOP} l-4 -8 M${x} ${TOP} l0 -10 M${x} ${TOP} l4 -8`, {
        stroke: 'var(--leaf)',
        sw: 1.6,
      })
    );
  }
  for (let i = 0; i < DIG_LAYERS; i++) {
    const y = TOP + i * BAND;
    s.appendChild(
      figRect(x0, y, 280, BAND, { fill: SOIL[i], stroke: 'var(--ink-soft)', sw: 0.8, rx: 0 })
    );
    if (i >= o.revealed) {
      s.appendChild(
        figRect(x0, y, 280, BAND, { fill: 'var(--ground)', stroke: 'none', rx: 0, opacity: 0.35 })
      );
    }
    s.appendChild(
      figText(x0 + 14, y + BAND / 2, String(i + 1), { size: 12, color: 'var(--paper)' })
    );
  }
  if (o.revealed > 0) {
    const depth = Math.min(o.revealed, DIG_LAYERS) * BAND;
    s.appendChild(
      figRect(x0 + 40, TOP, 2, depth, { fill: 'var(--ink)', stroke: 'none', rx: 0, opacity: 0.4 })
    );
  }
  for (const id of shown) {
    const y = TOP + (layerOf(id) - 0.5) * BAND;
    const hot = o.highlight === id;
    if (hot) {
      s.appendChild(figCircle(x0 + 80, y, 18, { stroke: 'var(--kumkum)', sw: 2.5 }));
    }
    s.appendChild(clueIcon(id, x0 + 80, y));
    s.appendChild(
      figText(x0 + 108, y, t(`clues.c.${id}`), {
        size: 13,
        anchor: 'start',
        weight: hot ? 700 : 500,
      })
    );
    const n = o.order ? o.order.indexOf(id) : -1;
    if (n >= 0) {
      s.appendChild(figCircle(x0 + 260, y, 11, { fill: 'var(--teal)' }));
      s.appendChild(figText(x0 + 260, y, String(n + 1), { size: 12, color: 'var(--paper)' }));
    }
    const note = o.notes?.[id];
    if (note) {
      s.appendChild(
        figText(x0 + 275, y + 14, note, {
          size: 11,
          anchor: 'end',
          color: 'var(--kumkum)',
          weight: 700,
        })
      );
    }
  }
  if (o.ages) {
    s.appendChild(figArrow(36, TOP + DIG_LAYERS * BAND - 6, 36, TOP + 8, 'var(--indigo)'));
    s.appendChild(figText(36, TOP - 14, t('clues.last'), { size: 11, color: 'var(--indigo)' }));
    s.appendChild(
      figText(36, TOP + DIG_LAYERS * BAND + 10, t('clues.first'), {
        size: 11,
        color: 'var(--indigo)',
      })
    );
  }
  return s;
}

export interface ShelfGroup {
  title?: string;
  ids: readonly ClueId[];
}

/** Clues side by side, in one or two labelled groups. */
export function renderClueShelf(groups: readonly ShelfGroup[]): SVGSVGElement {
  const all = groups.flatMap((g) => g.ids);
  const s = figSvg(360, 170, all.map((id) => t(`clues.c.${id}`)).join(', '));
  const w = 360 / groups.length;
  groups.forEach((g, gi) => {
    const x0 = gi * w;
    if (g.title) {
      s.appendChild(
        figRect(x0 + 6, 6, w - 12, 158, {
          fill: gi === 0 ? 'var(--thread-soft)' : 'var(--indigo-soft)',
          stroke: 'none',
          rx: 12,
        })
      );
      s.appendChild(figText(x0 + w / 2, 24, g.title, { size: 13, weight: 700 }));
    }
    const cols = groups.length === 1 ? 3 : g.ids.length <= 2 ? 1 : 2;
    g.ids.forEach((id, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const cx = x0 + (w / cols) * (c + 0.5);
      const cy = 60 + r * 62;
      s.appendChild(clueIcon(id, cx, cy));
      s.appendChild(figText(cx, cy + 26, t(`clues.c.${id}`), { size: 11, weight: 500 }));
    });
  });
  return s;
}
