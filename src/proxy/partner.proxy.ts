import retry from 'retry'
import fetch from 'node-fetch'
import { UserFHIR } from '../model-partners/user.model'
import Credentials from '../types/credentials'
import HttpError from '../types/httpError'
import { createHttpError, isHttpError } from '../utils/httpError.util'
import { shouldRetry } from '../utils/retry.util'

export async function postUser(user: UserFHIR, credentials: Credentials, authToken: string): Promise<string> {
    const body = JSON.stringify(user)
    const resourceUrl = credentials.resourceUrl
    const apiKey = credentials.apiKey

    return new Promise((resolve, reject) => {
        const operation = retry.operation({
            retries: 2, // Customize the number of retries here
            factor: 2, // Exponential factor for increasing wait times
            minTimeout: 5 * 1000, // Time before first retry, in milliseconds
        })

        operation.attempt(async (currentAttempt) => {
            try {
                const responseMsg = await tryToSendUser(body, resourceUrl, apiKey, authToken)
                resolve(responseMsg)
            } catch (error) {
                if (isHttpError(error)) {
                    const httpError = error as HttpError
                    if (!shouldRetry(httpError.statusCode)) {
                        console.log(`The partner API responded with ${httpError.statusCode} when trying to add a user`)
                        reject(`The partner API responded with ${httpError.statusCode}`)
                        return
                    }
                }
                if (operation.retry(error)) {
                    console.log(`The ${currentAttempt}. attempt to post user failed, retrying...`)
                } else {
                    console.error(`All attempts to post a user failed: ${operation.mainError()}`)
                    reject(`All attempts failed: ${operation.mainError()}`)
                    return
                }
            }
        })
    })
}

async function tryToSendUser(body: string, resourceUrl: string, key: string, authToken: string): Promise<string> {
    const response = await fetch(resourceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
            Authorization: authToken,
        },
        body: body,
    })
    if (!response.ok) {
        const httpError = createHttpError(response.status)
        throw httpError
    } else {
        const responseMsg = await response.json()
        return JSON.stringify(responseMsg)
    }
}
