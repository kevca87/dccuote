# Web App DCCuote

El *frontend* está desarrollado en **React** (con **TypeScript**) y usaremos [Playwright](https://playwright.dev/docs/intro) para los tests.  
Es altamente recomendable explorar la documentación de [Playwright](https://playwright.dev/docs/intro).

## Requisitos
Antes de levantar la aplicación, debe confirmar que:
- Tiene instalado [Node.js](https://nodejs.org/en) en su dispositivo.
- Tiene levantado el **backend** en [http://127.0.0.1:5000/](http://127.0.0.1:5000/) (como se establece por defecto) ⚠️

## Levantar la aplicación
Posicionándose en la carpeta `web`, siga los siguientes pasos para levantar la aplicación de manera local:

1. Ejecute el comando:
    ```bash
    npm install
    ```
    Esto instalará todas las dependencias necesarias.

2. Posteriormente, ejecute:
    ```bash
    npm run dev
    ```
    Esto debería levantar la aplicación en *localhost*, retornando lo siguiente:
    ```
    ➜  Local:   http://localhost:5173/
    ```

## Ejecutar los tests
⚠️ Para ejecutar los tests, es necesario que el backend se encuentre levantado en [http://127.0.0.1:5000/](http://127.0.0.1:5000/) y haber instalado las dependencias con `npm install`.

Posteriormente, posicionándose en la carpeta `web`, siga los siguientes pasos para ejecutar los tests end2end (E2E):

1. Configure **Playwright** instalando el navegador:
    ```bash
    npx playwright install chromium
    ```
    Acepte la instalación con `y`.  

2. Ejecute los tests:
    ```bash
    npx playwright test
    ```
    *(Puede tardar un poco la primera vez, ya que creará un build sobre el cual se ejecutarán los tests.)*

3. Vea el reporte generado por Playwright:
    ```bash
    npx playwright show-report
    ```

A partir de ahora puede ejecutar comandos de **Playwright**, como por ejemplo:

**Ejecutar un solo test file:**
```bash
npx playwright test example.spec.ts
```

**Ejecutar codegen** (para generar los tests con UI)
```
npx playwright codegen http://localhost:5173/
```

**Ejecutar los tests en modo UI:**
```
npx playwright test --ui
```

**Ejecutar los tests en modo headed** (ver cómo playwright interactúa con la web)
```
npx playwright test --headed
```


**Ver el trace de los test**:
```
npx playwright test --trace on
npx playwright show-report
```

Puede ver mas comandos en https://playwright.dev/docs/intro

No es necesario iniciar la aplicación web manualmente (`npm run dev`) ya que en `playwright.config.ts` se configuró el `webServer` con la `baseURL` de la app: 'http://localhost:4173', es decir `'/'` apunta a 'http://localhost:4173'. Puedes ver el resto de la configuración en [playwright.config.ts](./playwright.config.ts)


### Crear nuevos tests
Puede crear nuevos tests en la carpeta [tests](./tests/), donde también podrá encontrar el test de ejemplo visto en clases.

**Aclaración:** Si por alguna razón levantó el backend en otro puerto, debe configurarlo en el frontend cambiando `baseUrl` en [/src/api.tsx](./src/api.tsx)