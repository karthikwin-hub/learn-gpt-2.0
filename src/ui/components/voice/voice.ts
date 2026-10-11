/**
 * Narration and functional audio controller for Gurukul.
 * Provides Web Speech API synthesis with caption parity, rate control, and synthesized Web Audio tones.
 */

import { getLang } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';

export type ToneKind = 'tick' | 'low' | 'high' | 'tock';

export interface VoiceSayOptions {
  noCaption?: boolean;
  captionMs?: number;
  onend?: () => void;
}

const SPEECH_LANG: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
};

class VoiceController {
  private _enabled: boolean;
  private _captions: boolean;
  private _voiceRate: number;
  private captionTimer: ReturnType<typeof setTimeout> | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    this._enabled = storage.get<boolean>('sound', true);
    this._captions = storage.get<boolean>('captions', true);
    this._voiceRate = storage.get<number>('voiceRate', 0.92);
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public get captions(): boolean {
    return this._captions;
  }

  public get voiceRate(): number {
    return this._voiceRate;
  }

  public setEnabled(on: boolean): void {
    this._enabled = on;
    storage.set('sound', on);
    if (!on) {
      this.stopSpeech();
    }
  }

  public setCaptions(on: boolean): void {
    this._captions = on;
    storage.set('captions', on);
    if (!on) {
      this.hideCaption();
    }
  }

  public setVoiceRate(rate: number): void {
    this._voiceRate = rate;
    storage.set('voiceRate', rate);
  }

  public say(text: string, opts?: VoiceSayOptions): void {
    const options = opts || {};
    this.stopSpeech();

    if (!options.noCaption && (this._captions || !this._enabled)) {
      this.showCaption(text, options.captionMs);
    }

    if (!this._enabled) {
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance(text);
        const curLang = getLang();
        const targetLang = SPEECH_LANG[curLang] || 'en-IN';
        u.lang = targetLang;
        u.rate = this._voiceRate;

        if (window.speechSynthesis.getVoices) {
          const voices = window.speechSynthesis.getVoices();
          const match = voices.find(
            (v) => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(curLang)
          );
          if (match) {
            u.voice = match;
          }
        }

        if (options.onend) {
          u.onend = options.onend;
        }

        window.speechSynthesis.speak(u);
      } catch (err) {
        console.warn('Speech synthesis unavailable:', err);
      }
    }
  }

  public stopSpeech(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Safe fallback
      }
    }
  }

  public showCaption(text: string, ms?: number): void {
    if (typeof document === 'undefined') return;
    const node = document.getElementById('caption');
    if (!node) return;

    node.textContent = text;
    node.hidden = false;

    if (this.captionTimer) {
      clearTimeout(this.captionTimer);
    }
    const duration = ms || Math.max(3500, text.length * 75);
    this.captionTimer = setTimeout(() => {
      this.hideCaption();
    }, duration);
  }

  public hideCaption(): void {
    if (this.captionTimer) {
      clearTimeout(this.captionTimer);
      this.captionTimer = null;
    }
    if (typeof document !== 'undefined') {
      const node = document.getElementById('caption');
      if (node) {
        node.hidden = true;
      }
    }
  }

  public stop(): void {
    this.stopSpeech();
    this.hideCaption();
  }

  public tone(kind: ToneKind): void {
    if (!this._enabled || typeof window === 'undefined') return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    try {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        void this.audioCtx.resume();
      }

      const spec = {
        tick: { f: 1200, d: 0.03, g: 0.04, type: 'sine' as OscillatorType },
        low: {
          f: 110,
          d: 0.22,
          g: 0.35,
          type: 'sine' as OscillatorType,
          drop: 55,
        },
        high: {
          f: 330,
          d: 0.16,
          g: 0.22,
          type: 'triangle' as OscillatorType,
          drop: 220,
        },
        tock: {
          f: 520,
          d: 0.08,
          g: 0.12,
          type: 'sine' as OscillatorType,
          drop: 300,
        },
      }[kind];

      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = spec.type;
      osc.frequency.setValueAtTime(spec.f, t);
      if ('drop' in spec && spec.drop) {
        osc.frequency.exponentialRampToValueAtTime(spec.drop, t + spec.d);
      }

      gain.gain.setValueAtTime(spec.g, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + spec.d);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + spec.d + 0.02);
    } catch (err) {
      console.warn('Audio tone error:', err);
    }
  }
}

export const voice = new VoiceController();
