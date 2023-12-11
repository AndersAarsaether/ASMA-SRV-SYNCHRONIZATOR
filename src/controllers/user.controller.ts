import { Express, Request, Response } from 'express'
import handlePostUser from '../handlers/user.post.handler'
import { User } from '../model/user'

export default function initialize(app: Express) {
    app.post('/users', async (req: Request, res: Response) => {
        try {
            const user: User = req.body
            // Already checked that partner parameter and auth token was provided
            const partner = req.query.partner as string
            const authToken = req.headers.authorization as string

            const responseMsg = await handlePostUser(user, partner, authToken)
            res.status(200).json({ success: responseMsg })
        } catch (error) {
            const description = error?.message
            const recipient = req.query.partner as string
            res.status(500).json({ error: `Failed to post the user to ${recipient}`, description })
        }
    })
}
