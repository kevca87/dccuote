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

test('ver todas las frases', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    const quotesGrid = page.getByTestId('quotes-grid');

    await expect(quotesGrid).not.toBeEmpty();
    const visibleCards = quotesGrid.locator('[data-slot="card"]');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);
});

test('ver una frase', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByText('Nothing in life is to be').click();
    await expect(page.getByRole('heading', { name: 'Nothing in life is to be' })).toBeVisible();
});

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

test('crear frase exitosamente y ver en la lista', async ({ page }) => {
    await page.goto(`/`);

    await page.getByRole('button', { name: 'Nueva frase' }).click();

    await page.getByRole('textbox', { name: 'Frase' }).fill('You shall not pass!');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Gandalf' }).click();
    await page.getByLabel('Fuente').fill('Lord of the Rings');
    await page.getByLabel('Etiquetas').fill('fantasy, epic, lotr');

    await page.getByRole('button', { name: 'Añadir' }).click();

    await expect(page.getByText('Frase añadida exitosamente')).toBeVisible();
    await page.getByRole('link', { name: 'Frases' }).click();
    await expect(page.getByText('You shall not pass!')).toBeVisible();
    // Clean up: delete the created quote via API
    await page.getByText('You shall not pass!').click();
    const quoteId = page.url().split('/').pop();
    await apiContext.delete(`/quotes/delete/${quoteId}`);
});

test('buscar frases de la vida', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('life');
    //   await expect(page.getByText('No se encontraron resultados')).toBeVisible();
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const lifeQuotes = quotesGrid.locator('[data-slot="card"]', { hasText: 'life' });
    // const count = await lifeQuotes.count();
    // expect(count).toBeGreaterThan(0);
    await expect(lifeQuotes).toHaveCount(3);
});

test('buscar frase exacta', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('Life happens wherever you are, whether you make it or not.');
    //   await expect(page.getByText('No se encontraron resultados')).toBeVisible();
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const quotes = quotesGrid.locator('[data-slot="card"]');
    // const count = await lifeQuotes.count();
    // expect(count).toBeGreaterThan(0);
    await expect(quotes).toHaveCount(1);
    await expect(quotes).toContainText('Life happens wherever you are, whether you make it or not.');
});

test('buscar frase y ver', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('Life happens wherever you are, whether you make it or not.');
    await page.getByText('Life happens wherever you are, whether you make it or not.').click();
    await expect(page.getByRole('heading', { name: 'Life happens wherever you are, whether you make it or not.' })).toBeVisible();
});

test('buscar frase inexistente', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('Frase que no existe');
    //   await expect(page.getByText('No se encontraron resultados')).toBeVisible();
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).toBeEmpty();
    const visibleCards = quotesGrid.locator('[data-slot="card"]');
    const count = await visibleCards.count();
    expect(count).toBe(0);
});

test('filtrar por personaje buscando al personaje', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('combobox').click();
    await page.getByPlaceholder('Search or create new').fill('Un');
    await page.getByRole('option', { name: 'Uncle Iroh' }).click();
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const uncleIrohQuotes = quotesGrid.locator('[data-slot="card"]', { hasText: 'Uncle Iroh' });
    await expect(uncleIrohQuotes).toHaveCount(2);
});

test('filtrar por personaje y busqueda', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Uncle Iroh' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('life');
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const uncleIrohQuotes = quotesGrid.locator('[data-slot="card"]', { hasText: 'life' });
    await expect(uncleIrohQuotes).toHaveCount(1);
});

// BUG: este test falla debido a un bug en la app
test('bug: seleccionar todos y barra de busqueda', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Todos' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('life');
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const lifeQuotes = quotesGrid.locator('[data-slot="card"]', { hasText: 'life' });
    await expect(lifeQuotes).toHaveCount(3);
});

// BUG: este test falla debido a un bug en la app
test('bug: barra de busqueda y luego seleccionar personaje', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('textbox', { name: 'Buscar frases...' }).fill('life');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Uncle Iroh' }).click();
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const uncleIrohQuotes = quotesGrid.locator('[data-slot="card"]', { hasText: 'life' });
    await expect(uncleIrohQuotes).toHaveCount(1);
});

test('nueva frase creando personaje', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Nueva frase' }).click();
    await page.getByRole('textbox', { name: 'Frase' }).fill('No soy un pesimista Tulio, solo soy un optimista bien informado');
    await page.getByRole('combobox').click();
    await page.getByPlaceholder('Search or create new').fill('Juan Carlos Bodoque');
    await page.getByText('Create "Juan Carlos Bodoque"').first().click();

    await page.getByLabel('Fuente').fill('31 Minutos');
    await page.getByLabel('Etiquetas').fill('chile, humor, 31 minutos, tv');
    await page.getByRole('button', { name: 'Añadir' }).click();
    
    await expect(page.getByText('Frase añadida exitosamente')).toBeVisible();
    await page.getByRole('button', { name: 'Ver' }).click();
    await expect(page.getByText('No soy un pesimista Tulio, solo soy un optimista bien informado')).toBeVisible();

    // Clean up: delete the created quote via API
    const quoteId = page.url().split('/').pop();
    await apiContext.delete(`/quotes/delete/${quoteId}`);

    // TODO: delete the created character via API
});


