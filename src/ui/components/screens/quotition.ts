/**
 * Interactive Quotition workbench screen for Knot D2.
 * Models division as repeated subtraction / backward number line hops,
 * grouping with remainders, and sharing vs grouping conceptual duality.
 */

import { repeatedSubtractionSteps } from '../../../domain/math/quotition';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { readStep } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createQuotitionScreen(): ScreenMeta {
  return {
    id: 'quotition',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'quotition.title',
    render(view, state, params = {}) {
      enterThread('D2', 'quotition', params);

      let stepNum = readStep(params.step, state.step, 3);

      let hopsDoneStep1 = typeof state.hopsDoneStep1 === 'number' ? state.hopsDoneStep1 : 0;
      let hopsDoneStep2 = typeof state.hopsDoneStep2 === 'number' ? state.hopsDoneStep2 : 0;
      let dualityMode = state.dualityMode === 'sharing' ? 'sharing' : 'grouping';

      state.step = stepNum;
      state.hopsDoneStep1 = hopsDoneStep1;
      state.hopsDoneStep2 = hopsDoneStep2;
      state.dualityMode = dualityMode;

      const titleEl = el('h2', { class: 'screen-title', text: t('quotition.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      const tab1 = el('button', {
        class: `step-tab ${stepNum === 1 ? 'active' : ''}`,
        text: t('quotition.tab1'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: t('quotition.tab2'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: t('quotition.tab3'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });

      tab1.addEventListener('click', () => {
        stepNum = 1;
        state.step = 1;
        renderActiveStep();
      });
      tab2.addEventListener('click', () => {
        stepNum = 2;
        state.step = 2;
        renderActiveStep();
      });
      tab3.addEventListener('click', () => {
        stepNum = 3;
        state.step = 3;
        renderActiveStep();
      });

      stepTabs.appendChild(tab1);
      stepTabs.appendChild(tab2);
      stepTabs.appendChild(tab3);

      const stageContainer = el('div', {
        class: 'quotition-stage',
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '540px',
          margin: '0 auto',
        },
      });

      function renderActiveStep() {
        tab1.classList.toggle('active', stepNum === 1);
        tab2.classList.toggle('active', stepNum === 2);
        tab3.classList.toggle('active', stepNum === 3);
        clear(stageContainer);

        if (stepNum === 1) {
          renderStep1();
        } else if (stepNum === 2) {
          renderStep2();
        } else {
          renderStep3();
        }
      }

      // --- STEP 1: Pack 20 laddoos in boxes of 4 ---
      function renderStep1() {
        clear(stageContainer);

        const total = 20;
        const groupSize = 4;
        const allHops = repeatedSubtractionSteps(total, groupSize);

        const currentPos = total - hopsDoneStep1 * groupSize;
        const isComplete = hopsDoneStep1 === allHops.length;
        say.textContent = isComplete ? t('quotition.s1done') : t('quotition.s1');

        const infoCard = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '12px', textAlign: 'center', marginBottom: '12px' },
        });

        const mathDisplay = el('div', {
          class: 'math-banner',
          style: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '6px' },
          text: isComplete
            ? t('quotition.step1BannerDone')
            : t('quotition.step1Banner', {
                total: String(total),
                packed: String(hopsDoneStep1),
                pos: String(currentPos),
              }),
        });
        infoCard.appendChild(mathDisplay);

        // Number Line SVG
        const svgW = 340;
        const svgH = 100;
        const lineSvg = svg('svg', {
          viewBox: `0 0 ${svgW} ${svgH}`,
          style: { width: '100%', maxWidth: '340px', height: '100px' },
        });

        // Baseline
        lineSvg.appendChild(
          svg('line', {
            x1: '20',
            y1: '70',
            x2: '320',
            y2: '70',
            stroke: 'var(--hair)',
            'stroke-width': '3',
          })
        );

        // Tick marks from 0 to 20 (every 4 highlighted)
        for (let i = 0; i <= total; i += 2) {
          const x = 20 + (i / total) * 300;
          const isMajor = i % 4 === 0;
          lineSvg.appendChild(
            svg('line', {
              x1: String(x),
              y1: isMajor ? '60' : '65',
              x2: String(x),
              y2: '75',
              stroke: isMajor ? 'var(--ink)' : '#aaa',
              'stroke-width': isMajor ? '2' : '1',
            })
          );
          if (isMajor) {
            lineSvg.appendChild(
              svg(
                'text',
                {
                  x: String(x),
                  y: '90',
                  'text-anchor': 'middle',
                  'font-size': '11',
                  fill: 'var(--ink)',
                },
                String(i)
              )
            );
          }
        }

        // Draw backward hops
        for (let h = 0; h < hopsDoneStep1; h++) {
          const hop = allHops[h];
          if (!hop) continue;
          const xStart = 20 + (hop.from / total) * 300;
          const xEnd = 20 + (hop.remaining / total) * 300;
          const xMid = (xStart + xEnd) / 2;
          const arcD = `M ${xStart} 65 Q ${xMid} 25 ${xEnd} 65`;

          lineSvg.appendChild(
            svg('path', {
              d: arcD,
              fill: 'none',
              stroke: 'var(--thread)',
              'stroke-width': '2.5',
              'stroke-dasharray': '2 1',
            })
          );

          // Arrowhead
          lineSvg.appendChild(
            svg('circle', {
              cx: String(xEnd),
              cy: '65',
              r: '4',
              fill: 'var(--thread)',
            })
          );
        }

        infoCard.appendChild(lineSvg);

        // Stacker Shelf (Packed Boxes)
        const shelf = el('div', {
          class: 'shelf-container',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '12px 0',
          },
        });

        for (let i = 1; i <= hopsDoneStep1; i++) {
          const box = el('div', {
            class: 'packed-box',
            style: {
              background: 'var(--paper-sunk)',
              border: '2px solid var(--thread)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontWeight: 'bold',
              color: 'var(--indigo)',
            },
            text: t('quotition.boxLabel', { n: String(i), size: '4' }),
          });
          shelf.appendChild(box);
        }

        infoCard.appendChild(shelf);

        // Control Buttons
        const btnGroup = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' },
        });

        const hopBtn = el('button', {
          class: 'btn btn-primary',
          text: isComplete ? t('common.reset') : t('quotition.take4'),
          style: { minHeight: '44px', padding: '10px 18px' },
        });

        hopBtn.addEventListener('click', () => {
          if (isComplete) {
            hopsDoneStep1 = 0;
            state.hopsDoneStep1 = 0;
          } else {
            hopsDoneStep1++;
            state.hopsDoneStep1 = hopsDoneStep1;
            if (hopsDoneStep1 === allHops.length) {
              say.textContent = t('quotition.s1done');
            }
          }
          renderStep1();
        });

        btnGroup.appendChild(hopBtn);
        infoCard.appendChild(btnGroup);
        stageContainer.appendChild(infoCard);
      }

      // --- STEP 2: Grouping with Remainder (22 ÷ 5) ---
      function renderStep2() {
        clear(stageContainer);

        const total = 22;
        const groupSize = 5;
        const allHops = repeatedSubtractionSteps(total, groupSize);

        const currentPos = total - hopsDoneStep2 * groupSize;
        const isComplete = hopsDoneStep2 === allHops.length;
        say.textContent = isComplete ? t('quotition.s2done') : t('quotition.s2');

        const infoCard = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '12px', textAlign: 'center', marginBottom: '12px' },
        });

        const mathDisplay = el('div', {
          class: 'math-banner',
          style: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '6px' },
          text: isComplete
            ? t('quotition.step2BannerDone')
            : t('quotition.step1Banner', {
                total: String(total),
                packed: String(hopsDoneStep2),
                pos: String(currentPos),
              }),
        });
        infoCard.appendChild(mathDisplay);

        // Number Line SVG
        const svgW = 340;
        const svgH = 100;
        const lineSvg = svg('svg', {
          viewBox: `0 0 ${svgW} ${svgH}`,
          style: { width: '100%', maxWidth: '340px', height: '100px' },
        });

        // Baseline
        lineSvg.appendChild(
          svg('line', {
            x1: '20',
            y1: '70',
            x2: '320',
            y2: '70',
            stroke: 'var(--hair)',
            'stroke-width': '3',
          })
        );

        // Tick marks 0 to 22
        for (let i = 0; i <= 22; i += 2) {
          const x = 20 + (i / 22) * 300;
          const isMajor = i % 5 === 0 || i === 22 || i === 2;
          lineSvg.appendChild(
            svg('line', {
              x1: String(x),
              y1: isMajor ? '60' : '65',
              x2: String(x),
              y2: '75',
              stroke: isMajor ? 'var(--ink)' : '#aaa',
              'stroke-width': isMajor ? '2' : '1',
            })
          );
          if (isMajor) {
            lineSvg.appendChild(
              svg(
                'text',
                {
                  x: String(x),
                  y: '90',
                  'text-anchor': 'middle',
                  'font-size': '11',
                  fill: 'var(--ink)',
                },
                String(i)
              )
            );
          }
        }

        // Draw backward hops
        for (let h = 0; h < hopsDoneStep2; h++) {
          const hop = allHops[h];
          if (!hop) continue;
          const xStart = 20 + (hop.from / total) * 300;
          const xEnd = 20 + (hop.remaining / total) * 300;
          const xMid = (xStart + xEnd) / 2;
          const arcD = `M ${xStart} 65 Q ${xMid} 25 ${xEnd} 65`;

          lineSvg.appendChild(
            svg('path', {
              d: arcD,
              fill: 'none',
              stroke: 'var(--thread)',
              'stroke-width': '2.5',
            })
          );
          lineSvg.appendChild(
            svg('circle', {
              cx: String(xEnd),
              cy: '65',
              r: '4',
              fill: 'var(--thread)',
            })
          );
        }

        infoCard.appendChild(lineSvg);

        // Boxes and Remainder Tray
        const trayContainer = el('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' },
        });

        const shelf = el('div', {
          class: 'shelf-container',
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        for (let i = 1; i <= hopsDoneStep2; i++) {
          const box = el('div', {
            class: 'packed-box',
            style: {
              background: 'var(--paper-sunk)',
              border: '2px solid var(--thread)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontWeight: 'bold',
              color: 'var(--indigo)',
            },
            text: t('quotition.boxLabel', { n: String(i), size: '5' }),
          });
          shelf.appendChild(box);
        }

        trayContainer.appendChild(shelf);

        if (isComplete) {
          const remainderTray = el('div', {
            class: 'remainder-tray',
            style: {
              background: 'var(--paper-sunk)',
              border: '2px dashed #b45309',
              borderRadius: '8px',
              padding: '10px',
              maxWidth: '300px',
              margin: '0 auto',
            },
          });
          const trayTitle = el('div', {
            style: { fontWeight: 'bold', color: '#b45309', marginBottom: '4px' },
            text: t('quotition.remainderTray'),
          });
          const trayDesc = el('div', {
            style: { fontSize: '0.9rem' },
            text: t('quotition.remainderNote'),
          });
          remainderTray.appendChild(trayTitle);
          remainderTray.appendChild(trayDesc);
          trayContainer.appendChild(remainderTray);
        }

        infoCard.appendChild(trayContainer);

        // Control Buttons
        const btnGroup = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' },
        });

        const hopBtn = el('button', {
          class: 'btn btn-primary',
          text: isComplete ? t('common.reset') : t('quotition.take5'),
          style: { minHeight: '44px', padding: '10px 18px' },
        });

        hopBtn.addEventListener('click', () => {
          if (isComplete) {
            hopsDoneStep2 = 0;
            state.hopsDoneStep2 = 0;
          } else {
            hopsDoneStep2++;
            state.hopsDoneStep2 = hopsDoneStep2;
            if (hopsDoneStep2 === allHops.length) {
              say.textContent = t('quotition.s2done');
            }
          }
          renderStep2();
        });

        btnGroup.appendChild(hopBtn);
        infoCard.appendChild(btnGroup);
        stageContainer.appendChild(infoCard);
      }

      // --- STEP 3: Sharing vs Grouping Duality ---
      function renderStep3() {
        clear(stageContainer);
        say.textContent = t('quotition.s3');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const dualityTitle = el('div', {
          class: 'math-banner',
          style: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px' },
          text:
            dualityMode === 'sharing'
              ? t('quotition.dualitySharing')
              : t('quotition.dualityGrouping'),
        });
        card.appendChild(dualityTitle);

        const visualBoard = el('div', {
          class: 'duality-board',
          style: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '16px',
          },
        });

        if (dualityMode === 'sharing') {
          // 4 plates with 5 items each
          for (let p = 1; p <= 4; p++) {
            const plate = el('div', {
              class: 'plate-item',
              style: {
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid #0284c7',
                background: '#f0f9ff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            });
            plate.appendChild(
              el('div', {
                style: { fontWeight: 'bold', color: '#0284c7' },
                text: t('quotition.plate', { n: String(p) }),
              })
            );
            plate.appendChild(el('div', { style: { fontSize: '1.2rem' }, text: '●●●●●' }));
            plate.appendChild(
              el('div', {
                style: { fontSize: '0.8rem', color: '#555' },
                text: t('quotition.plateShare'),
              })
            );
            visualBoard.appendChild(plate);
          }
        } else {
          // 5 boxes with 4 items each
          for (let b = 1; b <= 5; b++) {
            const box = el('div', {
              class: 'box-item',
              style: {
                width: '90px',
                height: '90px',
                borderRadius: '8px',
                border: '3px solid #c2410c',
                background: '#fff7ed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            });
            box.appendChild(
              el('div', {
                style: { fontWeight: 'bold', color: '#c2410c' },
                text: t('quotition.boxHold', { n: String(b) }),
              })
            );
            box.appendChild(el('div', { style: { fontSize: '1.2rem' }, text: '■■■■' }));
            box.appendChild(
              el('div', {
                style: { fontSize: '0.8rem', color: '#555' },
                text: t('quotition.boxHolds'),
              })
            );
            visualBoard.appendChild(box);
          }
        }

        card.appendChild(visualBoard);

        const toggleBtn = el('button', {
          class: 'btn btn-secondary',
          text:
            dualityMode === 'sharing'
              ? t('quotition.switchGrouping')
              : t('quotition.switchSharing'),
          style: { minHeight: '44px', padding: '10px 18px' },
        });

        toggleBtn.addEventListener('click', () => {
          dualityMode = dualityMode === 'sharing' ? 'grouping' : 'sharing';
          state.dualityMode = dualityMode;
          say.textContent = t('quotition.s3done');
          renderStep3();
        });

        card.appendChild(toggleBtn);
        stageContainer.appendChild(card);
      }

      // Initial render
      renderActiveStep();

      // Navigation footer
      const navFooter = el('div', {
        class: 'nav-footer',
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '540px',
          marginTop: '20px',
        },
      });

      const bodhaBtn = el('button', {
        class: 'btn btn-subtle',
        text: t('number.backBodha'),
        style: { minHeight: '44px', padding: '10px 16px' },
      });
      bodhaBtn.addEventListener('click', () => {
        router.go('bodha', { k: 'D2' });
      });

      const mistakeBtn = el('button', {
        class: 'btn btn-primary',
        text: t('number.forwardMistake'),
        style: { minHeight: '44px', padding: '10px 16px' },
      });
      mistakeBtn.addEventListener('click', () => {
        router.go('mistake', { k: 'D2' });
      });

      navFooter.appendChild(bodhaBtn);
      navFooter.appendChild(mistakeBtn);

      view.appendChild(titleEl);
      view.appendChild(say);
      view.appendChild(stepTabs);
      view.appendChild(stageContainer);
      view.appendChild(navFooter);
    },
  };
}
