/**
 * Pictures for the lessons ported from the prototype: Bodha card figures computed from the domain model.
 */

import { renderM2Tiles, renderM4MistakeRooms, renderM4Rooms } from '../diagrams/tiles';
import { renderM5Beats } from '../diagrams/drums';
import { renderFairSharePlates } from '../diagrams/share';
import { renderG2Ropes, renderG4Flower } from '../diagrams/geometry';
import { renderS2Rings } from '../diagrams/sets';
import {
  renderL1Negation,
  renderL2Gate,
  renderL3Quantifiers,
  renderL4Implication,
} from '../diagrams/logic';
import type { CardKey, LessonVisuals, VisualsTable } from './types';

function phaseOneFigure(knotId: string, cardKey: string, step: number): SVGSVGElement | null {
  if (knotId === 'M2') {
    if (cardKey === 'what' || cardKey === 'idea') return renderM2Tiles(6, 4, 4, false);
    if (cardKey === 'why') return renderM2Tiles(6, 4, 4, true);
    if (cardKey === 'example') {
      const filled = step >= 2 ? 3 : step >= 1 ? 1 : 0;
      return renderM2Tiles(5, 3, filled, step >= 2);
    }
  } else if (knotId === 'M4') {
    if (cardKey === 'what' || cardKey === 'idea') return renderM4Rooms(23, 14, 2, '23 × 14');
    if (cardKey === 'why') return renderM4Rooms(23, 14, 3, '23 × 14 = 322');
    if (cardKey === 'example') return renderM4Rooms(17, 12, step, '17 × 12');
  } else if (knotId === 'M5') {
    if (cardKey === 'what' || cardKey === 'idea') return renderM5Beats(3, 4, 12, 2);
    if (cardKey === 'why') return renderM5Beats(3, 4, 12, 3);
    if (cardKey === 'example') return renderM5Beats(4, 6, 24, step);
  } else if (knotId === 'D1') {
    if (cardKey === 'what' || cardKey === 'idea') return renderFairSharePlates(4, 3, 0);
    if (cardKey === 'why') return renderFairSharePlates(4, 3, 0, { eq: '4 × 3 = 12' });
    if (cardKey === 'example') {
      return renderFairSharePlates(5, Math.min(step, 3), 0, {
        eq: step >= 3 ? '5 × 3 = 15' : null,
      });
    }
  } else if (knotId === 'D3') {
    if (cardKey === 'what' || cardKey === 'idea') {
      return renderFairSharePlates(4, 3, 2, { eq: '14 ÷ 4 = 3 r 2' });
    }
    if (cardKey === 'why') {
      return renderFairSharePlates(4, 3, 2, { cutLeft: true, half: true, eq: '3 + ½' });
    }
    if (cardKey === 'example') {
      return renderFairSharePlates(2, step >= 1 ? 3 : 0, step >= 1 && step < 3 ? 1 : 0, {
        cutLeft: step >= 2,
        half: step >= 3,
        eq: step >= 3 ? '7 ÷ 2 = 3½' : null,
      });
    }
  } else if (knotId === 'G2') {
    if (cardKey === 'what' || cardKey === 'idea') {
      return renderG2Ropes(
        [
          [11, 1],
          [6, 6],
        ],
        false
      );
    }
    if (cardKey === 'why') {
      return renderG2Ropes(
        [
          [11, 1],
          [6, 6],
        ],
        true
      );
    }
    if (cardKey === 'example') {
      return renderG2Ropes(
        [
          [8, 2],
          [5, 5],
        ],
        step >= 2
      );
    }
  } else if (knotId === 'G4') {
    if (cardKey === 'what' || cardKey === 'idea') {
      return renderG4Flower(true, true, true);
    }
    if (cardKey === 'why') {
      return renderG4Flower(false, false, true);
    }
    if (cardKey === 'example') {
      return renderG4Flower(false, false, step >= 2);
    }
  } else if (knotId === 'S2' || knotId === 'S3') {
    if (cardKey === 'what' || cardKey === 'idea') {
      return renderS2Rings(0, false);
    }
    if (cardKey === 'why') {
      return renderS2Rings(0, true);
    }
    if (cardKey === 'example') {
      return renderS2Rings(step, false);
    }
  } else if (knotId === 'L1') {
    return renderL1Negation();
  } else if (knotId === 'L2') {
    if (cardKey === 'what' || cardKey === 'idea' || cardKey === 'why') {
      return renderL2Gate(0, 'and');
    }
    if (cardKey === 'example') {
      return renderL2Gate(step, 'and');
    }
  } else if (knotId === 'L3') {
    return renderL3Quantifiers();
  } else if (knotId === 'L4') {
    return renderL4Implication();
  }
  return null;
}

const FIGURE_CARDS: CardKey[] = ['what', 'idea', 'why', 'example'];

function fromPhaseOne(knotId: string): LessonVisuals {
  const cards: LessonVisuals['cards'] = {};
  for (const key of FIGURE_CARDS) {
    cards[key] = (step: number) => phaseOneFigure(knotId, key, step);
  }
  return { cards };
}

const PHASE_ONE: VisualsTable = Object.fromEntries(
  ['M2', 'M4', 'M5', 'D1', 'D3', 'G2', 'G4', 'S2', 'S3', 'L1', 'L2', 'L3', 'L4'].map((k) => [
    k,
    fromPhaseOne(k),
  ])
);

export const PORTED: VisualsTable = {
  ...PHASE_ONE,
  M4: { ...PHASE_ONE.M4, mistake: (reveal) => renderM4MistakeRooms(reveal) },
};
