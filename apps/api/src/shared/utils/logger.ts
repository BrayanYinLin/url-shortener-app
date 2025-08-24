import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info', // niveles: error, warn, info, http, verbose, debug, silly
  format: format.combine(
    format.colorize(), // colores en consola
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`
    })
  ),
  transports: [new transports.Console()]
})

export default logger
