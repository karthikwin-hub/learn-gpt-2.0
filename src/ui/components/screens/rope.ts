/**
 * Rope and Pegs workbench screen (thread G2).
 * Investigates perimeter versus area using a closed rope of fixed length.
 * As the corner slides along the diagonal, perimeter remains constant while area varies.
 * Ghosts of tried rectangles and the Area Hill bar chart illustrate that the square holds the most.
 */

import { t } from '../../../domain/i18n/core';
import type { RopeRectangle } from '../../../domain/math/geometry';
import { clear, createStepper, el } from '../../util/dom';
import {
  createRopeManipulative,
  renderAreaHill,
  type RopeManipulative,
} from '../../manipulatives/rope';
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
  selected: T,
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
      onclick: () => onChange(it.value),
    });
    group.appendChild(btn);
  });
  return group;
}

export function createRopeScreen(): ScreenMeta {
  return {
    id: 'rope',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'rope.title',
    render(view, state, params = {}) {
      enterThread('G2', 'rope');

      const parsedP = params.p ? parseInt(params.p, 10) : NaN;
      const parsedW = params.w ? parseInt(params.w, 10) : NaN;

      const perimeter = !isNaN(parsedP)
        ? parsedP
        : typeof state.perimeter === 'number'
          ? state.perimeter
          : 24;

      const currentW = !isNaN(parsedW) ? parsedW : typeof state.w === 'number' ? state.w : 1;

      state.perimeter = perimeter;
      state.w = currentW;
      if (!state.tried) {
        state.tried = {} as Record<number, RopeRectangle>;
      }

      const say = el('p', { class: 'say workbench-feedback', hidden: true });
      const read = el('div', { class: 'rope-readout' });
      const hill = el('div', { class: 'rope-hill-container' });
      let squareSaid = false;

      const rope: RopeManipulative = createRopeManipulative({
        perimeter: Number(state.perimeter),
        width: Number(state.w),
        initialTried: state.tried as Record<number, RopeRectangle>,
        handleLabel: t('rope.handle'),
        onChange: (r, triedMap) => {
          state.w = r.w;
          state.tried = triedMap;
          wStep.set(r.w);
          paint(r, triedMap);
        },
      });

      const wStep = createStepper({
        value: Number(state.w),
        min: 1,
        max: Number(state.perimeter) / 2 - 1,
        label: t('rope.width'),
        onChange: (v) => {
          rope.set(v);
        },
      });

      function paint(r: RopeRectangle, triedMap: Record<number, RopeRectangle>) {
        clear(read);
        const perimEq = el('div', {
          class: 'eq',
          style: { fontSize: '20px' },
          html: `<span class="a">${r.w}</span> + <span class="b">${r.h}</span> + <span class="a">${r.w}</span> + <span class="b">${r.h}</span> = <span class="t">${r.perimeter} m</span>`,
        });
        const note = el('p', { class: 'muted small', text: t('rope.perimNote') });
        const areaEq = el('div', {
          class: 'eq',
          html: `${t('rope.area')} = <span class="a">${r.w}</span> × <span class="b">${r.h}</span> = <span class="r">${r.area}</span> m²`,
        });
        read.appendChild(perimEq);
        read.appendChild(note);
        read.appendChild(areaEq);

        clear(hill);
        const cardTitle = el('h3', { text: t('rope.hill') });
        const hillSvg = renderAreaHill(Number(state.perimeter), triedMap, r);
        const hillCard = el('section', { class: 'card' }, [cardTitle, hillSvg]);
        hill.appendChild(hillCard);

        if (r.w === r.h && !squareSaid) {
          squareSaid = true;
          say.textContent = t('rope.square', { s: r.w, n: r.area });
          say.hidden = false;
        } else if (r.w !== r.h) {
          squareSaid = false;
          say.hidden = true;
        }
      }

      view.appendChild(createStepGuide(1, t('rope.s1', { p: Number(state.perimeter) })));
      view.appendChild(el('div', { class: 'model' }, [rope.node]));
      view.appendChild(read);

      const widthRow = el('div', { class: 'control-row' }, [
        el('label', { text: t('rope.width') }),
        wStep.node,
      ]);
      view.appendChild(widthRow);

      const lengthChips = createChips(
        [
          { value: 24, label: '24 m' },
          { value: 20, label: '20 m' },
        ],
        Number(state.perimeter),
        (p) => {
          state.perimeter = p;
          state.w = 1;
          state.tried = {};
          rope.setPerimeter(p);
          router.rerender();
        },
        t('rope.length')
      );
      const lengthRow = el('div', { class: 'control-row' }, [
        el('label', { text: t('rope.length') }),
        lengthChips,
      ]);
      view.appendChild(lengthRow);

      view.appendChild(say);
      view.appendChild(hill);

      const explainBtn = el('button', {
        type: 'button',
        class: 'btn primary block',
        text: t('common.explain'),
        onclick: () => {
          router.go('explain', { k: 'G2' });
        },
      });
      view.appendChild(el('div', { class: 'btn-row' }, [explainBtn]));

      paint(rope.get(), rope.tried());

      return () => {
        rope.destroy();
      };
    },
  };
}
