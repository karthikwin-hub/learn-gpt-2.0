/**
 * Pictures for the Ganita lessons F1 F2 F3 F4 M1 M3.
 */

import { findAllFactors, findFactorPairs, arrangeTiles } from '../../domain/math/factors';
import { isPrime, sievePrimesUpTo } from '../../domain/math/primes';
import {
  getDigits,
  getDigitSumSteps,
  sumOfDigits,
  testDivisibility,
} from '../../domain/math/divisibility';
import { classifyVennFactors } from '../../domain/math/hcf';
import { rotateArrayDimensions } from '../../domain/math/rect';
import { t } from '../../domain/i18n/core';
import { figCircle, figGrid, figLine, figPath, figRect, figSvg, figText } from '../diagrams/fig';
import { renderM2Tiles } from '../diagrams/tiles';
import type { LessonVisuals, VisualsTable } from './types';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const KUM = 'var(--kumkum)';
const INK = 'var(--ink)';
const SOFT = 'var(--ink-soft)';
const PAPER = 'var(--paper-raised)';
const SUNK = 'var(--paper-sunk)';

function tileGrid(total: number, rows: number, label: string, highlight = false): SVGSVGElement {
  const { columns, isValid, remainder } = arrangeTiles(total, rows);
  const cols = isValid ? columns : Math.max(1, columns);
  const cell = Math.min(22, 200 / Math.max(cols, rows));
  const h = rows * cell + (remainder > 0 ? cell + 16 : 0) + 36;
  const s = figSvg(360, h, label);
  const x0 = (360 - cols * cell) / 2;
  const y0 = 28;
  s.appendChild(figGrid(x0, y0, cols, rows, cell, () => (isValid ? 'var(--teal-soft)' : SUNK)));
  if (remainder > 0) {
    for (let i = 0; i < remainder; i++) {
      s.appendChild(
        figRect(x0 + i * (cell + 4), y0 + rows * cell + 8, cell, cell, {
          fill: KUM,
          stroke: KUM,
          rx: 3,
        })
      );
    }
  }
  if (highlight) {
    s.appendChild(
      figRect(x0 - 4, y0 - 4, cols * cell + 8, rows * cell + 8, {
        fill: 'none',
        stroke: IND,
        sw: 2,
        dash: '4 3',
      })
    );
  }
  s.appendChild(figText(180, 14, label, { size: 13, color: INK }));
  return s;
}

function rainbowPairs(n: number): SVGSVGElement {
  const factors = findAllFactors(n);
  const pairs = findFactorPairs(n);
  const s = figSvg(360, 140, t('factors.art'));
  const xs = factors.map((_, i) => 40 + i * (280 / Math.max(factors.length - 1, 1)));
  const colors = [IND, TEAL, 'var(--thread-soft)'];
  pairs.forEach(([a, b], i) => {
    const i1 = factors.indexOf(a);
    const i2 = factors.indexOf(b);
    const x1 = xs[i1] ?? 40;
    const x2 = xs[i2] ?? 320;
    const lift = 90 - i * 22;
    s.appendChild(
      figPath(`M ${x1} 110 Q ${(x1 + x2) / 2} ${110 - lift} ${x2} 110`, {
        fill: 'none',
        stroke: colors[i % colors.length],
        sw: 2.5,
      })
    );
  });
  factors.forEach((f, i) => {
    const x = xs[i] ?? 40;
    s.appendChild(figCircle(x, 118, 14, { fill: PAPER, stroke: IND, sw: 1.5 }));
    s.appendChild(figText(x, 118, f, { size: 12, weight: 700 }));
  });
  return s;
}

