# Acortador de URLs Monorepo 🚀

Este es un monorepo para una aplicación de acortador de URLs, compuesto por un frontend en React y un backend en Node.js.

## Características ✨

- **Acortamiento de URLs:** Convierte URLs largas en enlaces cortos y fáciles de compartir.
- **Autenticación de Usuarios:** Inicia sesión con tu cuenta de Google o GitHub.
- **Gestión de Enlaces:** Visualiza, edita y elimina tus enlaces acortados.
- **Redirección Rápida:** Redirección eficiente de enlaces cortos a las URLs originales.
- **Diseño Responsivo:** Interfaz de usuario amigable y adaptable a cualquier dispositivo.

## Tecnologías Utilizadas 🛠️

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - Zustand (para el manejo de estado)
- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - TypeORM
- **Base de Datos:**
  - PostgreSQL
- **Autenticación:**
  - Passport.js (con estrategias para Google y GitHub)
  - JSON Web Tokens (JWT)
- **Gestor de Paquetes:**
  - pnpm
- **Contenerización:**
  - Docker

## Estructura del Proyecto 📁

El proyecto está organizado como un monorepo utilizando pnpm workspaces:

- `apps/api`: Contiene el código del backend (servidor de Node.js).
- `apps/client`: Contiene el código del frontend (aplicación de React).

## Prerrequisitos 📋

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started)

## Primeros Pasos 🏁

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/url-shortener-app.git
    cd url-shortener-app
    ```

2.  **Instalar dependencias:**

    Utiliza `pnpm` para instalar todas las dependencias del monorepo.

    ```bash
    pnpm install
    ```

## Configuración de la Base de Datos 💾

La aplicación utiliza una base de datos PostgreSQL que puede ser levantada fácilmente con Docker Compose.

1.  **Iniciar el contenedor de la base de datos:**

    ```bash
    docker-compose up -d
    ```

    Esto iniciará un contenedor de PostgreSQL en el puerto `5273`.

## Variables de Entorno 🔑

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```env
# API Configuration
PORT=5373
API_BASE=http://localhost:5373

# Database
POSTGRES_HOST=localhost
POSTGRES_DATABASE=db_shortener
POSTGRES_USER=admin
POSTGRES_PASSWORD=your_postgres_password

# Authentication
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GOOGLE_CALLBACK=http://localhost:5373/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

**Nota:** Para obtener las credenciales de OAuth, deberás crear una aplicación en [Google Cloud Console](https://console.cloud.google.com/) y en [GitHub Developer Settings](https://github.com/settings/developers).

## Ejecutando la Aplicación 🚀

Puedes ejecutar el frontend y el backend por separado en modo de desarrollo.

- **Para iniciar el servidor de desarrollo del frontend:**

  ```bash
  pnpm --filter client run dev
  ```

- **Para iniciar el servidor de desarrollo del backend:**

  ```bash
  pnpm --filter api run dev
  ```

## Build para Producción 🏗️

Para compilar tanto el frontend como el backend para producción, puedes usar el siguiente comando:

```bash
pnpm build
```

Este comando ejecutará los scripts de build de ambos paquetes (`api` y `client`).

## Ejecutando Pruebas 🧪

- **Para ejecutar las pruebas de la API:**

  ```bash
  pnpm --filter api run test
  ```

- **Para ejecutar las pruebas del cliente:**

  ```bash
  pnpm --filter client run test
  ```

## Documentación de la API 📖

La documentación de la API está disponible en el archivo `apps/api/src/shared/docs/openapi.yml`. Este archivo sigue la especificación OpenAPI 3.0 y detalla todos los endpoints disponibles, sus parámetros y las respuestas esperadas.

## Licencia 📄

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
