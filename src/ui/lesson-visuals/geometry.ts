/**
 * Pictures for the Ganita lessons G1 G3 G5 G6 G7 G8, and the G2 G4 mistake pictures.
 */

import { arcCoordinates, getAngleInfo } from '../../domain/math/angles';
import { compareChordToDiameter, diameterFromRadius } from '../../domain/math/circle';
import { detectFaceCollisions, type GridSquare } from '../../domain/math/cubenet';
import { parallelogramArea, shearDecomposition } from '../../domain/math/shear';
import { TOTAL_TANGRAM_UNITS } from '../../domain/math/tangram';
import { projectOrthographicViews, STRUCTURE_PRESETS } from '../../domain/math/views';
import { t } from '../../domain/i18n/core';
import { plainText } from '../util/markup';
import { renderG2Ropes, renderG4Flower } from '../diagrams/geometry';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../diagrams/fig';
import { svg as domSvg } from '../util/dom';
import type { LessonVisuals, VisualsTable } from './types';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const INK = 'var(--ink)';
const INK_SOFT = 'var(--ink-soft)';
const KUM = 'var(--kumkum)';
const PAPER = 'var(--paper-raised)';
const SUNK = 'var(--paper-sunk)';
const THREAD = 'var(--thread-soft)';

function drawClock(
  s: SVGSVGElement,
  cx: number,
  cy: number,
  r: number,
  handLen: number,
  caption: string
): void {
  s.appendChild(figCircle(cx, cy, r, { fill: PAPER, stroke: INK_SOFT, sw: 2 }));
  s.appendChild(figLine(cx, cy, cx, cy - handLen, { stroke: IND, sw: 3 }));
  s.appendChild(figLine(cx, cy, cx + handLen, cy, { stroke: IND, sw: 3 }));
  s.appendChild(figCircle(cx, cy, 4, { fill: INK }));
  const arc = arcCoordinates(cx, cy, r * 0.35, 90);
  if (arc) {
    s.appendChild(
      figPath(`${arc} L ${cx} ${cy} Z`, {
        fill: 'var(--indigo-soft)',
        stroke: TEAL,
        sw: 1.5,
        opacity: 0.85,
      })
    );
  }
  s.appendChild(figText(cx, cy + r + 16, caption, { size: 12, color: INK_SOFT }));
  s.appendChild(figText(cx, cy + r + 32, '90°', { size: 14, color: TEAL }));
}

function g1Prashna(): SVGSVGElement {
  const s = figSvg(360, 150, t('prashna.G1.q'));
  drawClock(s, 95, 72, 58, 48, '60');
  drawClock(s, 265, 72, 28, 22, '1');
  s.appendChild(figText(180, 138, '90° = 90°', { size: 11, color: INK_SOFT }));
  return s;
}

function rayTurn(cx: number, cy: number, deg: number, arm: number): SVGGElement {
  const g = domSvg('g') as SVGGElement;
  const rad = (deg * Math.PI) / 180;
  const arc = arcCoordinates(cx, cy, Math.min(36, arm * 0.35), deg);
  g.appendChild(figLine(cx, cy, cx + arm, cy, { stroke: INK_SOFT, sw: 2.5 }));
  if (arc) {
    g.appendChild(
      figPath(`${arc} L ${cx} ${cy} Z`, {
        fill: 'var(--indigo-soft)',
        stroke: IND,
        sw: 1.5,
      })
    );
  }
  g.appendChild(
    figLine(cx, cy, cx + arm * Math.cos(rad), cy - arm * Math.sin(rad), {
      stroke: IND,
      sw: 3,
    })
  );
  g.appendChild(figCircle(cx, cy, 5, { fill: INK }));
  return g;
}

