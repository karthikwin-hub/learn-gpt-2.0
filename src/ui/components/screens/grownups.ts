/**
 * Acharya corner / Grown-ups settings screen.
 * Protected by a two-finger physical hold (not a math question).
 * Displays weekly reviewed concepts, pedagogy principles, DPDP privacy guarantee,
 * and system settings with two-tap reset protection.
 */

import {
  t,
  setLang,
  getLang,
  LANGS,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../../../domain/i18n/core';
import { pothi } from '../../../persistence/pothi';
import { storage } from '../../../persistence/storage';
import { clear, el } from '../../util/dom';
import { voice } from '../voice/voice';
import { router, type ScreenMeta } from '../app/router';
import { sentenceText } from './explain';

const HOLD_MS = 2000;

function holdCheck(view: HTMLElement, state: Record<string, unknown>): () => void {
  const held: Record<number, string> = {};
  let start = 0;
  let raf = 0;
  const bar = el('i');

  const dots = [0, 1].map((i) => {
    const d = el('button', {
      class: 'hold-dot',
      type: 'button',
      'aria-label': t('grown.dot', { n: i + 1 }),
    });

    d.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      held[i] = e.pointerType || 'touch';
      d.classList.add('held');
      check();
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => {
      d.addEventListener(ev, () => {
        delete held[i];
        d.classList.remove('held');
        check();
      });
    });

    d.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !held[i]) {
        e.preventDefault();
        held[i] = 'keyboard';
        d.classList.add('held');
        check();
      }
    });

    d.addEventListener('keyup', () => {
      delete held[i];
      d.classList.remove('held');
      check();
    });

    return d;
  });

  function ready(): boolean {
    const keys = Object.keys(held);
    if (keys.length === 2) return true;
    return (
      keys.length === 1 &&
      (held[Number(keys[0])] === 'mouse' || held[Number(keys[0])] === 'keyboard')
    );
  }

  function check(): void {
    if (ready()) {
      if (!start) {
        start = performance.now();
        tick();
      }
    } else {
      start = 0;
      cancelAnimationFrame(raf);
      bar.style.width = '0';
    }
  }

  function tick(): void {
    raf = requestAnimationFrame(() => {
      if (!start) return;
      const p = Math.min(1, (performance.now() - start) / HOLD_MS);
      bar.style.width = `${p * 100}%`;
      if (p >= 1) {
        state.unlocked = true;
        router.rerender();
        return;
      }
      tick();
    });
  }

  view.appendChild(el('h2', { class: 'screen-title', text: t('grown.heading') }));
  view.appendChild(el('p', { text: t('grown.holdPrompt') }));
  view.appendChild(el('div', { class: 'hold-check' }, dots));
  view.appendChild(el('div', { class: 'progress-ring', 'aria-hidden': 'true' }, [bar]));
  view.appendChild(
    el('p', {
      class: 'muted small',
      style: { textAlign: 'center', marginTop: '14px' },
      text: t('grown.holdWhy'),
    })
  );

  const currentRate = storage.get<number>('voiceRate', 0.92);
  const quickSpeed = el(
    'div',
    { class: 'chip-group', role: 'group', 'aria-label': t('grown.speed') },
    [
      el('button', {
        type: 'button',
        class: `chip${currentRate < 0.9 ? ' on' : ''}`,
        text: t('grown.slow'),
        onclick: () => {
          storage.set('voiceRate', 0.8);
          voice.say(t('grown.speedSample'));
          router.rerender();
        },
      }),
      el('button', {
        type: 'button',
        class: `chip${currentRate >= 0.9 ? ' on' : ''}`,
        text: t('grown.normal'),
        onclick: () => {
          storage.set('voiceRate', 0.92);
          voice.say(t('grown.speedSample'));
          router.rerender();
        },
      }),
    ]
  );
  view.appendChild(setting(t('grown.speed'), quickSpeed));

  return () => cancelAnimationFrame(raf);
}

function setting(label: string, control: HTMLElement): HTMLElement {
  return el('div', { class: 'setting' }, [el('span', { text: label }), control]);
}

