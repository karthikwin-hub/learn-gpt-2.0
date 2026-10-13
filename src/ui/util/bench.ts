/**
 * Shared pieces of every bench screen: the numbered step guide and the way on to Spot-the-mistake.
 */

import { t } from '../../domain/i18n/core';
import { router } from '../components/app/router';
import { el } from './dom';

/** The bench step from `?step=` or saved state; anything that is not a whole number in 1..last is ignored. */
export function readStep(fromUrl: string | undefined, saved: unknown, last: number): number {
  const valid = (n: number) => Number.isInteger(n) && n >= 1 && n <= last;
  const asked = fromUrl === undefined || fromUrl === '' ? NaN : Number(fromUrl);
  if (valid(asked)) return asked;
  if (fromUrl) console.warn(`Ignoring step "${fromUrl}"; this bench has steps 1 to ${last}`);
  return typeof saved === 'number' && valid(saved) ? saved : 1;
}

export function createStepGuide(num: number, text: string): HTMLElement {
  return el('div', { class: 'step-guide' }, [
    el('span', { class: 'num', text: String(num) }),
    el('p', { text }),
  ]);
}

export function setStepGuide(guide: HTMLElement, num: number, text: string): void {
  const n = guide.querySelector('.num');
  const p = guide.querySelector('p');
  if (n) n.textContent = String(num);
  if (p) p.textContent = text;
}

export function toMistakeButton(knotId: string): HTMLElement {
  return el('button', {
    class: 'btn primary block',
    type: 'button',
    text: t('bench.toMistake'),
    onclick: () => router.go('mistake', { k: knotId }),
  });
}
