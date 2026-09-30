import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login Tests', () => {


  // ==========================================
  // VALID LOGIN
  // ==========================================

  test('Valid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);

    await expect(
      page.getByText('Products')
    ).toBeVisible();

  });


  // ==========================================
  // INVALID LOGIN
  // ==========================================

  test('Invalid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'wrong_password'
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });


  // ==========================================
  // INVALID USERNAME
  // ==========================================

  test('Invalid Username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'wrong_user',
      'secret_sauce'
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });


  // ==========================================
  // EMPTY USERNAME
  // ==========================================

  test('Empty Username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.enterPassword('secret_sauce');

    await loginPage.clickLogin();

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });


  // ==========================================
  // INDIVIDUAL ACTIONS
  // ==========================================

  test('Login Using Individual Methods', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.enterUsername('standard_user');

    await loginPage.enterPassword('secret_sauce');

    await loginPage.clickLogin();

    await expect(page).toHaveURL(/inventory/);

  });


  // ==========================================
  // CLEAR USERNAME
  // ==========================================

  test('Clear Username Field', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.enterUsername('standard_user');

    await loginPage.clearUsername();

    await expect(
      loginPage.usernameInput
    ).toHaveValue('');

  });


  // ==========================================
  // CHECK PAGE TITLE
  // ==========================================

  test('Verify Page Title', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const title = await loginPage.getTitle();

    console.log('Page Title:', title);

    expect(title).toBe('Swag Labs');

  });


  // ==========================================
  // CHECK CURRENT URL
  // ==========================================

  test('Verify Login URL', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const url = await loginPage.getURL();

    expect(url).toContain('saucedemo.com');

  });


  // ==========================================
  // CHECK ERROR USING METHOD
  // ==========================================

  test('Verify Error Using Page Method', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'wrong_password'
    );

    const errorVisible =
      await loginPage.isErrorVisible();

    expect(errorVisible).toBe(true);

  });


  // ==========================================
  // LOGIN USING ENTER
  // ==========================================

  test('Login Using Enter Key', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.enterUsername('standard_user');

    await loginPage.enterPassword('secret_sauce');

    await loginPage.pressEnterOnPassword();

    await expect(page).toHaveURL(/inventory/);

  });

});