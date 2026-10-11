/**
 * Line-art secular banyan tree and Shala motifs.
 */

import { t } from '../../domain/i18n/core';
import { svg } from '../util/dom';

export function renderBanyanTree(): SVGSVGElement {
  const s = svg('svg', {
    viewBox: '0 0 360 170',
    role: 'img',
    'aria-label': t('ashram.art'),
  });

  s.appendChild(
    svg('ellipse', {
      cx: 180,
      cy: 160,
      rx: 150,
      ry: 9,
      fill: 'var(--paper-sunk)',
    })
  );

  const ink = {
    fill: 'none',
    stroke: 'var(--ink)',
    'stroke-width': 2.2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  };

  const canopy = [
    'M60 92 C 40 60, 90 30, 130 44 C 140 14, 200 8, 222 36 C 262 18, 316 46, 300 88',
    'M60 92 C 120 104, 240 104, 300 88',
  ];
  const trunk = 'M168 158 C 172 130, 166 112, 176 96 M192 158 C 188 130, 196 112, 186 96';
  const branches =
    'M176 96 C 150 84, 120 82, 96 88 M186 96 C 210 84, 244 82, 268 88 M180 96 L 180 60';

  const paths = canopy.concat([trunk, branches]).map((d) => svg('path', Object.assign({ d }, ink)));

  const roots: SVGPathElement[] = [];
  [92, 116, 238, 262].forEach((x, i) => {
    roots.push(
      svg('path', {
        d: `M${x} ${90 + (i % 2) * 4} L ${x} ${132 + (i % 2) * 10}`,
        fill: 'none',
        stroke: 'var(--thread)',
        'stroke-width': 1.8,
        'stroke-linecap': 'round',
      })
    );
  });

  const leaves: SVGEllipseElement[] = [];
  [
    [100, 60],
    [140, 40],
    [184, 28],
    [226, 42],
    [266, 62],
    [212, 70],
    [150, 72],
  ].forEach((p) => {
    leaves.push(
      svg('ellipse', {
        cx: p[0],
        cy: p[1],
        rx: 7,
        ry: 4.2,
        transform: `rotate(-24 ${p[0]} ${p[1]})`,
        fill: 'var(--leaf-soft)',
        stroke: 'var(--leaf)',
        'stroke-width': 1.2,
      })
    );
  });

  paths
    .concat(roots)
    .concat(leaves)
    .forEach((n) => s.appendChild(n));

  return s;
}

export function renderShalaMotif(id: 'ganita' | 'vijnana' | 'loka'): SVGSVGElement {
  const s = svg('svg', { viewBox: '0 0 48 48', 'aria-hidden': 'true' });

  if (id === 'ganita') {
    [
      [16, 16],
      [32, 16],
      [16, 32],
      [32, 32],
      [24, 24],
    ].forEach((p) => {
      s.appendChild(svg('circle', { cx: p[0], cy: p[1], r: 2.6, fill: 'var(--ink)' }));
    });
    s.appendChild(
      svg('path', {
        d: 'M24 8 C 40 8, 40 24, 24 24 C 8 24, 8 40, 24 40 C 40 40, 40 24, 24 24 C 8 24, 8 8, 24 8',
        fill: 'none',
        stroke: 'var(--thread)',
        'stroke-width': 2,
      })
    );
  } else if (id === 'vijnana') {
    s.appendChild(
      svg('path', {
        d: 'M12 34 C 12 18, 26 10, 38 10 C 38 24, 30 36, 14 36 Z',
        fill: 'var(--leaf-soft)',
        stroke: 'var(--leaf)',
        'stroke-width': 2,
      })
    );
    s.appendChild(svg('path', { d: 'M14 36 L 30 18', stroke: 'var(--leaf)', 'stroke-width': 1.5 }));
    s.appendChild(
      svg('path', {
        d: 'M36 30 C 36 30, 30 37, 33 41 C 35 44, 40 43, 40 39 C 40 36, 36 30, 36 30 Z',
        fill: 'var(--teal-soft)',
        stroke: 'var(--teal)',
        'stroke-width': 1.5,
      })
    );
  } else {
    s.appendChild(
      svg('circle', {
        cx: 24,
        cy: 24,
        r: 15,
        fill: 'var(--indigo-soft)',
        stroke: 'var(--indigo)',
        'stroke-width': 2,
      })
    );
    s.appendChild(
      svg('ellipse', {
        cx: 24,
        cy: 24,
        rx: 6.5,
        ry: 15,
        fill: 'none',
        stroke: 'var(--indigo)',
        'stroke-width': 1.3,
      })
    );
    s.appendChild(
      svg('path', {
        d: 'M9 24 H39 M12 16 H36 M12 32 H36',
        stroke: 'var(--indigo)',
        'stroke-width': 1.1,
      })
    );
  }

  return s;
}
