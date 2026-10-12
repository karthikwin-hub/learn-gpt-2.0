/**
 * 24-Hour Time & Time Duration Domain Logic.
 *
 * Core invariants:
 * - Time rolls in base 60 for minutes (60 minutes = 1 hour), NOT base 10!
 *   E.g., 14:50 + 25 min rolls at 60 to 15:15 (NOT 14:75).
 * - A 24-hour day runs from 00:00 (midnight) to 23:59.
 *   - Midnight = 00:00 = 12:00 AM
 *   - Noon = 12:00 = 12:00 PM
 *   - PM hours after noon = 12-hour value + 12 (e.g. 9:30 PM = 21:30).
 * - Elapsed duration bridging:
 *   - Step 1: Bridge start time to the next whole hour.
 *   - Step 2: Leap across whole hours.
 *   - Step 3: Add remaining minutes to destination time.
 */

export interface Time24 {
  hours24: number;
  minutes: number;
  formatted: string;
}

export interface Time12 {
  hours12: number;
  minutes: number;
  isPm: boolean;
  formatted: string;
}

export interface BridgeHop {
  from: string;
  to: string;
  minutes: number;
  description: string;
}

export interface DurationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
  formatted: string;
  hops: BridgeHop[];
}

/**
 * Format 24-hour time as HH:MM.
 */
export function formatTime24(hours: number, minutes: number): string {
  const h = Math.floor(Math.max(0, Math.min(23, hours)));
  const m = Math.floor(Math.max(0, Math.min(59, minutes)));
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Format 12-hour time as H:MM AM/PM.
 */
export function formatTime12(hours12: number, minutes: number, isPm: boolean): string {
  const h = Math.max(1, Math.min(12, Math.floor(hours12)));
  const m = Math.floor(Math.max(0, Math.min(59, minutes)));
  const suffix = isPm ? 'PM' : 'AM';
  return `${h}:${m.toString().padStart(2, '0')} ${suffix}`;
}

/**
 * Converts 12-hour clock (with AM/PM) to 24-hour clock.
 */
export function to24Hour(hours12: number, minutes: number, isPm: boolean): Time24 {
  let h12 = Math.floor(hours12) % 12;
  if (h12 === 0) h12 = 0; // 12 AM/PM base
  const m = Math.floor(Math.max(0, Math.min(59, minutes)));
  const h24 = isPm ? h12 + 12 : h12;
  return {
    hours24: h24,
    minutes: m,
    formatted: formatTime24(h24, m),
  };
}

/**
 * Converts 24-hour clock to 12-hour clock (with AM/PM).
 */
export function to12Hour(hours24: number, minutes: number): Time12 {
  const clampedH = Math.floor(Math.max(0, Math.min(23, hours24)));
  const m = Math.floor(Math.max(0, Math.min(59, minutes)));
  const isPm = clampedH >= 12;
  const rem = clampedH % 12;
  const h12 = rem === 0 ? 12 : rem;
  return {
    hours12: h12,
    minutes: m,
    isPm,
    formatted: formatTime12(h12, m, isPm),
  };
}

/**
 * Adds minutes to a 24-hour time, properly rolling in base 60.
 */
export function addMinutes(hours: number, minutes: number, addM: number): Time24 {
  const startMins = ((hours % 24) * 60 + minutes) % (24 * 60);
  const total = (startMins + addM) % (24 * 60);
  const normalized = total < 0 ? total + 24 * 60 : total;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return {
    hours24: h,
    minutes: m,
    formatted: formatTime24(h, m),
  };
}

/**
 * Calculates duration and hour-bridging hops between start and end times.
 */
export function calculateDuration(
  startH: number,
  startM: number,
  endH: number,
  endM: number
): DurationResult {
  const startTotal = (startH % 24) * 60 + (startM % 60);
  let endTotal = (endH % 24) * 60 + (endM % 60);

  // If end time is before start time, assume next day
  if (endTotal < startTotal) {
    endTotal += 24 * 60;
  }

  const diff = endTotal - startTotal;
  const durationH = Math.floor(diff / 60);
  const durationM = diff % 60;

  const hops: BridgeHop[] = [];

  // Hop 1: Bridge to next hour if startM > 0
  const remMinsToHour = (60 - (startM % 60)) % 60;
  let currTime = startTotal;

  if (remMinsToHour > 0 && diff >= remMinsToHour) {
    const nextHourTotal = currTime + remMinsToHour;
    hops.push({
      from: formatTime24(Math.floor(currTime / 60) % 24, currTime % 60),
      to: formatTime24(Math.floor(nextHourTotal / 60) % 24, nextHourTotal % 60),
      minutes: remMinsToHour,
      description: `Bridge ${remMinsToHour} min to next whole hour`,
    });
    currTime = nextHourTotal;
  }

  // Hop 2: Whole hour leap
  const endHourBase = Math.floor(endTotal / 60) * 60;
  if (endHourBase > currTime) {
    const leapMins = endHourBase - currTime;
    hops.push({
      from: formatTime24(Math.floor(currTime / 60) % 24, currTime % 60),
      to: formatTime24(Math.floor(endHourBase / 60) % 24, endHourBase % 60),
      minutes: leapMins,
      description: `Leap ${Math.floor(leapMins / 60)} hour(s) across whole hours`,
    });
    currTime = endHourBase;
  }

  // Hop 3: Remainder minutes to target time
  if (endTotal > currTime) {
    const finalMins = endTotal - currTime;
    hops.push({
      from: formatTime24(Math.floor(currTime / 60) % 24, currTime % 60),
      to: formatTime24(Math.floor(endTotal / 60) % 24, endTotal % 60),
      minutes: finalMins,
      description: `Add remaining ${finalMins} min to reach destination`,
    });
  }

  let formatted = '';
  if (durationH > 0 && durationM > 0) {
    formatted = `${durationH} hr ${durationM} min`;
  } else if (durationH > 0) {
    formatted = `${durationH} hr`;
  } else {
    formatted = `${durationM} min`;
  }

  return {
    hours: durationH,
    minutes: durationM,
    totalMinutes: diff,
    formatted,
    hops,
  };
}
