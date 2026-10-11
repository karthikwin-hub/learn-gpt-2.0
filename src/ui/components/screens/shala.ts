/**
 * Reusable Shala Loom component rendering Ganita, Vijnana, or Loka threads, knots, and crossings.
 */

import {
  findSection,
  playable,
  firstStep,
  jaalFor,
  type Knot,
} from '../../../domain/curriculum/curriculum';
import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { el, svg, toast } from '../../util/dom';
import { router, type ScreenMeta } from '../app/router';

const WAVE = 'M24 0 C 36 14, 12 30, 24 46 S 36 80, 24 100';

export function openKnot(k: Knot): void {
  if (!playable(k)) {
    toast(t('home.notInProto'));
    return;
  }
  const step = firstStep(k);
  storage.set('continue', { knot: k.id, route: step.route, params: step.params });
  router.go(step.route, step.params);
}

export function createShalaScreen(): ScreenMeta {
  return {
    id: 'shala',
    title: (params) => {
      const sectionId = params.s || 'ganita';
      return t(`section.${sectionId}`);
    },
    render(view, _state, params) {
      const section = (params.s ? findSection(params.s) : null) || findSection('ganita')!;
      const doneKnots = storage.get<string[]>('done', []);

      view.appendChild(el('p', { class: 'shala-sub', text: t(`section.${section.id}.sub`) }));
      view.appendChild(el('p', { class: 'loom-intro', text: t(`section.${section.id}.intro`) }));

      for (const th of section.threads) {
        const block = el('section', {
          class: 'domain',
          'aria-label': t(`thread.${th.id}`),
        });

        const waveSvg = svg(
          'svg',
          {
            class: 'domain-thread',
            viewBox: '0 0 48 100',
            preserveAspectRatio: 'none',
            'aria-hidden': 'true',
          },
          [svg('path', { d: WAVE, 'vector-effect': 'non-scaling-stroke' })]
        );
        block.appendChild(waveSvg);

        const domainHead = el('div', { class: 'domain-head' }, [
          el('h3', { text: t(`thread.${th.id}`) }),
          el('span', {
            text: `${t(`thread.${th.id}.m`)} · ${t('home.ideas', { n: th.knots.length })}`,
          }),
        ]);
        block.appendChild(domainHead);

        let nextMarked = false;
        for (const k of th.knots) {
          const isDone = doneKnots.includes(k.id);
          const canPlay = playable(k);
          const isNext = canPlay && !isDone && !nextMarked;
          if (isNext) nextMarked = true;

          const cls = `knot${isDone ? ' done' : ''}${isNext ? ' next' : ''}${!canPlay ? ' later' : ''}`;
          const dot = el('i');

          const links = jaalFor(k.id).filter((l) => l.otherSection !== section.id);
          const otherNames = Array.from(new Set(links.map((l) => t(`section.${l.otherSection}`))));

          const txtChildren = [
            el('span', { class: 't1', text: t(`knot.${k.id}.t`) }),
            el('span', { class: 't2', text: t(`knot.${k.id}.d`) }),
          ];

          if (otherNames.length > 0) {
            txtChildren.push(
              el('span', {
                class: 'jaal-tag',
                text: t('shala.alsoIn', { s: otherNames.join(', ') }),
              })
            );
          }

          const knotChildren = [
            el('span', { class: 'dot' }, [dot]),
            el('span', { class: 'txt' }, txtChildren),
          ];

          if (isNext) {
            knotChildren.push(el('span', { class: 'tag', text: t('home.startHere') }));
          }

          const knotBtn = el(
            'button',
            {
              class: cls,
              type: 'button',
              onclick: () => openKnot(k),
            },
            knotChildren
          );

          block.appendChild(knotBtn);
        }

        view.appendChild(block);

        if (th.crossing) {
          view.appendChild(
            el('button', {
              class: 'crossing',
              type: 'button',
              text: t(th.crossing),
              onclick: () => toast(t(th.crossing!)),
            })
          );
        }
      }

      const footerLinks = el('div', { class: 'home-links' }, [
        el('button', {
          class: 'btn quiet',
          type: 'button',
          text: t('home.toJaal'),
          onclick: () => router.go('jaal'),
        }),
        el('button', {
          class: 'btn quiet',
          type: 'button',
          text: t('home.notebook'),
          onclick: () => toast(t('home.notInProto')),
        }),
      ]);
      view.appendChild(footerLinks);
    },
  };
}
