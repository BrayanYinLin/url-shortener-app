// Al usar rutas relativas, dejamos que el proxy (en vite.config.ts o vercel.json)
// se encargue de dirigir la petición al backend correcto, ya sea en desarrollo o producción.
// Esto soluciona todos los problemas de cookies entre dominios.
export const ENDPOINTS = {
  AUTH: '/api/auth/',
  LINK: '/api/link/'
}

// El origen del sitio web se puede determinar dinámicamente donde sea necesario,
// pero ya no se requiere para las llamadas a la API.
export const WEBSITE = window.location.origin
