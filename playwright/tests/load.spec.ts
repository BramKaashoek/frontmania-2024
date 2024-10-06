import { expect, test } from '@playwright/test';

test.setTimeout(60000);

test('visit home', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForResponse(
    (response) =>
      response.url().includes('https://api.honeycomb.io/v1/traces') &&
      response.status() === 200
  );

  await page.waitForTimeout(500);
});

test.only('visit fruits', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const fruits = ['banana', 'lemon', 'cherry', 'apple'];
  for (const fruit of fruits) {
    const start = performance.now();
    await page.goto(`http://localhost:3000/${fruit}`);
    const images = await page.locator('//img').all();

    for (const image of images) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).not.toHaveJSProperty('naturalWidth', 0, {
        timeout: 10000,
      });
    }

    await page.waitForResponse(
      (response) =>
        response.url().includes('https://api.honeycomb.io/v1/traces') &&
        response.status() === 200
    );

    await page.waitForTimeout(500);

    const end = performance.now();

    console.log(fruit, Math.round(end - start));
  }
  await context.close();
});
