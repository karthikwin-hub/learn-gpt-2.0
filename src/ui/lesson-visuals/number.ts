/**
 * Pictures for the Ganita lessons N2 N4 N5 A1 A2 A3 D2 D4.
 */

import { t } from '../../domain/i18n/core';
import { decomposeDecimal, decimalToHundredths } from '../../domain/math/decimals';
import { formatFraction, addLikeFractions, fractionOfSet } from '../../domain/math/collection';
import { buildComparisonGap } from '../../domain/math/wordprob';
import { figCircle, figGrid, figLine, figPath, figRect, figSvg, figText } from '../diagrams/fig';
import type { CardKey, LessonVisuals, VisualsTable } from './types';

const CARD_KEYS: CardKey[] = ['what', 'idea', 'why', 'example', 'where'];

function slateBg(s: SVGSVGElement): void {
  s.appendChild(
    figRect(8, 8, 344, 184, {
      rx: 10,
      fill: 'var(--paper-sunk)',
      stroke: 'var(--thread-soft)',
      sw: 2,
    })
  );
}

function romanTile(s: SVGSVGElement, x: number, y: number, sym: string, highlight = false): void {
  s.appendChild(
    figRect(x, y, 36, 44, {
      rx: 5,
      fill: 'var(--paper-raised)',
      stroke: highlight ? 'var(--kumkum)' : 'var(--ink-soft)',
      sw: highlight ? 2.5 : 1.5,
    })
  );
  s.appendChild(figText(x + 18, y + 26, sym, { size: 20, weight: 700 }));
}

function n2Prashna(): SVGSVGElement {
  const s = figSvg(360, 200, t('prashna.N2.q'));
  slateBg(s);
  romanTile(s, 120, 70, 'I');
  romanTile(s, 168, 70, 'V', true);
  s.appendChild(figText(180, 145, 'IV = 4', { size: 16, color: 'var(--teal)' }));
  s.appendChild(figText(180, 168, '5 − 1', { size: 13, color: 'var(--ink-soft)' }));
  return s;
}

function n2Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 200, t(`bodha.N2.${card}`));
  slateBg(s);
  if (card === 'what') {
    ['I', 'V', 'X', 'L', 'C'].forEach((sym, i) => romanTile(s, 40 + i * 58, 60, sym));
    s.appendChild(figText(180, 155, '1  5  10  50  100', { size: 11, color: 'var(--ink-soft)' }));
  } else if (card === 'idea') {
    romanTile(s, 70, 55, 'V');
    romanTile(s, 118, 55, 'I');
    s.appendChild(figText(94, 115, 'VI = 6', { size: 14, color: 'var(--teal)' }));
    romanTile(s, 200, 55, 'I');
    romanTile(s, 248, 55, 'V', true);
    s.appendChild(figText(224, 115, 'IV = 4', { size: 14, color: 'var(--kumkum)' }));
    s.appendChild(figLine(170, 90, 190, 90, { stroke: 'var(--ink-soft)', sw: 1 }));
    s.appendChild(figText(180, 155, t('figure.N2.rightAdds'), { size: 12 }));
  } else if (card === 'why') {
    romanTile(s, 50, 70, 'X');
    romanTile(s, 98, 70, 'X');
    romanTile(s, 146, 70, 'X');
    s.appendChild(figText(200, 78, 'III ✓', { size: 13, color: 'var(--teal)' }));
    s.appendChild(figText(200, 105, 'IIII ✗', { size: 13, color: 'var(--ink-soft)' }));
    s.appendChild(figText(180, 155, t('figure.N2.noRepeat'), { size: 12 }));
  } else if (card === 'example') {
    if (step >= 2) {
      romanTile(s, 60, 60, 'X');
      romanTile(s, 108, 60, 'L', true);
      romanTile(s, 156, 60, 'V');
      s.appendChild(figText(180, 120, 'XLV = 45', { size: 16, weight: 700 }));
    } else {
      romanTile(s, 80, 60, 'X');
      romanTile(s, 128, 60, 'X');
      romanTile(s, 176, 60, 'I');
      romanTile(s, 224, 60, 'V', true);
      s.appendChild(figText(180, 120, 'XXIV = 24', { size: 16, weight: 700 }));
    }
  } else if (card === 'where') {
    s.appendChild(figCircle(100, 100, 28, { stroke: 'var(--ink)', sw: 2 }));
    s.appendChild(figText(100, 100, 'XII', { size: 14 }));
    s.appendChild(
      figRect(200, 70, 80, 60, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)' })
    );
    s.appendChild(figText(240, 95, t('figure.N2.chapter'), { size: 12 }));
    s.appendChild(figText(240, 115, 'IV', { size: 16, weight: 700 }));
  }
  return s;
}

