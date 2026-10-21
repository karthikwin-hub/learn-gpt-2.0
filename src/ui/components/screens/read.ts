/**
 * "Read the chapter" (048): the longer chapter for a knot, with headings, pictures, Did you know?
 * boxes, words to know, a try-at-home activity and check-yourself questions whose answers the child
 * reveals. Nothing is scored.
 */

import { getLang, t } from '../../../domain/i18n/core';
import { chapterFor, type Chapter } from '../../../domain/reading';
import { findKnot, firstStep } from '../../../domain/curriculum/curriculum';
import { storage } from '../../../persistence/storage';
import { clear, el } from '../../util/dom';
import { plainText, richPara } from '../../util/markup';
import { readingFigure } from '../../lesson-visuals/reading';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

const SIZES = ['1', '1.15', '1.3'];

/** Opens the chapter for a knot. */
export function readButton(knot: string, cls = 'btn quiet'): HTMLElement {
  return el('button', {
    class: cls,
    type: 'button',
    'data-read': knot,
    text: t('read.open'),
    onclick: () => router.go('read', { k: knot }),
  });
}

/** Text-size buttons that resize `wrap` in place, so a long chapter keeps its scroll position. */
function sizeRow(wrap: HTMLElement): HTMLElement {
  let index = storage.get<number>('textSize', 0);
  const smaller = el('button', {
    type: 'button',
    class: 'chip',
    'aria-label': t('bodha.smaller'),
    text: 'A−',
    onclick: () => set(index - 1),
  }) as HTMLButtonElement;
  const bigger = el('button', {
    type: 'button',
    class: 'chip',
    'aria-label': t('bodha.bigger'),
    text: 'A+',
    onclick: () => set(index + 1),
  }) as HTMLButtonElement;
  function set(i: number): void {
    index = Math.max(0, Math.min(SIZES.length - 1, i));
    storage.set('textSize', index);
    wrap.style.setProperty('--bodha-scale', SIZES[index] || '1');
    smaller.disabled = index === 0;
    bigger.disabled = index === SIZES.length - 1;
  }
  set(index);
  return el('div', { class: 'bodha-size', role: 'group', 'aria-label': t('bodha.textSize') }, [
    smaller,
    bigger,
  ]);
}

function question(q: { q: string; a: string }): HTMLElement {
  const answer = el('p', { class: 'read-a', text: q.a, hidden: true });
  const btn = el('button', {
    class: 'btn quiet',
    type: 'button',
    'aria-expanded': 'false',
    text: t('read.show'),
  }) as HTMLButtonElement;
  btn.onclick = () => {
    const open = answer.hidden;
    answer.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? t('read.hide') : t('read.show');
  };
  return el('li', { class: 'read-q' }, [el('p', { text: q.q }), btn, answer]);
}

function figure(id: string, caption?: string): HTMLElement | null {
  const pic = readingFigure(id);
  if (!pic) {
    console.error(`Reading figure ${id} is missing`);
    return null;
  }
  return el('figure', { class: 'read-fig' }, [
    el('div', { class: 'model' }, [pic]),
    ...(caption ? [el('figcaption', { class: 'muted small', text: caption })] : []),
  ]);
}

function render(view: HTMLElement, c: Chapter): void {
  const wrap = el('article', { class: 'bodha read' });

  const bridge = el('div', { class: 'bridge', hidden: true, 'aria-live': 'polite' });
  const onTerm = (id: string, word: string) => {
    const w = c.words.find((x) => x.id === id);
    clear(bridge);
    bridge.hidden = false;
    bridge.appendChild(el('p', { class: 'bridge-word', text: word }));
    bridge.appendChild(el('p', { text: w?.meaning ?? '' }));
    voice.say(`${word}. ${w?.meaning ?? ''}`, { noCaption: true });
  };
  const para = (s: string) => richPara(s, onTerm);

  wrap.appendChild(
    el('div', { class: 'bodha-top' }, [
      el('p', { class: 'bodha-knot', text: t(`knot.${c.knot}.t`) }),
      sizeRow(wrap),
    ])
  );
  wrap.appendChild(el('h2', { class: 'screen-title', text: c.title }));
  wrap.appendChild(para(c.intro));
  wrap.appendChild(bridge);

  c.sections.forEach((s, i) => {
    const sec = el('section', { class: 'read-section', 'aria-labelledby': `read-h${i}` }, [
      el('h3', { id: `read-h${i}`, text: s.heading }),
      ...s.paras.map(para),
    ]);
    const fig = s.figure ? figure(s.figure, s.caption) : null;
    if (fig) sec.appendChild(fig);
    if (s.didYouKnow) {
      sec.appendChild(
        el('aside', { class: 'read-dyk' }, [
          el('p', { class: 'read-dyk-h', text: t('read.dyk') }),
          para(s.didYouKnow),
        ])
      );
    }
    sec.appendChild(
      el('button', {
        class: 'btn quiet read-hear',
        type: 'button',
        text: t('read.hear'),
        onclick: () =>
          voice.say([s.heading, ...s.paras, s.didYouKnow ?? ''].map(plainText).join(' ')),
      })
    );
    wrap.appendChild(sec);
  });

  wrap.appendChild(
    el('section', { class: 'read-section read-words', 'aria-labelledby': 'read-words' }, [
      el('h3', { id: 'read-words', text: t('read.words') }),
      el(
        'dl',
        {},
        c.words.flatMap((w) => [el('dt', { text: w.word }), el('dd', { text: w.meaning })])
      ),
    ])
  );

  wrap.appendChild(
    el('section', { class: 'read-section read-activity', 'aria-labelledby': 'read-act' }, [
      el('h3', { id: 'read-act', text: `${t('read.activity')}: ${c.activity.title}` }),
      el(
        'ol',
        {},
        c.activity.steps.map((s) => el('li', {}, [para(s)]))
      ),
    ])
  );

  wrap.appendChild(
    el('section', { class: 'read-section read-check', 'aria-labelledby': 'read-check' }, [
      el('h3', { id: 'read-check', text: t('read.check') }),
      el('ol', {}, c.questions.map(question)),
    ])
  );

  const knot = findKnot(c.knot);
  wrap.appendChild(
    el('div', { class: 'btn-row' }, [
      el('button', {
        class: 'btn primary',
        type: 'button',
        text: t('read.toLesson'),
        onclick: () => {
          if (!knot) return;
          const step = firstStep(knot);
          router.go(step.route, step.params);
        },
      }),
      el('button', {
        class: 'btn quiet',
        type: 'button',
        text: t('read.toShala', { s: t('section.loka') }),
        onclick: () => router.go('shala', { s: 'loka' }),
      }),
    ])
  );
  view.appendChild(wrap);
}

export function createReadScreen(): ScreenMeta {
  return {
    id: 'read',
    title: 'read.title',
    render(view, _state, params) {
      const c = chapterFor(params.k || '', getLang());
      if (!c) {
        view.appendChild(el('p', { class: 'say', text: t('read.notYet') }));
        view.appendChild(
          el('button', {
            class: 'btn quiet',
            type: 'button',
            text: t('read.toShala', { s: t('section.loka') }),
            onclick: () => router.go('shala', { s: 'loka' }),
          })
        );
        return;
      }
      render(view, c);
    },
  };
}
