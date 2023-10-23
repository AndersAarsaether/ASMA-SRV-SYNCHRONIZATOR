import { Express, Request, Response } from 'express'
import { FeedbackFHIR } from './model-external/feedbackFHIR'
import { handlePostComments } from './handlers/postCommentsHandler'
import { handlePostRatings } from './handlers/postRatingsHandler'

export function getRoutes(app: Express) {
    app.post('/activities/feedback', (req: Request, res: Response) => {
        try {
            const feedback: FeedbackFHIR = req.body
            if (feedback.code.text === 'activity-ratings') {
                handlePostRatings(feedback)
                res.status(200).json({ message: 'Successfully stored the ratings' })
            } else if (feedback.code.text === 'activity-comments') {
                handlePostComments(feedback)
                res.status(200).json({ message: 'Successfully stored the comments' })
            } else {
                res.status(400).json({ message: `Invalid feedback code: ${feedback.code.text}` })
            }
        } catch (error) {
            const description = error?.message
            res.status(500).json({ message: 'An error occured', description })
        }
    })
}