function n2Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 180, t('mistake.N2.intro'));
  slateBg(s);
  if (reveal) {
    romanTile(s, 100, 60, 'X');
    romanTile(s, 148, 60, 'L', true);
    romanTile(s, 196, 60, 'V');
    s.appendChild(figText(180, 130, 'XLV ✓', { size: 15, color: 'var(--teal)' }));
    s.appendChild(figLine(260, 50, 300, 90, { stroke: 'var(--kumkum)', sw: 2 }));
    romanTile(s, 270, 55, 'V');
    romanTile(s, 318, 55, 'L');
    s.appendChild(figText(294, 115, 'VL ✗', { size: 13, color: 'var(--ink-soft)' }));
  } else {
    romanTile(s, 140, 70, 'V');
    romanTile(s, 188, 70, 'L', true);
    s.appendChild(figText(180, 140, 'VL ?', { size: 16 }));
  }
  return s;
}

function collectionRings(s: SVGSVGElement, total: number, parts: number, takeParts: number): void {
  const per = total / parts;
  const w = 320 / parts;
  for (let r = 0; r < parts; r++) {
    const cx = 30 + r * w + w / 2;
    const on = r < takeParts;
    s.appendChild(
      figCircle(cx, 95, Math.min(w / 2 - 6, 40), {
        stroke: on ? 'var(--teal)' : 'var(--ink-soft)',
        sw: on ? 2.5 : 1.5,
        fill: on ? 'var(--paper-raised)' : 'none',
      })
    );
    for (let i = 0; i < per; i++) {
      const ang = (2 * Math.PI * i) / per - Math.PI / 2;
      s.appendChild(
        figCircle(cx + Math.cos(ang) * 18, 95 + Math.sin(ang) * 18, 5, {
          fill: on ? 'var(--indigo)' : 'var(--ink-soft)',
        })
      );
    }
  }
  s.appendChild(
    figText(180, 165, `${takeParts}/${parts} × ${per} = ${takeParts * per}`, { size: 13 })
  );
}

function n4Prashna(): SVGSVGElement {
  const s = figSvg(360, 200, t('prashna.N4.q'));
  slateBg(s);
  collectionRings(s, 12, 3, 1);
  s.appendChild(figText(180, 40, '12', { size: 14, weight: 700 }));
  return s;
}

function n4Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 200, t(`bodha.N4.${card}`));
  slateBg(s);
  if (card === 'what' || card === 'idea') {
    collectionRings(s, 12, 3, card === 'idea' ? 2 : 0);
  } else if (card === 'why') {
    const sum = addLikeFractions({ num: 1, den: 5 }, { num: 2, den: 5 });
    s.appendChild(figText(180, 80, `1/5 + 2/5 = ${formatFraction(sum)}`, { size: 16 }));
    s.appendChild(
      figText(180, 120, t('figure.N4.denStays'), { size: 12, color: 'var(--ink-soft)' })
    );
  } else if (card === 'example') {
    const take = step >= 2 ? 2 : step >= 1 ? 1 : 0;
    collectionRings(s, 18, 3, take);
    if (step >= 2) {
      s.appendChild(
        figText(180, 40, t('figure.N4.twoThirds', { result: String(fractionOfSet(18, 2, 3)) }), {
          size: 14,
          color: 'var(--teal)',
        })
      );
    }
  } else if (card === 'where') {
    s.appendChild(
      figRect(80, 70, 200, 50, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)' })
    );
    for (let i = 0; i < 5; i++) {
      s.appendChild(figCircle(100 + i * 36, 95, 8, { fill: 'var(--indigo)' }));
    }
  }
  return s;
}

function n4Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 180, t('mistake.N4.intro'));
  slateBg(s);
  const wrong = '3/10';
  const right = formatFraction(addLikeFractions({ num: 2, den: 5 }, { num: 1, den: 5 }));
  s.appendChild(
    figText(180, 80, `2/5 + 1/5 = ${reveal ? right : wrong}`, { size: 18, weight: 700 })
  );
  if (reveal) {
    s.appendChild(figText(180, 130, t('figure.N4.fifthsStay'), { size: 12, color: 'var(--teal)' }));
  }
  return s;
}

