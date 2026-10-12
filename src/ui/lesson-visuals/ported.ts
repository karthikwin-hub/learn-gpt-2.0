/**
 * Pictures for lessons ported from the prototype (046 remediation, ported group).
 */

import { t } from '../../domain/i18n/core';
import { formatIndianNumeral } from '../../domain/math/numbers';
import { formatRupees } from '../../domain/math/money';
import { lcm } from '../../domain/math/multiply';
import { DIGESTIVE_TRACT_ORDER, type OrganId } from '../../domain/science/digest';
import { rollDistance, type SurfaceId } from '../../domain/science/ramp';
import { shadowLength, shadowDarkness, STICK_HEIGHT } from '../../domain/science/shadow';
import { hourAt, isDay, northernSeason } from '../../domain/world/earth';
import { COURTYARD, walk } from '../../domain/world/map';
import { EVENTS } from '../../domain/world/timeline';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../diagrams/fig';
import { renderG2Ropes, renderG4Flower } from '../diagrams/geometry';
import { renderM5Beats } from '../diagrams/drums';
import { renderFairSharePlates } from '../diagrams/share';
import { renderM2Tiles, renderM4MistakeRooms, renderM4Rooms } from '../diagrams/tiles';
import { svg as createSvg } from '../util/dom';
import type { CardKey, LessonVisuals, VisualsTable } from './types';

const PLACE_IDS = [
  'ones',
  'tens',
  'hundreds',
  'thousands',
  'tenThousands',
  'lakhs',
  'tenLakhs',
  'crores',
] as const;

function digitsOf(n: number, places = 7): number[] {
  let x = Math.max(0, Math.floor(n));
  const out: number[] = [];
  for (let i = 0; i < places; i++) {
    out.push(x % 10);
    x = Math.floor(x / 10);
  }
  return out;
}

function fromDigits(d: readonly number[]): number {
  return d.reduce((sum, v, i) => sum + v * 10 ** i, 0);
}

function addOneDigits(d: readonly number[]): { digits: number[]; bundled: number[] } {
  const next = [...d];
  const bundled: number[] = [];
  let i = 0;
  next[i] = (next[i] ?? 0) + 1;
  while ((next[i] ?? 0) === 10 && i < next.length - 1) {
    next[i] = 0;
    next[i + 1] = (next[i + 1] ?? 0) + 1;
    bundled.push(i);
    i += 1;
  }
  return { digits: next, bundled };
}

