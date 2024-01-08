import { Express, Request, Response } from 'express'
import { ZodError } from 'zod'

import handlePostComments from './handlers/comments.post.handler'
import handlePostRatings from './handlers/ratings.post.handler'
import handlePostUser from './handlers/user.post.handler'
import validatePayload from './validators/dataValidator'
import { RatingsFHIRSchema, RatingsFHIR } from './schemas/ratings'
import { CommentsFHIRSchema, CommentsFHIR } from './schemas/comments'
import { UserSchema, User } from './schemas/user'
import { getZodTypeErrors } from './utils/error.util'
import { ErrorResponse, SuccessResponse } from './types/responses'
import { checkAuthHeader, validateAPIKey } from './validators/headerValidators'
import { chechPartnerParameter } from './validators/paramValidators'

export default function initialize(app: Express) {
    app.post(
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

    app.post(
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

    app.post(
        '/users',
        validatePayload(UserSchema),
        checkAuthHeader,
        chechPartnerParameter,
        async (req: Request, res: Response) => {
            try {
                const user: User = req.body
                // Already checked that partner parameter and auth token was provided
                const partner = req.query.partner as string
                const authToken = req.headers.authorization as string
                const responseMsg = await handlePostUser(user, partner, authToken)
                const response: SuccessResponse = { message: responseMsg }
                res.status(200).json(response)
            } catch (error) {
                const description = error?.message as string
                const recipient = req.query.partner as string
                const response: ErrorResponse = {
                    message: `Failed to post the user to ${recipient}`,
                    errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
                }
                res.status(500).json(response)
            }
        },
    )
}
