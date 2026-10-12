/**
 * Logic workbench screen (thread L2 Marble Machine).
 * Explores boolean logic gates (AND, OR, NOT), input permutations, physical routes,
 * dynamic truth tables, and mystery gate deduction.
 */

import { t } from '../../../domain/i18n/core';
import {
  type GateType,
  getGateInputs,
  getRowKey,
  isTableComplete,
} from '../../../domain/math/logic';
import { clear, el } from '../../util/dom';
import { createMarbles, type MarblesManipulative } from '../../manipulatives/marbles';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

function createStepGuide(num: number, text: string): HTMLElement {
  return el('div', { class: 'step-guide' }, [
    el('span', { class: 'num', text: String(num) }),
    el('p', { text }),
  ]);
}

function createChips<T extends string>(
  items: { value: T; label: string }[],
  selected: T | null,
  onChange: (val: T) => void,
  ariaLabel: string
): HTMLElement {
  const group = el('div', { class: 'chip-group', role: 'group', 'aria-label': ariaLabel });
  items.forEach((it) => {
    const isSelected = it.value === selected;
    const btn = el('button', {
      type: 'button',
      class: `chip${isSelected ? ' on' : ''}`,
      style: { minHeight: '44px' },
      'aria-pressed': isSelected ? 'true' : 'false',
      text: it.label,
      onclick: () => onChange(it.value),
    });
    group.appendChild(btn);
  });
  return group;
}

