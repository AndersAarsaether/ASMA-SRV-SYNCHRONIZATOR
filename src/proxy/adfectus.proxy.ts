import { UserFHIR } from '../model-external/user.model'
import fetch from 'node-fetch'
import { EnvConfigs } from '../envConfigs'
import { ResponseAWS } from '../model-external/response.model'
import { Message } from '../model-external/message.model'

export async function postUser(user: UserFHIR) {
    const body = JSON.stringify(user)
    const { API_URL_ADFECTUS, API_KEY_ADFECTUS } = EnvConfigs
    try {
        const response = await fetch(API_URL_ADFECTUS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_ADFECTUS,
            },
            body: body,
        })

        const responseJSON = await response.json()
        const responseTyped = responseJSON as ResponseAWS | Message
        const recievedErrorMessage = 'message' in responseTyped

        if (recievedErrorMessage) {
            const message = responseTyped as Message
            console.log(`AWS responsed with the error message: \"${message.message}\"`)
        } else {
            const responseAWS = responseTyped as ResponseAWS
            if (responseAWS.statusCode !== 201) {
                console.log(`Something failed inside Adfectus AWS: ${responseAWS.body}`)
            } else {
                console.log(`Successfully added user to Adfectus AWS: ${responseAWS.body}`)
            }
        }
    } catch (error) {
        throw new Error(`Failed to send user to Adfectus: ${error.message}`)
    }
}
