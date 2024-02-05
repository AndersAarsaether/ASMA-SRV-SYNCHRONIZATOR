import type { Express, Request, Response } from 'express'

import { RatingsFHIRSchema } from '../schemas/ratings'
import { CommentsFHIRSchema } from '../schemas/comments'
import validatePayload from '../validators/dataValidator'
import { validateAPIKey } from '../validators/headerValidators'
import handlePostComments from '../service/comments.post.handler'
import handlePostRatings from '../service/ratings.post.handler'

export default function registerFeedbackRoutes(api: Express) {
    api.post(
        '/Observation/ratings',
        validatePayload(RatingsFHIRSchema),
        validateAPIKey,
        (req: Request, res: Response) => handlePostRatings(req, res),
    )

    api.post(
        '/Observation/comments',
        validatePayload(CommentsFHIRSchema),
        validateAPIKey,
        (req: Request, res: Response) => handlePostComments(req, res),
    )
}
