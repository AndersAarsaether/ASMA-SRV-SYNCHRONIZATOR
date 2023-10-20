import express, { json } from 'express'
import helmet from 'helmet'
//import { json } from 'body-parser'

import { checkIfSubdomainIsValid } from './helpers/checkIfSubdomainIsValid'
import { EnvConfigs } from './EnvConfigs'
import { connectorRoutes } from './handlers/connector/connectorRoutes'
import { setEnvToOperateMiddleware } from './graphql/envToOperate'
//import { advocaRoutes } from './handlers/advoca/advocaRoutes'
//import { communicationPortalRoutes } from './handlers/communication-portal/communicationPortalRoutes'

//deepcode ignore UseCsurfForExpress: <not necessary tor this type of server>
const app = express()

app.use(json({ limit: '10mb' }))

app.use(setEnvToOperateMiddleware)
app.use(checkIfSubdomainIsValid)
app.use(helmet())

app.disable('etag').disable('x-powered-by')

const PORT = EnvConfigs.PORT

connectorRoutes(app)

app.listen(PORT)

console.log('listening on port: ', PORT)
