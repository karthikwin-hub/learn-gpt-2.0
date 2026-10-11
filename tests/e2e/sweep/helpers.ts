import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export interface SweepViolationReport {
  overflow?: boolean;
  rawKeys?: string[];
  placeholders?: string[];
  consoleErrors?: string[];
}

export async function checkNoHorizontalOverflow(page: Page): Promise<void> {
  const isOverflowing = await page.evaluate(() => {
    const docEl = document.scrollingElement || document.documentElement;
    return docEl.scrollWidth > window.innerWidth;
  });
  expect(isOverflowing, 'Document has horizontal overflow').toBe(false);
}

export async function checkNoRawKeysOrPlaceholders(page: Page): Promise<void> {
  const textContent = await page.evaluate(() => {
    const view = document.querySelector('#view') || document.body;
    return view.textContent || '';
  });

  // Regex matches raw untranslated dotted keys like 'bodha.M2.idea' or 'prashna.N1.q'
  const rawKeyMatches = textContent.match(/\b[a-z]{2,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g) || [];
  expect(rawKeyMatches, `Found untranslated raw keys: ${rawKeyMatches.join(', ')}`).toHaveLength(0);

  // Regex matches unfilled placeholders like '{name}'
  const placeholderMatches = textContent.match(/\{[a-zA-Z0-9_-]+\}/g) || [];
  expect(
    placeholderMatches,
    `Found unfilled placeholders: ${placeholderMatches.join(', ')}`
  ).toHaveLength(0);

  // Unclosed or raw glossary tokens '[['
  expect(textContent.includes('[['), 'Found raw unparsed glossary syntax "[["').toBe(false);
}

export async function checkAccessibility(page: Page): Promise<void> {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    // Skip reviewer panel elements in prototype if present
    .exclude('.reviewer')
    .analyze();

  const seriousOrCritical = accessibilityScanResults.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );

  expect(
    seriousOrCritical,
    `Found ${seriousOrCritical.length} serious/critical accessibility violations: ${JSON.stringify(
      seriousOrCritical.map((v) => ({ id: v.id, help: v.help, nodes: v.nodes.length })),
      null,
      2
    )}`
  ).toHaveLength(0);
}
