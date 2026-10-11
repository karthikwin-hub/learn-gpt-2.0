import { test, expect } from '@playwright/test';
import path from 'node:path';
import {
  checkNoHorizontalOverflow,
  checkNoRawKeysOrPlaceholders,
  checkAccessibility,
} from './helpers';

const prototypeFileUrl = `file://${path.resolve(process.cwd(), 'design/prototype/index.html')}`;
const languages = ['en', 'hi', 'te', 'bn', 'ta'] as const;

test.describe('Task 0.8: Prototype Sweep Sanity Check', () => {
  for (const lang of languages) {
    test(`verifies prototype #home in ${lang}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.addInitScript((l) => {
        localStorage.setItem('sutra-proto:lang', l);
      }, lang);

      await page.goto(`${prototypeFileUrl}#/home`);
      await page.waitForLoadState('networkidle');

      expect(consoleErrors, `Console errors found: ${consoleErrors.join('; ')}`).toHaveLength(0);
      await checkNoHorizontalOverflow(page);
      await checkNoRawKeysOrPlaceholders(page);
      await checkAccessibility(page);
    });
  }
});