function f1Cards(): LessonVisuals['cards'] {
  return {
    what: () => tileGrid(12, 3, '3 × 4', true),
    idea: () => tileGrid(12, 2, '2 × 6'),
    why: () => {
      const s = figSvg(360, 120, t('bodha.F1.why'));
      s.appendChild(figText(70, 60, '3', { color: IND, size: 18 }));
      s.appendChild(figText(290, 60, '6', { color: TEAL, size: 18 }));
      s.appendChild(figPath('M 95 60 Q 180 20 265 60', { stroke: TEAL, sw: 2, fill: 'none' }));
      s.appendChild(figText(180, 38, '×', { size: 16 }));
      s.appendChild(figText(180, 95, '3 × 6 = 18', { size: 14, color: SOFT }));
      return s;
    },
    example: (step) => {
      if (step <= 0) return tileGrid(20, 1, '1 × 20');
      if (step === 1) return tileGrid(20, 2, '2 × 10');
      return tileGrid(20, 4, '4 × 5');
    },
    where: () => {
      const s = figSvg(360, 110, t('bodha.F1.where'));
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 5; c++) {
          s.appendChild(
            figRect(40 + c * 28, 30 + r * 22, 24, 18, {
              fill: 'var(--teal-soft)',
              stroke: SOFT,
            })
          );
        }
      }
      s.appendChild(figText(180, 100, '5 × 3', { size: 13, color: INK }));
      return s;
    },
  };
}

function f1Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 130, t('mistake.F1.intro'));
  const listed = [1, 2, 3, 6];
  const missing = [9, 18];
  listed.forEach((f, i) => {
    s.appendChild(
      figRect(30 + i * 44, 40, 36, 36, {
        fill: PAPER,
        stroke: IND,
        rx: 6,
      })
    );
    s.appendChild(figText(48 + i * 44, 58, f, { size: 14 }));
  });
  if (reveal) {
    missing.forEach((f, i) => {
      s.appendChild(
        figRect(210 + i * 44, 40, 36, 36, {
          fill: 'var(--kumkum-soft, var(--paper-sunk))',
          stroke: KUM,
          sw: 2,
          rx: 6,
          dash: '4 2',
        })
      );
      s.appendChild(figText(228 + i * 44, 58, f, { size: 14, color: KUM }));
    });
    s.appendChild(figText(180, 105, t('mistake.F1.found'), { size: 11, color: SOFT }));
  }
  return s;
}

function f2Prashna(): SVGSVGElement {
  return tileGrid(7, 1, '1 × 7');
}

function f2Cards(): LessonVisuals['cards'] {
  return {
    what: () => tileGrid(7, 1, '7 prime'),
    idea: () => {
      const s = figSvg(360, 100, t('bodha.F2.idea'));
      s.appendChild(figText(100, 50, '1', { color: SOFT }));
      s.appendChild(figText(260, 50, '7', { color: IND }));
      s.appendChild(figLine(130, 50, 230, 50, { stroke: TEAL, sw: 2 }));
      s.appendChild(figText(180, 78, '1 · 7', { size: 12, color: INK }));
      return s;
    },
    why: () => {
      const s = figSvg(360, 110, t('bodha.F2.why'));
      s.appendChild(figCircle(90, 55, 22, { fill: SUNK, stroke: SOFT }));
      s.appendChild(figText(90, 55, '1', { size: 16 }));
      s.appendChild(figCircle(180, 55, 22, { fill: 'var(--teal-soft)', stroke: TEAL, sw: 2 }));
      s.appendChild(figText(180, 55, '2', { size: 16 }));
      s.appendChild(figText(180, 95, '2', { size: 14, color: TEAL, weight: 700 }));
      return s;
    },
    example: (step) => {
      const s = figSvg(360, 160, t('bodha.F2.example'));
      const primes = sievePrimesUpTo(30);
      const show = step >= 2 ? primes : primes.filter((p) => p <= 10 + step * 5);
      show.slice(0, 12).forEach((p, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        s.appendChild(
          figRect(40 + col * 48, 36 + row * 40, 40, 32, {
            fill: p === 1 ? SUNK : 'var(--leaf-soft)',
            stroke: isPrime(p) ? TEAL : SOFT,
            rx: 4,
          })
        );
        s.appendChild(figText(60 + col * 48, 52 + row * 40, p, { size: 13 }));
      });
      return s;
    },
    where: () => {
      const s = figSvg(360, 100, t('bodha.F2.where'));
      s.appendChild(figText(180, 40, '13 · 17', { size: 20, color: IND }));
      s.appendChild(figText(180, 70, '…', { size: 16, color: SOFT }));
      return s;
    },
  };
}

function f2Mistake(reveal: boolean): SVGSVGElement {
  const s = tileGrid(9, 3, '3 × 3');
  s.setAttribute('aria-label', t('mistake.F2.intro'));
  if (reveal) {
    s.appendChild(
      figRect(200, 24, 140, 36, {
        fill: 'none',
        stroke: KUM,
        sw: 2.5,
        dash: '5 3',
      })
    );
    s.appendChild(figText(270, 42, '3 × 3 = 9', { size: 13, color: KUM }));
  }
  return s;
}

