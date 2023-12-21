import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { getZodTypeErrors } from '../utils/error.util'
import { ErrorResponse } from '../types/responses'

// Middleware for data validation
const dataValidator = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const response: ErrorResponse = {
                    message: 'The body did not conform to the schema',
                    errors: getZodTypeErrors(error),
                }
                res.status(400).json(response)
                return
            }
            next(error)
        }
    }
}

export default dataValidator
