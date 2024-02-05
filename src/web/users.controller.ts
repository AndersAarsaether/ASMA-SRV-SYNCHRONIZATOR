import type { Express, Request, Response } from 'express'

import { UserSchema } from '../schemas/user'
import validatePayload from '../validators/dataValidator'
import { checkAuthorizationHeader, checkPartnerAuthorizationHeader } from '../validators/headerValidators'
import { chechPartnerParameter } from '../validators/paramValidators'
import handlePostUser from '../service/user.post.handler'

export default function registerUserRoutes(api: Express) {
    api.post(
        '/Patient/:partner',
        validatePayload(UserSchema),
        checkAuthorizationHeader,
        checkPartnerAuthorizationHeader,
        chechPartnerParameter,
        async (req: Request, res: Response) => await handlePostUser(req, res),
    )
}