function decimalGrid(s: SVGSVGElement, hundredths: number, label: string): void {
  s.appendChild(
    figRect(80, 40, 200, 200, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', sw: 2 })
  );
  s.appendChild(
    figGrid(80, 40, 10, 10, 20, (c, r) => {
      const idx = c * 10 + r;
      return idx < hundredths ? 'var(--teal)' : null;
    })
  );
  s.appendChild(figText(180, 260, label, { size: 13 }));
}

function n5Prashna(): SVGSVGElement {
  const s = figSvg(360, 280, t('prashna.N5.q'));
  decimalGrid(s, decimalToHundredths(0.4), '0.4');
  decimalGrid(s, 9, '0.09');
  return s;
}

function n5Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 280, t(`bodha.N5.${card}`));
  if (card === 'what' || card === 'idea') {
    decimalGrid(s, card === 'idea' ? 15 : 40, card === 'idea' ? '0.15' : '0.4');
  } else if (card === 'why') {
    decimalGrid(s, 50, '0.5');
    s.appendChild(figText(180, 270, t('decimals.compareEq'), { size: 14, color: 'var(--teal)' }));
  } else if (card === 'example') {
    const parts = decomposeDecimal(1.35);
    const h = step >= 3 ? 135 : step >= 2 ? 130 : step >= 1 ? 110 : 100;
    const label =
      step >= 1 ? `${parts.whole} + ${parts.tenths}/10 + ${parts.hundredths}/100` : '1.35';
    decimalGrid(s, h, label);
  } else if (card === 'where') {
    s.appendChild(figRect(100, 80, 160, 40, { fill: 'var(--paper-sunk)', rx: 6 }));
    s.appendChild(figText(180, 100, '37.2°C', { size: 16, weight: 700 }));
  }
  return s;
}

function n5Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 200, t('mistake.N5.intro'));
  decimalGrid(s, reveal ? 70 : 15, reveal ? '0.7 > 0.15' : '0.7  vs  0.15');
  return s;
}

function placeColumns(s: SVGSVGElement, h: number, tCount: number, o: number): void {
  const cols = [
    { x: 90, v: h, key: 'regroup.colH' },
    { x: 180, v: tCount, key: 'regroup.colT' },
    { x: 270, v: o, key: 'regroup.colO' },
  ];
  cols.forEach((c) => {
    s.appendChild(figLine(c.x, 50, c.x, 130, { stroke: 'var(--thread-soft)', sw: 3 }));
    s.appendChild(figRect(c.x - 22, 70, 44, 36, { fill: 'var(--indigo)', rx: 6 }));
    s.appendChild(figText(c.x, 88, c.v, { size: 18, color: 'var(--paper-raised)' }));
    s.appendChild(figText(c.x, 150, t(c.key), { size: 11, color: 'var(--ink-soft)' }));
  });
}

function a1Prashna(): SVGSVGElement {
  const s = figSvg(360, 200, t('prashna.A1.q'));
  slateBg(s);
  placeColumns(s, 5, 0, 0);
  s.appendChild(figPath('M 120 40 L 160 70', { stroke: 'var(--kumkum)', sw: 2 }));
  s.appendChild(figText(180, 35, '500 − 247', { size: 14 }));
  return s;
}

function a1Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 200, t(`bodha.A1.${card}`));
  slateBg(s);
  if (card === 'example') {
    if (step >= 3) placeColumns(s, 2, 1, 6);
    else if (step >= 2) placeColumns(s, 3, 9, 9);
    else placeColumns(s, 4, 0, 0);
  } else if (card === 'why') {
    placeColumns(s, 4, 9, 10);
    s.appendChild(figText(180, 175, '500 = 400 + 90 + 10', { size: 12, color: 'var(--teal)' }));
  } else {
    placeColumns(s, 5, 0, 0);
  }
  return s;
}

