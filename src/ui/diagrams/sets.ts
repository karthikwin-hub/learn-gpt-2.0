/**
 * Bodha diagram generators for Sets knots S2 and S3 (Two-ring Venn diagrams).
 */

import { t } from '../../domain/i18n/core';
import { figCircle, figPath, figRect, figSvg, figText } from './fig';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const LEAF = 'var(--leaf)';

/**
 * Renders two overlapping Venn rings with attribute blocks and optional region labels.
 */
export function renderS2Rings(step: number, labels: boolean): SVGSVGElement {
  const s = figSvg(360, 200, `${t('rule.yellow')}, ${t('rule.circle')}`);

  // Ring A (indigo) and Ring B (teal)
  s.appendChild(
    figCircle(140, 100, 74, {
      fill: 'var(--indigo-soft)',
      stroke: IND,
      sw: 2.5,
    })
  );
  s.appendChild(
    figCircle(220, 100, 74, {
      fill: 'var(--teal-soft)',
      stroke: TEAL,
      sw: 2.5,
    })
  );

  // Labels for Ring A and Ring B
  s.appendChild(figText(96, 18, `A: ${t('rule.yellow')}`, { color: IND }));
  s.appendChild(figText(266, 18, `B: ${t('rule.circle')}`, { color: TEAL }));

  // Central intersection block: Yellow circle
  s.appendChild(
    figCircle(180, 100, 11, {
      fill: '#E2B93B',
      stroke: 'var(--ink)',
      sw: 1,
    })
  );

  if (labels) {
    s.appendChild(figText(180, 130, t('sets.wAnd'), { size: 12, color: LEAF }));
    s.appendChild(
      figText(40, 186, t('sets.wNot'), {
        size: 12,
        color: 'var(--ink-soft)',
        anchor: 'start',
      })
    );
  }

  // Step 1: Green circle in B only
  if (step >= 1) {
    s.appendChild(
      figCircle(250, 90, 11, {
        fill: '#4E8A3E',
        stroke: 'var(--ink)',
        sw: 1,
      })
    );
  }

  // Step 2: Yellow square in A only
  if (step >= 2) {
    s.appendChild(
      figRect(98, 82, 22, 22, {
        fill: '#E2B93B',
        stroke: 'var(--ink)',
        sw: 1,
        rx: 1,
      })
    );
  }

  // Step 3: Black triangle outside both (in U \ (A ∪ B))
  if (step >= 3) {
    s.appendChild(
      figPath('M320 178 L 334 154 L 348 178 Z', {
        fill: 'var(--ink)',
        stroke: 'var(--ink)',
        sw: 1,
      })
    );
  }

  return s;
}
