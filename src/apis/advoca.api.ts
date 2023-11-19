import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from '../envConfigs'
import { verifyAuthHeader } from '../middleware/headerValidators'

import initializeUserRoutes from '../controllers/user.controller'

export default function InitializeAPI() {
    // Initialize app
    const advocaAPI = express()

    // Maximum size of JSON body
    advocaAPI.use(json({ limit: '10mb' }))

    // General web security
    advocaAPI.use(helmet())

    // Verify that an authorization header is provided
    advocaAPI.use(verifyAuthHeader)

    // Disable etag and x-powered-by headers
    advocaAPI.disable('etag').disable('x-powered-by')

    // Get port from environment
    const PORT = EnvConfigs.INTERNAL_PORT

    // Start server on port
    advocaAPI.listen(PORT)

    // Initialize user controller
    initializeUserRoutes(advocaAPI)

    // Display that the API is running
    console.log('AdVoca API running on port:', PORT)
}
