/**
 * Ashram (Home) screen: Banyan courtyard, 3 Shala entry cards, Continue card, and Remember card.
 */

import { SECTIONS, findKnot, knotsIn } from '../../../domain/curriculum/curriculum';
import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { renderBanyanTree, renderShalaMotif } from '../../diagrams/banyan';
import { el, svg, toast } from '../../util/dom';
import { router, type ScreenMeta } from '../app/router';

export function createAshramScreen(): ScreenMeta {
  return {
    id: 'home',
    title: 'home.title',
    hideBack: true,
    render(view, state) {
      const doneKnots = storage.get<string[]>('done', []);
      const cont = storage.get<{
        knot: string;
        route: string;
        params?: Record<string, string>;
      } | null>('continue', null);

      // Banyan art
      const art = renderBanyanTree();
      view.appendChild(el('div', { class: 'ashram-art' }, [art]));
      view.appendChild(el('p', { class: 'loom-intro', text: t('ashram.intro') }));

      // Continue card (if in-progress knot exists)
      if (cont && findKnot(cont.knot)) {
        const knotTitle = t(`knot.${cont.knot}.t`);
        const continueCard = el('div', { class: 'continue-card ashram-continue' }, [
          el(
            'button',
            {
              class: 'continue-card-btn',
              type: 'button',
              onclick: () => {
                router.go(cont.route, cont.params);
              },
            },
            [
              el('span', { class: 'thumb' }, [
                svg(
                  'svg',
                  {
                    viewBox: '0 0 24 24',
                    width: '28',
                    height: '28',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '2',
                    'stroke-linecap': 'round',
                    'aria-hidden': 'true',
                  },
                  [svg('path', { d: 'M8 5l8 7-8 7' })]
                ),
              ]),
              el('span', {}, [
                el('span', { class: 'label', text: t('home.continue') }),
                el('br'),
                el('span', { class: 'name', text: knotTitle }),
              ]),
            ]
          ),
        ]);
        view.appendChild(continueCard);
      }

      // Remember card (retrieval practice for kept sutras)
      const keptSutras = storage.get<string[]>('sutras', []).filter((id) => findKnot(id));
      if (keptSutras.length > 0) {
        const knotId = keptSutras[0];
        const isRevealed = state.revealed === knotId;
        const rememberCard = el('section', { class: 'card remember' }, [
          el('h3', { class: 'pane-title', text: t('ashram.remember') }),
          el('p', { text: t('ashram.rememberQ', { name: t(`knot.${knotId}.t`) }) }),
        ]);

        if (isRevealed) {
          rememberCard.appendChild(
            el('p', { class: 'sutra-line', text: t(`bodha.${knotId}.sutra`) })
          );
        } else {
          rememberCard.appendChild(
            el('button', {
              class: 'btn quiet',
              type: 'button',
              text: t('ashram.reveal'),
              onclick: () => {
                state.revealed = knotId;
                router.rerender();
              },
            })
          );
        }
        view.appendChild(rememberCard);
      }

      // 3 Shala Cards
      const shalaList = el('div', { class: 'shala-list' });
      for (const section of SECTIONS) {
        const sectionKnots = knotsIn(section.id);
        const exploredCount = sectionKnots.filter((k) => doneKnots.includes(k.id)).length;
        const metaText =
          t('ashram.threads', { n: section.threads.length }) +
          (exploredCount ? ` · ${t('ashram.explored', { n: exploredCount })}` : '');

        const shalaCard = el(
          'button',
          {
            class: 'shala-card',
            type: 'button',
            onclick: () => {
              router.go('shala', { s: section.id });
            },
          },
          [
            el('span', { class: 'motif' }, [renderShalaMotif(section.id)]),
            el('span', { class: 'body' }, [
              el('span', { class: 'name', text: t(`section.${section.id}`) }),
              el('span', { class: 'sub', text: t(`section.${section.id}.sub`) }),
              el('span', { class: 'meta', text: metaText }),
            ]),
          ]
        );
        shalaList.appendChild(shalaCard);
      }
      view.appendChild(shalaList);

      // Footer navigation links
      const navRow = el('div', { class: 'home-links' }, [
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
      view.appendChild(navRow);

      const grownupsRow = el('div', { class: 'home-links end' }, [
        el('button', {
          class: 'link-btn',
          type: 'button',
          text: t('home.grownups'),
          onclick: () => router.go('grownups'),
        }),
      ]);
      view.appendChild(grownupsRow);
    },
  };
}