function groupInternational(n: number): string {
  return String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function figArrow(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = 'var(--ink)'
): SVGGElement {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 8;
  const g = createSvg('g') as SVGGElement;
  g.appendChild(figLine(x1, y1, x2, y2, { stroke: color, sw: 2.2 }));
  g.appendChild(
    figPath(
      `M${x2 - h * Math.cos(a - 0.45)} ${y2 - h * Math.sin(a - 0.45)} L${x2} ${y2} L${x2 - h * Math.cos(a + 0.45)} ${y2 - h * Math.sin(a + 0.45)}`,
      { stroke: color, sw: 2.2 }
    )
  );
  return g;
}

function twoLines(top: string, bottom: string, label?: string): SVGSVGElement {
  const s = figSvg(360, 90, label || `${top}, ${bottom}`);
  s.appendChild(figText(180, 28, top, { size: 22, color: 'var(--indigo)' }));
  s.appendChild(figText(180, 66, bottom, { size: 22, color: 'var(--teal)' }));
  return s;
}

function renderPlaceHouses(n: number, highlight: number[] = []): SVGSVGElement {
  const places = 7;
  const d = digitsOf(n, places);
  const w = 340 / places;
  const H = 210;
  const s = figSvg(360, H, formatIndianNumeral(fromDigits(d)));
  for (let col = 0; col < places; col++) {
    const i = places - 1 - col;
    const x = 10 + col * w;
    const period = i < 3 ? 0 : Math.floor((i - 3) / 2) + 1;
    const g = createSvg('g') as SVGGElement;
    g.appendChild(
      figRect(x + 2, 22, w - 4, 150, {
        fill: period % 2 ? 'var(--paper-sunk)' : 'var(--paper-raised)',
        stroke: highlight.includes(i) ? 'var(--thread)' : 'var(--hair)',
        sw: highlight.includes(i) ? 3 : 1,
      })
    );
    const placeKey = PLACE_IDS[i] ?? 'ones';
    g.appendChild(
      figText(x + w / 2, 12, t(`pv.short.${placeKey}`), { size: 11, color: 'var(--ink-soft)' })
    );
    const digit = d[i] ?? 0;
    for (let b = 0; b < Math.min(digit, 10); b++) {
      g.appendChild(
        figCircle(x + w / 2, 160 - b * 14, 6, {
          fill: digit >= 10 ? 'var(--kumkum)' : 'var(--indigo)',
        })
      );
    }
    g.appendChild(
      figText(x + w / 2, 192, digit >= 10 ? '10' : String(digit), { size: 22, color: 'var(--ink)' })
    );
    s.appendChild(g);
    if (i === 3 || i === 5 || i === 7) {
      s.appendChild(figText(x + w + 1, 200, ',', { size: 22, color: 'var(--thread)' }));
    }
  }
  return s;
}

interface StripSpec {
  num: number;
  den: number;
}

function renderFoldStrips(strips: StripSpec[], opts: { line?: number } = {}): SVGSVGElement {
  const rowH = 52;
  const W = 270;
  const x0 = 12;
  const s = figSvg(
    360,
    strips.length * rowH + 8,
    strips.map((st) => `${st.num}/${st.den}`).join(', ')
  );
  strips.forEach((st, r) => {
    const y = 8 + r * rowH;
    const pw = W / st.den;
    for (let p = 0; p < st.den; p++) {
      s.appendChild(
        figRect(x0 + p * pw, y, pw, 38, {
          fill: p < st.num ? 'var(--thread-soft)' : 'var(--paper-raised)',
          stroke: 'var(--ink-soft)',
          sw: 1.5,
          rx: 0,
        })
      );
    }
    s.appendChild(figText(x0 + W + 40, y + 12, st.num, { size: 16 }));
    s.appendChild(figLine(x0 + W + 30, y + 20, x0 + W + 50, y + 20, { sw: 1.8 }));
    s.appendChild(figText(x0 + W + 40, y + 30, st.den, { size: 16 }));
  });
  if (opts.line !== undefined) {
    s.appendChild(
      figLine(x0 + W * opts.line, 2, x0 + W * opts.line, strips.length * rowH + 4, {
        stroke: 'var(--leaf)',
        sw: 2.5,
        dash: '5 4',
      })
    );
  }
  return s;
}

function rupeeBlock(x: number, y: number, size: number, paise: number): SVGGElement {
  const g = createSvg('g') as SVGGElement;
  const c = size / 10;
  const strips = Math.floor(paise / 10);
  const squares = paise % 10;
  for (let col = 0; col < 10; col++) {
    for (let row = 0; row < 10; row++) {
      const on = col < strips || (col === strips && row < squares);
      const fill = on ? (col < strips ? 'var(--indigo)' : 'var(--teal)') : 'var(--paper-raised)';
      g.appendChild(
        figRect(x + col * c, y + row * c, c, c, {
          fill,
          stroke: 'var(--hair)',
          sw: 0.6,
          rx: 0,
        })
      );
    }
  }
  g.appendChild(figRect(x, y, size, size, { stroke: 'var(--ink-soft)', sw: 1.5, rx: 0 }));
  return g;
}

function renderRupeeGrid(paise: number): SVGSVGElement {
  const p = Math.max(0, paise);
  const blocks = Math.max(1, Math.floor(p / 100) + (p % 100 ? 1 : 0));
  const size = Math.min(110, (340 - (blocks - 1) * 10) / blocks);
  const s = figSvg(360, size + 40, formatRupees(p));
  let x = (360 - blocks * size - (blocks - 1) * 10) / 2;
  for (let b = 0; b < blocks; b++) {
    const inBlock = Math.max(0, Math.min(100, p - b * 100));
    s.appendChild(rupeeBlock(x + b * (size + 10), 6, size, inBlock));
    x += 0;
  }
  s.appendChild(
    figText(180, size + 26, `${formatRupees(p)} = ${p} ${t('money.paise')}`, {
      size: 15,
      color: 'var(--ink)',
    })
  );
  return s;
}

function renderRupeeCompare(a: number, b: number, labelA?: string, labelB?: string): SVGSVGElement {
  const s = figSvg(360, 180, `${formatRupees(a)}, ${formatRupees(b)}`);
  s.appendChild(rupeeBlock(30, 10, 130, a));
  s.appendChild(rupeeBlock(200, 10, 130, b));
  s.appendChild(figText(95, 162, labelA || formatRupees(a), { size: 15 }));
  s.appendChild(figText(265, 162, labelB || formatRupees(b), { size: 15 }));
  return s;
}

const ORGAN_SHAPE: Record<OrganId, { d: string; food: [number, number]; label: [number, number] }> =
  {
    mouth: { d: 'M150 46 Q180 62 210 46', food: [180, 52], label: [262, 48] },
    pipe: { d: 'M180 62 L180 128', food: [180, 96], label: [262, 96] },
    stomach: {
      d: 'M180 128 C 230 118, 250 160, 222 182 C 200 198, 170 178, 176 160',
      food: [214, 158],
      label: [292, 150],
    },
    small: {
      d: 'M176 196 q 20 -10 40 0 q 20 10 0 20 q -20 10 -40 0 q -20 -10 0 -20 M176 216 q 20 10 40 0 q 20 -10 0 20 q -20 10 -40 0',
      food: [196, 222],
      label: [292, 226],
    },
    large: {
      d: 'M128 270 L128 196 Q128 186 140 186 L150 186 M246 186 L258 186 Q268 186 268 196 L268 270 L200 270 L200 300',
      food: [262, 240],
      label: [62, 250],
    },
  };

function renderDigestPath(opts: {
  at?: OrganId;
  placed?: readonly OrganId[];
  highlight?: OrganId;
  blood?: boolean;
  labels?: boolean;
}): SVGSVGElement {
  const s = figSvg(360, 320, t('dig.art'));
  s.appendChild(
    figPath(
      'M180 6 C 140 6, 130 40, 150 60 L 112 90 C 96 140, 100 240, 116 300 L 244 300 C 260 240, 264 140, 248 90 L 210 60 C 230 40, 220 6, 180 6 Z',
      { stroke: 'var(--hair)', sw: 2, fill: 'var(--paper-raised)' }
    )
  );
  const placed = opts.placed;
  for (const id of DIGESTIVE_TRACT_ORDER) {
    const sh = ORGAN_SHAPE[id];
    const on = opts.highlight === id;
    const done = placed ? placed.includes(id) : false;
    const g = createSvg('g') as SVGGElement;
    g.appendChild(
      figPath(sh.d, {
        stroke: on ? 'var(--thread)' : done ? 'var(--leaf)' : 'var(--ink-soft)',
        sw: on ? 7 : 5,
      })
    );
    if (opts.labels !== false) {
      g.appendChild(
        figText(sh.label[0], sh.label[1], t(`dig.o.${id}`), {
          size: 12,
          color: on ? 'var(--ink)' : 'var(--ink-soft)',
          anchor: 'middle',
        })
      );
    }
    s.appendChild(g);
  }
  if (opts.blood) {
    s.appendChild(
      figPath('M150 214 C 120 200, 110 160, 120 120', {
        stroke: 'var(--kumkum)',
        sw: 3,
        dash: '2 5',
      })
    );
  }
  if (opts.at) {
    const p = ORGAN_SHAPE[opts.at].food;
    s.appendChild(
      figCircle(p[0], p[1], opts.at === 'large' ? 4 : 8, {
        fill: 'var(--thread)',
        stroke: 'var(--ink)',
        sw: 1,
      })
    );
  }
  return s;
}

const SURFACE_FILL: Record<SurfaceId, string> = {
  tile: 'var(--paper-raised)',
  wood: '#C9A06A',
  rug: '#B35C4A',
  sand: '#E2C98A',
};

function renderRamp(opts: {
  height: number;
  surface: SurfaceId;
  distance?: number;
  ghosts?: { d: number; surface: SurfaceId }[];
  progress?: number;
}): SVGSVGElement {
  const h = opts.height;
  const k = 11;
  const s = figSvg(360, 170, t('ramp.art', { h, s: t(`ramp.s.${opts.surface}`) }));
  const top = 120 - h * 22;
  s.appendChild(
    figPath(`M10 120 L 10 ${top} L 70 120 Z`, {
      fill: 'var(--paper-sunk)',
      stroke: 'var(--ink-soft)',
      sw: 2,
    })
  );
  s.appendChild(
    figRect(70, 120, 284, 12, {
      fill: SURFACE_FILL[opts.surface],
      stroke: 'var(--ink-soft)',
      sw: 1,
      rx: 0,
    })
  );
  if (opts.surface === 'sand' || opts.surface === 'rug') {
    for (let i = 0; i < 40; i++) {
      s.appendChild(figCircle(74 + i * 7, 124 + (i % 3) * 3, 1, { fill: 'var(--ink-soft)' }));
    }
  }
  for (let m = 0; m <= 25; m += 5) {
    s.appendChild(figLine(70 + m * k, 136, 70 + m * k, 142, { stroke: 'var(--ink-soft)', sw: 1 }));
    s.appendChild(figText(70 + m * k, 152, m, { size: 10, weight: 400, color: 'var(--ink-soft)' }));
  }
  s.appendChild(
    figText(354, 165, t('ramp.pretend'), {
      size: 10,
      weight: 400,
      color: 'var(--ink-soft)',
      anchor: 'end',
    })
  );
  (opts.ghosts || [])
    .slice()
    .sort((a, b) => a.d - b.d)
    .forEach((gh, i) => {
      const ly = 92 - (i % 2) * 14;
      s.appendChild(
        figLine(70 + gh.d * k, ly + 6, 70 + gh.d * k, 118, {
          stroke: 'var(--ghost)',
          sw: 2,
          dash: '3 3',
        })
      );
      s.appendChild(
        figText(70 + gh.d * k, ly, t(`ramp.s.${gh.surface}`), {
          size: 9,
          weight: 400,
          color: 'var(--ink-soft)',
        })
      );
    });
  const progress = opts.progress === undefined ? 1 : opts.progress;
  const dist = opts.distance === undefined ? 0 : opts.distance;
  let cx: number;
  let cy: number;
  if (opts.distance === undefined) {
    cx = 16;
    cy = top - 6;
  } else if (progress < 0.3) {
    const q = progress / 0.3;
    cx = 16 + q * 54;
    cy = top + q * (120 - top) - 6;
  } else {
    cx = 70 + ((progress - 0.3) / 0.7) * dist * k;
    cy = 114;
  }
  s.appendChild(
    figRect(cx - 12, cy - 8, 24, 12, {
      fill: 'var(--indigo)',
      stroke: 'var(--ink)',
      sw: 1,
      rx: 3,
    })
  );
  s.appendChild(figCircle(cx - 6, cy + 5, 3.5, { fill: 'var(--ink)' }));
  s.appendChild(figCircle(cx + 6, cy + 5, 3.5, { fill: 'var(--ink)' }));
  return s;
}

function renderLampStick(opts: {
  lampH: number;
  dist?: number;
  stickH?: number;
  material?: 'cardboard' | 'wax' | 'glass';
}): SVGSVGElement {
  const k = 36;
  const ground = 230;
  const stickX = 150;
  const stickH = opts.stickH ?? STICK_HEIGHT;
  const lampH = opts.lampH;
  const dist = opts.dist ?? 3;
  const lampX = stickX - dist * k;
  const lampY = ground - lampH * k;
  const topY = ground - stickH * k;
  const len = shadowLength(stickH, lampH, dist);
  const s = figSvg(
    360,
    250,
    t('light.art', { n: Number.isFinite(len) ? Math.round(len * 10) / 10 : '∞' })
  );
  s.appendChild(figLine(0, ground, 360, ground, { stroke: 'var(--ink-soft)', sw: 2 }));
  const endX = Number.isFinite(len) ? Math.min(358, stickX + len * k) : 358;
  const dark = shadowDarkness(opts.material || 'cardboard');
  s.appendChild(
    figPath(`M${stickX} ${ground} L${endX} ${ground}`, {
      stroke: 'var(--ink)',
      sw: 9,
      opacity: 0.12 + 0.75 * dark,
    })
  );
  if (endX >= 358 && opts.material !== 'glass') {
    s.appendChild(figArrow(330, ground - 14, 354, ground - 14, 'var(--ink-soft)'));
  }
  s.appendChild(figLine(lampX, lampY, lampX, ground, { stroke: 'var(--ink-soft)', sw: 2 }));
  const rayEnd: [number, number] = Number.isFinite(len) ? [endX, ground] : [358, topY];
  s.appendChild(
    figLine(lampX, lampY, rayEnd[0], rayEnd[1], {
      stroke: 'var(--thread)',
      sw: 2,
      dash: '6 4',
    })
  );
  s.appendChild(
    figLine(lampX, lampY, stickX - 2, ground - 2, {
      stroke: 'var(--thread)',
      sw: 1.5,
      dash: '2 5',
    })
  );
  s.appendChild(
    figCircle(lampX, lampY, 10, { fill: 'var(--thread)', stroke: 'var(--ink)', sw: 1 })
  );
  const stickFill =
    opts.material === 'glass'
      ? 'var(--paper-raised)'
      : opts.material === 'wax'
        ? 'var(--thread-soft)'
        : 'var(--ink)';
  s.appendChild(
    figRect(stickX - 4, topY, 8, stickH * k, {
      fill: stickFill,
      stroke: 'var(--ink)',
      sw: 1,
      rx: 1,
    })
  );
  if (Number.isFinite(len)) {
    s.appendChild(
      figText(
        (stickX + endX) / 2,
        ground + 14,
        t('light.shadowLen', { n: Math.round(len * 10) / 10 }),
        {
          size: 12,
          color: 'var(--ink)',
        }
      )
    );
  }
  return s;
}

function yearLabel(y: number): string {
  return y < 0 ? t('time.bce', { y: -y }) : t('time.ce', { y });
}

function renderTimeline(opts: { hung?: string[]; reveal?: number }): SVGSVGElement {
  const from = -3000;
  const to = 2100;
  const x0 = 20;
  const x1 = 340;
  const axisY = 70;
  const X = (y: number) => x0 + ((y - from) / (to - from)) * (x1 - x0);
  const drawn = opts.reveal === undefined ? 1 : opts.reveal;
  const s = figSvg(360, 210, t('time.art'));
  s.appendChild(
    figLine(x0, axisY, x0 + (x1 - x0) * drawn, axisY, { stroke: 'var(--thread)', sw: 4 })
  );
  for (const y of [-3000, -2000, -1000, 1000, 2000]) {
    if (X(y) > x0 + (x1 - x0) * drawn) continue;
    s.appendChild(
      figLine(X(y), axisY - 6, X(y), axisY + 6, { stroke: 'var(--ink-soft)', sw: 1.5 })
    );
    s.appendChild(
      figText(X(y), axisY - 16, yearLabel(y), { size: 10, weight: 400, color: 'var(--ink-soft)' })
    );
  }
  if (drawn >= 0.6) {
    s.appendChild(
      figCircle(X(0), axisY, 7, { fill: 'var(--paper-raised)', stroke: 'var(--kumkum)', sw: 2.5 })
    );
    s.appendChild(figText(X(0), axisY - 34, t('time.join'), { size: 10, color: 'var(--kumkum)' }));
    s.appendChild(figArrow(X(0) - 12, axisY + 20, X(0) - 52, axisY + 20, 'var(--indigo)'));
    s.appendChild(figArrow(X(0) + 12, axisY + 20, X(0) + 52, axisY + 20, 'var(--teal)'));
  }
  const hung = opts.hung || [];
  const slotW = (x1 - x0) / 6;
  hung.forEach((id, i) => {
    const ev = EVENTS.find((e) => e.id === id);
    if (!ev) return;
    const sx = x0 + slotW * (i + 0.5);
    const ly = i % 2 ? 176 : 140;
    s.appendChild(
      figLine(X(ev.year), axisY + 4, sx, ly - 14, { stroke: 'var(--ink-soft)', sw: 1 })
    );
    s.appendChild(figCircle(X(ev.year), axisY, 5, { fill: 'var(--leaf)' }));
    s.appendChild(figText(sx, ly - 4, t(`time.e.${id}`), { size: 10 }));
    s.appendChild(
      figText(sx, ly + 10, (ev.about ? `${t('time.about')} ` : '') + yearLabel(ev.year), {
        size: 9,
        weight: 400,
        color: 'var(--ink-soft)',
      })
    );
  });
  return s;
}

function joinLine(crossZero: boolean): SVGSVGElement {
  const s = figSvg(360, 110, t('time.joinArt'));
  const years = [-3, -2, -1, 1, 2, 3];
  s.appendChild(figLine(10, 50, 350, 50, { stroke: 'var(--thread)', sw: 4 }));
  years.forEach((y, i) => {
    const x = 30 + i * 60;
    s.appendChild(figLine(x, 42, x, 58, { stroke: 'var(--ink)', sw: 2 }));
    s.appendChild(
      figText(x, 76, y < 0 ? t('time.bce', { y: -y }) : t('time.ce', { y: y }), {
        size: 12,
        color: y < 0 ? 'var(--indigo)' : 'var(--teal)',
      })
    );
  });
  s.appendChild(
    figText(180, 24, crossZero ? t('time.noZero') : t('time.join'), {
      size: 12,
      color: 'var(--kumkum)',
    })
  );
  if (crossZero) {
    s.appendChild(figText(180, 98, '0', { size: 18, color: 'var(--kumkum)' }));
    s.appendChild(figLine(168, 90, 192, 106, { stroke: 'var(--kumkum)', sw: 2.5 }));
  }
  return s;
}

function renderEarthSpin(spin: number): SVGSVGElement {
  const cx = 220;
  const cy = 120;
  const r = 74;
  const th = (spin * Math.PI) / 180;
  const hour = hourAt(spin);
  const s = figSvg(360, 240, t('earth.spinArt', { h: hour }));
  s.appendChild(figCircle(30, cy, 22, { fill: 'var(--thread)' }));
  for (let i = -2; i <= 2; i++) {
    s.appendChild(figArrow(60, cy + i * 30, 120, cy + i * 30, 'var(--thread)'));
  }
  s.appendChild(
    figCircle(cx, cy, r, { fill: 'var(--teal-soft)', stroke: 'var(--ink-soft)', sw: 1.5 })
  );
  s.appendChild(
    figPath(`M${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`, {
      fill: 'var(--ink)',
      stroke: 'none',
      opacity: 0.55,
    })
  );
  s.appendChild(figCircle(cx, cy, 4, { fill: 'var(--ink)' }));
  s.appendChild(
    figPath(`M${cx + r + 14} ${cy + 30} A ${r + 14} ${r + 14} 0 0 1 ${cx + 30} ${cy + r + 14}`, {
      stroke: 'var(--ink-soft)',
      sw: 1.5,
    })
  );
  const mx = cx - r * Math.cos(th);
  const my = cy + r * Math.sin(th);
  s.appendChild(
    figCircle(mx, my, 9, { fill: 'var(--kumkum)', stroke: 'var(--paper-raised)', sw: 2 })
  );
  s.appendChild(
    figText(mx + (mx < cx ? -14 : 14), my, t('earth.india'), {
      size: 12,
      anchor: mx < cx ? 'end' : 'start',
    })
  );
  const hh = String(hour).padStart(2, '0');
  s.appendChild(
    figText(
      cx,
      232,
      t('earth.hourLine', { h: `${hh}:00`, d: t(isDay(hour) ? 'earth.day' : 'earth.night') }),
      {
        size: 13,
      }
    )
  );
  return s;
}

function renderEarthOrbit(month: number): SVGSVGElement {
  const cx = 180;
  const cy = 116;
  const R = 120;
  const ry = 70;
  const phi = Math.PI + ((month - 5.5) / 12) * 2 * Math.PI;
  const ex = cx + R * Math.cos(phi);
  const ey = cy + ry * Math.sin(phi);
  const season = northernSeason(month);
  const s = figSvg(
    360,
    240,
    t('earth.orbitArt', { m: t(`earth.m${month}`), s: t(`earth.season.${season}`) })
  );
  s.appendChild(
    createSvg('ellipse', {
      cx,
      cy,
      rx: R,
      ry,
      fill: 'none',
      stroke: 'var(--hair)',
      'stroke-width': 1.5,
      'stroke-dasharray': '4 4',
    }) as SVGElement
  );
  s.appendChild(figCircle(cx, cy, 20, { fill: 'var(--thread)' }));
  for (const m of [0, 2, 5, 8, 11]) {
    const p = Math.PI + ((m - 5.5) / 12) * 2 * Math.PI;
    s.appendChild(
      figText(cx + (R + 22) * Math.cos(p), cy + (ry + 18) * Math.sin(p), t(`earth.m${m}`), {
        size: 10,
        weight: 400,
        color: 'var(--ink-soft)',
      })
    );
  }
  s.appendChild(
    figCircle(ex, ey, 18, { fill: 'var(--teal-soft)', stroke: 'var(--ink-soft)', sw: 1.5 })
  );
  const tilt = (23.5 * Math.PI) / 180;
  s.appendChild(
    figLine(
      ex - 28 * Math.sin(tilt),
      ey + 28 * Math.cos(tilt),
      ex + 28 * Math.sin(tilt),
      ey - 28 * Math.cos(tilt),
      { stroke: 'var(--ink)', sw: 2 }
    )
  );
  s.appendChild(figText(ex + 32 * Math.sin(tilt), ey - 34, 'N', { size: 11 }));
  s.appendChild(
    figText(
      cx,
      228,
      t('earth.orbitLine', { m: t(`earth.m${month}`), s: t(`earth.season.${season}`) }),
      {
        size: 13,
      }
    )
  );
  return s;
}

const CELL = 38;

function renderCourtyardMap(opts: {
  flat?: number;
  scale?: number;
  path?: readonly (readonly [number, number])[];
}): SVGSVGElement {
  const COLS = COURTYARD.cols;
  const ROWS = COURTYARD.rows;
  const PLACES = COURTYARD.places;
  const y0 = 26;
  const flat = opts.flat === undefined ? 1 : opts.flat;
  const s = figSvg(360, 300, t('map.art'));
  const sx = 1 - (1 - flat) * 0.25;
  const shear = -(1 - flat) * 0.5;
  const sy = 0.45 + 0.55 * flat;
  const e = 180 - (shear * ROWS * CELL + sx * COLS * CELL) / 2;
  const g = createSvg('g', {
    transform: `translate(${e} ${y0 + (1 - flat) * 70}) matrix(${sx} 0 ${shear} ${sy} 0 0)`,
  }) as SVGGElement;
  g.appendChild(
    figRect(0, 0, COLS * CELL, ROWS * CELL, {
      fill: 'var(--paper-sunk)',
      stroke: 'var(--ink)',
      sw: 3,
      rx: 0,
    })
  );
  for (let c = 1; c < COLS; c++) {
    g.appendChild(figLine(c * CELL, 0, c * CELL, ROWS * CELL, { stroke: 'var(--hair)', sw: 1 }));
  }
  for (let r = 1; r < ROWS; r++) {
    g.appendChild(figLine(0, r * CELL, COLS * CELL, r * CELL, { stroke: 'var(--hair)', sw: 1 }));
  }
  for (const h of PLACES.house) {
    g.appendChild(
      figRect(h[0] * CELL + 2, h[1] * CELL + 2, CELL - 4, CELL - 4, {
        fill: '#B35C4A',
        stroke: 'none',
        rx: 1,
      })
    );
  }
  const cen = (p: readonly [number, number]) =>
    [p[0] * CELL + CELL / 2, p[1] * CELL + CELL / 2] as const;
  const w = cen(PLACES.well);
  const tr = cen(PLACES.tree);
  const tu = cen(PLACES.tulsi);
  const gt = cen(PLACES.gate);
  g.appendChild(
    figCircle(w[0], w[1], 13, { fill: 'var(--teal-soft)', stroke: 'var(--teal)', sw: 3 })
  );
  g.appendChild(
    figCircle(tr[0], tr[1], 15, { fill: 'var(--leaf-soft)', stroke: 'var(--leaf)', sw: 2 })
  );
  g.appendChild(
    figRect(tu[0] - 8, tu[1] - 8, 16, 16, { fill: 'var(--leaf)', stroke: 'none', rx: 2 })
  );
  g.appendChild(
    figRect(gt[0] - 15, ROWS * CELL - 4, 30, 8, {
      fill: 'var(--paper-raised)',
      stroke: 'none',
      rx: 0,
    })
  );
  if (opts.path && opts.path.length > 1) {
    const d = opts.path
      .map((p, i) => {
        const q = cen(p);
        return `${i ? 'L' : 'M'}${q[0]} ${q[1]}`;
      })
      .join(' ');
    g.appendChild(figPath(d, { stroke: 'var(--thread)', sw: 4, dash: '1 7' }));
  }
  const me = opts.path ? opts.path[opts.path.length - 1] : null;
  if (me) {
    const m = cen(me);
    g.appendChild(
      figCircle(m[0], m[1], 9, { fill: 'var(--kumkum)', stroke: 'var(--paper-raised)', sw: 2 })
    );
  }
  s.appendChild(g);
  if (flat >= 1) {
    s.appendChild(figText(338, 12, 'N', { size: 13 }));
    s.appendChild(figArrow(338, 46, 338, 20, 'var(--ink)'));
    const ly = y0 + ROWS * CELL + 18;
    s.appendChild(figCircle(30, ly, 6, { fill: 'var(--teal-soft)', stroke: 'var(--teal)', sw: 2 }));
    s.appendChild(figText(42, ly, t('map.well'), { size: 11, weight: 400, anchor: 'start' }));
    s.appendChild(
      figCircle(110, ly, 6, { fill: 'var(--leaf-soft)', stroke: 'var(--leaf)', sw: 2 })
    );
    s.appendChild(figText(122, ly, t('map.tree'), { size: 11, weight: 400, anchor: 'start' }));
    s.appendChild(figRect(184, ly - 6, 12, 12, { fill: '#B35C4A', stroke: 'none', rx: 1 }));
    s.appendChild(figText(202, ly, t('map.house'), { size: 11, weight: 400, anchor: 'start' }));
    s.appendChild(
      figText(340, ly, t('map.scale', { m: opts.scale || 5 }), { size: 11, anchor: 'end' })
    );
  }
  return s;
}

function renderE4Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 90, '3 × 10 m');
  for (let i = 0; i < 3; i++) {
    s.appendChild(
      figRect(60 + i * 80, 20, 80, 36, {
        fill: 'var(--paper-raised)',
        stroke: 'var(--ink)',
        sw: 2,
        rx: 0,
      })
    );
    s.appendChild(
      figText(100 + i * 80, 38, '10 m', {
        size: 13,
        color: reveal ? 'var(--leaf)' : 'var(--ink)',
      })
    );
  }
  s.appendChild(
    figText(180, 76, reveal ? '10 + 10 + 10 = 3 × 10 = 30 m' : '3 + 10 = 13 m ?', {
      size: 14,
      color: reveal ? 'var(--leaf)' : 'var(--kumkum)',
    })
  );
  return s;
}