// test('crear y eliminar una frase', async ({ page }) => {
//     await page.goto('/');
//     await page.getByRole('link', { name: 'Frases' }).click();
//     await page.getByRole('button', { name: 'Nueva frase' }).click();
//     await page.getByRole('textbox', { name: 'Texto de la frase' }).fill('Frase de prueba');
//     await page.getByRole('button', { name: 'Guardar' }).click();
//     const quotesGrid = page.getByTestId('quotes-grid');
//     await expect(quotesGrid).not.toBeEmpty();
//     const newQuote = quotesGrid.locator('[data-slot="card"]', { hasText: 'Frase de prueba' });
//     await expect(newQuote).toHaveCount(1);
//     await newQuote.locator('button[aria-label="Eliminar"]').click();
//     await expect(newQuote).toHaveCount(0);
// });


test('filtrar por personaje creado', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Nueva frase' }).click();
    await page.getByRole('textbox', { name: 'Frase' }).fill('Si no se divierten los golpeo con mi guitarra');
    await page.getByRole('combobox').click();
    await page.getByPlaceholder('Search or create new').fill('Juan Carlos Bodoque');
    await page.getByText('Create "Juan Carlos Bodoque"').first().click();

    await page.getByLabel('Fuente').fill('31 Minutos');
    await page.getByLabel('Etiquetas').fill('chile, humor, 31 minutos, tv');
    await page.getByRole('button', { name: 'Añadir' }).click();
    
    await expect(page.getByText('Frase añadida exitosamente')).toBeVisible();
    await page.getByRole('button', { name: 'Ver' }).click();
    await expect(page.getByText('Si no se divierten los golpeo con mi guitarra')).toBeVisible();

    await page.getByRole('link', { name: 'Frases' }).click();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Juan Carlos Bodoque' }).click();
    const quotesGrid = page.getByTestId('quotes-grid');
    await expect(quotesGrid).not.toBeEmpty();
    const bodoqueQuotes = quotesGrid.locator('[data-slot="card"]', { hasText: 'Juan Carlos Bodoque' });
    await expect(bodoqueQuotes).toHaveCount(1);

    // Clean up: delete the created quote via API
    const quoteId = page.url().split('/').pop();
    await apiContext.delete(`/quotes/delete/${quoteId}`);

    // TODO: delete the created character via API
});


test('filtrar y volver a todos', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Frases' }).click();
    
    const numberOfQuotes = await page.getByTestId('quotes-grid').locator('[data-slot="card"]').count();
    
    await page.getByRole('combobox').click();
    
    await page.getByRole('option', { name: 'Uncle Iroh' }).click();
    const quotesGridFiltered = page.getByTestId('quotes-grid');
    await expect(quotesGridFiltered).not.toBeEmpty();
    const uncleIrohQuotes = quotesGridFiltered.locator('[data-slot="card"]', { hasText: 'Uncle Iroh' });
    await expect(uncleIrohQuotes).toHaveCount(2);

    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Todos' }).click();
    await expect(page.getByTestId('quotes-grid')).not.toBeEmpty();
    const allQuotes = page.getByTestId('quotes-grid').locator('[data-slot="card"]');
    const count = await allQuotes.count();
    expect(count).toBe(numberOfQuotes);
});

test('nueva frase con campos vacios', async ({ page }) => {
    await page.goto(`/`);
    await page.getByRole('link', { name: 'Frases' }).click();    
    const numberOfQuotes = await page.getByTestId('quotes-grid').locator('[data-slot="card"]').count();

    await page.getByRole('button', { name: 'Nueva frase' }).click();
    await page.getByRole('textbox', { name: 'Frase' }).fill('Una frase incompleta');
    await page.getByRole('button', { name: 'Añadir' }).click();
    await expect(page.getByText('Error al añadir la frase.')).toBeVisible();
    await expect(page.getByText('Faltan campos obligatorios.')).toBeVisible();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await expect(page.getByText('Una frase incompleta')).not.toBeVisible();
});

// // TODO
// test('nueva frase duplicada', async ({ page }) => {
// });

// // TODO
// test('nueva frase buscando personaje', async ({ page }) => {

// });

// // TODO
// test('añadir etiqueta a frase', async ({ page }) => {
// });