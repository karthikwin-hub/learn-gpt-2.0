/**
 * Lesson pictures for the Loka itihasa knots (feature 047): Prashna art, card figures and mistake pictures.
 */

import { t } from '../../domain/i18n/core';
import { DIG_LAYERS } from '../../domain/world/sources';
import { renderClueShelf, renderDig } from '../diagrams/loka/dig';
import type { VisualsTable } from './types';

export const LOKA_ITIHASA: VisualsTable = {
  I1: {
    prashna: () => renderDig({ revealed: DIG_LAYERS, finds: ['coin', 'pot'] }),
    cards: {
      what: () =>
        renderClueShelf([{ ids: ['coin', 'pot', 'seal', 'inscription', 'manuscript', 'diary'] }]),
      idea: () =>
        renderClueShelf([
          { title: t('clues.n.archaeological'), ids: ['coin', 'pot', 'seal', 'inscription'] },
          { title: t('clues.n.literary'), ids: ['manuscript', 'diary'] },
        ]),
      why: () => renderDig({ revealed: DIG_LAYERS, ages: true }),
      example: (step) =>
        renderDig({
          revealed: [0, 1, 3, 4][step] ?? 0,
          finds: ['coin', 'pot', 'seal'],
          highlight: step === 3 ? 'seal' : null,
        }),
      where: () => renderClueShelf([{ ids: ['seal', 'inscription', 'manuscript'] }]),
    },
    mistake: (reveal) =>
      renderDig({
        revealed: DIG_LAYERS,
        finds: ['coin', 'seal'],
        highlight: reveal ? 'seal' : 'coin',
        notes: reveal
          ? { coin: t('clues.newest'), seal: t('clues.oldest') }
          : { coin: t('clues.oldestQ') },
      }),
  },
};
