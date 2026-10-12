/**
 * The Gurukul curriculum model (docs/product/CURRICULUM_PHASE2.md):
 * Shalas -> threads (sutras) -> knots (concepts).
 * 3 Shalas, 18 threads, 74 knots, 10 Jaal crossings.
 */

export interface KnotRoute {
  route: string;
  params?: Record<string, string>;
}

export interface Knot {
  id: string;
  prashna?: boolean;
  bench?: KnotRoute;
  start?: KnotRoute;
  afterBodha?: KnotRoute;
}

export interface Thread {
  id: string;
  crossing?: string;
  knots: Knot[];
}

export type SectionId = 'ganita' | 'vijnana' | 'loka';

export interface Section {
  id: SectionId;
  threads: Thread[];
}

export interface JaalLink {
  id: string;
  a: string;
  b: string;
}

export interface KnotLocation {
  knot: Knot;
  thread: Thread;
  section: Section;
}

export interface JaalCrossing {
  link: JaalLink;
  other: string;
  otherSection: SectionId;
}

function k(id: string, extra?: Partial<Knot>): Knot {
  return { id, ...extra };
}

function bench(route: string, params?: Record<string, string>): KnotRoute {
  return params ? { route, params } : { route };
}

export const SECTIONS: Section[] = [
  {
    id: 'ganita',
    threads: [
      {
        id: 'sankhya',
        knots: [
          k('N1', { prashna: true, bench: bench('place') }),
          k('N2', { prashna: true, bench: bench('roman') }),
          k('N3', { prashna: true, bench: bench('fractions') }),
          k('N4', { prashna: true, bench: bench('collection') }),
          k('N5', { prashna: true, bench: bench('decimals') }),
        ],
      },
      {
        id: 'ganana',
        crossing: 'cross.divide',
        knots: [
          k('A1', { prashna: true, bench: bench('regroup') }),
          k('A2', { prashna: true, bench: bench('estimate') }),
          k('M1', { afterBodha: { route: 'rect', params: { k: 'M1' } } }),
          k('M2', { start: { route: 'wonder' }, afterBodha: { route: 'film' } }),
          k('M3', { afterBodha: { route: 'rect', params: { k: 'M3' } } }),
          k('M4', { bench: bench('rect') }),
          k('D1', { bench: bench('share', { mode: 'share' }) }),
          k('D2', { prashna: true, bench: bench('quotition') }),
          k('D3', { bench: bench('share', { mode: 'leftover' }) }),
          k('D4', { prashna: true, bench: bench('longdiv') }),
          k('A3', { prashna: true, bench: bench('wordprob') }),
        ],
      },
      {
        id: 'guna',
        knots: [
          k('F1', { prashna: true, bench: bench('factors') }),
          k('F2', { prashna: true, bench: bench('primes') }),
          k('F3', { prashna: true, bench: bench('divisibility') }),
          k('M5', { bench: bench('drums') }),
          k('F4', { prashna: true, bench: bench('hcf') }),
        ],
      },
      {
        id: 'rekha',
        crossing: 'cross.shapes',
        knots: [
          k('G1', { prashna: true, bench: bench('angles') }),
          k('G2', { prashna: true, bench: bench('rope') }),
          k('G3', { prashna: true, bench: bench('shear') }),
          k('G4', { prashna: true, bench: bench('kolam') }),
          k('G5', { prashna: true, bench: bench('cubenet') }),
          k('G6', { prashna: true, bench: bench('circle') }),
          k('G7', { prashna: true, bench: bench('tangram') }),
          k('G8', { prashna: true, bench: bench('views') }),
        ],
      },
      {
        id: 'mana',
        knots: [
          k('U1', { prashna: true, bench: bench('money') }),
          k('U2', { prashna: true, bench: bench('metric') }),
          k('U3', { prashna: true, bench: bench('timeclock') }),
        ],
      },
      {
        id: 'ankana',
        knots: [
          k('H1', { prashna: true, bench: bench('pictograph') }),
          k('H2', { prashna: true, bench: bench('bargraph') }),
        ],
      },
      {
        id: 'krama',
        knots: [
          k('L4', { prashna: true, bench: bench('sequences') }),
          k('P1', { prashna: true, bench: bench('growing') }),
        ],
      },
      {
        id: 'tarka',
        crossing: 'cross.logic',
        knots: [
          k('S1', { prashna: true, bench: bench('singleset') }),
          k('S2', { bench: bench('sets', { mode: 'sort' }) }),
          k('S3', { bench: bench('sets', { mode: 'guess' }) }),
          k('L1'),
          k('L2', { bench: bench('logic') }),
          k('L3'),
        ],
      },
    ],
  },
  {
    id: 'vijnana',
    threads: [
      {
        id: 'sharira',
        knots: [k('B1'), k('B2'), k('B3', { prashna: true, bench: bench('digest') }), k('B4')],
      },
      {
        id: 'jiva',
        knots: [k('J1'), k('J2'), k('J3')],
      },
      {
        id: 'padartha',
        knots: [k('X1'), k('X2')],
      },
      {
        id: 'prakasha',
        knots: [k('R1', { prashna: true, bench: bench('shadow') }), k('R2')],
      },
      {
        id: 'mapana',
        knots: [k('Z1')],
      },
      {
        id: 'bala',
        knots: [k('K1'), k('K2', { prashna: true, bench: bench('ramp') })],
      },
    ],
  },
  {
    id: 'loka',
    threads: [
      {
        id: 'itihasa',
        knots: [k('I1'), k('I2', { prashna: true, bench: bench('timeline') })],
      },
      {
        id: 'nagarika',
        knots: [k('Q1'), k('Q2'), k('Q3')],
      },
      {
        id: 'bhugola',
        knots: [
          k('E1', { prashna: true, bench: bench('earth') }),
          k('E2'),
          k('E3'),
          k('E4', { prashna: true, bench: bench('map') }),
        ],
      },
      {
        id: 'bharata',
        knots: [k('C1'), k('C2'), k('C3'), k('C4'), k('C5'), k('C6'), k('C7'), k('C8'), k('C9')],
      },
    ],
  },
];

