/**
 * Bodha Concept Cards Screen: Explains the concept before practice.
 * 5 to 6 concise visual cards with worked example step-by-step reveal,
 * bilingual glossary bridge cards, and sutra retention.
 */

import { afterBodha, findKnot } from '../../../domain/curriculum/curriculum';
import { getLang, t, tIn } from '../../../domain/i18n/core';
import { availableIn } from '../../../domain/reading';
import { readButton } from './read';
import { getLesson } from '../../../domain/lesson/registry';
import type { BodhaCard } from '../../../domain/lesson/types';
import { storage } from '../../../persistence/storage';
import { clear, el } from '../../util/dom';
import { plainText, richPara } from '../../util/markup';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { getVisuals } from '../../lesson-visuals';
import { renderLessonMissing } from './lesson-missing';
import { voice } from '../voice/voice';

const SIZES = ['1', '1.15', '1.3'];

function getCardTexts(cid: string, card: BodhaCard, step: number): string[] {
  const key = `bodha.${cid}.${card.key}`;
  if (card.key === 'example') {
    const parts = [t(key)];
    for (let i = 1; i <= step; i++) {
      parts.push(t(`${key}${i}`));
    }
    return parts;
  }
  if (card.key === 'what') {
    return [t(key), t(`bodha.${cid}.can`)];
  }
  return [t(key)];
}

