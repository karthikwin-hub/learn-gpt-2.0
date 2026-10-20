/**
 * Aggregated multilingual dictionary tables for Gurukul.
 * Merges core, gurukul, bodha, ganita, vijnana, loka, the per-group Ganita (g-*) and per-thread Loka (l-*)
 * dictionaries per language.
 */

import { dictionary as enCore } from './en';
import { dictionary as enGurukul } from './en-gurukul';
import { dictionary as enBodha } from './en-bodha';
import { dictionary as enGanita } from './en-ganita';
import { dictionary as enVijnana } from './en-vijnana';
import { dictionary as enLoka } from './en-loka';
import { dictionary as enGNumber } from './en-g-number';
import { dictionary as enGFactors } from './en-g-factors';
import { dictionary as enGGeometry } from './en-g-geometry';
import { dictionary as enGMeasure } from './en-g-measure';
import { dictionary as enGLogic } from './en-g-logic';
import { dictionary as enGPorted } from './en-g-ported';
import { dictionary as enLItihasa } from './en-l-itihasa';
import { dictionary as enLNagarika } from './en-l-nagarika';
import { dictionary as enLBhugola } from './en-l-bhugola';
import { dictionary as enLBharata } from './en-l-bharata';

import { dictionary as hiCore } from './hi';
import { dictionary as hiGurukul } from './hi-gurukul';
import { dictionary as hiBodha } from './hi-bodha';
import { dictionary as hiGanita } from './hi-ganita';
import { dictionary as hiVijnana } from './hi-vijnana';
import { dictionary as hiLoka } from './hi-loka';
import { dictionary as hiGNumber } from './hi-g-number';
import { dictionary as hiGFactors } from './hi-g-factors';
import { dictionary as hiGGeometry } from './hi-g-geometry';
import { dictionary as hiGMeasure } from './hi-g-measure';
import { dictionary as hiGLogic } from './hi-g-logic';
import { dictionary as hiGPorted } from './hi-g-ported';
import { dictionary as hiLItihasa } from './hi-l-itihasa';
import { dictionary as hiLNagarika } from './hi-l-nagarika';
import { dictionary as hiLBhugola } from './hi-l-bhugola';
import { dictionary as hiLBharata } from './hi-l-bharata';

import { dictionary as teCore } from './te';
import { dictionary as teGurukul } from './te-gurukul';
import { dictionary as teBodha } from './te-bodha';
import { dictionary as teGanita } from './te-ganita';
import { dictionary as teVijnana } from './te-vijnana';
import { dictionary as teLoka } from './te-loka';
import { dictionary as teGNumber } from './te-g-number';
import { dictionary as teGFactors } from './te-g-factors';
import { dictionary as teGGeometry } from './te-g-geometry';
import { dictionary as teGMeasure } from './te-g-measure';
import { dictionary as teGLogic } from './te-g-logic';
import { dictionary as teGPorted } from './te-g-ported';
import { dictionary as teLItihasa } from './te-l-itihasa';
import { dictionary as teLNagarika } from './te-l-nagarika';
import { dictionary as teLBhugola } from './te-l-bhugola';
import { dictionary as teLBharata } from './te-l-bharata';

import { dictionary as bnCore } from './bn';
import { dictionary as bnGurukul } from './bn-gurukul';
import { dictionary as bnBodha } from './bn-bodha';
import { dictionary as bnGanita } from './bn-ganita';
import { dictionary as bnVijnana } from './bn-vijnana';
import { dictionary as bnLoka } from './bn-loka';
import { dictionary as bnGNumber } from './bn-g-number';
import { dictionary as bnGFactors } from './bn-g-factors';
import { dictionary as bnGGeometry } from './bn-g-geometry';
import { dictionary as bnGMeasure } from './bn-g-measure';
import { dictionary as bnGLogic } from './bn-g-logic';
import { dictionary as bnGPorted } from './bn-g-ported';
import { dictionary as bnLItihasa } from './bn-l-itihasa';
import { dictionary as bnLNagarika } from './bn-l-nagarika';
import { dictionary as bnLBhugola } from './bn-l-bhugola';
import { dictionary as bnLBharata } from './bn-l-bharata';

