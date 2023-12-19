import express from 'express'
import swaggerUi from 'swagger-ui-express'

import AdvocaAPI from './apis/advoca.api'
import PartnerAPI from './apis/partner.api'
import * as documentation from './swagger.json'
import { EnvConfigs } from './EnvConfigs'

// Empty line between compile messages and runtime messages
console.log()

// Initialize APIs
PartnerAPI()
AdvocaAPI()

// Start documentation server
const docserver = express()
const port = EnvConfigs.DOC_PORT
docserver.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation))
docserver.listen(port, () => {
    console.log('Documentation server running on port:', port)
})