export const JAAL: JaalLink[] = [
  { id: 'shadowClock', a: 'R1', b: 'E1' },
  { id: 'sundial', a: 'R1', b: 'U3' },
  { id: 'topView', a: 'E4', b: 'G8' },
  { id: 'scale', a: 'E4', b: 'U2' },
  { id: 'yearsLine', a: 'I2', b: 'N1' },
  { id: 'sameUnits', a: 'Z1', b: 'U2' },
  { id: 'foodGraph', a: 'B1', b: 'H2' },
  { id: 'desertPlants', a: 'C6', b: 'J2' },
  { id: 'cleanAir', a: 'Q3', b: 'X1' },
  { id: 'farms', a: 'C2', b: 'J1' },
];

const index: Record<string, KnotLocation> = {};
for (const section of SECTIONS) {
  for (const thread of section.threads) {
    for (const knot of thread.knots) {
      if (index[knot.id]) {
        throw new Error(`Duplicate knot id ${knot.id}`);
      }
      index[knot.id] = { knot, thread, section };
    }
  }
}

export function findKnot(id: string): Knot | null {
  return index[id] ? index[id].knot : null;
}

export function placeOf(id: string): KnotLocation | null {
  return index[id] || null;
}

export function findSection(id: string): Section | null {
  return SECTIONS.find((s) => s.id === id) || null;
}

export function playable(knot: Knot | null | undefined): boolean {
  return !!(knot && (knot.start || knot.bench));
}

export function firstStep(knot: Knot): KnotRoute {
  if (knot.start) return knot.start;
  return {
    route: knot.prashna ? 'prashna' : 'bodha',
    params: { k: knot.id },
  };
}

export function afterBodha(knot: Knot): KnotRoute | undefined {
  return knot.afterBodha || knot.bench;
}

export function knotsIn(sectionId: string): Knot[] {
  const s = findSection(sectionId);
  return s ? s.threads.flatMap((th) => th.knots) : [];
}

export function jaalFor(knotId: string): JaalCrossing[] {
  return JAAL.filter((l) => l.a === knotId || l.b === knotId).map((l) => {
    const other = l.a === knotId ? l.b : l.a;
    const otherLoc = index[other];
    if (!otherLoc) {
      throw new Error(`Unknown JAAL target knot: ${other}`);
    }
    return {
      link: l,
      other,
      otherSection: otherLoc.section.id,
    };
  });
}