function n3Prashna(): SVGSVGElement {
  const s = figSvg(360, 150, '1/2, 2/4');
  for (const [cx, parts] of [
    [100, 2],
    [260, 4],
  ] as const) {
    s.appendChild(figCircle(cx, 72, 56, { fill: '#E9C98F', stroke: 'var(--ink-soft)', sw: 2 }));
    for (let i = 0; i < parts; i++) {
      const a = (i * 2 * Math.PI) / parts;
      s.appendChild(
        figLine(cx, 72, cx + 56 * Math.cos(a), 72 + 56 * Math.sin(a), {
          stroke: 'var(--ink-soft)',
          sw: 2,
        })
      );
    }
    s.appendChild(
      figPath(`M${cx} 72 L${cx + 56} 72 A 56 56 0 0 1 ${cx - 56} 72 Z`, {
        fill: 'var(--paper-sunk)',
        stroke: 'none',
        opacity: 0.85,
      })
    );
  }
  s.appendChild(figText(100, 140, t('frac.ravi'), { size: 13 }));
  s.appendChild(figText(260, 140, t('frac.mini'), { size: 13 }));
  return s;
}

function u1Prashna(): SVGSVGElement {
  const s = figSvg(360, 130, '₹4.5, ₹4.25');
  for (const [cx, price, label] of [
    [100, '₹4.5', t('money.pencil')],
    [260, '₹4.25', t('money.eraser')],
  ] as const) {
    s.appendChild(
      figPath(`M${cx - 60} 30 L${cx + 40} 30 L${cx + 64} 62 L${cx + 40} 94 L${cx - 60} 94 Z`, {
        fill: 'var(--paper-raised)',
        stroke: 'var(--ink-soft)',
        sw: 2,
      })
    );
    s.appendChild(figText(cx - 6, 62, price, { size: 24 }));
    s.appendChild(figText(cx - 6, 114, label, { size: 13, color: 'var(--ink-soft)' }));
  }
  return s;
}