function drawDigits(s: SVGSVGElement, n: number, highlightLast: boolean): void {
  const digits = getDigits(n);
  digits.forEach((d, i) => {
    const last = i === digits.length - 1;
    s.appendChild(
      figRect(80 + i * 44, 24, 40, 44, {
        fill: highlightLast && last ? 'var(--thread-soft)' : PAPER,
        stroke: highlightLast && last ? KUM : SOFT,
        rx: 4,
      })
    );
    s.appendChild(figText(100 + i * 44, 46, d, { size: 18, weight: 700 }));
  });
}

function digitRow(n: number, highlightLast = false): SVGSVGElement {
  const s = figSvg(360, 80, String(n));
  drawDigits(s, n, highlightLast);
  return s;
}

function f3Cards(): LessonVisuals['cards'] {
  return {
    what: () => digitRow(5232, true),
    idea: () => {
      const s = figSvg(360, 120, t('bodha.F3.idea'));
      s.appendChild(figText(100, 40, '2, 5, 10', { size: 12, color: IND }));
      s.appendChild(figText(260, 40, '3, 9', { size: 12, color: TEAL }));
      s.appendChild(figLine(180, 50, 180, 90, { stroke: SOFT, sw: 1 }));
      s.appendChild(figText(100, 80, '2, 5, 10', { size: 11, color: SOFT }));
      s.appendChild(figText(260, 80, '3, 9', { size: 11, color: SOFT }));
      return s;
    },
    why: () => {
      const s = figSvg(360, 110, t('bodha.F3.why'));
      s.appendChild(figText(120, 50, '10 = 9 + 1', { size: 13 }));
      s.appendChild(figText(240, 50, '100 = 99 + 1', { size: 13 }));
      s.appendChild(figText(180, 85, '9 + 1', { size: 11, color: SOFT }));
      return s;
    },
    example: (step) => {
      const n = 5232;
      if (step <= 0) return digitRow(n, true);
      const { sumExpression } = getDigitSumSteps(n);
      const s = figSvg(360, 100, sumExpression);
      s.appendChild(figText(180, 50, sumExpression, { size: 14, weight: 700 }));
      if (step >= 2) {
        const r9 = testDivisibility(n, 9);
        s.appendChild(
          figText(180, 78, r9.passes ? '9' : '7', {
            size: 12,
            color: r9.passes ? TEAL : SOFT,
          })
        );
      }
      if (step >= 3) {
        s.appendChild(figText(180, 92, '6', { size: 11, color: IND }));
      }
      return s;
    },
    where: () => digitRow(43, true),
  };
}

function f3Mistake(reveal: boolean): SVGSVGElement {
  const n = 43;
  const s = figSvg(360, 120, t('mistake.F3.intro'));
  drawDigits(s, n, true);
  if (reveal) {
    const sum = `${getDigits(n).join(' + ')} = ${sumOfDigits(n)}`;
    s.appendChild(figText(180, 100, sum, { size: 14, color: KUM, weight: 700 }));
  }
  return s;
}

function vennMini(a: number, b: number): SVGSVGElement {
  const v = classifyVennFactors(a, b);
  const s = figSvg(360, 130, `HCF ${v.hcf}`);
  s.appendChild(
    figCircle(130, 65, 52, { fill: 'var(--indigo-soft)', stroke: IND, sw: 1.5, opacity: 0.9 })
  );
  s.appendChild(
    figCircle(230, 65, 52, { fill: 'var(--teal-soft)', stroke: TEAL, sw: 1.5, opacity: 0.9 })
  );
  s.appendChild(figText(180, 65, v.hcf, { size: 20, weight: 700, color: KUM }));
  return s;
}

