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
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!')
    .click();

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await expect(page.locator('.toast')).toHaveText(message);
  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 });

});

test('não deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('joao tadeu');
  await page.getByPlaceholder('Seu email principal').fill('joaotadeu@.com');
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!')
    .click();

  await expect(page.locator('.alert')).toHaveText('Email incorreto')

});

test('campos incorretos', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('joao tadeu');
  await page.getByPlaceholder('Seu email principal').fill('joaotadeu@.com');
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!')
    .click();

  await expect(page.locator('.alert')).toHaveText('Email incorreto')

});

test('não deve preencher quando nenhum campo é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('joao tadeu');
  await page.getByPlaceholder('Seu email principal').fill('joaotadeu@.com');
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!')
    .click();

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});