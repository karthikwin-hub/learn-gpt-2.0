/**
 * Shared controls of the Loka benches. They hold no rule: the screen asks its domain module whether a
 * choice fits and repaints. Every control is a button, so it works by keyboard; focus survives repaints.
 */

import { t } from '../../domain/i18n/core';
import { clear, el } from './dom';
import { createStepGuide, setStepGuide, toMistakeButton } from './bench';

export interface LokaFrame {
  model: HTMLElement;
  actions: HTMLElement;
  setGuide(step: number, text: string): void;
  setSay(text: string): void;
  /** Rebuilds model and actions, keeping keyboard focus on the control with the same data-focus. */
  repaint(draw: () => void): void;
}

export function lokaFrame(view: HTMLElement, titleKey: string): LokaFrame {
  const guide = createStepGuide(1, '');
  const model = el('div', { class: 'model loka-model' });
  const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite', hidden: true });
  const actions = el('div', { class: 'loka-actions' });
  view.appendChild(el('h2', { class: 'screen-title', text: t(titleKey) }));
  view.append(guide, model, say, actions);
  return {
    model,
    actions,
    setGuide: (step, text) => setStepGuide(guide, step, text),
    setSay(text) {
      say.textContent = text;
      say.hidden = !text;
    },
    repaint(draw) {
      const active = document.activeElement as HTMLElement | null;
      const key = active && view.contains(active) ? active.dataset.focus : undefined;
      clear(model);
      clear(actions);
      draw();
      if (key) {
        const again = view.querySelector<HTMLElement>(`[data-focus="${CSS.escape(key)}"]`);
        (again || actions.querySelector<HTMLElement>('button'))?.focus();
      }
    },
  };
}

export function actionButton(text: string, onclick: () => void, primary = true): HTMLElement {
  return el('button', {
    class: primary ? 'btn primary block' : 'btn quiet block',
    type: 'button',
    'data-focus': `action:${text}`,
    text,
    onclick,
  });
}

export function mistakeRow(knotId: string): HTMLElement {
  return el('div', { class: 'btn-row' }, [toMistakeButton(knotId)]);
}

export interface Choice {
  id: string;
  text: string;
}

/** One row of choices; `pressed` marks the current one (for toggles). */
export function choiceRow(
  label: string,
  options: Choice[],
  onPick: (id: string) => void,
  pressed?: string
): HTMLElement {
  return el(
    'div',
    { class: 'loka-choices', role: 'group', 'aria-label': label },
    options.map((o) =>
      el('button', {
        class: 'chip loka-chip',
        type: 'button',
        'data-focus': `choice:${label}:${o.id}`,
        'aria-pressed': pressed === undefined ? undefined : String(pressed === o.id),
        text: o.text,
        onclick: () => onPick(o.id),
      })
    )
  );
}

export interface PairPad {
  label: string;
  /** Items still to place. */
  items: Choice[];
  places: Choice[];
  /** Items already placed, per place id. */
  placed: Record<string, Choice[]>;
  selected: string | null;
  onSelect(id: string | null): void;
  onPlace(item: string, place: string): void;
}

/** Choose an item, then the place it belongs: used for sorting into groups and for matching pairs. */
export function pairPad(p: PairPad): HTMLElement {
  const items = el(
    'div',
    { class: 'loka-choices loka-items', role: 'group', 'aria-label': p.label },
    p.items.map((o) =>
      el('button', {
        class: 'chip loka-chip',
        type: 'button',
        'data-focus': `item:${o.id}`,
        'aria-pressed': String(p.selected === o.id),
        text: o.text,
        onclick: () => p.onSelect(p.selected === o.id ? null : o.id),
      })
    )
  );
  const places = el(
    'div',
    { class: 'loka-places' },
    p.places.map((pl) =>
      el(
        'button',
        {
          class: 'loka-place',
          type: 'button',
          'data-focus': `place:${pl.id}`,
          disabled: p.selected === null,
          onclick: () => {
            if (p.selected) p.onPlace(p.selected, pl.id);
          },
        },
        [
          el('span', { class: 'loka-place-name', text: pl.text }),
          ...(p.placed[pl.id] || []).map((c) => el('span', { class: 'loka-placed', text: c.text })),
        ]
      )
    )
  );
  return el('div', { class: 'loka-pair' }, [items, places]);
}

/** Tap the items in order; `done` are those already in place. */
export function orderPad(
  label: string,
  remaining: Choice[],
  done: Choice[],
  onPick: (id: string) => void
): HTMLElement {
  return el('div', { class: 'loka-order' }, [
    el(
      'ol',
      { class: 'loka-order-done' },
      done.map((d) => el('li', { text: d.text }))
    ),
    choiceRow(label, remaining, onPick),
  ]);
}
