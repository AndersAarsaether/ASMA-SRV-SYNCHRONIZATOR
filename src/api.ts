import express, { json } from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

import * as documentation from './swagger.json'
import { EnvConfigs } from './EnvConfigs'

import initializeUserRoutes from './controllers/users.controller'
import initializeActivitiesRoutes from './controllers/activities.controller'

export default function InitializeAPI() {
    // Initialize app
    const api = express()

    // Maximum size of JSON body
    api.use(json({ limit: '10mb' }))

    // General web security
    api.use(helmet())

    // Documentation server
    api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation))

    // Serve static files from 'public' directory
    api.use(express.static('public'))

    // Route for serving the HTML file at root
    api.get('/', (_, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })

    // Disable etag and x-powered-by headers
    api.disable('etag').disable('x-powered-by')

    // Get port from environment
    const port = EnvConfigs.PORT

    // Start server on port
    api.listen(port, () => {
        console.log('API running on port:', port)
    })

    // Initialize controllers
    initializeUserRoutes(api)
    initializeActivitiesRoutes(api)
}