export function createGrownupsScreen(): ScreenMeta {
  return {
    id: 'grownups',
    title: 'grown.title',
    render(view, state) {
      clear(view);

      if (!state.unlocked) {
        return holdCheck(view, state);
      }

      const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
      const pages = pothi
        .getPages()
        .filter((p) => (p.time || 0) >= weekAgo)
        .reverse();

      const week = el('section', { class: 'card' }, [
        el('h3', { class: 'pane-title', text: t('grown.week') }),
      ]);
      if (pages.length === 0) {
        week.appendChild(el('p', { class: 'muted', text: t('grown.weekEmpty') }));
      } else {
        week.appendChild(
          el(
            'ul',
            { class: 'list-plain' },
            pages.map((p) =>
              el('li', {}, [
                el('strong', { text: `${t(`knot.${p.thread}.t`)}: ` }),
                sentenceText(p.thread, p.fills),
              ])
            )
          )
        );
      }
      week.appendChild(
        el('button', {
          class: 'link-btn',
          type: 'button',
          text: t('grown.openNotebook'),
          onclick: () => router.go('notebook'),
        })
      );
      view.appendChild(week);

      view.appendChild(
        el('section', { class: 'card' }, [
          el('h3', { class: 'pane-title', text: t('grown.howTitle') }),
          el(
            'ul',
            { class: 'list-plain' },
            ['grown.how1', 'grown.how2', 'grown.how3', 'grown.how4'].map((k) =>
              el('li', { text: t(k) })
            )
          ),
        ])
      );

      view.appendChild(
        el('section', { class: 'card' }, [
          el('h3', { class: 'pane-title', text: t('grown.privacyTitle') }),
          el(
            'ul',
            { class: 'list-plain' },
            ['grown.priv1', 'grown.priv2', 'grown.priv3', 'grown.priv4'].map((k) =>
              el('li', { text: t(k) })
            )
          ),
        ])
      );

      view.appendChild(
        el('section', { class: 'card' }, [
          el('h3', { class: 'pane-title', text: t('grown.together') }),
          el('p', { text: t('grown.togetherText') }),
        ])
      );

      const settings = el('section', { class: 'card' }, [
        el('h3', { class: 'pane-title', text: t('grown.settings') }),
      ]);

      // Language Chips
      const currentLang = getLang();
      const langChips = el(
        'div',
        { class: 'chip-group', role: 'group', 'aria-label': t('chrome.language') },
        SUPPORTED_LANGUAGES.map((code: LanguageCode) =>
          el('button', {
            type: 'button',
            class: `chip${currentLang === code ? ' on' : ''}`,
            text: LANGS[code].native,
            onclick: () => {
              setLang(code);
              router.rerender();
            },
          })
        )
      );
      settings.appendChild(setting(t('chrome.language'), langChips));

      // Speed Chips
      const currentRate = storage.get<number>('voiceRate', 0.92);
      const speedChips = el(
        'div',
        { class: 'chip-group', role: 'group', 'aria-label': t('grown.speed') },
        [
          el('button', {
            type: 'button',
            class: `chip${currentRate < 0.9 ? ' on' : ''}`,
            text: t('grown.slow'),
            onclick: () => {
              storage.set('voiceRate', 0.8);
              voice.say(t('grown.speedSample'));
              router.rerender();
            },
          }),
          el('button', {
            type: 'button',
            class: `chip${currentRate >= 0.9 ? ' on' : ''}`,
            text: t('grown.normal'),
            onclick: () => {
              storage.set('voiceRate', 0.92);
              voice.say(t('grown.speedSample'));
              router.rerender();
            },
          }),
        ]
      );
      settings.appendChild(setting(t('grown.speed'), speedChips));

      // Captions Chips
      const captionsOn = storage.get<boolean>('captions', true);
      const captionsChips = el(
        'div',
        { class: 'chip-group', role: 'group', 'aria-label': t('grown.captions') },
        [
          el('button', {
            type: 'button',
            class: `chip${captionsOn ? ' on' : ''}`,
            text: t('common.on'),
            onclick: () => {
              storage.set('captions', true);
              router.rerender();
            },
          }),
          el('button', {
            type: 'button',
            class: `chip${!captionsOn ? ' on' : ''}`,
            text: t('common.off'),
            onclick: () => {
              storage.set('captions', false);
              router.rerender();
            },
          }),
        ]
      );
      settings.appendChild(setting(t('grown.captions'), captionsChips));

      // Night Mode Chips
      const currentTheme = storage.get<string>('theme', 'day');
      const nightChips = el(
        'div',
        { class: 'chip-group', role: 'group', 'aria-label': t('grown.night') },
        [
          el('button', {
            type: 'button',
            class: `chip${currentTheme === 'day' ? ' on' : ''}`,
            text: t('common.off'),
            onclick: () => {
              storage.set('theme', 'day');
              document.documentElement.setAttribute('data-theme', 'day');
              router.rerender();
            },
          }),
          el('button', {
            type: 'button',
            class: `chip${currentTheme === 'night' ? ' on' : ''}`,
            text: t('common.on'),
            onclick: () => {
              storage.set('theme', 'night');
              document.documentElement.setAttribute('data-theme', 'night');
              router.rerender();
            },
          }),
        ]
      );
      settings.appendChild(setting(t('grown.night'), nightChips));

      // Reset / Erase everything
      const resetBtn = el('button', {
        class: 'btn quiet',
        type: 'button',
        text: t('grown.reset'),
        onclick: () => {
          if (!state.confirmReset) {
            state.confirmReset = true;
            resetBtn.textContent = t('grown.resetConfirm');
            resetBtn.classList.add('thread');
            return;
          }
          storage.clearAll();
          state.unlocked = false;
          state.confirmReset = false;
          router.replace('language');
        },
      });
      state.confirmReset = false;
      settings.appendChild(
        el('div', { class: 'setting' }, [
          el('span', { class: 'muted small', text: t('grown.resetNote') }),
          resetBtn,
        ])
      );

      view.appendChild(settings);
    },
  };
}
