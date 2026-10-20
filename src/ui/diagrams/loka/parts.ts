/**
 * Small drawing parts shared by the Loka diagrams.
 */

import { svg } from '../../util/dom';
import { figPath, figRect } from '../fig';

/** A village house with a tiled roof; (x, y) is the top-left of the walls. */
export function house(x: number, y: number, s = 1): SVGGElement {
  const g = svg('g') as SVGGElement;
  g.appendChild(
    figRect(x, y, 22 * s, 16 * s, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 1 })
  );
  g.appendChild(
    figPath(`M${x - 3 * s} ${y} L${x + 11 * s} ${y - 11 * s} L${x + 25 * s} ${y} Z`, {
      fill: '#B35C4A',
      stroke: 'var(--ink-soft)',
      sw: 1,
    })
  );
  return g;
}
