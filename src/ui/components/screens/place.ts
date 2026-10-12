/**
 * Place-value houses workbench screen (Knot N1).
 * Interactive Indian numeral place-value house sliding up to Crores.
 */

import {
  decomposePlaceValue,
  formatIndianNumeral,
  adjustDigit,
} from '../../../domain/math/numbers';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createPlaceScreen(): ScreenMeta {
  return {
    id: 'place',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'place.title',
    render(view, state, params = {}) {
      enterThread('N1', 'place', params);

      const parsedNum = params.n ? parseInt(params.n, 10) : NaN;
      let currentVal =
        !isNaN(parsedNum) && parsedNum >= 0
          ? parsedNum
          : typeof state.num === 'number'
            ? state.num
            : 12500000; // default 1,25,00,000

      state.num = currentVal;

      const titleEl = el('h2', { class: 'screen-title', text: t('place.title') });
      const subEl = el('p', {
        class: 'screen-sub',
        text: t('place.s1'),
      });

      const displayCard = el('section', { class: 'card place-display', 'aria-live': 'polite' });
      const numLabel = el('div', { class: 'place-num', text: formatIndianNumeral(currentVal) });
      const expandedLabel = el('div', { class: 'place-expanded' });
      displayCard.appendChild(numLabel);
      displayCard.appendChild(expandedLabel);

      const housesContainer = el('div', {
        class: 'place-houses-container',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          margin: '16px 0',
        },
      });

      function update(): void {
        state.num = currentVal;
        const dec = decomposePlaceValue(currentVal);
        numLabel.textContent = dec.formatted;
        expandedLabel.textContent = `${t('place.expandedLabel')}: ${dec.expandedTerms.join(' + ')}`;

        clear(housesContainer);
        for (const house of dec.houses) {
          const houseCard = el('div', {
            class: `card place-house house-${house.id}`,
            style: {
              border: '2px solid var(--hair)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
              background: 'var(--paper-raised)',
            },
          });

          houseCard.appendChild(
            el('h4', {
              class: 'house-name',
              text: house.name,
              style: { margin: '0 0 8px 0', color: 'var(--indigo)' },
            })
          );

          const digitsRow = el('div', {
            class: 'house-digits',
            style: { display: 'flex', justifyContent: 'center', gap: '8px' },
          });

          for (const d of house.digits) {
            const digitCol = el('div', {
              class: 'digit-col',
              style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
            });

            digitCol.appendChild(
              el('span', {
                class: 'digit-name',
                text: d.name,
                style: { fontSize: '11px', color: 'var(--ink-soft)' },
              })
            );

            const incBtn = el('button', {
              class: 'btn icon mini',
              type: 'button',
              'aria-label': t('place.increase', { place: d.name }),
              text: '▲',
              onclick: () => {
                currentVal = adjustDigit(currentVal, d.multiplier, 1);
                update();
              },
            });

            const valDisplay = el('span', {
              class: 'digit-val',
              text: String(d.digit),
              style: {
                fontSize: '24px',
                fontWeight: 'bold',
                minWidth: '24px',
                textAlign: 'center',
              },
            });

            const decBtn = el('button', {
              class: 'btn icon mini',
              type: 'button',
              'aria-label': t('place.decrease', { place: d.name }),
              text: '▼',
              onclick: () => {
                currentVal = adjustDigit(currentVal, d.multiplier, -1);
                update();
              },
            });

            digitCol.appendChild(incBtn);
            digitCol.appendChild(valDisplay);
            digitCol.appendChild(decBtn);
            digitsRow.appendChild(digitCol);
          }

          houseCard.appendChild(digitsRow);
          housesContainer.appendChild(houseCard);
        }
      }

      // Quick example chips
      const chipsRow = el('div', {
        class: 'chips-row',
        style: { display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0' },
      });

      const examples = [
        { label: t('place.chipBundle'), val: 99999 },
        { label: '3,05,200', val: 305200 },
        { label: '1,25,00,000', val: 12500000 },
      ];

      for (const ex of examples) {
        chipsRow.appendChild(
          el('button', {
            class: 'btn chip',
            type: 'button',
            text: ex.label,
            onclick: () => {
              currentVal = ex.val;
              update();
            },
          })
        );
      }

      const actionsRow = el('div', {
        class: 'actions-row',
        style: { display: 'flex', gap: '12px', marginTop: '16px' },
      });

      const addOneBtn = el('button', {
        class: 'btn primary',
        type: 'button',
        text: t('place.addOne'),
        onclick: () => {
          currentVal = Math.min(999999999, currentVal + 1);
          update();
        },
      });

      const resetBtn = el('button', {
        class: 'btn ghost',
        id: 'btn-reset',
        type: 'button',
        text: t('common.reset'),
        onclick: () => {
          currentVal = 0;
          update();
        },
      });

      actionsRow.appendChild(addOneBtn);
      actionsRow.appendChild(resetBtn);

      view.appendChild(titleEl);
      view.appendChild(subEl);
      view.appendChild(displayCard);
      view.appendChild(housesContainer);
      view.appendChild(chipsRow);
      view.appendChild(actionsRow);

      update();
    },
  };
}
