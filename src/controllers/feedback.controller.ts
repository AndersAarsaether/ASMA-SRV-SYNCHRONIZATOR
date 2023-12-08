import { Express, Request, Response } from 'express'
import { z } from 'zod'
import { FeedbackFHIR, FeedbackFHIRSchema } from '../schemas/feedback'
import handlePostComments from '../handlers/comments.post.handler'
import handlePostRatings from '../handlers/ratings.post.handler'

export default function initialize(app: Express) {
    app.post('/activities/feedback', (req: Request, res: Response) => {
        try {
            const feedback: FeedbackFHIR = FeedbackFHIRSchema.parse(req.body)
            if (feedback.code.text === 'activity-rankings') {
                handlePostRatings(feedback)
                res.status(200).json({ success: 'Successfully stored the ratings' })
            } else if (feedback.code.text === 'activity-comments') {
                handlePostComments(feedback)
                res.status(200).json({ success: 'Successfully stored the comments' })
            } else {
                res.status(400).json({ error: `Invalid feedback code: ${feedback.code.text}` })
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: 'The body did not conform to the FeedbackFHIR schema',
                    errors: error.errors.map((e) => e.message),
                })
            } else {
                const description = error?.message
                res.status(500).json({ message: 'Internal server error', error: description })
            }
        }
    })
}
