import retry from 'retry'
import fetch from 'node-fetch'

import type { UserFHIR } from '../schemas/user'
import type Credentials from '../types/credentials'
import type ErrorWithStatus from '../types/errorWithCode'
import { createErrorWithCode, isErrorWithCode } from '../utils/error.util'
import { shouldRetry } from '../utils/retry.util'

export async function postUser(user: UserFHIR, credentials: Credentials, partnerAuthToken: string): Promise<string> {
    const body = JSON.stringify(user)
    const resourceUrl = credentials.resourceUrl
    const apiKey = credentials.apiKey

    return new Promise((resolve, reject) => {
        const operation = retry.operation({
            retries: 2, // The number of retries
            factor: 2, // Doubling the wait time for every retry
            minTimeout: 4 * 1000, // Time before first retry, in milliseconds
            randomize: true, // Adding some randomness to avoid server congestion
        })

        operation.attempt(async (currentAttempt) => {
            try {
                const responseMsg = await tryToSendUser(body, resourceUrl, apiKey, partnerAuthToken)
                resolve(responseMsg)
            } catch (error) {
                if (isErrorWithCode(error)) {
                    const errorWithCode = error as ErrorWithStatus
                    if (!shouldRetry(errorWithCode.statusCode)) {
                        console.log(
                            `The partner API responded with ${errorWithCode.statusCode} when trying to add a user`,
                        )
                        reject(`The partner API responded with ${errorWithCode.statusCode}`)
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
        const errorWithCode = createErrorWithCode(response.status)
        throw errorWithCode
    } else {
        const responseMsg = await response.json()
        return JSON.stringify(responseMsg)
    }
}
