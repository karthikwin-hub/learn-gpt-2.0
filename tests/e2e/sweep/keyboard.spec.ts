import { test, expect } from '@playwright/test';
import { playableLessons, url } from './lesson-routes';

/* A pointer-only control is allowed only when the same bench offers a keyboard way to do the same thing. */
const KEYBOARD_ALTERNATIVE: Record<string, { selector: string; alternative: string }> = {
  G1: { selector: 'circle', alternative: 'input[type="range"]' },
};

for (const { knot, bench } of playableLessons()) {
  // covers: US16-AS3 (047 knots; with the reduced-motion sweep)
  test(`${knot.id}: every bench control can be reached by keyboard (FR-008)`, async ({ page }) => {
    await page.goto(bench);
    await page.locator('#view').waitFor();
    await page.waitForTimeout(150);
    const mouseOnly = await page.evaluate(() => {
      const FOCUS = 'button,input,select,textarea,a[href],[tabindex]:not([tabindex="-1"])';
      const pointer = ['pointer', 'grab', 'move', 'ew-resize', 'ns-resize'];
      return ([...document.querySelectorAll('#view *')] as HTMLElement[])
        .filter((e) => {
          const c = getComputedStyle(e).cursor;
          if (!pointer.includes(c) || e.closest(FOCUS)) return false;
          const parent = e.parentElement;
          return !parent || getComputedStyle(parent).cursor !== c || parent.closest(FOCUS) !== null;
        })
        .map((e) => e.tagName.toLowerCase());
    });
    const allowed = KEYBOARD_ALTERNATIVE[knot.id];
    if (allowed) await expect(page.locator(`#view ${allowed.alternative}`).first()).toBeVisible();
    expect(
      mouseOnly.filter((tag) => !allowed || tag !== allowed.selector),
      `${knot.id}: controls that only a mouse can use`
    ).toEqual([]);
  });
}

test('N4: collection rings toggle with Enter and Space and keep focus (FR-008)', async ({
  page,
}) => {
  await page.goto(url('collection', { k: 'N4', step: '2' }));
  const ring = page.locator('.ring-group[data-ring="0"]');
  await expect(ring).toBeVisible();
  const before = (await ring.getAttribute('aria-pressed')) || '';
  await ring.focus();
  await page.keyboard.press('Enter');
  await expect(ring).not.toHaveAttribute('aria-pressed', before);
  await expect(ring).toBeFocused();
  await page.keyboard.press(' ');
  await expect(ring).toHaveAttribute('aria-pressed', before);
});
