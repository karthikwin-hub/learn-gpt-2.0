/**
 * Pictures for the Ganita lessons U2 U3 H1 H2 L4 P1.
 */

import { t } from '../../domain/i18n/core';
import { convertLength, parseMetersAndCentimeters } from '../../domain/math/metric';
import { formatTime24, to12Hour, calculateDuration } from '../../domain/math/timeclock';
import { calculateTotalFromIcons } from '../../domain/math/pictograph';
import { readBarValue, FOOD_INTAKE_DATASET } from '../../domain/math/bargraph';
import {
  findFirstDifferences,
  isArithmeticSequence,
  predictNextTerm,
} from '../../domain/math/sequences';
import { triangularNumber, squareNumber, generateTriangularDots } from '../../domain/math/growing';
import { figSvg, figText, figRect, figLine, figCircle, figPath, figGrid } from '../diagrams/fig';
import { svg } from '../util/dom';
import type { CardKey, LessonVisuals, VisualsTable } from './types';

const W = 360;
const H = 150;

function cardFig(
  draw: Partial<Record<CardKey, (step: number) => SVGSVGElement | null>>
): LessonVisuals['cards'] {
  return draw as LessonVisuals['cards'];
}

/* ---------- U2 metric ---------- */

function u2LadderHighlight(fromUnit: string, toUnit: string, value: number): SVGSVGElement {
  const s = figSvg(W, H, t('bodha.U2.what'));
  const units = ['km', 'm', 'cm', 'mm'] as const;
  const y0 = 18;
  units.forEach((u, i) => {
    const y = y0 + i * 32;
    const conv = convertLength(value, 'm', u);
    const hi = u === fromUnit || u === toUnit;
    s.appendChild(
      figRect(24, y, 312, 26, {
        fill: hi ? 'var(--paper-sunk)' : 'var(--paper-raised)',
        stroke: hi ? 'var(--indigo)' : 'var(--thread-soft)',
        sw: hi ? 2 : 1,
        rx: 4,
      })
    );
    s.appendChild(figText(48, y + 14, u, { anchor: 'start', size: 13, weight: 700 }));
    s.appendChild(figText(300, y + 14, conv, { anchor: 'end', size: 13, color: 'var(--teal)' }));
  });
  return s;
}

function u2Prashna(): SVGSVGElement {
  const s = figSvg(W, 120, t('prashna.U2.q'));
  const left = convertLength(250, 'cm', 'm');
  s.appendChild(
    figRect(30, 20, 130, 70, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 6 })
  );
  s.appendChild(
    figRect(200, 20, 130, 70, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 6 })
  );
  s.appendChild(figLine(95, 55, 165, 55, { stroke: 'var(--indigo)', sw: 3 }));
  s.appendChild(figText(95, 40, '250 cm', { size: 14, color: 'var(--indigo)' }));
  s.appendChild(figText(265, 40, '2 m', { size: 14, color: 'var(--teal)' }));
  s.appendChild(figText(180, 105, `${left} m`, { size: 12, color: 'var(--ink-soft)' }));
  return s;
}

function u2Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(W, H, t('mistake.U2.intro'));
  const wrong = 4.5;
  const right = parseMetersAndCentimeters(4, 5);
  s.appendChild(
    figRect(40, 30, 280, 50, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 6 })
  );
  s.appendChild(
    figText(180, 48, reveal ? `${right} m` : `${wrong} m`, {
      size: 22,
      color: reveal ? 'var(--teal)' : 'var(--ink)',
    })
  );
  if (reveal) {
    s.appendChild(figText(180, 68, '4 m 5 cm', { size: 12, color: 'var(--kumkum)' }));
    s.appendChild(
      figRect(120, 88, 120, 22, { fill: 'var(--paper-sunk)', stroke: 'var(--kumkum)', rx: 4 })
    );
    s.appendChild(figText(180, 100, '0.05 m', { size: 11 }));
  }
  return s;
}

