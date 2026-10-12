/**
 * Tangram Mathematics Domain Logic: Geometric Dissection & Area Conservation.
 *
 * Core invariant:
 * - A standard tangram dissects a square of total area A into 7 pieces:
 *   - 2 Large Triangles (each 1/4 of total area = 4 units)
 *   - 1 Medium Triangle (1/8 of total area = 2 units)
 *   - 2 Small Triangles (each 1/16 of total area = 1 unit)
 *   - 1 Square (1/8 of total area = 2 units)
 *   - 1 Parallelogram (1/8 of total area = 2 units)
 * - Total standard units = 4 + 4 + 2 + 1 + 1 + 2 + 2 = 16 units.
 * - Any valid silhouette formed by all 7 pieces without overlapping preserves
 *   total surface area strictly: Area(Silhouette) = Area(Square).
 */

export type TangramPieceType =
  | 'large_triangle_1'
  | 'large_triangle_2'
  | 'medium_triangle'
  | 'small_triangle_1'
  | 'small_triangle_2'
  | 'square'
  | 'parallelogram';

export interface TangramPieceMeta {
  id: TangramPieceType;
  name: string;
  unitArea: number; // small triangle = 1 unit, total = 16 units
  relativeFraction: number; // fraction of full square (1.0)
}

export const TANGRAM_PIECES: readonly TangramPieceMeta[] = [
  { id: 'large_triangle_1', name: 'Large Triangle A', unitArea: 4, relativeFraction: 0.25 },
  { id: 'large_triangle_2', name: 'Large Triangle B', unitArea: 4, relativeFraction: 0.25 },
  { id: 'medium_triangle', name: 'Medium Triangle', unitArea: 2, relativeFraction: 0.125 },
  { id: 'small_triangle_1', name: 'Small Triangle A', unitArea: 1, relativeFraction: 0.0625 },
  { id: 'small_triangle_2', name: 'Small Triangle B', unitArea: 1, relativeFraction: 0.0625 },
  { id: 'square', name: 'Square', unitArea: 2, relativeFraction: 0.125 },
  { id: 'parallelogram', name: 'Parallelogram', unitArea: 2, relativeFraction: 0.125 },
] as const;

export const ALL_PIECE_IDS: TangramPieceType[] = TANGRAM_PIECES.map((p) => p.id);

export const TOTAL_TANGRAM_UNITS = 16;

/**
 * Returns metadata for a specific tangram piece.
 */
export function getTangramPiece(id: TangramPieceType): TangramPieceMeta | undefined {
  return TANGRAM_PIECES.find((p) => p.id === id);
}

/**
 * Calculates total units for a collection of pieces.
 */
export function totalTangramUnits(pieces: TangramPieceType[] = ALL_PIECE_IDS): number {
  return pieces.reduce((sum, id) => {
    const meta = getTangramPiece(id);
    return sum + (meta ? meta.unitArea : 0);
  }, 0);
}

/**
 * Calculates total scaled area given a base square area (e.g., 100 cm^2).
 */
export function calculateSilhouetteArea(
  pieces: TangramPieceType[] = ALL_PIECE_IDS,
  baseSquareArea = 100
): number {
  const units = totalTangramUnits(pieces);
  return (units / TOTAL_TANGRAM_UNITS) * baseSquareArea;
}

/**
 * Verifies whether two arrangements conserve identical area.
 */
export function isAreaConserved(
  pieceSetA: TangramPieceType[],
  pieceSetB: TangramPieceType[]
): boolean {
  return totalTangramUnits(pieceSetA) === totalTangramUnits(pieceSetB);
}

/**
 * Tests whether two small triangles can compose an equivalent 2-unit shape.
 */
export function canTwoSmallTrianglesCompose(targetPiece: TangramPieceType): boolean {
  const meta = getTangramPiece(targetPiece);
  return meta ? meta.unitArea === 2 : false;
}

export interface TangramSilhouettePreset {
  id: string;
  name: string;
  pieces: TangramPieceType[];
  description: string;
}

export const SILHOUETTES: readonly TangramSilhouettePreset[] = [
  {
    id: 'square',
    name: 'Square',
    pieces: [...ALL_PIECE_IDS],
    description: 'The original 10×10 dissection square (Area = 100)',
  },
  {
    id: 'candle',
    name: 'Candle',
    pieces: [...ALL_PIECE_IDS],
    description: 'Tall vertical flame silhouette (Area = 100)',
  },
  {
    id: 'boat',
    name: 'Boat',
    pieces: [...ALL_PIECE_IDS],
    description: 'Sailing boat across water (Area = 100)',
  },
  {
    id: 'swan',
    name: 'Swan',
    pieces: [...ALL_PIECE_IDS],
    description: 'Graceful swan with tall neck (Area = 100)',
  },
] as const;
