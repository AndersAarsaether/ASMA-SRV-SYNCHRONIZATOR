import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { getZodTypeErrors } from '../utils/error.util'
import { ErrorResponse } from '../types/responses'

// Middleware for data validation
const dataValidator = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Try to parse the body into schema-typed object
            schema.parse(req.body)
            // If there are no errors, proceed to next middleware function
            next()
        } catch (error) {
            // Ensure it is a typing error
            if (error instanceof ZodError) {
                // Explain why it failed in the response
                const response: ErrorResponse = {
                    message: 'The body did not conform to the schema',
                    errors: getZodTypeErrors(error),
                }
                // Send the response back to sender
                res.status(400).json(response)
                return
            }
            // Something else failed
            const description = error?.message as string
            const response: ErrorResponse = {
                message: 'Something went wrong',
                errors: [description],
            }
            res.status(500).json(response)
            return
        }
    }
}

export default dataValidator