const U2: LessonVisuals = {
  prashna: u2Prashna,
  cards: cardFig({
    what: () => u2LadderHighlight('m', 'cm', 1),
    idea: () => {
      const s = figSvg(W, H, t('bodha.U2.idea'));
      ['×1000', '×100', '×1000'].forEach((label, i) => {
        s.appendChild(figText(80 + i * 90, 40, label, { size: 16, color: 'var(--indigo)' }));
        s.appendChild(figLine(80 + i * 90, 50, 80 + i * 90, 110, { stroke: 'var(--thread-soft)' }));
      });
      s.appendChild(figText(180, 120, '10³ · 10⁻² · 10⁻³', { size: 11, color: 'var(--ink-soft)' }));
      return s;
    },
    why: () => {
      const s = figSvg(W, 90, t('bodha.U2.why'));
      s.appendChild(figText(100, 45, '3.25', { size: 20, color: 'var(--indigo)' }));
      s.appendChild(figPath('M130 45 L170 45', { stroke: 'var(--teal)', sw: 2 }));
      s.appendChild(figText(220, 45, '325', { size: 20, color: 'var(--teal)' }));
      s.appendChild(figCircle(150, 45, 14, { fill: 'var(--kumkum)', opacity: 0.35 }));
      return s;
    },
    example: (step) => {
      if (step >= 2) return u2LadderHighlight('g', 'kg', 4.5);
      if (step >= 1) return u2LadderHighlight('m', 'cm', 3.25);
      return u2LadderHighlight('m', 'cm', 1);
    },
    where: () => {
      const s = figSvg(W, H, t('bodha.U2.where'));
      s.appendChild(
        figRect(40, 35, 70, 90, { fill: 'var(--paper-sunk)', stroke: 'var(--ink-soft)', rx: 4 })
      );
      s.appendChild(figRect(130, 55, 50, 70, { fill: 'var(--teal)', opacity: 0.25, rx: 4 }));
      s.appendChild(figRect(200, 45, 40, 80, { fill: 'var(--indigo)', opacity: 0.2, rx: 4 }));
      s.appendChild(figLine(260, 40, 320, 120, { stroke: 'var(--thread-soft)', dash: '4,3' }));
      s.appendChild(figText(75, 132, '500 mL', { size: 10 }));
      s.appendChild(figText(155, 132, '25 kg', { size: 10 }));
      return s;
    },
  }),
  mistake: u2Mistake,
};

/* ---------- U3 time ---------- */