function k2IdeaFigure(): SVGSVGElement {
  const s = figSvg(360, 110, t('ramp.bumps'));
  s.appendChild(
    figPath(
      'M20 50 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8',
      { stroke: 'var(--ink-soft)', sw: 2 }
    )
  );
  s.appendChild(
    figPath(
      'M120 56 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8',
      {
        stroke: 'var(--indigo)',
        sw: 2,
      }
    )
  );
  s.appendChild(figArrow(150, 86, 220, 86, 'var(--indigo)'));
  s.appendChild(figArrow(210, 100, 160, 100, 'var(--kumkum)'));
  s.appendChild(
    figText(240, 86, t('ramp.motion'), { size: 11, anchor: 'start', color: 'var(--indigo)' })
  );
  s.appendChild(
    figText(240, 100, t('ramp.friction'), { size: 11, anchor: 'start', color: 'var(--kumkum)' })
  );
  return s;
}

const ALL_EVENTS = EVENTS.map((e) => e.id);
const gate = COURTYARD.places.gate;
const SAMPLE_PATH = walk(gate, ['N', 'N', 'N', 'E', 'N', 'E', 'E', 'E', 'E']);

function rampRun(h: number, surface: SurfaceId) {
  return { d: rollDistance(h, surface), surface };
}

function renderM5Mistake(reveal: boolean): SVGSVGElement {
  const a = 4;
  const b = 6;
  const n = 24;
  const meet = lcm(a, b);
  const s = renderM5Beats(a, b, n, reveal ? 3 : 1);
  if (reveal) {
    const dx = 320 / n;
    const x = 24 + (meet - 1) * dx;
    s.appendChild(figText(x, 18, String(meet), { size: 14, color: 'var(--leaf)', weight: 700 }));
  }
  return s;
}

