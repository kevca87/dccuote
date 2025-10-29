# Tarea 4: API & End2End Testing
Este repositorio contiene el código base necesario para el desarrollo de la Tarea 4 del curso de Testing.
La tarea se desarrolla sobre la base la aplicación **DCCuote** que permite crear, listar y gestionar frases. Tu tarea será escribir una serie de **tests de API y E2E** que validen el comportamiento esperado de la aplicación frente a diferentes interacciones de usuario.

## Estructura del Proyecto
- [`api/`](./api/) → Contiene el backend (Flask API), los archivos docker necesarios para levantarlo, y la estructura base de API testing en pytest.
- [`web/`](./web/) → Contiene el frontend desarrollado con **React** (en TypeScript) y la estructura base de **tests E2E** de Playwright.  

En cada carpeta hay un readme que detalla como levantar las aplicaciones.

## Requisitos Previos
- Tener instalado **docker** y **python**
- Tener instalado **Node.js** y **npm**.