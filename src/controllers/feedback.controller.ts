import { Express, Request, Response } from 'express'
import handlePostComments from '../handlers/comments.post.handler'
import handlePostRatings from '../handlers/ratings.post.handler'

import dataValidator from '../validators/dataValidator'
import { RatingsFHIRSchema, RatingsFHIR } from '../schemas/ratings'
import { CommentsFHIRSchema, CommentsFHIR } from '../schemas/comments'
import { ZodError } from 'zod'
import { getZodTypeErrors } from '../utils/error.util'

export default function initialize(app: Express) {
    app.post('/activities/ratings', dataValidator(RatingsFHIRSchema), (req: Request, res: Response) => {
        try {
            const ratings: RatingsFHIR = req.body
            handlePostRatings(ratings)
            res.status(200).json({ message: 'Successfully stored the ratings' })
        } catch (error) {
            const description = error?.message
            res.status(500).json({
                message: `Failed to store the ratings`,
                errors: error instanceof ZodError ? getZodTypeErrors(error) : description,
            })
        }
    })

    app.post('/activities/comments', dataValidator(CommentsFHIRSchema), (req: Request, res: Response) => {
        try {
            const comments: CommentsFHIR = req.body
            handlePostComments(comments)
            res.status(200).json({ message: 'Successfully stored the comments' })
        } catch (error) {
            const description = error?.message
            res.status(500).json({
                message: `Failed to store the comments`,
                errors: error instanceof ZodError ? getZodTypeErrors(error) : description,
            })
        }
    })
}
