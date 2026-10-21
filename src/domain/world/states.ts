/**
 * States of India (C1): 28 states and 8 union territories, each with a capital, a main language and the
 * states and union territories it shares a land border with. A capital is where the government works;
 * it is chosen, so it need not be the biggest city. `tile` places each one on a schematic grid that is
 * not to scale and is not a political outline.
 */

export type RegionKind = 'state' | 'ut';

/** Main language of a region; null where many languages are spoken and none is spoken by most. */
export type MainLanguage =
  | 'assamese'
  | 'bengali'
  | 'gujarati'
  | 'hindi'
  | 'kannada'
  | 'konkani'
  | 'malayalam'
  | 'manipuri'
  | 'marathi'
  | 'mizo'
  | 'nepali'
  | 'odia'
  | 'punjabi'
  | 'tamil'
  | 'telugu';

export interface Region {
  id: string;
  kind: RegionKind;
  language: MainLanguage | null;
  /** Column and row on the schematic grid. */
  tile: readonly [number, number];
  neighbours: readonly string[];
}

export const REGIONS: readonly Region[] = [
  { id: 'chandigarh', kind: 'ut', language: null, tile: [0, 0], neighbours: ['punjab', 'haryana'] },
  { id: 'jk', kind: 'ut', language: null, tile: [1, 0], neighbours: ['ladakh', 'hp', 'punjab'] },
  { id: 'ladakh', kind: 'ut', language: null, tile: [2, 0], neighbours: ['jk', 'hp'] },
  {
    id: 'punjab',
    kind: 'state',
    language: 'punjabi',
    tile: [0, 1],
    neighbours: ['jk', 'hp', 'haryana', 'rajasthan', 'chandigarh'],
  },
  {
    id: 'hp',
    kind: 'state',
    language: 'hindi',
    tile: [1, 1],
    neighbours: ['jk', 'ladakh', 'punjab', 'haryana', 'uk'],
  },
  { id: 'uk', kind: 'state', language: 'hindi', tile: [2, 1], neighbours: ['hp', 'up'] },
  {
    id: 'arunachal',
    kind: 'state',
    language: null,
    tile: [7, 1],
    neighbours: ['assam', 'nagaland'],
  },
  {
    id: 'rajasthan',
    kind: 'state',
    language: 'hindi',
    tile: [0, 2],
    neighbours: ['punjab', 'haryana', 'up', 'mp', 'gujarat'],
  },
  {
    id: 'haryana',
    kind: 'state',
    language: 'hindi',
    tile: [1, 2],
    neighbours: ['punjab', 'chandigarh', 'hp', 'rajasthan', 'up', 'delhi'],
  },
  { id: 'delhi', kind: 'ut', language: 'hindi', tile: [2, 2], neighbours: ['haryana', 'up'] },
  {
    id: 'up',
    kind: 'state',
    language: 'hindi',
    tile: [3, 2],
    neighbours: ['uk', 'haryana', 'delhi', 'rajasthan', 'mp', 'cg', 'jharkhand', 'bihar'],
  },
  {
    id: 'bihar',
    kind: 'state',
    language: 'hindi',
    tile: [4, 2],
    neighbours: ['up', 'jharkhand', 'wb'],
  },
  { id: 'sikkim', kind: 'state', language: 'nepali', tile: [5, 2], neighbours: ['wb'] },
  {
    id: 'assam',
    kind: 'state',
    language: 'assamese',
    tile: [6, 2],
    neighbours: ['wb', 'arunachal', 'nagaland', 'manipur', 'mizoram', 'tripura', 'meghalaya'],
  },
  {
    id: 'nagaland',
    kind: 'state',
    language: null,
    tile: [7, 2],
    neighbours: ['assam', 'arunachal', 'manipur'],
  },
  {
    id: 'gujarat',
    kind: 'state',
    language: 'gujarati',
    tile: [0, 3],
    neighbours: ['rajasthan', 'mp', 'maharashtra', 'dnhdd'],
  },
  {
    id: 'mp',
    kind: 'state',
    language: 'hindi',
    tile: [1, 3],
    neighbours: ['rajasthan', 'up', 'cg', 'maharashtra', 'gujarat'],
  },
  {
    id: 'cg',
    kind: 'state',
    language: 'hindi',
    tile: [2, 3],
    neighbours: ['mp', 'up', 'jharkhand', 'odisha', 'telangana', 'ap', 'maharashtra'],
  },
  {
    id: 'jharkhand',
    kind: 'state',
    language: 'hindi',
    tile: [3, 3],
    neighbours: ['bihar', 'up', 'cg', 'odisha', 'wb'],
  },
  {
    id: 'wb',
    kind: 'state',
    language: 'bengali',
    tile: [4, 3],
    neighbours: ['sikkim', 'assam', 'bihar', 'jharkhand', 'odisha'],
  },
  { id: 'meghalaya', kind: 'state', language: null, tile: [5, 3], neighbours: ['assam'] },
  {
    id: 'manipur',
    kind: 'state',
    language: 'manipuri',
    tile: [6, 3],
    neighbours: ['nagaland', 'assam', 'mizoram'],
  },
  {
    id: 'dnhdd',
    kind: 'ut',
    language: 'gujarati',
    tile: [0, 4],
    neighbours: ['gujarat', 'maharashtra'],
  },
  {
    id: 'maharashtra',
    kind: 'state',
    language: 'marathi',
    tile: [1, 4],
    neighbours: ['gujarat', 'dnhdd', 'mp', 'cg', 'telangana', 'karnataka', 'goa'],
  },
  {
    id: 'telangana',
    kind: 'state',
    language: 'telugu',
    tile: [2, 4],
    neighbours: ['maharashtra', 'cg', 'ap', 'karnataka'],
  },
  {
    id: 'odisha',
    kind: 'state',
    language: 'odia',
    tile: [3, 4],
    neighbours: ['wb', 'jharkhand', 'cg', 'ap'],
  },
  {
    id: 'tripura',
    kind: 'state',
    language: 'bengali',
    tile: [5, 4],
    neighbours: ['assam', 'mizoram'],
  },
  {
    id: 'mizoram',
    kind: 'state',
    language: 'mizo',
    tile: [6, 4],
    neighbours: ['assam', 'manipur', 'tripura'],
  },
  {
    id: 'goa',
    kind: 'state',
    language: 'konkani',
    tile: [0, 5],
    neighbours: ['maharashtra', 'karnataka'],
  },
  {
    id: 'karnataka',
    kind: 'state',
    language: 'kannada',
    tile: [1, 5],
    neighbours: ['goa', 'maharashtra', 'telangana', 'ap', 'tn', 'kerala'],
  },
  {
    id: 'ap',
    kind: 'state',
    language: 'telugu',
    tile: [2, 5],
    neighbours: ['telangana', 'cg', 'odisha', 'karnataka', 'tn', 'puducherry'],
  },
  { id: 'lakshadweep', kind: 'ut', language: 'malayalam', tile: [0, 6], neighbours: [] },
  {
    id: 'kerala',
    kind: 'state',
    language: 'malayalam',
    tile: [1, 6],
    neighbours: ['karnataka', 'tn', 'puducherry'],
  },
  {
    id: 'tn',
    kind: 'state',
    language: 'tamil',
    tile: [2, 6],
    neighbours: ['kerala', 'karnataka', 'ap', 'puducherry'],
  },
  {
    id: 'puducherry',
    kind: 'ut',
    language: 'tamil',
    tile: [3, 6],
    neighbours: ['tn', 'ap', 'kerala'],
  },
  { id: 'andaman', kind: 'ut', language: null, tile: [6, 6], neighbours: [] },
];

