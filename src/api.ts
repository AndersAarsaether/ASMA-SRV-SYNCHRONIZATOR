import type { Express } from 'express'
import swaggerUi from 'swagger-ui-express'

import * as documentation from '../swagger.json'

import { EnvConfigs } from './EnvConfigs'
import registerUserRoutes from './web/users.controller'
import registerFeedbackRoutes from './web/feedback.controller'

export default function configureRoutes(api: Express) {
    // Get port from environment
    const port = EnvConfigs.PORT

    // Start server on port
    api.listen(port, () => {
        console.log('API running on port:', port)
    })

    // Swagger documentation
    api.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentation))

    // Add the endpoints for users
    registerUserRoutes(api)
    // Add the endpoints for feedback
    registerFeedbackRoutes(api)
}
