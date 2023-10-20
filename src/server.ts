import express, { json } from 'express'
import helmet from 'helmet'
//import { json } from 'body-parser'

import { EnvConfigs } from './envConfigs'

//import { advocaRoutes } from './handlers/advoca/advocaRoutes'
//import { communicationPortalRoutes } from './handlers/communication-portal/communicationPortalRoutes'

//deepcode ignore UseCsurfForExpress: <not necessary tor this type of server>
const app = express()

app.use(json({ limit: '10mb' }))

app.use(helmet())

app.disable('etag').disable('x-powered-by')

const PORT = EnvConfigs.PORT

app.listen(PORT)

console.log('listening on port: ', PORT)
