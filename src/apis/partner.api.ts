import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from '../envConfigs'
import { validateAPIKey } from '../middleware/headerValidators'

import initializeFeedbackRoutes from '../controllers/feedback.controller'

export default function InitializeAPI() {
    // Initialize API
    const partnerAPI = express()

    // Maximum size of JSON body
    partnerAPI.use(json({ limit: '10mb' }))

    // General web security
    partnerAPI.use(helmet())

    // Authorization by means of an API key
    partnerAPI.use(validateAPIKey)

    // Disable etag and x-powered-by headers
    partnerAPI.disable('etag').disable('x-powered-by')

    // Get port from environment
    const PORT = EnvConfigs.EXTERNAL_PORT

    // Start server on port
    partnerAPI.listen(PORT)

    // Initialize feedback controller
    initializeFeedbackRoutes(partnerAPI)

    // Display that the API is running
    console.log('Partner API running on port:', PORT)
}
