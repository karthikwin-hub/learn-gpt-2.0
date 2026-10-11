/**
 * Two Drummers workbench screen (thread M5).
 * Simulates two rhythm tala cycles meeting along a shared timeline.
 */

import { lcm } from '../../../domain/math/multiply';
import { t } from '../../../domain/i18n/core';
import { clear, createStepper, el } from '../../util/dom';
import { drums, type DrumsInstance } from '../../manipulatives/drums';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

export function createDrumsScreen(): ScreenMeta {
  return {
    id: 'drums',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'drums.title',
    render(view, state, params = {}) {
      enterThread('M5', 'drums');

      const parsedA = params.a ? parseInt(params.a, 10) : NaN;
      const parsedB = params.b ? parseInt(params.b, 10) : NaN;
      const parsedGuess = params.guess ? parseInt(params.guess, 10) : NaN;

      const numA = !isNaN(parsedA) ? parsedA : typeof state.a === 'number' ? state.a : 3;
      const numB = !isNaN(parsedB) ? parsedB : typeof state.b === 'number' ? state.b : 4;
      const numGuess = !isNaN(parsedGuess)
        ? parsedGuess
        : typeof state.guess === 'number'
          ? state.guess
          : 7;

      state.a = numA;
      state.b = numB;
      state.guess = numGuess;

      const getA = (): number => Number(state.a);
      const getB = (): number => Number(state.b);
      const getGuess = (): number => Number(state.guess);

      const say = el('p', { class: 'say workbench-feedback', hidden: true });
      const listsCard = el('section', { class: 'card' });
      let hitsA: number[] = [];
      let hitsB: number[] = [];
      let firstMeet: number | null = null;

      const drumsManip: DrumsInstance = drums({
        a: getA(),
        b: getB(),
        describe: (aNum, bNum) => t('drums.describe', { a: aNum, b: bNum }),
        onBeat: (n, ha, hb) => {
          if (ha) hitsA.push(n);
          if (hb) hitsB.push(n);
          if (ha && hb && firstMeet === null) {
            firstMeet = n;
          }
          paintLists();
        },
        onEnd: () => {
          playBtn.textContent = t('drums.play');
          reveal();
        },
      });

      function reveal(): void {
        const meet = lcm(getA(), getB());
        const text = t('drums.meet', { n: meet, guess: getGuess() });
        say.textContent = text;
        say.hidden = false;
        voice.say(text);
      }

      function paintLists(): void {
        clear(listsCard);
        listsCard.appendChild(el('h3', { class: 'pane-title', text: t('drums.lists') }));

        const rows: Array<[number, number[], string]> = [
          [getA(), hitsA, 'a-txt'],
          [getB(), hitsB, 'b-txt'],
        ];

        rows.forEach(([drumVal, hitList, txtClass]) => {
          const p = el('p', {});
          p.appendChild(el('span', { class: txtClass, text: `${drumVal}: ` }));
          if (hitList.length === 0) {
            p.appendChild(el('span', { class: 'muted', text: '…' }));
          } else {
            hitList.forEach((n, idx) => {
              if (idx > 0) {
                p.appendChild(document.createTextNode(', '));
              }
              const isCommon =
                n === firstMeet || (firstMeet !== null && n % lcm(getA(), getB()) === 0);
              if (isCommon) {
                p.appendChild(
                  el('strong', {
                    style: {
                      color: 'var(--ink)',
                      background: 'var(--thread-soft)',
                      padding: '0 4px',
                      borderRadius: '6px',
                    },
                    text: String(n),
                  })
                );
              } else {
                p.appendChild(document.createTextNode(String(n)));
              }
            });
          }
          listsCard.appendChild(p);
        });
      }

      const question = el('h2', {
        class: 'screen-title',
        style: { fontSize: '20px' },
        text: t('drums.q', { a: getA(), b: getB() }),
      });

      function restart(): void {
        hitsA = [];
        hitsB = [];
        firstMeet = null;
        question.textContent = t('drums.q', { a: getA(), b: getB() });
        say.hidden = true;
        say.textContent = '';
        playBtn.textContent = t('drums.play');
        paintLists();
      }

      const playBtn = el('button', {
        class: 'btn primary block',
        type: 'button',
        text: t('drums.play'),
        onclick: () => {
          if (drumsManip.playing()) {
            drumsManip.stop();
            playBtn.textContent = t('drums.play');
            reveal();
            return;
          }
          restart();
          drumsManip.reset();
          playBtn.textContent = t('drums.stop');
          drumsManip.play();
        },
      });

      const guessStep = createStepper({
        value: getGuess(),
        min: 1,
        max: 72,
        label: t('drums.guess'),
        onChange: (v) => {
          state.guess = v;
        },
      });

      const aStep = createStepper({
        value: getA(),
        min: 2,
        max: 9,
        label: t('drums.first'),
        onChange: (v) => {
          state.a = v;
          drumsManip.setA(v);
          restart();
        },
      });

      const bStep = createStepper({
        value: getB(),
        min: 2,
        max: 9,
        label: t('drums.second'),
        onChange: (v) => {
          state.b = v;
          drumsManip.setB(v);
          restart();
        },
      });

      const nextBtn = el('button', {
        class: 'btn primary block',
        type: 'button',
        text: t('common.explain'),
        onclick: () => {
          router.go('explain', { k: 'M5' });
        },
      });

      view.appendChild(question);
      view.appendChild(
        el('div', { class: 'control-row' }, [
          el('label', { text: t('drums.guess') }),
          guessStep.node,
        ])
      );
      view.appendChild(el('div', { class: 'model' }, [drumsManip.node]));
      view.appendChild(el('div', { class: 'btn-row' }, [playBtn]));
      view.appendChild(say);
      view.appendChild(listsCard);
      view.appendChild(
        el('div', { class: 'control-row' }, [
          el('label', {}, [el('span', { class: 'a-txt', text: t('drums.first') })]),
          aStep.node,
        ])
      );
      view.appendChild(
        el('div', { class: 'control-row' }, [
          el('label', {}, [el('span', { class: 'b-txt', text: t('drums.second') })]),
          bStep.node,
        ])
      );
      view.appendChild(el('p', { class: 'muted small', text: t('drums.try') }));
      view.appendChild(el('div', { class: 'btn-row' }, [nextBtn]));

      paintLists();

      return () => {
        drumsManip.destroy();
      };
    },
  };
}
