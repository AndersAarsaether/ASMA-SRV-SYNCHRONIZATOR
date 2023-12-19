import express from 'express'
import swaggerUi from 'swagger-ui-express'

import AdvocaAPI from './apis/advoca.api'
import PartnerAPI from './apis/partner.api'
import * as swaggerDocument from './swagger.json'
import { EnvConfigs } from './EnvConfigs'

// Empty line between compile messages and runtime messages
console.log()

// Initialize APIs
AdvocaAPI()
PartnerAPI()

// Start documentation server
const docserver = express()
docserver.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const docPort = EnvConfigs.DOC_PORT
docserver.listen(docPort)
