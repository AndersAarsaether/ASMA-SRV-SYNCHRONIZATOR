import { Express, Request, Response } from 'express'
import { ZodError } from 'zod'
import handlePostComments from '../handlers/comments.post.handler'
import handlePostRatings from '../handlers/ratings.post.handler'
import { getZodTypeErrors } from '../utils/error.util'
import { validateAndReturnFHIRFeedback } from '../validators/dataValidators'

export default function initialize(app: Express) {
    app.post('/activities/feedback', (req: Request, res: Response) => {
        try {
            const feedback = validateAndReturnFHIRFeedback(req.body)
            if (feedback.code.text === 'activity-ratings') {
                handlePostRatings(feedback)
                res.status(200).json({ success: 'Successfully stored the ratings' })
            } else if (feedback.code.text === 'activity-comments') {
                handlePostComments(feedback)
                res.status(200).json({ success: 'Successfully stored the comments' })
            } else {
                res.status(400).json({ error: `Invalid feedback code: ${feedback.code.text}` })
            }
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: 'The body did not conform to the FeedbackFHIR schema',
                    errors: getZodTypeErrors(error),
                })
            } else {
                const description = error?.message
                res.status(500).json({ message: 'Internal server error', error: description })
            }
        }
    })
}
