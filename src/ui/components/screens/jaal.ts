/**
 * Jaal (Cross-subject web) screen: Triangle SVG joining Ganita, Vijnana, and Loka,
 * link detail card, and cross-subject navigation.
 */

import {
  JAAL,
  findKnot,
  placeOf,
  playable,
  type JaalLink,
} from '../../../domain/curriculum/curriculum';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { type ScreenMeta } from '../app/router';
import { openKnot } from './shala';

const POS = {
  ganita: { x: 180, y: 46 },
  vijnana: { x: 60, y: 238 },
  loka: { x: 300, y: 238 },
};

const COLOR: Record<string, string> = {
  ganita: 'var(--thread)',
  vijnana: 'var(--leaf)',
  loka: 'var(--indigo)',
};

function sectionOf(id: string): 'ganita' | 'vijnana' | 'loka' {
  const loc = placeOf(id);
  return loc ? loc.section.id : 'ganita';
}

function curveFor(link: JaalLink, order: number): string {
  const sa = sectionOf(link.a);
  const sb = sectionOf(link.b);
  const A = POS[sa];
  const B = POS[sb];
  if (sa === sb) {
    const r = 40 + order * 14;
    return `M${A.x} ${A.y} c ${-r} ${-r}, ${r} ${-r}, 0 0`;
  }
  const mx = (A.x + B.x) / 2;
  const my = (A.y + B.y) / 2;
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const bend = (order - 1) * 26;
  const cx = mx - (dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M${A.x} ${A.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${B.x} ${B.y}`;
}

export function createJaalScreen(): ScreenMeta {
  return {
    id: 'jaal',
    title: 'jaal.title',
    render(view, state) {
      const firstLink = JAAL[0]!;
      if (!state.sel) state.sel = firstLink.id;

      const svgEl = svg('svg', {
        viewBox: '0 0 360 280',
        role: 'img',
        'aria-label': t('jaal.art'),
      });
      const curves = svg('g');
      svgEl.appendChild(curves);

      const pairCount: Record<string, number> = {};
      const paths: Record<string, SVGPathElement> = {};

      for (const link of JAAL) {
        const key = [sectionOf(link.a), sectionOf(link.b)].sort().join('-');
        pairCount[key] = (pairCount[key] || 0) + 1;
        const p = svg('path', {
          d: curveFor(link, pairCount[key]),
          fill: 'none',
          'stroke-width': 2.4,
          'stroke-linecap': 'round',
          class: 'jaal-curve',
          'data-id': link.id,
        });
        p.addEventListener('click', () => pick(link.id));
        curves.appendChild(p);
        paths[link.id] = p;
      }

      for (const [sidStr, P] of Object.entries(POS)) {
        const sid = sidStr as 'ganita' | 'vijnana' | 'loka';
        svgEl.appendChild(
          svg('circle', {
            cx: P.x,
            cy: P.y,
            r: 22,
            fill: 'var(--paper-raised)',
            stroke: COLOR[sid],
            'stroke-width': 3,
          })
        );
        svgEl.appendChild(
          svg('text', {
            x: P.x,
            y: P.y + (sid === 'ganita' ? -32 : 40),
            'text-anchor': 'middle',
            'font-size': 15,
            'font-weight': 600,
            fill: 'var(--ink)',
            'font-family': 'var(--font)',
            text: t(`section.${sid}`),
          })
        );
      }

      const detail = el('section', { class: 'card jaal-detail', 'aria-live': 'polite' });
      const list = el('div', { class: 'jaal-list' });

      function knotButton(id: string): HTMLElement {
        const knot = findKnot(id);
        const sid = sectionOf(id);
        const canPlay = playable(knot);
        return el(
          'button',
          {
            class: `jaal-knot${canPlay ? '' : ' later'}`,
            type: 'button',
            onclick: () => {
              if (knot) openKnot(knot);
            },
          },
          [
            el('span', { class: 'sec', style: { color: COLOR[sid] }, text: t(`section.${sid}`) }),
            el('span', { text: t(`knot.${id}.t`) }),
          ]
        );
      }

      function paint(): void {
        for (const [id, pathNode] of Object.entries(paths)) {
          pathNode.setAttribute('stroke', id === state.sel ? 'var(--thread)' : 'var(--ghost)');
          pathNode.setAttribute('stroke-width', id === state.sel ? '4' : '2.4');
        }

        const link = JAAL.find((l) => l.id === state.sel) || JAAL[0]!;
        clear(detail);
        detail.appendChild(el('h3', { class: 'pane-title', text: t(`jaal.${link.id}.t`) }));
        detail.appendChild(el('p', { text: t(`jaal.${link.id}`) }));
        detail.appendChild(
          el('div', { class: 'jaal-knots' }, [knotButton(link.a), knotButton(link.b)])
        );

        list.querySelectorAll<HTMLElement>('.chip').forEach((c) => {
          c.setAttribute('aria-pressed', String(c.dataset.value === state.sel));
        });
      }

      function pick(id: string): void {
        state.sel = id;
        paint();
      }

      for (const link of JAAL) {
        list.appendChild(
          el('button', {
            class: 'chip',
            type: 'button',
            'data-value': link.id,
            text: t(`jaal.${link.id}.t`),
            onclick: () => pick(link.id),
          })
        );
      }

      view.appendChild(el('p', { class: 'loom-intro', text: t('jaal.intro') }));
      view.appendChild(el('div', { class: 'model jaal-art' }, [svgEl]));
      view.appendChild(detail);
      view.appendChild(el('h3', { class: 'pane-title', text: t('jaal.all') }));
      view.appendChild(list);
      paint();
    },
  };
}
