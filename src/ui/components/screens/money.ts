/**
 * Rupee & Paise Grid currency workbench screen (Knot U1).
 * Interactive cash drawer and exchange grid: 100 paise = ₹1.
 */

import {
  DENOMINATIONS,
  createEmptyDrawer,
  calculateTotalPaise,
  formatRupees,
  canExchangePaiseToRupee,
  exchangePaiseToRupee,
  modifyDrawer,
  type MoneyDrawer,
} from '../../../domain/math/money';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createMoneyScreen(): ScreenMeta {
  return {
    id: 'money',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'money.title',
    render(view, state, params = {}) {
      enterThread('U1', 'money', params);

      let drawer: MoneyDrawer =
        state.drawer && typeof state.drawer === 'object'
          ? (state.drawer as MoneyDrawer)
          : createEmptyDrawer();

      // Ensure default starting amount: two 50p coins and one ₹1 coin for immediate exchange play
      if (calculateTotalPaise(drawer) === 0 && !state.initialized) {
        drawer = modifyDrawer(drawer, 'p50', 2);
        drawer = modifyDrawer(drawer, 'r1', 1);
        state.initialized = true;
      }
      state.drawer = drawer;

      const titleEl = el('h2', { class: 'screen-title', text: t('money.title') });
      const subEl = el('p', {
        class: 'screen-sub',
        text: t('money.s1'),
      });

      const displayCard = el('section', { class: 'card money-display', 'aria-live': 'polite' });
      const totalAmount = el('div', {
        class: 'money-total',
        style: { fontSize: '28px', fontWeight: 'bold', color: 'var(--indigo)' },
      });
      const paiseNotice = el('div', {
        class: 'paise-notice',
        style: { color: 'var(--ink-soft)', fontSize: '14px', marginTop: '4px' },
      });
      displayCard.appendChild(totalAmount);
      displayCard.appendChild(paiseNotice);

      // Exchange button row
      const exchangeCard = el('section', {
        class: 'card exchange-card',
        style: { margin: '12px 0' },
      });
      const exchangeBtn = el('button', {
        class: 'btn primary block btn-exchange',
        type: 'button',
        text: t('money.exchange'),
        onclick: () => {
          const res = exchangePaiseToRupee(drawer);
          if (res.exchanged) {
            drawer = res.drawer;
            update();
          }
        },
      });
      exchangeCard.appendChild(exchangeBtn);

      // Denominations grid container
      const traysContainer = el('div', {
        class: 'money-trays',
        style: { display: 'flex', flexDirection: 'column', gap: '16px', margin: '16px 0' },
      });

      function update(): void {
        state.drawer = drawer;
        const totalPaise = calculateTotalPaise(drawer);
        totalAmount.textContent = formatRupees(totalPaise);
        paiseNotice.textContent = t('money.paiseSummary', { n: totalPaise });

        const canEx = canExchangePaiseToRupee(drawer);
        exchangeBtn.disabled = !canEx;
        exchangeBtn.style.opacity = canEx ? '1' : '0.5';

        clear(traysContainer);

        // Group into coins and notes
        const coins = DENOMINATIONS.filter((d) => d.type === 'coin');
        const notes = DENOMINATIONS.filter((d) => d.type === 'note');

        const groups = [
          { name: t('money.coins'), items: coins },
          { name: t('money.notes'), items: notes },
        ];

        for (const grp of groups) {
          const grpBox = el('div', { class: 'tray-group card' });
          grpBox.appendChild(
            el('h4', {
              style: { margin: '0 0 10px 0', fontSize: '15px' },
              text: grp.name,
            })
          );

          const itemsGrid = el('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '10px',
            },
          });

          for (const item of grp.items) {
            const count = drawer[item.id] || 0;
            const itemBox = el('div', {
              class: `denom-box item-${item.id}`,
              style: {
                border: '1px solid var(--hair)',
                borderRadius: '8px',
                padding: '8px',
                textAlign: 'center',
                background: 'var(--paper-raised)',
              },
            });

            // Badge representation
            const badge = el('div', {
              class: `denom-badge ${item.type}`,
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: item.type === 'coin' ? '36px' : '54px',
                height: item.type === 'coin' ? '36px' : '30px',
                borderRadius: item.type === 'coin' ? '50%' : '4px',
                border: '2px solid var(--ink)',
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '6px',
                background: item.type === 'coin' ? 'var(--paper-sunk)' : 'var(--leaf-soft)',
              },
              text: item.label,
            });

            const countDisplay = el('div', {
              class: 'denom-count',
              style: { fontSize: '16px', fontWeight: '600', margin: '4px 0' },
              text: `× ${count}`,
            });

            const btnRow = el('div', {
              style: { display: 'flex', justifyContent: 'center', gap: '6px' },
            });

            const plusBtn = el('button', {
              class: 'btn icon mini',
              type: 'button',
              'aria-label': t('money.addDenom', { label: item.label }),
              text: '+',
              onclick: () => {
                drawer = modifyDrawer(drawer, item.id, 1);
                update();
              },
            });

            const minusBtn = el('button', {
              class: 'btn icon mini',
              type: 'button',
              'aria-label': t('money.removeDenom', { label: item.label }),
              text: '−',
              onclick: () => {
                drawer = modifyDrawer(drawer, item.id, -1);
                update();
              },
            });

            btnRow.appendChild(minusBtn);
            btnRow.appendChild(plusBtn);

            itemBox.appendChild(badge);
            itemBox.appendChild(countDisplay);
            itemBox.appendChild(btnRow);
            itemsGrid.appendChild(itemBox);
          }

          grpBox.appendChild(itemsGrid);
          traysContainer.appendChild(grpBox);
        }
      }

      // Quick preset chips
      const chipsRow = el('div', {
        class: 'chips-row',
        style: { display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0' },
      });

      const examples = [
        {
          label: t('money.chipExchange'),
          apply: () => {
            drawer = createEmptyDrawer();
            drawer = modifyDrawer(drawer, 'p50', 3);
          },
        },
        {
          label: '₹2.50',
          apply: () => {
            drawer = createEmptyDrawer();
            drawer = modifyDrawer(drawer, 'r2', 1);
            drawer = modifyDrawer(drawer, 'p50', 1);
          },
        },
        {
          label: '₹10.00',
          apply: () => {
            drawer = createEmptyDrawer();
            drawer = modifyDrawer(drawer, 'r10', 1);
          },
        },
      ];

      for (const ex of examples) {
        chipsRow.appendChild(
          el('button', {
            class: 'btn chip',
            type: 'button',
            text: ex.label,
            onclick: () => {
              ex.apply();
              update();
            },
          })
        );
      }

      const actionsRow = el('div', {
        class: 'actions-row',
        style: { display: 'flex', gap: '12px', marginTop: '16px' },
      });

      const resetBtn = el('button', {
        class: 'btn ghost',
        id: 'btn-reset',
        type: 'button',
        text: t('common.reset'),
        onclick: () => {
          drawer = createEmptyDrawer();
          update();
        },
      });

      actionsRow.appendChild(resetBtn);

      view.appendChild(titleEl);
      view.appendChild(subEl);
      view.appendChild(displayCard);
      view.appendChild(exchangeCard);
      view.appendChild(traysContainer);
      view.appendChild(chipsRow);
      view.appendChild(actionsRow);

      update();
    },
  };
}