function g1Cards(): LessonVisuals['cards'] {
  return {
    what: () => {
      const s = figSvg(360, 120, plainText(t('bodha.G1.what')));
      const info = getAngleInfo(45);
      s.appendChild(rayTurn(100, 80, 45, 70));
      s.appendChild(figText(100, 108, `${info.degrees}°`, { size: 13, color: TEAL }));
      s.appendChild(figText(260, 40, t('gloss.angle.en'), { size: 14, color: IND }));
      return s;
    },
    idea: () => {
      const s = figSvg(360, 130, plainText(t('bodha.G1.idea')));
      s.appendChild(figCircle(180, 70, 52, { fill: PAPER, stroke: INK_SOFT, sw: 1.5 }));
      for (let h = 0; h < 12; h++) {
        const a = (h * Math.PI) / 6 - Math.PI / 2;
        s.appendChild(
          figLine(
            180 + 44 * Math.cos(a),
            70 + 44 * Math.sin(a),
            180 + 50 * Math.cos(a),
            70 + 50 * Math.sin(a),
            { stroke: INK_SOFT, sw: 1 }
          )
        );
      }
      s.appendChild(figLine(180, 70, 180, 28, { stroke: IND, sw: 3 }));
      s.appendChild(
        figPath('M 200 70 A 20 20 0 0 0 180 50', {
          fill: 'none',
          stroke: TEAL,
          sw: 2,
        })
      );
      s.appendChild(figText(180, 118, '1/4', { size: 14, color: TEAL }));
      return s;
    },
    why: () => {
      const s = figSvg(360, 140, plainText(t('bodha.G1.why')));
      s.appendChild(rayTurn(70, 95, 90, 35));
      s.appendChild(rayTurn(180, 95, 90, 75));
      s.appendChild(figText(125, 125, '90°', { size: 16, color: TEAL }));
      s.appendChild(figText(180, 125, '90°', { size: 16, color: TEAL }));
      s.appendChild(figText(290, 50, '15°', { size: 13, color: INK_SOFT }));
      s.appendChild(figText(290, 72, '60°', { size: 13, color: INK_SOFT }));
      return s;
    },
    example: (step: number) => {
      const s = figSvg(360, 130, plainText(t('bodha.G1.example')));
      const turns = [
        { deg: 90, label: '90°' },
        { deg: 180, label: '180°' },
        { deg: 360, label: '360°' },
      ];
      const idx = Math.min(Math.max(step, 1), 3) - 1;
      const t0 = turns[idx] ?? turns[0]!;
      s.appendChild(figCircle(180, 68, 48, { fill: PAPER, stroke: INK_SOFT, sw: 1.5 }));
      const rad = (t0.deg * Math.PI) / 180;
      s.appendChild(figLine(180, 68, 180, 24, { stroke: IND, sw: 2.5 }));
      if (t0.deg < 360) {
        s.appendChild(
          figLine(180, 68, 180 + 44 * Math.cos(rad), 68 - 44 * Math.sin(rad), {
            stroke: IND,
            sw: 2.5,
          })
        );
      }
      const arc = arcCoordinates(180, 68, 30, Math.min(t0.deg, 359.9));
      if (arc) {
        s.appendChild(
          figPath(`${arc} L 180 68 Z`, { fill: 'var(--indigo-soft)', stroke: TEAL, sw: 1.2 })
        );
      }
      s.appendChild(figText(180, 118, t0.label, { size: 18, color: TEAL }));
      return s;
    },
    where: () => {
      const s = figSvg(360, 100, plainText(t('bodha.G1.where')));
      s.appendChild(figPath('M 40 70 L 40 30 L 100 30', { fill: 'none', stroke: IND, sw: 2 }));
      s.appendChild(figLine(130, 70, 200, 30, { stroke: TEAL, sw: 2 }));
      s.appendChild(figLine(230, 70, 290, 30, { stroke: IND, sw: 2 }));
      s.appendChild(figCircle(320, 50, 18, { fill: PAPER, stroke: INK_SOFT, sw: 1.5 }));
      s.appendChild(figLine(320, 50, 320, 36, { stroke: IND, sw: 2 }));
      s.appendChild(figLine(320, 50, 332, 50, { stroke: IND, sw: 2 }));
      return s;
    },
  };
}

