import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from '../EnvConfigs'
import { checkAuthHeader } from '../validators/headerValidators'
import { chechPartnerParameter } from '../validators/paramValidators'

import initializeUserRoutes from '../controllers/user.controller'

export default function InitializeAPI() {
    // Initialize app
    const advocaAPI = express()

    // Maximum size of JSON body
    advocaAPI.use(json({ limit: '10mb' }))

    // General web security
    advocaAPI.use(helmet())

    // Check that the authorization header is provided
    advocaAPI.use(checkAuthHeader)

    // Check that the partner parameter is OK
    advocaAPI.use(chechPartnerParameter)

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
