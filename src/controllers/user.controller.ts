import { Express, Request, Response } from 'express'
import { User, UserRequest } from '../model-advoca/user.model'
import handlePostUser from '../handlers/user.post.handler'

export default function initialize(app: Express) {
    app.post('/users', async (req: Request, res: Response) => {
        try {
            const user: UserRequest = req.body
            // Checked that token exists in middleware, so can simply convert to string
            const authToken = req.headers.authorization as string
            const responseMsg = await handlePostUser(user, authToken)
            res.status(200).json({ message: responseMsg })
        } catch (error) {
            const description = error?.message
            const { recipient } = req.body as UserRequest
            res.status(500).json({ message: `Failed to post the user to ${recipient}`, description })
        }
    })
}
