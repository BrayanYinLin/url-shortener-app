import cors from 'cors'

const BASE_URL = 'http://localhost:5173'

const modifyOrigin = (origin: string) => origin + '/'
const originsAdmitted = [BASE_URL!, modifyOrigin(BASE_URL!)]

export function corsOrigins() {
  return cors({
    origin: (origin, callback) => {
      if (originsAdmitted.findIndex((o) => o === origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error(`Not allowed by CORS ${origin}`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
}

export function preflight() {
  return cors({
    origin: function (origin, callback) {
      if (originsAdmitted.indexOf(origin!) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error(`Not allowed by CORS ${origin}`))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
}
