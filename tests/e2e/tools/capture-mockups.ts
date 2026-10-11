import { chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

export interface CaptureOptions {
  route: string;
  lang: 'en' | 'hi' | 'te' | 'bn' | 'ta';
  outputDir: string;
  width?: number;
  height?: number;
}

export async function capturePrototypeMockup(options: CaptureOptions): Promise<string> {
  const { route, lang, outputDir, width = 390, height = 844 } = options;
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
  });
  const page = await context.newPage();

  const prototypePath = path.resolve(process.cwd(), 'design/prototype/index.html');
  const fileUrl = `file://${prototypePath}#/${route}`;

  // Set initial language in localStorage before load
  await page.addInitScript((l) => {
    localStorage.setItem('sutra-proto:lang', l);
  }, lang);

  await page.goto(fileUrl);
  await page.waitForLoadState('networkidle');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const cleanRoute = route.replace(/[/?&=]/g, '_');
  const filename = `${cleanRoute}-${lang}-${width}x${height}.png`;
  const outputPath = path.join(outputDir, filename);

  const phone = page.locator('#phone');
  if (await phone.isVisible()) {
    await phone.screenshot({ path: outputPath });
  } else {
    await page.screenshot({ path: outputPath });
  }

  await browser.close();
  return outputPath;
}

// Allow standalone execution: npx tsx or node
if (process.argv[1]?.endsWith('capture-mockups.ts')) {
  (async () => {
    const outDir = path.resolve(process.cwd(), 'specs/mockups-proto');
    console.log('Capturing prototype #home in en and ta...');
    await capturePrototypeMockup({ route: 'home', lang: 'en', outputDir: outDir });
    await capturePrototypeMockup({ route: 'home', lang: 'ta', outputDir: outDir });
    console.log(`Saved screenshots to ${outDir}`);
  })();
}