function a1Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 180, t('mistake.A1.intro'));
  slateBg(s);
  s.appendChild(figText(180, 70, '704 − 358', { size: 18, weight: 700 }));
  s.appendChild(
    figText(180, 110, reveal ? '14 − 8 = 6' : '4 − 8 = 4 ✗', {
      size: 15,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

function numberLine(s: SVGSVGElement, y: number, a: number, b: number, mark: number): void {
  s.appendChild(figLine(40, y, 320, y, { stroke: 'var(--ink-soft)', sw: 3 }));
  s.appendChild(figCircle(mark, y, 8, { fill: 'var(--kumkum)' }));
  s.appendChild(figText(50, y + 22, String(a), { size: 12 }));
  s.appendChild(figText(310, y + 22, String(b), { size: 12 }));
}

function a2Prashna(): SVGSVGElement {
  const s = figSvg(360, 160, t('prashna.A2.q'));
  numberLine(s, 80, 40, 60, 190);
  s.appendChild(figText(190, 55, '48→50', { size: 12 }));
  s.appendChild(figText(180, 130, '50 × 100 ≈ 5000', { size: 13, color: 'var(--teal)' }));
  return s;
}

function a2Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 180, t(`bodha.A2.${card}`));
  if (card === 'example') {
    const est = step >= 3 ? 900 : step >= 2 ? 500 : 400;
    numberLine(s, 90, 300, 600, 40 + est / 3);
    s.appendChild(figText(180, 150, `392 + 514 ≈ ${est}`, { size: 14 }));
  } else if (card === 'why') {
    s.appendChild(figRect(90, 60, 180, 40, { fill: 'var(--paper-sunk)', rx: 6 }));
    s.appendChild(figText(180, 80, '50 × 100 = 5000', { size: 14, color: 'var(--teal)' }));
    s.appendChild(figText(180, 130, '8190 ✗', { size: 13, color: 'var(--ink-soft)' }));
  } else {
    numberLine(s, 90, 40, 60, 162);
  }
  return s;
}

function a2Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 160, t('mistake.A2.intro'));
  s.appendChild(
    figRect(70, 50, 100, 36, { fill: reveal ? 'var(--paper-sunk)' : 'var(--teal)', rx: 4 })
  );
  s.appendChild(figText(120, 68, '≈800', { size: 14 }));
  s.appendChild(
    figText(240, 68, '8190', { size: 16, color: reveal ? 'var(--kumkum)' : 'var(--ink)' })
  );
  if (reveal) s.appendChild(figText(180, 120, t('figure.A2.wild'), { size: 12 }));
  return s;
}

function tapeBar(s: SVGSVGElement, y: number, w: number, label: string, color: string): void {
  s.appendChild(figRect(40, y, w, 28, { fill: color, rx: 4 }));
  s.appendChild(figText(40 + w / 2, y + 14, label, { size: 11, color: 'var(--paper-raised)' }));
}

function a3Prashna(): SVGSVGElement {
  const s = figSvg(360, 180, t('prashna.A3.q'));
  for (let i = 0; i < 5; i++) {
    s.appendChild(figCircle(80 + i * 50, 100, 14, { fill: 'var(--indigo)' }));
  }
  s.appendChild(figText(180, 150, '30 ÷ 5 = 6', { size: 14, color: 'var(--teal)' }));
  return s;
}

function a3Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 200, t(`bodha.A3.${card}`));
  if (card === 'example') {
    if (step >= 3) {
      for (let i = 0; i < 6; i++)
        s.appendChild(figCircle(70 + i * 38, 100, 10, { fill: 'var(--teal)' }));
      s.appendChild(figText(180, 150, '24 ÷ 6 = 4', { size: 14 }));
    } else if (step >= 2) {
      const gap = buildComparisonGap(24, 6);
      tapeBar(s, 60, 240, '24 m', 'var(--indigo)');
      tapeBar(s, 100, 60, '6 m', 'var(--teal)');
      s.appendChild(figText(180, 150, gap.equation, { size: 13 }));
    } else {
      for (let i = 0; i < 6; i++)
        s.appendChild(
          figRect(50 + i * 44, 85, 36, 36, { fill: 'var(--paper-sunk)', stroke: 'var(--ink-soft)' })
        );
      s.appendChild(figText(180, 150, '24 × 6 = 144', { size: 14 }));
    }
  } else if (card === 'why') {
    tapeBar(s, 70, 200, '40 m', 'var(--indigo)');
    tapeBar(s, 110, 80, '15 m', 'var(--teal)');
    s.appendChild(
      figText(260, 124, t('figure.A3.gap', { n: '25' }), { size: 12, color: 'var(--kumkum)' })
    );
  } else if (card === 'where') {
    s.appendChild(
      figRect(100, 80, 160, 50, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)' })
    );
    s.appendChild(figText(180, 105, t('figure.A3.busPlan'), { size: 12 }));
  } else {
    s.appendChild(figText(180, 100, '+  −  ×  ÷', { size: 20, weight: 700 }));
  }
  return s;
}