function lessonCards(
  fig: Partial<Record<CardKey, (step: number) => SVGSVGElement | null>>
): LessonVisuals['cards'] {
  return fig as LessonVisuals['cards'];
}

const N1: LessonVisuals = {
  prashna: () => renderPlaceHouses(100000, [5]),
  cards: lessonCards({
    what: () => renderPlaceHouses(305200),
    idea: () => {
      const r = addOneDigits(digitsOf(99999, 7));
      return renderPlaceHouses(fromDigits(r.digits), r.bundled.concat([5]));
    },
    why: () =>
      twoLines(
        `${t('place.indian')}: ${formatIndianNumeral(1234567)}`,
        `${t('place.intl')}: ${groupInternational(1234567)}`
      ),
    example: (step) =>
      renderPlaceHouses(
        1234567,
        step === 1 ? [5, 6] : step === 2 ? [3, 4] : step === 3 ? [0, 1, 2] : []
      ),
    where: () => twoLines(`${t('place.indian')}: 10,00,000`, `${t('place.intl')}: 1,000,000`),
  }),
  mistake: (reveal) => renderPlaceHouses(205000, reveal ? [5, 3] : []),
};

const N3: LessonVisuals = {
  prashna: () => n3Prashna(),
  cards: lessonCards({
    what: () =>
      renderFoldStrips([
        { num: 1, den: 2 },
        { num: 2, den: 4 },
      ]),
    idea: () => renderFoldStrips([{ num: 3, den: 4 }]),
    why: () => {
      const s = figSvg(360, 70, t('frac.unequal'));
      s.appendChild(
        figRect(30, 10, 200, 40, {
          fill: 'var(--thread-soft)',
          stroke: 'var(--ink-soft)',
          sw: 1.5,
          rx: 0,
        })
      );
      s.appendChild(
        figRect(230, 10, 100, 40, {
          fill: 'var(--paper-raised)',
          stroke: 'var(--ink-soft)',
          sw: 1.5,
          rx: 0,
        })
      );
      s.appendChild(figText(180, 62, t('frac.unequal'), { size: 12, color: 'var(--kumkum)' }));
      return s;
    },
    example: (step) => {
      const list: StripSpec[] = [{ num: 1, den: 2 }];
      if (step >= 1) list.push({ num: 2, den: 4 });
      if (step >= 2) list.push({ num: 4, den: 8 });
      return renderFoldStrips(list, { line: step >= 3 ? 0.5 : undefined });
    },
    where: () =>
      renderFoldStrips([
        { num: 1, den: 2 },
        { num: 1, den: 4 },
      ]),
  }),
  mistake: (reveal) =>
    renderFoldStrips(
      [
        { num: 1, den: 2 },
        { num: 1, den: 3 },
      ],
      { line: reveal ? 0.5 : undefined }
    ),
};

