import { describe, it, expect } from 'vitest';
import {
  to24Hour,
  to12Hour,
  addMinutes,
  calculateDuration,
  formatTime24,
  formatTime12,
} from './timeclock';

describe('timeclock domain logic (24-Hour Time & Duration)', () => {
  it('formats 24-hour and 12-hour times cleanly', () => {
    expect(formatTime24(9, 5)).toBe('09:05');
    expect(formatTime24(21, 30)).toBe('21:30');
    expect(formatTime24(0, 0)).toBe('00:00');
    expect(formatTime12(9, 30, true)).toBe('9:30 PM');
    expect(formatTime12(12, 0, false)).toBe('12:00 AM');
    expect(formatTime12(12, 0, true)).toBe('12:00 PM');
  });

  it('converts 12-hour to 24-hour time accurately', () => {
    // 9:30 PM -> 21:30
    const t1 = to24Hour(9, 30, true);
    expect(t1.hours24).toBe(21);
    expect(t1.minutes).toBe(30);
    expect(t1.formatted).toBe('21:30');

    // 9:30 AM -> 09:30
    const t2 = to24Hour(9, 30, false);
    expect(t2.hours24).toBe(9);
    expect(t2.formatted).toBe('09:30');

    // 12:00 AM -> 00:00 (Midnight)
    const t3 = to24Hour(12, 0, false);
    expect(t3.hours24).toBe(0);
    expect(t3.formatted).toBe('00:00');

    // 12:45 PM -> 12:45 (Noon)
    const t4 = to24Hour(12, 45, true);
    expect(t4.hours24).toBe(12);
    expect(t4.formatted).toBe('12:45');

    // 8:00 PM -> 20:00
    const t5 = to24Hour(8, 0, true);
    expect(t5.hours24).toBe(20);
    expect(t5.formatted).toBe('20:00');
  });

  it('converts 24-hour to 12-hour time accurately', () => {
    // 21:30 -> 9:30 PM (Railway time ticket)
    const t1 = to12Hour(21, 30);
    expect(t1.hours12).toBe(9);
    expect(t1.minutes).toBe(30);
    expect(t1.isPm).toBe(true);
    expect(t1.formatted).toBe('9:30 PM');

    // 00:00 -> 12:00 AM
    const t2 = to12Hour(0, 0);
    expect(t2.hours12).toBe(12);
    expect(t2.isPm).toBe(false);
    expect(t2.formatted).toBe('12:00 AM');

    // 12:30 -> 12:30 PM
    const t3 = to12Hour(12, 30);
    expect(t3.hours12).toBe(12);
    expect(t3.isPm).toBe(true);
    expect(t3.formatted).toBe('12:30 PM');

    // 08:15 -> 8:15 AM
    const t4 = to12Hour(8, 15);
    expect(t4.hours12).toBe(8);
    expect(t4.isPm).toBe(false);
    expect(t4.formatted).toBe('8:15 AM');
  });

  it('rolls minutes in base 60 when adding time (avoids Rohan decimal trap)', () => {
    // Rohan trap: 14:50 + 25 min -> rolls at 60 to 15:15, NOT 14:75!
    const res = addMinutes(14, 50, 25);
    expect(res.hours24).toBe(15);
    expect(res.minutes).toBe(15);
    expect(res.formatted).toBe('15:15');

    // Adding 60 min advances 1 full hour
    const res2 = addMinutes(10, 15, 60);
    expect(res2.hours24).toBe(11);
    expect(res2.minutes).toBe(15);

    // Crossing midnight
    const res3 = addMinutes(23, 45, 30);
    expect(res3.hours24).toBe(0);
    expect(res3.minutes).toBe(15);
    expect(res3.formatted).toBe('00:15');
  });

  it('calculates duration using hour-bridging hops (09:45 to 12:15)', () => {
    const dur = calculateDuration(9, 45, 12, 15);
    expect(dur.hours).toBe(2);
    expect(dur.minutes).toBe(30);
    expect(dur.totalMinutes).toBe(150);
    expect(dur.formatted).toBe('2 hr 30 min');

    expect(dur.hops).toHaveLength(3);
    // Hop 1: bridge to 10:00 (15 min)
    expect(dur.hops[0]?.from).toBe('09:45');
    expect(dur.hops[0]?.to).toBe('10:00');
    expect(dur.hops[0]?.minutes).toBe(15);

    // Hop 2: leap to 12:00 (120 min)
    expect(dur.hops[1]?.from).toBe('10:00');
    expect(dur.hops[1]?.to).toBe('12:00');
    expect(dur.hops[1]?.minutes).toBe(120);

    // Hop 3: add 15 min to reach 12:15
    expect(dur.hops[2]?.from).toBe('12:00');
    expect(dur.hops[2]?.to).toBe('12:15');
    expect(dur.hops[2]?.minutes).toBe(15);
  });
});
