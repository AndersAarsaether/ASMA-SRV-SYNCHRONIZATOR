import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from './../envConfigs'
import authorizer from './../middleware/authorization'

import initializeFeedbackRoutes from './../controllers/feedback.controller'

export default function InitializeExternalAPI() {
    // Initialize API
    const externalAPI = express()

    // Maximum size of JSON body
    externalAPI.use(json({ limit: '10mb' }))

    // General web security
    externalAPI.use(helmet())

    // Authorization by means of an API key
    externalAPI.use(authorizer)

    // Disable etag and x-powered-by headers
    externalAPI.disable('etag').disable('x-powered-by')

    // Get port from environment
    const PORT = EnvConfigs.EXTERNAL_PORT

    // Start server on port
    externalAPI.listen(PORT)

    // Initialize feedback controller
    initializeFeedbackRoutes(externalAPI)

    // Display that the API is running
    console.log('External API running on port:', PORT)
}