function g1Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 120, t('mistake.G1.intro'));
  const doorDeg = 15;
  const boxDeg = 60;
  s.appendChild(figPath('M 50 90 L 50 40 L 110 40', { fill: 'none', stroke: INK_SOFT, sw: 2 }));
  s.appendChild(figText(80, 105, `${doorDeg}°`, { size: 12, color: INK_SOFT }));
  s.appendChild(figPath('M 200 95 L 200 55 L 250 55', { fill: 'none', stroke: INK_SOFT, sw: 2 }));
  s.appendChild(figText(225, 105, `${boxDeg}°`, { size: 12, color: INK_SOFT }));
  if (reveal) {
    s.appendChild(figText(280, 55, `${boxDeg}° > ${doorDeg}°`, { size: 14, color: KUM }));
    s.appendChild(
      figText(280, 78, t('mistake.G1.found').slice(0, 28), { size: 9, color: INK_SOFT })
    );
  }
  return s;
}

function g2Prashna(): SVGSVGElement {
  return renderG2Ropes(
    [
      [11, 1],
      [6, 6],
    ],
    true
  );
}

function g2Mistake(reveal: boolean): SVGSVGElement {
  const s = renderG2Ropes(
    [
      [10, 2],
      [6, 6],
    ],
    true
  );
  if (reveal) {
    s.appendChild(figText(180, 18, '20 / 36', { size: 13, color: KUM }));
  }
  return s;
}

function shearFigure(base: number, height: number, offset: number, cut: boolean): SVGSVGElement {
  const s = figSvg(360, 160, plainText(t('bodha.G3.what')));
  const scale = 22;
  const yB = 130;
  const yT = yB - height * scale;
  const x0 = 50;
  const xBL = x0;
  const xBR = x0 + base * scale;
  const xTL = xBL + offset * scale;
  const xTR = xBR + offset * scale;
  s.appendChild(figLine(30, yT, 330, yT, { stroke: INK_SOFT, sw: 1, dash: '4 4' }));
  if (!cut || offset === 0) {
    s.appendChild(
      figPath(`M ${xBL} ${yB} L ${xBR} ${yB} L ${xTR} ${yT} L ${xTL} ${yT} Z`, {
        fill: 'var(--indigo-soft)',
        stroke: IND,
        sw: 2,
      })
    );
  } else {
    s.appendChild(
      figPath(`M ${xBL} ${yB} L ${xBR} ${yB} L ${xBR} ${yT} L ${xTL} ${yT} Z`, {
        fill: 'var(--indigo-soft)',
        stroke: IND,
        sw: 2,
      })
    );
    s.appendChild(
      figPath(`M ${xBL} ${yB} L ${xTL} ${yT} L ${xBL} ${yT} Z`, {
        fill: SUNK,
        stroke: KUM,
        sw: 1.5,
      })
    );
  }
  s.appendChild(
    figText((xBL + xBR) / 2, yB + 16, `${base} × ${height} = ${parallelogramArea(base, height)}`, {
      size: 12,
      color: TEAL,
    })
  );
  return s;
}

function g3Prashna(): SVGSVGElement {
  return shearFigure(6, 4, 2, false);
}

function g3Cards(): LessonVisuals['cards'] {
  return {
    what: () => shearFigure(6, 4, 0, false),
    idea: () => shearFigure(6, 4, 2, false),
    why: () => shearFigure(6, 4, 2, true),
    example: (step: number) => {
      const off = step >= 2 ? 3 : step >= 1 ? 1.5 : 0;
      return shearFigure(6, 4, off, step >= 3);
    },
    where: () => {
      const s = figSvg(360, 100, plainText(t('bodha.G3.where')));
      for (let i = 0; i < 5; i++) {
        s.appendChild(
          figRect(40 + i * 8, 70 - i * 4, 50, 8, {
            fill: PAPER,
            stroke: INK_SOFT,
            sw: 1,
            rx: 1,
          })
        );
      }
      s.appendChild(figLine(260, 75, 320, 45, { stroke: THREAD, sw: 3 }));
      return s;
    },
  };
}

function g3Mistake(reveal: boolean): SVGSVGElement {
  const d = shearDecomposition(6, 4, 2);
  const s = shearFigure(6, 4, 2, false);
  s.appendChild(
    figText(180, 18, reveal ? `6 × 4 = ${d.area}` : '6 × 5 = 30', {
      size: 14,
      color: reveal ? TEAL : KUM,
    })
  );
  return s;
}

