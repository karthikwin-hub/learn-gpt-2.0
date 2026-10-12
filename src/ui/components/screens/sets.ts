/**
 * Sorting Courtyard workbench screen (threads S2 & S3).
 * Explores set membership, union, intersection, complement, and mystery rule deduction.
 */

import { t } from '../../../domain/i18n/core';
import {
  createBlocks,
  getRegion,
  RULE_ORDER,
  type RegionCounts,
  type SetRule,
} from '../../../domain/math/sets';
import { clear, el } from '../../util/dom';
import {
  createCourtyard,
  type CourtyardManipulative,
  type RingGeometry,
  COURTYARD_LAYOUTS,
} from '../../manipulatives/courtyard';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

function createStepGuide(num: number, text: string): HTMLElement {
  return el('div', { class: 'step-guide' }, [
    el('span', { class: 'num', text: String(num) }),
    el('p', { text }),
  ]);
}

function createChips<T extends string | number>(
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
      'aria-pressed': isSelected ? 'true' : 'false',
      text: it.label,
      style: { minHeight: '44px', display: 'inline-flex', alignItems: 'center' },
      onclick: () => onChange(it.value),
    });
    group.appendChild(btn);
  });
  return group;
}

export function createSetsScreen(): ScreenMeta {
  return {
    id: 'sets',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title(params = {}) {
      return params.mode === 'guess' ? 'sets.titleGuess' : 'sets.title';
    },
    render(view, state, params = {}) {
      const isGuess = params.mode === 'guess';
      const knotId = isGuess ? 'S3' : 'S2';
      enterThread(knotId, 'sets', { mode: params.mode || 'sort' });

      if (!state.ruleA) {
        state.ruleA = isGuess ? 'green' : 'yellow';
        state.ruleB = isGuess ? 'big' : 'circle';
        state.layout = 'overlap';
        state.rings = COURTYARD_LAYOUTS.overlap;
        state.hi = null;
        state.ga = null;
        state.gb = null;
      }

      const say = el('p', { class: 'say workbench-feedback', hidden: true });
      const countsCard = el('section', { class: 'card' });
      const hiNote = el('p', { class: 'muted' });
      const homelessNote = el('p', { class: 'pointer-note', hidden: true });
      let lastInfo: {
        counts: RegionCounts;
        homeless: number;
        rings: [RingGeometry, RingGeometry];
      } | null = null;

      function rl(k: SetRule): string {
        return t(`rule.${k}`);
      }

      const yard: CourtyardManipulative = createCourtyard({
        ruleA: state.ruleA as SetRule,
        ruleB: state.ruleB as SetRule,
        rings:
          (state.rings as [RingGeometry, RingGeometry]) ||
          COURTYARD_LAYOUTS[(state.layout as string) || 'overlap'],
        hidden: isGuess,
        ruleLabel: rl,
        describe: (c) =>
          t('sets.describe', {
            both: c.both,
            a: c.a,
            b: c.b,
            none: c.none,
          }),
        onMove: (rings) => {
          state.rings = rings;
        },
        onChipTap: (idx) => {
          if (isGuess) return;
          const key = idx === 0 ? 'ruleA' : 'ruleB';
          const other = idx === 0 ? state.ruleB : state.ruleA;
          let i = RULE_ORDER.indexOf(state[key] as SetRule);
          do {
            i = (i + 1) % RULE_ORDER.length;
          } while (RULE_ORDER[i] === other);
          state[key] = RULE_ORDER[i];
          yard.setRules(state.ruleA as SetRule, state.ruleB as SetRule);
        },
        onChange: (info) => {
          lastInfo = info;
          paint(info);
        },
      });

      function paint(info: {
        counts: RegionCounts;
        homeless: number;
        rings: [RingGeometry, RingGeometry];
      }) {
        const c = info.counts;
        const nameA = isGuess ? 'A' : rl(state.ruleA as SetRule);
        const nameB = isGuess ? 'B' : rl(state.ruleB as SetRule);

        clear(countsCard);
        countsCard.appendChild(el('h3', { class: 'pane-title', text: t('sets.counts') }));
        countsCard.appendChild(
          el('div', { class: 'parts' }, [
            el('div', { html: `${t('sets.cBoth')}: <b>${c.both}</b>` }),
            el('div', {
              html: `<span class="a-txt">${t('sets.cA')}</span>: <b>${c.a}</b>`,
            }),
            el('div', {
              html: `<span class="b-txt">${t('sets.cB')}</span>: <b>${c.b}</b>`,
            }),
            el('div', { html: `${t('sets.cNone')}: <b>${c.none}</b>` }),
          ])
        );

        homelessNote.hidden = info.homeless === 0;
        homelessNote.textContent =
          info.homeless > 0 ? t('sets.homeless', { n: info.homeless }) : '';

        if (state.hi === 'and') {
          hiNote.textContent = t('sets.and', { a: nameA, b: nameB, n: c.both });
        } else if (state.hi === 'or') {
          hiNote.textContent = t('sets.or', {
            a: nameA,
            b: nameB,
            n: c.both + c.a + c.b,
          });
        } else if (state.hi === 'not') {
          hiNote.textContent = t('sets.not', { a: nameA, b: nameB, n: c.none });
        } else {
          hiNote.textContent = t('sets.wordsHint');
        }
      }

      view.appendChild(createStepGuide(1, t(isGuess ? 'sets.g1' : 'sets.s1')));
      view.appendChild(el('div', { class: 'model' }, [yard.node]));
      view.appendChild(homelessNote);

      if (isGuess) {
        const pickRow = (which: 'ga' | 'gb') => {
          return createChips(
            RULE_ORDER.map((k) => ({ value: k, label: rl(k) })),
            state[which] as SetRule | null,
            (v) => {
              state[which] = v;
              if (state.ga && state.gb) {
                const ok = yard.setGuess(state.ga as SetRule, state.gb as SetRule);
                const allBlocks = createBlocks();
                const moved = allBlocks.filter(
                  (it) =>
                    getRegion(it, state.ga as SetRule, state.gb as SetRule) !==
                    getRegion(it, state.ruleA as SetRule, state.ruleB as SetRule)
                ).length;
                say.hidden = false;
                say.textContent = ok
                  ? t('sets.solved', {
                      a: rl(state.ruleA as SetRule),
                      b: rl(state.ruleB as SetRule),
                    })
                  : t('sets.wouldMove', { n: moved });
              }
              router.rerender();
            },
            which
          );
        };

        view.appendChild(el('h3', { class: 'pane-title a-txt', text: t('sets.ringA') }));
        view.appendChild(pickRow('ga'));
        view.appendChild(el('h3', { class: 'pane-title b-txt', text: t('sets.ringB') }));
        view.appendChild(pickRow('gb'));
        view.appendChild(say);
      }

      // Word highlight chips: and / or / not
      const wordChips = createChips(
        [
          { value: 'and', label: t('sets.wAnd') },
          { value: 'or', label: t('sets.wOr') },
          { value: 'not', label: t('sets.wNot') },
        ],
        state.hi as 'and' | 'or' | 'not' | null,
        (h) => {
          state.hi = state.hi === h ? null : h;
          yard.highlight(state.hi as 'and' | 'or' | 'not' | null);
          if (lastInfo) paint(lastInfo);
          router.rerender();
        },
        t('sets.words')
      );
      view.appendChild(wordChips);
      view.appendChild(hiNote);

      // Arrange layout chips: overlap / apart / inside
      if (!isGuess) {
        const layoutChips = createChips(
          [
            { value: 'overlap', label: t('sets.overlap') },
            { value: 'apart', label: t('sets.apart') },
            { value: 'inside', label: t('sets.inside') },
          ],
          state.layout as 'overlap' | 'apart' | 'inside',
          (l) => {
            state.layout = l;
            state.rings = COURTYARD_LAYOUTS[l];
            yard.arrange(l);
            router.rerender();
          },
          t('sets.arrange')
        );
        const arrangeRow = el('div', { class: 'control-row' }, [
          el('label', { text: t('sets.arrange') }),
          layoutChips,
        ]);
        view.appendChild(arrangeRow);
      }

      view.appendChild(countsCard);

      const btnRow = el('div', {
        class: 'btn-row',
        style: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' },
      });
      if (knotId === 'S2' || knotId === 'S3') {
        const mistakeBtn = el('button', {
          type: 'button',
          class: 'btn primary',
          text: 'Spot the Mistake →',
          style: { minHeight: '44px' },
          onclick: () => {
            router.go('mistake', { k: knotId });
          },
        });
        btnRow.appendChild(mistakeBtn);
      }
      const explainBtn = el('button', {
        type: 'button',
        class: 'btn',
        text: t('common.explain'),
        style: { minHeight: '44px' },
        onclick: () => {
          router.go('explain', { k: knotId });
        },
      });
      btnRow.appendChild(explainBtn);
      view.appendChild(btnRow);

      if (state.hi) {
        yard.highlight(state.hi as 'and' | 'or' | 'not' | null);
      }
      if (isGuess && state.ga && state.gb) {
        const ok = yard.setGuess(state.ga as SetRule, state.gb as SetRule);
        const allBlocks = createBlocks();
        const moved = allBlocks.filter(
          (it) =>
            getRegion(it, state.ga as SetRule, state.gb as SetRule) !==
            getRegion(it, state.ruleA as SetRule, state.ruleB as SetRule)
        ).length;
        say.hidden = false;
        say.textContent = ok
          ? t('sets.solved', {
              a: rl(state.ruleA as SetRule),
              b: rl(state.ruleB as SetRule),
            })
          : t('sets.wouldMove', { n: moved });
      }

      return () => {
        yard.destroy();
      };
    },
  };
}
