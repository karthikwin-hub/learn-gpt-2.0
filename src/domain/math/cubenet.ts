/**
 * Pure domain model for Knot G5: Fold a Box (Cube Nets & Spatial Visualization).
 * Validates whether a hexomino (6 connected squares) folds into a closed 3D cube
 * using spatial rolling simulation, detects face collisions/overlaps,
 * and identifies opposite face pairs.
 */

export interface GridSquare {
  x: number;
  y: number;
}

export type CubeFace = 'BOTTOM' | 'TOP' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export interface CubeNetAnalysis {
  valid: boolean;
  connected: boolean;
  count: number;
  overlaps: number[]; // indices of squares that collide on the same face
  faceAssignments: Record<number, CubeFace>;
}

interface DieOrientation {
  top: CubeFace;
  bottom: CubeFace;
  north: CubeFace;
  south: CubeFace;
  east: CubeFace;
  west: CubeFace;
}

function initialDie(): DieOrientation {
  return {
    top: 'TOP',
    bottom: 'BOTTOM',
    north: 'NORTH',
    south: 'SOUTH',
    east: 'EAST',
    west: 'WEST',
  };
}

function rollDie(d: DieOrientation, dx: number, dy: number): DieOrientation {
  if (dx === 1) {
    // Roll East
    return {
      top: d.west,
      bottom: d.east,
      east: d.top,
      west: d.bottom,
      north: d.north,
      south: d.south,
    };
  }
  if (dx === -1) {
    // Roll West
    return {
      top: d.east,
      bottom: d.west,
      west: d.top,
      east: d.bottom,
      north: d.north,
      south: d.south,
    };
  }
  if (dy === 1) {
    // Roll South (+y in grid coordinates)
    return {
      top: d.north,
      bottom: d.south,
      south: d.top,
      north: d.bottom,
      east: d.east,
      west: d.west,
    };
  }
  if (dy === -1) {
    // Roll North (-y in grid coordinates)
    return {
      top: d.south,
      bottom: d.north,
      north: d.top,
      south: d.bottom,
      east: d.east,
      west: d.west,
    };
  }
  return { ...d };
}

/**
 * Checks if squares are connected edge-to-edge as a single hexomino component.
 */
function isConnected(squares: GridSquare[]): boolean {
  if (squares.length === 0) return false;
  const visited = new Set<number>();
  const queue: number[] = [0];
  visited.add(0);

  while (queue.length > 0) {
    const currIdx = queue.shift()!;
    const curr = squares[currIdx]!;

    squares.forEach((sq, nextIdx) => {
      if (!visited.has(nextIdx)) {
        const dist = Math.abs(curr.x - sq.x) + Math.abs(curr.y - sq.y);
        if (dist === 1) {
          visited.add(nextIdx);
          queue.push(nextIdx);
        }
      }
    });
  }

  return visited.size === squares.length;
}

/**
 * Simulates folding 2D squares into 3D space using rolling traversal to detect collisions and validity.
 */
export function detectFaceCollisions(squares: GridSquare[]): CubeNetAnalysis {
  if (squares.length !== 6) {
    return {
      valid: false,
      connected: isConnected(squares),
      count: squares.length,
      overlaps: [],
      faceAssignments: {},
    };
  }

  const connected = isConnected(squares);
  if (!connected) {
    return {
      valid: false,
      connected: false,
      count: 6,
      overlaps: [],
      faceAssignments: {},
    };
  }

  const dieMap: Record<number, DieOrientation> = {};
  const faceMap: Record<number, CubeFace> = {};
  const visited = new Set<number>();

  dieMap[0] = initialDie();
  faceMap[0] = dieMap[0].bottom;
  visited.add(0);

  const queue: number[] = [0];

  while (queue.length > 0) {
    const uIdx = queue.shift()!;
    const uSq = squares[uIdx]!;
    const uDie = dieMap[uIdx]!;

    squares.forEach((vSq, vIdx) => {
      if (!visited.has(vIdx)) {
        const dx = vSq.x - uSq.x;
        const dy = vSq.y - uSq.y;

        if (Math.abs(dx) + Math.abs(dy) === 1) {
          const vDie = rollDie(uDie, dx, dy);
          dieMap[vIdx] = vDie;
          faceMap[vIdx] = vDie.bottom;
          visited.add(vIdx);
          queue.push(vIdx);
        }
      }
    });
  }

  // Count face occurrences
  const faceOccurrences: Record<CubeFace, number[]> = {
    BOTTOM: [],
    TOP: [],
    NORTH: [],
    SOUTH: [],
    EAST: [],
    WEST: [],
  };

  squares.forEach((_, idx) => {
    const f = faceMap[idx];
    if (f) {
      faceOccurrences[f].push(idx);
    }
  });

  const overlaps: number[] = [];
  let distinctFaceCount = 0;

  (Object.keys(faceOccurrences) as CubeFace[]).forEach((f) => {
    const list = faceOccurrences[f];
    if (list.length > 0) distinctFaceCount++;
    if (list.length > 1) {
      overlaps.push(...list);
    }
  });

  const valid = distinctFaceCount === 6 && overlaps.length === 0;

  return {
    valid,
    connected: true,
    count: 6,
    overlaps,
    faceAssignments: faceMap,
  };
}

/**
 * Validates a 2D binary grid matrix where 1 represents a selected square.
 */
export function isValidCubeNet(matrix: number[][]): boolean {
  const squares: GridSquare[] = [];
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    if (row) {
      for (let c = 0; c < row.length; c++) {
        if (row[c] === 1) {
          squares.push({ x: c, y: r });
        }
      }
    }
  }
  return detectFaceCollisions(squares).valid;
}

/**
 * Returns opposite face pairs for known canonical cube net IDs.
 */
export function getOppositeFacePairs(_netId?: string): Array<[string, string]> {
  return [
    ['BOTTOM', 'TOP'],
    ['NORTH', 'SOUTH'],
    ['EAST', 'WEST'],
  ];
}
