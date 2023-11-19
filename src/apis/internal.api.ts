import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from './../envConfigs'

import initializeUserRoutes from './../controllers/user.controller'

export default function InitializeInternalAPI() {
    // Initialize app
    const app = express()

    // Maximum size of JSON body
    app.use(json({ limit: '10mb' }))

    // General web security
    app.use(helmet())

    // Disable etag and x-powered-by headers
    app.disable('etag').disable('x-powered-by')

    // Get port from environment
    const PORT = EnvConfigs.INTERNAL_PORT

    // Start server on port
    app.listen(PORT)

    // Initialize user controller
    initializeUserRoutes(app)

    // Display that the API is running
    console.log('Internal API running on port:', PORT)
}
