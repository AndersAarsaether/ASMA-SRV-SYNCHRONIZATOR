import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { EnvConfigs } from '../EnvConfigs'
import { ErrorResponse } from '../types/responses'

export function validateAPIKey(req: Request, res: Response, next: NextFunction): void {
    // Get API key from header
    const providedKey = req.header('x-api-key')
    // The correct API key
    const correctKey = EnvConfigs.API_KEY
    // Check if the API key is valid
    if (!providedKey || providedKey !== correctKey) {
        const response: ErrorResponse = { message: 'Unauthorized', errors: ['Authentication failed'] }
        res.status(401).json(response)
        return
    }
    // If API key is valid, proceed to next middleware function
    next()
}

export function checkAuthorizationHeader(req: Request, res: Response, next: NextFunction): void {
    // Get auth token from header
    const authToken = req.headers.authorization?.split(' ')[1]

    try {
        // Check if the auth token is correct
        if (!EnvConfigs.JWT_SECRET || !authToken || (authToken && !jwt.verify(authToken, EnvConfigs.JWT_SECRET))) {
            throw new Error('Not authorized')
        }
        // If auth token is correct, proceed to next middleware function
        next()
    } catch (e) {
        // If auth token is invalid
        const response: ErrorResponse = { message: 'Unauthorized', errors: ['Authorization failed'] }
        res.status(401).json(response)
        return
    }
}

export function checkPartnerAuthorizationHeader(req: Request, res: Response, next: NextFunction): void {
    // Get partner-auth token from header
    const partnerAuthToken = req.header('Partner-Authorization')?.split(' ')[1]

    // Check if partner-auth token was provided
    if (!partnerAuthToken) {
        const response: ErrorResponse = { message: 'Unauthorized', errors: ['Missing header: Partner-Authorization'] }
        res.status(401).json(response)
        return
    }
    // If partner-auth token was provided, proceed to next middleware function
    next()
}
