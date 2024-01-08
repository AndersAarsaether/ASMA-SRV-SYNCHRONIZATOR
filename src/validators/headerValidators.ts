import { Request, Response, NextFunction } from 'express'
import { EnvConfigs } from '../EnvConfigs'
import { ErrorResponse } from '../types/responses'

export function validateAPIKey(req: Request, res: Response, next: NextFunction): void {
    // Get API key from header
    const providedKey = req.header('x-api-key')
    // The correct API key
    const correctKey = EnvConfigs.API_KEY
    // Check if the API key was provided
    if (!providedKey) {
        const response: ErrorResponse = { message: 'Unauthorized', errors: ['API key is missing'] }
        res.status(401).json(response)
        return
    }
    // Validate the provided key
    if (providedKey === correctKey) {
        // If API key is valid, proceed to next middleware function
        next()
    } else {
        // If API key is invalid, return an error
        const response: ErrorResponse = { message: 'Forbidden', errors: ['Invalid API key'] }
        res.status(403).json(response)
        return
    }
}

export function checkAuthHeader(req: Request, res: Response, next: NextFunction): void {
    // Get authoriztion token from headers
    const authToken = req.headers.authorization

    // Check if authorization header was provided
    if (!authToken) {
        const response: ErrorResponse = { message: 'Unauthorized', errors: ['Missing header: authorization'] }
        res.status(401).json(response)
        return
    } else {
        // If authorization header was provided, proceed to next middleware function
        next()
    }
}
