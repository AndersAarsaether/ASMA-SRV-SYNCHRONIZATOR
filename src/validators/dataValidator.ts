import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { getZodTypeErrors } from '../utils/error.util'

// Middleware for data validation
const dataValidator = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: 'The body did not conform to the schema',
                    errors: getZodTypeErrors(error),
                })
                return
            }
            next(error)
        }
    }
}

export default dataValidator
