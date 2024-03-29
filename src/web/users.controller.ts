import { Express, Request, Response } from 'express'
import { ZodError } from 'zod'

import handlePostUser from '../service/user.post.handler'
import validatePayload from '../validators/dataValidator'
import { UserSchema, User } from '../schemas/user'
import { getZodTypeErrors } from '../utils/error.util'
import { ErrorResponse, SuccessResponse } from '../types/responses'
import { checkAuthorizationHeader, checkPartnerAuthorizationHeader } from '../validators/headerValidators'
import { chechPartnerParameter } from '../validators/paramValidators'

export default function initialize(api: Express) {
    api.post(
        '/Patient/:partner',
        validatePayload(UserSchema),
        checkAuthorizationHeader,
        checkPartnerAuthorizationHeader,
        chechPartnerParameter,
        async (req: Request, res: Response) => {
            try {
                const user: User = req.body
                // Already checked that partner parameter and partner auth token was provided
                const partner = req.params.partner as string
                const partnerAuthToken = req.header('Partner-Authorization')!.split(' ')[1] as string
                const responseMsg = await handlePostUser(user, partner, partnerAuthToken)
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
        },
    )
}