function clockFace(h24: number, m: number, label: string): SVGSVGElement {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const s = figSvg(size, size, label);
  s.appendChild(
    figCircle(cx, cy, cx - 8, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', sw: 2 })
  );
  const ma = m * 6;
  const ha = (h24 % 12) * 30 + m * 0.5;
  s.appendChild(
    figLine(
      cx,
      cy,
      cx + (cx - 28) * Math.cos(((ha - 90) * Math.PI) / 180),
      cy + (cx - 28) * Math.sin(((ha - 90) * Math.PI) / 180),
      { sw: 3 }
    )
  );
  s.appendChild(
    figLine(
      cx,
      cy,
      cx + (cx - 14) * Math.cos(((ma - 90) * Math.PI) / 180),
      cy + (cx - 14) * Math.sin(((ma - 90) * Math.PI) / 180),
      { stroke: 'var(--indigo)', sw: 2 }
    )
  );
  s.appendChild(figCircle(cx, cy, 4, { fill: 'var(--ink)' }));
  return s;
}

/* Draws a clock face inside an existing picture, so the picture stays one SVG. */
function placeClock(
  s: SVGSVGElement,
  h24: number,
  m: number,
  x: number,
  y: number,
  scale = 1
): void {
  const face = clockFace(h24, m, '');
  const g = svg('g', { transform: `translate(${x} ${y}) scale(${scale})` });
  while (face.firstChild) g.appendChild(face.firstChild);
  s.appendChild(g);
}

function u3Prashna(): SVGSVGElement {
  const s = figSvg(W, 130, t('prashna.U3.q'));
  placeClock(s, 21, 30, 135, 0, 0.65);
  const t12 = to12Hour(21, 30);
  s.appendChild(figText(180, 115, t12.formatted, { size: 14, color: 'var(--teal)' }));
  return s;
}

function u3Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(W, H, t('mistake.U3.intro'));
  const wrong = '14:75';
  const right = formatTime24(15, 15);
  s.appendChild(
    figRect(80, 35, 200, 50, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 8 })
  );
  s.appendChild(
    figText(180, 62, reveal ? right : wrong, {
      size: 24,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  if (reveal) {
    s.appendChild(figText(180, 100, '50+25→60', { size: 11, color: 'var(--ink-soft)' }));
  }
  return s;
}

const U3: LessonVisuals = {
  prashna: u3Prashna,
  cards: cardFig({
    what: () => {
      const s = figSvg(W, H, t('bodha.U3.what'));
      placeClock(s, 14, 0, 20, 0);
      s.appendChild(figText(250, 70, '00:00–23:59', { size: 12, color: 'var(--indigo)' }));
      return s;
    },
    idea: () => {
      const s = figSvg(W, 90, t('bodha.U3.idea'));
      s.appendChild(figText(100, 45, '15:00', { size: 18, color: 'var(--indigo)' }));
      s.appendChild(
        figText(220, 45, to12Hour(15, 0).formatted, { size: 18, color: 'var(--teal)' })
      );
      s.appendChild(figText(160, 70, '−12', { size: 14, color: 'var(--kumkum)' }));
      return s;
    },
    why: () => {
      const s = figSvg(W, 90, t('bodha.U3.why'));
      s.appendChild(figText(90, 50, '59', { size: 20 }));
      s.appendChild(figText(130, 50, '→', { size: 18 }));
      s.appendChild(figText(170, 50, '60', { size: 20, color: 'var(--teal)' }));
      s.appendChild(figText(220, 50, '+1', { size: 12, color: 'var(--indigo)' }));
      return s;
    },
    example: (step) => {
      const dur = calculateDuration(9, 45, 12, 15);
      const s = figSvg(W, H, t('bodha.U3.example'));
      const hops = dur.hops.slice(0, step >= 2 ? 3 : step >= 1 ? 2 : 1);
      hops.forEach((hop, i) => {
        s.appendChild(figRect(30, 25 + i * 38, 300, 30, { fill: 'var(--paper-sunk)', rx: 4 }));
        s.appendChild(figText(50, 42 + i * 38, hop.from, { anchor: 'start', size: 11 }));
        s.appendChild(
          figText(310, 42 + i * 38, `+${hop.minutes}`, {
            anchor: 'end',
            size: 11,
            color: 'var(--teal)',
          })
        );
      });
      if (step >= 2) {
        s.appendChild(figText(180, 130, dur.formatted, { size: 13, color: 'var(--indigo)' }));
      }
      return s;
    },
    where: () => {
      const s = figSvg(W, H, t('bodha.U3.where'));
      s.appendChild(
        figRect(40, 40, 120, 70, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 4 })
      );
      s.appendChild(figText(100, 75, formatTime24(21, 30), { size: 14 }));
      s.appendChild(figRect(200, 50, 100, 50, { fill: 'var(--paper-sunk)', rx: 4 }));
      s.appendChild(figLine(160, 75, 200, 75, { stroke: 'var(--teal)', sw: 2 }));
      return s;
    },
  }),
  mistake: u3Mistake,
};

/* ---------- H1 pictograph ---------- */

function pictographRow(
  s: SVGSVGElement,
  icons: number,
  half: boolean,
  key: number,
  y: number
): void {
  for (let i = 0; i < icons; i++) {
    s.appendChild(
      figRect(40 + i * 28, y, 22, 26, {
        fill: 'var(--indigo)',
        opacity: 0.35,
        stroke: 'var(--indigo)',
        rx: 2,
      })
    );
  }
  if (half) {
    s.appendChild(
      figRect(40 + icons * 28, y, 11, 26, {
        fill: 'var(--indigo)',
        opacity: 0.35,
        stroke: 'var(--indigo)',
        rx: 2,
      })
    );
  }
  const total = calculateTotalFromIcons(icons, half ? 1 : 0, key);
  s.appendChild(figText(320, y + 14, total, { anchor: 'end', size: 13, color: 'var(--teal)' }));
}

function h1Prashna(): SVGSVGElement {
  const key = 5;
  const icons = 4;
  const s = figSvg(W, H, t('prashna.H1.q'));
  s.appendChild(figRect(30, 20, 300, 24, { fill: 'var(--paper-sunk)', rx: 4 }));
  s.appendChild(figText(180, 34, `1 = ${key}`, { size: 11, color: 'var(--ink-soft)' }));
  pictographRow(s, icons, false, key, 55);
  s.appendChild(
    figText(180, 120, calculateTotalFromIcons(icons, 0, key), { size: 18, color: 'var(--teal)' })
  );
  return s;
}

function h1Mistake(reveal: boolean): SVGSVGElement {
  const key = 10;
  const icons = 3;
  const s = figSvg(W, H, t('mistake.H1.intro'));
  pictographRow(s, icons, false, key, 40);
  s.appendChild(
    figText(180, 100, reveal ? calculateTotalFromIcons(icons, 0, key) : icons, {
      size: 22,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

const H1: LessonVisuals = {
  prashna: h1Prashna,
  cards: cardFig({
    what: () => {
      const s = figSvg(W, H, t('bodha.H1.what'));
      pictographRow(s, 3, true, 4, 50);
      return s;
    },
    idea: () => {
      const s = figSvg(W, 90, t('bodha.H1.idea'));
      s.appendChild(figRect(120, 25, 120, 28, { fill: 'var(--paper-sunk)', rx: 4 }));
      s.appendChild(figText(180, 41, '1 = 10', { size: 13, color: 'var(--indigo)' }));
      s.appendChild(figRect(150, 60, 22, 26, { fill: 'var(--teal)', opacity: 0.4, rx: 2 }));
      return s;
    },
    why: () => {
      const s = figSvg(W, 90, t('bodha.H1.why'));
      s.appendChild(
        figRect(60, 30, 240, 40, {
          fill: 'var(--paper-raised)',
          stroke: 'var(--thread-soft)',
          rx: 4,
        })
      );
      s.appendChild(figText(90, 55, '×5', { size: 14, color: 'var(--teal)' }));
      s.appendChild(figText(200, 55, '×5', { size: 12, color: 'var(--ink-soft)' }));
      return s;
    },
    example: (step) => {
      const key = 4;
      const s = figSvg(W, H, t('bodha.H1.example'));
      const full = step >= 1 ? 3 : 1;
      const half = step >= 2;
      pictographRow(s, full, half, key, 55);
      if (step >= 2) {
        s.appendChild(
          figText(180, 120, calculateTotalFromIcons(full, half ? 1 : 0, key), {
            size: 16,
            color: 'var(--indigo)',
          })
        );
      }
      return s;
    },
    where: () => {
      const s = figSvg(W, H, t('bodha.H1.where'));
      s.appendChild(
        figRect(50, 35, 260, 80, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 6 })
      );
      pictographRow(s, 2, false, 10, 60);
      return s;
    },
  }),
  mistake: h1Mistake,
};

/* ---------- H2 bar graph ---------- */

function barChart(
  values: number[],
  labels: string[],
  step: number,
  highlight?: number
): SVGSVGElement {
  const s = figSvg(W, H, t('bodha.H2.what'));
  const max = Math.max(...values, step * 5);
  const baseY = 120;
  const barW = 40;
  values.forEach((v, i) => {
    const h = (v / max) * 80;
    const x = 50 + i * (barW + 24);
    const hi = highlight === i;
    s.appendChild(
      figRect(x, baseY - h, barW, h, {
        fill: hi ? 'var(--indigo)' : 'var(--teal)',
        opacity: hi ? 0.55 : 0.35,
        rx: 3,
      })
    );
    s.appendChild(figText(x + barW / 2, baseY + 14, labels[i]!.slice(0, 3), { size: 9 }));
    s.appendChild(figText(x + barW / 2, baseY - h - 8, v, { size: 10, color: 'var(--ink-soft)' }));
  });
  for (let tix = 0; tix <= max; tix += step) {
    const y = baseY - (tix / max) * 80;
    s.appendChild(figLine(40, y, 320, y, { stroke: 'var(--thread-soft)', sw: 1 }));
    s.appendChild(figText(32, y, tix, { anchor: 'end', size: 8 }));
  }
  return s;
}

function h2Prashna(): SVGSVGElement {
  const step = 10;
  const mark = 4;
  const val = readBarValue(mark, step);
  const s = figSvg(W, H, t('prashna.H2.q'));
  const barH = (val / 50) * 70;
  s.appendChild(
    figRect(140, 100 - barH, 50, barH, { fill: 'var(--indigo)', opacity: 0.45, rx: 3 })
  );
  s.appendChild(figText(165, 120, mark, { size: 12 }));
  s.appendChild(figText(280, 60, val, { size: 20, color: 'var(--teal)' }));
  return s;
}

function h2Mistake(reveal: boolean): SVGSVGElement {
  const step = 5;
  const mark = 3;
  const s = figSvg(W, H, t('mistake.H2.intro'));
  s.appendChild(figRect(150, 50, 40, 60, { fill: 'var(--indigo)', opacity: 0.4, rx: 3 }));
  s.appendChild(
    figText(170, 130, reveal ? readBarValue(mark, step) : mark, {
      size: 22,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

const H2: LessonVisuals = {
  prashna: h2Prashna,
  cards: cardFig({
    what: () => barChart([20, 35, 15], ['A', 'B', 'C'], 10),
    idea: () => barChart([10, 25, 40], ['X', 'Y', 'Z'], 5, 2),
    why: () => {
      const s = figSvg(W, 90, t('bodha.H2.why'));
      s.appendChild(figText(100, 45, '0,5,10', { size: 12, anchor: 'start' }));
      s.appendChild(figText(220, 45, '×5', { size: 16, color: 'var(--kumkum)' }));
      return s;
    },
    example: (step) => {
      const cats = ['M', 'B', 'G'];
      const vals = step >= 2 ? [25, 18, 22] : step >= 1 ? [15, 20, 10] : [5, 10, 8];
      return barChart(vals, cats, 5, step >= 1 ? 0 : undefined);
    },
    where: () => {
      const data = FOOD_INTAKE_DATASET.slice(0, 3);
      return barChart(
        data.map((d) => d.count),
        data.map((d) => d.category.slice(0, 1)),
        10
      );
    },
  }),
  mistake: h2Mistake,
};

/* ---------- L4 sequences ---------- */

const ARITH_TERMS = [3, 7, 11, 15];

function sequenceLadder(terms: number[], showNext: boolean): SVGSVGElement {
  const s = figSvg(W, H, t('bodha.L4.what'));
  terms.forEach((term, i) => {
    s.appendChild(
      figCircle(50 + i * 70, 50, 22, {
        fill: 'var(--paper-raised)',
        stroke: 'var(--indigo)',
        sw: 2,
      })
    );
    s.appendChild(figText(50 + i * 70, 50, term, { size: 14 }));
    if (i < terms.length - 1) {
      const d = terms[i + 1]! - term;
      s.appendChild(figText(85 + i * 70, 85, `+${d}`, { size: 11, color: 'var(--teal)' }));
    }
  });
  if (showNext) {
    const next = predictNextTerm(terms);
    s.appendChild(
      figCircle(50 + terms.length * 70, 50, 22, {
        fill: 'var(--paper-sunk)',
        stroke: 'var(--teal)',
        sw: 2,
      })
    );
    s.appendChild(figText(50 + terms.length * 70, 50, next, { size: 14, color: 'var(--teal)' }));
  }
  return s;
}

function l4Prashna(): SVGSVGElement {
  return sequenceLadder(ARITH_TERMS, true);
}

function l4Mistake(reveal: boolean): SVGSVGElement {
  const geom = [2, 4, 8, 16];
  const s = figSvg(W, H, t('mistake.L4.intro'));
  geom.forEach((term, i) => {
    s.appendChild(
      figCircle(50 + i * 70, 55, 20, {
        fill: 'var(--paper-raised)',
        stroke: 'var(--indigo)',
        sw: 1.5,
      })
    );
    s.appendChild(figText(50 + i * 70, 55, term, { size: 12 }));
  });
  const wrong = 16 + 8;
  const right = 16 * 2;
  s.appendChild(
    figText(180, 110, reveal ? right : wrong, {
      size: 20,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

const L4: LessonVisuals = {
  prashna: l4Prashna,
  cards: cardFig({
    what: () => sequenceLadder(ARITH_TERMS, false),
    idea: () => {
      const diffs = findFirstDifferences(ARITH_TERMS);
      const s = figSvg(W, H, t('bodha.L4.idea'));
      diffs.forEach((d, i) => {
        s.appendChild(figRect(70 + i * 80, 70, 40, 24, { fill: 'var(--paper-sunk)', rx: 4 }));
        s.appendChild(figText(90 + i * 80, 82, d, { size: 13, color: 'var(--teal)' }));
      });
      return s;
    },
    why: () => {
      const arith = isArithmeticSequence(ARITH_TERMS);
      const s = figSvg(W, 90, t('bodha.L4.why'));
      s.appendChild(
        figText(180, 50, arith.commonDifference ?? 0, { size: 22, color: 'var(--indigo)' })
      );
      return s;
    },
    example: (step) => {
      const terms = step >= 1 ? ARITH_TERMS : ARITH_TERMS.slice(0, 3);
      return sequenceLadder(terms, step >= 2);
    },
    where: () => {
      const s = figSvg(W, H, t('bodha.L4.where'));
      [7, 14, 21].forEach((d, i) => {
        s.appendChild(figText(80 + i * 80, 60, d, { size: 14 }));
      });
      s.appendChild(figText(180, 100, '+7', { size: 12, color: 'var(--teal)' }));
      return s;
    },
  }),
  mistake: l4Mistake,
};

/* ---------- P1 growing patterns ---------- */

function dotTriangle(stage: number, glowLayer?: number): SVGSVGElement {
  const dots = generateTriangularDots(stage);
  const cell = 14;
  const s = figSvg(W, H, t('bodha.P1.what'));
  dots.forEach((d) => {
    const cx = 180 - (d.row * cell) / 2 + d.col * cell;
    const cy = 30 + d.row * cell;
    const glow = glowLayer !== undefined && d.layer === glowLayer;
    s.appendChild(
      figCircle(cx, cy, 5, {
        fill: glow ? 'var(--kumkum)' : 'var(--indigo)',
        opacity: glow ? 0.9 : 0.45,
      })
    );
  });
  return s;
}

function squareGrid(stage: number): SVGSVGElement {
  const s = figSvg(W, H, t('bodha.P1.why'));
  const cell = 18;
  const ox = 180 - (stage * cell) / 2;
  for (let r = 1; r <= stage; r++) {
    for (let c = 1; c <= stage; c++) {
      s.appendChild(
        figRect(ox + (c - 1) * cell, 30 + (r - 1) * cell, cell - 2, cell - 2, {
          fill: 'var(--teal)',
          opacity: 0.35,
          rx: 2,
        })
      );
    }
  }
  s.appendChild(
    figText(180, 30 + stage * cell + 16, squareNumber(stage), { size: 13, color: 'var(--indigo)' })
  );
  return s;
}

function p1Prashna(): SVGSVGElement {
  const s = dotTriangle(4);
  s.appendChild(figText(180, 130, triangularNumber(4), { size: 16, color: 'var(--teal)' }));
  return s;
}

function p1Mistake(reveal: boolean): SVGSVGElement {
  const stage = 5;
  const s = squareGrid(4);
  s.appendChild(
    figText(180, 140, reveal ? squareNumber(stage) : stage * 2, {
      size: 20,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

const P1: LessonVisuals = {
  prashna: p1Prashna,
  cards: cardFig({
    what: () => dotTriangle(3),
    idea: () => dotTriangle(3, 3),
    why: () => squareGrid(3),
    example: (step) => {
      if (step >= 2) return dotTriangle(4, 4);
      if (step >= 1) return dotTriangle(3, 3);
      return dotTriangle(1, 1);
    },
    where: () => {
      const s = figSvg(W, H, t('bodha.P1.where'));
      s.appendChild(
        figGrid(120, 40, 5, 3, 12, (c, r) => (c === r ? 'var(--indigo)' : 'var(--paper-sunk)'))
      );
      return s;
    },
  }),
  mistake: p1Mistake,
};

export const MEASURE: VisualsTable = {
  U2,
  U3,
  H1,
  H2,
  L4,
  P1,
};
