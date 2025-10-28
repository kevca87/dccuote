import { test, expect, request } from '@playwright/test';

// URL base de tu API (por defecto localhost:5000 en el docker-compose)
const apiBaseURL = 'http://localhost:5000';
// Context para hacer peticiones a la API (para limpieza de datos)
const apiContext = await request.newContext({
  baseURL: apiBaseURL,
  extraHTTPHeaders: {
    'Content-Type': 'application/json',
  },
});

// ⚠️ Asegúrate de que la API esté corriendo antes de ejecutar las pruebas ⚠️
// No es necesario iniciar la app web manualmente. Ya que en playwright.config.ts se configuró el webServer
// con la baseURL de la app: 'http://localhost:4173', es decir '/' apunta a 'http://localhost:4173'

test('crear frase', async ({ page }) => {
  await page.goto(`/`);

  await page.getByRole('button', { name: 'Nueva frase' }).click();

  await page.getByRole('textbox', { name: 'Frase' }).fill('La poderosa nueva frase de prueba');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Marie Curie' }).click();
  await page.getByLabel('Fuente').fill('Speech');
  await page.getByLabel('Etiquetas').fill('science');

  await page.getByRole('button', { name: 'Añadir' }).click();

  await expect(page.getByText('Frase añadida exitosamente')).toBeVisible();
  await page.getByRole('button', { name: 'Ver' }).click();
  await expect(page.getByText('La poderosa nueva frase de prueba')).toBeVisible();

  // Clean up: delete the created quote via API
  const quoteId = page.url().split('/').pop();
  await apiContext.delete(`/quotes/delete/${quoteId}`);

});