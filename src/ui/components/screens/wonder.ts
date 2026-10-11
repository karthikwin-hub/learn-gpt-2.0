/**
 * Wonder / Prashna screen for M2: Courtyard tile prediction before the Living Film.
 */

import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { renderKolamLine } from '../../diagrams/kolam-curve';
import { el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

function courtyardArt(): SVGSVGElement {
  const s = svg('svg', {
    viewBox: '0 0 360 250',
    role: 'img',
    'aria-label': t('wonder.m2.art'),
  }) as SVGSVGElement;

  s.appendChild(svg('rect', { x: 0, y: 0, width: 360, height: 250, fill: 'var(--paper-sunk)' }));
  s.appendChild(
    svg('rect', {
      x: 50,
      y: 30,
      width: 260,
      height: 174,
      rx: 4,
      fill: 'var(--paper-raised)',
      stroke: 'var(--ink)',
      'stroke-width': 6,
    })
  );
  s.appendChild(svg('rect', { x: 158, y: 198, width: 44, height: 12, fill: 'var(--paper-sunk)' }));

  for (let i = 1; i < 6; i++) {
    s.appendChild(
      svg('line', {
        x1: 53 + (254 / 6) * i,
        y1: 33,
        x2: 53 + (254 / 6) * i,
        y2: 43,
        stroke: 'var(--ink-soft)',
        'stroke-width': 1.5,
      })
    );
  }
  for (let j = 1; j < 4; j++) {
    s.appendChild(
      svg('line', {
        x1: 53,
        y1: 33 + (168 / 4) * j,
        x2: 63,
        y2: 33 + (168 / 4) * j,
        stroke: 'var(--ink-soft)',
        'stroke-width': 1.5,
      })
    );
  }

  s.appendChild(
    svg('rect', {
      x: 55,
      y: 35,
      width: 254 / 6 - 4,
      height: 168 / 4 - 4,
      rx: 3,
      fill: 'var(--thread-soft)',
      stroke: 'var(--thread)',
      'stroke-width': 2.5,
    })
  );
  s.appendChild(
    svg('text', {
      x: 55 + 254 / 12,
      y: 35 + 168 / 8,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      'font-size': 14,
      'font-weight': 600,
      fill: 'var(--ink)',
      'font-family': 'var(--font)',
      text: '1',
    })
  );

  const k = renderKolamLine({ m: 2, n: 3 });
  k.setAttribute('x', '156');
  k.setAttribute('y', '210');
  k.setAttribute('width', '48');
  k.setAttribute('height', '36');
  k.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  const line = k.querySelector('.kolam-line');
  if (line) {
    line.setAttribute('stroke-width', '4');
  }
  s.appendChild(k);

  return s;
}

export function createWonderScreen(): ScreenMeta {
  return {
    id: 'wonder',
    stage: 'shravana',
    step: 'prashna',
    title: 'wonder.title',
    render(view, state) {
      enterThread('M2', 'wonder');

      if (state.guess === undefined) {
        state.guess = storage.get<number>('m2guess', 12);
      }

      view.appendChild(el('div', { class: 'wonder-art' }, [courtyardArt()]));
      view.appendChild(el('p', { class: 'muted small', text: t('wonder.m2.name') }));
      view.appendChild(el('h2', { class: 'screen-title', text: t('wonder.m2.q') }));
      view.appendChild(el('p', { class: 'muted', text: t('wonder.m2.sub') }));

      const out = el('output', { text: String(state.guess) });
      const range = el('input', {
        type: 'range',
        min: '1',
        max: '60',
        value: String(state.guess),
        'aria-label': t('wonder.guessLabel'),
        oninput: (e: Event) => {
          const target = e.target as HTMLInputElement;
          state.guess = Number(target.value);
          out.textContent = String(state.guess);
        },
      });

      view.appendChild(
        el('div', { class: 'card' }, [
          el('h3', { class: 'pane-title', text: t('wonder.guessLabel') }),
          el('div', { class: 'guess-box' }, [out, range]),
        ])
      );

      const goBtn = el('button', {
        class: 'btn primary block',
        type: 'button',
        text: t('wonder.go'),
        onclick: () => {
          storage.set('m2guess', state.guess);
          router.go('bodha', { k: 'M2' });
        },
      });
      view.appendChild(el('div', { class: 'btn-row' }, [goBtn]));

      setTimeout(() => {
        voice.say(t('wonder.m2.q'));
      }, 350);
    },
  };
}