function netGrid(squares: GridSquare[], highlight?: number[]): SVGSVGElement {
  const xs = squares.map((q) => q.x);
  const ys = squares.map((q) => q.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const cell = 36;
  const w = (maxX - minX + 1) * cell + 40;
  const h = (maxY - minY + 1) * cell + 50;
  const s = figSvg(Math.max(360, w), h, plainText(t('bodha.G5.what')));
  squares.forEach((sq, i) => {
    const x = 20 + (sq.x - minX) * cell;
    const y = 20 + (sq.y - minY) * cell;
    const hi = highlight?.includes(i);
    s.appendChild(
      figRect(x, y, cell - 4, cell - 4, {
        fill: hi ? 'var(--indigo-soft)' : PAPER,
        stroke: hi ? KUM : IND,
        sw: hi ? 2.5 : 1.5,
        rx: 2,
      })
    );
  });
  return s;
}

const T_NET: GridSquare[] = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 2, y: 0 },
  { x: 2, y: 2 },
];

const BLOCK_2X3: GridSquare[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
];

function g5Prashna(): SVGSVGElement {
  const s = netGrid(BLOCK_2X3);
  s.appendChild(figText(180, s.viewBox.baseVal.height - 8, '2 × 3', { size: 12, color: KUM }));
  return s;
}

function g5Cards(): LessonVisuals['cards'] {
  return {
    what: () => netGrid(T_NET),
    idea: () => netGrid(T_NET),
    why: () => {
      const s = netGrid(BLOCK_2X3, [0, 1, 2, 3]);
      s.appendChild(
        figText(180, 12, plainText(t('bodha.G5.why')).slice(0, 36), { size: 10, color: INK_SOFT })
      );
      return s;
    },
    example: (step: number) => {
      if (step >= 3) return netGrid(T_NET);
      if (step >= 2) return netGrid(BLOCK_2X3, detectFaceCollisions(BLOCK_2X3).overlaps);
      return netGrid(T_NET.slice(0, 4));
    },
    where: () => {
      const s = figSvg(360, 90, plainText(t('bodha.G5.where')));
      s.appendChild(figRect(80, 30, 80, 50, { fill: SUNK, stroke: THREAD, sw: 2, rx: 2 }));
      s.appendChild(figRect(200, 35, 24, 24, { fill: PAPER, stroke: INK_SOFT, sw: 1.5, rx: 1 }));
      s.appendChild(figRect(240, 35, 24, 24, { fill: PAPER, stroke: INK_SOFT, sw: 1.5, rx: 1 }));
      return s;
    },
  };
}

function g5Mistake(reveal: boolean): SVGSVGElement {
  const s = netGrid(BLOCK_2X3, reveal ? detectFaceCollisions(BLOCK_2X3).overlaps : undefined);
  if (reveal) {
    s.appendChild(figText(180, 14, t('mistake.G5.found').slice(0, 32), { size: 9, color: KUM }));
  }
  return s;
}

function circleDiagram(r: number, offset: number): SVGSVGElement {
  const s = figSvg(360, 150, plainText(t('bodha.G6.what')));
  const cx = 180;
  const cy = 75;
  const scale = 10;
  const R = r * scale;
  s.appendChild(figCircle(cx, cy, R, { fill: PAPER, stroke: INK_SOFT, sw: 2 }));
  s.appendChild(figLine(cx, cy, cx + R, cy, { stroke: IND, sw: 2.5 }));
  s.appendChild(figText(cx + R / 2, cy - 8, `r = ${r}`, { size: 12, color: TEAL }));
  const comp = compareChordToDiameter(r, offset);
  const yOff = offset * scale;
  s.appendChild(
    figLine(cx - R, cy - yOff, cx + R, cy - yOff, {
      stroke: comp.isDiameter ? IND : KUM,
      sw: comp.isDiameter ? 2.5 : 2,
      dash: comp.isDiameter ? undefined : '5 4',
    })
  );
  s.appendChild(
    figText(cx, cy + R + 18, `d = ${comp.diameter}`, {
      size: 13,
      color: comp.isDiameter ? TEAL : INK_SOFT,
    })
  );
  return s;
}

