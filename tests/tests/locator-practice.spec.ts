import { test, expect } from '@playwright/test';

test.describe('Playwright Locator Practice', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');

    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
      page.getByText('Products')
    ).toBeVisible();
  });


  test('Practice count and first locator', async ({ page }) => {

    const addToCartButtons = page.getByRole('button', {
      name: 'Add to cart'
    });

    console.log(
      'Number of Add to Cart buttons:',
      await addToCartButtons.count()
    );

    await addToCartButtons.first().click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');
  });


  test('Practice last locator', async ({ page }) => {

    const addToCartButtons = page.getByRole('button', {
      name: 'Add to cart'
    });

    await addToCartButtons.last().click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');
  });


  test('Practice nth locator', async ({ page }) => {

    const addToCartButtons = page.getByRole('button', {
      name: 'Add to cart'
    });

    await addToCartButtons.nth(1).click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');
  });

});