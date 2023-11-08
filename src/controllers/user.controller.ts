import { Express, Request, Response } from 'express'
import { UserRequest } from '../model-internal/user.model'
import handlePostUser from '../handlers/user.post.handler'

export default function initialize(app: Express) {
    app.post('/users', (req: Request, res: Response) => {
        try {
            const user: UserRequest = req.body
            handlePostUser(user)
            res.status(200).json({ message: 'Successfully posted the user' })
        } catch (error) {
            const description = error?.message
            res.status(500).json({ message: 'An error occured', description })
        }
    })
}
