import { UserFHIR } from '../model-external/userFHIR'
import fetch from 'node-fetch'
import { EnvConfigs } from './../envConfigs'
import { ResponseAWS } from './../model-external/responseAWS'
import { Message } from './../model-external/messageObject'

export async function postUser(user: UserFHIR) {
    const body = JSON.stringify(user)
    const url = 'https://vux079gk1m.execute-api.eu-north-1.amazonaws.com/external-api/user'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': EnvConfigs.API_KEY_ADFECTUS,
        },
        body: body,
    })
        .then((response) => response.json() as Promise<ResponseAWS>)
        .then((data) => {
            if (data.statusCode != 201) {
                console.log(`Failed to send user to Adfectus: ${data.body}`)
                throw new Error(`Failed to send user to Adfectus: ${data.body}`)
            } else {
                console.log(`Successfully added user to Adfectus: ${data.body}`)
            }
        })
        .catch((error: Message) => {
            throw new Error(`Failed to send user to Adfectus: ${error.message}`)
        })
}
