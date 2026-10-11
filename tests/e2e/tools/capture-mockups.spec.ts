import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';
import { capturePrototypeMockup } from './capture-mockups';

test.describe('Task 0.7: Prototype Mockup Capture Tool', () => {
  test('captures prototype #home in en and ta', async () => {
    const outDir = path.resolve(process.cwd(), 'specs/mockups-proto');
    const enFile = await capturePrototypeMockup({ route: 'home', lang: 'en', outputDir: outDir });
    const taFile = await capturePrototypeMockup({ route: 'home', lang: 'ta', outputDir: outDir });

    expect(fs.existsSync(enFile)).toBe(true);
    expect(fs.existsSync(taFile)).toBe(true);
    expect(fs.statSync(enFile).size).toBeGreaterThan(1000);
    expect(fs.statSync(taFile).size).toBeGreaterThan(1000);
  });
});