function g6Prashna(): SVGSVGElement {
  const s = figSvg(360, 130, t('prashna.G6.q'));
  const cx = 180;
  const cy = 65;
  s.appendChild(figCircle(cx, cy, 55, { fill: PAPER, stroke: INK_SOFT, sw: 2 }));
  s.appendChild(figLine(cx, cy, cx + 55, cy, { stroke: IND, sw: 3 }));
  s.appendChild(figText(cx + 28, cy - 10, '30 cm', { size: 12, color: TEAL }));
  s.appendChild(figLine(cx - 55, cy, cx + 55, cy, { stroke: TEAL, sw: 2, dash: '4 3' }));
  s.appendChild(figText(cx, cy + 72, `d = ${diameterFromRadius(30)} cm`, { size: 14, color: IND }));
  return s;
}

function g6Cards(): LessonVisuals['cards'] {
  return {
    what: () => circleDiagram(5, 0),
    idea: () => {
      const s = figSvg(360, 120, plainText(t('bodha.G6.idea')));
      s.appendChild(figCircle(180, 60, 48, { fill: 'none', stroke: TEAL, sw: 2 }));
      s.appendChild(figLine(180, 60, 228, 60, { stroke: IND, sw: 2.5 }));
      s.appendChild(figCircle(180, 60, 4, { fill: INK }));
      return s;
    },
    why: () => circleDiagram(5, 0),
    example: (step: number) => {
      if (step >= 3) return circleDiagram(5, 3);
      if (step >= 2) return circleDiagram(5, 0);
      return circleDiagram(5, 0);
    },
    where: () => {
      const s = figSvg(360, 90, plainText(t('bodha.G6.where')));
      s.appendChild(figCircle(90, 45, 28, { fill: PAPER, stroke: THREAD, sw: 3 }));
      s.appendChild(figCircle(250, 45, 22, { fill: PAPER, stroke: INK_SOFT, sw: 2 }));
      return s;
    },
  };
}

function g6Mistake(reveal: boolean): SVGSVGElement {
  const s = circleDiagram(5, 3);
  if (reveal) {
    s.appendChild(figText(180, 14, '8 cm < 10 cm', { size: 13, color: KUM }));
  }
  return s;
}

function tangramSquare(): SVGSVGElement {
  const s = figSvg(360, 160, plainText(t('bodha.G7.what')));
  const colors = [IND, TEAL, '#5a8260', KUM, '#8b6914', '#6b5344', INK_SOFT];
  const polys = [
    '80,40 200,40 140,100',
    '80,40 80,160 140,100',
    '200,40 200,160 140,160',
    '140,100 170,70 170,130',
    '80,160 140,160 110,130',
    '110,130 170,130 140,160 110,160',
    '170,70 200,40 200,100 170,130',
  ];
  polys.forEach((pts, i) => {
    const d =
      'M ' +
      pts
        .split(' ')
        .map((p) => p.replace(',', ' '))
        .join(' L ') +
      ' Z';
    s.appendChild(
      figPath(d, {
        fill: colors[i % colors.length]!,
        stroke: PAPER,
        sw: 1.2,
        opacity: 0.85,
      })
    );
  });
  s.appendChild(
    figText(180, 150, String(TOTAL_TANGRAM_UNITS), {
      size: 11,
      color: INK_SOFT,
    })
  );
  return s;
}

function g7Prashna(): SVGSVGElement {
  const s = figSvg(360, 150, t('prashna.G7.q'));
  s.appendChild(figRect(60, 70, 70, 70, { fill: 'var(--indigo-soft)', stroke: IND, sw: 2 }));
  s.appendChild(
    figPath('M 200 130 L 220 40 L 240 130 Z', { fill: 'var(--teal-soft)', stroke: TEAL, sw: 2 })
  );
  s.appendChild(figText(180, 140, '=', { size: 20, color: INK }));
  return s;
}

