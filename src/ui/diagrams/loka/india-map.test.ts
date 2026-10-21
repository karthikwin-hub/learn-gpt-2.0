import { beforeAll, describe, expect, it } from 'vitest';
import { setLang } from '../../../domain/i18n/core';
import { mapPlaces, renderIndiaInset, renderIndiaMap } from './india-map';

describe('renderIndiaMap (048)', () => {
  beforeAll(() => setLang('en'));

  it('draws all 36 regions, marks the 8 union territories and names its source', () => {
    const s = renderIndiaMap();
    expect(s.getAttribute('aria-label')).toBe('Map of India: 28 states and 8 union territories');
    expect(s.querySelectorAll('[data-region]')).toHaveLength(36);
    expect(s.querySelectorAll('[data-kind="ut"]')).toHaveLength(8);
    expect(s.textContent).toContain('Boundaries: Survey of India');
  });

  it('gives regions too small to see a marker', () => {
    const ids = [...renderIndiaMap().querySelectorAll('[data-marker]')].map((m) =>
      m.getAttribute('data-marker')
    );
    expect(ids.sort()).toEqual([
      'chandigarh',
      'delhi',
      'dnhdd',
      'goa',
      'lakshadweep',
      'puducherry',
    ]);
  });

  it('fills in only the regions shown so far', () => {
    expect(renderIndiaMap({ shown: 0 }).querySelectorAll('[data-region]')).toHaveLength(0);
    expect(renderIndiaMap({ shown: 0 }).getAttribute('aria-label')).toBe(
      'India, before its states appear.'
    );
    expect(renderIndiaMap({ shown: 10 }).querySelectorAll('[data-region]')).toHaveLength(10);
  });

  it('names the chosen and found regions, places and caption in its description', () => {
    const s = renderIndiaMap({
      chosen: 'telangana',
      found: ['karnataka'],
      places: [{ lat: 17.39, lon: 78.49, label: 'Hyderabad' }],
      caption: 'Telangana',
    });
    expect(s.getAttribute('aria-label')).toBe(
      'Map of India: 28 states and 8 union territories, Telangana, Karnataka, Hyderabad, Telangana'
    );
    expect(s.querySelector('[data-region="telangana"]')?.getAttribute('fill')).toBe(
      'var(--kumkum)'
    );
  });

  it('draws the rivers asked for and refuses unknown ones', () => {
    expect(
      renderIndiaMap({ rivers: ['ganga', 'yamuna'] }).querySelectorAll('[data-river]')
    ).toHaveLength(2);
    expect(() => renderIndiaMap({ rivers: ['nile'] })).toThrow(/nile/);
  });

  it('shades zones inside India, names them and says they are approximate', () => {
    const s = renderIndiaMap({ zones: ['thar', 'deccan'] });
    expect(s.querySelectorAll('[data-zone]')).toHaveLength(2);
    expect(s.querySelector('[data-zone]')?.parentElement?.getAttribute('clip-path')).toMatch(
      /india-outline/
    );
    expect(s.getAttribute('aria-label')).toContain('Thar desert, Deccan plateau');
    expect(s.textContent).toContain('Shaded areas are approximate.');
    expect(renderIndiaMap().textContent).not.toContain('approximate');
  });

  it('names places in the current language', () => {
    const s = renderIndiaMap({ places: mapPlaces(['jaisalmer', 'patna']) });
    expect(s.getAttribute('aria-label')).toContain('Jaisalmer, Patna');
    setLang('hi');
    expect(mapPlaces(['jaisalmer'])[0]?.label).toBe('जैसलमेर');
    setLang('en');
  });

  it('draws a small locator map that screen readers skip', () => {
    const g = renderIndiaInset({ zones: ['himalaya'] }, 10, 10, 50);
    expect(g.getAttribute('aria-hidden')).toBe('true');
    expect(g.querySelectorAll('[data-region]')).toHaveLength(0);
    expect(g.querySelectorAll('[data-zone]')).toHaveLength(1);
    expect(g.querySelector('text')).toBeNull();
  });
});
