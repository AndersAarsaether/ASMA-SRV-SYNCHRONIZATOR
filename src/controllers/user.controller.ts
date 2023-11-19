import { Express, Request, Response } from 'express'
import { UserRequest } from '../model-advoca/user.model'
import handlePostUser from '../handlers/user.post.handler'

export default function initialize(app: Express) {
    app.post('/users', (req: Request, res: Response) => {
        try {
            const user: UserRequest = req.body
            // Checked that token exists in middleware, so can simply convert to string
            const authToken = req.headers.authorization as string
            handlePostUser(user, authToken)
            res.status(200).json({ message: 'Successfully posted the user' })
        } catch (error) {
            const description = error?.message
            res.status(500).json({ message: 'An error occured', description })
        }
    })
}
