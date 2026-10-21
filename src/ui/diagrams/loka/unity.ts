/**
 * C9 drawing: five greeting cards, each in its own script, with the language under the ones matched.
 */

import { GREETINGS, type Greeting } from '../../../domain/world/unity';
import type { MainLanguage } from '../../../domain/world/states';
import { t } from '../../../domain/i18n/core';
import { figRect, figSvg, figText } from '../fig';

export interface GreetingsOptions {
  matched?: readonly MainLanguage[];
}

const CARD_W = 110;
const CARD_H = 58;
/** Three cards on the top row, two centred below, so each script is large enough to read. */
const CARD_AT: readonly (readonly [number, number])[] = [
  [6, 6],
  [125, 6],
  [244, 6],
  [65, 72],
  [185, 72],
];

function card(s: SVGSVGElement, g: Greeting, x: number, y: number, known: boolean): void {
  s.appendChild(
    figRect(x, y, CARD_W, CARD_H, {
      fill: known ? 'var(--leaf-soft)' : 'var(--paper-raised)',
      stroke: 'var(--ink-soft)',
      rx: 8,
    })
  );
  const word = figText(x + CARD_W / 2, y + (known ? 26 : 35), g.text, {
    size: g.text.length > 8 ? 15 : 18,
    weight: 700,
  });
  word.setAttribute('lang', g.tag);
  s.appendChild(word);
  if (known) {
    s.appendChild(figText(x + CARD_W / 2, y + 48, t(`states.lang.${g.language}`), { size: 12 }));
  }
}

export function renderGreetings(o: GreetingsOptions = {}): SVGSVGElement {
  const matched = o.matched ?? [];
  const label = matched.length
    ? matched.map((l) => t(`states.lang.${l}`)).join(', ')
    : t('unity.cards');
  const s = figSvg(360, 136, label);
  GREETINGS.forEach((g, i) => {
    const [x, y] = CARD_AT[i] ?? [0, 0];
    card(s, g, x, y, matched.includes(g.language));
  });
  return s;
}
