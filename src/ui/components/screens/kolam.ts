/**
 * Kolam Mirror workbench screen (thread G4).
 * Symmetry as kolam: rice-white lines on dark ground.
 * Demonstrates dihedral groups D_n (mirror lines + rotations) and cyclic groups C_n (rotations only).
 */

import { t } from '../../../domain/i18n/core';
import { smallestTurn, type Point2D, type SymmetryMode } from '../../../domain/math/geometry';
import { el, reducedMotion } from '../../util/dom';
import { createStepGuide, toMistakeButton } from '../../util/bench';
import { createKolamManipulative, type KolamManipulative } from '../../manipulatives/kolam';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

function createChips<T extends string | number>(
  items: { value: T; label: string }[],
  selected: T,
  onChange: (val: T) => void,
  ariaLabel: string
): HTMLElement {
  const group = el('div', { class: 'chip-group', role: 'group', 'aria-label': ariaLabel });
  const buttons: { btn: HTMLElement; value: T }[] = [];

  items.forEach((it) => {
    const isSelected = it.value === selected;
    const btn = el('button', {
      type: 'button',
      class: `chip${isSelected ? ' on' : ''}`,
      'aria-pressed': isSelected ? 'true' : 'false',
      text: it.label,
      style: { minHeight: '44px', minWidth: '44px' },
      onclick: () => {
        buttons.forEach((b) => {
          const active = b.value === it.value;
          b.btn.classList.toggle('on', active);
          b.btn.setAttribute('aria-pressed', String(active));
        });
        onChange(it.value);
      },
    });
    buttons.push({ btn, value: it.value });
    group.appendChild(btn);
  });
  return group;
}

export function createKolamScreen(): ScreenMeta {
  return {
    id: 'kolam',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'kolam.title',
    render(view, state, params = {}) {
      enterThread('G4', 'kolam');

      const parsedOrder = params.order ? parseInt(params.order, 10) : NaN;
      const order = !isNaN(parsedOrder)
        ? parsedOrder
        : typeof state.order === 'number'
          ? state.order
          : 4;

      const mode: SymmetryMode =
        params.mode === 'turn' || params.mode === 'mirror'
          ? (params.mode as SymmetryMode)
          : (state.mode as SymmetryMode) || 'mirror';

      state.order = order;
      state.mode = mode;
      if (!Array.isArray(state.strokes)) {
        state.strokes = [] as Point2D[][];
      }

      const readout = el('p', { class: 'say workbench-feedback' });

      const km: KolamManipulative = createKolamManipulative({
        order: Number(state.order),
        mode: state.mode as SymmetryMode,
        strokes: state.strokes as Point2D[][],
        describe: (o, _m, n) => t('kolam.describe', { o, n }),
        onChange: (updatedStrokes) => {
          state.strokes = updatedStrokes;
          paintRead();
        },
      });

      function paintRead(): void {
        const curOrder = Number(state.order);
        const curMode = state.mode as SymmetryMode;
        const deg = smallestTurn(curOrder);
        let txt: string;

        if (curOrder === 1) {
          txt = curMode === 'mirror' ? t('kolam.read1Mirror') : t('kolam.read1Turn');
        } else {
          txt =
            curMode === 'mirror'
              ? t('kolam.readMirror', { n: curOrder, deg })
              : t('kolam.readTurn', { deg });
        }

        const strokeCount = (state.strokes as Point2D[][]).length;
        if (curMode === 'turn' && curOrder === 4 && strokeCount > 0) {
          txt += ' ' + t('kolam.challengeMet');
        }
        readout.textContent = txt;
      }

      view.appendChild(createStepGuide(1, t('kolam.s1')));
      view.appendChild(el('div', { class: 'model', style: { margin: '4px 0 8px' } }, [km.node]));
      view.appendChild(readout);

      // Symmetry order selector
      const orderChips = createChips(
        [1, 2, 4, 8].map((n) => ({ value: n, label: String(n) })),
        Number(state.order),
        (o) => {
          state.order = o;
          km.setOrder(o);
          paintRead();
        },
        t('kolam.order')
      );
      const orderRow = el('div', { class: 'control-row' }, [
        el('label', { text: t('kolam.order') }),
        orderChips,
      ]);
      view.appendChild(orderRow);

      // Symmetry mode selector (Mirror vs Turn)
      const modeChips = createChips(
        [
          { value: 'mirror', label: t('kolam.mirror') },
          { value: 'turn', label: t('kolam.turn') },
        ],
        state.mode as SymmetryMode,
        (m) => {
          state.mode = m;
          km.setMode(m);
          paintRead();
        },
        t('kolam.mode')
      );
      const modeRow = el('div', { class: 'control-row' }, [
        el('label', { text: t('kolam.mode') }),
        modeChips,
      ]);
      view.appendChild(modeRow);

      // Actions: Undo & Clear
      const undoBtn = el('button', {
        type: 'button',
        class: 'btn quiet',
        text: t('common.undo'),
        style: { minHeight: '44px' },
        onclick: () => km.undo(),
      });
      const clearBtn = el('button', {
        type: 'button',
        class: 'btn quiet',
        text: t('common.clear'),
        style: { minHeight: '44px' },
        onclick: () => km.clear(),
      });
      view.appendChild(el('div', { class: 'btn-row' }, [undoBtn, clearBtn]));

      // Challenge card
      const challengeTitle = el('h3', { text: t('kolam.challengeTitle') });
      const challengeText = el('p', { text: t('kolam.challenge') });
      const challengeCard = el('section', { class: 'card' }, [challengeTitle, challengeText]);
      view.appendChild(challengeCard);

      // Next: Spot the Mistake button
      const mistakeBtn = toMistakeButton('G4');
      mistakeBtn.id = 'btn-to-mistake';
      mistakeBtn.style.minHeight = '44px';
      view.appendChild(el('div', { class: 'btn-row' }, [mistakeBtn]));

      paintRead();

      let demoTimer = 0;
      if (!state.demoed && (state.strokes as Point2D[][]).length === 0) {
        state.demoed = true;
        if (!reducedMotion()) {
          demoTimer = window.setTimeout(() => {
            km.demo();
          }, 500);
        }
      }

      return () => {
        window.clearTimeout(demoTimer);
        km.destroy();
      };
    },
  };
}
