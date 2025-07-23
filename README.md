# Acortador de URLs Monorepo 🚀

Este es un monorepo para una aplicación de acortador de URLs, compuesto por un frontend en React y un backend en Node.js.

## Paquetes 📦

- `api-shortener`: Una aplicación de Node.js con Express que provee la API para el acortador de URLs. 🌐
- `short-your-url`: Una aplicación de React que provee la interfaz de usuario para el acortador de URLs. 🎨

## Primeros Pasos 🏁

Para comenzar, necesitarás tener Node.js y npm instalados. Luego, puedes clonar este repositorio e instalar las dependencias:

```bash
npm install
```

### Desarrollo 👨‍💻

Para iniciar los servidores de desarrollo tanto para el frontend como para el backend, puedes usar los siguientes comandos:

- Para iniciar el servidor de desarrollo del frontend:

```bash
npm run dev
```

- Para iniciar el servidor de desarrollo del backend:

```bash
npm run dev:api
```

### Build 🏗️

Para compilar tanto el frontend como el backend para producción, puedes usar el siguiente comando:

```bash
npm run build
```

### Pruebas 🧪

Para ejecutar las pruebas tanto para el frontend como para el backend, puedes usar el siguiente comando:

```bash
npm test
```

## Base de Datos 💾

La aplicación utiliza una base de datos PostgreSQL. Las consultas DDL para crear las tablas necesarias se pueden encontrar en el directorio `postgres-database`.
