/**
 * Aggregated multilingual dictionary tables for Gurukul.
 * Merges core, gurukul, bodha, ganita, vijnana, and loka dictionaries per language.
 */

import { dictionary as enCore } from './en';
import { dictionary as enGurukul } from './en-gurukul';
import { dictionary as enBodha } from './en-bodha';
import { dictionary as enGanita } from './en-ganita';
import { dictionary as enVijnana } from './en-vijnana';
import { dictionary as enLoka } from './en-loka';

import { dictionary as hiCore } from './hi';
import { dictionary as hiGurukul } from './hi-gurukul';
import { dictionary as hiBodha } from './hi-bodha';
import { dictionary as hiGanita } from './hi-ganita';
import { dictionary as hiVijnana } from './hi-vijnana';
import { dictionary as hiLoka } from './hi-loka';

import { dictionary as teCore } from './te';
import { dictionary as teGurukul } from './te-gurukul';
import { dictionary as teBodha } from './te-bodha';
import { dictionary as teGanita } from './te-ganita';
import { dictionary as teVijnana } from './te-vijnana';
import { dictionary as teLoka } from './te-loka';

import { dictionary as bnCore } from './bn';
import { dictionary as bnGurukul } from './bn-gurukul';
import { dictionary as bnBodha } from './bn-bodha';
import { dictionary as bnGanita } from './bn-ganita';
import { dictionary as bnVijnana } from './bn-vijnana';
import { dictionary as bnLoka } from './bn-loka';

import { dictionary as taCore } from './ta';
import { dictionary as taGurukul } from './ta-gurukul';
import { dictionary as taBodha } from './ta-bodha';
import { dictionary as taGanita } from './ta-ganita';
import { dictionary as taVijnana } from './ta-vijnana';
import { dictionary as taLoka } from './ta-loka';

export type LanguageCode = 'en' | 'hi' | 'te' | 'bn' | 'ta';

export const enDict: Record<string, string> = {
  ...enCore,
  ...enGurukul,
  ...enBodha,
  ...enGanita,
  ...enVijnana,
  ...enLoka,
};

export const hiDict: Record<string, string> = {
  ...hiCore,
  ...hiGurukul,
  ...hiBodha,
  ...hiGanita,
  ...hiVijnana,
  ...hiLoka,
};

export const teDict: Record<string, string> = {
  ...teCore,
  ...teGurukul,
  ...teBodha,
  ...teGanita,
  ...teVijnana,
  ...teLoka,
};

export const bnDict: Record<string, string> = {
  ...bnCore,
  ...bnGurukul,
  ...bnBodha,
  ...bnGanita,
  ...bnVijnana,
  ...bnLoka,
};

export const taDict: Record<string, string> = {
  ...taCore,
  ...taGurukul,
  ...taBodha,
  ...taGanita,
  ...taVijnana,
  ...taLoka,
};

export const DICTIONARIES: Record<LanguageCode, Record<string, string>> = {
  en: enDict,
  hi: hiDict,
  te: teDict,
  bn: bnDict,
  ta: taDict,
};