function f4Cards(): LessonVisuals['cards'] {
  return {
    what: () => vennMini(12, 18),
    idea: () => vennMini(16, 24),
    why: () => {
      const s = figSvg(360, 90, t('bodha.F4.why'));
      for (let i = 0; i < 2; i++) {
        s.appendChild(figRect(40 + i * 140, 40, 120, 14, { fill: TEAL, rx: 3 }));
      }
      for (let i = 0; i < 3; i++) {
        s.appendChild(figRect(220 + i * 40, 58, 36, 14, { fill: IND, rx: 3 }));
      }
      s.appendChild(figText(180, 78, '6', { size: 14, color: SOFT, weight: 700 }));
      return s;
    },
    example: (step) => {
      const a = 16;
      const b = 24;
      const v = classifyVennFactors(a, b);
      if (step <= 0) {
        const s = figSvg(360, 80, t('bodha.F4.example1'));
        s.appendChild(figText(180, 45, v.onlyA.concat(v.common).join(', '), { size: 12 }));
        return s;
      }
      if (step === 1) {
        const s = figSvg(360, 80, t('bodha.F4.example2'));
        s.appendChild(figText(180, 45, findAllFactors(b).join(', '), { size: 11 }));
        return s;
      }
      return vennMini(a, b);
    },
    where: () => {
      const s = figSvg(360, 100, t('bodha.F4.where'));
      s.appendChild(figRect(60, 35, 240, 50, { fill: 'var(--teal-soft)', stroke: SOFT, rx: 4 }));
      s.appendChild(figText(180, 62, '12 / 18', { size: 14 }));
      return s;
    },
  };
}

function f4Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 120, t('mistake.F4.intro'));
  s.appendChild(figText(120, 50, '2', { size: 18, color: SOFT }));
  if (reveal) {
    s.appendChild(figText(240, 50, '4', { size: 22, color: KUM, weight: 700 }));
    s.appendChild(figText(180, 85, '4', { size: 16, color: KUM, weight: 700 }));
  }
  return s;
}

function m1M3SharedCards(knot: 'M1' | 'M3'): LessonVisuals['cards'] {
  const exRows = knot === 'M1' ? 3 : 3;
  const exCols = knot === 'M1' ? 8 : 8;
  return {
    what: () => renderM2Tiles(4, 5, 4, false),
    idea: () => renderM2Tiles(4, 5, 5, true),
    why: () => {
      const before = renderM2Tiles(4, 5, 5, true);
      return before;
    },
    example: (step) => {
      if (step <= 0) return renderM2Tiles(exRows, exCols, exRows, true);
      if (step === 1) return renderM2Tiles(exCols, exRows, exCols, true);
      return renderM2Tiles(exCols, exRows, exCols, true);
    },
    where: () => renderM2Tiles(3, 4, 3, false),
  };
}

function m1Prashna(): SVGSVGElement {
  return renderM2Tiles(3, 8, 3, false);
}

function m1Mistake(reveal: boolean): SVGSVGElement {
  const s = renderM2Tiles(8, 3, 8, true);
  s.setAttribute('aria-label', t('mistake.M1.intro'));
  if (reveal) {
    s.appendChild(
      figPath('M 280 30 L 320 70 L 280 110', {
        fill: 'none',
        stroke: KUM,
        sw: 2,
      })
    );
    s.appendChild(figText(300, 70, '↻', { size: 20, color: KUM }));
  }
  return s;
}

function m3Cards(): LessonVisuals['cards'] {
  const base = m1M3SharedCards('M3');
  return {
    ...base,
    why: () => {
      const rot = rotateArrayDimensions(3, 8);
      const s = figSvg(360, 120, t('bodha.M3.why'));
      s.appendChild(figText(100, 50, '3 × 8', { color: IND }));
      s.appendChild(figText(260, 50, `${rot.rows} × ${rot.cols}`, { color: TEAL }));
      s.appendChild(figText(180, 90, String(rot.total), { size: 16, weight: 700 }));
      return s;
    },
  };
}

export const FACTORS: VisualsTable = {
  F1: {
    prashna: () => rainbowPairs(12),
    cards: f1Cards(),
    mistake: f1Mistake,
  },
  F2: {
    prashna: f2Prashna,
    cards: f2Cards(),
    mistake: f2Mistake,
  },
  F3: {
    prashna: () => digitRow(5232, true),
    cards: f3Cards(),
    mistake: f3Mistake,
  },
  F4: {
    prashna: () => vennMini(12, 18),
    cards: f4Cards(),
    mistake: f4Mistake,
  },
  M1: {
    prashna: m1Prashna,
    cards: m1M3SharedCards('M1'),
    mistake: m1Mistake,
  },
  M3: {
    cards: m3Cards(),
  },
};
