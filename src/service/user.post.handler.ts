import type { Request, Response } from 'express'
import { ZodError } from 'zod'

import type { User } from '../schemas/user'
import { userToFHIRUser } from '../mappers/user.mapper'
import { postUser } from '../proxy/partner.proxy'
import type { ErrorResponse, SuccessResponse } from '../types/responses'
import { getZodTypeErrors } from '../utils/error.util'
import { getCredentialsFromPartner, getPartnerFromString } from '../utils/partner.util'

export default async function handlePostUser(req: Request, res: Response) {
    try {
        // Already checked that body conforms to schema,
        // partner parameter is a valid and partner auth token was provided
        const user: User = req.body
        const partnerString = req.params.partner as string
        const partnerAuthToken = req.header('Partner-Authorization')?.split(' ')[1]

        // This should never be true, but avoids TS errors
        if (!partnerAuthToken) {
            throw new Error('Partner-Authorization was not provided')
        }

        // Map user to FHIR resource
        const userFHIR = userToFHIRUser(user)
        // Get partner enum
        const partner = getPartnerFromString(partnerString)
        // Get URL and key for partner API
        const credentials = getCredentialsFromPartner(partner)
        // Send the request
        const responseMsg = await postUser(userFHIR, credentials, partnerAuthToken)
            .then((response) => JSON.parse(response))
            .catch((error) => {
                throw new Error(error)
            })
        const response: SuccessResponse = { message: responseMsg }
        res.status(200).json(response)
    } catch (error) {
        const description = error?.message as string
        const recipient = req.query.partner as string

        // Return all type errors, or just the error that resulted in the crash
        const response: ErrorResponse = {
            message: `Failed to post the user to ${recipient}`,
            errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
        }
        res.status(500).json(response)
    }
}
