/**
 * Interactive Collection Fractions workbench screen for Knot N4.
 * Models discrete collections, group partitioning, fraction-of-an-amount,
 * and like-fraction addition without denominator addition.
 */

import {
  partitionSet,
  fractionOfSet,
  addLikeFractions,
  formatFraction,
} from '../../../domain/math/collection';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createCollectionScreen(): ScreenMeta {
  return {
    id: 'collection',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'collection.title',
    render(view, state, params = {}) {
      enterThread('N4', 'collection', params);

      let stepNum = readStep(params.step, state.step, 3);
      let ringCount = typeof state.ringCount === 'number' ? state.ringCount : 3;
      let selectedRings: number[] = Array.isArray(state.selectedRings)
        ? [...state.selectedRings]
        : [];
      let done = Boolean(state.done);

      state.step = stepNum;
      state.ringCount = ringCount;
      state.selectedRings = selectedRings;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('collection.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step switcher header
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      [1, 2, 3].forEach((s) => {
        const tabBtn = el('button', {
          class: `btn-choice ${stepNum === s ? 'active' : ''}`,
          text: t('collection.stepTab', { n: String(s) }),
          style: { minHeight: '44px', minWidth: '44px', padding: '6px 14px' },
          onClick: () => {
            stepNum = s;
            state.step = s;
            paint();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const modelCard = el('section', {
        class: 'card model-card',
        style: { textAlign: 'center', overflowX: 'auto', padding: '16px' },
      });

      const equationCard = el('section', {
        class: 'card equation-card',
        style: {
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: '600',
          padding: '12px',
        },
      });

      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '12px', textAlign: 'center' },
      });

      function renderStep1Svg(): SVGElement {
        const total = 12;
        const res = partitionSet(total, ringCount);
        const s = svg('svg', {
          viewBox: '0 0 360 200',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('collection.art'),
        });

        // Background tray
        s.appendChild(
          svg('rect', {
            x: 8,
            y: 8,
            width: 344,
            height: 184,
            rx: 12,
            fill: 'var(--paper)',
            stroke: 'var(--hair)',
            'stroke-width': 2,
          })
        );

        // Render rings
        const ringWidth = Math.floor(320 / ringCount);
        for (let r = 0; r < ringCount; r++) {
          const cx = 20 + r * ringWidth + ringWidth / 2;
          const cy = 100;
          const radius = Math.min(ringWidth / 2 - 8, 48);

          s.appendChild(
            svg('circle', {
              cx,
              cy,
              r: radius,
              fill: 'none',
              stroke: 'var(--thread)',
              'stroke-width': 2,
              'stroke-dasharray': '4 3',
            })
          );

          // Tokens inside ring
          const tokensInRing = res.itemsPerPart;
          const tokenRadius = Math.min((radius / (tokensInRing + 1)) * 1.5, 10);
          for (let ti = 0; ti < tokensInRing; ti++) {
            const angle = (2 * Math.PI * ti) / tokensInRing - Math.PI / 2;
            const dist = tokensInRing === 1 ? 0 : radius * 0.45;
            const tx = cx + Math.cos(angle) * dist;
            const ty = cy + Math.sin(angle) * dist;

            s.appendChild(
              svg('circle', {
                cx: tx,
                cy: ty,
                r: Math.max(tokenRadius, 7),
                fill: 'var(--thread)',
              })
            );
          }

          // Ring label below
          const text = svg('text', {
            x: cx,
            y: cy + radius + 18,
            'text-anchor': 'middle',
            'font-size': '12',
            fill: 'var(--ink, #2d261e)',
          });
          text.textContent = t('collection.ringLabel', { n: String(r + 1) });
          s.appendChild(text);
        }

        return s;
      }

      function renderStep2Svg(): SVGElement {
        const rings = 4;
        const s = svg('svg', {
          viewBox: '0 0 360 210',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('collection.art'),
        });

        s.appendChild(
          svg('rect', {
            x: 8,
            y: 8,
            width: 344,
            height: 194,
            rx: 12,
            fill: 'var(--paper)',
            stroke: 'var(--hair)',
            'stroke-width': 2,
          })
        );

        const ringWidth = Math.floor(320 / rings);
        for (let r = 0; r < rings; r++) {
          const cx = 20 + r * ringWidth + ringWidth / 2;
          const cy = 95;
          const radius = Math.min(ringWidth / 2 - 8, 44);
          const isSelected = selectedRings.includes(r);

          const ringGroup = svg('g', {
            class: 'ring-group',
            style: 'cursor:pointer;',
            tabindex: 0,
            role: 'button',
            'data-ring': String(r),
            'aria-pressed': String(isSelected),
            'aria-label': t('collection.ringAria', {
              n: String(r + 1),
              total: '4',
              count: '4',
              state: isSelected ? t('collection.ringSelected') : t('collection.ringUnselected'),
            }),
          });

          const toggle = () => {
            if (selectedRings.includes(r)) {
              selectedRings = selectedRings.filter((idx) => idx !== r);
            } else {
              selectedRings = [...selectedRings, r];
            }
            state.selectedRings = selectedRings;
            paint();
            view.querySelector<SVGGElement>(`.ring-group[data-ring="${r}"]`)?.focus();
          };
          ringGroup.onclick = toggle;
          ringGroup.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          });

          // Circle background
          ringGroup.appendChild(
            svg('circle', {
              cx,
              cy,
              r: radius,
              fill: isSelected ? 'var(--thread-soft)' : 'rgba(255,255,255,0.7)',
              stroke: isSelected ? 'var(--thread)' : 'var(--hair)',
              'stroke-width': isSelected ? 3 : 2,
            })
          );

          // 4 items inside
          for (let ti = 0; ti < 4; ti++) {
            const angle = (2 * Math.PI * ti) / 4 - Math.PI / 4;
            const tx = cx + Math.cos(angle) * (radius * 0.42);
            const ty = cy + Math.sin(angle) * (radius * 0.42);

            ringGroup.appendChild(
              svg('circle', {
                cx: tx,
                cy: ty,
                r: 7,
                fill: isSelected ? 'var(--thread)' : '#8b7e74',
              })
            );
          }

          const ringLabel = svg('text', {
            x: cx,
            y: cy + radius + 18,
            'text-anchor': 'middle',
            'font-size': '12',
            fill: 'var(--ink, #2d261e)',
            'font-weight': isSelected ? 'bold' : 'normal',
          });
          ringLabel.textContent = t('collection.ringFraction', { den: '4', count: '4' });
          ringGroup.appendChild(ringLabel);

          s.appendChild(ringGroup);
        }

        return s;
      }

      function renderStep3Svg(): SVGElement {
        // 5 baskets: 1/5 and 2/5 addition
        const s = svg('svg', {
          viewBox: '0 0 360 180',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('collection.art'),
        });

        s.appendChild(
          svg('rect', {
            x: 8,
            y: 8,
            width: 344,
            height: 164,
            rx: 12,
            fill: 'var(--paper)',
            stroke: 'var(--hair)',
            'stroke-width': 2,
          })
        );

        const totalBaskets = 5;
        const basketWidth = Math.floor(320 / totalBaskets);

        for (let b = 0; b < totalBaskets; b++) {
          const cx = 20 + b * basketWidth + basketWidth / 2;
          const cy = 80;
          const isFirstAddend = b === 0; // 1/5
          const isSecondAddend = b === 1 || b === 2; // 2/5
          const isIncluded = isFirstAddend || isSecondAddend;

          s.appendChild(
            svg('rect', {
              x: cx - 22,
              y: cy - 25,
              width: 44,
              height: 50,
              rx: 8,
              fill: isFirstAddend
                ? '#d0e2d3'
                : isSecondAddend
                  ? '#f3e6cf'
                  : 'rgba(255,255,255,0.7)',
              stroke: isIncluded ? 'var(--thread)' : 'var(--hair)',
              'stroke-width': isIncluded ? 2 : 1,
            })
          );

          // Token in basket
          s.appendChild(
            svg('circle', {
              cx,
              cy,
              r: 8,
              fill: isFirstAddend ? '#2e6b38' : isSecondAddend ? 'var(--thread)' : '#a4988d',
            })
          );

          const lbl = svg('text', {
            x: cx,
            y: cy + 42,
            'text-anchor': 'middle',
            'font-size': '11',
            fill: 'var(--ink, #2d261e)',
          });
          lbl.textContent = `1/5`;
          s.appendChild(lbl);
        }

        return s;
      }

      function paint(): void {
        clear(modelCard);
        clear(equationCard);
        clear(actionsCard);

        // Update tabs active state
        Array.from(stepTabs.children).forEach((child, idx) => {
          if (idx + 1 === stepNum) {
            child.classList.add('active');
          } else {
            child.classList.remove('active');
          }
        });

        if (stepNum === 1) {
          modelCard.appendChild(renderStep1Svg());
          const res = partitionSet(12, ringCount);
          equationCard.textContent = t('collection.partitionEq', {
            total: '12',
            rings: String(ringCount),
            per: String(res.itemsPerPart),
          });
          say.textContent = t('collection.s1done');

          const selectorRow = el('div', {
            class: 'selector-row',
            style: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
          });

          [2, 3, 4, 6].forEach((n) => {
            const btn = el('button', {
              class: `btn-choice ${ringCount === n ? 'active' : ''}`,
              text: t('collection.ringsChoice', { n: String(n) }),
              style: { minHeight: '44px', minWidth: '44px', padding: '8px 16px' },
              onClick: () => {
                ringCount = n;
                state.ringCount = n;
                paint();
              },
            });
            selectorRow.appendChild(btn);
          });

          actionsCard.appendChild(selectorRow);

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('collection.nextSelect'),
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 2;
              state.step = 2;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 2) {
          modelCard.appendChild(renderStep2Svg());
          const k = selectedRings.length;
          const totalTaken = fractionOfSet(16, k, 4);

          equationCard.textContent = t('collection.fractionEq', {
            num: String(k),
            den: '4',
            total: '16',
            per: '4',
            taken: String(totalTaken),
          });
          if (k === 3) {
            say.textContent = t('collection.threeFourthsDone');
          } else {
            say.textContent = t('collection.s2done', {
              num: String(k),
              den: '4',
              total: String(totalTaken),
            });
          }

          const hint = el('p', {
            style: { fontSize: '13px', color: 'var(--ink-soft)', margin: '8px 0' },
            text: t('collection.tapRings'),
          });
          actionsCard.appendChild(hint);

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('collection.nextAdd'),
            style: { marginTop: '12px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 3;
              state.step = 3;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 3) {
          modelCard.appendChild(renderStep3Svg());
          const sum = addLikeFractions({ num: 1, den: 5 }, { num: 2, den: 5 });
          equationCard.textContent = t('collection.likeSumEq', {
            a: '1/5',
            b: '2/5',
            sum: formatFraction(sum),
          });

          const choicesRow = el('div', {
            class: 'choices-row',
            style: { display: 'flex', gap: '12px', justifyContent: 'center' },
          });

          const optCorrect = el('button', {
            class: 'btn-choice',
            text: '3/5',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              done = true;
              state.done = true;
              say.textContent = t('collection.s3done');
              paint();
            },
          });

          const optWrong = el('button', {
            class: 'btn-choice',
            text: '3/10',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              say.textContent = t('collection.s3wrong');
            },
          });

          choicesRow.appendChild(optCorrect);
          choicesRow.appendChild(optWrong);
          actionsCard.appendChild(choicesRow);

          if (done) {
            say.textContent = t('collection.s3done');
            actionsCard.appendChild(toMistakeButton('N4'));
          }
        }
      }

      view.appendChild(titleEl);
      view.appendChild(stepTabs);
      view.appendChild(modelCard);
      view.appendChild(equationCard);
      view.appendChild(say);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
