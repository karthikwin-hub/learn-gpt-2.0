/**
 * Fair Share Table workbench screen (threads D1 & D3).
 * Supports both exact partitive sharing (?mode=share) and remainders to fractions (?mode=leftover).
 */

import { leftoverFraction, share } from '../../../domain/math/divide';
import { t } from '../../../domain/i18n/core';
import { clear, createStepper, el, svg } from '../../util/dom';
import {
  createFairShare,
  type FairShareCounts,
  type FairShareManipulative,
} from '../../manipulatives/fair-share';
import { createStepGuide, setStepGuide } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

export function createShareScreen(): ScreenMeta {
  return {
    id: 'share',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title(params = {}) {
      return params.mode === 'leftover' ? 'share.titleLeft' : 'share.title';
    },
    render(view, state, params = {}) {
      const leftover = params.mode === 'leftover';
      enterThread(leftover ? 'D3' : 'D1', 'share', { mode: params.mode || 'share' });

      const parsedTotal = params.total ? parseInt(params.total, 10) : NaN;
      const parsedPlates = params.plates ? parseInt(params.plates, 10) : NaN;

      const numTotal = !isNaN(parsedTotal)
        ? parsedTotal
        : typeof state.total === 'number'
          ? state.total
          : leftover
            ? 14
            : 12;

      const numPlates = !isNaN(parsedPlates)
        ? parsedPlates
        : typeof state.plates === 'number'
          ? state.plates
          : 4;

      state.total = numTotal;
      state.plates = numPlates;

      const getTotal = (): number => Number(state.total);
      const getPlates = (): number => Number(state.plates);

      let spoken = false;
      let cutSpoken = false;
      let ready = false;

      const say = el('p', { class: 'say workbench-feedback', hidden: true });
      const eqCard = el('section', { class: 'card eq-card' });
      const barWrap = el('div', { class: 'bar-wrap' });
      const actions = el('div', { class: 'btn-row' });

      function createBarSVG(c: FairShareCounts): SVGSVGElement {
        const s = share(c.total, c.plates);
        const barW = 320;
        const unit = barW / c.total;
        const barSvg = svg('svg', {
          viewBox: `0 0 ${barW} 54`,
          role: 'img',
          'aria-label': t('share.barLabel', { a: c.total, b: c.plates }),
        });

        for (let i = 0; i < c.plates; i++) {
          const x = i * s.each * unit;
          barSvg.appendChild(
            svg('rect', {
              x: x + 1,
              y: 6,
              width: Math.max(0, s.each * unit - 2),
              height: 28,
              rx: 5,
              fill: i % 2 ? 'var(--indigo-soft)' : 'var(--teal-soft)',
              stroke: 'var(--ink-soft)',
              'stroke-width': 1,
            })
          );
          barSvg.appendChild(
            svg('text', {
              x: x + (s.each * unit) / 2,
              y: 21,
              'text-anchor': 'middle',
              'dominant-baseline': 'middle',
              'font-size': 13,
              'font-weight': 600,
              fill: 'var(--ink)',
              'font-family': 'var(--font)',
              text: String(s.each),
            })
          );
        }

        if (s.remainder > 0) {
          const rx = c.plates * s.each * unit;
          barSvg.appendChild(
            svg('rect', {
              x: rx + 1,
              y: 6,
              width: Math.max(0, s.remainder * unit - 2),
              height: 28,
              rx: 5,
              fill: 'none',
              stroke: 'var(--kumkum)',
              'stroke-width': 1.5,
              'stroke-dasharray': '4 3',
            })
          );
          barSvg.appendChild(
            svg('text', {
              x: rx + (s.remainder * unit) / 2,
              y: 21,
              'text-anchor': 'middle',
              'dominant-baseline': 'middle',
              'font-size': 13,
              'font-weight': 600,
              fill: 'var(--kumkum)',
              'font-family': 'var(--font)',
              text: String(s.remainder),
            })
          );
        }

        barSvg.appendChild(
          svg('text', {
            x: barW / 2,
            y: 48,
            'text-anchor': 'middle',
            'font-size': 12,
            fill: 'var(--ink-soft)',
            'font-family': 'var(--font)',
            text: t('share.barCaption', { a: c.total }),
          })
        );

        return barSvg;
      }

      function paint(c: FairShareCounts): void {
        const s = share(c.total, c.plates);
        clear(eqCard);
        eqCard.appendChild(el('h3', { class: 'pane-title', text: t('share.written') }));

        if (!c.done) {
          eqCard.appendChild(el('p', { text: t('share.dealt', { n: c.dealt, total: c.total }) }));
        } else {
          const eqLine = el('div', { class: 'eq' });
          eqLine.appendChild(el('span', { class: 'a', text: String(c.total) }));
          eqLine.appendChild(document.createTextNode(' ÷ '));
          eqLine.appendChild(el('span', { class: 'b', text: String(c.plates) }));
          eqLine.appendChild(document.createTextNode(' = '));
          eqLine.appendChild(el('span', { class: 'r', text: String(s.each) }));
          if (s.remainder) {
            eqLine.appendChild(document.createTextNode(' '));
            eqLine.appendChild(el('span', { class: 'small muted', text: 'r' }));
            eqLine.appendChild(document.createTextNode(' '));
            eqLine.appendChild(
              el('span', { style: { color: 'var(--kumkum)' }, text: String(s.remainder) })
            );
          }
          eqCard.appendChild(eqLine);

          const checkLine = el('p', { class: 'muted' });
          checkLine.appendChild(el('span', { class: 'b-txt', text: String(c.plates) }));
          checkLine.appendChild(document.createTextNode(' × '));
          checkLine.appendChild(el('span', { class: 'r-txt', text: String(s.each) }));
          if (s.remainder) {
            checkLine.appendChild(document.createTextNode(` + ${s.remainder}`));
          }
          checkLine.appendChild(document.createTextNode(' = '));
          checkLine.appendChild(el('span', { class: 'a-txt', text: String(c.total) }));
          eqCard.appendChild(checkLine);

          if (c.cut && s.remainder > 0) {
            const f = leftoverFraction(s.remainder, c.plates);
            if (f) {
              const fracStr = `${f.num}/${f.den}${
                f.simpleDen !== f.den ? ` = ${f.simpleNum}/${f.simpleDen}` : ''
              }`;
              const fracLine = el('div', { class: 'eq' });
              fracLine.appendChild(document.createTextNode(`${t('share.eachGets')} `));
              fracLine.appendChild(el('span', { class: 'r', text: String(s.each) }));
              fracLine.appendChild(document.createTextNode(' + '));
              fracLine.appendChild(el('span', { class: 't', text: fracStr }));
              eqCard.appendChild(fracLine);
            }
          }
        }

        clear(barWrap);
        if (c.done) {
          const barCard = el('section', { class: 'card bar-card' }, [
            el('h3', { class: 'pane-title', text: t('share.barTitle') }),
            createBarSVG(c),
          ]);
          barWrap.appendChild(barCard);
        }

        clear(actions);
        if (!c.done) {
          actions.appendChild(
            el('button', {
              class: 'btn thread',
              type: 'button',
              text: t('share.round'),
              onclick: () => table.dealRound(),
            })
          );
          actions.appendChild(
            el('button', {
              class: 'btn quiet',
              type: 'button',
              text: t('share.all'),
              onclick: () => table.dealAll(),
            })
          );
        } else if (s.remainder > 0 && !c.cut && leftover) {
          actions.appendChild(
            el('button', {
              class: 'btn thread',
              type: 'button',
              text: t('share.cut', { n: c.plates }),
              onclick: () => table.cutLeftovers(),
            })
          );
        }

        if (c.dealt > 0) {
          actions.appendChild(
            el('button', {
              class: 'btn quiet',
              type: 'button',
              text: t('common.reset'),
              onclick: () => {
                spoken = false;
                cutSpoken = false;
                say.hidden = true;
                state.dealt = 0;
                state.cut = false;
                table.reset();
              },
            })
          );
        }

        if (c.done && !spoken) {
          spoken = true;
          const msg = s.remainder
            ? t('share.left', { each: s.each, r: s.remainder })
            : t('share.even', { each: s.each });
          say.textContent = msg;
          say.hidden = false;
          voice.say(msg);
        }

        if (!c.cut) {
          cutSpoken = false;
        } else if (!cutSpoken && s.remainder > 0) {
          cutSpoken = true;
          const ff = leftoverFraction(s.remainder, c.plates);
          if (ff) {
            const cutMsg = t('share.cutSay', {
              n: c.plates,
              each: s.each,
              f: `${ff.simpleNum}/${ff.simpleDen}`,
            });
            say.textContent = cutMsg;
            say.hidden = false;
            voice.say(cutMsg);
          }
        }

        nextRow.hidden = !(c.done && (!leftover || !s.remainder || c.cut));
      }

      const table: FairShareManipulative = createFairShare({
        total: getTotal(),
        plates: getPlates(),
        initialDealt: typeof state.dealt === 'number' ? (state.dealt as number) : undefined,
        initialCut: typeof state.cut === 'boolean' ? (state.cut as boolean) : undefined,
        trayLabel: t('share.tray'),
        onChange: (counts) => {
          state.dealt = counts.dealt;
          state.cut = counts.cut;
          if (ready) paint(counts);
        },
      });

      const guideText = t(leftover ? 'share.l1' : 'share.s1', {
        a: getTotal(),
        b: getPlates(),
      });
      const stepGuide = createStepGuide(1, guideText);

      const totalStepper = createStepper({
        value: getTotal(),
        min: 2,
        max: 30,
        label: t('share.laddoos'),
        onChange: (v) => {
          state.total = v;
          state.dealt = 0;
          state.cut = false;
          spoken = false;
          cutSpoken = false;
          say.hidden = true;
          setStepGuide(
            stepGuide,
            1,
            t(leftover ? 'share.l1' : 'share.s1', { a: v, b: getPlates() })
          );
          table.setTotal(v);
        },
      });

      const plateStepper = createStepper({
        value: getPlates(),
        min: 2,
        max: 6,
        label: t('share.plates'),
        onChange: (v) => {
          state.plates = v;
          state.dealt = 0;
          state.cut = false;
          spoken = false;
          cutSpoken = false;
          say.hidden = true;
          setStepGuide(
            stepGuide,
            1,
            t(leftover ? 'share.l1' : 'share.s1', { a: getTotal(), b: v })
          );
          table.setPlates(v);
        },
      });

      const nextRow = el('div', { class: 'next-row', hidden: true }, [
        el('button', {
          class: 'btn primary block',
          type: 'button',
          text: t('common.explain'),
          onclick: () => router.go('explain', { k: leftover ? 'D3' : 'D1' }),
        }),
      ]);

      view.appendChild(stepGuide);
      view.appendChild(el('div', { class: 'model-wrap' }, [table.node]));
      view.appendChild(actions);
      view.appendChild(say);

      view.appendChild(
        el('div', { class: 'control-group' }, [
          el('label', { class: 'control-label', text: t('share.laddoos') }),
          totalStepper.node,
        ])
      );
      view.appendChild(
        el('div', { class: 'control-group' }, [
          el('label', { class: 'control-label', text: t('share.plates') }),
          plateStepper.node,
        ])
      );

      view.appendChild(eqCard);
      view.appendChild(barWrap);
      view.appendChild(nextRow);

      ready = true;
      paint(table.counts());

      return () => {
        table.destroy();
      };
    },
  };
}
