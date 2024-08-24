// @ts-check
const { test, expect } = require('@playwright/test');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('joao tadeu');
  await page.getByPlaceholder('Seu email principal').fill('joaotadeu@outlook.com');

});