import { describe, it, expect } from 'vitest';
import {
  SECTIONS,
  JAAL,
  findKnot,
  placeOf,
  findSection,
  playable,
  firstStep,
  afterBodha,
  knotsIn,
  jaalFor,
} from './index';

describe('src/domain/curriculum', () => {
  it('defines exactly 3 sections', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual(['ganita', 'vijnana', 'loka']);
  });

  it('defines 18 threads total (8 Ganita, 6 Vijnana, 4 Loka)', () => {
    const ganita = findSection('ganita')!;
    const vijnana = findSection('vijnana')!;
    const loka = findSection('loka')!;

    expect(ganita.threads.length).toBe(8);
    expect(vijnana.threads.length).toBe(6);
    expect(loka.threads.length).toBe(4);
    expect(ganita.threads.length + vijnana.threads.length + loka.threads.length).toBe(18);
  });

  it('defines 74 total knots across all threads (42 Ganita, 14 Vijnana, 18 Loka)', () => {
    const ganitaKnots = knotsIn('ganita');
    const vijnanaKnots = knotsIn('vijnana');
    const lokaKnots = knotsIn('loka');

    expect(ganitaKnots.length).toBe(42);
    expect(vijnanaKnots.length).toBe(14);
    expect(lokaKnots.length).toBe(18);
    expect(ganitaKnots.length + vijnanaKnots.length + lokaKnots.length).toBe(74);
  });

  it('identifies exactly 54 playable knots', () => {
    const allKnots = SECTIONS.flatMap((s) => s.threads.flatMap((th) => th.knots));
    const playableKnots = allKnots.filter(playable);
    expect(playableKnots.length).toBe(54);
  });

  it('finds knot by id and determines its location', () => {
    const m2 = findKnot('M2');
    expect(m2).toBeDefined();
    expect(playable(m2)).toBe(true);

    const place = placeOf('M2');
    expect(place).toBeDefined();
    expect(place?.section.id).toBe('ganita');
    expect(place?.thread.id).toBe('ganana');
  });

  it('evaluates firstStep for knots with and without custom start', () => {
    const m2 = findKnot('M2')!;
    expect(firstStep(m2)).toEqual({ route: 'wonder' });

    const n1 = findKnot('N1')!;
    expect(firstStep(n1)).toEqual({ route: 'prashna', params: { k: 'N1' } });

    const m4 = findKnot('M4')!;
    expect(firstStep(m4)).toEqual({ route: 'bodha', params: { k: 'M4' } });

    const s2 = findKnot('S2')!;
    expect(firstStep(s2)).toEqual({ route: 'prashna', params: { k: 'S2' } });

    const s3 = findKnot('S3')!;
    expect(firstStep(s3)).toEqual({ route: 'prashna', params: { k: 'S3' } });

    const l1 = findKnot('L1')!;
    expect(firstStep(l1)).toEqual({ route: 'prashna', params: { k: 'L1' } });
  });

  it('resolves afterBodha route', () => {
    const m2 = findKnot('M2')!;
    expect(afterBodha(m2)).toEqual({ route: 'film' });

    const m4 = findKnot('M4')!;
    expect(afterBodha(m4)).toEqual({ route: 'rect' });
  });

  it('contains 10 valid Jaal links connecting valid knots across subjects', () => {
    expect(JAAL.length).toBe(10);
    for (const link of JAAL) {
      const knotA = findKnot(link.a);
      const knotB = findKnot(link.b);
      expect(knotA, `Link ${link.id} endpoint A ${link.a} exists`).toBeTruthy();
      expect(knotB, `Link ${link.id} endpoint B ${link.b} exists`).toBeTruthy();
    }
  });

  it('returns Jaal crossings for a connected knot', () => {
    const crossingsR1 = jaalFor('R1');
    expect(crossingsR1.length).toBeGreaterThan(0);
    expect(crossingsR1.some((c) => c.other === 'E1')).toBe(true);
  });
});