export function createLogicScreen(): ScreenMeta {
  return {
    id: 'logic',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title() {
      return 'logic.title';
    },
    render(view, state) {
      enterThread('L2', 'logic');

      if (!state.type) {
        state.type = 'and';
        state.a = true;
        state.b = false;
        state.rows = {} as Record<string, boolean>;
        state.mystery = false;
        state.mysteryType = 'and';
        state.solved = false;
        state.latest = null;
      }

      const say = el('p', { class: 'say workbench-feedback', hidden: true });
      const tableCard = el('section', { class: 'card' });
      const doorRow = el('div', { class: 'btn-row' });
      const gateRow = el('div', { class: 'control-row' });

      const gateNames: Record<GateType, string> = {
        and: t('gate.and'),
        or: t('gate.or'),
        not: t('gate.not'),
      };

      const showType = (): GateType => (state.mystery ? state.mysteryType : state.type) as GateType;

      const machine: MarblesManipulative = createMarbles({
        type: showType(),
        a: state.a as boolean,
        b: state.b as boolean,
        yesLabel: t('logic.yes'),
        noLabel: t('logic.no'),
        describe: (_ty, da, db) =>
          t('logic.describe', {
            a: da ? t('logic.open') : t('logic.shut'),
            b: db ? t('logic.open') : t('logic.shut'),
          }),
      });

      machine.setHidden(Boolean(state.mystery && !state.solved));

      function paintDoors() {
        clear(doorRow);
        const curType = showType();
        const btnA = el('button', {
          type: 'button',
          class: 'btn',
          style: { borderColor: 'var(--indigo)', minHeight: '44px' },
          'aria-pressed': String(state.a),
          text: `A: ${state.a ? t('logic.open') : t('logic.shut')}`,
          onclick: () => {
            state.a = !state.a;
            machine.setInputs(state.a as boolean, state.b as boolean);
            paintDoors();
          },
        });
        doorRow.appendChild(btnA);

        if (curType !== 'not') {
          const btnB = el('button', {
            type: 'button',
            class: 'btn',
            style: { borderColor: 'var(--teal)', minHeight: '44px' },
            'aria-pressed': String(state.b),
            text: `B: ${state.b ? t('logic.open') : t('logic.shut')}`,
            onclick: () => {
              state.b = !state.b;
              machine.setInputs(state.a as boolean, state.b as boolean);
              paintDoors();
            },
          });
          doorRow.appendChild(btnB);
        }
      }

      function paintTable() {
        clear(tableCard);
        const curType = showType();
        tableCard.appendChild(el('h3', { class: 'pane-title', text: t('logic.table') }));

        const thCols = [el('th', { class: 'a-txt', text: 'A' })];
        if (curType !== 'not') {
          thCols.push(el('th', { class: 'b-txt', text: 'B' }));
        }
        thCols.push(el('th', { text: t('logic.marble') }));

        const thead = el('thead', {}, [el('tr', {}, thCols)]);
        const tbody = el('tbody');
        const recorded = (state.rows || {}) as Record<string, boolean>;

        const inputs = getGateInputs(curType);
        inputs.forEach((inp) => {
          const inA = inp[0];
          const inB = inp[1] ?? false;
          const k = getRowKey(curType, inA, inB);
          const tried = recorded[k] !== undefined;

          const tr = el('tr', {
            class: `${tried ? '' : 'empty'}${state.latest === k ? ' latest' : ''}`,
          });
          tr.appendChild(el('td', { text: inA ? t('logic.open') : t('logic.shut') }));
          if (curType !== 'not') {
            tr.appendChild(el('td', { text: inB ? t('logic.open') : t('logic.shut') }));
          }
          tr.appendChild(
            el('td', {
              class: tried ? (recorded[k] ? 'yes' : 'no') : '',
              text: tried ? (recorded[k] ? t('logic.yes') : t('logic.no')) : '?',
            })
          );
          tbody.appendChild(tr);
        });

        tableCard.appendChild(el('table', { class: 'truth' }, [thead, tbody]));

        const complete = isTableComplete(curType, recorded);
        if (complete && !state.mystery) {
          tableCard.appendChild(el('p', { class: 'say', text: t(`logic.rule.${curType}`) }));
        }

        if (complete && state.mystery && !state.solved) {
          tableCard.appendChild(el('p', { text: t('logic.whichGate') }));
          const guessChips = createChips(
            (['and', 'or', 'not'] as GateType[]).map((g) => ({
              value: g,
              label: gateNames[g],
            })),
            null,
            (g) => {
              if (g === state.mysteryType) {
                state.solved = true;
                machine.setHidden(false);
                say.hidden = false;
                say.textContent = t('logic.solved', { g: gateNames[g] });
                paintTable();
              } else {
                say.hidden = false;
                say.textContent = t('logic.notThat', { g: gateNames[g] });
              }
            },
            t('logic.whichGate')
          );
          tableCard.appendChild(guessChips);
        }
      }

      function paintGates() {
        clear(gateRow);
        const items = (['and', 'or', 'not'] as GateType[])
          .map((g) => ({ value: g, label: gateNames[g] }))
          .concat([{ value: 'mystery' as GateType, label: t('logic.mystery') }]);

        const activeVal = state.mystery ? 'mystery' : (state.type as string);
        const chips = createChips(
          items,
          activeVal,
          (g) => {
            state.rows = {};
            state.latest = null;
            state.solved = false;
            say.hidden = true;
            say.textContent = '';

            if (g === 'mystery') {
              state.mystery = true;
              const opts: GateType[] = ['and', 'or', 'not'];
              state.mysteryType = opts[Math.floor(Math.random() * 3)];
            } else {
              state.mystery = false;
              state.type = g;
            }

            machine.setType(showType());
            machine.setHidden(Boolean(state.mystery && !state.solved));
            paintDoors();
            paintTable();
            paintGates();
          },
          t('logic.gate')
        );

        gateRow.appendChild(chips);
      }

      const dropBtn = el('button', {
        type: 'button',
        class: 'btn primary block',
        style: { minHeight: '44px' },
        text: t('logic.drop'),
        onclick: () => {
          if (machine.busy()) return;
          const aVal = Boolean(state.a);
          const bVal = Boolean(state.b);
          machine.drop((yes) => {
            const k = getRowKey(showType(), aVal, bVal);
            if (!state.rows) state.rows = {};
            (state.rows as Record<string, boolean>)[k] = yes;
            state.latest = k;
            paintTable();
          });
        },
      });

      const nextBtn = el('button', {
        type: 'button',
        class: 'btn primary block',
        style: { minHeight: '44px' },
        text: 'Spot the Mistake →',
        onclick: () => {
          router.go('mistake', { k: 'L2' });
        },
      });

      view.appendChild(el('h2', { class: 'screen-title', text: t('logic.title') }));
      view.appendChild(createStepGuide(1, t('logic.s1')));
      view.appendChild(gateRow);
      view.appendChild(el('div', { class: 'model' }, [machine.node]));
      view.appendChild(doorRow);
      view.appendChild(el('div', { class: 'btn-row' }, [dropBtn]));
      view.appendChild(say);
      view.appendChild(tableCard);
      view.appendChild(el('div', { class: 'btn-row' }, [nextBtn]));

      paintGates();
      paintDoors();
      paintTable();

      return () => {
        machine.destroy();
      };
    },
  };
}
