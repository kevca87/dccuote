# Web App DCCuote

El frontend fue desarrollado usando React (con TypeScript). 

## Requisitos
Antes de levantar la aplicación debe confirmar que:
- Tener instalado [Node.js](https://nodejs.org/en) en su dispositivo.
- Tener levantado el **Backend** en http://127.0.0.1:5000/ (como se establece por defecto) ⚠️

## Levantar la aplicación
Posesionandose en la carpeta `web` siga los siguientes pasos para levantar la aplicación de manera local:
1. Ejecutar el comando:
    ```
    npm install
    ```
    Esto instalará todas las dependencias necesarias.
2. Posteriormente ejecutar:
    ```
    npm run dev
    ```
    Esto deberia levantar la aplicación en localhost retornando lo siguiente
    ```
    ➜  Local:   http://localhost:5173/
    ```

## Ejecutar los tests
⚠️ Para ejecutar los tests es necesario que el backend se encuentre levantado en http://127.0.0.1:5000/ y haber instalado las dependencias con `npm install`.

Posteriormente posesionandose en la carpeta `web` siga los siguientes pasos para ejecutar los E2E tests:
1. Configurar playwright (instalando el browser)
    ```bash
    npx playwright install chromium
    ```
2. Correr los tests
    ```bash
    npx playwright test
    ```