function a3Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 180, t('mistake.A3.intro'));
  tapeBar(s, 60, 260, '40 m', 'var(--indigo)');
  tapeBar(s, 100, 100, '15 m', 'var(--teal)');
  s.appendChild(
    figText(180, 150, reveal ? '40 − 15 = 25' : '40 + 15 = 55 ✗', {
      size: 14,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

function hopLine(s: SVGSVGElement, total: number, group: number, hops: number): void {
  s.appendChild(figLine(30, 100, 330, 100, { stroke: 'var(--ink-soft)', sw: 3 }));
  const span = 280 / (total / group);
  for (let i = 0; i <= total / group; i++) {
    const x = 30 + i * span;
    s.appendChild(
      figCircle(x, 100, i <= hops ? 6 : 4, {
        fill: i <= hops ? 'var(--teal)' : 'var(--paper-sunk)',
      })
    );
    s.appendChild(figText(x, 125, String(total - i * group), { size: 10 }));
  }
}

function d2Prashna(): SVGSVGElement {
  const s = figSvg(360, 160, t('prashna.D2.q'));
  hopLine(s, 20, 4, 5);
  s.appendChild(figText(180, 50, '20 ÷ 4 = 5', { size: 14, color: 'var(--teal)' }));
  return s;
}

function d2Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 180, t(`bodha.D2.${card}`));
  const hops = card === 'example' ? Math.min(step, 3) : card === 'why' ? 5 : 1;
  hopLine(s, card === 'example' ? 18 : 20, card === 'example' ? 6 : 4, hops);
  if (card === 'example' && step >= 3) {
    s.appendChild(figText(180, 45, '18 ÷ 6 = 3', { size: 14, color: 'var(--teal)' }));
  }
  return s;
}

function d2Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 160, t('mistake.D2.intro'));
  hopLine(s, 15, 3, reveal ? 5 : 1);
  s.appendChild(
    figText(180, 45, reveal ? '15 ÷ 3 = 5' : t('figure.D2.stopEarly'), {
      size: 13,
      color: reveal ? 'var(--teal)' : 'var(--kumkum)',
    })
  );
  return s;
}

function longBracket(s: SVGSVGElement, dividend: number, divisor: number, quotient: string): void {
  s.appendChild(figText(120, 50, quotient, { size: 20, color: 'var(--teal)', anchor: 'start' }));
  s.appendChild(figLine(80, 58, 280, 58, { stroke: 'var(--ink)', sw: 2 }));
  s.appendChild(figText(70, 85, String(divisor), { size: 16, anchor: 'end' }));
  s.appendChild(figLine(80, 60, 80, 120, { stroke: 'var(--ink)', sw: 2 }));
  s.appendChild(figText(100, 85, String(dividend), { size: 16, anchor: 'start' }));
}

function d4Prashna(): SVGSVGElement {
  const s = figSvg(360, 160, t('prashna.D4.q'));
  longBracket(s, 615, 3, '2?5');
  s.appendChild(figText(180, 130, t('figure.D4.zeroGate'), { size: 12, color: 'var(--kumkum)' }));
  return s;
}

function d4Cards(card: CardKey, step: number): SVGSVGElement {
  const s = figSvg(360, 160, t(`bodha.D4.${card}`));
  const q = step >= 3 ? '204' : step >= 2 ? '20?' : '2';
  longBracket(s, 612, 3, q);
  if (card === 'why') {
    s.appendChild(figText(180, 130, '206 · 26', { size: 13, color: 'var(--kumkum)' }));
  }
  return s;
}

function d4Mistake(reveal: boolean): SVGSVGElement {
  const s = figSvg(360, 160, t('mistake.D4.intro'));
  longBracket(s, 824, 4, reveal ? '206' : '26');
  if (reveal) {
    s.appendChild(figText(180, 130, t('figure.D4.writeZero'), { size: 12, color: 'var(--teal)' }));
  }
  return s;
}

function knotVisuals(
  prashna: () => SVGSVGElement,
  cards: (card: CardKey, step: number) => SVGSVGElement,
  mistake: (reveal: boolean) => SVGSVGElement
): LessonVisuals {
  const cardFns: LessonVisuals['cards'] = {};
  for (const key of CARD_KEYS) {
    cardFns[key] = (step: number) => cards(key, step);
  }
  return { prashna, cards: cardFns, mistake };
}

export const NUMBER: VisualsTable = {
  N2: knotVisuals(n2Prashna, n2Cards, n2Mistake),
  N4: knotVisuals(n4Prashna, n4Cards, n4Mistake),
  N5: knotVisuals(n5Prashna, n5Cards, n5Mistake),
  A1: knotVisuals(a1Prashna, a1Cards, a1Mistake),
  A2: knotVisuals(a2Prashna, a2Cards, a2Mistake),
  A3: knotVisuals(a3Prashna, a3Cards, a3Mistake),
  D2: knotVisuals(d2Prashna, d2Cards, d2Mistake),
  D4: knotVisuals(d4Prashna, d4Cards, d4Mistake),
};
