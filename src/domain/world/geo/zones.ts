/**
 * Teaching zones on the map of India, drawn by hand and approximate: they are drawn loosely and
 * clipped to the Survey of India outline, so they never change a boundary. Points are [lat, lon].
 */

export type ZoneId = 'himalaya' | 'plains' | 'thar' | 'deccan' | 'ghats';

export interface Zone {
  /** Dictionary key of the zone's name. */
  name: string;
  /** Where the name is written. */
  label: readonly [number, number];
  outline: readonly (readonly [number, number])[];
}

const HIMALAYA_FOOT: readonly (readonly [number, number])[] = [
  [32.6, 74.8],
  [31.3, 76.4],
  [30.4, 77.8],
  [29.9, 78.6],
  [29.0, 80.2],
  [26.9, 88.2],
  [26.8, 89.8],
  [26.9, 92.0],
  [27.3, 93.8],
  [27.9, 95.4],
];

export const ZONES: Readonly<Record<ZoneId, Zone>> = {
  himalaya: {
    name: 'map.z.himalaya',
    label: [33.6, 77.0],
    outline: [...HIMALAYA_FOOT, [29.5, 97.5], [37.5, 97.5], [37.5, 72.5], [33.2, 73.4]],
  },
  plains: {
    name: 'map.z.plains',
    label: [26.6, 81.0],
    outline: [
      ...HIMALAYA_FOOT,
      [27.2, 95.7],
      [26.2, 94.0],
      [25.9, 92.5],
      [26.0, 90.5],
      [25.2, 89.8],
      [22.5, 88.9],
      [21.6, 88.2],
      [22.0, 87.6],
      [23.5, 86.8],
      [24.6, 86.0],
      [24.8, 84.0],
      [25.0, 82.5],
      [24.9, 80.5],
      [25.7, 78.5],
      [26.5, 77.0],
      [28.0, 76.0],
      [29.2, 74.2],
      [30.5, 73.3],
    ],
  },
  thar: {
    name: 'map.z.thar',
    label: [25.4, 71.0],
    outline: [
      [30.5, 73.3],
      [29.2, 74.2],
      [28.0, 75.2],
      [26.8, 74.8],
      [25.7, 73.6],
      [24.9, 72.3],
      [24.5, 71.0],
      [24.6, 68.5],
      [28.5, 69.0],
      [30.5, 71.5],
    ],
  },
  deccan: {
    name: 'map.z.deccan',
    label: [17.0, 77.4],
    outline: [
      [22.3, 73.6],
      [22.9, 76.0],
      [23.2, 80.0],
      [23.4, 82.5],
      [22.7, 84.0],
      [21.3, 84.2],
      [19.8, 83.3],
      [18.2, 81.9],
      [16.8, 80.0],
      [14.5, 79.0],
      [12.5, 78.8],
      [10.5, 78.2],
      [8.6, 77.6],
      [8.5, 77.3],
      [10.0, 76.9],
      [12.5, 75.6],
      [15.5, 74.4],
      [18.0, 73.8],
      [20.5, 73.7],
    ],
  },
  ghats: {
    name: 'map.z.ghats',
    label: [14.2, 74.9],
    outline: [
      [21.0, 73.5],
      [18.0, 73.4],
      [15.5, 73.9],
      [12.5, 75.1],
      [10.0, 76.5],
      [8.3, 77.1],
      [8.3, 77.5],
      [10.0, 77.2],
      [12.5, 75.9],
      [15.5, 74.7],
      [18.0, 74.1],
      [21.0, 74.2],
    ],
  },
};
