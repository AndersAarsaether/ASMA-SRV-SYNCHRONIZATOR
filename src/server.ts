import express, { json } from 'express'
import helmet from 'helmet'

import { EnvConfigs } from './envConfigs'
import { authorizer } from './middleware/authorization'

import initializeUserRoutes from './controllers/user.controller'
import initializeFeedbackRoutes from './controllers/feedback.controller'

// Initialize app
const app = express()

// Maximum size of JSON body
app.use(json({ limit: '10mb' }))

// General web security
app.use(helmet())

// Authorization by means of an API key
app.use(authorizer)

// Disable etag and x-powered-by headers
app.disable('etag').disable('x-powered-by')

// Get port from environment
const PORT = EnvConfigs.PORT

// Start server on port
app.listen(PORT)

// Initialize user controller
initializeUserRoutes(app)

// Initialize feedback controller
initializeFeedbackRoutes(app)

// Display that the API is running
console.log('API running on port:', PORT)