export function createBodhaScreen(): ScreenMeta {
  return {
    id: 'bodha',
    stage: 'shravana',
    step: 'bodha',
    title: 'bodha.title',
    render(view, state, params) {
      const knotId = params.k || '';
      const knot = findKnot(knotId);
      const lesson = getLesson(knotId);
      if (!lesson) {
        renderLessonMissing(view, knotId, 'bodha');
        return;
      }

      enterThread(knotId, 'bodha', { k: knotId });
      const cid = lesson.content || knotId;
      const cards = lesson.cards;

      if (state.card === undefined) state.card = 0;
      if (state.step === undefined) state.step = 0;

      const cardIndex = Math.max(0, Math.min(Number(state.card), cards.length - 1));
      state.card = cardIndex;
      const card = cards[cardIndex];
      if (!card) return;
      const exSteps = card.steps || 0;

      const sizeIndex = storage.get<number>('textSize', 0);
      const wrap = el('div', {
        class: 'bodha',
        style: { '--bodha-scale': SIZES[sizeIndex] || '1' },
      });

      // Top bar: Progress beads & text size buttons
      const dots = el(
        'div',
        { class: 'bodha-dots', 'aria-hidden': 'true' },
        cards.map((_c, i) =>
          el('span', {
            class: i === cardIndex ? 'on' : i < cardIndex ? 'past' : '',
          })
        )
      );

      const sizeRow = el(
        'div',
        { class: 'bodha-size', role: 'group', 'aria-label': t('bodha.textSize') },
        [
          el('button', {
            type: 'button',
            class: 'chip',
            'aria-label': t('bodha.smaller'),
            text: 'A−',
            disabled: sizeIndex === 0,
            onclick: () => {
              storage.set('textSize', Math.max(0, sizeIndex - 1));
              router.rerender();
            },
          }),
          el('button', {
            type: 'button',
            class: 'chip',
            'aria-label': t('bodha.bigger'),
            text: 'A+',
            disabled: sizeIndex === SIZES.length - 1,
            onclick: () => {
              storage.set('textSize', Math.min(SIZES.length - 1, sizeIndex + 1));
              router.rerender();
            },
          }),
        ]
      );

      wrap.appendChild(el('div', { class: 'bodha-top' }, [dots, sizeRow]));
      wrap.appendChild(el('p', { class: 'bodha-knot', text: t(`knot.${knotId}.t`) }));
      wrap.appendChild(el('h2', { class: 'screen-title', text: t(`bodha.t.${card.key}`) }));

      // Glossary Bridge Card container
      const bridge = el('div', {
        class: 'bridge',
        hidden: true,
        'aria-live': 'polite',
      });

      const onTerm = (id: string, shown: string) => {
        clear(bridge);
        bridge.hidden = false;
        bridge.appendChild(el('p', { class: 'bridge-word', text: shown }));
        bridge.appendChild(el('p', { text: t(`gloss.${id}`) }));

        const lang = getLang();
        if (lang !== 'en') {
          const englishTerm =
            tIn('en', `gloss.${id}.en`) !== `gloss.${id}.en`
              ? tIn('en', `gloss.${id}.en`)
              : tIn('en', `gloss.${id}`);
          bridge.appendChild(
            el('p', {
              class: 'muted small',
              lang: 'en',
              text: `${t('bodha.inEnglish')} ${englishTerm}`,
            })
          );
        }
        voice.say(`${shown}. ${t(`gloss.${id}`)}`, { noCaption: true });
      };

      // Prediction recall on first card if prashna was answered
      if (card.key === 'what') {
        const guess = storage.get<number | null>(`guess:${knotId}`, null);
        if (guess !== null) {
          wrap.appendChild(
            el('div', { class: 'guess-reveal' }, [
              el('p', {
                class: 'muted small',
                text: t('bodha.youGuessed', {
                  g: t(`prashna.${cid}.c${guess + 1}`),
                }),
              }),
              el('p', { text: t(`prashna.${cid}.a`) }),
            ])
          );
        }
      }

      // Card Body Texts
      const texts = getCardTexts(cid, card, Number(state.step));
      if (card.key === 'sutra') {
        wrap.appendChild(
          el('p', {
            class: 'bodha-sutra',
            text: plainText(t(`bodha.${cid}.sutra`)),
          })
        );
      } else if (card.key === 'example') {
        wrap.appendChild(richPara(texts[0] ?? '', onTerm));
        const ol = el('ol', { class: 'bodha-steps' });
        texts.slice(1).forEach((s, i) => {
          ol.appendChild(
            el('li', { class: i === texts.length - 2 ? 'new' : '' }, [richPara(s, onTerm)])
          );
        });
        wrap.appendChild(ol);
      } else {
        texts.forEach((s) => {
          wrap.appendChild(richPara(s, onTerm));
        });
      }

      wrap.appendChild(bridge);

      // Embedded Card Diagram
      const figure = card.key === 'sutra' ? undefined : getVisuals(knotId).cards?.[card.key];
      const figSvg = figure ? figure(Number(state.step)) : null;
      if (figSvg) {
        wrap.appendChild(el('div', { class: 'model bodha-fig' }, [figSvg]));
      } else if (card.key !== 'sutra') {
        console.error(`Bodha ${knotId}.${card.key} has no picture`);
      }

      // Worked example block (if not currently on the example card)
      const exCard = cards.find((c) => c.key === 'example');
      if (card.key !== 'example' && exCard) {
        const exStepsCount = exCard.steps || 0;
        const exTexts = getCardTexts(cid, exCard, Number(state.step));
        const exSection = el('section', { class: 'card bodha-example-section' }, [
          el('h3', { class: 'pane-title', text: t('bodha.t.example') }),
          richPara(exTexts[0] ?? '', onTerm),
        ]);
        const ol = el('ol', { class: 'bodha-steps' });
        exTexts.slice(1).forEach((s, i) => {
          ol.appendChild(
            el('li', { class: i === exTexts.length - 2 ? 'new' : '' }, [richPara(s, onTerm)])
          );
        });
        exSection.appendChild(ol);
        if (Number(state.step) < exStepsCount) {
          const stepLabel = Number(state.step) === 0 ? t('bodha.showFirst') : t('bodha.nextStep');
          exSection.appendChild(
            el('button', {
              class: 'btn thread block',
              type: 'button',
              text: stepLabel,
              onclick: () => {
                state.step = Number(state.step) + 1;
                router.rerender();
                speak(true);
              },
            })
          );
        }
        wrap.appendChild(exSection);
      }

      // Sutra section & keep button (if not currently on sutra card)
      const sutraCard = cards.find((c) => c.key === 'sutra');
      if (card.key !== 'sutra' && sutraCard) {
        const kept = storage.get<string[]>('sutras', []);
        const isKept = kept.includes(knotId);
        const sutraSection = el('section', { class: 'card bodha-sutra-section' }, [
          el('h3', { class: 'pane-title', text: t('bodha.t.sutra') }),
          el('p', {
            class: 'bodha-sutra',
            text: plainText(t(`bodha.${cid}.sutra`)),
          }),
          el('button', {
            class: isKept ? 'btn quiet' : 'btn thread',
            type: 'button',
            text: isKept ? t('bodha.kept') : t('bodha.keep'),
            onclick: () => {
              const list = storage.get<string[]>('sutras', []);
              if (!list.includes(knotId)) {
                list.push(knotId);
                storage.set('sutras', list);
              }
              router.rerender();
            },
          }),
        ]);
        wrap.appendChild(sutraSection);
      }

      // Navigation & Action Buttons
      const actions = el('div', { class: 'btn-row bodha-nav' });

      // Worked Example Reveal button (when on example card)
      if (card.key === 'example' && Number(state.step) < exSteps) {
        const stepLabel = Number(state.step) === 0 ? t('bodha.showFirst') : t('bodha.nextStep');
        actions.appendChild(
          el('button', {
            class: 'btn thread block',
            type: 'button',
            text: stepLabel,
            onclick: () => {
              state.step = Number(state.step) + 1;
              router.rerender();
              speak(true);
            },
          })
        );
      }

      // Back Button
      const backBtn = el('button', {
        class: 'btn quiet',
        type: 'button',
        text: t('bodha.back'),
        disabled: cardIndex === 0,
        onclick: () => {
          state.card = cardIndex - 1;
          state.step = 0;
          state.spoken = null;
          router.rerender();
        },
      });
      actions.appendChild(backBtn);

      // Read aloud button
      actions.appendChild(
        el('button', {
          class: 'btn quiet',
          type: 'button',
          text: t('bodha.hear'),
          onclick: () => speak(false, true),
        })
      );

      // Sutra keep button (when on sutra card)
      if (card.key === 'sutra') {
        const kept = storage.get<string[]>('sutras', []);
        const isKept = kept.includes(knotId);

        const keepBtn = el('button', {
          class: isKept ? 'btn quiet' : 'btn thread',
          type: 'button',
          text: isKept ? t('bodha.kept') : t('bodha.keep'),
          onclick: () => {
            const list = storage.get<string[]>('sutras', []);
            if (!list.includes(knotId)) {
              list.push(knotId);
              storage.set('sutras', list);
            }
            router.rerender();
          },
        });
        actions.appendChild(keepBtn);
      }

      // Progression button: To the film or workbench
      const nextRoute = knot ? afterBodha(knot) : undefined;
      const toNextLabel = nextRoute?.route === 'film' ? t('bodha.toFilm') : t('bodha.toBench');

      const toNextBtn = el('button', {
        class: 'btn quiet block',
        type: 'button',
        text: toNextLabel,
        onclick: () => {
          state.card = 0;
          state.step = 0;
          state.spoken = null;
          if (nextRoute) {
            router.go(nextRoute.route, nextRoute.params);
          }
        },
      });
      actions.appendChild(toNextBtn);
      if (availableIn(knotId, getLang())) actions.appendChild(readButton(knotId));

      if (cardIndex < cards.length - 1) {
        const nextBtn = el('button', {
          class: 'btn primary',
          type: 'button',
          text: t('bodha.next'),
          onclick: () => {
            state.card = cardIndex + 1;
            state.step = 0;
            state.spoken = null;
            router.rerender();
          },
        });
        actions.appendChild(nextBtn);
      }

      wrap.appendChild(actions);
      view.appendChild(wrap);

      function speak(lastOnly: boolean, force = false): void {
        if (!card) return;
        const all = getCardTexts(cid, card, Number(state.step)).map(plainText);
        const speechText =
          card.key === 'sutra'
            ? plainText(t(`bodha.${cid}.sutra`))
            : lastOnly
              ? (all[all.length - 1] ?? '')
              : all.join(' ');
        const speakKey = `${cardIndex}:${state.step}`;
        if (!force && state.spoken === speakKey) return;
        state.spoken = speakKey;
        voice.say(speechText, { noCaption: true });
      }

      speak(false);
    },
  };
}
