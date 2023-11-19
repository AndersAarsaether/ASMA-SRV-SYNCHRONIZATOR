import retry from 'retry'
import fetch from 'node-fetch'
import { UserFHIR } from '../model-partners/user.model'
import { Credentials } from '../model-internal/credentials.model'

export async function postUser(user: UserFHIR, credentials: Credentials, authToken: string) {
    const body = JSON.stringify(user)
    const resourceUrl = credentials.resourceUrl
    const apiKey = credentials.apiKey

    const operation = retry.operation({
        retries: 5, // Customize the number of retries here
        factor: 2, // Exponential factor for increasing wait times
        minTimeout: 5 * 1000, // Time before first retry, in milliseconds
    })

    operation.attempt(async (currentAttempt) => {
        try {
            const responseMsg = await tryToSendUser(body, resourceUrl, apiKey, authToken)
            console.log(`User posted succesfully: ${responseMsg}`)
        } catch (error) {
            if (operation.retry(error)) {
                console.log(`The ${currentAttempt}. attempt to post user failed, retrying...`)
                return
            }
            console.error('All attempts to post user have failed', operation.mainError())
        }
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
        throw new Error(`HTTP error, status = ${response.status}`)
    } else {
        const responseMsg = await response.json()
        return JSON.stringify(responseMsg)
    }
}
