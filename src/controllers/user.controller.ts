import { Express, Request, Response } from 'express'
import handlePostUser from '../handlers/user.post.handler'
import { User, UserSchema } from '../schemas/user'
import dataValidator from '../validators/dataValidator'
import { ZodError } from 'zod'
import { getZodTypeErrors } from '../utils/error.util'
import { ErrorResponse, SuccessResponse } from '../types/responses'

export default function initialize(app: Express) {
    app.post('/users', dataValidator(UserSchema), async (req: Request, res: Response) => {
        try {
            const user: User = req.body
            // Already checked that partner parameter and auth token was provided
            const partner = req.query.partner as string
            const authToken = req.headers.authorization as string
            const responseMsg = await handlePostUser(user, partner, authToken)
            const response: SuccessResponse = { message: responseMsg }
            res.status(200).json(response)
        } catch (error) {
            const description = error?.message as string
            const recipient = req.query.partner as string
            const response: ErrorResponse = {
                message: `Failed to post the user to ${recipient}`,
                errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
            }
            res.status(500).json(response)
        }
    })
}
