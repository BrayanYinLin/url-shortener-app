import YAML from 'yaml'
import { readFileSync } from 'node:fs'

const docsFile = readFileSync('./src/shared/docs/openapi.yml', 'utf8')
const swaggerDocs = YAML.parse(docsFile)

export { swaggerDocs }