import { dictionary as taCore } from './ta';
import { dictionary as taGurukul } from './ta-gurukul';
import { dictionary as taBodha } from './ta-bodha';
import { dictionary as taGanita } from './ta-ganita';
import { dictionary as taVijnana } from './ta-vijnana';
import { dictionary as taLoka } from './ta-loka';
import { dictionary as taGNumber } from './ta-g-number';
import { dictionary as taGFactors } from './ta-g-factors';
import { dictionary as taGGeometry } from './ta-g-geometry';
import { dictionary as taGMeasure } from './ta-g-measure';
import { dictionary as taGLogic } from './ta-g-logic';
import { dictionary as taGPorted } from './ta-g-ported';
import { dictionary as taLItihasa } from './ta-l-itihasa';
import { dictionary as taLNagarika } from './ta-l-nagarika';
import { dictionary as taLBhugola } from './ta-l-bhugola';
import { dictionary as taLBharata } from './ta-l-bharata';

export type LanguageCode = 'en' | 'hi' | 'te' | 'bn' | 'ta';

export const enDict: Record<string, string> = {
  ...enCore,
  ...enGurukul,
  ...enBodha,
  ...enGanita,
  ...enVijnana,
  ...enLoka,
  ...enGNumber,
  ...enGFactors,
  ...enGGeometry,
  ...enGMeasure,
  ...enGLogic,
  ...enGPorted,
  ...enLItihasa,
  ...enLNagarika,
  ...enLBhugola,
  ...enLBharata,
};

export const hiDict: Record<string, string> = {
  ...hiCore,
  ...hiGurukul,
  ...hiBodha,
  ...hiGanita,
  ...hiVijnana,
  ...hiLoka,
  ...hiGNumber,
  ...hiGFactors,
  ...hiGGeometry,
  ...hiGMeasure,
  ...hiGLogic,
  ...hiGPorted,
  ...hiLItihasa,
  ...hiLNagarika,
  ...hiLBhugola,
  ...hiLBharata,
};

export const teDict: Record<string, string> = {
  ...teCore,
  ...teGurukul,
  ...teBodha,
  ...teGanita,
  ...teVijnana,
  ...teLoka,
  ...teGNumber,
  ...teGFactors,
  ...teGGeometry,
  ...teGMeasure,
  ...teGLogic,
  ...teGPorted,
  ...teLItihasa,
  ...teLNagarika,
  ...teLBhugola,
  ...teLBharata,
};

export const bnDict: Record<string, string> = {
  ...bnCore,
  ...bnGurukul,
  ...bnBodha,
  ...bnGanita,
  ...bnVijnana,
  ...bnLoka,
  ...bnGNumber,
  ...bnGFactors,
  ...bnGGeometry,
  ...bnGMeasure,
  ...bnGLogic,
  ...bnGPorted,
  ...bnLItihasa,
  ...bnLNagarika,
  ...bnLBhugola,
  ...bnLBharata,
};

export const taDict: Record<string, string> = {
  ...taCore,
  ...taGurukul,
  ...taBodha,
  ...taGanita,
  ...taVijnana,
  ...taLoka,
  ...taGNumber,
  ...taGFactors,
  ...taGGeometry,
  ...taGMeasure,
  ...taGLogic,
  ...taGPorted,
  ...taLItihasa,
  ...taLNagarika,
  ...taLBhugola,
  ...taLBharata,
};

export const DICTIONARIES: Record<LanguageCode, Record<string, string>> = {
  en: enDict,
  hi: hiDict,
  te: teDict,
  bn: bnDict,
  ta: taDict,
};
