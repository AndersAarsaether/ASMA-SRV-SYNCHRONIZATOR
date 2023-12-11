import { Request, Response, NextFunction } from 'express'
import { EnvConfigs } from '../envConfigs'

export function validateAPIKey(req: Request, res: Response, next: NextFunction): void {
    // Get API key from header
    const providedKey = req.header('x-api-key')
    // The correct API key
    const correctKey = EnvConfigs.EXTERNAL_API_KEY
    // Check if the API key was provided
    if (!providedKey) {
        res.status(401).json({ message: 'Unauthorized', error: 'API key is missing' })
        return
    }
    // Validate the provided key
    if (providedKey === correctKey) {
        // If API key is valid, proceed to next middleware function
        next()
    } else {
        // If API key is invalid, return an error
        res.status(403).json({ message: 'Forbidden', error: 'Invalid API key' })
        return
    }
}

export function checkAuthHeader(req: Request, res: Response, next: NextFunction): void {
    // Get authoriztion token from headers
    const authToken = req.headers.authorization

    // Check if authorization header was provided
    if (!authToken) {
        res.status(401).json({ message: 'Unauthorized', error: 'Missing header: authorization' })
        return
    } else {
        // If authorization header was provided, proceed to next middleware function
        next()
    }
}
