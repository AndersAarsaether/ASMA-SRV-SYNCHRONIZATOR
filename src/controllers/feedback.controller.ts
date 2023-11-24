import { Express, Request, Response } from 'express'
import { FeedbackFHIR } from '../model-partners/feedback.model'
import handlePostComments from '../handlers/comments.post.handler'
import handlePostRatings from '../handlers/ratings.post.handler'

export default function initialize(app: Express) {
    app.post('/activities/feedback', (req: Request, res: Response) => {
        try {
            const feedback: FeedbackFHIR = req.body
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
            const description = error?.message
            res.status(500).json({ error: 'An error occured', description })
        }
    })
}