const U1: LessonVisuals = {
  prashna: () => u1Prashna(),
  cards: lessonCards({
    what: () => renderRupeeGrid(125),
    idea: () => renderRupeeGrid(100),
    why: () => renderRupeeGrid(37),
    example: (step) => renderRupeeGrid(step >= 3 ? 375 : step >= 2 ? 370 : step >= 1 ? 300 : 0),
    where: () => renderRupeeCompare(50, 45),
  }),
  mistake: (reveal) => renderRupeeCompare(50, 45, reveal ? '₹0.50' : '₹0.5', '₹0.45'),
};

const B3: LessonVisuals = {
  prashna: () => {
    const s = figSvg(360, 120, t('dig.lengthArt'));
    s.appendChild(
      figRect(20, 20, 18, 80, { fill: 'var(--indigo-soft)', stroke: 'var(--indigo)', sw: 2 })
    );
    s.appendChild(figText(29, 112, '1.5 m', { size: 11 }));
    s.appendChild(
      figPath('M60 60 q 15 -30 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0', {
        stroke: 'var(--leaf)',
        sw: 6,
      })
    );
    s.appendChild(figText(200, 100, t('dig.smallLen'), { size: 12, color: 'var(--leaf)' }));
    return s;
  },
  cards: lessonCards({
    what: () => renderDigestPath({ at: 'mouth' }),
    idea: () => renderDigestPath({ placed: DIGESTIVE_TRACT_ORDER }),
    why: () => renderDigestPath({ highlight: 'small', blood: true }),
    example: (step) => {
      const at = (['mouth', 'mouth', 'stomach', 'small'] as OrganId[])[step] ?? 'mouth';
      return renderDigestPath({ at, highlight: at, blood: step === 3 });
    },
    where: () => renderDigestPath({ highlight: 'large' }),
  }),
  mistake: (reveal) => renderDigestPath({ highlight: reveal ? 'small' : 'stomach', blood: reveal }),
};

