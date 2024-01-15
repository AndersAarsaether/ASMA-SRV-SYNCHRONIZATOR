import { Express, Request, Response } from 'express'
import { ZodError } from 'zod'

import handlePostComments from '../service/comments.post.handler'
import handlePostRatings from '../service/ratings.post.handler'
import validatePayload from '../validators/dataValidator'
import { RatingsFHIRSchema, RatingsFHIR } from '../schemas/ratings'
import { CommentsFHIRSchema, CommentsFHIR } from '../schemas/comments'
import { getZodTypeErrors } from '../utils/error.util'
import { ErrorResponse, SuccessResponse } from '../types/responses'
import { validateAPIKey } from '../validators/headerValidators'

export default function initialize(api: Express) {
    api.post(
        '/activities/ratings',
        validatePayload(RatingsFHIRSchema),
        validateAPIKey,
        (req: Request, res: Response) => {
            try {
                const ratings: RatingsFHIR = req.body
                handlePostRatings(ratings)
                const response: SuccessResponse = { message: 'Successfully stored the ratings' }
                res.status(200).json(response)
            } catch (error) {
                const description = error?.message as string
                const response: ErrorResponse = {
                    message: 'Failed to store the ratings',
                    errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
                }
                res.status(500).json(response)
            }
        },
    )

    api.post(
        '/activities/comments',
        validatePayload(CommentsFHIRSchema),
        validateAPIKey,
        (req: Request, res: Response) => {
            try {
                const comments: CommentsFHIR = req.body
                handlePostComments(comments)
                const response: SuccessResponse = { message: 'Successfully stored the comments' }
                res.status(200).json(response)
            } catch (error) {
                const description = error?.message as string
                const response: ErrorResponse = {
                    message: 'Failed to store the comments',
                    errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
                }
                res.status(500).json(response)
            }
        },
    )
}
