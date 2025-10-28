// import { test, expect, request } from '@playwright/test';

// // URL base de tu API (por defecto localhost:5000 en el docker-compose)
// const apiBaseURL = 'http://localhost:5000';

// // ⚠️ Asegúrate de que la API esté corriendo antes de ejecutar las pruebas ⚠️
// // No es necesario iniciar la app web manualmente. Ya que en playwright.config.ts se configuró el webServer
// // con la baseURL de la app: 'http://localhost:4173', es decir '/' apunta a 'http://localhost:4173'

// test('create quote 4', async ({ page }) => {
//   await page.goto(`/`);

//   // Click the "Create Quote" button.
//   await page.getByRole('button', { name: 'Nueva frase' }).click();

//   // Fill in the quote form.
//   // await page.getByLabel('Frase').fill('The only limit to our realization of tomorrow is our doubts of today.');
//   await page.getByRole('textbox', { name: 'Frase' }).fill('La poderosa nueva frase de prueba');
  
//   // await page.getByLabel('Personaje').click();
//   // await page.getByRole('button', { name: 'Personaje' }).click();
//   // await page.getByPlaceholder('Selecciona o crea un personaje').click();
//   await page.getByRole('combobox').click();
//   await page.getByRole('option', { name: 'Marie Curie' }).click();
  
//   await page.getByLabel('Fuente').fill('Speech');
//   await page.getByLabel('Etiquetas').fill('science');

//   // Submit the form.
//   await page.getByRole('button', { name: 'Añadir' }).click();

//   // Verify that the new quote appears in the list.
//   await expect(page.getByText('Frase añadida exitosamente')).toBeVisible();
//   await page.getByRole('button', { name: 'Ver' }).click();
//   await expect(page.getByText('La poderosa nueva frase de prueba')).toBeVisible();
//   const quoteId = page.url().split('/').pop();

//   const apiContext = await request.newContext({
//     baseURL: apiBaseURL,
//     extraHTTPHeaders: {
//       'Content-Type': 'application/json',
//     },
//   });
//   await apiContext.delete(`/quotes/delete/${quoteId}`);

// });