const K2: LessonVisuals = {
  prashna: () => renderRamp({ height: 2, surface: 'rug' }),
  cards: lessonCards({
    what: () => renderRamp({ height: 2, surface: 'tile', distance: rollDistance(2, 'tile') }),
    idea: () => k2IdeaFigure(),
    why: () => renderRamp({ height: 2, surface: 'sand', distance: rollDistance(2, 'sand') }),
    example: (step) => {
      if (step === 0) return renderRamp({ height: 2, surface: 'tile' });
      if (step === 1) {
        return renderRamp({ height: 2, surface: 'tile', distance: rollDistance(2, 'tile') });
      }
      return renderRamp({
        height: 2,
        surface: 'sand',
        distance: rollDistance(2, 'sand'),
        ghosts: [rampRun(2, 'tile')],
      });
    },
    where: () =>
      renderRamp({
        height: 2,
        surface: 'rug',
        distance: rollDistance(2, 'rug'),
        ghosts: [rampRun(2, 'tile'), rampRun(2, 'wood')],
      }),
  }),
  mistake: () =>
    renderRamp({
      height: 3,
      surface: 'sand',
      distance: rollDistance(3, 'sand'),
      ghosts: [rampRun(1, 'tile')],
    }),
};

const R1: LessonVisuals = {
  prashna: () => renderLampStick({ lampH: 6, dist: 0.6 }),
  cards: lessonCards({
    what: () => renderLampStick({ lampH: 4, dist: 3 }),
    idea: () => renderLampStick({ lampH: 3, dist: 3 }),
    why: () => renderLampStick({ lampH: 2.5, dist: 3 }),
    example: (step) =>
      renderLampStick({
        lampH: [2.5, 2.5, 4, 6][step] ?? 2.5,
        dist: step === 3 ? 0.6 : 3,
      }),
    where: () => renderLampStick({ lampH: 6, dist: 1.2 }),
  }),
  mistake: (reveal) => renderLampStick({ lampH: reveal ? 2.2 : 4, dist: 3 }),
};

const I2: LessonVisuals = {
  prashna: () => renderTimeline({ hung: [] }),
  cards: lessonCards({
    what: () => renderTimeline({ hung: [...ALL_EVENTS] }),
    idea: () => renderTimeline({ hung: [] }),
    why: () => joinLine(true),
    example: (step) => joinLine(step >= 2),
    where: () => renderTimeline({ hung: ALL_EVENTS.slice(3) }),
  }),
  mistake: (reveal) => joinLine(reveal),
};

