import { Request, Response, NextFunction } from 'express'
import { EnvConfigs } from '../envConfigs'

export const authorizerInternal = (req: Request, res: Response, next: NextFunction): void => {
    // Get API key from header
    const providedKey = req.header('x-api-key')
    // The correct API key
    const correctKey = EnvConfigs.INTERNAL_API_KEY
    // Check if provided key is correct
    checkKey(providedKey, correctKey, res, next)
}

export const authorizerExternal = (req: Request, res: Response, next: NextFunction): void => {
    // Get API key from header
    const providedKey = req.header('x-api-key')
    // The correct API key
    const correctKey = EnvConfigs.EXTERNAL_API_KEY
    // Check if provided key is correct
    checkKey(providedKey, correctKey, res, next)
}

const checkKey = (providedKey: string | undefined, correctKey: string, res: Response, next: NextFunction): void => {
    console.log(providedKey)
    console.log(correctKey)
    // Check if the API key was provided
    if (!providedKey) {
        res.status(401).json({ message: 'API key is missing' })
        return
    }

    // Validate the provided key
    if (providedKey === correctKey) {
        // If API key is valid, proceed to next middleware function
        next()
    } else {
        // If API key is invalid, return an error
        res.status(403).json({ message: 'Invalid API key' })
        return
    }
}
