// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test('login flow complet', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.click('text=Se connecter');
  await page.fill('input[name="identifier"]', 'swan-lake');
  await page.fill('input[name="password"]', 'password1234');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(`${BASE_URL}/home`);
  const token = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).toBeTruthy();
});