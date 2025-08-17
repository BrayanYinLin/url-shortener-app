const ERROR_NAMES = {
  NOT_FOUND: 'NOT_FOUND_ERROR', // Recurso no encontrado
  BAD_REQUEST: 'BAD_REQUEST_ERROR', // Datos mal formados o parámetros inválidos
  AUTHENTICATION: 'AUTHENTICATION_ERROR', // Usuario no autenticado
  INTERNAL: 'INTERNAL_ERROR', // Error genérico del servidor
  FORBIDDEN: 'FORBIDDEN_ERROR', // Usuario autenticado pero sin permisos
  CONFLICT: 'CONFLICT_ERROR', // Estado conflictivo, duplicado o inconsistente
  VALIDATION: 'VALIDATION_ERROR', // Datos válidos en formato pero inválidos en lógica
  TIMEOUT: 'TIMEOUT_ERROR' // El servidor o cliente tardó demasiado en responder
} as const

const ERROR_HTTP_CODES = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  AUTHENTICATION: 401,
  INTERNAL: 500,
  FORBIDDEN: 403,
  CONFLICT: 409,
  VALIDATION: 422,
  TIMEOUT: 408
} as const

const TOKEN_PARAMS = {
  AT_DURATION: 60 * 60, //  Una hora
  RT_DURATION: 60 * 60 * 24 * 15 //  15 Dias
} as const

const RATE_LIMITER = {
  WINDOW_TIME: 15 * 60 * 1000, // 15 minutes
  REQUEST_LIMIT: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
} as const

type Code = (typeof ERROR_NAMES)[keyof typeof ERROR_NAMES]
type HttpCode = (typeof ERROR_HTTP_CODES)[keyof typeof ERROR_HTTP_CODES]

export {
  RATE_LIMITER,
  ERROR_NAMES,
  ERROR_HTTP_CODES,
  TOKEN_PARAMS,
  Code,
  HttpCode
}