function g7Cards(): LessonVisuals['cards'] {
  return {
    what: () => tangramSquare(),
    idea: () => tangramSquare(),
    why: () => {
      const s = figSvg(360, 100, plainText(t('bodha.G7.why')));
      s.appendChild(figPath('M 80 70 L 120 30 L 120 70 Z', { fill: TEAL, stroke: PAPER, sw: 1 }));
      s.appendChild(figPath('M 120 30 L 120 70 L 160 70 Z', { fill: IND, stroke: PAPER, sw: 1 }));
      s.appendChild(figText(200, 55, '=', { size: 18 }));
      s.appendChild(figRect(220, 40, 40, 40, { fill: SUNK, stroke: INK_SOFT, sw: 1.5 }));
      return s;
    },
    example: (step: number) => {
      if (step >= 3) {
        const s = figSvg(360, 120, plainText(t('bodha.G7.example3')));
        s.appendChild(
          figPath('M 120 100 L 200 100 L 160 40 Z', {
            fill: 'var(--teal-soft)',
            stroke: TEAL,
            sw: 2,
          })
        );
        s.appendChild(figText(180, 115, '100', { size: 14, color: TEAL }));
        return s;
      }
      if (step >= 2) {
        const s = figSvg(360, 130, plainText(t('bodha.G7.example2')));
        s.appendChild(
          figPath('M 100 110 L 260 110 L 180 50 Z', { fill: IND, stroke: PAPER, sw: 1.5 })
        );
        return s;
      }
      return tangramSquare();
    },
    where: () => {
      const s = figSvg(360, 90, plainText(t('bodha.G7.where')));
      for (let c = 0; c < 4; c++) {
        s.appendChild(
          figRect(40 + c * 44, 40, 40, 40, { fill: SUNK, stroke: INK_SOFT, sw: 1, rx: 1 })
        );
      }
      return s;
    },
  };
}

function g7Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 140, t('mistake.G7.intro'));
  s.appendChild(figRect(50, 60, 80, 80, { fill: 'var(--indigo-soft)', stroke: IND, sw: 2 }));
  s.appendChild(
    figPath('M 200 120 L 230 30 L 260 120 Z', { fill: 'var(--teal-soft)', stroke: TEAL, sw: 2 })
  );
  if (reveal) {
    s.appendChild(figText(180, 135, '100 = 100', { size: 14, color: TEAL }));
  }
  return s;
}

function orthoPanel(blocks: readonly { x: number; y: number; z: number }[]): SVGSVGElement {
  const v = projectOrthographicViews(blocks, 3, 3, 3);
  const s = figSvg(360, 130, plainText(t('bodha.G8.what')));
  const cell = 22;
  let x = 20;
  ['T', 'F', 'S'].forEach((label, vi) => {
    const grid = vi === 0 ? v.top : vi === 1 ? v.front : v.side;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r]!;
      for (let c = 0; c < row.length; c++) {
        if (row[c]) {
          s.appendChild(
            figRect(x + c * cell, 30 + r * cell, cell - 2, cell - 2, {
              fill: vi === 0 ? 'var(--teal-soft)' : 'var(--indigo-soft)',
              stroke: INK_SOFT,
              sw: 1,
            })
          );
        }
      }
    }
    s.appendChild(figText(x + cell * 1.5, 18, label, { size: 11, color: INK_SOFT }));
    x += 110;
  });
  return s;
}

function g8Prashna(): SVGSVGElement {
  const s = figSvg(360, 120, t('prashna.G8.q'));
  s.appendChild(figCircle(180, 55, 40, { fill: 'var(--teal-soft)', stroke: TEAL, sw: 2 }));
  s.appendChild(figRect(140, 95, 80, 20, { fill: SUNK, stroke: INK_SOFT, sw: 1, rx: 2 }));
  return s;
}

