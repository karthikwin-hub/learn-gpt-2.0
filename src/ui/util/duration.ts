import { t } from '../../domain/i18n/core';

export function durationText(hours: number, minutes: number): string {
  if (hours > 0 && minutes > 0) return t('timeclock.dur.hm', { h: hours, m: minutes });
  if (hours > 0) return t('timeclock.dur.h', { h: hours });
  return t('timeclock.dur.m', { m: minutes });
}
