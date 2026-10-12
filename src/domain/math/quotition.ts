/**
 * Domain logic for Knot D2: Quotition / Division as Repeated Subtraction
 *
 * Models division not merely as partitive sharing (dealing onto plates),
 * but as quotitive grouping (repeatedly removing equal packages until zero/remainder).
 */

export interface SubtractionHop {
  step: number;
  from: number;
  subtracted: number;
  remaining: number;
}

export interface QuotitionResult {
  total: number;
  groupSize: number;
  quotient: number;
  remainder: number;
  hops: SubtractionHop[];
  equation: string;
}

export interface DualityComparison {
  total: number;
  param: number;
  sharing: {
    platesCount: number;
    itemsPerPlate: number;
    description: string;
  };
  grouping: {
    boxCapacity: number;
    boxesCount: number;
    description: string;
  };
}

/**
 * Computes step-by-step backward subtraction hops on the number line.
 * e.g., 20 - 4 = 16, 16 - 4 = 12, 12 - 4 = 8, 8 - 4 = 4, 4 - 4 = 0.
 */
export function repeatedSubtractionSteps(total: number, groupSize: number): SubtractionHop[] {
  if (groupSize <= 0) {
    throw new Error('Group size must be greater than zero');
  }
  if (total < 0) {
    throw new Error('Total must be non-negative');
  }

  const hops: SubtractionHop[] = [];
  let current = total;
  let step = 1;

  while (current >= groupSize) {
    const next = current - groupSize;
    hops.push({
      step,
      from: current,
      subtracted: groupSize,
      remaining: next,
    });
    current = next;
    step++;
  }

  return hops;
}

/**
 * Computes full quotition division result including quotient, remainder, and hops.
 */
export function quotitionDivide(total: number, groupSize: number): QuotitionResult {
  const hops = repeatedSubtractionSteps(total, groupSize);
  const quotient = hops.length;
  const lastHop = hops[hops.length - 1];
  const remainder = lastHop !== undefined ? lastHop.remaining : total;

  const equation =
    remainder > 0
      ? `${total} ÷ ${groupSize} = ${quotient} R ${remainder}`
      : `${total} ÷ ${groupSize} = ${quotient}`;

  return {
    total,
    groupSize,
    quotient,
    remainder,
    hops,
    equation,
  };
}

/**
 * Models the conceptual duality between sharing (partitive) and grouping (quotitive).
 * For 20 and param 4:
 * - Sharing: 20 shared across 4 plates = 5 per plate.
 * - Grouping: 20 grouped into boxes of 4 = 5 boxes formed.
 */
export function compareSharingVsGrouping(total: number, param: number): DualityComparison {
  if (param <= 0 || total % param !== 0) {
    throw new Error('Param must divide total evenly for direct duality comparison');
  }

  const complement = total / param;

  return {
    total,
    param,
    sharing: {
      platesCount: param,
      itemsPerPlate: complement,
      description: `${total} sweets shared onto ${param} plates = ${complement} each`,
    },
    grouping: {
      boxCapacity: param,
      boxesCount: complement,
      description: `${total} sweets packed in boxes of ${param} = ${complement} boxes`,
    },
  };
}
