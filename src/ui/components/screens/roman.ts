/**
 * Interactive Roman Numerals workbench screen for Knot N2.
 * Explores non-positional numeral construction, subtractive mechanics, and repetition constraints.
 */

import {
  fromRoman,
  isValidRoman,
  parseRomanTokens,
  type RomanSymbol,
} from '../../../domain/math/roman';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

interface BuildChallenge {
  n: number;
  roman: string;
}

const TARGETS: readonly BuildChallenge[] = [
  { n: 14, roman: 'XIV' },
  { n: 24, roman: 'XXIV' },
  { n: 29, roman: 'XXIX' },
] as const;

const AVAILABLE_SYMBOLS: readonly RomanSymbol[] = ['I', 'V', 'X', 'L', 'C'] as const;

export function createRomanScreen(): ScreenMeta {
  return {
    id: 'roman',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'roman.title',
    render(view, state, params = {}) {
      enterThread('N2', 'roman', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;
      let tiles: RomanSymbol[] = Array.isArray(state.tiles)
        ? [...state.tiles]
        : stepNum === 3
          ? ['X', 'L']
          : ['X', 'I', 'V'];
      let targetIdx = typeof state.targetIdx === 'number' ? state.targetIdx : 0;
      let done = Boolean(state.done);

      state.step = stepNum;
      state.tiles = tiles;
      state.targetIdx = targetIdx;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('roman.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', {
        class: 'card model-card',
        style: { textAlign: 'center', overflowX: 'auto' },
      });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function renderSlateSvg(): SVGElement {
        const romanStr = tiles.join('');
        const valid = isValidRoman(romanStr);
        let value = 0;
        let breakdown = '';

        if (tiles.length === 0) {
          breakdown = 'Empty slate';
        } else if (valid) {
          value = fromRoman(romanStr);
          const tokens = parseRomanTokens(romanStr);
          breakdown = `${tokens.map((tok) => `${tok.text} (${tok.type === 'subtractive' ? '' : '+'}${tok.value})`).join(' + ')} = ${value}`;
        } else {
          breakdown = 'Not a valid Roman numeral';
        }

        const s = svg('svg', {
          viewBox: '0 0 360 210',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('roman.art'),
        });

        // Carved stone slate background
        s.appendChild(
          svg('rect', {
            x: 10,
            y: 10,
            width: 340,
            height: 190,
            rx: 12,
            fill: 'var(--paper-sunk, #1e293b)',
            stroke: 'var(--hair, #475569)',
            'stroke-width': 3,
          })
        );

        // Inner bevel line
        s.appendChild(
          svg('rect', {
            x: 18,
            y: 18,
            width: 324,
            height: 174,
            rx: 8,
            fill: 'none',
            stroke: 'var(--ink-soft, #64748b)',
            'stroke-width': 1,
            'stroke-dasharray': '4 2',
          })
        );

        // Tiles shelf
        const tileW = 42;
        const tileH = 52;
        const totalW = Math.max(tiles.length * (tileW + 8) - 8, 0);
        const startX = Math.max(30, (360 - totalW) / 2);

        tiles.forEach((sym, i) => {
          const tx = startX + i * (tileW + 8);
          const ty = 50;

          // Stone tile
          s.appendChild(
            svg('rect', {
              x: tx,
              y: ty,
              width: tileW,
              height: tileH,
              rx: 6,
              fill: 'var(--paper-raised, #ffffff)',
              stroke: 'var(--ink, #0f172a)',
              'stroke-width': 2,
            })
          );

          // Carved symbol text
          const symTxt = svg('text', {
            x: tx + tileW / 2,
            y: ty + 36,
            'text-anchor': 'middle',
            fill: 'var(--ink, #0f172a)',
            'font-size': '24px',
            'font-weight': 'bold',
            'font-family': 'serif',
          });
          symTxt.textContent = sym;
          s.appendChild(symTxt);
        });

        // Current assembled Roman string display
        const romanDisplay = svg('text', {
          x: 180,
          y: 135,
          'text-anchor': 'middle',
          fill: valid ? 'var(--kumkum, #b91c1c)' : 'var(--ink-soft, #94a3b8)',
          'font-size': '22px',
          'font-weight': 'bold',
          'font-family': 'serif',
          'letter-spacing': '2px',
        });
        romanDisplay.textContent = tiles.length > 0 ? romanStr : '—';
        s.appendChild(romanDisplay);

        // Value & Breakdown text
        const breakdownTxt = svg('text', {
          x: 180,
          y: 170,
          'text-anchor': 'middle',
          fill: valid ? 'var(--leaf, #15803d)' : 'var(--kumkum, #ef4444)',
          'font-size': '13px',
          'font-weight': '600',
        });
        breakdownTxt.textContent = breakdown;
        s.appendChild(breakdownTxt);

        return s;
      }

      function paint(): void {
        state.step = stepNum;
        state.tiles = tiles;
        state.targetIdx = targetIdx;
        state.done = done;

        clear(modelCard);
        modelCard.appendChild(renderSlateSvg());

        clear(actionsCard);

        const guideEl = el('p', {
          class: 'guide-text',
          text:
            stepNum === 2
              ? t('roman.s2build', {
                  n: String(TARGETS[targetIdx]?.n),
                  roman: TARGETS[targetIdx]?.roman || '',
                })
              : t(`roman.s${stepNum}`),
          style: { fontWeight: '600', marginBottom: '12px' },
        });
        actionsCard.appendChild(guideEl);

        if (stepNum === 1 || stepNum === 2) {
          // Palette of Roman symbols
          const symbolRow = el('div', {
            class: 'roman-symbols-row',
            style: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' },
          });

          AVAILABLE_SYMBOLS.forEach((sym) => {
            const btn = el('button', {
              class: 'btn-choice',
              text: sym,
              style: { minWidth: '48px', fontSize: '18px', fontWeight: 'bold' },
              onClick: () => {
                tiles.push(sym);
                checkChallenge();
                paint();
              },
            });
            symbolRow.appendChild(btn);
          });

          actionsCard.appendChild(symbolRow);

          // Control buttons: Undo & Clear
          const ctrlRow = el('div', {
            class: 'btn-row',
            style: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '12px' },
          });

          const undoBtn = el('button', {
            class: 'btn-action btn-quiet',
            text: t('common.undo'),
            onClick: () => {
              if (tiles.length > 0) {
                tiles.pop();
                say.textContent = '';
                paint();
              }
            },
          });
          ctrlRow.appendChild(undoBtn);

          const clearBtn = el('button', {
            class: 'btn-action btn-quiet',
            text: 'Clear slate',
            onClick: () => {
              tiles = [];
              say.textContent = '';
              paint();
            },
          });
          ctrlRow.appendChild(clearBtn);

          if (stepNum === 1) {
            const nextBtn = el('button', {
              class: 'btn-action btn-primary',
              text: 'Build numbers →',
              onClick: () => {
                stepNum = 2;
                targetIdx = 0;
                tiles = [];
                say.textContent = '';
                paint();
              },
            });
            ctrlRow.appendChild(nextBtn);
          }

          actionsCard.appendChild(ctrlRow);
        } else if (stepNum === 3 && !done) {
          // Subtractive challenge for 40
          const choices = ['XXXX', 'XL', 'VL'];
          const choiceRow = el('div', {
            class: 'calc-chips-container',
            style: { display: 'flex', gap: '10px', justifyContent: 'center' },
          });

          choices.forEach((c) => {
            const btn = el('button', {
              class: 'btn-choice',
              text: c,
              onClick: () => {
                if (c === 'XL') {
                  done = true;
                  say.textContent = t('roman.s3done');
                  paint();
                } else if (c === 'XXXX') {
                  say.textContent = t('roman.s3tryRepeat');
                } else {
                  say.textContent =
                    'The symbols V, L, and D are never subtracted. Think of 50 (L) minus 10 (X): XL.';
                }
              },
            });
            choiceRow.appendChild(btn);
          });

          actionsCard.appendChild(choiceRow);
        }

        if (done) {
          const nextBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('bench.toMistake'),
            style: { marginTop: '16px' },
            onClick: () => router.go('mistake', { knot: 'N2' }),
          });
          actionsCard.appendChild(nextBtn);
        }
      }

      function checkChallenge(): void {
        if (stepNum !== 2) return;
        const currentTarget = TARGETS[targetIdx];
        if (!currentTarget) return;

        const assembled = tiles.join('');
        if (assembled === currentTarget.roman) {
          say.textContent = t('roman.s2done', {
            n: String(currentTarget.n),
            roman: currentTarget.roman,
          });

          if (targetIdx + 1 < TARGETS.length) {
            targetIdx++;
            tiles = [];
          } else {
            stepNum = 3;
            tiles = ['X', 'L'];
          }
        }
      }

      view.appendChild(titleEl);
      view.appendChild(modelCard);
      view.appendChild(say);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
