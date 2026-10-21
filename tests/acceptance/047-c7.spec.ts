import { test, expect } from '@playwright/test';

test.describe('047 US13 C7 The peninsular plateau (#plateau)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/plateau');
    await expect(page.locator('.screen-title')).toContainText('Rivers of the Deccan');
  });

  const sea = (page: import('@playwright/test').Page, river: string, name: string) =>
    page
      .getByRole('group', { name: `Which sea does the ${river} reach?` })
      .getByRole('button', { name, exact: true })
      .click();

  async function toSeas(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Pour the rain' }).click();
    await page.getByRole('button', { name: 'Choose the seas' }).click();
  }

  test('US13-AS1: "Pour the rain" shows water running east', async ({ page }) => {
    await page.getByRole('button', { name: 'Pour the rain' }).click();
    await expect(page.locator('.say')).toContainText('The rain ran east');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      /The Godavari flows east to the Bay of Bengal\./
    );
  });

  test('US13-AS2: the Arabian Sea for an east-flowing river gets the reason; three right is done', async ({
    page,
  }) => {
    await toSeas(page);
    await sea(page, 'Godavari', 'Arabian Sea');
    await expect(page.locator('.say')).toContainText('the plateau slopes down to the east');
    await sea(page, 'Godavari', 'Bay of Bengal');
    await expect(page.locator('.say')).toContainText('The Godavari reaches the Bay of Bengal.');
    await sea(page, 'Krishna', 'Bay of Bengal');
    await sea(page, 'Kaveri', 'Bay of Bengal');
    await expect(page.locator('.say')).toContainText('all three start near the west coast');
  });

  test('US13-AS3: both west-flowing rivers right completes the bench', async ({ page }) => {
    await toSeas(page);
    for (const r of ['Godavari', 'Krishna', 'Kaveri']) await sea(page, r, 'Bay of Bengal');
    await sea(page, 'Narmada', 'Bay of Bengal');
    await expect(page.locator('.say')).toContainText('rift valley');
    await sea(page, 'Narmada', 'Arabian Sea');
    await sea(page, 'Tapi', 'Arabian Sea');
    await expect(page.locator('.say')).toContainText('Rivers follow the slope');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      /The Tapi flows west to the Arabian Sea\./
    );
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