const E1: LessonVisuals = {
  prashna: () => renderEarthSpin(60),
  cards: lessonCards({
    what: () => renderEarthSpin(0),
    idea: () => renderEarthSpin(180),
    why: () => renderEarthOrbit(5),
    example: (step) => renderEarthSpin([270, 270, 0, 90][step] ?? 0),
    where: () => renderEarthOrbit(11),
  }),
  mistake: (reveal) => renderEarthOrbit(reveal ? 0 : 5),
};

const E4: LessonVisuals = {
  prashna: () => renderCourtyardMap({ flat: 0.3 }),
  cards: lessonCards({
    what: () => renderCourtyardMap({ flat: 0.3 }),
    idea: () => renderCourtyardMap({}),
    why: () => renderCourtyardMap({ scale: 5 }),
    example: (step) =>
      renderCourtyardMap({
        path: step >= 1 ? SAMPLE_PATH.slice(0, step >= 2 ? SAMPLE_PATH.length : 6) : [gate],
      }),
    where: () => renderCourtyardMap({ path: SAMPLE_PATH }),
  }),
  mistake: (reveal) => renderE4Mistake(reveal),
};

function phaseOneFigure(knotId: string, cardKey: string, step: number): SVGSVGElement | null {
  if (knotId === 'M2') {
    if (cardKey === 'what' || cardKey === 'idea') return renderM2Tiles(6, 4, 4, false);
    if (cardKey === 'why') return renderM2Tiles(6, 4, 4, true);
    if (cardKey === 'example') {
      const filled = step >= 2 ? 3 : step >= 1 ? 1 : 0;
      return renderM2Tiles(5, 3, filled, step >= 2);
    }
    if (cardKey === 'where') return renderM2Tiles(8, 6, 6, false);
  } else if (knotId === 'M4') {
    if (cardKey === 'what' || cardKey === 'idea') return renderM4Rooms(23, 14, 2, '23 × 14');
    if (cardKey === 'why') return renderM4Rooms(23, 14, 3, '23 × 14 = 322');
    if (cardKey === 'example') return renderM4Rooms(17, 12, step, '17 × 12');
    if (cardKey === 'where') return renderM4Rooms(12, 23, 2, '12 × 23');
  } else if (knotId === 'M5') {
    if (cardKey === 'what' || cardKey === 'idea') return renderM5Beats(3, 4, 12, 2);
    if (cardKey === 'why') return renderM5Beats(3, 4, 12, 3);
    if (cardKey === 'example') return renderM5Beats(4, 6, 24, step);
    if (cardKey === 'where') return renderM5Beats(15, 20, 60, 3);
  } else if (knotId === 'D1') {
    if (cardKey === 'what' || cardKey === 'idea') return renderFairSharePlates(4, 3, 0);
    if (cardKey === 'why') return renderFairSharePlates(4, 3, 0, { eq: '4 × 3 = 12' });
    if (cardKey === 'example') {
      return renderFairSharePlates(5, Math.min(step, 3), 0, {
        eq: step >= 3 ? '5 × 3 = 15' : null,
      });
    }
    if (cardKey === 'where') return renderFairSharePlates(6, 4, 0);
  } else if (knotId === 'D3') {
    if (cardKey === 'what' || cardKey === 'idea') {
      return renderFairSharePlates(4, 3, 2, { eq: '14 ÷ 4 = 3 r 2' });
    }
    if (cardKey === 'why') {
      return renderFairSharePlates(4, 3, 2, { cutLeft: true, half: true, eq: '3 + ½' });
    }
    if (cardKey === 'example') {
      return renderFairSharePlates(2, step >= 1 ? 3 : 0, step >= 1 && step < 3 ? 1 : 0, {
        cutLeft: step >= 2,
        half: step >= 3,
        eq: step >= 3 ? '7 ÷ 2 = 3½' : null,
      });
    }
    if (cardKey === 'where') return renderFairSharePlates(3, 2, 1, { cutLeft: true });
  } else if (knotId === 'G2') {
    if (cardKey === 'what' || cardKey === 'idea') {
      return renderG2Ropes(
        [
          [11, 1],
          [6, 6],
        ],
        false
      );
    }
    if (cardKey === 'why') {
      return renderG2Ropes(
        [
          [11, 1],
          [6, 6],
        ],
        true
      );
    }
    if (cardKey === 'example') {
      return renderG2Ropes(
        [
          [8, 2],
          [5, 5],
        ],
        step >= 2
      );
    }
    if (cardKey === 'where') {
      return renderG2Ropes(
        [
          [10, 2],
          [5, 5],
        ],
        true
      );
    }
  } else if (knotId === 'G4') {
    if (cardKey === 'what' || cardKey === 'idea') return renderG4Flower(true, true, true);
    if (cardKey === 'why') return renderG4Flower(false, false, true);
    if (cardKey === 'example') return renderG4Flower(false, false, step >= 2);
    if (cardKey === 'where') return renderG4Flower(true, true, true);
  }
  return null;
}

const FIGURE_CARDS: CardKey[] = ['what', 'idea', 'why', 'example', 'where'];

function fromPhaseOne(knotId: string): LessonVisuals {
  const cards: LessonVisuals['cards'] = {};
  for (const key of FIGURE_CARDS) {
    cards[key] = (step: number) => phaseOneFigure(knotId, key, step);
  }
  return { cards };
}

export const PORTED: VisualsTable = {
  N1,
  N3,
  U1,
  B3,
  K2,
  R1,
  I2,
  E1,
  E4,
  M2: fromPhaseOne('M2'),
  M4: { ...fromPhaseOne('M4'), mistake: (reveal) => renderM4MistakeRooms(reveal) },
  M5: { ...fromPhaseOne('M5'), mistake: (reveal) => renderM5Mistake(reveal) },
  D1: fromPhaseOne('D1'),
  D3: fromPhaseOne('D3'),
  G2: fromPhaseOne('G2'),
  G4: fromPhaseOne('G4'),
};
