import { test, expect, request } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('create quote', async ({ page }) => {
  const apiBaseURL = 'http://localhost:5000'; // URL base de tu API Flask
  await page.goto('http://localhost:5173/');

  // Click the "Create Quote" button.
  await page.getByRole('button', { name: 'Nueva frase' }).click();

  // Fill in the quote form.
  // await page.getByLabel('Frase').fill('The only limit to our realization of tomorrow is our doubts of today.');
  await page.getByRole('textbox', { name: 'Frase' }).fill('La poderosa nueva frase de prueba');
  
  // await page.getByLabel('Personaje').click();
  // await page.getByRole('button', { name: 'Personaje' }).click();
  // await page.getByPlaceholder('Selecciona o crea un personaje').click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Marie Curie' }).click();
  
  await page.getByLabel('Fuente').fill('Speech');
  await page.getByLabel('Etiquetas').fill('science');

  // Submit the form.
  await page.getByRole('button', { name: 'Añadir' }).click();

  // Verify that the new quote appears in the list.
  await expect(page.getByText('Frase añadida exitosamente')).toBeVisible();
  await page.getByRole('button', { name: 'Ver' }).click();
  await expect(page.getByText('La poderosa nueva frase de prueba')).toBeVisible();
  const quoteId = page.url().split('/').pop();

  const apiContext = await request.newContext({
    baseURL: apiBaseURL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
  await apiContext.delete(`/quotes/delete/${quoteId}`);

});

