/**
 * Unity in diversity (C9): India has many languages, 22 of them listed in the Constitution, and no
 * one language for all. People who speak different languages still share a great deal: in mid-January
 * many states celebrate the same harvest and the Sun's turn north, each with its own festival.
 */

import type { MainLanguage } from './states';

export type HarvestFestival = 'pongal' | 'lohri' | 'bihu' | 'uttarayan';

/** The Eighth Schedule of the Constitution lists this many languages. */
export const SCHEDULED_LANGUAGES = 22;
/** The festivals below all fall in the middle of this month. */
export const FESTIVAL_MONTH = 1;

export const FESTIVALS: readonly HarvestFestival[] = ['pongal', 'lohri', 'bihu', 'uttarayan'];
/** Each festival with the state (a `states` region id) best known for it. */
export const FESTIVAL_REGION: Record<HarvestFestival, string> = {
  pongal: 'tn',
  lohri: 'punjab',
  bihu: 'assam',
  uttarayan: 'gujarat',
};

export interface Greeting {
  language: MainLanguage;
  /** Written in the language's own script. */
  text: string;
  /** BCP 47 tag, so the greeting is read out in its own language. */
  tag: string;
}

export const GREETINGS: readonly Greeting[] = [
  { language: 'hindi', text: 'नमस्ते', tag: 'hi' },
  { language: 'tamil', text: 'வணக்கம்', tag: 'ta' },
  { language: 'bengali', text: 'নমস্কার', tag: 'bn' },
  { language: 'punjabi', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', tag: 'pa' },
  { language: 'telugu', text: 'నమస్కారం', tag: 'te' },
];

export function isFestivalOf(festival: HarvestFestival, region: string): boolean {
  return FESTIVAL_REGION[festival] === region;
}

export function isGreetingIn(greeting: MainLanguage, language: string): boolean {
  return greeting === language;
}
