/**
 * Orthographic Perspective Views Domain Logic (Top, Front, Side Projections & Jaal E4 ↔ G8).
 *
 * Core invariant:
 * - A 3D object composed of unit voxel blocks (x, y, z):
 *   - Top view (Bird's eye / Plan): projects along vertical Z axis onto XY ground plane.
 *     Collapses vertical drops — vertical steps become flat adjacent squares.
 *   - Front view (Elevation): projects along depth Y axis onto XZ plane.
 *     Shows width and height, but obscures depth.
 *   - Side view (Profile): projects along width X axis onto YZ plane.
 *     Shows depth and height, but obscures lateral width.
 */

export interface BlockCoord {
  x: number; // width index: 0 <= x < sizeX
  y: number; // depth index: 0 <= y < sizeY
  z: number; // height index: 0 <= z < sizeZ
}

export interface OrthographicViews {
  top: boolean[][]; // [y][x]
  front: boolean[][]; // [z][x]
  side: boolean[][]; // [z][y]
  topHeightMap: number[][]; // max z+1 at [y][x]
}

export interface StructurePreset {
  id: string;
  name: string;
  description: string;
  blocks: BlockCoord[];
}

/**
 * Projects a 3D block collection onto 2D Top, Front, and Side orthographic grids.
 */
export function projectOrthographicViews(
  blocks: readonly BlockCoord[],
  sizeX = 3,
  sizeY = 3,
  sizeZ = 3
): OrthographicViews {
  // Initialize grids
  const top: boolean[][] = Array.from({ length: sizeY }, () => Array(sizeX).fill(false));
  const front: boolean[][] = Array.from({ length: sizeZ }, () => Array(sizeX).fill(false));
  const side: boolean[][] = Array.from({ length: sizeZ }, () => Array(sizeY).fill(false));
  const topHeightMap: number[][] = Array.from({ length: sizeY }, () => Array(sizeX).fill(0));

  for (const b of blocks) {
    if (b.x >= 0 && b.x < sizeX && b.y >= 0 && b.y < sizeY && b.z >= 0 && b.z < sizeZ) {
      const topRow = top[b.y];
      const heightRow = topHeightMap[b.y];
      if (topRow && heightRow) {
        topRow[b.x] = true;
        const currentH = heightRow[b.x] ?? 0;
        if (b.z + 1 > currentH) {
          heightRow[b.x] = b.z + 1;
        }
      }

      const frontRow = front[b.z];
      if (frontRow) {
        frontRow[b.x] = true;
      }

      const sideRow = side[b.z];
      if (sideRow) {
        sideRow[b.y] = true;
      }
    }
  }

  return { top, front, side, topHeightMap };
}

/**
 * Generates only the 2D top view grid.
 */
export function generateTopView(blocks: readonly BlockCoord[], sizeX = 3, sizeY = 3): boolean[][] {
  const views = projectOrthographicViews(blocks, sizeX, sizeY, 10);
  return views.top;
}

/**
 * Generates only the 2D front view grid.
 */
export function generateFrontView(
  blocks: readonly BlockCoord[],
  sizeX = 3,
  sizeZ = 3
): boolean[][] {
  const views = projectOrthographicViews(blocks, sizeX, 10, sizeZ);
  return views.front;
}

/**
 * Generates only the 2D side view grid.
 */
export function generateSideView(blocks: readonly BlockCoord[], sizeY = 3, sizeZ = 3): boolean[][] {
  const views = projectOrthographicViews(blocks, 10, sizeY, sizeZ);
  return views.side;
}

/**
 * Counts total active blocks.
 */
export function countBlocks(blocks: readonly BlockCoord[]): number {
  return blocks.length;
}

/**
 * Presets for classic orthographic reasoning.
 */
export const STRUCTURE_PRESETS: readonly StructurePreset[] = [
  {
    id: 'staircase',
    name: 'Staircase',
    description: 'Ascending 3-step block staircase along the X axis',
    blocks: [
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 2, y: 1, z: 0 },
      { x: 2, y: 1, z: 1 },
      { x: 2, y: 1, z: 2 },
    ],
  },
  {
    id: 'tower',
    name: 'Tower',
    description: 'Vertical 3-block pillar',
    blocks: [
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 1, z: 2 },
    ],
  },
  {
    id: 'l_shape',
    name: 'L-Corner',
    description: 'Ground corner wall forming an L-shape',
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 2, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
    ],
  },
  {
    id: 'bridge',
    name: 'Bridge Arch',
    description: 'Archway with two side pillars and a top lintel span',
    blocks: [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 1, z: 1 },
      { x: 2, y: 1, z: 0 },
      { x: 2, y: 1, z: 1 },
      { x: 1, y: 1, z: 1 },
    ],
  },
] as const;
