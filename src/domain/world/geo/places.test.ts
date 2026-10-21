import { describe, expect, it } from 'vitest';
import { STATE_PATHS, project } from './india-map';
import { PLACES } from './places';
import { insideRings, ringsOf } from './shape';
import { ZONES } from './zones';

const india = Object.values(STATE_PATHS).flatMap(ringsOf);

describe('places and zones on the map of India (048)', () => {
  it('puts every place inside its own region', () => {
    for (const [id, p] of Object.entries(PLACES))
      expect(insideRings(project(p.lat, p.lon), ringsOf(STATE_PATHS[p.region] ?? '')), id).toBe(
        true
      );
  });

  it('writes every zone name inside India and inside its own zone', () => {
    for (const [id, z] of Object.entries(ZONES)) {
      const at = project(...z.label);
      expect(insideRings(at, india), id).toBe(true);
      expect(insideRings(at, [z.outline.map(([lat, lon]) => project(lat, lon))]), id).toBe(true);
    }
  });
});
