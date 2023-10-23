import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from './envConfigs'
import { getRoutes } from './controller'

const app = express()

app.use(json({ limit: '10mb' }))

app.use(helmet())

app.disable('etag').disable('x-powered-by')

const PORT = EnvConfigs.PORT

app.listen(PORT)

getRoutes(app)

console.log('listening on port: ', PORT)
