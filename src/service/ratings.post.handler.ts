import type { Request, Response } from 'express'
import { ZodError } from 'zod'

import type { RatingsFHIR } from '../schemas/ratings'
import { FHIRFeedbackToRatings } from '../mappers/ratings.mapper'
import { storeFeedbackRatings } from '../proxy/advoca.proxy'
import type { ErrorResponse, SuccessResponse } from '../types/responses'
import { getZodTypeErrors } from '../utils/error.util'

export default function handlePostRatings(req: Request, res: Response): void {
    try {
        // Get the FHIR resource
        const ratingsFHIR: RatingsFHIR = req.body
        // Map FHIR resource to ratings object
        const ratings = FHIRFeedbackToRatings(ratingsFHIR)
        // Store the ratings
        storeFeedbackRatings(ratings)

        const response: SuccessResponse = { message: 'Successfully stored the ratings' }
        res.status(200).json(response)
    } catch (error) {
        const description = error?.message as string

        // Return all type errors, or just the error that resulted in the crash
        const response: ErrorResponse = {
            message: 'Failed to store the ratings',
            errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
        }
        res.status(500).json(response)
    }
}