export const STATE_COUNT = 28;
export const UT_COUNT = 8;
export const GRID_COLUMNS = 8;
export const GRID_ROWS = 7;

const BY_ID = new Map(REGIONS.map((r) => [r.id, r]));

export function regionOf(id: string): Region {
  const r = BY_ID.get(id);
  if (!r) throw new Error(`Unknown state or union territory: ${id}`);
  return r;
}

export function isNeighbour(a: string, b: string): boolean {
  return regionOf(a).neighbours.includes(b);
}

/** Islands in the sea touch no state. */
export function hasNeighbours(id: string): boolean {
  return regionOf(id).neighbours.length > 0;
}

/**
 * Regions that look close on the grid but share no border with `id`, nearest first: the wrong choices
 * offered beside the real neighbours.
 */
export function nearButNotTouching(id: string, count: number): string[] {
  const home = regionOf(id);
  const far = (r: Region) => Math.hypot(r.tile[0] - home.tile[0], r.tile[1] - home.tile[1]);
  return REGIONS.filter((r) => r.id !== id && !home.neighbours.includes(r.id))
    .sort((a, b) => far(a) - far(b) || a.tile[1] - b.tile[1] || a.tile[0] - b.tile[0])
    .slice(0, count)
    .map((r) => r.id);
}

/** The region picked to show how a capital need not be the biggest city. */
export const BIGGEST_CITY_EXAMPLE = 'gujarat';

/** The region the lesson walks through, and the bench's choice until the child picks one. */
export const EXAMPLE_REGION = 'telangana';