function g8Cards(): LessonVisuals['cards'] {
  const stair = STRUCTURE_PRESETS[0]!.blocks;
  return {
    what: () => orthoPanel(stair),
    idea: () => {
      const s = figSvg(360, 100, plainText(t('bodha.G8.idea')));
      s.appendChild(figCircle(180, 35, 16, { fill: TEAL, stroke: 'none' }));
      s.appendChild(figLine(180, 35, 180, 75, { stroke: INK_SOFT, sw: 1, dash: '3 3' }));
      for (let i = 0; i < 3; i++) {
        s.appendChild(figRect(120 + i * 36, 75, 32, 20, { fill: SUNK, stroke: INK_SOFT, sw: 1 }));
      }
      return s;
    },
    why: () => orthoPanel(stair),
    example: (step: number) => {
      if (step >= 3) return orthoPanel(stair);
      if (step >= 2) {
        const side = projectOrthographicViews(stair, 3, 3, 3).side;
        const s = figSvg(360, 100, plainText(t('bodha.G8.example2')));
        const cell = 24;
        side.forEach((row, r) => {
          row.forEach((on, c) => {
            if (on) {
              s.appendChild(
                figRect(120 + c * cell, 20 + r * cell, cell - 2, cell - 2, {
                  fill: 'var(--indigo-soft)',
                  stroke: IND,
                  sw: 1,
                })
              );
            }
          });
        });
        return s;
      }
      const front = projectOrthographicViews(stair, 3, 3, 3).front;
      const s = figSvg(360, 100, plainText(t('bodha.G8.example1')));
      const cell = 24;
      front.forEach((row, r) => {
        row.forEach((on, c) => {
          if (on) {
            s.appendChild(
              figRect(120 + c * cell, 20 + r * cell, cell - 2, cell - 2, {
                fill: 'var(--teal-soft)',
                stroke: TEAL,
                sw: 1,
              })
            );
          }
        });
      });
      return s;
    },
    where: () => {
      const s = figSvg(360, 90, plainText(t('bodha.G8.where')));
      s.appendChild(figRect(60, 40, 100, 40, { fill: PAPER, stroke: INK_SOFT, sw: 1 }));
      s.appendChild(figLine(200, 60, 300, 60, { stroke: TEAL, sw: 1.5, dash: '4 3' }));
      return s;
    },
  };
}

function g8Mistake(reveal: boolean): SVGSVGElement {
  const stair = STRUCTURE_PRESETS[0]!.blocks;
  const top = projectOrthographicViews(stair, 3, 3, 3).top;
  const s = figSvg(360, 110, t('mistake.G8.intro'));
  const cell = 28;
  top.forEach((row, r) => {
    row.forEach((on, c) => {
      if (on) {
        s.appendChild(
          figRect(100 + c * cell, 30 + r * cell, cell - 2, cell - 2, {
            fill: reveal ? 'var(--teal-soft)' : SUNK,
            stroke: TEAL,
            sw: 1.5,
          })
        );
      }
    });
  });
  if (reveal) {
    s.appendChild(figText(180, 100, '3 □', { size: 14, color: TEAL }));
  }
  return s;
}

function g4Prashna(): SVGSVGElement {
  return renderG4Flower(true, true, true);
}

function g4Mistake(reveal: boolean): SVGSVGElement {
  const s = renderG4Flower(false, reveal, true);
  if (reveal) {
    s.appendChild(figText(180, 12, t('mistake.G4.found').slice(0, 30), { size: 9, color: KUM }));
  }
  return s;
}

export const GEOMETRY: VisualsTable = {
  G1: {
    prashna: g1Prashna,
    cards: g1Cards(),
    mistake: g1Mistake,
  },
  G2: {
    prashna: g2Prashna,
    mistake: g2Mistake,
  },
  G3: {
    prashna: g3Prashna,
    cards: g3Cards(),
    mistake: g3Mistake,
  },
  G4: {
    prashna: g4Prashna,
    mistake: g4Mistake,
  },
  G5: {
    prashna: g5Prashna,
    cards: g5Cards(),
    mistake: g5Mistake,
  },
  G6: {
    prashna: g6Prashna,
    cards: g6Cards(),
    mistake: g6Mistake,
  },
  G7: {
    prashna: g7Prashna,
    cards: g7Cards(),
    mistake: g7Mistake,
  },
  G8: {
    prashna: g8Prashna,
    cards: g8Cards(),
    mistake: g8Mistake,
  },
};
