import { Express } from 'express'

import { newAdminJwtFromRefreshToken } from './handlers/newAdminJwtFromRefreshToken'

export function getAdminRoutes(app: Express) {
    app.get('/admin/nonprod-token', async (req, res) => newAdminJwtFromRefreshToken(req, res))
}
